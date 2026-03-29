"use client";

import { Ohaeng, OHAENG_STYLE } from "@/lib/types";

const ORDER: Ohaeng[] = ["목", "화", "토", "금", "수"];

export default function OhaengChart({ counts }: { counts: Record<Ohaeng, number> }) {
  const total = Object.values(counts).reduce((a, b) => a + b, 0);
  const max = Math.max(...Object.values(counts), 1);

  return (
    <div>
      {/* Dot visualization */}
      <div className="mb-6 flex items-end justify-around gap-1">
        {ORDER.map((k) => {
          const s = OHAENG_STYLE[k];
          const c = counts[k];
          return (
            <div key={k} className="flex flex-col items-center gap-2">
              {/* Stacked dots */}
              <div className="flex flex-col-reverse items-center gap-1">
                {Array.from({ length: Math.max(c, 0) }).map((_, i) => (
                  <div key={i} className={`h-4 w-4 rounded-full ${s.dot} transition-all`}
                    style={{ opacity: 0.5 + (i / Math.max(c, 1)) * 0.5 }} />
                ))}
                {c === 0 && (
                  <div className="flex h-4 w-4 items-center justify-center rounded-full border-2 border-dashed border-[var(--border)]">
                    <span className="text-[10px] text-[var(--ink-muted)]">0</span>
                  </div>
                )}
              </div>
              <div className="text-center">
                <div className={`hanja text-sm font-bold ${s.color}`}>{s.hanja}</div>
                <div className="text-[11px] text-[var(--ink-muted)]">{s.label}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Horizontal bars */}
      <div className="space-y-2 rounded-xl bg-white/60 p-3">
        {ORDER.map((k) => {
          const s = OHAENG_STYLE[k];
          const c = counts[k];
          const pct = total > 0 ? Math.round((c / total) * 100) : 0;
          const w = max > 0 ? (c / max) * 100 : 0;

          return (
            <div key={k} className="flex items-center gap-2">
              <span className={`w-5 text-right hanja text-xs ${s.color}`}>{s.hanja}</span>
              <div className="flex-1 h-5 rounded bg-[var(--bg-main)] overflow-hidden">
                <div className={`h-full rounded ${s.dot} transition-all duration-700`}
                  style={{ width: `${Math.max(w, c > 0 ? 8 : 0)}%`, opacity: 0.7 }} />
              </div>
              <span className="w-14 text-right text-[11px] tabular-nums text-[var(--ink-muted)]">
                {c}개 <span className="text-[var(--border)]">·</span> {pct}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
