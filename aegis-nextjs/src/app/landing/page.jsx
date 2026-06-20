"use client"
import Link from "next/link"
import { useState, useEffect } from "react"
import styles from "./landing.module.css"

const STATS = [
  { num: "1 in 3", label: "women in Uganda experiences domestic violence in her lifetime" },
  { num: "Free", label: "legal advice through FIDA Uganda — 0800 111 511" },
  { num: "24/7", label: "Police Gender Desk reachable at 0800 199 195" },
  { num: "2010", label: "Uganda Domestic Violence Act — your rights, in law" },
]

const FEATURES = [
  {
    icon: "⚖️",
    title: "Know Your Rights",
    body: "Clear, verified information on the Uganda Domestic Violence Act 2010. Protection orders, custody rights, reporting steps — explained plainly.",
  },
  {
    icon: "🛡️",
    title: "Safety Planning",
    body: "An interactive checklist to help you plan your next steps — at your own pace, in private. Nothing is stored on our servers.",
  },
  {
    icon: "🆘",
    title: "Emergency Contacts",
    body: "One tap to call the Police Gender Desk, FIDA Uganda, or the Sauti Child Helpline — always visible, always reachable.",
  },
  {
    icon: "🌍",
    title: "Three Languages",
    body: "Full support in English, Luganda, and Kiswahili. Every word of the interface — including legal information — is translated.",
  },
  {
    icon: "🔒",
    title: "Private by Design",
    body: "No accounts. No personal data stored on servers. Press ESC at any moment to exit instantly to a safe page.",
  },
  {
    icon: "📡",
    title: "Works Offline",
    body: "If your connection drops, demo mode activates automatically with pre-written responses covering your most urgent questions.",
  },
]

const CONTACTS = [
  { num: "999 / 112",    name: "Uganda Police",       note: "Emergency" },
  { num: "0800 111 511", name: "FIDA Uganda",          note: "Free legal help" },
  { num: "0800 199 195", name: "Police Gender Desk",   note: "DV specialists" },
  { num: "116",          name: "Sauti Child Helpline", note: "Children in crisis" },
]

export default function LandingPage() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Slight delay so the entrance animation fires after paint
    const t = setTimeout(() => setVisible(true), 80)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className={styles.page}>

      {/* ── NAV ── */}
      <nav className={styles.nav}>
        <div className={styles.navBrand}>
          <span className={styles.navLogo}>🛡️</span>
          <span className={styles.navName}>Aegis Haven</span>
        </div>
        <div className={styles.navRight}>
          <a href="tel:999" className={styles.navEmg}>🚨 Call 999</a>
          <Link href="/chat" className={styles.navCta}>Open App →</Link>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className={`${styles.hero} ${visible ? styles.heroVisible : ""}`}>
        <div className={styles.heroGlow} aria-hidden />
        <div className={styles.heroContent}>
          <p className={styles.heroEyebrow}>Domestic violence support · Uganda</p>
          <h1 className={styles.heroTitle}>
            You deserve<br />
            <span className={styles.heroAccent}>to know your rights.</span>
          </h1>
          <p className={styles.heroSub}>
            Aegis Haven gives you private, verified information about the Uganda
            Domestic Violence Act 2010 — in English, Luganda, and Kiswahili.
            No account. No data stored. Exit in one keypress.
          </p>
          <div className={styles.heroCtas}>
            <Link href="/chat" className={styles.ctaPrimary}>
              Start a private conversation →
            </Link>
            <a href="tel:0800111511" className={styles.ctaSecondary}>
              📞 FIDA Uganda free helpline
            </a>
          </div>
          <p className={styles.heroEsc}>
            Press <kbd className={styles.kbd}>ESC</kbd> anywhere in the app to exit instantly to a safe page.
          </p>
        </div>
      </section>

      {/* ── STATS STRIP ── */}
      <section className={styles.statsStrip}>
        {STATS.map(s => (
          <div key={s.num} className={styles.stat}>
            <span className={styles.statNum}>{s.num}</span>
            <span className={styles.statLabel}>{s.label}</span>
          </div>
        ))}
      </section>

      {/* ── NOT AN EMERGENCY SERVICE ── */}
      <div className={styles.warningBand}>
        <span className={styles.warningIcon}>⚠️</span>
        <span>
          Aegis Haven is an <strong>information service</strong> — it cannot send help or call emergency services on your behalf.
          If you are in immediate danger, call <strong>Police 999</strong> or <strong>112</strong> now.
        </span>
      </div>

      {/* ── FEATURES ── */}
      <section className={styles.features}>
        <div className={styles.sectionLabel}>What Aegis Haven offers</div>
        <h2 className={styles.sectionTitle}>Safe information.<br />Any time. Any language.</h2>
        <div className={styles.featuresGrid}>
          {FEATURES.map(f => (
            <div key={f.title} className={styles.featureCard}>
              <div className={styles.featureIcon}>{f.icon}</div>
              <h3 className={styles.featureTitle}>{f.title}</h3>
              <p className={styles.featureBody}>{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className={styles.howItWorks}>
        <div className={styles.sectionLabel}>How it works</div>
        <h2 className={styles.sectionTitle}>Three steps to information</h2>
        <div className={styles.steps}>
          <div className={styles.step}>
            <div className={styles.stepNum}>1</div>
            <div>
              <h3 className={styles.stepTitle}>Choose your language</h3>
              <p className={styles.stepBody}>Switch between English, Luganda, or Kiswahili at any time using the flag buttons in the top bar.</p>
            </div>
          </div>
          <div className={styles.stepDivider} aria-hidden />
          <div className={styles.step}>
            <div className={styles.stepNum}>2</div>
            <div>
              <h3 className={styles.stepTitle}>Ask your question</h3>
              <p className={styles.stepBody}>Type freely or choose from sample questions. The AI draws on verified knowledge from Uganda's DV Act 2010 and trusted NGOs.</p>
            </div>
          </div>
          <div className={styles.stepDivider} aria-hidden />
          <div className={styles.step}>
            <div className={styles.stepNum}>3</div>
            <div>
              <h3 className={styles.stepTitle}>Take the next step safely</h3>
              <p className={styles.stepBody}>Use the safety planning checklist, know-your-rights cards, or tap an emergency contact directly from the app.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── EMERGENCY CONTACTS ── */}
      <section className={styles.contacts}>
        <div className={styles.sectionLabel}>Always available</div>
        <h2 className={styles.sectionTitle}>Emergency contacts</h2>
        <div className={styles.contactsGrid}>
          {CONTACTS.map(c => (
            <a key={c.num} href={`tel:${c.num.replace(/\s/g,"")}`} className={styles.contactCard}>
              <span className={styles.contactNum}>{c.num}</span>
              <span className={styles.contactName}>{c.name}</span>
              <span className={styles.contactNote}>{c.note}</span>
            </a>
          ))}
        </div>
      </section>

      {/* ── PRIVACY NOTE ── */}
      <section className={styles.privacy}>
        <div className={styles.privacyInner}>
          <div className={styles.privacyIcon}>🔒</div>
          <div>
            <h3 className={styles.privacyTitle}>Your privacy is built in</h3>
            <p className={styles.privacyBody}>
              No account required. No personal data stored on our servers.
              Conversation history is kept only in your own browser — and can be
              cleared in one click. Use your browser's incognito mode for extra protection.
              Press <kbd className={styles.kbd}>ESC</kbd> to leave instantly.
            </p>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className={styles.finalCta}>
        <div className={styles.finalGlow} aria-hidden />
        <h2 className={styles.finalTitle}>Ready when you are.</h2>
        <p className={styles.finalSub}>No sign-up. No waiting. No judgment.</p>
        <Link href="/chat" className={styles.ctaPrimary}>
          Open Aegis Haven →
        </Link>
      </section>

      {/* ── FOOTER ── */}
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.footerBrand}>
            <span>🛡️</span>
            <span>Aegis Haven</span>
          </div>
          <p className={styles.footerNote}>
            Information service only — not a substitute for legal, medical, or crisis support.
            Built by Group 3 · 2026 · Tracy (AI) · Joseline (Knowledge Base) · Suzan (UX &amp; Ethics)
          </p>
          <div className={styles.footerLinks}>
            <Link href="/chat">Chat App</Link>
            <span>·</span>
            <a href="tel:999">Emergency: 999</a>
            <span>·</span>
            <a href="tel:0800111511">FIDA: 0800 111 511</a>
          </div>
        </div>
      </footer>
    </div>
  )
}