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

/* ────────── helper ────────── */
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

/* ────────── Group List ────────── */
function GroupList({ groups, onSelect }: { groups: GroupData[]; onSelect: (id: number) => void }) {
  return (
    <div className="min-h-screen">
      <header className="py-10 text-center">
        <div className="mb-3 flex items-center justify-center gap-3">
          <span className="h-px w-8 bg-gradient-to-r from-transparent to-[var(--accent-soft)]" />
          <span className="hanja text-xs tracking-[0.3em] text-[var(--accent-soft)]">四柱八字</span>
          <span className="h-px w-8 bg-gradient-to-l from-transparent to-[var(--accent-soft)]" />
        </div>
        <h1 className="font-[family-name:var(--font-noto-serif)] text-2xl font-bold text-[var(--ink)] sm:text-3xl">
          사주편지
        </h1>
        <p className="mt-2 text-[13px] text-[var(--ink-muted)]">우리 가족의 사주 이야기</p>
      </header>

      <div className="mx-auto max-w-2xl px-4 pb-12">
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
                  {g.members
                    .sort((a, b) => (ROLE_ORDER[a.role] ?? 9) - (ROLE_ORDER[b.role] ?? 9))
                    .map((m) => (
                    <span key={m.name}
                      className="rounded-md border border-[var(--border-light)] bg-white/80 px-2 py-0.5 text-[11px] text-[var(--ink-light)]">
                      {m.name} <span className="text-[var(--ink-muted)]">{m.role}</span>
                    </span>
                  ))}
                </div>
                {couple && (
                  <div className="absolute right-4 top-4 rounded-full bg-[var(--accent-bg)] px-2 py-0.5 text-[9px] font-semibold text-[var(--accent)]">
                    궁합
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <footer className="border-t border-[var(--border-light)] py-8 text-center">
        <p className="text-[11px] text-[var(--ink-muted)]">
          사주팔자는 동양 철학에 기반한 참고 자료이며, 모든 선택은 본인의 의지에 달려 있습니다.
        </p>
        <p className="mt-2 text-[10px] text-[var(--border)]">사주편지 &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}

/* ────────── Group Detail ────────── */
function GroupDetail({
  group,
  onBack,
}: {
  group: GroupData;
  onBack: () => void;
}) {
  const sorted = [...group.members].sort((a, b) => (ROLE_ORDER[a.role] ?? 9) - (ROLE_ORDER[b.role] ?? 9));
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [tab, setTab] = useState<"reading" | "compat">("reading");
  const selected = sorted[selectedIdx];
  const couple = coupleRoles(group.members);

  // For compatibility component: transform to FamilyMember shape
  const familyMembers = sorted
    .filter((m) => m.saju)
    .map((m) => ({
      id: m.name,
      name: m.name,
      birthday: m.birthDate.replace(/-/g, ""),
      time: "",
      birthdayType: (m.calendar === "음력" ? "LUNAR" : "SOLAR") as "SOLAR" | "LUNAR",
      gender: (m.gender === "M" ? "MALE" : "FEMALE") as "MALE" | "FEMALE",
      result: m.saju!,
    }));

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-[var(--border-light)] bg-[var(--bg-main)]/85 backdrop-blur-lg">
        <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-2.5">
          <button onClick={onBack} className="flex items-center gap-2 text-[13px] text-[var(--ink-muted)] transition hover:text-[var(--ink)]">
            <span>←</span>
            <span className="font-[family-name:var(--font-noto-serif)] text-base font-bold text-[var(--ink)]">
              사주편지
            </span>
          </button>
          {couple && (
            <button onClick={() => setTab(tab === "compat" ? "reading" : "compat")}
              className={`rounded-md border px-3 py-1.5 text-[12px] font-medium transition-colors ${
                tab === "compat"
                  ? "border-[var(--accent-soft)] bg-[var(--accent-bg)] text-[var(--accent)]"
                  : "border-[var(--border)] bg-white text-[var(--ink-light)] hover:text-[var(--accent)]"
              }`}>
              궁합
            </button>
          )}
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-4 py-4">
        {/* Group info */}
        <div className="mb-4 text-center">
          <h2 className="text-[15px] font-bold text-[var(--ink)]">{groupLabel(group)}</h2>
          <p className="text-[11px] text-[var(--ink-muted)]">{groupSubLabel(group)}</p>
        </div>

        {/* Member tabs */}
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

            {/* Reading */}
            {selected?.saju ? (
              <SajuReading data={selected.saju} name={selected.name} />
            ) : (
              <div className="py-20 text-center">
                <p className="text-sm text-[var(--ink-muted)]">사주 데이터를 불러올 수 없습니다.</p>
                {selected?.birthTimeNote && (
                  <p className="mt-2 text-xs text-[var(--ink-muted)]">참고: {selected.birthTimeNote}</p>
                )}
              </div>
            )}
          </>
        )}

        {/* Compatibility */}
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
  const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/groups")
      .then((r) => r.json())
      .then((d) => { setGroups(d.groups || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const selectedGroup = groups.find((g) => g.id === selectedGroupId);

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

  if (selectedGroup) {
    return <GroupDetail group={selectedGroup} onBack={() => setSelectedGroupId(null)} />;
  }

  return <GroupList groups={groups} onSelect={setSelectedGroupId} />;
}
