// lib/day2Data.js
// Safety Planning Checklist + Know Your Rights cards
// Suzan · UX & Ethics · Group 3

export const SAFETY_PLAN = {
  en: {
    title: "Safety Planning Checklist",
    subtitle: "Work through this privately. Nothing is saved — copy it when you're done.",
    copyBtn:   "📋 Copy my plan",
    printBtn:  "🖨 Print",
    closeBtn:  "Close",
    copied:    "Copied to clipboard!",
    sections: [
      {
        id: "signals",
        title: "🔴 Know the Warning Signs",
        items: [
          "I can recognise when the situation is about to escalate",
          "I know which behaviours are early warning signs for me",
          "I have thought about what triggers violent episodes",
        ],
      },
      {
        id: "escape",
        title: "🚪 Escape Route",
        items: [
          "I know which doors, windows, or exits I can use quickly",
          "I have thought about where I will go if I need to leave fast",
          "I know a safe place nearby (neighbour, church, shop, police post)",
          "I have practised leaving quickly without it being obvious",
        ],
      },
      {
        id: "documents",
        title: "📄 Important Documents",
        items: [
          "I know where my national ID / passport is kept",
          "I have copies of children's birth certificates stored safely",
          "I have copies of any court or protection orders",
          "I have hidden or memorised important account numbers",
        ],
      },
      {
        id: "bag",
        title: "👜 Emergency Bag (if possible)",
        items: [
          "Phone charger and phone",
          "Some cash or mobile money access",
          "Medication (for me and my children)",
          "Spare clothes for 2–3 days",
          "Children's items if needed",
        ],
      },
      {
        id: "people",
        title: "👥 Trusted People",
        items: [
          "I have at least one person I can call or go to at any hour",
          "That person knows my situation and will not tell the abuser",
          "I have memorised their phone number (not just saved in phone)",
          "I have a code word with someone that means 'call for help'",
        ],
      },
      {
        id: "children",
        title: "👶 Children's Safety",
        items: [
          "My children know a safe place to go if there is danger",
          "My children know not to get in the middle of an argument",
          "I have a plan for collecting children from school if needed",
          "I have told a trusted adult at school what may be happening",
        ],
      },
      {
        id: "legal",
        title: "⚖️ Legal Steps",
        items: [
          "I know I can apply for a Protection Order at any Magistrate's Court",
          "I know FIDA Uganda can help me for free: 0800 111 511",
          "I have noted the date, time, and details of incidents",
          "I know reporting to the Gender Desk is an option: 0800 199 195",
        ],
      },
      {
        id: "after",
        title: "🏠 After Leaving",
        items: [
          "I know where I can stay temporarily (shelter, family, friend)",
          "I know I can apply for emergency financial support",
          "I have thought about how to keep my new location private",
          "I have a plan for the children's schooling",
        ],
      },
    ],
  },
  lg: {
    title: "Etterekero ly'Okutegeka Eby'Okukulinda",
    subtitle: "Kola kino mu bwereere. Tewali kigumibwa — kopi bw'onooza.",
    copyBtn:   "📋 Kopi etterekero lyange",
    printBtn:  "🖨 Druka",
    closeBtn:  "Ggalawo",
    copied:    "Yakopibwa!",
    sections: [
      {
        id: "signals",
        title: "🔴 Manya Obubonero",
        items: [
          "Nsobola okutegeera bw'omutindo gujja okweyongera",
          "Nmanyi ebikola ebirangira obubonero obw'olubereberye",
          "Nlowooza ku bintu ebivugula obuzibu",
        ],
      },
      {
        id: "escape",
        title: "🚪 Oluguwo lw'Okudduuka",
        items: [
          "Nmanyi emyango, endikwa, oba oluguwo lw'okufuluma amangu",
          "Nlowooza ku kifo gye ngenda bw'oba neetaaga okufuluma amangu",
          "Nmanyi ekifo ekiweebwako abantu eky'ompi (omutuuze, ekkanisa, sitoopu, siteeji ya poliisi)",
          "Nkola okuyiga okufuluma amangu nga tebagenda kitegeera",
        ],
      },
      {
        id: "documents",
        title: "📄 Ebiwandiiko Ebikyamu",
        items: [
          "Nmanyi ey'osuulibwa National ID / passport yange",
          "Nnina amakopi g'obadde bw'obuzaaliwa bw'abaana agakulunzibwa bulungi",
          "Nnina amakopi g'amateeka ago gonna",
          "Nnyoomye oba nterekera amawulire amakyamu g'akawunti",
        ],
      },
      {
        id: "bag",
        title: "👜 Ssaaka y'Obuzibu (bw'onosobola)",
        items: [
          "Chaja ya simu ne simu",
          "Ensimbi enono oba okufuna esente z'omukono",
          "Eddagala (lyo nange n'abaana bange)",
          "Engoye ez'ennaku 2-3",
          "Ebintu by'abaana bw'oba bitaagibwa",
        ],
      },
      {
        id: "people",
        title: "👥 Abantu ab'Okwesiga",
        items: [
          "Nnina omu nga muntu gw'osobola okuyita oba okugenda gy'ali essawa yonna",
          "Omuntu oyo amanyi embeera yange era taligamba omukozi",
          "Nnyadde enamba ye (si mu simu yokka)",
          "Nnina ekigambo eky'akakiiko ne muntu oyo ekitegeeza 'yambira obuyambi'",
        ],
      },
      {
        id: "children",
        title: "👶 Okukulinda Abaana",
        items: [
          "Abaana bange bamanyi kifo eky'okuddukira bw'oba waliwo kabi",
          "Abaana bange bamanyi obutayingira mu makemererwa",
          "Nnina entegeka y'okuwanirira abaana ku ssomero bw'oba kitaagibwa",
          "Nbuulira omukulembeze gw'okwesiga ku ssomero ebiriwo",
        ],
      },
      {
        id: "legal",
        title: "⚖️ Enteekateeka y'Ettaka",
        items: [
          "Nmanyi nsobola okubuuza Protection Order mu Kooti yonna ya Magistrate",
          "Nmanyi FIDA Uganda bansobola okuyamba wabwerere: 0800 111 511",
          "Nteekeddwo olunaku, essawa, n'amakumaoku g'ebikwatibwako",
          "Nmanyi okubuulira Siteeji ya Poliisi kya kye nnina: 0800 199 195",
        ],
      },
      {
        id: "after",
        title: "🏠 Oluvannyuma lw'Okufuluma",
        items: [
          "Nmanyi eby'okulala by'amangu (ekibuga, eddwaliro, mutuuze, mukwano)",
          "Nmanyi nsobola okubuuza obuyambi bw'ensimbi bw'obuzibu",
          "Nlowooza ku ngeri y'okukuuma kifo kyange okya omunda",
          "Nnina entegeka y'essomero ly'abaana",
        ],
      },
    ],
  },
  sw: {
    title: "Orodha ya Kupanga Usalama",
    subtitle: "Fanya hii kwa faragha. Hakuna kinachohifadhiwa — nakili ukifika mwisho.",
    copyBtn:   "📋 Nakili mpango wangu",
    printBtn:  "🖨 Chapisha",
    closeBtn:  "Funga",
    copied:    "Imenakiliwa!",
    sections: [
      {
        id: "signals",
        title: "🔴 Jua Ishara za Tahadhari",
        items: [
          "Ninaweza kutambua hali inapokaribia kuwa mbaya zaidi",
          "Najua tabia ambazo ni ishara za mapema kwangu",
          "Nimefikiria kuhusu nini kinachochochea matukio ya ukatili",
        ],
      },
      {
        id: "escape",
        title: "🚪 Njia ya Kutoroka",
        items: [
          "Najua milango, madirisha, au njia za kutoka haraka",
          "Nimefikiria kuhusu nitakapoenda ikiwa ninahitaji kuondoka haraka",
          "Najua mahali salama karibu (jirani, kanisa, duka, kituo cha polisi)",
          "Nimejifunza kuondoka haraka bila kuonekana wazi",
        ],
      },
      {
        id: "documents",
        title: "📄 Nyaraka Muhimu",
        items: [
          "Najua kitambulisho changu cha taifa / pasipoti kipo wapi",
          "Nina nakala za vyeti vya kuzaliwa vya watoto zilizohifadhiwa salama",
          "Nina nakala za amri yoyote ya mahakama au amri ya ulinzi",
          "Nimehifadhi au kukariri nambari muhimu za akaunti",
        ],
      },
      {
        id: "bag",
        title: "👜 Mfuko wa Dharura (ikiwezekana)",
        items: [
          "Chaja ya simu na simu",
          "Pesa kidogo au upatikanaji wa pesa ya simu",
          "Dawa (zangu na za watoto wangu)",
          "Nguo za siku 2–3",
          "Vitu vya watoto ikiwa vinahitajika",
        ],
      },
      {
        id: "people",
        title: "👥 Watu wa Kuaminiwa",
        items: [
          "Nina angalau mtu mmoja ninayeweza kumpigia simu au kwenda kwake wakati wowote",
          "Mtu huyo anajua hali yangu na hatamuambia mtesi",
          "Nimekariri nambari yake ya simu (si kuihifadhi kwenye simu tu)",
          "Nina neno la siri na mtu fulani lenye maana 'omba msaada'",
        ],
      },
      {
        id: "children",
        title: "👶 Usalama wa Watoto",
        items: [
          "Watoto wangu wanajua mahali salama pa kwenda ikiwa kuna hatari",
          "Watoto wangu wanajua wasijaribu kuingilia kati ugomvi",
          "Nina mpango wa kuwachukua watoto shuleni ikiwa inahitajika",
          "Nimemwambia mtu mwaminifu shuleni kuhusu kinachoendelea",
        ],
      },
      {
        id: "legal",
        title: "⚖️ Hatua za Kisheria",
        items: [
          "Najua ninaweza kuomba Amri ya Ulinzi katika Mahakama yoyote ya Mahakimu",
          "Najua FIDA Uganda inaweza kunisaidia bure: 0800 111 511",
          "Nimeandika tarehe, wakati, na maelezo ya matukio",
          "Najua kuripoti kwa Dawati la Jinsia ni chaguo: 0800 199 195",
        ],
      },
      {
        id: "after",
        title: "🏠 Baada ya Kuondoka",
        items: [
          "Najua ninaweza kukaa wapi kwa muda (makazi ya dharura, familia, rafiki)",
          "Najua ninaweza kuomba msaada wa kifedha wa dharura",
          "Nimefikiria jinsi ya kulinda siri ya mahali pangu papya",
          "Nina mpango wa masomo ya watoto",
        ],
      },
    ],
  },
}

export const RIGHTS_CARDS = {
  en: [
    {
      id: "what-is-dv",
      icon: "⚖️",
      title: "What Is Domestic Violence?",
      color: "#7B6EFA",
      summary: "Under Uganda's Domestic Violence Act 2010, domestic violence includes physical, sexual, emotional, verbal, psychological, and economic abuse.",
      details: [
        "Physical abuse: hitting, kicking, burning, choking, or any physical harm",
        "Sexual abuse: forced sex or any unwanted sexual act within a relationship",
        "Emotional/psychological abuse: threats, intimidation, isolation from family",
        "Economic abuse: controlling money, stopping you from working, destroying property",
        "Verbal abuse: insults, humiliation, constant criticism",
        "The law protects spouses, children, parents, and people in domestic relationships",
      ],
      contact: { num: "0800 111 511", label: "FIDA Uganda — free legal advice" },
    },
    {
      id: "protection-order",
      icon: "🛡️",
      title: "What Is a Protection Order?",
      color: "#2ECFCF",
      summary: "A protection order is a court document that legally prohibits the abuser from contacting, harassing, or harming you.",
      details: [
        "You can apply at any Magistrate's Court in Uganda — no filing fee",
        "An emergency protection order can be issued the same day",
        "The order can ban the abuser from your home, workplace, or school",
        "Violating a protection order is a criminal offence",
        "FIDA Uganda can accompany you and help with the application for free",
        "You do not need a lawyer — the court clerk can assist you",
      ],
      contact: { num: "0800 111 511", label: "FIDA Uganda — will accompany you" },
    },
    {
      id: "how-to-report",
      icon: "📋",
      title: "How to Report Safely",
      color: "#FF8C69",
      summary: "You have the right to report domestic violence to police. The Police Gender Desk is specifically trained for these cases.",
      details: [
        "Go to the nearest police station and ask for the Gender Desk officer",
        "You can bring a trusted friend or family member with you",
        "Ask for a copy of your OB (Occurrence Book) number as proof of reporting",
        "You can also report to FIDA Uganda who will advise on next steps",
        "You do not have to report if you are not ready — it is your choice",
        "Reporting does not automatically mean going to court",
      ],
      contact: { num: "0800 199 195", label: "Police Gender Desk" },
    },
    {
      id: "economic-abuse",
      icon: "💰",
      title: "Economic Abuse Is Violence",
      color: "#F59E0B",
      summary: "Controlling someone's access to money, stopping them from working, or destroying their property is domestic violence under Ugandan law.",
      details: [
        "Withholding money for food, rent, or children's needs is abuse",
        "Preventing you from getting a job or education is abuse",
        "Taking your salary or savings without consent is abuse",
        "Destroying your property or assets is a criminal offence",
        "You can apply for a court order requiring financial support",
        "Even if unmarried, economic abuse in a domestic relationship is covered",
      ],
      contact: { num: "0800 111 511", label: "FIDA Uganda — financial rights advice" },
    },
    {
      id: "fida",
      icon: "🤝",
      title: "What FIDA Uganda Can Do",
      color: "#4ADE80",
      summary: "FIDA Uganda provides free legal services to women and children affected by domestic violence.",
      details: [
        "Free legal advice by phone: 0800 111 511 (toll-free)",
        "Accompany you to the police station or court",
        "Help you apply for a protection order at no cost",
        "Represent you in court proceedings if needed",
        "Advise on divorce, custody, and property rights",
        "Provide counselling referrals and safe space support",
        "Offices in Kampala and regional centres across Uganda",
      ],
      contact: { num: "0800 111 511", label: "Call FIDA — completely free" },
    },
    {
      id: "children",
      icon: "👶",
      title: "Children & Domestic Violence",
      color: "#E879F9",
      summary: "Children who witness domestic violence are legally recognised as victims under Uganda's DV Act 2010.",
      details: [
        "Witnessing violence is harmful to children — it is not 'just an adult matter'",
        "You will NOT automatically lose custody by leaving an abusive situation",
        "Courts consider the safety of children when issuing protection orders",
        "The Sauti 116 helpline specifically supports children in crisis",
        "Schools can be told to restrict the abuser's access to collect your child",
        "Your children have the right to safety — and so do you",
      ],
      contact: { num: "116", label: "Sauti Child Helpline — toll-free" },
    },
  ],
  lg: [
    {
      id: "what-is-dv",
      icon: "⚖️",
      title: "Obugaasi mu Nju Kya Ki?",
      color: "#7B6EFA",
      summary: "Mu Ddeeriya lya Uganda lya 2010, obugaasi mu nju bulaga obuzibu obw'omubiri, ekyama, omwoyo, olulimi, n'enteekateeka ez'ensimbi.",
      details: [
        "Obuzibu bw'omubiri: okukuba, okupiga, okwokya, okusinda, oba obuzibu bwonna obw'omubiri",
        "Obuzibu bw'ekyama: okwetaaga okwegatta mu nkola eyimiridde mu mulimu",
        "Obuzibu bw'omwoyo: obukangabwa, okutya, okulekebwa n'ab'okutwala",
        "Obuzibu bw'ensimbi: okuddirira ensimbi, okuzibira okulima, okonoonera ebintu",
        "Obuzibu bw'olulimi: okulumya, okuswaza, okuniga buli kiseera",
      ],
      contact: { num: "0800 111 511", label: "FIDA Uganda — obuyambi bw'ettaka wabwerere" },
    },
    {
      id: "protection-order",
      icon: "🛡️",
      title: "Protection Order Kya Ki?",
      color: "#2ECFCF",
      summary: "Protection Order kiwandiiko kya Kooti ekizibira omukozi okukwatana nawe, okukulumya, oba okukuziiza.",
      details: [
        "Osobola okubuuza mu Kooti yonna ya Magistrate mu Uganda — wabwerere",
        "Emergency Protection Order ey'okusituka enywa mu lunaku lw'omu",
        "Ekirungo kisobola okuzibira omukozi okunsemberera mu nju, mu mirimu, oba ku ssomero",
        "Okumenya ekirungo kya Protection Order kya kkolwa ery'obuzibu",
        "FIDA Uganda baasobola okuyambenga okubuuza wabwerere",
      ],
      contact: { num: "0800 111 511", label: "FIDA Uganda — bajja nawe" },
    },
    {
      id: "how-to-report",
      icon: "📋",
      title: "Engeri y'Okubuulira mu Butereevu",
      color: "#FF8C69",
      summary: "Olina eddembe lokubuulira Abapoliisi obugaasi mu nju. Siteeji ya Poliisi ey'Obugaasi yegenderedde ebirowoozo ebi.",
      details: [
        "Genda ku siteeji ya poliisi enkeddwa n'okubuuza poliisi wa Siteeji y'Obugaasi",
        "Osobola okujja ne mukwano oba omuntu gw'oyesiga",
        "Buuza ekopi y'enamba yo OB ng'obujulizi bw'okubuulira",
        "Osobola era okubuulira FIDA Uganda abakuyambe ku nkola y'okuyingira",
        "Toliina kubuulira bw'oba tebwereera — kwe kw'oliwo",
      ],
      contact: { num: "0800 199 195", label: "Siteeji ya Poliisi ey'Obugaasi" },
    },
    {
      id: "economic-abuse",
      icon: "💰",
      title: "Obuzibu bw'Ensimbi Kya Bulabe",
      color: "#F59E0B",
      summary: "Okuddirira abantu ensimbi, okubazibira okulima, oba okonoonera ebintu byabwe kya bulabe mu ttaka lya Uganda.",
      details: [
        "Okuzibira ensimbi z'ebyokulya, omusulo, oba ebyetaagibwa by'abaana kya buzibu",
        "Okukuzibira okufuna mulimu oba okuiga kya buzibu",
        "Okuggyako mpiisa yo oba akatale kawe nga toyagadde kya buzibu",
        "Okonoonera ebintu byo kya kkolwa ery'obuzibu",
        "Osobola okubuuza ekirungo kya kooti ekyetaagisa obuyambi bw'ensimbi",
      ],
      contact: { num: "0800 111 511", label: "FIDA Uganda — okubuulirwa ku maanyi g'ensimbi" },
    },
    {
      id: "fida",
      icon: "🤝",
      title: "FIDA Uganda Basobola Okukola Ki?",
      color: "#4ADE80",
      summary: "FIDA Uganda bawa obuyambi bw'ettaka wabwerere abakazi n'abaana abakubiddwa obugaasi mu nju.",
      details: [
        "Okubuulirwa kw'ettaka wabwerere ku simu: 0800 111 511",
        "Okujja nawe ku siteeji ya poliisi oba kooti",
        "Okukuyamba okubuuza Protection Order wabwerere",
        "Okukuwakilira mu birowoozo bya kooti bw'oba bitaagibwa",
        "Okubuulira ku buyekamu, obukuumi, n'eddembe ery'ebintu",
      ],
      contact: { num: "0800 111 511", label: "Yita FIDA — wabwerere ddala" },
    },
    {
      id: "children",
      icon: "👶",
      title: "Abaana n'Obugaasi mu Nju",
      color: "#E879F9",
      summary: "Abaana abalabirira obugaasi baweebwa obujulizi ng'abo abakubiddwa mu ttaka lya Uganda lya DV Act 2010.",
      details: [
        "Okulaba obuzibu kukola eri abaana — si 'ebirowoozo by'abakulu bukooba'",
        "Toliggyibwako abaana bw'oba ofuluma mu mbeera ey'obuzibu",
        "Amakooti gaganye okukulinda kw'abaana nga gawaayo Protection Orders",
        "Sauti 116 yeyamberera abaana abaali mu kabi",
      ],
      contact: { num: "116", label: "Sauti Child Helpline — wabwerere" },
    },
  ],
  sw: [
    {
      id: "what-is-dv",
      icon: "⚖️",
      title: "Ukatili wa Nyumbani ni Nini?",
      color: "#7B6EFA",
      summary: "Chini ya Sheria ya Uganda ya Ukatili wa Nyumbani ya 2010, ukatili wa nyumbani unajumuisha unyanyasaji wa kimwili, kingono, kihisia, wa maneno, kisaikolojia, na kiuchumi.",
      details: [
        "Unyanyasaji wa kimwili: kupigwa, kukickwa, kuchomwa, kusongwa, au madhara yoyote ya kimwili",
        "Unyanyasaji wa kingono: kulazimiwa kufanya ngono au kitendo chochote cha ngono kisichotakiwa",
        "Unyanyasaji wa kisaikolojia: vitisho, kutishwa, kutengwa na familia",
        "Unyanyasaji wa kiuchumi: kudhibiti pesa, kukuzuia kufanya kazi, kuharibu mali",
        "Unyanyasaji wa maneno: matusi, kudhalilishwa, kukosowewa mara kwa mara",
      ],
      contact: { num: "0800 111 511", label: "FIDA Uganda — ushauri wa kisheria bure" },
    },
    {
      id: "protection-order",
      icon: "🛡️",
      title: "Amri ya Ulinzi ni Nini?",
      color: "#2ECFCF",
      summary: "Amri ya ulinzi ni hati ya mahakama inayomkataza mtesi kukuwasiliana, kukusumbua, au kukudhuru.",
      details: [
        "Unaweza kuomba katika Mahakama yoyote ya Mahakimu Uganda — bila ada",
        "Amri ya dharura inaweza kutolewa siku hiyo hiyo",
        "Amri inaweza kumkataza mtesi nyumbani kwako, kazini, au shuleni",
        "Kukiuka amri ya ulinzi ni kosa la jinai",
        "FIDA Uganda inaweza kukusaidia na ombi bila malipo",
      ],
      contact: { num: "0800 111 511", label: "FIDA Uganda — watakwenda nawe" },
    },
    {
      id: "how-to-report",
      icon: "📋",
      title: "Jinsi ya Kuripoti kwa Usalama",
      color: "#FF8C69",
      summary: "Una haki ya kuripoti ukatili wa nyumbani kwa polisi. Dawati la Jinsia limefunzwa mahususi kwa kesi hizi.",
      details: [
        "Nenda kituo cha polisi karibu nawe na uomba afisa wa Dawati la Jinsia",
        "Unaweza kuleta rafiki au mwanafamilia anayekuamini",
        "Omba nakala ya nambari yako ya OB kama uthibitisho wa kuripoti",
        "Unaweza pia kuripoti kwa FIDA Uganda ambao watakushauri hatua zifuatazo",
        "Huhitaji kuripoti ikiwa hujaandaliwa — ni chaguo lako",
      ],
      contact: { num: "0800 199 195", label: "Dawati la Jinsia la Polisi" },
    },
    {
      id: "economic-abuse",
      icon: "💰",
      title: "Unyanyasaji wa Kiuchumi ni Ukatili",
      color: "#F59E0B",
      summary: "Kudhibiti upatikanaji wa pesa za mtu, kumzuia kufanya kazi, au kuharibu mali yake ni ukatili wa nyumbani chini ya sheria ya Uganda.",
      details: [
        "Kuzuia pesa za chakula, kodi, au mahitaji ya watoto ni unyanyasaji",
        "Kukuzuia kupata kazi au elimu ni unyanyasaji",
        "Kuchukua mshahara au akiba yako bila idhini ni unyanyasaji",
        "Kuharibu mali yako ni kosa la jinai",
        "Unaweza kuomba amri ya mahakama inayohitaji msaada wa kifedha",
      ],
      contact: { num: "0800 111 511", label: "FIDA Uganda — ushauri wa haki za kifedha" },
    },
    {
      id: "fida",
      icon: "🤝",
      title: "FIDA Uganda Inaweza Kufanya Nini?",
      color: "#4ADE80",
      summary: "FIDA Uganda hutoa huduma za kisheria bure kwa wanawake na watoto walioathiriwa na ukatili wa nyumbani.",
      details: [
        "Ushauri wa kisheria bure kwa simu: 0800 111 511",
        "Kukuandamana kwenda kituo cha polisi au mahakamani",
        "Kukusaidia kuomba amri ya ulinzi bila gharama",
        "Kukuwakilisha katika kesi za mahakama ikiwa inahitajika",
        "Kukushauri kuhusu talaka, ulinzi wa watoto, na haki za mali",
      ],
      contact: { num: "0800 111 511", label: "Piga simu FIDA — bure kabisa" },
    },
    {
      id: "children",
      icon: "👶",
      title: "Watoto na Ukatili wa Nyumbani",
      color: "#E879F9",
      summary: "Watoto wanaoshuhudia ukatili wa nyumbani wanatambuliwa kisheria kama waathiriwa chini ya Sheria ya Uganda ya DV ya 2010.",
      details: [
        "Kushuhudia ukatili kunadhuru watoto — si 'suala la watu wazima tu'",
        "Hutapoteza ulinzi wa watoto kiotomatiki kwa kuondoka hali ya unyanyasaji",
        "Mahakama huzingatia usalama wa watoto wanapotoa amri za ulinzi",
        "Msaada wa watoto 116 unasaidia watoto walioko katika hali ngumu",
      ],
      contact: { num: "116", label: "Sauti — Msaada wa Watoto, bure" },
    },
  ],
}

export const OFFLINE_RESPONSES = {
  "protection order": `A protection order is a legal document issued by a Magistrate's Court that prohibits an abuser from contacting, harassing, or harming you.

How to get one:
• Go to any Magistrate's Court in Uganda — there is no filing fee
• Ask for the Family Court or Domestic Violence desk
• An emergency protection order can be issued the same day
• FIDA Uganda can accompany you and help you apply for free: 0800 111 511

Violating a protection order is a criminal offence.`,

  "domestic violence": `Under Uganda's Domestic Violence Act 2010, domestic violence includes:

• Physical abuse — hitting, kicking, burning, choking
• Sexual abuse — forced or unwanted sexual acts within a relationship  
• Emotional/psychological abuse — threats, isolation, intimidation
• Economic abuse — controlling money, stopping you from working
• Verbal abuse — insults, humiliation, constant criticism

The law protects spouses, children, parents, and people in domestic relationships.

For free legal advice: FIDA Uganda — 0800 111 511`,

  "fida": `FIDA Uganda provides completely free legal services to women and children affected by domestic violence.

They can:
• Give you free legal advice over the phone: 0800 111 511
• Go with you to the police station or court
• Help you apply for a protection order at no cost
• Represent you in court if needed
• Advise on divorce, custody, and property rights

Call them anytime — the service is free and confidential.`,

  "report": `You have the right to report domestic violence to the police. Here is how to do it safely:

1. Go to the nearest police station and ask for the Gender Desk officer
2. Bring a trusted friend or family member if possible
3. Ask for a copy of your OB (Occurrence Book) number as proof of reporting
4. You can also call the Gender Desk directly: 0800 199 195
5. You do not have to report if you are not ready — it is your choice

Reporting does not automatically mean going to court. FIDA Uganda can advise you on what happens next: 0800 111 511`,

  "rights": `Under the Uganda Domestic Violence Act 2010, you have the right to:

• Live free from physical, sexual, emotional, and economic abuse
• Apply for a protection order at any Magistrate's Court — free of charge
• Have the abuser removed from the shared home
• Keep your children safe — leaving does not mean losing custody
• Access free legal help through FIDA Uganda: 0800 111 511
• Report to the Police Gender Desk: 0800 199 195

You deserve safety. You deserve respect. These are not just words — they are your legal rights.`,

  "economic": `Controlling someone's money or stopping them from working is domestic violence under Ugandan law.

Economic abuse includes:
• Withholding money for food, rent, or children's needs
• Preventing you from getting a job or continuing education
• Taking your salary or savings without your consent
• Destroying your property or assets

What you can do:
• Apply for a court order requiring the abuser to provide financial support
• Contact FIDA Uganda for free advice: 0800 111 511
• Report to the Police Gender Desk: 0800 199 195`,

  default: `I'm not able to connect to the AI service right now, but here is important information:

Your key rights under Uganda's Domestic Violence Act 2010:
• You have the right to be free from physical, sexual, emotional, and economic abuse
• You can apply for a free Protection Order at any Magistrate's Court
• You have the right to keep your children safe

Support contacts always available:
• Police: 999 or 112
• FIDA Uganda (free legal help): 0800 111 511
• Police Gender Desk: 0800 199 195
• Sauti Child Helpline: 116
• Justice Centres Uganda: 0800 100 210

Please try refreshing the page or check your internet connection to access full AI support.`,
}
