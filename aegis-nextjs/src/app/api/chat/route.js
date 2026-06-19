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

export async function POST(request) {
  const requestClone = request.clone()
  try {
    const { messages, lang = "en" } = await request.json()
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return Response.json({ error: "No messages provided" }, { status: 400 })
    }

    const apiKey = process.env.ANTHROPIC_API_KEY

    // ── OFFLINE FALLBACK (Suzan Day 2) ──────────────────────────────────────
    if (!apiKey) {
      const fallback = getOfflineFallback(messages)
      const encoder  = new TextEncoder()
      const readable = new ReadableStream({
        start(controller) {
          // Stream word by word for natural feel
          const words = fallback.split(" ")
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
    // Try offline fallback on any error
    try {
      const { messages } = await requestClone.json()
      const fallback = getOfflineFallback(messages || [])
      return new Response(fallback, { headers: { "Content-Type": "text/plain; charset=utf-8" } })
    } catch {
      return Response.json({ error: err.message || "Internal error" }, { status: 500 })
    }
  }
}