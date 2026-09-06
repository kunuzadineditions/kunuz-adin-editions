// Modèle Claude — Haiku 4.5 pour limiter les coûts
export const CHAT_MODEL = "claude-haiku-4-5";

// Limite de tokens par réponse (~300 mots max)
export const CHAT_MAX_TOKENS = 400;

// Nombre max de messages par conversation (côté client)
export const CHAT_MAX_MESSAGES = 16; // = 8 échanges

// ─── System prompt ────────────────────────────────────────────────────────────
// Décris ici le rôle, le ton et les limites de l'agent.
export const SYSTEM_PROMPT = `[À COMPLÉTER]

Tu es l'assistant de KUNUZ ADIN Éditions. Réponds en français, de manière sobre et bienveillante.`;

// ─── Base de connaissances ────────────────────────────────────────────────────
// Ajoute ici toutes les informations que l'agent doit connaître :
// catalogue, FAQ, politique de livraison, etc.
// Laisse vide ("") si tu n'en as pas encore.
export const KNOWLEDGE_BASE = `[À COMPLÉTER]`;
