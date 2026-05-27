// lib/dangerDetector.js
// Detects immediate danger signals in any of the three supported languages
// Suzan · UX & Ethics · Group 3

const DANGER_PATTERNS = [
  // English — physical danger
  /\b(he|she|they).{0,30}(hit|beat|punch|kick|stab|chok|strang|burn|hurt|attack|kill|shot|gun|knife|weapon)/i,
  /\b(going to|gonna|about to|will).{0,20}(kill|hurt|beat|attack|stab)/i,
  /\b(help me|help us|please help).{0,30}(now|immediately|tonight|today)/i,
  /\b(i am|i'm|we are|we're).{0,20}(scared|terrified|in danger|not safe|unsafe|afraid)/i,
  /\b(he|she|they).{0,20}(has a|with a|holding a).{0,20}(knife|gun|weapon|machete|panga)/i,
  /\b(locked|trapped|can't leave|cannot leave|won't let me|wont let me)/i,
  /\b(emergency|right now|happening now|currently happening)/i,
  /\bhide|hiding\b/i,
  /\b(blood|bleeding|unconscious|passed out|fainted)/i,
  /\b(danger|dangerous).{0,10}(right now|currently|tonight|today)/i,
  /\b(he|she).{0,10}(is here|is outside|is coming|is drunk|is high)/i,

  // Luganda patterns
  /\b(agenda|ayagala|atandise).{0,20}(kundya|kunviira|kundumula|kuntaba|kundiga)/i,
  /\b(ndi|tuli).{0,15}(mu kabi|mu butiti|mu ssansa)/i,
  /\bnkola\s+ki\b/i,
  /\byamba\b/i,
  /\bkabi\s+kati\b/i,
  /\bnsimbye\b/i,

  // Swahili patterns
  /\b(ananiuma|ananipiga|ananishambulia|ananichoka|ananichoma)/i,
  /\b(niko|nipo|tuko).{0,15}(hatarini|katika hatari|si salama)/i,
  /\b(nisaidie|msaada|niokoe)/i,
  /\bsasa\s+hivi\b/i,
  /\bamenikimbiza\b/i,
  /\bananishambulia\b/i,
]

// Lower-confidence signals — show softer alert
const CONCERN_PATTERNS = [
  /\b(last night|yesterday|recently).{0,30}(hit|beat|hurt|push|shove|grab)/i,
  /\b(i think|i feel|i'm worried|i am worried).{0,20}(safe|danger|hurt)/i,
  /\b(what if|what should i do if).{0,30}(hurt|hit|attack)/i,
  /\b(threats|threatening|threatened)\b/i,
  /\b(scared|afraid|fear|worried).{0,20}(him|her|them|my husband|my partner|my boyfriend)/i,
]

/**
 * Returns:
 *   "immediate" — user is describing active, right-now danger
 *   "concern"   — user is describing recent or potential danger
 *   null        — no danger signal detected
 */
export function detectDanger(text) {
  if (!text || text.length < 4) return null
  const t = text.toLowerCase()
  if (DANGER_PATTERNS.some(p => p.test(t))) return "immediate"
  if (CONCERN_PATTERNS.some(p => p.test(t))) return "concern"
  return null
}
