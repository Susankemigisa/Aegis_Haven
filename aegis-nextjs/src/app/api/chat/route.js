import Anthropic from "@anthropic-ai/sdk"
import { loadKnowledgeBase, getRelevantContext } from "@/lib/rag"
import { SYSTEM_PROMPT } from "@/lib/systemPrompt"
import { OFFLINE_RESPONSES } from "@/lib/day2Data"

function getOfflineFallback(messages) {
  const last = [...messages].reverse().find(m => m.role === "user")
  if (!last) return OFFLINE_RESPONSES.default
  const q = last.content.toLowerCase()
  if (q.includes("protection order"))          return OFFLINE_RESPONSES["protection order"]
  if (q.includes("domestic violence") || q.includes("what is dv") || q.includes("what counts"))
                                               return OFFLINE_RESPONSES["domestic violence"]
  if (q.includes("fida"))                      return OFFLINE_RESPONSES["fida"]
  if (q.includes("report") || q.includes("police")) return OFFLINE_RESPONSES["report"]
  if (q.includes("right") || q.includes("legal"))   return OFFLINE_RESPONSES["rights"]
  if (q.includes("money") || q.includes("economic") || q.includes("financial"))
                                               return OFFLINE_RESPONSES["economic"]
  return OFFLINE_RESPONSES.default
}

function streamText(text) {
  const encoder = new TextEncoder()
  const readable = new ReadableStream({
    start(controller) {
      const words = text.split(" ")
      let i = 0
      const tick = setInterval(() => {
        if (i >= words.length) { clearInterval(tick); controller.close(); return }
        controller.enqueue(encoder.encode((i === 0 ? "" : " ") + words[i]))
        i++
      }, 18)
    },
  })
  return new Response(readable, { headers: { "Content-Type": "text/plain; charset=utf-8" } })
}

export async function POST(request) {
  const requestClone = request.clone()
  try {
    const { messages, lang = "en", demoMode = false } = await request.json()
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return Response.json({ error: "No messages provided" }, { status: 400 })
    }

    const apiKey = process.env.ANTHROPIC_API_KEY

    // ── NO API KEY ───────────────────────────────────────────────────────────
    // If the client has demo mode OFF and there is no API key, return a clear
    // error so the user knows why — instead of silently serving fallback
    // responses that look identical to a real API response.
    if (!apiKey && !demoMode) {
      return Response.json(
        { error: "No API key configured. Add ANTHROPIC_API_KEY to .env.local, or enable Demo Mode in Settings." },
        { status: 503 }
      )
    }

    // ── DEMO / OFFLINE FALLBACK ──────────────────────────────────────────────
    // Only reached when demoMode is explicitly true (sent by the client) and
    // there is no API key — acts as a safety net if the client somehow calls
    // the API route in demo mode.
    if (!apiKey && demoMode) {
      return streamText(getOfflineFallback(messages))
    }

    // ── RAG (Joseline) ───────────────────────────────────────────────────────
    let ragContext = ""
    try {
      const kb = await loadKnowledgeBase()
      const lastUserMsg = [...messages].reverse().find(m => m.role === "user")
      if (lastUserMsg && Object.keys(kb).length > 0) {
        ragContext = getRelevantContext(lastUserMsg.content, kb, 2)
      }
    } catch (_) {}

    // ── TRACY'S SYSTEM PROMPT + RAG ─────────────────────────────────────────
    const langNote = lang !== "en"
      ? `\n\nIMPORTANT: The user has selected ${lang === "lg" ? "Luganda" : "Kiswahili"} as their language. Please respond in that language while keeping all legal information accurate.`
      : ""

    let systemPrompt = SYSTEM_PROMPT + langNote
    if (ragContext) {
      systemPrompt += `\n\n## VERIFIED KNOWLEDGE BASE (Joseline's Uganda DV research):\n\n${ragContext}\n\n---\nUse this context for accurate Uganda-specific information.`
    }

    const client = new Anthropic({ apiKey })
    const stream = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 2000,
      system: systemPrompt,
      messages: messages.map(m => ({ role: m.role, content: m.content })),
      stream: true,
    })

    const encoder = new TextEncoder()
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const event of stream) {
            if (event.type === "content_block_delta" && event.delta?.type === "text_delta") {
              controller.enqueue(encoder.encode(event.delta.text))
            }
          }
        } finally {
          controller.close()
        }
      },
    })

    return new Response(readable, { headers: { "Content-Type": "text/plain; charset=utf-8" } })
  } catch (err) {
    // On unexpected errors, return a JSON error (no silent fallback)
    try {
      return Response.json({ error: err.message || "Internal error" }, { status: 500 })
    } catch {
      return Response.json({ error: "Internal error" }, { status: 500 })
    }
  }
}