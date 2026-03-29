"use client";

import { FamilyMember } from "@/lib/types";

interface Props {
  members: FamilyMember[];
  activeId: string | null;
  onSelect: (id: string) => void;
  onAdd: () => void;
}

export default function FamilyTabs({ members, activeId, onSelect, onAdd }: Props) {
  if (members.length === 0) return null;

  return (
    <div className="no-scrollbar flex items-center gap-1.5 overflow-x-auto pb-1">
      {members.map((m) => {
        const active = activeId === m.id;
        return (
          <button key={m.id} onClick={() => onSelect(m.id)}
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
            {m.name}
          </button>
        );
      })}
      <button onClick={onAdd}
        className="flex shrink-0 items-center gap-1 rounded-lg border border-dashed border-[var(--border)] px-3.5 py-2 text-[13px] text-[var(--ink-muted)] transition-all hover:border-[var(--accent-soft)] hover:text-[var(--accent)]">
        <span className="text-base leading-none">+</span>
        추가
      </button>
    </div>
  );
}
