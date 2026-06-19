// lib/rag.js
// Joseline's knowledge base — fetched from GitHub (same logic as setup_knowledge_base.py)

const GITHUB_REPO = "Susankemigisa/Aegis_Haven"
const BRANCH = "main"
const RAG_PATH = "knowledge-base/RAG_Chunks/rag_chunks"

const CHUNKS = [
  "CHUNK_001_what_is_domestic_violence.txt",
  "CHUNK_002_types_of_abuse.txt",
  "CHUNK_003_who_is_protected.txt",
  "CHUNK_004_victim_rights.txt",
  "CHUNK_005_how_to_report_and_protection_orders.txt",
  "CHUNK_006_support_organisations.txt",
  "CHUNK_007_penalties_and_courts.txt",
  "CHUNK_008_myths_vs_facts.txt",
]

let cachedKB = null

export async function loadKnowledgeBase() {
  if (cachedKB) return cachedKB
  const kb = {}
  await Promise.all(
    CHUNKS.map(async (file) => {
      try {
        const url = `https://raw.githubusercontent.com/${GITHUB_REPO}/${BRANCH}/${RAG_PATH}/${file}`
        const res = await fetch(url, { next: { revalidate: 3600 } })
        if (!res.ok) return
        let text = await res.text()
        if (text.startsWith("---")) {
          const parts = text.split("---", 3)
          if (parts.length >= 3) text = parts[2].trim()
        }
        const id = file.split("_").slice(0, 2).join("_")
        kb[id] = text
      } catch (_) {}
    })
  )
  if (Object.keys(kb).length > 0) cachedKB = kb
  return kb
}

export function getRelevantContext(query, kb, maxChunks = 2) {
  const q = query.toLowerCase()
  const words = new Set(q.split(/\s+/))
  const scored = Object.entries(kb).map(([id, content]) => {
    const c = content.toLowerCase()
    let score = [...words].reduce((s, w) => s + (c.includes(w) ? 1 : 0), 0)
    if (c.includes(q)) score += 10
    if (["CHUNK_006", "CHUNK_005", "CHUNK_004"].includes(id)) score += 2
    return { id, content, score }
  })
  scored.sort((a, b) => b.score - a.score)
  const relevant = scored.slice(0, maxChunks).filter(x => x.score > 0).map(x => x.content)
  if (!relevant.length && kb["CHUNK_006"]) return kb["CHUNK_006"]
  return relevant.join("\n\n---\n\n")
}