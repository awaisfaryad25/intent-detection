"use client";

import { useState } from "react";
import { detectIntent } from "@/lib/api"
import ResultBadge from "./ResultBadge";

interface Message {
  id: number;
  text: string;
  intent?: string;
  confidence?: number;
  needsReview?: boolean;
  loading?: boolean;
}

export default function ChatBox() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [sending, setSending] = useState(false);

  async function handleSend() {
    const text = input.trim();
    if (!text || sending) return;

    const tempId = Date.now();
    setMessages((prev) => [...prev, { id: tempId, text, loading: true }]);
    setInput("");
    setSending(true);

    try {
      const result = await detectIntent(text);
      setMessages((prev) =>
        prev.map((m) =>
          m.id === tempId
            ? {
                ...m,
                loading: false,
                intent: result.intent,
                confidence: result.confidence,
                needsReview: result.needsReview,
              }
            : m
        )
      );
    } catch {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === tempId ? { ...m, loading: false, intent: "Error", confidence: 0 } : m
        )
      );
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="flex h-[600px] w-full max-w-xl flex-col rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-100 px-4 py-3">
        <h2 className="text-sm font-semibold text-gray-800">Customer Chat</h2>
        <p className="text-xs text-gray-500">Type a message to see the detected intent</p>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
        {messages.length === 0 && (
          <p className="mt-10 text-center text-sm text-gray-400">
            No messages yet — try &quot;Where is my order?&quot;
          </p>
        )}
        {messages.map((m) => (
          <div key={m.id} className="space-y-1.5">
            <div className="ml-auto max-w-[80%] rounded-2xl rounded-br-sm bg-gray-900 px-3.5 py-2 text-sm text-white">
              {m.text}
            </div>
            <div className="flex justify-end">
              {m.loading ? (
                <span className="text-xs text-gray-400">Detecting intent…</span>
              ) : (
                m.intent &&
                m.confidence !== undefined && (
                  <div className="flex items-center gap-2">
                    {m.needsReview && (
                      <span className="text-xs text-red-500">needs human review</span>
                    )}
                    <ResultBadge intent={m.intent} confidence={m.confidence} />
                  </div>
                )
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 border-t border-gray-100 p-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type a customer message…"
          className="flex-1 rounded-full border border-gray-200 px-4 py-2 text-sm outline-none focus:border-gray-400"
        />
        <button
          onClick={handleSend}
          disabled={sending}
          className="rounded-full bg-gray-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-40"
        >
          Send
        </button>
      </div>
    </div>
  );
}
