const INTENT_COLORS: Record<string, string> = {
  "Order inquiry": "bg-blue-100 text-blue-800",
  "Booking/appointment": "bg-purple-100 text-purple-800",
  Cancellation: "bg-orange-100 text-orange-800",
  Complaint: "bg-red-100 text-red-800",
  "Pricing inquiry": "bg-emerald-100 text-emerald-800",
  "Delivery issue": "bg-amber-100 text-amber-800",
  "Product inquiry": "bg-cyan-100 text-cyan-800",
  "Technical support": "bg-indigo-100 text-indigo-800",
  "General inquiry": "bg-slate-100 text-slate-800",
  Unclear: "bg-gray-200 text-gray-700",
};

export default function ResultBadge({
  intent,
  confidence,
}: {
  intent: string;
  confidence: number;
}) {
  const color = INTENT_COLORS[intent] ?? "bg-gray-100 text-gray-800";
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${color}`}
    >
      {intent} · {(confidence * 100).toFixed(0)}%
    </span>
  );
}
