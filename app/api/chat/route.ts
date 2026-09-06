import Anthropic from "@anthropic-ai/sdk";
import { NextRequest } from "next/server";
import {
  CHAT_MODEL,
  CHAT_MAX_TOKENS,
  CHAT_MAX_MESSAGES,
  SYSTEM_PROMPT,
  KNOWLEDGE_BASE,
} from "@/lib/chat-knowledge";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// In-memory rate limiter — resets per serverless instance (sufficient for current scale)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 20;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  if (entry.count >= RATE_LIMIT_MAX) return false;
  entry.count++;
  return true;
}

type MessageParam = { role: "user" | "assistant"; content: string };

export async function POST(request: NextRequest) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return Response.json({ error: "Service indisponible." }, { status: 503 });
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  if (!checkRateLimit(ip)) {
    return Response.json(
      { error: "Trop de requêtes. Réessayez dans quelques minutes." },
      { status: 429 }
    );
  }

  const body = await request.json().catch(() => null);
  const messages: MessageParam[] = Array.isArray(body?.messages)
    ? body.messages
    : [];

  if (
    messages.length === 0 ||
    messages.length > CHAT_MAX_MESSAGES ||
    messages[messages.length - 1]?.role !== "user"
  ) {
    return Response.json({ error: "Requête invalide." }, { status: 400 });
  }

  const validMessages = messages.filter(
    (m) =>
      (m.role === "user" || m.role === "assistant") &&
      typeof m.content === "string" &&
      m.content.trim().length > 0
  );

  const systemPrompt = KNOWLEDGE_BASE.trim()
    ? `${SYSTEM_PROMPT}\n\n---\nBase de connaissances :\n${KNOWLEDGE_BASE}`
    : SYSTEM_PROMPT;

  const response = await client.messages.create({
    model: CHAT_MODEL,
    max_tokens: CHAT_MAX_TOKENS,
    system: systemPrompt,
    messages: validMessages,
  });

  const content =
    response.content[0]?.type === "text" ? response.content[0].text : "";

  return Response.json({ content });
}
