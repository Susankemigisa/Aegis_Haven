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
    warnBody:       "In immediate danger? Call Police {bold:999} or {bold:112} now. No personal data is stored. Use incognito mode for extra privacy. Press {kbd:ESC} to exit instantly.",
    emgTitle:       "📞 Emergency Contacts — always available",
    panicBtn:       "🆘 I Need Help Right Now",
    panicTitle:     "Are you in immediate danger?",
    panicSub:       "This chat cannot send help. Please use one of these now:",
    panicNote:      "If you cannot call safely, get to a neighbour, a public place, or a locked room.",
    panicClose:     "I am safe for now — go back",
    suggLabel:      "Quick questions to get started",
    inputPlaceholder: "Ask anything about your rights or available support…",
    inputHint:      "{kbd:Enter} to send · {kbd:Shift+Enter} new line · {kbd:ESC} = instant exit",
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
  },

  lg: {
    brandSub:       "Obuyambi obw'okukiriza · Uganda",
    statusKb:       "Ekitabo ky'amakumaoku · ebipande 8",
    exitBtn:        "🚨 Fuluma Mangu",
    warnTitle:      "⚠️ Ebigambo by'okunyonyola — si ssimu ya byabufuzi",
    warnBody:       "Oli mu kabi kati? Yita {bold:Abapoliisi 999} oba {bold:112} leero. Tewali makumaoku go agakuumibwa wano. Kozesa mode ya private okuba n'olukalala lw'obukuumi. Nyiga {kbd:ESC} okufuluma amangu.",
    emgTitle:       "📞 Enamba z'Obuyambi — zinaabaawo buli kiseera",
    panicBtn:       "🆘 Neetaaga Obuyambi Kati",
    panicTitle:     "Oli mu kabi amangu?",
    panicSub:       "Ekakebe kino tekisobola kutuma obuyambi. Kozesa enamba eno kati:",
    panicNote:      "Bw'oba tosobola kukuba ssimu mu butereevu, genda eri omutuuze, omu kifo ekiweebwako abantu, oba omu kisenge ekikomekedwa.",
    panicClose:     "Ndaba bulungi kati — ddayo",
    suggLabel:      "Ebibuuzo eby'amangu eby'okuddamu",
    inputPlaceholder: "Buuza ekintu kyonna ku maanyi go oba obuyambi obubaawo…",
    inputHint:      "{kbd:Enter} okutuma · {kbd:Shift+Enter} omurongo omuggya · {kbd:ESC} = fuluma amangu",
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
  },

  sw: {
    brandSub:       "Msaada salama · Uganda",
    statusKb:       "KB inafanya kazi · vipande 8",
    exitBtn:        "🚨 Toka Haraka",
    warnTitle:      "⚠️ Huduma ya taarifa tu — si mfumo wa dharura",
    warnBody:       "Uko katika hatari sasa hivi? Piga simu {bold:Polisi 999} au {bold:112} sasa. Hakuna data ya kibinafsi inayohifadhiwa. Tumia mode ya faragha kwa usalama zaidi. Bonyeza {kbd:ESC} kutoka mara moja.",
    emgTitle:       "📞 Nambari za Dharura — zinapatikana wakati wote",
    panicBtn:       "🆘 Nahitaji Msaada Sasa Hivi",
    panicTitle:     "Uko katika hatari ya haraka?",
    panicSub:       "Mazungumzo haya hayawezi kutuma msaada. Tafadhali wasiliana na mmoja wa hizi sasa:",
    panicNote:      "Kama hauwezi kupiga simu salama, jaribu kufika kwa jirani, mahali pa umma, au chumba kilichofungwa.",
    panicClose:     "Niko salama sasa — rudi",
    suggLabel:      "Maswali ya haraka ya kuanza",
    inputPlaceholder: "Uliza chochote kuhusu haki zako au msaada unaopatikana…",
    inputHint:      "{kbd:Enter} kutuma · {kbd:Shift+Enter} mstari mpya · {kbd:ESC} = toka haraka",
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
  },
}
