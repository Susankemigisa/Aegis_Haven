"use client"
import { useState, useEffect } from "react"
import { RIGHTS_CARDS } from "@/lib/day2Data"
import styles from "./RightsCards.module.css"

export default function RightsCards({ lang, onClose, onAskBot }) {
  const cards = RIGHTS_CARDS[lang] || RIGHTS_CARDS.en
  const [active, setActive] = useState(null)

  useEffect(() => {
    const h = (e) => { if (e.key === "Escape") { active ? setActive(null) : onClose() } }
    window.addEventListener("keydown", h)
    return () => window.removeEventListener("keydown", h)
  }, [active, onClose])

  const titles = {
    en: { title: "Know Your Rights", subtitle: "Tap a card to read more. All information is based on Uganda's Domestic Violence Act 2010.", askBtn: "Ask the bot about this", closeCard: "← Back to cards", close: "Close" },
    lg: { title: "Manya Eddembe Lyo", subtitle: "Nyiga ku kaadi okusoma ebisingawo. Amakumaoku gonna gava mu Ddeeriya lya Uganda lya 2010.", askBtn: "Buuza bot ku kino", closeCard: "← Ddayo ku makaadi", close: "Ggalawo" },
    sw: { title: "Jua Haki Zako", subtitle: "Gusa kadi kusoma zaidi. Taarifa zote zinatoka kwenye Sheria ya Uganda ya 2010.", askBtn: "Uliza bot kuhusu hili", closeCard: "← Rudi kwa kadi", close: "Funga" },
  }
  const ui = titles[lang] || titles.en
  const card = active ? cards.find(c => c.id === active) : null

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true">
      <div className={styles.modal}>

        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <div className={styles.icon}>⚖️</div>
            <div>
              <h2 className={styles.title}>{ui.title}</h2>
              <p className={styles.subtitle}>{ui.subtitle}</p>
            </div>
          </div>
          <button className={styles.closeBtn} onClick={onClose}>✕</button>
        </div>

        {/* Card detail view */}
        {card ? (
          <div className={styles.detail}>
            <button className={styles.backBtn} onClick={() => setActive(null)}>{ui.closeCard}</button>
            <div className={styles.detailCard} style={{ "--card-color": card.color }}>
              <div className={styles.detailIcon}>{card.icon}</div>
              <h3 className={styles.detailTitle}>{card.title}</h3>
              <p className={styles.detailSummary}>{card.summary}</p>
              <ul className={styles.detailList}>
                {card.details.map((d, i) => (
                  <li key={i} className={styles.detailItem}>
                    <span className={styles.bullet} style={{ background: card.color }} />
                    {d}
                  </li>
                ))}
              </ul>
              <a href={`tel:${card.contact.num.replace(/\s/g,"")}`} className={styles.contactLink} style={{ borderColor: card.color + "60", background: card.color + "12" }}>
                <span className={styles.contactNum} style={{ color: card.color }}>{card.contact.num}</span>
                <span className={styles.contactLabel}>{card.contact.label}</span>
              </a>
              <button
                className={styles.askBtn}
                style={{ background: `linear-gradient(135deg, ${card.color}, ${card.color}BB)` }}
                onClick={() => { onAskBot(`Tell me more about: ${card.title}`); onClose() }}
              >
                {ui.askBtn} ↗
              </button>
            </div>
          </div>
        ) : (
          /* Card grid */
          <div className={styles.grid}>
            {cards.map(c => (
              <button key={c.id} className={styles.card} onClick={() => setActive(c.id)}
                style={{ "--card-color": c.color }}>
                <div className={styles.cardIcon}>{c.icon}</div>
                <h3 className={styles.cardTitle}>{c.title}</h3>
                <p className={styles.cardSummary}>{c.summary}</p>
                <div className={styles.cardFooter}>
                  <span className={styles.cardContact}>{c.contact.num}</span>
                  <span className={styles.cardArrow}>→</span>
                </div>
                <div className={styles.cardAccent} style={{ background: c.color }} />
              </button>
            ))}
          </div>
        )}

        <div className={styles.footer}>
          <button className={styles.footerClose} onClick={onClose}>{ui.close}</button>
        </div>
      </div>
    </div>
  )
}
