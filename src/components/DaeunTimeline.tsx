"use client";

import { SajuResult, Ohaeng, OHAENG_STYLE } from "@/lib/types";

function GanJiPair({ gan, ji }: { gan: SajuResult["대운_현재_다음"][0]["천간"]; ji: SajuResult["대운_현재_다음"][0]["지지"] }) {
  const gs = OHAENG_STYLE[gan.오행 as Ohaeng];
  const js = OHAENG_STYLE[ji.오행 as Ohaeng];
  return (
    <div className="flex items-center gap-1.5">
      <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${gs.bg} border ${gs.border}`}>
        <span className={`hanja text-base ${gs.color}`}>{gan.한자}</span>
      </div>
      <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${js.bg} border ${js.border}`}>
        <span className={`hanja text-base ${js.color}`}>{ji.한자}</span>
      </div>
    </div>
  );
}

export default function DaeunTimeline({ data }: { data: SajuResult }) {
  const thisYear = new Date().getFullYear();

  return (
    <div className="space-y-8">
      {/* 대운 */}
      <div>
        <div className="mb-3 flex items-baseline gap-2">
          <h4 className="text-[13px] font-bold text-[var(--ink)]">대운 大運</h4>
          <span className="text-[11px] text-[var(--ink-muted)]">10년 단위 큰 흐름</span>
        </div>
        <div className="grid grid-cols-2 gap-2.5">
          {data.대운_현재_다음.map((d, i) => {
            const active = i === 0;
            const gs = OHAENG_STYLE[d.천간.오행 as Ohaeng];
            const js = OHAENG_STYLE[d.지지.오행 as Ohaeng];
            return (
              <div key={i} className={`card relative p-4 ${active ? "ring-1 ring-[var(--accent-soft)]/30" : ""}`}>
                <div className={`mb-2 text-[11px] font-bold tracking-wider ${active ? "text-[var(--accent)]" : "text-[var(--ink-muted)]"}`}>
                  {active ? "현재 대운" : "다음 대운"}
                </div>
                <div className="mb-3 text-sm text-[var(--ink-light)]">
                  <span className="font-bold text-[var(--ink)]">{d.대운_시작_전통나이}세</span>부터
                </div>
                <GanJiPair gan={d.천간} ji={d.지지} />
                <div className="mt-2 flex gap-1.5">
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${gs.bg} ${gs.color} border ${gs.border}`}>
                    {d.천간.십성}
                  </span>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${js.bg} ${js.color} border ${js.border}`}>
                    {d.지지.십성}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 세운 */}
      <div>
        <div className="mb-3 flex items-baseline gap-2">
          <h4 className="text-[13px] font-bold text-[var(--ink)]">세운 歲運</h4>
          <span className="text-[11px] text-[var(--ink-muted)]">향후 5년 연간 흐름</span>
        </div>
        <div className="no-scrollbar scroll-hint-r -mx-1 flex gap-2 overflow-x-auto px-1 pb-2 sm:grid sm:grid-cols-5 sm:gap-2.5 sm:overflow-visible sm:pb-0">
          {data.세운_현재_5년.map((s) => {
            const now = s.연도 === thisYear;
            const gs = OHAENG_STYLE[s.천간.오행 as Ohaeng];
            const js = OHAENG_STYLE[s.지지.오행 as Ohaeng];
            return (
              <div key={s.연도}
                className={`card shrink-0 p-3 text-center ${now ? "ring-1 ring-[var(--accent-soft)]/30" : ""}`}
                style={{ minWidth: "5.5rem" }}>
                <div className={`mb-2 text-[11px] font-bold ${now ? "text-[var(--accent)]" : "text-[var(--ink-muted)]"}`}>
                  {s.연도}{now ? "년 ·" : ""}
                </div>
                <div className="flex justify-center gap-1">
                  <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${gs.bg} border ${gs.border}`}>
                    <span className={`hanja text-sm ${gs.color}`}>{s.천간.한자}</span>
                  </div>
                  <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${js.bg} border ${js.border}`}>
                    <span className={`hanja text-sm ${js.color}`}>{s.지지.한자}</span>
                  </div>
                </div>
                <div className="mt-2 flex flex-col items-center gap-0.5">
                  <span className={`rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${gs.bg} ${gs.color}`}>{s.천간.십성}</span>
                  <span className={`rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${js.bg} ${js.color}`}>{s.지지.십성}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
