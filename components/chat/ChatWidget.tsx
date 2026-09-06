"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";

type Message = { role: "user" | "assistant"; content: string };

const MAX_MESSAGES = 16;

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Stable session ID for the lifetime of this page visit
  const sessionIdRef = useRef<string>(crypto.randomUUID());
  // Mirror of messages state for use inside event listeners (registered once)
  const messagesRef = useRef<Message[]>([]);
  useEffect(() => { messagesRef.current = messages; }, [messages]);
  // Guard: only send one recap per session (widget close OR pagehide)
  const recapSentRef = useRef(false);

  function sendRecap() {
    const msgs = messagesRef.current;
    if (recapSentRef.current) return;
    if (!msgs.some((m) => m.role === "user")) return;
    recapSentRef.current = true;
    const blob = new Blob(
      [JSON.stringify({ sessionId: sessionIdRef.current, messages: msgs, timestamp: new Date().toISOString() })],
      { type: "application/json" }
    );
    navigator.sendBeacon("/api/chat/recap", blob);
  }

  // Primary trigger: widget closed by visitor
  function closeWidget() {
    sendRecap();
    setOpen(false);
  }

  // Fallback trigger: actual page unload (tab close, hard refresh, external navigation)
  // Does NOT fire on Next.js client-side navigation between pages of the same site
  useEffect(() => {
    window.addEventListener("pagehide", sendRecap);
    return () => window.removeEventListener("pagehide", sendRecap);
  }, []);

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  useEffect(() => {
    if (open) textareaRef.current?.focus();
  }, [open]);

  const limitReached = messages.length >= MAX_MESSAGES;

  async function sendMessage() {
    const text = input.trim();
    if (!text || loading || limitReached) return;

    const next: Message[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Erreur serveur");
      setMessages([...next, { role: "assistant", content: data.content }]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur inconnue");
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <>
      {/* Floating window */}
      {open && (
        <div
          className="fixed bottom-24 right-4 z-50 flex flex-col rounded-lg border shadow-2xl overflow-hidden"
          style={{
            width: 360,
            height: 520,
            background: "var(--color-card, #161616)",
            borderColor: "var(--color-border, #2A2520)",
          }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-4 py-3 shrink-0"
            style={{ borderBottom: "1px solid var(--color-border, #2A2520)" }}
          >
            <span
              className="text-sm font-semibold tracking-widest uppercase"
              style={{ color: "var(--color-gold, #C9A84C)" }}
            >
              Assistant
            </span>
            <button
              onClick={closeWidget}
              aria-label="Fermer"
              className="opacity-50 hover:opacity-100 transition-opacity"
              style={{ color: "var(--color-text, #F0EDE6)" }}
            >
              <X size={16} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
            {messages.length === 0 && (
              <p
                className="text-sm text-center mt-8"
                style={{ color: "var(--color-text-secondary, #A89F8C)" }}
              >
                Comment puis-je vous aider ?
              </p>
            )}
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className="max-w-[85%] rounded-lg px-3 py-2 text-sm leading-relaxed"
                  style={
                    m.role === "user"
                      ? {
                          background: "var(--color-gold-dark, #8B6914)",
                          color: "var(--color-text, #F0EDE6)",
                        }
                      : {
                          background: "var(--color-bg, #0C0C0C)",
                          color: "var(--color-text, #F0EDE6)",
                          border: "1px solid var(--color-border, #2A2520)",
                        }
                  }
                >
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div
                  className="rounded-lg px-3 py-2"
                  style={{
                    background: "var(--color-bg, #0C0C0C)",
                    border: "1px solid var(--color-border, #2A2520)",
                  }}
                >
                  <Loader2
                    size={16}
                    className="animate-spin"
                    style={{ color: "var(--color-gold, #C9A84C)" }}
                  />
                </div>
              </div>
            )}
            {error && (
              <p className="text-xs text-center text-red-400">{error}</p>
            )}
            {limitReached && !loading && (
              <p
                className="text-xs text-center mt-2"
                style={{ color: "var(--color-text-secondary, #A89F8C)" }}
              >
                Fin de la conversation. Rechargez la page pour recommencer.
              </p>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          {!limitReached && (
            <div
              className="shrink-0 px-3 pt-3 pb-1"
              style={{ borderTop: "1px solid var(--color-border, #2A2520)" }}
            >
              <div className="flex items-end gap-2">
                <textarea
                  ref={textareaRef}
                  rows={1}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Votre message…"
                  disabled={loading}
                  className="flex-1 resize-none rounded-md px-3 py-2 text-sm outline-none transition-colors"
                  style={{
                    background: "var(--color-bg, #0C0C0C)",
                    color: "var(--color-text, #F0EDE6)",
                    border: "1px solid var(--color-border, #2A2520)",
                    maxHeight: 100,
                  }}
                />
                <button
                  onClick={sendMessage}
                  disabled={loading || !input.trim()}
                  aria-label="Envoyer"
                  className="shrink-0 rounded-md p-2 transition-opacity disabled:opacity-40"
                  style={{
                    background: "var(--color-gold, #C9A84C)",
                    color: "#0C0C0C",
                  }}
                >
                  <Send size={16} />
                </button>
              </div>
              <p
                className="text-center mt-1 mb-2 text-xs"
                style={{ color: "var(--color-text-secondary, #A89F8C)", opacity: 0.6 }}
              >
                Échanges enregistrés pour améliorer notre service.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Bubble toggle — closes widget (with recap) if open, opens if closed */}
      <button
        onClick={() => (open ? closeWidget() : setOpen(true))}
        aria-label={open ? "Fermer le chat" : "Ouvrir le chat"}
        className="fixed bottom-4 right-4 z-50 flex items-center justify-center rounded-full shadow-lg transition-transform hover:scale-105 active:scale-95"
        style={{
          width: 56,
          height: 56,
          background: "var(--color-gold, #C9A84C)",
          color: "#0C0C0C",
        }}
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </button>
    </>
  );
}
