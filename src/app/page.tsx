"use client";

import { useState, useEffect } from "react";
import { SajuResult } from "@/lib/types";
import SajuReading from "@/components/SajuReading";
import Compatibility from "@/components/Compatibility";

interface MemberData {
  name: string;
  birthDate: string;
  calendar: string;
  birthTime: string | null;
  birthTimeNote: string | null;
  gender: string;
  role: string;
  hasSaju: boolean;
  saju: SajuResult | null;
}

interface GroupData {
  id: number;
  note: string | null;
  members: MemberData[];
}

/* ────────── helpers ────────── */
function coupleRoles(members: MemberData[]): [MemberData, MemberData] | null {
  const a = members.find((m) => ["부", "예비신랑", "사위"].includes(m.role));
  const b = members.find((m) => ["모", "예비신부"].includes(m.role));
  if (a && b && a.saju && b.saju) return [a, b];
  return null;
}

function groupLabel(g: GroupData): string {
  const couple = coupleRoles(g.members);
  if (couple) return `${couple[0].name} · ${couple[1].name}`;
  return g.members.map((m) => m.name).slice(0, 2).join(" · ") + (g.members.length > 2 ? " 외" : "");
}

function groupSubLabel(g: GroupData): string {
  if (g.note) return g.note;
  const roles = g.members.map((m) => m.role);
  if (roles.includes("예비신랑")) return "결혼 예정";
  return `가족 ${g.members.length}명`;
}

const ROLE_ORDER: Record<string, number> = { 부: 0, 모: 1, 예비신랑: 0, 예비신부: 1, 아들: 2, 딸: 3, 사위: 4 };

/* ────────── Hero ────────── */
function Hero({ onGoFamilies }: { onGoFamilies: () => void }) {
  return (
    <div className="flex min-h-[85vh] flex-col items-center justify-center px-4 text-center">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-[15%] h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-[var(--accent-soft)] opacity-[0.04] blur-3xl" />
        <div className="absolute left-[20%] top-[40%] h-[200px] w-[200px] rounded-full bg-[#52796f] opacity-[0.03] blur-3xl" />
        <div className="absolute right-[20%] top-[60%] h-[180px] w-[180px] rounded-full bg-[#2d5f8a] opacity-[0.03] blur-3xl" />
      </div>

      <div className="anim-fade-slow relative mb-6 flex items-center gap-4">
        <span className="h-px w-10 bg-gradient-to-r from-transparent to-[var(--accent-soft)]" />
        <span className="hanja text-sm tracking-[0.4em] text-[var(--accent-soft)]">四柱八字</span>
        <span className="h-px w-10 bg-gradient-to-l from-transparent to-[var(--accent-soft)]" />
      </div>

      <h1 className="anim-fade anim-d1 relative font-[family-name:var(--font-noto-serif)] text-4xl font-bold leading-tight text-[var(--ink)] sm:text-5xl">
        사주편지
      </h1>

      <p className="anim-fade anim-d2 mt-4 text-[15px] tracking-wide text-[var(--ink-light)]">
        우리 가족의 사주 이야기
      </p>

      <div className="anim-fade anim-d3 mt-10 flex items-center gap-3">
        {[
          { h: "木", c: "text-[#52796f]", bg: "bg-[#f0f7f0]", b: "border-[#b7d7b0]" },
          { h: "火", c: "text-[#ae3f3d]", bg: "bg-[#fdf0ef]", b: "border-[#e5b4b3]" },
          { h: "土", c: "text-[#8b6914]", bg: "bg-[#fdf6e3]", b: "border-[#dcc88c]" },
          { h: "金", c: "text-[#71717a]", bg: "bg-[#f4f4f5]", b: "border-[#c4c4cc]" },
          { h: "水", c: "text-[#2d5f8a]", bg: "bg-[#eef3fa]", b: "border-[#a3bfd9]" },
        ].map((el) => (
          <div key={el.h} className={`flex h-10 w-10 items-center justify-center rounded-xl border ${el.bg} ${el.b}`}>
            <span className={`hanja text-base ${el.c}`}>{el.h}</span>
          </div>
        ))}
      </div>

      <div className="deco-line anim-fade anim-d3 mx-auto mt-10 w-48" />

      <p className="anim-fade anim-d4 mt-8 max-w-sm text-[13px] leading-[1.9] text-[var(--ink-muted)]">
        태어난 연월일시로 사주팔자를 풀고<br />
        오행의 균형과 운의 흐름을 살펴봅니다.<br />
        가족을 함께 등록하면 각자의 사주를<br />
        한곳에서 비교하고 읽을 수 있습니다.
      </p>

      <button onClick={onGoFamilies}
        className="anim-fade anim-d5 mt-10 rounded-lg bg-[var(--ink)] px-10 py-4 text-[15px] font-semibold tracking-wide text-[#f5f0e8] shadow-lg shadow-[var(--ink)]/10 transition-all hover:bg-[#1a1714] hover:shadow-xl active:scale-[0.97]">
        가족 사주 보기
      </button>

      <p className="anim-fade anim-d6 mt-5 text-[10px] text-[var(--ink-muted)]">
        입력 정보는 이 기기에만 저장됩니다
      </p>
    </div>
  );
}

/* ────────── Group List ────────── */
function GroupList({ groups, onSelect, onBack }: { groups: GroupData[]; onSelect: (id: number) => void; onBack: () => void }) {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-30 border-b border-[var(--border-light)] bg-[var(--bg-main)]/85 backdrop-blur-lg">
        <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-2.5">
          <button onClick={onBack} className="flex items-center gap-2">
            <span className="text-[13px] text-[var(--ink-muted)]">←</span>
            <span className="font-[family-name:var(--font-noto-serif)] text-base font-bold text-[var(--ink)]">
              사주편지
            </span>
          </button>
          <span className="text-[12px] text-[var(--ink-muted)]">{groups.length}개 가족</span>
        </div>
      </header>

      <div className="mx-auto max-w-2xl px-4 py-6">
        <div className="mb-5 text-center">
          <h2 className="font-[family-name:var(--font-noto-serif)] text-lg font-bold text-[var(--ink)]">가족 목록</h2>
          <p className="mt-1 text-[12px] text-[var(--ink-muted)]">가족을 선택하면 구성원의 사주를 볼 수 있습니다</p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {groups.map((g) => {
            const couple = coupleRoles(g.members);
            return (
              <button key={g.id} onClick={() => onSelect(g.id)}
                className="card group relative p-5 text-left transition-all hover:shadow-md active:scale-[0.98]">
                <div className="mb-3 flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--accent-bg)] text-[11px] font-bold text-[var(--accent)]">
                    {g.id}
                  </span>
                  <div>
                    <div className="text-[14px] font-bold text-[var(--ink)] group-hover:text-[var(--accent)]">
                      {groupLabel(g)}
                    </div>
                    <div className="text-[11px] text-[var(--ink-muted)]">{groupSubLabel(g)}</div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {[...g.members]
                    .sort((a, b) => (ROLE_ORDER[a.role] ?? 9) - (ROLE_ORDER[b.role] ?? 9))
                    .map((m) => (
                    <span key={m.name}
                      className="rounded-md border border-[var(--border-light)] bg-white/80 px-2 py-0.5 text-[11px] text-[var(--ink-light)]">
                      {m.name} <span className="text-[var(--ink-muted)]">{m.role}</span>
                    </span>
                  ))}
                </div>
                {couple && (
                  <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-gradient-to-r from-[var(--accent)] to-[#a67c28] px-2.5 py-1 shadow-sm">
                    <span className="hanja text-[9px] text-white/80">合</span>
                    <span className="text-[10px] font-bold text-white">궁합</span>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ────────── Group Detail ────────── */
function GroupDetail({ group, onBack }: { group: GroupData; onBack: () => void }) {
  const sorted = [...group.members].sort((a, b) => (ROLE_ORDER[a.role] ?? 9) - (ROLE_ORDER[b.role] ?? 9));
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [tab, setTab] = useState<"reading" | "compat">("reading");
  const selected = sorted[selectedIdx];
  const couple = coupleRoles(group.members);

  const familyMembers = sorted.filter((m) => m.saju).map((m) => ({
    id: m.name, name: m.name,
    birthday: m.birthDate.replace(/-/g, ""), time: "",
    birthdayType: (m.calendar === "음력" ? "LUNAR" : "SOLAR") as "SOLAR" | "LUNAR",
    gender: (m.gender === "M" ? "MALE" : "FEMALE") as "MALE" | "FEMALE",
    result: m.saju!,
  }));

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-30 border-b border-[var(--border-light)] bg-[var(--bg-main)]/85 backdrop-blur-lg">
        <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-2.5">
          <button onClick={onBack} className="flex items-center gap-2 text-[13px] text-[var(--ink-muted)] transition hover:text-[var(--ink)]">
            <span>←</span>
            <span className="font-[family-name:var(--font-noto-serif)] text-base font-bold text-[var(--ink)]">
              {groupLabel(group)}
            </span>
          </button>
          {couple && (
            <button onClick={() => setTab(tab === "compat" ? "reading" : "compat")}
              className={`flex items-center gap-1.5 rounded-lg px-4 py-2 text-[13px] font-bold shadow-sm transition-all active:scale-95 ${
                tab === "compat"
                  ? "bg-[var(--ink)] text-[#f5f0e8] shadow-[var(--ink)]/10"
                  : "bg-gradient-to-r from-[var(--accent)] to-[#a67c28] text-white shadow-[var(--accent)]/20 hover:shadow-md"
              }`}>
              <span className="hanja text-[11px]">合</span>
              궁합 보기
            </button>
          )}
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-4 py-4">
        {tab === "reading" && (
          <>
            <div className="no-scrollbar mb-5 flex gap-1.5 overflow-x-auto pb-1">
              {sorted.map((m, i) => {
                const active = i === selectedIdx;
                return (
                  <button key={m.name} onClick={() => setSelectedIdx(i)}
                    className={`relative flex shrink-0 items-center gap-2 rounded-lg border px-3.5 py-2 text-[13px] font-medium transition-all ${
                      active
                        ? "border-[var(--accent-soft)] bg-[var(--accent-bg)] text-[var(--accent)]"
                        : "border-[var(--border-light)] bg-white text-[var(--ink-muted)] hover:border-[var(--border)] hover:text-[var(--ink-light)]"
                    }`}>
                    <span className={`flex h-6 w-6 items-center justify-center rounded-md text-[10px] font-bold ${
                      active ? "bg-[var(--ink)] text-[#f5f0e8]" : "bg-[var(--bg-main)] text-[var(--ink-muted)]"
                    }`}>
                      {m.name.charAt(0)}
                    </span>
                    <span>{m.name}</span>
                    <span className="text-[10px] text-[var(--ink-muted)]">{m.role}</span>
                  </button>
                );
              })}
            </div>

            {selected?.saju ? (
              <SajuReading data={selected.saju} name={selected.name} />
            ) : (
              <div className="py-20 text-center">
                <p className="text-sm text-[var(--ink-muted)]">사주 데이터를 불러올 수 없습니다.</p>
              </div>
            )}
          </>
        )}

        {tab === "compat" && couple && (
          <Compatibility members={familyMembers} />
        )}
      </main>

      <footer className="mt-12 border-t border-[var(--border-light)] py-8 text-center">
        <p className="text-[11px] text-[var(--ink-muted)]">
          사주팔자는 동양 철학에 기반한 참고 자료이며, 모든 선택은 본인의 의지에 달려 있습니다.
        </p>
      </footer>
    </div>
  );
}

/* ────────── Page ────────── */
export default function Home() {
  const [groups, setGroups] = useState<GroupData[]>([]);
  const [view, setView] = useState<"hero" | "list" | "detail">("hero");
  const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Pre-load in background
    fetch("/api/groups")
      .then((r) => r.json())
      .then((d) => setGroups(d.groups || []))
      .catch(() => {});
  }, []);

  const selectedGroup = groups.find((g) => g.id === selectedGroupId);

  const goToList = () => {
    if (groups.length === 0) setLoading(true);
    setView("list");
    if (groups.length === 0) {
      fetch("/api/groups")
        .then((r) => r.json())
        .then((d) => { setGroups(d.groups || []); setLoading(false); })
        .catch(() => setLoading(false));
    }
  };

  if (view === "hero") {
    return <Hero onGoFamilies={goToList} />;
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-[var(--border)] border-t-[var(--accent)]" />
          <p className="text-[13px] text-[var(--ink-muted)]">불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (view === "detail" && selectedGroup) {
    return <GroupDetail group={selectedGroup} onBack={() => setView("list")} />;
  }

  return (
    <GroupList
      groups={groups}
      onSelect={(id) => { setSelectedGroupId(id); setView("detail"); }}
      onBack={() => setView("hero")}
    />
  );
}
