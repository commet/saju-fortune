"use client";

import { SajuResult, Ohaeng, OHAENG_STYLE } from "@/lib/types";

function Glyph({
  el,
  highlight,
}: {
  el: { 한자: string; 한글: string; 오행: string; 십성: string; 음양: string };
  highlight?: boolean;
}) {
  const oh = el.오행 as Ohaeng;
  const s = OHAENG_STYLE[oh];
  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className={`flex h-12 w-12 items-center justify-center rounded-xl sm:h-14 sm:w-14 ${s.bg} border ${s.border} ${
          highlight ? "ring-2 ring-[var(--accent-soft)] ring-offset-1" : ""
        }`}
      >
        <span className={`hanja text-xl sm:text-2xl ${s.color}`}>{el.한자}</span>
      </div>
      <span className="text-[11px] font-medium text-[var(--ink-light)]">{el.한글}</span>
      <span className={`rounded-full px-2 py-0.5 text-[9px] font-semibold ${s.bg} ${s.color} border ${s.border}`}>
        {el.십성}
      </span>
    </div>
  );
}

export default function SajuChart({ data }: { data: SajuResult }) {
  const pillars = [
    { id: "시", label: "시주 時柱", sub: "말년·자녀", gan: data.시간, ji: data.시지, me: false },
    { id: "일", label: "일주 日柱", sub: "나·배우자", gan: data.일간, ji: data.일지, me: true },
    { id: "월", label: "월주 月柱", sub: "청년·부모", gan: data.월간, ji: data.월지, me: false },
    { id: "연", label: "연주 年柱", sub: "초년·조상", gan: data.연간, ji: data.연지, me: false },
  ];

  return (
    <div>
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 sm:gap-3">
        {pillars.map((p) => (
          <div
            key={p.id}
            className={`card relative flex flex-col items-center px-3 pb-4 pt-5 transition-shadow hover:shadow-md ${
              p.me ? "ring-1 ring-[var(--accent-soft)]/40" : ""
            }`}
          >
            {p.me && (
              <div className="absolute -top-2.5 rounded-full bg-[var(--ink)] px-2.5 py-0.5 text-[9px] font-bold tracking-wider text-[#f5f0e8]">
                日主
              </div>
            )}
            <div className="mb-3 text-center">
              <div className="text-[11px] font-bold text-[var(--ink-light)]">{p.label}</div>
              <div className="text-[10px] text-[var(--ink-muted)]">{p.sub}</div>
            </div>

            {/* 천간 */}
            <div className="mb-1 text-[8px] font-medium uppercase tracking-widest text-[var(--ink-muted)]">천간</div>
            <Glyph el={p.gan} highlight={p.me} />

            <div className="my-2 h-px w-8 bg-[var(--border)]" />

            {/* 지지 */}
            <div className="mb-1 text-[8px] font-medium uppercase tracking-widest text-[var(--ink-muted)]">지지</div>
            <Glyph el={p.ji} />
          </div>
        ))}
      </div>
    </div>
  );
}
