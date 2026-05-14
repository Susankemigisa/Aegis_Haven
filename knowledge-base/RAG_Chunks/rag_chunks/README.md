# RAG KNOWLEDGE BASE — README
## Group 3: Domestic Violence Help & Information Bot
## Prepared by: Joseline | For: Tracy (RAG integration)

---

## What Is In This Folder

This folder contains 8 plain-text chunks (.txt files) ready for RAG ingestion. Each chunk covers one focused topic so the bot can retrieve the most relevant answer for any user query.

---

## Chunk Index

| Chunk ID   | File Name                                        | Topic                                      |
|------------|--------------------------------------------------|--------------------------------------------|
| CHUNK_001  | CHUNK_001_what_is_domestic_violence.txt          | Definition of domestic violence            |
| CHUNK_002  | CHUNK_002_types_of_abuse.txt                     | All 6 types of abuse under Ugandan law     |
| CHUNK_003  | CHUNK_003_who_is_protected.txt                   | Who the law protects (domestic relationships) |
| CHUNK_004  | CHUNK_004_victim_rights.txt                      | Legal rights of victims                    |
| CHUNK_005  | CHUNK_005_how_to_report_and_protection_orders.txt | How to report + how to get a protection order |
| CHUNK_006  | CHUNK_006_support_organisations.txt              | All 6 support organisations with contacts  |
| CHUNK_007  | CHUNK_007_penalties_and_courts.txt               | Penalties and court system                 |
| CHUNK_008  | CHUNK_008_myths_vs_facts.txt                     | Common myths vs. facts                     |

---

## How to Ingest These

Each file starts with a YAML-style metadata header between --- markers. Strip or parse this before embedding if your RAG pipeline does not handle metadata headers.

Suggested metadata fields to index per chunk:
- CHUNK_ID (unique identifier)
- TITLE (for display)
- TOPIC (for filtering)
- KEYWORDS (for hybrid search)
- SOURCE (for citation)

---

## Priority Chunks for the Bot

- **CHUNK_006** (support organisations) — the bot should always be able to retrieve this. Every serious conversation should end with at least one contact from this chunk.
- **CHUNK_008** (myths vs. facts) — critical for safety. Many users will ask questions that map to myths.
- **CHUNK_005** (how to report) — most action-oriented chunk; users in crisis need this.

---

## Notes

- All chunks are in plain English — no legal jargon.
- All information is sourced from the Uganda Domestic Violence Act, 2010 and verified organisation contacts.
- Phone numbers are formatted as text strings (not integers).
- Contacts were verified May 2026 — recheck before final deployment.
- These chunks complement the full documents (Legal Summary, Definitions Sheet, Org Database) also prepared by Joseline.

---

Source documents:
- Uganda Domestic Violence Act, 2010 (Act No. 3 of 2010)
- FIDA Uganda: www.fidauganda.or.ug
- Uganda Police Force: www.upf.go.ug
- Justice Centres Uganda: www.justicecentres.go.ug
- Uganda Women's Network: www.uwonet.or.ug
- Uganda Human Rights Commission: www.uhrc.ug
