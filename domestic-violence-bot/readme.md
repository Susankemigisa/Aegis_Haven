# Domestic Violence Support Bot 🤝
## AI-Powered Information System for Uganda

**Group 3 Project - Tracy (AI), Joseline (Data), Suzan (UX/Ethics)**

---

## 📖 PROJECT OVERVIEW

This is a trauma-informed AI chatbot that provides accurate information about domestic violence rights and support services in Uganda. It combines:

- **Anthropic Claude AI** (claude-sonnet-4-20250514) for natural language conversation
- **RAG (Retrieval-Augmented Generation)** using Joseline's verified knowledge base
- **Trauma-informed UX design** with safety-first features
- **Uganda-specific legal information** from the Domestic Violence Act 2010

### What This Bot Does

✅ Provides accurate legal information about domestic violence in Uganda  
✅ Connects users to verified support organizations (FIDA, Gender Desk, etc.)  
✅ Offers safety planning guidance without making decisions for users  
✅ Maintains a non-judgmental, empowering tone  
✅ Protects user privacy (anonymous, no data storage)

### What This Bot Does NOT Do

❌ Provide emergency rescue services  
❌ Offer therapy or mental health treatment  
❌ Make decisions for users  
❌ Guarantee safety or legal outcomes  
❌ Collect or store personal information

---

## 🚀 QUICK START

### Prerequisites
- Python 3.8 or higher
- Anthropic API key ([get one here](https://console.anthropic.com))

### Installation

```bash
# 1. Install dependencies
pip install -r requirements.txt

# 2. Download knowledge base from Joseline's repository
python setup_knowledge_base.py

# 3. Set your API key
export ANTHROPIC_API_KEY='your-key-here'

# 4. Run the bot
streamlit run dv_support_app_with_rag.py
```

The bot will open in your browser at `http://localhost:8501`

---

## 📁 FILE STRUCTURE

```
dv-support-bot/
│
├── README.md                           # This file
├── requirements.txt                    # Python dependencies
│
├── dv_support_app_with_rag.py         # Main Streamlit app (RECOMMENDED)
├── dv-support-bot.html                 # Standalone HTML version (backup)
├── setup_knowledge_base.py             # RAG setup script
│
├── SYSTEM_PROMPT_DOCUMENTATION.md      # Prompt engineering guide
├── TEST_CONVERSATIONS.md               # 10 test scenarios
├── SETUP_GUIDE.md                      # Detailed installation guide
├── HANDOFF_TO_SUZAN.md                 # UX review guide for Suzan
│
└── knowledge_base/                     # Created by setup_knowledge_base.py
    ├── CHUNK_001_what_is_domestic_violence.txt
    ├── CHUNK_002_types_of_abuse.txt
    ├── CHUNK_003_who_is_protected.txt
    ├── CHUNK_004_victim_rights.txt
    ├── CHUNK_005_how_to_report_and_protection_orders.txt
    ├── CHUNK_006_support_organisations.txt
    ├── CHUNK_007_penalties_and_courts.txt
    └── CHUNK_008_myths_vs_facts.txt
```

---

## 👥 TEAM RESPONSIBILITIES

### Tracy - AI Chatbot & Prompt Engineering ✅ COMPLETE
- ✅ Built Streamlit application with RAG integration
- ✅ Wrote trauma-informed system prompt
- ✅ Created 10 test conversation scenarios
- ✅ Integrated Joseline's knowledge base
- ✅ Implemented safety guardrails
- ✅ Documented everything for team handoff

### Joseline - Data & Knowledge Base ✅ COMPLETE
- ✅ Researched Uganda Domestic Violence Act 2010
- ✅ Created 8 RAG chunks with verified information
- ✅ Compiled support organization database
- ✅ Prepared legal summaries in plain language
- ✅ Organized knowledge base for RAG ingestion

### Suzan - UX, Ethics & Safety ⏳ IN PROGRESS
- ⏳ Review bot responses for safety
- ⏳ Test all safety features (Quick Exit, etc.)
- ⏳ Audit for victim-blaming or harmful language
- ⏳ Create ethical guidelines document
- ⏳ Prepare final presentation slides
- ⏳ Sign off on ethical compliance

---

## 🔑 KEY FEATURES

### 1. Safety Features
- **Quick Exit Button** - Press ESC or click to immediately redirect to Google
- **Anonymous Access** - No login, no personal data collected
- **Privacy Notice** - Clear disclaimer about incognito browsing
- **Emergency Contacts** - Always visible (Police, FIDA, Gender Desk, Child Helpline)

### 2. Trauma-Informed Design
- Non-judgmental tone throughout
- Respects user autonomy (never tells them what to do)
- Validates experiences without minimizing danger
- Provides options, not commands
- Acknowledges complexity of leaving

### 3. RAG Integration
- 8 verified knowledge chunks from Joseline
- Real-time retrieval of relevant information
- Accurate Uganda-specific legal guidance
- Verified support organization contacts

### 4. Safety Guardrails
- Never tells users to stay in danger
- Always provides emergency contacts in crisis situations
- Never asks for identifying information
- Clear boundaries (not a therapist, not emergency service)
- No false promises about safety or outcomes

---

## 🧪 TESTING

### Run Automated Tests (Coming Soon)
```bash
python run_tests.py
```

### Manual Testing
See `TEST_CONVERSATIONS.md` for 10 required test scenarios.

Key scenarios to test:
1. Immediate danger response
2. First-time disclosure
3. "I've left before" scenario
4. Legal information accuracy
5. Economic abuse recognition
6. Child safety concerns
7. Autonomy and decision-making
8. Police reporting fears
9. Bot boundary testing
10. Cultural pressure navigation

---

## 📊 KNOWLEDGE BASE

### Sources
- **Uganda Domestic Violence Act, 2010** (Act No. 3 of 2010)
- **FIDA Uganda** (www.fidauganda.or.ug)
- **Uganda Police Force** (www.upf.go.ug)
- **Uganda Women's Network** (www.uwonet.or.ug)
- **Uganda Human Rights Commission** (www.uhrc.ug)

### Chunk Topics
1. What is domestic violence
2. Types of abuse (6 categories)
3. Who is protected under the law
4. Victim rights
5. How to report & get protection orders
6. Support organizations
7. Penalties and court system
8. Myths vs. facts

### Updating Knowledge Base
When laws or contact information changes:
1. Update the relevant chunk in `knowledge_base/`
2. Verify with official sources
3. Document the change
4. Retest affected scenarios

---

## 🔒 SECURITY & PRIVACY

### Current Implementation (Development)
- API key in environment variable or sidebar input
- No user authentication
- No conversation logging
- No data storage between sessions

### Production Deployment Requirements
⚠️ **DO NOT deploy current version to public internet** ⚠️

Before production:
1. **Backend API Server** - Never expose API keys in frontend
2. **Rate Limiting** - Prevent abuse
3. **HTTPS Only** - Encrypt all traffic
4. **Content Security Policy** - Prevent XSS attacks
5. **Monitoring** - Track usage and errors
6. **Abuse Detection** - Flag suspicious patterns

---

## 💰 COST ESTIMATION

### Anthropic API Pricing
- Model: claude-sonnet-4-20250514
- Input: ~$3 per million tokens
- Output: ~$15 per million tokens

### Estimated Costs
- Per conversation (10 messages): ~$0.08
- 100 conversations/month: ~$8
- 500 conversations/month: ~$40
- 1,000 conversations/month: ~$80

Note: RAG increases input token usage (context injection)

---

## 🐛 TROUBLESHOOTING

### "API Error: 401 Unauthorized"
**Problem:** Invalid API key  
**Solution:** Check key is correct, active, and has no extra spaces

### "Knowledge base not loaded"
**Problem:** RAG chunks not downloaded  
**Solution:** Run `python setup_knowledge_base.py`

### "Module 'setup_knowledge_base' not found"
**Problem:** Running from wrong directory  
**Solution:** Run from project root directory

### Quick Exit not working
**Problem:** Browser blocking redirects  
**Solution:** Test in different browser, check console for errors

### Bot gives incorrect legal information
**Problem:** Knowledge base outdated or RAG not working  
**Solution:** Verify chunks downloaded, check with Joseline's sources

---

## 📈 FUTURE ENHANCEMENTS

### Phase 2 (Post-Submission)
- [ ] Vector database (ChromaDB/Pinecone) for better RAG
- [ ] Multi-language support (Luganda, Swahili)
- [ ] Voice interface option
- [ ] SMS integration for areas with limited internet
- [ ] Shelter availability checker

### Phase 3 (Production)
- [ ] Backend API server
- [ ] User feedback system
- [ ] Analytics dashboard (privacy-preserving)
- [ ] Integration with existing support services
- [ ] Mobile app versions

---

## 📚 DOCUMENTATION

### For Developers
- `SETUP_GUIDE.md` - Detailed installation and deployment
- `SYSTEM_PROMPT_DOCUMENTATION.md` - Prompt engineering details

### For Testing
- `TEST_CONVERSATIONS.md` - 10 required test scenarios
- `HANDOFF_TO_SUZAN.md` - UX/safety review checklist

### For Users
- Disclaimer appears in app
- Emergency contacts always visible
- Clear boundaries about bot capabilities

---

## 🤝 ETHICAL GUIDELINES

This project follows trauma-informed care principles:

### Core Principles
1. **Safety First** - Every response prioritizes user safety
2. **Non-Judgmental** - No victim-blaming, no shaming
3. **Empowering** - Supports autonomy, provides options
4. **Accurate** - Verified Uganda-specific information
5. **Boundaried** - Clear about what bot can/cannot do

### Vulnerable User Protections
- Immediate danger → Emergency contacts prioritized
- Suicidal ideation → Crisis resources provided
- Child safety concerns → Child helpline included
- Never asks for identifying information
- Never makes promises about outcomes

---

## 📞 SUPPORT CONTACTS (Built Into Bot)

### Emergency
- **Police:** 999 or 112
- **FIDA Uganda:** +256-414-267-285

### Support Services
- **Police Gender Desk:** +256-712-820-106
- **Sauti 116 Child Helpline:** 116 (toll-free)
- **Uganda Women's Network:** +256-414-543-681
- **CEDOVIP:** +256-414-531-186

---

## 📝 LICENSE & USAGE

### Academic Project
This is a student project for educational purposes.

### Disclaimer
This bot is for information only. It does not replace:
- Emergency services
- Legal representation
- Medical care
- Professional counseling

### Contact Information Changes
Phone numbers and organization details verified as of May 2026.  
Recheck before deployment.

---

## 🎓 ACKNOWLEDGMENTS

### Team Members
- **Tracy** - AI Chatbot & Prompt Engineering
- **Joseline** - Knowledge Base & Legal Research
- **Suzan** - UX Design, Ethics & Safety

### Resources
- Anthropic Claude API
- Uganda Domestic Violence Act 2010
- FIDA Uganda
- Uganda Police Force Gender Desk
- Uganda Women's Network

### Special Thanks
- Organizations serving domestic violence survivors in Uganda
- Trauma-informed care research community

---

## 📧 PROJECT CONTACT

**For questions about this project:**
- Tracy: AI/Technical Implementation
- Joseline: Legal Content & Data
- Suzan: UX/Ethics Review

**For help with domestic violence:**
- FIDA Uganda: +256-414-267-285
- Police: 999 or 112

---

**Last Updated:** May 2026  
**Version:** 1.0  
**Status:** Ready for Suzan's UX/Ethics review

---

## ⚠️ IMPORTANT REMINDERS

1. **This is NOT a production-ready system** - Security hardening required
2. **API keys must be protected** - Never commit to public repositories
3. **Contact information must be verified** - Recheck before deployment
4. **Legal information must stay current** - Update when laws change
5. **User safety is paramount** - All changes must be reviewed for safety impact

---

**Built with care for the safety and empowerment of domestic violence survivors in Uganda.**