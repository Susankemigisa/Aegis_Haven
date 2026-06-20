"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import styles from "./AegisApp.module.css"
import { LANGUAGES, T } from "@/lib/i18n"
import { detectDanger } from "@/lib/dangerDetector"
import SafetyPlan from "./SafetyPlan"
import RightsCards from "./RightsCards"

const EMERGENCY_CONTACTS = [
  { num: "999 / 112",        label: { en: "Uganda Police",           lg: "Abapoliisi ba Uganda",      sw: "Polisi ya Uganda" }},
  { num: "0800 111 511",     label: { en: "FIDA Uganda (free)",      lg: "FIDA Uganda (wabwerere)",   sw: "FIDA Uganda (bure)" }},
  { num: "0800 199 195",     label: { en: "Police Gender Desk",      lg: "Siteeji ya Poliisi",        sw: "Dawati la Jinsia" }},
  { num: "116",              label: { en: "Sauti Child Helpline",    lg: "Sauti — Obuyambi bw'Abaana",sw: "Msaada wa Watoto 116" }},
  { num: "+256 414 267285",  label: { en: "FIDA Direct",             lg: "FIDA Obutereeza",           sw: "FIDA Moja kwa Moja" }},
  { num: "0800 100 210",     label: { en: "Justice Centres",         lg: "Birowoozo by'Obutuukirivu", sw: "Vituo vya Haki" }},
]

const DEMO_RESPONSES = [
  {
    trigger: ["protection order","order","protect"],
    response: `A protection order is a legal document issued by a Magistrate's Court that prohibits the abuser from contacting, harassing, or harming you.

How to get one:
• Go to any Magistrate's Court in Uganda — there is no filing fee
• An emergency protection order can be issued the same day
• The order can ban the abuser from your home or workplace
• FIDA Uganda can accompany you and help for free: 0800 111 511

Violating a protection order is a criminal offence.

Only you know what feels safest for you right now.`
  },
  {
    trigger: ["domestic violence","what counts","what is dv","types"],
    response: `Under Uganda's Domestic Violence Act 2010, domestic violence includes:

• Physical abuse — hitting, kicking, burning, choking, or any physical harm
• Sexual abuse — forced or unwanted sexual acts within a relationship
• Emotional/psychological abuse — threats, intimidation, isolation from family and friends
• Economic abuse — controlling money, stopping you from working, destroying property
• Verbal abuse — insults, humiliation, constant criticism

The law protects spouses, children, parents, and people in domestic relationships — married or not.

You deserve to be free from all of these. FIDA Uganda can advise you: 0800 111 511`
  },
  {
    trigger: ["report","police","gender desk"],
    response: `You have the right to report domestic violence to the police. Here is how to do it safely:

1. Go to the nearest police station and ask for the Gender Desk officer
2. Bring a trusted friend or family member if possible
3. Ask for your OB (Occurrence Book) number as proof of reporting
4. You can also call the Gender Desk directly: 0800 199 195

You do not have to report if you are not ready — it is entirely your choice. Reporting does not automatically mean going to court.

FIDA Uganda can advise you on what to expect: 0800 111 511`
  },
  {
    trigger: ["fida","free legal","lawyer"],
    response: `FIDA Uganda provides completely free legal services to women and children affected by domestic violence.

They can:
• Give you free legal advice over the phone: 0800 111 511 (toll-free)
• Go with you to the police station or court
• Help you apply for a protection order at no cost
• Represent you in court if needed
• Advise on divorce, custody, and property rights

Call them any time — the service is free and confidential.`
  },
  {
    trigger: ["money","economic","financial","salary","work","job"],
    response: `Controlling someone's money or stopping them from working is domestic violence under Ugandan law.

Economic abuse includes:
• Withholding money for food, rent, or children's needs
• Preventing you from getting a job or continuing education
• Taking your salary or savings without your consent
• Destroying your property or assets

What you can do:
• Apply for a court order requiring the abuser to provide financial support
• Contact FIDA Uganda for free advice: 0800 111 511
• Report to the Police Gender Desk: 0800 199 195

Only you know what feels safest for you right now.`
  },
  {
    trigger: ["rights","legal rights","what are my"],
    response: `Under the Uganda Domestic Violence Act 2010, you have the right to:

• Live free from physical, sexual, emotional, and economic abuse
• Apply for a protection order at any Magistrate's Court — free of charge
• Have the abuser removed from your shared home
• Keep your children safe — leaving does not mean losing custody
• Access free legal help through FIDA Uganda: 0800 111 511
• Report to the Police Gender Desk: 0800 199 195

You deserve safety. You deserve respect. These are not just words — they are your legal rights.`
  },
  {
    trigger: ["children","child","custody","kids"],
    response: `Children who witness domestic violence are legally recognised as victims under Uganda's DV Act 2010.

Important things to know:
• Witnessing violence harms children — it is not just an adult matter
• You will NOT automatically lose custody by leaving an abusive situation
• Courts consider the safety of children when issuing protection orders
• Schools can be instructed to restrict the abuser's access to collect your child
• The Sauti 116 helpline specifically supports children in crisis

Your children have the right to safety — and so do you. FIDA Uganda can help you understand your custody rights: 0800 111 511`
  },
]

function getDemoResponse(input) {
  const q = input.toLowerCase()
  for (const d of DEMO_RESPONSES) {
    if (d.trigger.some(t => q.includes(t))) return d.response
  }
  return `Thank you for reaching out to Aegis Haven.

What you're going through deserves to be taken seriously, and you deserve support.

I can help you understand:
• Your rights under the Uganda Domestic Violence Act 2010
• How to apply for a protection order
• What FIDA Uganda can do for you — free of charge
• Safety planning steps

Please feel free to ask about any of these topics, or describe your situation and I will do my best to help.

Emergency contacts always available:
• Police: 999 or 112
• FIDA Uganda: 0800 111 511`
}

// ── Conversation history helpers ──────────────────────────
function loadHistory() {
  try {
    const raw = localStorage.getItem("aegis_history")
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch { return [] }
}

function saveHistory(history) {
  try { localStorage.setItem("aegis_history", JSON.stringify(history)) } catch (_) {}
}

function formatHistoryDate(ts, t) {
  const d = new Date(ts)
  const now = new Date()
  const isToday = d.toDateString() === now.toDateString()
  const yesterday = new Date(now); yesterday.setDate(now.getDate() - 1)
  const isYesterday = d.toDateString() === yesterday.toDateString()
  if (isToday) return t.historyToday
  if (isYesterday) return t.historyYesterday
  return d.toLocaleDateString()
}

function makeConversationTitle(messages) {
  const first = messages.find(m => m.role === "user")
  if (!first) return "New conversation"
  const txt = first.content.trim()
  return txt.length > 45 ? txt.slice(0, 42) + "…" : txt
}

export default function AegisApp() {
  const [theme,         setTheme]        = useState("dark")
  const [lang,          setLang]         = useState("en")
  const [demoMode,      setDemoMode]     = useState(false)
  const [hydrated,      setHydrated]     = useState(false)

  const [messages,      setMessages]     = useState([])
  const [currentConvId, setCurrentConvId] = useState(null)
  const [history,       setHistory]      = useState([]) // [{id, title, ts, messages}]

  const [input,         setInput]        = useState("")
  const [loading,       setLoading]      = useState(false)
  const [streaming,     setStreaming]     = useState("")
  const [sidebarOpen,   setSidebarOpen]  = useState(false)
  const [panicOpen,     setPanicOpen]    = useState(false)
  const [dangerAlert,   setDangerAlert]  = useState(null)
  const [showPlan,      setShowPlan]     = useState(false)
  const [showRights,    setShowRights]   = useState(false)
  const [isOffline,     setIsOffline]    = useState(false)
  const [feedback,      setFeedback]     = useState({})
  const [demoBanner,    setDemoBanner]   = useState(false)
  const [bannersOpen,   setBannersOpen]  = useState(false) // default false — restored from storage
  const [bannersManual, setBannersManual] = useState(false)
  const chatRef  = useRef(null)
  const inputRef = useRef(null)
  const prevLang    = useRef(null)
  const [userHasSent, setUserHasSent] = useState(false)
  const [suggestionsOpen, setSuggestionsOpen] = useState(false)
  const [sidebarTab, setSidebarTab] = useState("settings")

  // Hydrate from localStorage once on mount
  useEffect(() => {
    try {
      const savedTheme    = localStorage.getItem("aegis_theme")
      const savedLang     = localStorage.getItem("aegis_lang")
      const savedDemo     = localStorage.getItem("aegis_demo")
      const savedMessages = localStorage.getItem("aegis_messages")
      const savedBanners  = localStorage.getItem("aegis_banners_open")
      const savedConvId   = localStorage.getItem("aegis_conv_id")

      const resolvedLang = savedLang || "en"
      if (savedTheme) setTheme(savedTheme)
      if (savedLang)  setLang(savedLang)
      if (savedDemo)  setDemoMode(savedDemo === "true")

      // Restore banners state — default closed if never set
      if (savedBanners !== null) {
        setBannersOpen(savedBanners === "true")
        setBannersManual(true) // treat any saved value as intentional
      } else {
        setBannersOpen(false) // first visit default: closed
      }

      // Load conversation history
      const hist = loadHistory()
      setHistory(hist)

      if (savedMessages) {
        try {
          const parsed = JSON.parse(savedMessages)
          if (Array.isArray(parsed) && parsed.length > 0) {
            setMessages(parsed)
            prevLang.current = resolvedLang
            if (parsed.some(m => m.role === "user")) setUserHasSent(true)
          } else {
            prevLang.current = resolvedLang
            setMessages([{ role: "assistant", content: T[resolvedLang].greetingBot }])
          }
        } catch (_) {
          prevLang.current = resolvedLang
          setMessages([{ role: "assistant", content: T[resolvedLang].greetingBot }])
        }
      } else {
        prevLang.current = resolvedLang
        setMessages([{ role: "assistant", content: T[resolvedLang].greetingBot }])
      }

      if (savedConvId) setCurrentConvId(savedConvId)
    } catch (_) {
      setMessages([{ role: "assistant", content: T["en"].greetingBot }])
    }
    setHydrated(true)
  }, [])

  // Persist theme
  useEffect(() => {
    if (!hydrated) return
    try { localStorage.setItem("aegis_theme", theme) } catch (_) {}
    document.documentElement.setAttribute("data-theme", theme)
  }, [theme, hydrated])

  // Persist lang
  useEffect(() => {
    if (!hydrated) return
    try { localStorage.setItem("aegis_lang", lang) } catch (_) {}
  }, [lang, hydrated])

  // Persist demoMode
  useEffect(() => {
    if (!hydrated) return
    try { localStorage.setItem("aegis_demo", String(demoMode)) } catch (_) {}
  }, [demoMode, hydrated])

  // Persist bannersOpen — FIX: this was missing, causing banners to reset on refresh
  useEffect(() => {
    if (!hydrated) return
    try { localStorage.setItem("aegis_banners_open", String(bannersOpen)) } catch (_) {}
  }, [bannersOpen, hydrated])

  const t = T[lang]

  // Init greeting only when lang actually changes
  useEffect(() => {
    if (prevLang.current === lang) return
    prevLang.current = lang
    setMessages([{ role: "assistant", content: T[lang].greetingBot }])
  }, [lang])

  // Persist messages whenever they change
  useEffect(() => {
    if (!hydrated || messages.length === 0) return
    try { localStorage.setItem("aegis_messages", JSON.stringify(messages)) } catch (_) {}

    // Auto-save to history when conversation has user messages
    if (messages.some(m => m.role === "user")) {
      setHistory(prev => {
        const title = makeConversationTitle(messages)
        const convId = currentConvId || `conv_${Date.now()}`
        if (!currentConvId) {
          setCurrentConvId(convId)
          try { localStorage.setItem("aegis_conv_id", convId) } catch (_) {}
        }
        const idx = prev.findIndex(c => c.id === convId)
        let updated
        if (idx >= 0) {
          updated = prev.map((c, i) => i === idx ? { ...c, title, messages, ts: Date.now() } : c)
        } else {
          updated = [{ id: convId, title, messages, ts: Date.now() }, ...prev]
        }
        // Keep last 20 conversations
        const trimmed = updated.slice(0, 20)
        saveHistory(trimmed)
        return trimmed
      })
    }
  }, [messages, hydrated])

  // Apply theme on mount before hydration
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme)
  }, [theme])

  // Auto-scroll
  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight
  }, [messages, streaming])

  // Detect online/offline
  useEffect(() => {
    const go   = () => setIsOffline(false)
    const stop = () => setIsOffline(true)
    window.addEventListener("online",  go)
    window.addEventListener("offline", stop)
    setIsOffline(!navigator.onLine)
    return () => { window.removeEventListener("online", go); window.removeEventListener("offline", stop) }
  }, [])

  // ESC key
  useEffect(() => {
    const h = (e) => {
      if (e.key === "Escape") {
        if (showPlan)    { setShowPlan(false);    return }
        if (showRights)  { setShowRights(false);  return }
        if (panicOpen)   { setPanicOpen(false);   return }
        if (dangerAlert) { setDangerAlert(null);  return }
        window.location.replace("https://www.google.com")
      }
    }
    window.addEventListener("keydown", h)
    return () => window.removeEventListener("keydown", h)
  }, [showPlan, showRights, panicOpen, dangerAlert])

  const toggleDemo = () => {
    setDemoMode(d => {
      setDemoBanner(!d)
      setTimeout(() => setDemoBanner(false), 4000)
      return !d
    })
  }

  const giveFeedback = (idx, value) => {
    setFeedback(prev => ({ ...prev, [idx]: value }))
  }

  const quickExit = () => window.location.replace("https://www.google.com")

  // Load a past conversation from history
  const loadConversation = (conv) => {
    setMessages(conv.messages)
    setCurrentConvId(conv.id)
    try { localStorage.setItem("aegis_conv_id", conv.id) } catch (_) {}
    try { localStorage.setItem("aegis_messages", JSON.stringify(conv.messages)) } catch (_) {}
    setUserHasSent(conv.messages.some(m => m.role === "user"))
    setFeedback({})
    setSidebarOpen(false)
    setDangerAlert(null)
    setSuggestionsOpen(false)
  }

  // Delete a conversation from history
  const deleteConversation = (e, convId) => {
    e.stopPropagation()
    setHistory(prev => {
      const updated = prev.filter(c => c.id !== convId)
      saveHistory(updated)
      return updated
    })
    // If deleting the active conversation, start fresh
    if (convId === currentConvId) {
      startNewChat()
    }
  }

  const startNewChat = () => {
    const fresh = [{ role: "assistant", content: t.greetingBot }]
    const newId = `conv_${Date.now()}`
    setMessages(fresh)
    setCurrentConvId(newId)
    try { localStorage.setItem("aegis_messages", JSON.stringify(fresh)) } catch (_) {}
    try { localStorage.setItem("aegis_conv_id", newId) } catch (_) {}
    setFeedback({})
    setUserHasSent(false)
    setDangerAlert(null)
    setSuggestionsOpen(false)
    setSidebarOpen(false)
  }

  const sendMessage = useCallback(async (text) => {
    const msg = (text || input).trim()
    if (!msg || loading) return
    setInput("")
    setUserHasSent(true)
    setSuggestionsOpen(false)

    const danger = detectDanger(msg)
    if (danger === "immediate") setDangerAlert("immediate")
    else if (danger === "concern") setDangerAlert("concern")

    const newMessages = [...messages, { role: "user", content: msg }]
    setMessages(newMessages)
    setLoading(true)
    setStreaming("")

    if (demoMode) {
      await new Promise(r => setTimeout(r, 800))
      const reply = getDemoResponse(msg)
      const words = reply.split(" ")
      let full = ""
      for (let i = 0; i < words.length; i++) {
        full += (i === 0 ? "" : " ") + words[i]
        setStreaming(full)
        await new Promise(r => setTimeout(r, 22))
      }
      setMessages(prev => [...prev, { role: "assistant", content: full }])
      setStreaming("")
      setLoading(false)
      inputRef.current?.focus()
      return
    }

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages, lang, demoMode }),
      })
      if (!res.ok) {
        const e = await res.json()
        // 503 = no API key and demo mode is off — show a clear, actionable message
        if (res.status === 503) {
          setMessages(prev => [...prev, {
            role: "assistant",
            content: "⚙️ No API key is configured.\n\nTo get live AI responses, add your ANTHROPIC_API_KEY to .env.local and restart the server.\n\nAlternatively, enable Demo Mode in Settings (⚙️ → Settings) to use pre-written responses without an API key.\n\n— Emergency contacts are always available:\n• Police: 999 or 112\n• FIDA Uganda: 0800 111 511",
          }])
          setStreaming("")
          setLoading(false)
          inputRef.current?.focus()
          return
        }
        throw new Error(e.error || "Server error")
      }

      const reader  = res.body.getReader()
      const decoder = new TextDecoder()
      let full = ""
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        full += decoder.decode(value, { stream: true })
        setStreaming(full)
      }
      setMessages(prev => [...prev, { role: "assistant", content: full }])
      setStreaming("")
    } catch {
      setMessages(prev => [...prev, {
        role: "assistant",
        content: "I'm having trouble connecting right now.\n\nIf you need immediate help:\n• Police: 999 or 112\n• FIDA Uganda: +256-414-267-285",
      }])
      setStreaming("")
    } finally {
      setLoading(false)
      inputRef.current?.focus()
    }
  }, [input, messages, loading, lang, demoMode])

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage() }
  }

  const clearChat = () => {
    startNewChat()
    setSidebarOpen(false)
  }

  const toggleBanners = () => {
    setBannersManual(true)
    setBannersOpen(o => !o)
  }

  return (
    <div className={styles.shell}>

      {/* ── MODALS ── */}
      {showPlan   && <SafetyPlan   lang={lang} onClose={() => setShowPlan(false)} />}
      {showRights && <RightsCards  lang={lang} onClose={() => setShowRights(false)} onAskBot={(q) => { setShowRights(false); sendMessage(q) }} />}

      {/* ── PANIC OVERLAY ── */}
      {panicOpen && (
        <div className={styles.panicOverlay} role="dialog" aria-modal="true">
          <div className={styles.panicBox}>
            <div className={styles.panicPulse}>🆘</div>
            <h2 className={styles.panicTitle}>{t.panicTitle}</h2>
            <p className={styles.panicSub}>{t.panicSub}</p>
            <div className={styles.panicContacts}>
              {EMERGENCY_CONTACTS.map(c => (
                <a key={c.num} href={`tel:${c.num.replace(/\s/g,"")}`} className={styles.panicContact}>
                  <span className={styles.panicNum}>{c.num}</span>
                  <span className={styles.panicLabel}>{c.label[lang]}</span>
                </a>
              ))}
            </div>
            <p className={styles.panicNote}>{t.panicNote}</p>
            <div className={styles.panicActions}>
              <button className={styles.panicExitBtn} onClick={quickExit}>🚨 {t.exitBtn}</button>
              <button className={styles.panicCloseBtn} onClick={() => setPanicOpen(false)}>{t.panicClose}</button>
            </div>
          </div>
        </div>
      )}

      {/* ── DANGER ALERT BANNER ── */}
      {dangerAlert && (
        <div className={`${styles.dangerBanner} ${dangerAlert === "immediate" ? styles.dangerImmediate : styles.dangerConcern}`}>
          <div className={styles.dangerBannerInner}>
            <div className={styles.dangerBannerLeft}>
              <strong className={styles.dangerBannerTitle}>{t.dangerAlertTitle}</strong>
              <span className={styles.dangerBannerBody}>{t.dangerAlertBody}</span>
              <div className={styles.dangerBannerContacts}>
                {EMERGENCY_CONTACTS.slice(0, 3).map(c => (
                  <a key={c.num} href={`tel:${c.num.replace(/\s/g,"")}`} className={styles.dangerContact}>
                    <span className={styles.dangerBadge}>{c.num}</span>
                    <span>{c.label[lang]}</span>
                  </a>
                ))}
              </div>
              <span className={styles.dangerNote}>{t.dangerAlertNote}</span>
            </div>
            <div className={styles.dangerBannerRight}>
              <button className={styles.dangerExitBtn} onClick={quickExit}>🚨 {t.exitBtn}</button>
              <button className={styles.dangerDismissBtn} onClick={() => setDangerAlert(null)}>{t.dangerAlertDismiss}</button>
            </div>
          </div>
        </div>
      )}

      {/* ── DEMO MODE TOAST ── */}
      {demoBanner && (
        <div className={`${styles.toast} ${demoMode ? styles.toastOn : styles.toastOff}`}>
          {demoMode ? "🎭 Demo mode ON — no API key needed" : "🔌 Demo mode OFF — using live API"}
        </div>
      )}

      {/* ── OFFLINE BANNER ── */}
      {isOffline && !demoMode && (
        <div className={styles.offlineBanner}>
          ⚡ You appear to be offline. Switching to demo mode automatically.
          <button className={styles.offlineBtn} onClick={() => setDemoMode(true)}>Enable Demo Mode</button>
        </div>
      )}

      {/* ── TOP BAR ── */}
      <header className={styles.topbar}>
        <div className={styles.brand}>
          <div className={styles.logo}>🛡️</div>
          <div className={styles.brandText}>
            <h1>Aegis Haven</h1>
            <p>{t.brandSub}</p>
          </div>
        </div>

        <div className={styles.topRight}>
          <div className={`${styles.statusPill} ${demoMode ? styles.statusDemo : isOffline ? styles.statusOffline : ""}`}>
            <span className={styles.statusDot} />
            <span>{demoMode ? "Demo mode" : isOffline ? "Offline" : t.statusKb}</span>
          </div>

          {/* Language switcher */}
          <div className={styles.langSwitcher}>
            {LANGUAGES.map(l => (
              <button key={l.code}
                className={`${styles.langBtn} ${lang === l.code ? styles.langActive : ""}`}
                onClick={() => setLang(l.code)} title={l.label}>
                {l.flag}
              </button>
            ))}
          </div>

          <button className={styles.iconBtn} onClick={() => setTheme(t => t === "dark" ? "light" : "dark")}
            aria-label="Toggle theme" title="Toggle theme">
            {theme === "dark" ? "☀️" : "🌙"}
          </button>

          <button className={styles.iconBtn} onClick={() => setSidebarOpen(s => !s)}
            aria-label="Settings" title="Settings">⚙️</button>

          <button className={styles.panicBtn} onClick={() => setPanicOpen(true)}>{t.panicBtn}</button>
          <button className={styles.exitBtn} onClick={quickExit}>{t.exitBtn}</button>
        </div>
      </header>

      {/* ── BANNERS — persisted collapse state ── */}
      <div className={styles.bannersWrap}>
        <button
          className={`${styles.bannersStrip} ${bannersOpen ? styles.bannersStripOpen : ""}`}
          onClick={toggleBanners}
        >
          <span className={styles.bannersStripLeft}>
            <span className={styles.bannersStripDot} />
            <span>{t.bannersNotEmg} &nbsp;·&nbsp; 🚨 {t.bannersPolice} <strong>999</strong> &nbsp;·&nbsp; {t.bannersFida} <strong>0800 111 511</strong></span>
          </span>
          <span className={styles.bannersStripChevron}>{bannersOpen ? "▲" : "▼"}</span>
        </button>

        {bannersOpen && (
          <div className={styles.banners}>
            <div className={styles.bannerWarn}>
              <span className={styles.bannerTitle}>{t.warnTitle}</span>
              <span className={styles.bannerBody}>
                {lang === "en" && <>In immediate danger? Call <strong>Police 999</strong> or <strong>112</strong> now. No personal data is stored. Use incognito mode for extra privacy. Press <kbd>ESC</kbd> to exit instantly.</>}
                {lang === "lg" && <>Oli mu kabi kati? Yita <strong>Abapoliisi 999</strong> oba <strong>112</strong> leero. Tewali makumaoku agakuumibwa. Kozesa mode ya private. Nyiga <kbd>ESC</kbd> okufuluma amangu.</>}
                {lang === "sw" && <>Uko katika hatari sasa hivi? Piga simu <strong>Polisi 999</strong> au <strong>112</strong> sasa. Hakuna data ya kibinafsi inayohifadhiwa. Tumia mode ya faragha. Bonyeza <kbd>ESC</kbd> kutoka mara moja.</>}
              </span>
            </div>
            <div className={styles.bannerEmg}>
              <span className={styles.bannerTitle}>{t.emgTitle}</span>
              <div className={styles.contactGrid}>
                {EMERGENCY_CONTACTS.map(c => (
                  <a key={c.num} href={`tel:${c.num.replace(/\s/g,"")}`} className={styles.contact}>
                    <span className={styles.badge}>{c.num}</span>
                    <span>{c.label[lang]}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── BODY ── */}
      <div className={styles.body}>

        {/* SIDEBAR */}
        <aside className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : ""}`}>
          <div className={styles.sidebarInner}>

            <nav className={styles.sidebarNav}>
              <button className={`${styles.sidebarNavBtn} ${sidebarTab === "history"  ? styles.sidebarNavActive : ""}`} onClick={() => setSidebarTab("history")}>📜 {t.historyTitle}</button>
              <button className={`${styles.sidebarNavBtn} ${sidebarTab === "tools"    ? styles.sidebarNavActive : ""}`} onClick={() => setSidebarTab("tools")}>{t.sidebarTools}</button>
              <button className={`${styles.sidebarNavBtn} ${sidebarTab === "settings" ? styles.sidebarNavActive : ""}`} onClick={() => setSidebarTab("settings")}>{t.sidebarSettings}</button>
              <button className={`${styles.sidebarNavBtn} ${sidebarTab === "team"     ? styles.sidebarNavActive : ""}`} onClick={() => setSidebarTab("team")}>{t.sidebarTeam}</button>
              <button className={`${styles.sidebarNavBtn} ${sidebarTab === "ethics"   ? styles.sidebarNavActive : ""}`} onClick={() => setSidebarTab("ethics")}>{t.sidebarEthics}</button>
            </nav>

            {/* ── HISTORY TAB ── */}
            {sidebarTab === "history" && (
              <div className={styles.sidebarPage}>
                <section className={styles.sidebarSection}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                    <h3>{t.historyTitle}</h3>
                    <button className={styles.sidebarToolBtn} style={{ padding: "4px 10px", fontSize: "12px" }} onClick={startNewChat}>+ {t.historyNew}</button>
                  </div>
                  {history.length === 0 ? (
                    <p className={styles.sidebarNote}>{t.historyEmpty}</p>
                  ) : (
                    <div className={styles.historyList}>
                      {history.map(conv => (
                        <div
                          key={conv.id}
                          className={`${styles.historyItem} ${conv.id === currentConvId ? styles.historyItemActive : ""}`}
                          onClick={() => loadConversation(conv)}
                        >
                          <div className={styles.historyItemInner}>
                            <span className={styles.historyTitle}>{conv.title}</span>
                            <span className={styles.historyDate}>{formatHistoryDate(conv.ts, t)}</span>
                          </div>
                          <button
                            className={styles.historyDeleteBtn}
                            onClick={(e) => deleteConversation(e, conv.id)}
                            title={t.historyDelete}
                          >✕</button>
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              </div>
            )}

            {sidebarTab === "tools" && (
              <div className={styles.sidebarPage}>
                <section className={styles.sidebarSection}>
                  <h3>{t.sidebarSafetyTitle}</h3>
                  <button className={styles.sidebarToolBtn} onClick={() => { setShowPlan(true); setSidebarOpen(false) }}>
                    {t.sidebarSafetyPlan}
                  </button>
                  <button className={styles.sidebarToolBtn} onClick={() => { setShowRights(true); setSidebarOpen(false) }}>
                    {t.sidebarRights}
                  </button>
                  <button className={styles.sidebarToolBtn} onClick={() => { setSuggestionsOpen(true); setSidebarOpen(false) }}>
                    {t.sidebarSampleQ}
                  </button>
                  <button className={styles.sidebarToolBtn} onClick={() => { setPanicOpen(true); setSidebarOpen(false) }}>
                    {t.sidebarHelpNow}
                  </button>
                </section>
              </div>
            )}

            {sidebarTab === "settings" && (
              <div className={styles.sidebarPage}>
                <section className={styles.sidebarSection}>
                  <h3>{t.sidebarConfigTitle}</h3>
                  <p className={styles.sidebarNote}>{t.sidebarConfigApiNote}</p>
                  <div className={styles.ragBadge}><span className={styles.ragDot} />{t.sidebarKbBadge}</div>
                </section>

                <section className={styles.sidebarSection}>
                  <h3>{t.sidebarDemoTitle}</h3>
                  <p className={styles.sidebarNote}>{t.sidebarDemoNote}</p>
                  <button className={`${styles.demoToggle} ${demoMode ? styles.demoOn : ""}`} onClick={toggleDemo}>
                    <span className={styles.demoToggleDot} />
                    {demoMode ? t.sidebarDemoOn : t.sidebarDemoOff}
                  </button>
                </section>

                <section className={styles.sidebarSection}>
                  <h3>{t.sidebarKbTitle}</h3>
                  <p className={styles.sidebarNote}>{t.sidebarKbNote}</p>
                  <div className={styles.chunkList}>
                    {["What is DV","Types of abuse","Who is protected","Victim rights","Reporting","Support orgs","Penalties","Myths vs facts"].map(c => (
                      <span className={styles.chunk} key={c}>{c}</span>
                    ))}
                  </div>
                </section>
              </div>
            )}

            {sidebarTab === "team" && (
              <div className={styles.sidebarPage}>
                <section className={styles.sidebarSection}>
                  <h3>Tracy — AI &amp; Chatbot</h3>
                  <p className={styles.sidebarNote}>Claude API, trauma-informed system prompt, RAG pipeline, streaming responses.</p>
                </section>
                <section className={styles.sidebarSection}>
                  <h3>Joseline — Knowledge Base</h3>
                  <p className={styles.sidebarNote}>Curates and verifies the RAG knowledge base used to ground every response.</p>
                </section>
                <section className={styles.sidebarSection}>
                  <h3>Suzan — UX &amp; Ethics</h3>
                  <p className={styles.sidebarNote}>Danger detection, panic button, multilingual UI (EN/LG/SW), safety plan checklist, rights cards, offline fallback, demo mode, feedback system, conversation history.</p>
                </section>
              </div>
            )}

            {sidebarTab === "ethics" && (
              <div className={styles.sidebarPage}>
                <section className={styles.sidebarSection}>
                  <h3>Ethical Principles</h3>
                  <div className={styles.ethicsList}>
                    {[["Do No Harm","Every response checked for danger"],["Respect Autonomy","Options, never commands"],["Do Good","Information must improve safety"],["Justice","Equal service to all"],["Transparency","Honest about what this is"]].map(([title,desc]) => (
                      <div className={styles.ethicsItem} key={title}>
                        <strong>{title}</strong><span>{desc}</span>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            )}

            <button className={styles.clearBtn} onClick={clearChat}>{t.clearChat}</button>
          </div>
        </aside>


        {/* CHAT */}
        <div className={styles.chatCol}>

          <div className={styles.chatMessages} ref={chatRef}>
            {messages.map((m, i) => {
              if (i === 0 && m.role === "assistant" && userHasSent) return null
              return (
              <div key={i} className={`${styles.msgRow} ${m.role === "user" ? styles.user : styles.bot}`}>
                {m.role === "assistant" && <div className={styles.avatarBot}>🛡️</div>}
                <div className={styles.bubbleWrap}>
                  <div className={styles.msgLabel}>{m.role === "user" ? "You" : "Aegis Haven"}</div>
                  <div className={`${styles.bubble} ${m.role === "user" ? styles.bubbleUser : styles.bubbleBot}`}>
                    {m.content}
                  </div>
                  {m.role === "assistant" && i > 0 && (
                    <div className={styles.feedbackRow}>
                      <span className={styles.feedbackLabel}>{t.feedbackLabel}</span>
                      <button
                        className={`${styles.feedbackBtn} ${feedback[i] === "up" ? styles.feedbackActive : ""}`}
                        onClick={() => giveFeedback(i, "up")}
                        title={t.feedbackUp}
                      >👍</button>
                      <button
                        className={`${styles.feedbackBtn} ${feedback[i] === "down" ? styles.feedbackActiveDown : ""}`}
                        onClick={() => giveFeedback(i, "down")}
                        title={t.feedbackDown}
                      >👎</button>
                      {feedback[i] && (
                        <span className={styles.feedbackThanks}>
                          {feedback[i] === "up" ? t.feedbackThanksUp : t.feedbackThanksDown}
                        </span>
                      )}
                    </div>
                  )}
                </div>
                {m.role === "user" && <div className={styles.avatarUser}>👤</div>}
              </div>
              )
            })}

            {streaming && (
              <div className={`${styles.msgRow} ${styles.bot}`}>
                <div className={styles.avatarBot}>🛡️</div>
                <div className={styles.bubbleWrap}>
                  <div className={styles.msgLabel}>Aegis Haven</div>
                  <div className={`${styles.bubble} ${styles.bubbleBot} ${styles.streaming}`}>{streaming}</div>
                </div>
              </div>
            )}

            {loading && !streaming && (
              <div className={`${styles.msgRow} ${styles.bot}`}>
                <div className={styles.avatarBot}>🛡️</div>
                <div className={styles.bubbleWrap}>
                  <div className={styles.msgLabel}>Aegis Haven</div>
                  <div className={styles.typing}>
                    <span className={styles.dot}/><span className={styles.dot}/><span className={styles.dot}/>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* SUGGESTIONS */}
          <div className={styles.suggestionsWrap}>
            {suggestionsOpen && (
              <div className={styles.suggPopup}>
                <div className={styles.suggPopupHeader}>
                  <span>{t.suggLabel}</span>
                  <button className={styles.suggPopupClose} onClick={() => setSuggestionsOpen(false)} aria-label="Close">✕</button>
                </div>
                <div className={styles.suggGrid}>
                  {t.suggestions.map(s => (
                    <button key={s} className={styles.suggBtn} onClick={() => { sendMessage(s); setSuggestionsOpen(false) }}>{s}</button>
                  ))}
                </div>
              </div>
            )}
            <button
              className={`${styles.suggToggleBtn} ${suggestionsOpen ? styles.suggToggleBtnActive : ""}`}
              onClick={() => setSuggestionsOpen(o => !o)}
            >
              💡 {t.suggLabel}
            </button>
          </div>

          {/* INPUT BAR */}
          <div className={styles.inputBar}>
            <div className={styles.inputRow}>
              <textarea
                ref={inputRef}
                className={styles.msgInput}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder={t.inputPlaceholder}
                rows={1}
                disabled={loading}
              />
              <button className={styles.sendBtn} onClick={() => sendMessage()} disabled={loading || !input.trim()}>
                {loading ? t.sendingBtn : t.sendBtn}
              </button>
            </div>
            <p className={styles.inputHint}>{t.inputHint}</p>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.footerQuote}>{t.footerQuote}</div>
          <div className={styles.footerMeta}>
            <span>{t.footerNote}</span>
            <span className={styles.footerDivider}>·</span>
            <span>Tracy · AI &amp; Chatbot</span>
            <span className={styles.footerDivider}>·</span>
            <span>Joseline · Knowledge Base</span>
            <span className={styles.footerDivider}>·</span>
            <span>Suzan · UX &amp; Ethics</span>
            <span className={styles.footerDivider}>·</span>
            <span>Group 3 · 2026</span>
          </div>
        </div>
      </footer>
    </div>
  )
}