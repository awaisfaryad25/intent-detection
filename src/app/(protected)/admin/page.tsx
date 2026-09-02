"use client";

import { useState } from "react";
import Link from "next/link";
import { runTestBatch, TestBatchResult } from "@/lib/api";

const SAMPLE = `Where is my order #4521? | Order inquiry
I want to book a consultation for Friday. | Booking/appointment
Please cancel my subscription. | Cancellation
The product I received was damaged. | Complaint
How much does the premium plan cost? | Pricing inquiry
My package is 3 days late. | Delivery issue
Does this come in blue? | Product inquiry
The app keeps crashing on login. | Technical support
What are your working hours? | General inquiry
hmm ok thanks | Unclear`;

export default function AdminPage() {
  const [input, setInput] = useState(SAMPLE);
  const [result, setResult] = useState<TestBatchResult | null>(null);
  const [running, setRunning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function parseCases() {
    return input
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const [message, correct_intent] = line.split("|").map((s) => s.trim());
        return { message, correct_intent };
      })
      .filter((c) => c.message && c.correct_intent);
  }

  async function handleRun() {
    setError(null);
    const cases = parseCases();
    if (cases.length === 0) {
      setError("Add at least one line as: message | correct intent");
      return;
    }
    setRunning(true);
    try {
      const res = await runTestBatch(cases);
      setResult(res);
    } catch {
      setError("Failed to run test batch — is the backend running?");
    } finally {
      setRunning(false);
    }
  }

  return (
    <main className="mx-auto min-h-screen max-w-3xl px-4 py-10">
      <Link href="/" className="text-sm text-gray-500 underline underline-offset-4">
        ← Back to chat
      </Link>
      <h1 className="mt-3 text-xl font-semibold text-gray-900">Test Batch / Admin View</h1>
      <p className="mt-1 text-sm text-gray-500">
        One conversation per line, formatted as: <code className="rounded bg-gray-100 px-1">message | correct intent</code>
      </p>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={12}
        className="mt-4 w-full rounded-xl border border-gray-200 p-3 font-mono text-sm outline-none focus:border-gray-400"
      />

      <button
        onClick={handleRun}
        disabled={running}
        className="mt-3 rounded-full bg-gray-900 px-5 py-2 text-sm font-medium text-white disabled:opacity-40"
      >
        {running ? "Running…" : "Run test batch"}
      </button>

      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}

      {result && (
        <div className="mt-8">
          <p className="text-sm font-medium text-gray-800">
            Accuracy: {(result.accuracy * 100).toFixed(1)}% ({result.results.filter((r) => r.isCorrect).length}/{result.total} correct)
          </p>

          <table className="mt-3 w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-xs uppercase text-gray-500">
                <th className="py-2 pr-2">Message</th>
                <th className="py-2 pr-2">Predicted</th>
                <th className="py-2 pr-2">Correct</th>
                <th className="py-2 pr-2">Confidence</th>
                <th className="py-2">✓</th>
              </tr>
            </thead>
            <tbody>
              {result.results.map((r, i) => (
                <tr key={i} className="border-b border-gray-100">
                  <td className="max-w-xs truncate py-2 pr-2">{r.message}</td>
                  <td className="py-2 pr-2">{r.predicted}</td>
                  <td className="py-2 pr-2">{r.correct}</td>
                  <td className="py-2 pr-2">{(r.confidence * 100).toFixed(0)}%</td>
                  <td className="py-2">{r.isCorrect ? "✅" : "❌"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
