"""
RAG Knowledge Base Loader
Fetches Joseline's knowledge base chunks from GitHub and prepares them for the bot
"""

import os
import requests
from pathlib import Path

# GitHub repository information
GITHUB_REPO = "Susankemigisa/Aegis_Haven"
BRANCH = "main"
RAG_CHUNKS_PATH = "knowledge-base/RAG_Chunks/rag_chunks"

# Chunk files to download
CHUNK_FILES = [
    "CHUNK_001_what_is_domestic_violence.txt",
    "CHUNK_002_types_of_abuse.txt",
    "CHUNK_003_who_is_protected.txt",
    "CHUNK_004_victim_rights.txt",
    "CHUNK_005_how_to_report_and_protection_orders.txt",
    "CHUNK_006_support_organisations.txt",
    "CHUNK_007_penalties_and_courts.txt",
    "CHUNK_008_myths_vs_facts.txt"
]

def download_rag_chunks():
    """
    Downloads RAG chunks from Joseline's GitHub repository
    """
    # Create local knowledge_base directory
    kb_dir = Path("knowledge_base")
    kb_dir.mkdir(exist_ok=True)
    
    print("📥 Downloading RAG chunks from Joseline's repository...")
    print(f"Repository: {GITHUB_REPO}")
    print(f"Path: {RAG_CHUNKS_PATH}\n")
    
    downloaded = []
    failed = []
    
    for chunk_file in CHUNK_FILES:
        try:
            # Construct raw GitHub URL
            url = f"https://raw.githubusercontent.com/{GITHUB_REPO}/{BRANCH}/{RAG_CHUNKS_PATH}/{chunk_file}"
            
            print(f"Downloading {chunk_file}...", end=" ")
            
            # Download file
            response = requests.get(url, timeout=10)
            response.raise_for_status()
            
            # Save to local directory
            local_path = kb_dir / chunk_file
            local_path.write_text(response.text, encoding='utf-8')
            
            print("✅")
            downloaded.append(chunk_file)
            
        except Exception as e:
            print(f"❌ Error: {str(e)}")
            failed.append((chunk_file, str(e)))
    
    print(f"\n📊 Download Summary:")
    print(f"✅ Successfully downloaded: {len(downloaded)}/{len(CHUNK_FILES)}")
    if failed:
        print(f"❌ Failed: {len(failed)}")
        for filename, error in failed:
            print(f"   - {filename}: {error}")
    
    return downloaded, failed

def load_knowledge_base():
    """
    Loads all RAG chunks into a dictionary
    Returns: dict with chunk_id as key and content as value
    """
    kb_dir = Path("knowledge_base")
    
    if not kb_dir.exists():
        print("⚠️  Knowledge base directory not found. Run download_rag_chunks() first.")
        return {}
    
    knowledge_base = {}
    
    for chunk_file in CHUNK_FILES:
        chunk_path = kb_dir / chunk_file
        
        if chunk_path.exists():
            try:
                content = chunk_path.read_text(encoding='utf-8')
                
                # Extract chunk ID from filename (e.g., CHUNK_001 from CHUNK_001_what_is_domestic_violence.txt)
                chunk_id = chunk_file.split('_')[0] + '_' + chunk_file.split('_')[1]
                
                # Remove YAML metadata header if present
                if content.startswith('---'):
                    # Find the second --- and take content after it
                    parts = content.split('---', 2)
                    if len(parts) >= 3:
                        content = parts[2].strip()
                
                knowledge_base[chunk_id] = content
                
            except Exception as e:
                print(f"⚠️  Error loading {chunk_file}: {e}")
        else:
            print(f"⚠️  File not found: {chunk_file}")
    
    return knowledge_base

def search_knowledge_base(query, knowledge_base, top_k=3):
    """
    Simple keyword-based search through knowledge base
    For production, use embeddings and vector search
    
    Args:
        query: User's question
        knowledge_base: Dict of chunk_id -> content
        top_k: Number of top chunks to return
    
    Returns:
        List of (chunk_id, content, score) tuples
    """
    query_lower = query.lower()
    query_words = set(query_lower.split())
    
    scored_chunks = []
    
    for chunk_id, content in knowledge_base.items():
        content_lower = content.lower()
        
        # Simple scoring: count matching words
        score = sum(1 for word in query_words if word in content_lower)
        
        # Bonus for exact phrase match
        if query_lower in content_lower:
            score += 10
        
        # Priority chunks get bonus
        if chunk_id in ['CHUNK_006', 'CHUNK_008', 'CHUNK_005']:
            score += 2
        
        scored_chunks.append((chunk_id, content, score))
    
    # Sort by score and return top_k
    scored_chunks.sort(key=lambda x: x[2], reverse=True)
    return scored_chunks[:top_k]

def get_relevant_context(user_query, knowledge_base, max_chunks=2):
    """
    Get relevant context for user query
    """
    results = search_knowledge_base(user_query, knowledge_base, top_k=max_chunks)
    
    # Filter out chunks with zero score
    relevant = [content for _, content, score in results if score > 0]
    
    if not relevant:
        # If no matches, always include support organizations
        if 'CHUNK_006' in knowledge_base:
            relevant = [knowledge_base['CHUNK_006']]
    
    return "\n\n---\n\n".join(relevant)

if __name__ == "__main__":
    # Download chunks
    print("=" * 60)
    print("RAG KNOWLEDGE BASE SETUP")
    print("=" * 60)
    print()
    
    downloaded, failed = download_rag_chunks()
    
    if downloaded:
        print("\n" + "=" * 60)
        print("Testing knowledge base loading...")
        print("=" * 60)
        print()
        
        kb = load_knowledge_base()
        print(f"✅ Loaded {len(kb)} chunks successfully\n")
        
        # Test search
        test_queries = [
            "What is domestic violence?",
            "How do I get a protection order?",
            "Who can I call for help?"
        ]
        
        print("Testing search functionality:")
        for query in test_queries:
            print(f"\nQuery: '{query}'")
            context = get_relevant_context(query, kb, max_chunks=2)
            print(f"Retrieved {len(context.split('---'))} chunk(s)")
        
        print("\n✅ Setup complete! Knowledge base is ready for integration.")
    else:
        print("\n❌ No chunks downloaded. Please check your internet connection and try again.")