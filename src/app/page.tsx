"use client";

import { useState, useEffect, useMemo } from "react";
import { SajuResult } from "@/lib/types";
import SajuReading from "@/components/SajuReading";
import Compatibility from "@/components/Compatibility";

interface MemberData {
  name: string; birthDate: string; calendar: string;
  birthTime: string | null; birthTimeNote: string | null;
  gender: string; role: string; hasSaju: boolean; saju: SajuResult | null;
}
interface GroupData {
  id: number; note: string | null; members: MemberData[];
}

/* ── helpers ── */
function coupleRoles(members: MemberData[]): [MemberData, MemberData] | null {
  const a = members.find((m) => ["부", "예비신랑", "사위"].includes(m.role));
  const b = members.find((m) => ["모", "예비신부"].includes(m.role));
  if (a && b && a.saju && b.saju) return [a, b];
  return null;
}
function groupLabel(g: GroupData): string {
  const c = coupleRoles(g.members);
  if (c) return `${c[0].name} · ${c[1].name}`;
  return g.members.map((m) => m.name).slice(0, 2).join(" · ") + (g.members.length > 2 ? " 외" : "");
}
function groupSub(g: GroupData): string {
  if (g.note) return g.note;
  if (g.members.some((m) => m.role === "예비신랑")) return "결혼 예정";
  return `가족 ${g.members.length}명`;
}
const RO: Record<string, number> = { 부: 0, 모: 1, 예비신랑: 0, 예비신부: 1, 아들: 2, 딸: 3, 사위: 4 };

/* ────────────────────────────────────────────
   HERO
   ──────────────────────────────────────────── */
function Hero({ onGo, stats }: { onGo: () => void; stats: { families: number; people: number } }) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* BG blurs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[10%] h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-[var(--accent-soft)] opacity-[0.05] blur-3xl" />
        <div className="absolute left-[15%] top-[45%] h-[250px] w-[250px] rounded-full bg-[#52796f] opacity-[0.04] blur-3xl" />
        <div className="absolute right-[15%] top-[65%] h-[220px] w-[220px] rounded-full bg-[#2d5f8a] opacity-[0.04] blur-3xl" />
      </div>

      <div className="relative flex min-h-screen flex-col items-center justify-center px-4 text-center">
        {/* top deco */}
        <div className="anim-fade-slow mb-8 flex items-center gap-4">
          <span className="h-px w-12 bg-gradient-to-r from-transparent to-[var(--accent-soft)]" />
          <span className="hanja text-sm tracking-[0.4em] text-[var(--accent-soft)]">四柱八字</span>
          <span className="h-px w-12 bg-gradient-to-l from-transparent to-[var(--accent-soft)]" />
        </div>

        <h1 className="anim-fade anim-d1 font-[family-name:var(--font-noto-serif)] text-4xl font-bold leading-tight text-[var(--ink)] sm:text-5xl">
          사주편지
        </h1>
        <p className="anim-fade anim-d2 mt-3 text-[15px] tracking-wide text-[var(--ink-light)]">
          우리 가족의 사주 이야기
        </p>

        {/* 오행 icons */}
        <div className="anim-fade anim-d3 mt-10 flex items-center gap-3">
          {[
            { h: "木", c: "text-[#52796f]", bg: "bg-[#f0f7f0]", b: "border-[#b7d7b0]", label: "나무" },
            { h: "火", c: "text-[#ae3f3d]", bg: "bg-[#fdf0ef]", b: "border-[#e5b4b3]", label: "불" },
            { h: "土", c: "text-[#8b6914]", bg: "bg-[#fdf6e3]", b: "border-[#dcc88c]", label: "흙" },
            { h: "金", c: "text-[#71717a]", bg: "bg-[#f4f4f5]", b: "border-[#c4c4cc]", label: "쇠" },
            { h: "水", c: "text-[#2d5f8a]", bg: "bg-[#eef3fa]", b: "border-[#a3bfd9]", label: "물" },
          ].map((el) => (
            <div key={el.h} className="flex flex-col items-center gap-1">
              <div className={`flex h-11 w-11 items-center justify-center rounded-xl border ${el.bg} ${el.b}`}>
                <span className={`hanja text-lg ${el.c}`}>{el.h}</span>
              </div>
              <span className={`text-[9px] ${el.c}`}>{el.label}</span>
            </div>
          ))}
        </div>

        <div className="deco-line anim-fade anim-d4 mx-auto mt-10 w-52" />

        {/* Description */}
        <p className="anim-fade anim-d4 mt-8 max-w-sm text-[13px] leading-[1.9] text-[var(--ink-muted)]">
          태어난 연월일시의 네 기둥, <strong className="text-[var(--ink-light)]">사주팔자(四柱八字)</strong>를 풀어<br />
          오행의 균형과 운의 흐름을 살펴봅니다.<br />
          가족 구성원의 사주를 한곳에서 비교하고,<br />
          부부·커플 궁합까지 확인할 수 있습니다.
        </p>

        {/* Stats */}
        {stats.families > 0 && (
          <div className="anim-fade anim-d5 mt-8 flex items-center gap-6">
            <div className="text-center">
              <div className="text-xl font-bold text-[var(--ink)]">{stats.families}</div>
              <div className="text-[10px] text-[var(--ink-muted)]">가족</div>
            </div>
            <div className="h-6 w-px bg-[var(--border)]" />
            <div className="text-center">
              <div className="text-xl font-bold text-[var(--ink)]">{stats.people}</div>
              <div className="text-[10px] text-[var(--ink-muted)]">사주 풀이</div>
            </div>
          </div>
        )}

        {/* CTA */}
        <button onClick={onGo}
          className="anim-fade anim-d5 mt-10 rounded-lg bg-[var(--ink)] px-10 py-4 text-[15px] font-semibold tracking-wide text-[#f5f0e8] shadow-lg shadow-[var(--ink)]/10 transition-all hover:bg-[#1a1714] hover:shadow-xl active:scale-[0.97]">
          가족 사주 보기
        </button>

        {/* Bottom feature pills */}
        <div className="anim-fade anim-d6 mt-6 flex flex-wrap justify-center gap-2">
          {["사주팔자 풀이", "오행 분석", "십성 해석", "대운·세운", "부부 궁합"].map((f) => (
            <span key={f} className="rounded-full border border-[var(--border)] bg-white/70 px-3 py-1 text-[10px] text-[var(--ink-muted)]">{f}</span>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 anim-fade anim-d6">
        <button onClick={onGo} className="flex flex-col items-center gap-1 text-[var(--ink-muted)] transition hover:text-[var(--ink-light)]">
          <span className="text-[10px]">아래로</span>
          <svg className="h-4 w-4 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7" />
          </svg>
        </button>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────
   SAJU GUIDE (사주 개념 설명)
   ──────────────────────────────────────────── */
function SajuGuide() {
  const concepts = [
    {
      title: "사주팔자란?",
      body: "태어난 연(年), 월(月), 일(日), 시(時)의 네 기둥(四柱)에 각각 천간·지지 두 글자씩, 총 여덟 글자(八字)로 이루어진 것이 사주팔자입니다. 이 여덟 글자의 조합이 타고난 기질과 운의 흐름을 나타냅니다.",
    },
    {
      title: "오행이란?",
      body: "세상 만물을 木(나무)·火(불)·土(흙)·金(쇠)·水(물) 다섯 가지 기운으로 분류한 것입니다. 사주에서 이 다섯 기운이 얼마나 균형을 이루느냐에 따라 성격과 적성, 운의 흐름이 달라집니다.",
    },
    {
      title: "일간(日干)이란?",
      body: "사주에서 '나 자신'을 뜻하는 가장 중요한 글자입니다. 태어난 날의 천간으로 결정되며, 나머지 일곱 글자는 모두 일간을 기준으로 관계를 맺습니다.",
    },
    {
      title: "십성(十星)이란?",
      body: "일간(나)을 기준으로 다른 글자들과의 관계를 열 가지로 분류한 것입니다. 비견·겁재·식신·상관·편재·정재·편관·정관·편인·정인으로 나뉘며, 성격과 적성, 인간관계를 읽는 핵심 도구입니다.",
    },
    {
      title: "대운·세운이란?",
      body: "대운은 10년 단위로 바뀌는 큰 운의 흐름이고, 세운은 매년 바뀌는 한 해의 운입니다. 타고난 사주에 이 운이 어떻게 작용하느냐에 따라 좋은 시기와 조심할 시기가 달라집니다.",
    },
    {
      title: "궁합이란?",
      body: "두 사람의 사주를 비교해서 서로의 오행이 상생(도움)하는지, 상극(부딪힘)하는지, 천간합(자연스러운 결합)이 있는지를 살펴보는 것입니다. 부부나 커플의 조화를 가늠하는 데 쓰입니다.",
    },
  ];

  return (
    <div className="mt-8">
      <div className="mb-5 flex items-center gap-2">
        <div className="h-5 w-1 rounded-full bg-gradient-to-b from-[var(--accent)] to-[var(--accent-soft)]" />
        <h3 className="text-[14px] font-bold text-[var(--ink)]">사주, 어렵지 않아요</h3>
      </div>
      <div className="grid gap-2.5 sm:grid-cols-2">
        {concepts.map((c) => (
          <details key={c.title} className="card group overflow-hidden">
            <summary className="flex cursor-pointer items-center justify-between p-4 text-[13px] font-semibold text-[var(--ink)] transition-colors hover:text-[var(--accent)]">
              {c.title}
              <svg className="h-4 w-4 shrink-0 text-[var(--ink-muted)] transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <div className="border-t border-[var(--border-light)] px-4 pb-4 pt-3">
              <p className="text-[12px] leading-[1.8] text-[var(--ink-light)]">{c.body}</p>
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────
   GROUP LIST
   ──────────────────────────────────────────── */
function GroupList({ groups, onSelect, onBack }: { groups: GroupData[]; onSelect: (id: number) => void; onBack: () => void }) {
  const [listTab, setListTab] = useState<"families" | "search" | "guide">("families");
  const [query, setQuery] = useState("");

  const allMembers = useMemo(() =>
    groups.flatMap((g) => g.members.map((m) => ({ ...m, groupId: g.id, groupLabel: groupLabel(g) }))),
    [groups]
  );

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.trim().toLowerCase();
    return allMembers.filter((m) =>
      m.name.toLowerCase().includes(q) || m.role.includes(q) || m.groupLabel.toLowerCase().includes(q)
    );
  }, [query, allMembers]);

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-30 border-b border-[var(--border-light)] bg-[var(--bg-main)]/85 backdrop-blur-lg">
        <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-2.5">
          <button onClick={onBack} className="flex items-center gap-2">
            <span className="text-[13px] text-[var(--ink-muted)]">←</span>
            <span className="font-[family-name:var(--font-noto-serif)] text-base font-bold text-[var(--ink)]">사주편지</span>
          </button>
          <span className="text-[11px] text-[var(--ink-muted)]">{groups.length}개 가족 · {allMembers.length}명</span>
        </div>
        {/* Sub-tabs */}
        <div className="mx-auto flex max-w-2xl border-t border-[var(--border-light)]">
          {([
            { key: "families" as const, label: "가족 목록" },
            { key: "search" as const, label: "이름 검색" },
            { key: "guide" as const, label: "사주란?" },
          ]).map((t) => (
            <button key={t.key} onClick={() => setListTab(t.key)}
              className={`relative flex-1 py-2.5 text-center text-[12px] font-medium transition-colors ${
                listTab === t.key ? "text-[var(--ink)]" : "text-[var(--ink-muted)] hover:text-[var(--ink-light)]"
              }`}>
              {t.label}
              {listTab === t.key && (
                <span className="absolute bottom-0 left-1/2 h-[2px] w-8 -translate-x-1/2 rounded-full bg-[var(--accent)]" />
              )}
            </button>
          ))}
        </div>
      </header>

      <div className="mx-auto max-w-2xl px-4 py-5">
        {/* ── Families tab ── */}
        {listTab === "families" && (
          <div className="grid gap-3 sm:grid-cols-2">
            {groups.map((g) => {
              const couple = coupleRoles(g.members);
              return (
                <button key={g.id} onClick={() => onSelect(g.id)}
                  className="card group relative p-5 text-left transition-all hover:shadow-md active:scale-[0.98]">
                  <div className="mb-3 flex items-center gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--accent-bg)] text-[11px] font-bold text-[var(--accent)]">{g.id}</span>
                    <div>
                      <div className="text-[14px] font-bold text-[var(--ink)] group-hover:text-[var(--accent)]">{groupLabel(g)}</div>
                      <div className="text-[11px] text-[var(--ink-muted)]">{groupSub(g)}</div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {[...g.members].sort((a, b) => (RO[a.role] ?? 9) - (RO[b.role] ?? 9)).map((m) => (
                      <span key={m.name} className="rounded-md border border-[var(--border-light)] bg-white/80 px-2 py-0.5 text-[11px] text-[var(--ink-light)]">
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
        )}

        {/* ── Search tab ── */}
        {listTab === "search" && (
          <div>
            <div className="mb-4">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="이름, 역할, 가족 이름으로 검색..."
                autoFocus
                className="w-full rounded-lg border border-[var(--border)] bg-white px-4 py-3 text-[14px] text-[var(--ink)] placeholder-[var(--ink-muted)] outline-none transition focus:border-[var(--accent-soft)] focus:shadow-[0_0_0_3px_rgba(196,162,78,0.1)]"
              />
            </div>
            {query.trim() === "" ? (
              <div className="py-12 text-center text-[13px] text-[var(--ink-muted)]">
                이름이나 역할(부, 모, 아들, 딸 등)을 입력하세요
              </div>
            ) : searchResults.length === 0 ? (
              <div className="py-12 text-center text-[13px] text-[var(--ink-muted)]">
                &ldquo;{query}&rdquo;에 해당하는 결과가 없습니다
              </div>
            ) : (
              <div className="space-y-2">
                {searchResults.map((m) => (
                  <button key={`${m.groupId}-${m.name}`} onClick={() => onSelect(m.groupId)}
                    className="card flex w-full items-center gap-3 p-4 text-left transition-all hover:shadow-md active:scale-[0.98]">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--accent-bg)] text-[12px] font-bold text-[var(--accent)]">
                      {m.name.charAt(0)}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="text-[14px] font-bold text-[var(--ink)]">{m.name}</div>
                      <div className="text-[11px] text-[var(--ink-muted)]">{m.role} · {m.groupLabel}</div>
                    </div>
                    <span className="text-[11px] text-[var(--ink-muted)]">{m.birthDate}</span>
                  </button>
                ))}
                <p className="pt-2 text-center text-[11px] text-[var(--ink-muted)]">{searchResults.length}명 검색됨</p>
              </div>
            )}
          </div>
        )}

        {/* ── Guide tab ── */}
        {listTab === "guide" && <SajuGuide />}
      </div>

      <footer className="mt-8 border-t border-[var(--border-light)] py-8 text-center">
        <p className="text-[11px] text-[var(--ink-muted)]">사주팔자는 동양 철학에 기반한 참고 자료이며, 모든 선택은 본인의 의지에 달려 있습니다.</p>
        <p className="mt-2 text-[10px] text-[var(--border)]">사주편지 &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}

/* ────────────────────────────────────────────
   GROUP DETAIL
   ──────────────────────────────────────────── */
function GroupDetail({ group, onBack }: { group: GroupData; onBack: () => void }) {
  const sorted = [...group.members].sort((a, b) => (RO[a.role] ?? 9) - (RO[b.role] ?? 9));
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
            <span className="font-[family-name:var(--font-noto-serif)] text-base font-bold text-[var(--ink)]">{groupLabel(group)}</span>
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
                    }`}>{m.name.charAt(0)}</span>
                    <span>{m.name}</span>
                    <span className="text-[10px] text-[var(--ink-muted)]">{m.role}</span>
                  </button>
                );
              })}
            </div>
            {selected?.saju ? (
              <SajuReading data={selected.saju} name={selected.name} />
            ) : (
              <div className="py-20 text-center"><p className="text-sm text-[var(--ink-muted)]">사주 데이터를 불러올 수 없습니다.</p></div>
            )}
          </>
        )}
        {tab === "compat" && couple && <Compatibility members={familyMembers} />}
      </main>

      <footer className="mt-12 border-t border-[var(--border-light)] py-8 text-center">
        <p className="text-[11px] text-[var(--ink-muted)]">사주팔자는 동양 철학에 기반한 참고 자료이며, 모든 선택은 본인의 의지에 달려 있습니다.</p>
      </footer>
    </div>
  );
}

/* ────────────────────────────────────────────
   PAGE
   ──────────────────────────────────────────── */
export default function Home() {
  const [groups, setGroups] = useState<GroupData[]>([]);
  const [view, setView] = useState<"hero" | "list" | "detail">("hero");
  const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/groups").then((r) => r.json()).then((d) => setGroups(d.groups || [])).catch(() => {});
  }, []);

  const selectedGroup = groups.find((g) => g.id === selectedGroupId);
  const stats = {
    families: groups.length,
    people: groups.reduce((s, g) => s + g.members.length, 0),
  };

  const goToList = () => {
    if (groups.length === 0) {
      setLoading(true);
      fetch("/api/groups").then((r) => r.json()).then((d) => { setGroups(d.groups || []); setLoading(false); }).catch(() => setLoading(false));
    }
    setView("list");
  };

  if (view === "hero") return <Hero onGo={goToList} stats={stats} />;

  if (loading) return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-[var(--border)] border-t-[var(--accent)]" />
        <p className="text-[13px] text-[var(--ink-muted)]">불러오는 중...</p>
      </div>
    </div>
  );

  if (view === "detail" && selectedGroup) return <GroupDetail group={selectedGroup} onBack={() => setView("list")} />;

  return <GroupList groups={groups} onSelect={(id) => { setSelectedGroupId(id); setView("detail"); }} onBack={() => setView("hero")} />;
}
