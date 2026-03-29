"use client";

import { useState } from "react";

interface FormData {
  name: string;
  year: string;
  month: string;
  day: string;
  time: string;
  birthdayType: "SOLAR" | "LUNAR";
  gender: "MALE" | "FEMALE";
}

const SIGIN = [
  { value: "00", label: "자시", range: "23:30–01:30" },
  { value: "02", label: "축시", range: "01:30–03:30" },
  { value: "04", label: "인시", range: "03:30–05:30" },
  { value: "06", label: "묘시", range: "05:30–07:30" },
  { value: "08", label: "진시", range: "07:30–09:30" },
  { value: "10", label: "사시", range: "09:30–11:30" },
  { value: "12", label: "오시", range: "11:30–13:30" },
  { value: "14", label: "미시", range: "13:30–15:30" },
  { value: "16", label: "신시", range: "15:30–17:30" },
  { value: "18", label: "유시", range: "17:30–19:30" },
  { value: "20", label: "술시", range: "19:30–21:30" },
  { value: "22", label: "해시", range: "21:30–23:30" },
];

export default function SajuForm({
  onSubmit,
  loading,
}: {
  onSubmit: (data: FormData) => void;
  loading: boolean;
}) {
  const [form, setForm] = useState<FormData>({
    name: "",
    year: "",
    month: "",
    day: "",
    time: "12",
    birthdayType: "SOLAR",
    gender: "MALE",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.year || !form.month || !form.day) return;
    onSubmit(form);
  };

  const update = (key: keyof FormData, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const inputClass =
    "w-full rounded-lg border border-[var(--border)] bg-white px-4 py-3 text-[15px] text-[var(--ink)] placeholder-[var(--ink-muted)] outline-none transition-all focus:border-[var(--accent-soft)] focus:shadow-[0_0_0_3px_rgba(196,162,78,0.1)]";

  return (
    <form onSubmit={handleSubmit} className="space-y-7">
      {/* 이름 */}
      <fieldset>
        <legend className="mb-2 text-[13px] font-semibold text-[var(--ink-light)]">이름 또는 별명</legend>
        <input
          type="text"
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
          placeholder="홍길동"
          className={inputClass}
          required
        />
      </fieldset>

      {/* 생년월일 */}
      <fieldset>
        <legend className="mb-2 text-[13px] font-semibold text-[var(--ink-light)]">생년월일</legend>
        <div className="flex gap-2">
          <div className="relative flex-[3]">
            <input type="number" value={form.year} onChange={(e) => update("year", e.target.value)}
              placeholder="1990" min={1900} max={2030} className={inputClass + " pr-8"} required />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[var(--ink-muted)]">년</span>
          </div>
          <div className="relative flex-[2]">
            <input type="number" value={form.month} onChange={(e) => update("month", e.target.value)}
              placeholder="1" min={1} max={12} className={inputClass + " pr-8"} required />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[var(--ink-muted)]">월</span>
          </div>
          <div className="relative flex-[2]">
            <input type="number" value={form.day} onChange={(e) => update("day", e.target.value)}
              placeholder="15" min={1} max={31} className={inputClass + " pr-8"} required />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[var(--ink-muted)]">일</span>
          </div>
        </div>
        <div className="mt-2 flex rounded-lg border border-[var(--border)] overflow-hidden">
          {(["SOLAR", "LUNAR"] as const).map((t) => (
            <button key={t} type="button" onClick={() => update("birthdayType", t)}
              className={`flex-1 py-3 text-[13px] font-medium transition-colors ${
                form.birthdayType === t
                  ? "bg-[var(--accent-bg)] text-[var(--accent)] border-b-2 border-[var(--accent-soft)]"
                  : "bg-white text-[var(--ink-muted)] hover:bg-[var(--bg-warm)]"
              }`}>
              {t === "SOLAR" ? "양력" : "음력"}
            </button>
          ))}
        </div>
      </fieldset>

      {/* 태어난 시간 */}
      <fieldset>
        <legend className="mb-2 text-[13px] font-semibold text-[var(--ink-light)]">
          태어난 시간 <span className="font-normal text-[var(--ink-muted)]">— 시주(時柱)가 결정됩니다</span>
        </legend>
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
          {SIGIN.map((s) => (
            <button key={s.value} type="button" onClick={() => update("time", s.value)}
              className={`rounded-lg border px-1 py-3 text-center transition-all ${
                form.time === s.value
                  ? "border-[var(--accent-soft)] bg-[var(--accent-bg)] text-[var(--accent)] shadow-sm"
                  : "border-[var(--border-light)] bg-white text-[var(--ink-light)] hover:border-[var(--border)] hover:bg-[var(--bg-warm)]"
              }`}>
              <div className="text-[13px] font-bold">{s.label}</div>
              <div className={`mt-0.5 text-[10px] leading-tight ${form.time === s.value ? "text-[var(--accent-soft)]" : "text-[var(--ink-muted)]"}`}>{s.range}</div>
            </button>
          ))}
        </div>
      </fieldset>

      {/* 성별 */}
      <fieldset>
        <legend className="mb-2 text-[13px] font-semibold text-[var(--ink-light)]">
          성별 <span className="font-normal text-[var(--ink-muted)]">— 대운의 순행/역행이 달라집니다</span>
        </legend>
        <div className="flex gap-2">
          {(["MALE", "FEMALE"] as const).map((g) => (
            <button key={g} type="button" onClick={() => update("gender", g)}
              className={`flex flex-1 items-center justify-center gap-2 rounded-lg border py-3 text-[14px] font-medium transition-all ${
                form.gender === g
                  ? "border-[var(--accent-soft)] bg-[var(--accent-bg)] text-[var(--accent)] shadow-sm"
                  : "border-[var(--border-light)] bg-white text-[var(--ink-muted)] hover:border-[var(--border)]"
              }`}>
              {g === "MALE" ? "남" : "여"}
            </button>
          ))}
        </div>
      </fieldset>

      {/* 구분선 */}
      <div className="deco-line" />

      {/* 제출 */}
      <button type="submit" disabled={loading}
        className="group w-full rounded-lg bg-[var(--ink)] py-3.5 text-[15px] font-semibold text-[#f5f0e8] tracking-wide transition-all hover:bg-[#1a1714] active:scale-[0.98] disabled:opacity-50">
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            풀이하는 중...
          </span>
        ) : (
          "사주 풀어보기"
        )}
      </button>

      <p className="text-center text-[11px] text-[var(--ink-muted)]">
        입력 정보는 이 기기에만 저장됩니다
      </p>
    </form>
  );
}
