"use client";

import { useState } from "react";
import { FamilyMember, Ohaeng, OHAENG_STYLE } from "@/lib/types";
import { analyzeCompatibility } from "@/lib/interpret";

export default function Compatibility({ members }: { members: FamilyMember[] }) {
  const validMembers = members.filter((m) => m.result);
  const [aId, setAId] = useState(validMembers[0]?.id ?? "");
  const [bId, setBId] = useState(validMembers[1]?.id ?? validMembers[0]?.id ?? "");

  const a = validMembers.find((m) => m.id === aId);
  const b = validMembers.find((m) => m.id === bId);
  const canAnalyze = a && b && a.id !== b.id && a.result && b.result;
  const result = canAnalyze ? analyzeCompatibility(a.result!, b.result!, a.name, b.name) : null;

  if (validMembers.length < 2) {
    return (
      <div className="py-20 text-center">
        <p className="text-sm text-[var(--ink-muted)]">궁합을 보려면 최소 2명의 가족이 필요합니다.</p>
        <p className="mt-1 text-xs text-[var(--ink-muted)]">가족을 추가해주세요.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Selector */}
      <div className="card p-5">
        <h3 className="mb-4 font-[family-name:var(--font-noto-serif)] text-base font-bold text-[var(--ink)]">
          궁합 보기
        </h3>
        <div className="flex items-center gap-3">
          <select value={aId} onChange={(e) => setAId(e.target.value)}
            className="flex-1 rounded-lg border border-[var(--border)] bg-white px-3 py-2.5 text-[13px] text-[var(--ink)] outline-none focus:border-[var(--accent-soft)]">
            {validMembers.map((m) => <option key={m.id} value={m.id}>{m.name}</option>)}
          </select>
          <span className="text-sm text-[var(--accent-soft)]">&</span>
          <select value={bId} onChange={(e) => setBId(e.target.value)}
            className="flex-1 rounded-lg border border-[var(--border)] bg-white px-3 py-2.5 text-[13px] text-[var(--ink)] outline-none focus:border-[var(--accent-soft)]">
            {validMembers.map((m) => <option key={m.id} value={m.id}>{m.name}</option>)}
          </select>
        </div>
        {aId === bId && (
          <p className="mt-2 text-xs text-[#9e2a2b]">서로 다른 두 사람을 선택해주세요.</p>
        )}
      </div>

      {/* Result */}
      {result && a && b && (
        <div className="anim-fade space-y-4">
          {/* Header */}
          <div className="card p-5 text-center" style={{ border: "1px solid var(--accent-soft)", background: "linear-gradient(135deg, var(--accent-bg), var(--bg-card))" }}>
            <div className="mb-4 flex items-center justify-center gap-4">
              <div className="text-center">
                <div className={`mx-auto flex h-14 w-14 items-center justify-center rounded-xl border-2 ${OHAENG_STYLE[a.result!.일간.오행 as Ohaeng].border} ${OHAENG_STYLE[a.result!.일간.오행 as Ohaeng].bg}`}>
                  <span className={`hanja text-xl ${OHAENG_STYLE[a.result!.일간.오행 as Ohaeng].color}`}>{a.result!.일간.한자}</span>
                </div>
                <p className="mt-1.5 text-[13px] font-semibold text-[var(--ink)]">{a.name}</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--accent-bg)] border border-[var(--accent-soft)]">
                  <span className="text-base text-[var(--accent)]">合</span>
                </div>
              </div>
              <div className="text-center">
                <div className={`mx-auto flex h-14 w-14 items-center justify-center rounded-xl border-2 ${OHAENG_STYLE[b.result!.일간.오행 as Ohaeng].border} ${OHAENG_STYLE[b.result!.일간.오행 as Ohaeng].bg}`}>
                  <span className={`hanja text-xl ${OHAENG_STYLE[b.result!.일간.오행 as Ohaeng].color}`}>{b.result!.일간.한자}</span>
                </div>
                <p className="mt-1.5 text-[13px] font-semibold text-[var(--ink)]">{b.name}</p>
              </div>
            </div>

          </div>

          {/* Summary */}
          <div className="card-warm p-5">
            <h4 className="mb-3 font-[family-name:var(--font-noto-serif)] text-[15px] font-bold text-[var(--ink)]">종합 궁합</h4>
            <div className="deco-line mb-4" />
            <p className="whitespace-pre-line text-[13px] leading-[2] text-[var(--ink-light)]">{result.summary}</p>
          </div>

          {/* Details */}
          {result.details.map((d, i) => (
            <div key={i} className="card-warm p-5">
              <h4 className="mb-2 text-[13px] font-bold text-[var(--ink)]">{d.label}</h4>
              <p className="whitespace-pre-line text-[13px] leading-[1.9] text-[var(--ink-light)]">{d.content}</p>
            </div>
          ))}

          <div className="rounded-xl bg-white/50 p-4 text-center">
            <p className="text-[11px] leading-relaxed text-[var(--ink-muted)]">
              궁합은 두 사람의 기운 조합을 참고로 보여드리는 것이며,
              관계의 질은 서로의 노력과 소통에 달려 있습니다.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
