const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export interface DetectIntentResponse {
  id: number;
  intent: string;
  confidence: number;
  needsReview: boolean;
  timestamp: string;
}

export async function detectIntent(message: string): Promise<DetectIntentResponse> {
  const res = await fetch(`${API_URL}/api/detect-intent`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });
  if (!res.ok) throw new Error("Failed to detect intent");
  return res.json();
}

export interface TestCase {
  message: string;
  correct_intent: string;
}

export interface TestBatchResult {
  accuracy: number;
  total: number;
  results: {
    message: string;
    predicted: string;
    correct: string;
    confidence: number;
    isCorrect: boolean;
  }[];
}

export async function runTestBatch(cases: TestCase[]): Promise<TestBatchResult> {
  const res = await fetch(`${API_URL}/api/test-batch`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cases }),
  });
  if (!res.ok) throw new Error("Failed to run test batch");
  return res.json();
}
