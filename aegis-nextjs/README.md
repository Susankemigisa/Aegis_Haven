# 🛡️ Aegis Haven — Next.js Project

Domestic Violence Help & Information Bot · Group 3

---

## Team

| Member | Role |
|--------|------|
| **Tracy** | AI & Chatbot — Claude API, system prompt, RAG pipeline |
| **Joseline** | Knowledge Base — Uganda DV Act 2010, NGO research, 8 RAG chunks |
| **Suzan** | UX & Ethics — Full interface, safety features, ethical design |

---

## Full Project Structure & Where Every File Goes

```
aegis-nextjs/                          ← Root of the Next.js project
│
├── .env.example                       ← Copy this to .env.local and add your API key
├── .env.local                         ← YOU CREATE THIS (not in zip) — add ANTHROPIC_API_KEY=...
├── jsconfig.json                      ← Enables @/ imports
├── next.config.js                     ← Next.js config
├── package.json                       ← Dependencies (next, react, @anthropic-ai/sdk)
├── README.md                          ← This file
│
└── src/
    ├── app/
    │   ├── globals.css                ← Suzan: theme system (dark + light palettes)
    │   ├── layout.js                  ← Root layout with Google Fonts
    │   ├── page.js                    ← Entry point — renders AegisApp
    │   │
    │   └── api/
    │       └── chat/
    │           └── route.js           ← Tracy's backend: Claude API + RAG + offline fallback
    │
    ├── components/
    │   ├── AegisApp.jsx               ← Suzan: main UI component (all features wired in)
    │   ├── AegisApp.module.css        ← Suzan: full CSS design system
    │   ├── SafetyPlan.jsx             ← Suzan: Day 2 — interactive safety checklist modal
    │   ├── SafetyPlan.module.css      ← Suzan: SafetyPlan styles
    │   ├── RightsCards.jsx            ← Suzan: Day 2 — Know Your Rights card grid
    │   └── RightsCards.module.css     ← Suzan: RightsCards styles
    │
    └── lib/
        ├── i18n.js                    ← Suzan: Day 1 — EN / Luganda / Swahili strings
        ├── dangerDetector.js          ← Suzan: Day 1 — real-time danger keyword detection
        ├── day2Data.js                ← Suzan: Day 2 — safety plan data, rights cards, offline responses
        ├── rag.js                     ← Joseline: fetches and searches the 8 knowledge chunks
        └── systemPrompt.js            ← Tracy: trauma-informed Claude system prompt
```

---

## Setup (run this once)

### 1 — Install dependencies
```bash
cd aegis-nextjs
npm install
```

### 2 — Add your API key
```bash
cp .env.example .env.local
```
Then open `.env.local` and change it to:
```
ANTHROPIC_API_KEY=sk-ant-your-key-here
```

### 3 — Run the app
```bash
npm run dev
```
Open **http://localhost:3000**

---

## Features Built (Days 1, 2, 3)

### Day 1 — Safety & Trust (Suzan)
- **🆘 Panic Button** — full-screen overlay with all 6 emergency contacts as tappable phone links
- **🚨 Danger Detector** — scans every message in EN/Luganda/Swahili for crisis signals
- **🌍 Multilingual** — 🇬🇧 English / 🇺🇬 Luganda / 🌍 Kiswahili — full UI translation

### Day 2 — Usefulness (Suzan)
- **📋 Safety Planning Checklist** — 8-section interactive checklist, copy/print, nothing stored
- **⚖️ Know Your Rights Cards** — 6 topic cards with detail view and "ask the bot" shortcut
- **⚡ Offline Fallback** — if API is down, static answers to 7 most common questions still stream in

### Day 3 — Polish & Presentation (Suzan)
- **🎭 Demo Mode** — runs full realistic demo without an API key, perfect for presentations
- **👍👎 Feedback Buttons** — on every bot response, captures helpfulness rating
- **🔌 Offline Detection** — auto-detects browser offline state, prompts to enable demo mode

---

## Demo Mode (for presentations)

If you have no API key or want a guaranteed stable demo:
1. Open **⚙️ Setup** in the top bar
2. Toggle **Demo Mode ON**
3. The bot will respond with realistic pre-written answers — no API needed

---

## If the API Key is not set
The app still works. The API route automatically falls back to static answers for the 7 most common questions.

---

## ⚠️ Important
This is an **information service only** — not an emergency response system.
If someone is in immediate danger: **Police 999 or 112**
