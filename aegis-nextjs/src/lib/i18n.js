// lib/i18n.js
// Multilingual support — English, Luganda, Swahili
// Suzan · UX & Ethics · Group 3

export const LANGUAGES = [
  { code: "en", label: "English",  flag: "🇬🇧" },
  { code: "lg", label: "Luganda",  flag: "🇺🇬" },
  { code: "sw", label: "Kiswahili",flag: "🌍" },
]

export const T = {
  en: {
    brandSub:       "Safe support · Uganda",
    statusKb:       "KB active · 8 chunks",
    exitBtn:        "🚨 Quick Exit",
    warnTitle:      "⚠️ Information service only — not an emergency system",
    emgTitle:       "📞 Emergency Contacts — always available",
    panicBtn:       "🆘 I Need Help Right Now",
    panicTitle:     "Are you in immediate danger?",
    panicSub:       "This chat cannot send help. Please use one of these now:",
    panicNote:      "If you cannot call safely, get to a neighbour, a public place, or a locked room.",
    panicClose:     "I am safe for now — go back",
    suggLabel:      "Quick questions to get started",
    inputPlaceholder: "Ask anything about your rights or available support…",
    sendBtn:        "Send ↗",
    sendingBtn:     "…",
    clearChat:      "🗑 Clear conversation",
    footerQuote:    "\"You deserve to be safe. You deserve to be respected. You deserve support.\"",
    footerNote:     "Information service only — not a substitute for legal, medical, or crisis support",
    dangerAlertTitle:  "🚨 Your safety matters right now",
    dangerAlertBody:   "It sounds like you may be in danger. This chat cannot send help or call anyone for you. Please reach out to one of these services immediately:",
    dangerAlertNote:   "If it is not safe to call, try to get to a trusted person or public place.",
    dangerAlertDismiss:"I am safe — continue chat",
    sidebarConfig:  "Configuration",
    sidebarConfigNote: "Add ANTHROPIC_API_KEY to .env.local to activate the bot.",
    sidebarKbLoaded: "8 knowledge chunks loaded",
    greetingBot:    `Hello, and welcome to Aegis Haven.

I'm here to provide you with clear, private information about your rights and the support available to you in Uganda. You are not alone, and what you're going through is not your fault.

I can help you understand:
• Your rights under the Uganda Domestic Violence Act 2010
• How to reach FIDA Uganda, Justice Centres, and the Police Gender Desk
• What a protection order is and how to apply for one
• Steps for safety planning

Take your time. What would you like to know about today?`,
    suggestions: [
      "What is a protection order?",
      "What counts as domestic violence?",
      "How do I report to the police safely?",
      "What can FIDA Uganda help me with?",
      "What are my legal rights?",
      "Is controlling my money a form of abuse?",
    ],
    // Feedback UI (previously hardcoded in English only)
    feedbackLabel:   "Was this helpful?",
    feedbackUp:      "Helpful",
    feedbackDown:    "Not helpful",
    feedbackThanksUp:"Thank you ✓",
    feedbackThanksDown:"Thanks — we'll improve ✓",
    // Sidebar labels (previously hardcoded in English only)
    sidebarTools:   "🧰 Tools",
    sidebarSettings:"⚙️ Settings",
    sidebarTeam:    "👥 Team",
    sidebarEthics:  "🧭 Ethics",
    sidebarSafetyTitle: "Safety Tools",
    sidebarSafetyPlan:  "📋 Safety Planning Checklist",
    sidebarRights:      "⚖️ Know Your Rights Cards",
    sidebarSampleQ:     "💡 Sample Questions",
    sidebarHelpNow:     "🆘 I Need Help Right Now",
    sidebarConfigTitle: "Configuration",
    sidebarConfigApiNote: "Add ANTHROPIC_API_KEY to .env.local to activate live AI responses.",
    sidebarKbBadge:  "8 knowledge chunks loaded",
    sidebarDemoTitle:"Demo Mode",
    sidebarDemoNote: "Run a full presentation without an API key. Uses pre-written realistic responses.",
    sidebarDemoOn:   "🎭 Demo ON — click to disable",
    sidebarDemoOff:  "🔌 Demo OFF — click to enable",
    sidebarKbTitle:  "Knowledge Base",
    sidebarKbNote:   "8 verified chunks from Uganda DV Act 2010, NGO reports, support organisation contacts.",
    // Conversation history
    historyTitle:    "Conversation History",
    historyEmpty:    "No saved conversations yet. Your chat history will appear here.",
    historyNew:      "New Chat",
    historyDelete:   "Delete",
    historyToday:    "Today",
    historyYesterday:"Yesterday",
    // Banner strip
    bannersNotEmg:   "⚠️ Not an emergency service",
    bannersPolice:   "Police:",
    bannersFida:     "FIDA:",
    // Inline warning body
    warnBodyEn:      true, // signals to render the English inline JSX
    // inputHint (kept as translatable string)
    inputHint:       "Enter to send · Shift+Enter new line · ESC = instant exit",
  },

  lg: {
    brandSub:       "Obuyambi obw'okukiriza · Uganda",
    statusKb:       "Ekitabo ky'amakumaoku · ebipande 8",
    exitBtn:        "🚨 Fuluma Mangu",
    warnTitle:      "⚠️ Ebigambo by'okunyonyola — si ssimu ya byabufuzi",
    emgTitle:       "📞 Enamba z'Obuyambi — zinaabaawo buli kiseera",
    panicBtn:       "🆘 Neetaaga Obuyambi Kati",
    panicTitle:     "Oli mu kabi amangu?",
    panicSub:       "Ekakebe kino tekisobola kutuma obuyambi. Kozesa enamba eno kati:",
    panicNote:      "Bw'oba tosobola kukuba ssimu mu butereevu, genda eri omutuuze, omu kifo ekiweebwako abantu, oba omu kisenge ekikomekedwa.",
    panicClose:     "Ndaba bulungi kati — ddayo",
    suggLabel:      "Ebibuuzo eby'amangu eby'okuddamu",
    inputPlaceholder: "Buuza ekintu kyonna ku maanyi go oba obuyambi obubaawo…",
    sendBtn:        "Tuma ↗",
    sendingBtn:     "…",
    clearChat:      "🗑 Sazamu okubuulira",
    footerQuote:    "\"Okuba bulungi kwe kw'olimu. Okuweebwako ekitiibwa kwe kw'olimu. Okuyambibwa kwe kw'olimu.\"",
    footerNote:     "Ebigambo by'okunyonyola busooka — tebigumya obuyambi bw'ettaka, obuyambi bw'omusawo oba obuyambi bw'amangu",
    dangerAlertTitle:  "🚨 Obulamu bwo bwakwagala kati",
    dangerAlertBody:   "Kigaragala nti oyinza okuba mu kabi. Ekakebe kino tekisobola kutuma obuyambi oba kukubira muntu wonna. Gamba ne bassi b'obuyambi bano amangu:",
    dangerAlertNote:   "Bw'oba tosasobola kukuba ssimu mu butereevu, gezaako okufika eri muntu gw'oyesiga oba omu kifo ekiweebwako abantu.",
    dangerAlertDismiss:"Ndaba bulungi — ddayo mu kubuulira",
    sidebarConfig:  "Entegeka",
    sidebarConfigNote: "Gattako ANTHROPIC_API_KEY mu .env.local okuzirika ekakebe.",
    sidebarKbLoaded: "Ebipande 8 by'amakumaoku bitozeddwa",
    greetingBot:    `Mwasuze otya, era twakusanyukira e Aegis Haven.

Ndi wano okuwa amakumaoku agatuufu era agakuuma ku maanyi go n'obuyambi obubaawo gy'oli mu Uganda. Toliimu wekka, era ekirabo ekyo kyo tekikusobozesa.

Nsobola okukuyamba okumanya:
• Amaanyi go nga bwe bategekeddwa mu Ddeeriya lya Uganda ly'okulwana n'obugaasi mu nju 2010
• Engeri gy'okutuukira FIDA Uganda, Birowoozo by'Obutuukirivu, n'Siteeji ya Poliisi ey'Obugaasi
• Ekirungo ky'okuddamu kya Protection Order n'engeri gy'okusooka kukibuuza
• Enkola y'okutegeka eby'okukulinda

Werekera. Olowooza kukubuuza ki leero?`,
    suggestions: [
      "Protection Order kya ki?",
      "Obugaasi mu nju bwetegeka butya?",
      "Ngamba Abapoliisi mu butereevu butya?",
      "FIDA Uganda bansobola okuyamba mu ki?",
      "Maanyi gange ga ttaka ga ki?",
      "Okukuubirira ssente kya ki obugaasi?",
    ],
    // Feedback UI — translated
    feedbackLabel:   "Ebigambo bino byakuyamba?",
    feedbackUp:      "Byayamba",
    feedbackDown:    "Tebiyamba",
    feedbackThanksUp:"Webale ✓",
    feedbackThanksDown:"Webale — tulongoosa ✓",
    // Sidebar labels — translated
    sidebarTools:   "🧰 Ebikozesebwa",
    sidebarSettings:"⚙️ Entegeka",
    sidebarTeam:    "👥 Ekibiina",
    sidebarEthics:  "🧭 Empisa",
    sidebarSafetyTitle: "Ebikozesebwa eby'Obukuumi",
    sidebarSafetyPlan:  "📋 Mutendera gw'Obukuumi",
    sidebarRights:      "⚖️ Manya Eddembe Lyo",
    sidebarSampleQ:     "💡 Ebibuuzo eby'ekyokulabirako",
    sidebarHelpNow:     "🆘 Neetaaga Obuyambi Kati",
    sidebarConfigTitle: "Entegeka",
    sidebarConfigApiNote: "Gattako ANTHROPIC_API_KEY mu .env.local okuzirika okwetaba kw'AI mu buwangwa.",
    sidebarKbBadge:  "Ebipande 8 by'amakumaoku bitozeddwa",
    sidebarDemoTitle:"Enkola ya Demo",
    sidebarDemoNote: "Kozesa wabwerere nga tolina API key. Ikozesa ebisubizo ebitegekedde.",
    sidebarDemoOn:   "🎭 Demo NYIKA — nyiga okuggalawo",
    sidebarDemoOff:  "🔌 Demo GGALAWO — nyiga okuzirika",
    sidebarKbTitle:  "Ekitabo ky'Amakumaoku",
    sidebarKbNote:   "Ebipande 8 eby'amazima okuva mu Ddeeriya lya Uganda 2010, ebirowoozo by'NGO, n'enamba z'obusobozi.",
    // Conversation history
    historyTitle:    "Ebyafaayo by'Okubuulira",
    historyEmpty:    "Tewali kubuulira kwakuumibwa. Ebyafaayo by'okubuulira byaawo wano.",
    historyNew:      "Okubuulira Okupya",
    historyDelete:   "Sazaamu",
    historyToday:    "Leero",
    historyYesterday:"Jjo",
    // Banner strip
    bannersNotEmg:   "⚠️ Si ssimu ya byabufuzi",
    bannersPolice:   "Abapoliisi:",
    bannersFida:     "FIDA:",
    inputHint:       "Enter okutuma · Shift+Enter omurongo omuggya · ESC = fuluma amangu",
  },

  sw: {
    brandSub:       "Msaada salama · Uganda",
    statusKb:       "KB inafanya kazi · vipande 8",
    exitBtn:        "🚨 Toka Haraka",
    warnTitle:      "⚠️ Huduma ya taarifa tu — si mfumo wa dharura",
    emgTitle:       "📞 Nambari za Dharura — zinapatikana wakati wote",
    panicBtn:       "🆘 Nahitaji Msaada Sasa Hivi",
    panicTitle:     "Uko katika hatari ya haraka?",
    panicSub:       "Mazungumzo haya hayawezi kutuma msaada. Tafadhali wasiliana na mmoja wa hizi sasa:",
    panicNote:      "Kama hauwezi kupiga simu salama, jaribu kufika kwa jirani, mahali pa umma, au chumba kilichofungwa.",
    panicClose:     "Niko salama sasa — rudi",
    suggLabel:      "Maswali ya haraka ya kuanza",
    inputPlaceholder: "Uliza chochote kuhusu haki zako au msaada unaopatikana…",
    sendBtn:        "Tuma ↗",
    sendingBtn:     "…",
    clearChat:      "🗑 Futa mazungumzo",
    footerQuote:    "\"Unastahili kuwa salama. Unastahili heshima. Unastahili msaada.\"",
    footerNote:     "Huduma ya taarifa tu — haiichukui nafasi ya msaada wa kisheria, matibabu, au dharura",
    dangerAlertTitle:  "🚨 Usalama wako una umuhimu sasa hivi",
    dangerAlertBody:   "Inaonekana unaweza kuwa katika hatari. Mazungumzo haya hayawezi kutuma msaada wala kupiga simu kwa mtu yeyote kwa niaba yako. Tafadhali wasiliana na huduma moja ya hizi mara moja:",
    dangerAlertNote:   "Kama si salama kupiga simu, jaribu kufika kwa mtu unayemwamini au mahali pa umma.",
    dangerAlertDismiss:"Niko salama — endelea mazungumzo",
    sidebarConfig:  "Usanidi",
    sidebarConfigNote: "Ongeza ANTHROPIC_API_KEY kwenye .env.local ili kuamilisha bot.",
    sidebarKbLoaded: "Vipande 8 vya maarifa vimepakiwa",
    greetingBot:    `Habari, na karibu Aegis Haven.

Niko hapa kukupa taarifa wazi na za faragha kuhusu haki zako na msaada unaopatikana Uganda. Huko peke yako, na kinachokupata si kosa lako.

Ninaweza kukusaidia kuelewa:
• Haki zako chini ya Sheria ya Uganda ya Ukatili wa Nyumbani 2010
• Jinsi ya kufikia FIDA Uganda, Vituo vya Haki, na Dawati la Jinsia la Polisi
• Amri ya ulinzi ni nini na jinsi ya kuomba
• Hatua za kupanga usalama

Chukua muda wako. Ungependa kujua nini leo?`,
    suggestions: [
      "Amri ya ulinzi ni nini?",
      "Ukatili wa nyumbani ni nini?",
      "Niripoti polisi kwa usalama vipi?",
      "FIDA Uganda inaweza kunisaidia nini?",
      "Haki zangu za kisheria ni zipi?",
      "Kudhibiti pesa zangu ni ukatili?",
    ],
    // Feedback UI — translated
    feedbackLabel:   "Je, hii ilikuwa na msaada?",
    feedbackUp:      "Ilisaidia",
    feedbackDown:    "Haikuwa na msaada",
    feedbackThanksUp:"Asante ✓",
    feedbackThanksDown:"Asante — tutaboresha ✓",
    // Sidebar labels — translated
    sidebarTools:   "🧰 Zana",
    sidebarSettings:"⚙️ Mipangilio",
    sidebarTeam:    "👥 Timu",
    sidebarEthics:  "🧭 Maadili",
    sidebarSafetyTitle: "Zana za Usalama",
    sidebarSafetyPlan:  "📋 Orodha ya Mipango ya Usalama",
    sidebarRights:      "⚖️ Jua Haki Zako",
    sidebarSampleQ:     "💡 Maswali ya Mfano",
    sidebarHelpNow:     "🆘 Nahitaji Msaada Sasa Hivi",
    sidebarConfigTitle: "Usanidi",
    sidebarConfigApiNote: "Ongeza ANTHROPIC_API_KEY kwenye .env.local kuamilisha majibu ya AI ya moja kwa moja.",
    sidebarKbBadge:  "Vipande 8 vya maarifa vimepakiwa",
    sidebarDemoTitle:"Hali ya Demo",
    sidebarDemoNote: "Endesha uwasilishaji kamili bila API key. Inatumia majibu ya kweli yaliyoandikwa mapema.",
    sidebarDemoOn:   "🎭 Demo INAFANYA KAZI — bonyeza kuzima",
    sidebarDemoOff:  "🔌 Demo IMEZIMWA — bonyeza kuamilisha",
    sidebarKbTitle:  "Msingi wa Maarifa",
    sidebarKbNote:   "Vipande 8 vilivyothibitishwa kutoka Sheria ya Uganda 2010, ripoti za NGO, mawasiliano ya msaada.",
    // Conversation history
    historyTitle:    "Historia ya Mazungumzo",
    historyEmpty:    "Bado hakuna mazungumzo yaliyohifadhiwa. Historia yako itaonekana hapa.",
    historyNew:      "Mazungumzo Mapya",
    historyDelete:   "Futa",
    historyToday:    "Leo",
    historyYesterday:"Jana",
    // Banner strip
    bannersNotEmg:   "⚠️ Si huduma ya dharura",
    bannersPolice:   "Polisi:",
    bannersFida:     "FIDA:",
    inputHint:       "Enter kutuma · Shift+Enter mstari mpya · ESC = toka haraka",
  },
}