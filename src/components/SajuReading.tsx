"use client";

import { SajuResult, Ohaeng, OHAENG_STYLE } from "@/lib/types";
import { generateFullReading } from "@/lib/interpret";
import SajuChart from "./SajuChart";
import OhaengChart from "./OhaengChart";
import DaeunTimeline from "./DaeunTimeline";
import SectionNav from "./SectionNav";

function Section({
  id,
  title,
  subtitle,
  children,
  delay = 0,
}: {
  id?: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <section id={id} className="anim-fade card-warm p-5 sm:p-7" style={{ animationDelay: `${delay}s` }}>
      <div className="mb-5">
        <h3 className="font-[family-name:var(--font-noto-serif)] text-base font-bold text-[var(--ink)] sm:text-[17px]">
          {title}
        </h3>
        {subtitle && <p className="mt-0.5 text-[11px] text-[var(--ink-muted)]">{subtitle}</p>}
        <div className="deco-line mt-3" />
      </div>
      {children}
    </section>
  );
}

export default function SajuReading({ data, name, hideTime }: { data: SajuResult; name: string; hideTime?: boolean }) {
  const reading = generateFullReading(data);
  const oh = data.일간.오행 as Ohaeng;
  const s = OHAENG_STYLE[oh];

  return (
    <div className="space-y-4">
      {/* Header */}
      <header className="anim-fade py-4 text-center">
        <div className={`mx-auto mb-3 flex h-20 w-20 items-center justify-center rounded-2xl border-2 ${s.border} ${s.bg}`}>
          <span className={`hanja text-4xl ${s.color}`}>{data.일간.한자}</span>
        </div>
        <h2 className="font-[family-name:var(--font-noto-serif)] text-xl font-bold text-[var(--ink)] sm:text-2xl">
          {name}
        </h2>
        <p className="mt-1 text-[13px] text-[var(--ink-light)]">{reading.dayMaster.title} · {reading.dayMaster.symbol}</p>
        <div className="mt-2 flex items-center justify-center gap-3 text-[11px] text-[var(--ink-muted)]">
          <span>만 {data.나이.만_나이}세</span>
          <span className="text-[var(--border)]">·</span>
          <span>세 {data.나이.전통_나이}</span>
        </div>
      </header>

      <SectionNav />

      {/* ★ 종합 풀이 — 각 섹션 개별 디자인 */}
      {(() => {
        const sections = reading.overview.split(/──\s*/);
        // sections[0] = 오프닝+성격, [1] = 오행 성격포인트, [2] = 핵심정리, [3] = 공감체크
        const cards: React.ReactNode[] = [];

        // 1. 메인 풀이 (골드 카드)
        if (sections[0]?.trim()) {
          cards.push(
            <section key="main" id="summary" className="anim-fade card relative overflow-hidden p-5 sm:p-7"
              style={{ animationDelay: "0.05s", border: "1px solid var(--accent-soft)", background: "linear-gradient(135deg, var(--accent-bg), var(--bg-card))" }}>
              <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[var(--accent-soft)] opacity-[0.06]" />
              <h3 className="mb-1 font-[family-name:var(--font-noto-serif)] text-base font-bold text-[var(--accent)] sm:text-[17px]">
                {name}님의 사주 풀이
              </h3>
              <div className="deco-line mb-4 mt-3" />
              <div className="whitespace-pre-line text-[13px] leading-[2] text-[var(--ink-light)]">
                {sections[0].trim()}
              </div>
            </section>
          );
        }

        // 2. 오행 성격 포인트 (컬러 아이콘 카드)
        if (sections[1]?.trim()) {
          const lines = sections[1].trim().split("\n").filter((l) => l.trim());
          const blocks: { icon: string; color: string; bg: string; lines: string[] }[] = [];
          let current: typeof blocks[0] | null = null;

          for (const line of lines) {
            if (line.startsWith("🔥")) { current = { icon: "🔥", color: "text-[#9e2a2b]", bg: "bg-[#fdf0ef]", lines: [line.replace("🔥 ", "")] }; blocks.push(current); }
            else if (line.startsWith("🏔")) { current = { icon: "🏔", color: "text-[#8b6914]", bg: "bg-[#fdf6e3]", lines: [line.replace("🏔 ", "")] }; blocks.push(current); }
            else if (line.startsWith("⚔")) { current = { icon: "⚔", color: "text-[#52525b]", bg: "bg-[#f4f4f5]", lines: [line.replace("⚔ ", "")] }; blocks.push(current); }
            else if (line.startsWith("🌊")) { current = { icon: "🌊", color: "text-[#1e3a5f]", bg: "bg-[#eef3fa]", lines: [line.replace("🌊 ", "")] }; blocks.push(current); }
            else if (line.startsWith("🌿")) { current = { icon: "🌿", color: "text-[#2d6a4f]", bg: "bg-[#f0f7f0]", lines: [line.replace("🌿 ", "")] }; blocks.push(current); }
            else if (line.startsWith("❌")) { current = { icon: "❌", color: "text-[#9e2a2b]", bg: "bg-[#fdf0ef]/50", lines: [line.replace("❌ ", "")] }; blocks.push(current); }
            else if (current) { current.lines.push(line); }
          }

          cards.push(
            <section key="ohaeng-personality" className="anim-fade space-y-2" style={{ animationDelay: "0.1s" }}>
              <h3 className="px-1 font-[family-name:var(--font-noto-serif)] text-base font-bold text-[var(--ink)] sm:text-[17px]">
                오행으로 보는 성격
              </h3>
              <div className="grid gap-2 sm:grid-cols-2">
                {blocks.map((b, bi) => (
                  <div key={bi} className={`rounded-2xl border border-[var(--border-light)] ${b.bg} p-4`}>
                    <div className="mb-2 flex items-center gap-2">
                      <span className="text-lg">{b.icon}</span>
                      <span className={`text-[13px] font-bold ${b.color}`}>{b.lines[0]}</span>
                    </div>
                    {b.lines.slice(1).map((l, li) => (
                      <p key={li} className="text-[12px] leading-[1.7] text-[var(--ink-light)]">{l}</p>
                    ))}
                  </div>
                ))}
              </div>
            </section>
          );
        }

        // 3. 핵심 정리 (아이콘 그리드)
        if (sections[2]?.trim()) {
          const items = sections[2].trim().split("\n").filter((l) => l.trim());
          const iconMap: Record<string, { icon: string; accent: string; bg: string }> = {
            "✔ 강점": { icon: "💪", accent: "text-[#2d6a4f]", bg: "bg-[#f0f7f0]" },
            "✔ 잘 맞는": { icon: "🎯", accent: "text-[#1e3a5f]", bg: "bg-[#eef3fa]" },
            "⚠ 주의": { icon: "⚡", accent: "text-[#9e2a2b]", bg: "bg-[#fdf0ef]" },
            "💕 관계": { icon: "💕", accent: "text-[#8b6914]", bg: "bg-[#fdf6e3]" },
            "👉 한마디": { icon: "✨", accent: "text-[var(--accent)]", bg: "bg-[var(--accent-bg)]" },
          };

          cards.push(
            <section key="summary-grid" className="anim-fade space-y-2" style={{ animationDelay: "0.15s" }}>
              <h3 className="px-1 font-[family-name:var(--font-noto-serif)] text-base font-bold text-[var(--ink)] sm:text-[17px]">
                핵심 정리
              </h3>
              <div className="space-y-2">
                {items.map((item, ii) => {
                  const match = Object.entries(iconMap).find(([prefix]) => item.startsWith(prefix));
                  const cfg = match?.[1] || { icon: "•", accent: "text-[var(--ink)]", bg: "bg-white" };
                  const text = item.replace(/^[✔⚠💕👉]\s*/, "").replace(/^한마디로:\s*/, "");
                  const isHighlight = item.startsWith("👉");
                  return (
                    <div key={ii} className={`rounded-xl border border-[var(--border-light)] ${cfg.bg} p-3.5 ${isHighlight ? "ring-1 ring-[var(--accent-soft)]/40" : ""}`}>
                      <div className="flex items-start gap-2.5">
                        <span className="mt-0.5 text-base shrink-0">{cfg.icon}</span>
                        <p className={`text-[13px] leading-[1.8] ${isHighlight ? "font-bold " + cfg.accent : "text-[var(--ink-light)]"}`}>
                          {text}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          );
        }

        // 4. 공감 체크리스트 (인터랙티브)
        if (sections[3]?.trim()) {
          const checkItems = sections[3].trim().split("\n").filter((l) => l.startsWith("•")).map((l) => l.replace("• ", ""));
          if (checkItems.length > 0) {
            cards.push(
              <section key="checklist" className="anim-fade card-warm p-5 sm:p-7" style={{ animationDelay: "0.2s", background: "linear-gradient(135deg, #f0f7f0, var(--bg-card))", border: "1px solid #b7d7b0" }}>
                <h3 className="mb-1 font-[family-name:var(--font-noto-serif)] text-base font-bold text-[#2d6a4f] sm:text-[17px]">
                  혹시 이런 느낌 있으셨을까요?
                </h3>
                <p className="mb-4 text-[11px] text-[var(--ink-muted)]">해당되는 항목이 많을수록 사주가 잘 맞는 거예요</p>
                <div className="space-y-2">
                  {checkItems.map((item, ci) => (
                    <label key={ci} className="flex cursor-pointer items-center gap-3 rounded-xl border border-[#b7d7b0]/50 bg-white/70 px-4 py-3 transition-colors hover:bg-white">
                      <input type="checkbox" className="h-4 w-4 rounded border-[#b7d7b0] accent-[#2d6a4f]" />
                      <span className="text-[13px] text-[var(--ink-light)]">{item}</span>
                    </label>
                  ))}
                </div>
              </section>
            );
          }
        }

        return cards;
      })()}

      {/* 인생 방향 */}
      <section className="anim-fade card-warm relative overflow-hidden p-5 sm:p-7" style={{ animationDelay: "0.25s" }}>
        <div className="pointer-events-none absolute -left-8 -bottom-8 h-24 w-24 rounded-full bg-[#2d5f8a] opacity-[0.04]" />
        <h3 className="mb-1 font-[family-name:var(--font-noto-serif)] text-base font-bold text-[var(--ink)] sm:text-[17px]">
          인생의 흐름
        </h3>
        <p className="mt-0.5 text-[11px] text-[var(--ink-muted)]">오행 구조로 본 삶의 방향</p>
        <div className="deco-line mb-4 mt-3" />
        <div className="whitespace-pre-line text-[13px] leading-[2] text-[var(--ink-light)]">
          {reading.lifeDir}
        </div>
      </section>

      {/* 사주팔자 차트 */}
      <Section id="chart" title="사주 명식 四柱八字" subtitle="태어난 연·월·일·시의 천간과 지지" delay={0.15}>
        <SajuChart data={data} hideTime={hideTime} />
        <p className="mt-4 text-center text-[11px] text-[var(--ink-muted)] leading-relaxed">
          일주(日柱) 천간이 &lsquo;나&rsquo;를 나타내는 <strong className="text-[var(--ink-light)]">일간(日干)</strong>입니다
        </p>
      </Section>

      {/* 오행 분포 */}
      <Section id="ohaeng" title="오행 분포 五行" subtitle="나무·불·흙·쇠·물의 균형" delay={0.2}>
        <OhaengChart counts={data.오행_갯수} />
        <div className="mt-5 rounded-xl bg-white/60 p-4">
          <p className="whitespace-pre-line text-[13px] leading-[1.9] text-[var(--ink-light)]">{reading.ohaengAnalysis}</p>
        </div>
      </Section>

      {/* 십성 */}
      <Section id="sipsung" title="십성 구성 十星" subtitle="일간(나)과 다른 글자들의 관계" delay={0.25}>
        <div className="mb-3 rounded-xl border border-[var(--border-light)] bg-white/40 p-3">
          <p className="text-[11px] leading-relaxed text-[var(--ink-muted)]">
            십성은 일간(나)을 기준으로 다른 글자와의 생극(生剋) 관계입니다.
            각 위치마다 인생의 서로 다른 영역을 비춥니다.
          </p>
        </div>
        <div className="grid gap-2 sm:grid-cols-2">
          {reading.sipsung.filter((s) => !hideTime || !s.position.startsWith("시")).map((item, i) => {
            const posInfo: Record<string, string> = {
              연간: "조상·사회", 연지: "초년·외부",
              월간: "부모·직업", 월지: "형제·성장",
              시간: "자녀·말년", 시지: "노후·결과",
            };
            return (
              <div key={i} className="rounded-xl border border-[var(--border-light)] bg-white/60 p-3.5">
                <div className="mb-1 text-[10px] text-[var(--ink-muted)]">
                  {item.position} — {posInfo[item.position] || ""}
                </div>
                <div className="mb-1.5 flex items-baseline gap-2">
                  <span className="text-[14px] font-bold text-[var(--ink)]">{item.name}</span>
                  <span className="text-[11px] text-[var(--ink-muted)]">{item.info.role}</span>
                </div>
                <p className="text-[12px] leading-relaxed text-[var(--ink-light)]">{item.info.short}</p>
              </div>
            );
          })}
        </div>
      </Section>

      {/* 대운·세운 */}
      <Section id="daeun" title="운의 흐름" subtitle="대운(10년)과 세운(매년)의 전환" delay={0.3}>
        <DaeunTimeline data={data} />
        {reading.daeunReading && (
          <div className="mt-5 rounded-xl bg-white/60 p-4">
            <h4 className="mb-2 text-[12px] font-bold text-[var(--ink)]">대운 풀이</h4>
            <p className="whitespace-pre-line text-[13px] leading-[1.9] text-[var(--ink-light)]">{reading.daeunReading}</p>
          </div>
        )}
        {reading.seunReading && (
          <div className="mt-3 rounded-xl bg-white/60 p-4">
            <h4 className="mb-2 text-[12px] font-bold text-[var(--accent)]">올해의 운</h4>
            <p className="text-[13px] leading-[1.9] text-[var(--ink-light)]">{reading.seunReading}</p>
          </div>
        )}
      </Section>

      {/* 마무리 */}
      <div className="anim-fade rounded-xl bg-white/50 p-4 text-center" style={{ animationDelay: "0.35s" }}>
        <p className="text-[11px] leading-relaxed text-[var(--ink-muted)]">
          사주는 타고난 기질과 운의 흐름을 비추는 거울이지만,
          최종 결과는 본인의 선택과 노력에 달려 있습니다.
        </p>
      </div>
    </div>
  );
}
