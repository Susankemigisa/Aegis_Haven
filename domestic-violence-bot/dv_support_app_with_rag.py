"""
Domestic Violence Support Bot - Streamlit Application with RAG
Tracy's Implementation with Joseline's Knowledge Base Integration

SETUP INSTRUCTIONS:
1. Run: python setup_knowledge_base.py (downloads Joseline's chunks)
2. Run: streamlit run dv_support_app_with_rag.py
"""

import streamlit as st
import anthropic
import os
from pathlib import Path
from datetime import datetime

# Import knowledge base functions
try:
    from setup_knowledge_base import load_knowledge_base, get_relevant_context
    RAG_AVAILABLE = True
except ImportError:
    RAG_AVAILABLE = False
    print("⚠️  RAG setup not found. Run setup_knowledge_base.py first.")

# Page configuration
st.set_page_config(
    page_title="Safe Space Support",
    page_icon="🤝",
    layout="wide",
    initial_sidebar_state="collapsed"
)

# Custom CSS (same trauma-informed design)
st.markdown("""
<style>
    .main {
        background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    }
    
    .quick-exit {
        position: fixed;
        top: 10px;
        right: 10px;
        z-index: 999;
        background: #dc3545;
        color: white;
        padding: 10px 20px;
        border-radius: 8px;
        font-weight: bold;
        text-decoration: none;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }
    
    .disclaimer-box {
        background: #fff3cd;
        border-left: 4px solid #ffc107;
        padding: 20px;
        border-radius: 8px;
        margin: 20px 0;
    }
    
    .emergency-box {
        background: #d1ecf1;
        border-left: 4px solid #17a2b8;
        padding: 20px;
        border-radius: 8px;
        margin: 20px 0;
    }
    
    .user-message {
        background: #667eea;
        color: white;
        padding: 15px 20px;
        border-radius: 18px;
        border-bottom-right-radius: 4px;
        margin: 10px 0;
        max-width: 70%;
        float: right;
        clear: both;
    }
    
    .bot-message {
        background: white;
        color: #333;
        padding: 15px 20px;
        border-radius: 18px;
        border-bottom-left-radius: 4px;
        margin: 10px 0;
        max-width: 70%;
        float: left;
        clear: both;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    
    #MainMenu {visibility: hidden;}
    footer {visibility: hidden;}
    
    .stTextInput > div > div > input {
        border-radius: 25px;
        border: 2px solid #e9ecef;
        padding: 15px;
    }
    
    .stButton > button {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border-radius: 25px;
        padding: 10px 30px;
        font-weight: bold;
        border: none;
        width: 100%;
    }
    
    .stButton > button:hover {
        box-shadow: 0 4px 8px rgba(102, 126, 234, 0.3);
    }
    
    .rag-status {
        background: #d4edda;
        border-left: 4px solid #28a745;
        padding: 10px 15px;
        border-radius: 6px;
        margin: 10px 0;
        font-size: 14px;
    }
</style>
""", unsafe_allow_html=True)

# Quick exit functionality
st.markdown("""
<a href="https://www.google.com" class="quick-exit" 
   onclick="window.location.replace('https://www.google.com'); return false;">
   Quick Exit (ESC)
</a>
<script>
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            window.location.replace('https://www.google.com');
        }
    });
</script>
""", unsafe_allow_html=True)

# Initialize session state
if 'messages' not in st.session_state:
    st.session_state.messages = []
    st.session_state.first_load = True

if 'api_key' not in st.session_state:
    st.session_state.api_key = os.environ.get('ANTHROPIC_API_KEY', '')

if 'knowledge_base' not in st.session_state:
    if RAG_AVAILABLE:
        try:
            st.session_state.knowledge_base = load_knowledge_base()
            st.session_state.rag_loaded = len(st.session_state.knowledge_base) > 0
        except Exception as e:
            st.session_state.knowledge_base = {}
            st.session_state.rag_loaded = False
    else:
        st.session_state.knowledge_base = {}
        st.session_state.rag_loaded = False

# Core system prompt
SYSTEM_PROMPT = """You are a compassionate, trauma-informed support bot providing information about domestic violence rights and resources in Uganda. You are NOT a crisis counselor, therapist, or emergency service.

CORE PRINCIPLES:
1. SAFETY FIRST: Always prioritize user safety in every response
2. NON-JUDGMENTAL: Never blame, shame, or question the user's choices
3. EMPOWERING: Focus on user autonomy and informed choices
4. INFORMATIVE: Provide accurate, actionable information
5. BOUNDARIES: Be clear about what you can and cannot do

CRITICAL SAFETY RULES:
• NEVER tell someone to stay in a dangerous situation
• NEVER make decisions for the user - provide information and options
• NEVER guarantee safety or legal outcomes
• NEVER ask for identifying personal information (name, address, etc.)
• NEVER provide medical or psychological diagnosis
• ALWAYS include at least one support contact in serious conversations
• ALWAYS remind users this is not an emergency service if they describe immediate danger

RESPONSE STRUCTURE:
When someone describes a situation:
1. Validate their feelings: "What you're experiencing is serious, and you deserve support"
2. Provide relevant legal information in plain language
3. Offer 2-3 specific, actionable options (not commands)
4. Include at least one support contact
5. End with reminder of autonomy: "Only you know what feels safest for you right now"

TONE AND LANGUAGE:
• Warm, accessible language - avoid legal jargon
• Gentle but direct about safety risks
• Use "you deserve" and "you have the right to" framing
• Acknowledge difficulty: "This is not an easy situation"
• NEVER use victim-blaming language

WHEN IMMEDIATE DANGER IS MENTIONED:
"I'm deeply concerned for your safety. This chat cannot provide emergency help. If you are in immediate danger, please try to reach safety and call:
• Police: 999 or 112  
• FIDA Uganda: +256-414-267-285

If you cannot call safely, can you get to a trusted neighbor, friend, or public place?"

REMEMBER: Every response should leave the user feeling more informed, more empowered, and clearer about available support - never more afraid, confused, or ashamed."""

# Header
st.markdown("""
<div style='text-align: center; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
            padding: 40px; border-radius: 16px 16px 0 0; color: white; margin-bottom: 20px;'>
    <h1 style='margin: 0; font-size: 32px;'>🤝 Safe Space Support Bot</h1>
    <p style='margin: 10px 0 0 0; opacity: 0.9;'>Confidential information and guidance on your rights and available support</p>
</div>
""", unsafe_allow_html=True)

# RAG Status Indicator
if st.session_state.rag_loaded:
    st.markdown("""
    <div class='rag-status'>
        ✅ <strong>Knowledge Base Loaded:</strong> Bot has access to Joseline's verified legal information and support resources
    </div>
    """, unsafe_allow_html=True)
else:
    st.warning("⚠️ Knowledge base not loaded. Run `python setup_knowledge_base.py` first. Bot will use fallback information.")

# Disclaimer
st.markdown("""
<div class='disclaimer-box'>
    <strong style='font-size: 18px;'>⚠️ Important Notice</strong><br><br>
    This is an <strong>information service only</strong>, not an emergency response system. 
    If you are in immediate danger, please call Uganda Police: <strong>999</strong> or <strong>112</strong>. 
    This chat does not store your personal information, but for complete privacy, 
    use private/incognito browsing mode and press the "Quick Exit" button if you need to leave quickly.
</div>
""", unsafe_allow_html=True)

# Emergency contacts
st.markdown("""
<div class='emergency-box'>
    <strong style='font-size: 18px;'>📞 24/7 Emergency Contacts</strong><br><br>
    <ul style='margin: 10px 0; padding-left: 20px;'>
        <li><strong>Police Emergency:</strong> 999 or 112</li>
        <li><strong>FIDA Uganda:</strong> +256-414-267-285</li>
        <li><strong>Police Gender Desk:</strong> +256-712-820-106</li>
        <li><strong>Sauti 116 Child Helpline:</strong> 116 (toll-free)</li>
    </ul>
</div>
""", unsafe_allow_html=True)

# Sidebar configuration
with st.sidebar:
    st.markdown("### ⚙️ Configuration")
    
    api_key_input = st.text_input(
        "Anthropic API Key",
        value=st.session_state.api_key,
        type="password",
        help="Get your API key from console.anthropic.com"
    )
    if api_key_input:
        st.session_state.api_key = api_key_input
    
    st.markdown("---")
    
    st.markdown("### 📚 Knowledge Base Status")
    if st.session_state.rag_loaded:
        st.success(f"✅ {len(st.session_state.knowledge_base)} chunks loaded")
        
        with st.expander("View loaded chunks"):
            for chunk_id in sorted(st.session_state.knowledge_base.keys()):
                st.text(chunk_id)
    else:
        st.error("❌ Not loaded")
        if st.button("📥 Download Knowledge Base"):
            st.info("Run this command in terminal:\n\n`python setup_knowledge_base.py`")
    
    st.markdown("---")
    
    st.markdown("### ℹ️ About This Bot")
    st.info("""
    **This bot provides:**
    - Legal rights information
    - Support service contacts
    - Safety planning guidance
    - Non-judgmental support
    
    **It does NOT:**
    - Provide emergency services
    - Offer therapy/counseling
    - Make decisions for you
    - Store personal information
    """)
    
    st.markdown("---")
    
    if st.button("🗑️ Clear Conversation"):
        st.session_state.messages = []
        st.session_state.first_load = True
        st.rerun()
    
    st.markdown("---")
    
    st.markdown("### 👥 Team")
    st.markdown("""
    **Tracy:** AI & Prompt Engineering  
    **Joseline:** Knowledge Base  
    **Suzan:** UX & Ethics
    """)

# Initial greeting
if st.session_state.first_load:
    st.session_state.messages.append({
        "role": "assistant",
        "content": """Hello, and welcome. I'm here to provide you with information about your rights and available support services in Uganda. You are not alone, and what you're going through is not your fault.

I can help you understand:
• Your legal rights under Ugandan law
• Available support services and how to access them
• Safety planning steps
• Types of protection available to you

Everything we discuss here is private. Take your time, and please know that you deserve support and safety.

What would you like to know about today?"""
    })
    st.session_state.first_load = False

# Display chat messages
for message in st.session_state.messages:
    if message["role"] == "user":
        st.markdown(f"<div class='user-message'>{message['content']}</div>", unsafe_allow_html=True)
    else:
        st.markdown(f"<div class='bot-message'>{message['content']}</div>", unsafe_allow_html=True)

# Clear floats
st.markdown("<div style='clear: both;'></div>", unsafe_allow_html=True)

# Chat input
col1, col2 = st.columns([5, 1])

with col1:
    user_input = st.text_input(
        "Your message",
        key="user_input",
        label_visibility="collapsed",
        placeholder="Type your question here..."
    )

with col2:
    send_button = st.button("Send", use_container_width=True)

# Process message
if send_button and user_input:
    if not st.session_state.api_key:
        st.error("⚠️ Please add your Anthropic API key in the sidebar.")
    else:
        # Add user message
        st.session_state.messages.append({"role": "user", "content": user_input})
        
        # Show spinner while processing
        with st.spinner(""):
            try:
                # Get relevant context from RAG if available
                rag_context = ""
                if st.session_state.rag_loaded:
                    rag_context = get_relevant_context(
                        user_input, 
                        st.session_state.knowledge_base,
                        max_chunks=2
                    )
                
                # Build enhanced system prompt with RAG context
                if rag_context:
                    enhanced_system_prompt = f"""{SYSTEM_PROMPT}

## VERIFIED KNOWLEDGE BASE CONTEXT:

The following information comes from Joseline's verified knowledge base (Uganda Domestic Violence Act 2010 and verified support organizations). Use this information to answer the user's question accurately:

{rag_context}

---

Use the above context to provide accurate, Uganda-specific information. If the context doesn't contain the answer, acknowledge that and provide general guidance based on your training."""
                else:
                    enhanced_system_prompt = SYSTEM_PROMPT
                
                # Initialize Anthropic client
                client = anthropic.Anthropic(api_key=st.session_state.api_key)
                
                # Prepare messages for API (exclude initial greeting)
                api_messages = [
                    {"role": msg["role"], "content": msg["content"]}
                    for msg in st.session_state.messages[1:]
                ]
                
                # Call Claude API
                response = client.messages.create(
                    model="claude-sonnet-4-20250514",
                    max_tokens=2000,
                    system=enhanced_system_prompt,
                    messages=api_messages
                )
                
                # Extract response
                bot_message = response.content[0].text
                
                # Add bot response
                st.session_state.messages.append({
                    "role": "assistant",
                    "content": bot_message
                })
                
                # Rerun to display new messages
                st.rerun()
                
            except Exception as e:
                st.error(f"""
                I apologize, but I'm having trouble connecting right now. Please try again in a moment.
                
                **If you need immediate help:**
                - FIDA Uganda: +256-414-267-285
                - Police: 999 or 112
                
                Error details: {str(e)}
                """)

# Footer
st.markdown("---")
st.markdown("""
<div style='text-align: center; color: #666; font-size: 14px; padding: 20px;'>
    <p><strong>You deserve to be safe. You deserve to be respected. You deserve support.</strong></p>
    <p><em>This service is for information only and does not replace professional legal, medical, or crisis support.</em></p>
    <p style='margin-top: 10px; font-size: 12px;'>
        Built with care by Tracy (AI), Joseline (Knowledge Base), and Suzan (UX/Ethics)
    </p>
</div>
""", unsafe_allow_html=True)