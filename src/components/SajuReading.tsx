"use client";

import { SajuResult, Ohaeng, OHAENG_STYLE } from "@/lib/types";
import { generateFullReading } from "@/lib/interpret";
import SajuChart from "./SajuChart";
import OhaengChart from "./OhaengChart";
import DaeunTimeline from "./DaeunTimeline";
import SectionNav from "./SectionNav";

function Section({
  id, title, subtitle, children, delay = 0,
}: {
  id?: string; title: string; subtitle?: string; children: React.ReactNode; delay?: number;
}) {
  return (
    <section id={id} className="anim-fade card-warm p-5 sm:p-7" style={{ animationDelay: `${delay}s` }}>
      <div className="mb-5">
        <h3 className="font-[family-name:var(--font-noto-serif)] text-base font-bold text-[var(--ink)] sm:text-[17px]">{title}</h3>
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

  // overview를 ── 기준으로 분리
  const overviewSections = reading.overview.split(/──\s*/);
  const mainText = overviewSections[0]?.trim() || "";
  const ohaengPersonality = overviewSections[1]?.trim() || "";
  const coreSummary = overviewSections[2]?.trim() || "";
  const checklist = overviewSections[3]?.trim() || "";
  const checkItems = checklist.split("\n").filter((l) => l.startsWith("•")).map((l) => l.replace("• ", ""));

  return (
    <div className="space-y-4">
      {/* Header */}
      <header className="anim-fade py-4 text-center">
        <div className={`mx-auto mb-3 flex h-20 w-20 items-center justify-center rounded-2xl border-2 ${s.border} ${s.bg}`}>
          <span className={`hanja text-4xl ${s.color}`}>{data.일간.한자}</span>
        </div>
        <h2 className="font-[family-name:var(--font-noto-serif)] text-xl font-bold text-[var(--ink)] sm:text-2xl">{name}</h2>
        <p className="mt-1 text-[13px] text-[var(--ink-light)]">{reading.dayMaster.title} · {reading.dayMaster.symbol}</p>
        <div className="mt-2 flex items-center justify-center gap-3 text-[11px] text-[var(--ink-muted)]">
          <span>만 {data.나이.만_나이}세</span>
          <span className="text-[var(--border)]">·</span>
          <span>세 {data.나이.전통_나이}</span>
        </div>
      </header>

      <SectionNav />

      {/* 오행 분포 — 최상단 */}
      <section id="ohaeng" className="anim-fade card-warm p-5 sm:p-7" style={{ animationDelay: "0.03s" }}>
        <h3 className="mb-1 font-[family-name:var(--font-noto-serif)] text-base font-bold text-[var(--ink)] sm:text-[17px]">오행 분포</h3>
        <p className="mt-0.5 text-[11px] text-[var(--ink-muted)]">나무·불·흙·쇠·물의 균형</p>
        <div className="deco-line mb-5 mt-3" />
        <OhaengChart counts={data.오행_갯수} />
      </section>

      {/* 1. 사주 풀이 — 메인 */}
      {mainText && (
        <section id="summary" className="anim-fade card relative overflow-hidden p-5 sm:p-7"
          style={{ animationDelay: "0.05s", border: "1px solid var(--accent-soft)", background: "linear-gradient(135deg, var(--accent-bg), var(--bg-card))" }}>
          <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[var(--accent-soft)] opacity-[0.06]" />
          <h3 className="mb-1 font-[family-name:var(--font-noto-serif)] text-base font-bold text-[var(--accent)] sm:text-[17px]">
            {name}님의 사주 풀이
          </h3>
          <div className="deco-line mb-4 mt-3" />
          <div className="whitespace-pre-line text-[13px] leading-[2] text-[var(--ink-light)]">{mainText}</div>
        </section>
      )}

      {/* 2. 오행 성격 — 통일된 카드 안에 리스트 */}
      {ohaengPersonality && (
        <section className="anim-fade card-warm p-5 sm:p-7" style={{ animationDelay: "0.1s" }}>
          <h3 className="mb-1 font-[family-name:var(--font-noto-serif)] text-base font-bold text-[var(--ink)] sm:text-[17px]">
            오행으로 보는 성격
          </h3>
          <div className="deco-line mb-4 mt-3" />
          <div className="whitespace-pre-line text-[13px] leading-[1.9] text-[var(--ink-light)]">{ohaengPersonality}</div>
        </section>
      )}

      {/* 3. 핵심 정리 — 깔끔한 하나의 카드 */}
      {coreSummary && (
        <section className="anim-fade card-warm p-5 sm:p-7" style={{ animationDelay: "0.15s" }}>
          <h3 className="mb-1 font-[family-name:var(--font-noto-serif)] text-base font-bold text-[var(--ink)] sm:text-[17px]">
            핵심 정리
          </h3>
          <div className="deco-line mb-4 mt-3" />
          <div className="whitespace-pre-line text-[13px] leading-[1.9] text-[var(--ink-light)]">{coreSummary}</div>
        </section>
      )}

      {/* 4. 공감 체크리스트 — 텍스트만, 체크박스 없음 */}
      {checkItems.length > 0 && (
        <section className="anim-fade card-warm p-5 sm:p-7" style={{ animationDelay: "0.2s" }}>
          <h3 className="mb-1 font-[family-name:var(--font-noto-serif)] text-base font-bold text-[var(--ink)] sm:text-[17px]">
            혹시 이런 느낌 있으셨나요?
          </h3>
          <p className="mt-0.5 text-[11px] text-[var(--ink-muted)]">해당되는 게 많을수록 사주가 잘 맞는 거예요</p>
          <div className="deco-line mb-4 mt-3" />
          <div className="space-y-2">
            {checkItems.map((item, i) => (
              <div key={i} className="flex items-start gap-2.5 text-[13px] leading-[1.8] text-[var(--ink-light)]">
                <span className="mt-0.5 shrink-0 text-[var(--ink-muted)]">·</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 인생 흐름 */}
      <section className="anim-fade card-warm p-5 sm:p-7" style={{ animationDelay: "0.25s" }}>
        <h3 className="mb-1 font-[family-name:var(--font-noto-serif)] text-base font-bold text-[var(--ink)] sm:text-[17px]">
          인생의 흐름
        </h3>
        <p className="mt-0.5 text-[11px] text-[var(--ink-muted)]">오행 구조로 본 삶의 방향</p>
        <div className="deco-line mb-4 mt-3" />
        <div className="whitespace-pre-line text-[13px] leading-[2] text-[var(--ink-light)]">{reading.lifeDir}</div>
      </section>

      {/* 사주 명식 */}
      <Section id="chart" title="사주 명식" subtitle="태어난 연·월·일·시의 천간과 지지" delay={0.3}>
        <SajuChart data={data} hideTime={hideTime} />
      </Section>

      {/* 오행 분석 상세 */}
      {reading.ohaengAnalysis && (
        <section className="anim-fade card-warm p-5 sm:p-7" style={{ animationDelay: "0.35s" }}>
          <h3 className="mb-1 font-[family-name:var(--font-noto-serif)] text-base font-bold text-[var(--ink)] sm:text-[17px]">오행 분석</h3>
          <div className="deco-line mb-4 mt-3" />
          <p className="whitespace-pre-line text-[13px] leading-[1.9] text-[var(--ink-light)]">{reading.ohaengAnalysis}</p>
        </section>
      )}

      {/* 십성 */}
      <Section id="sipsung" title="십성 구성" subtitle="나를 기준으로 본 주변과의 관계" delay={0.4}>
        <div className="grid gap-2 sm:grid-cols-2">
          {reading.sipsung.filter((si) => !hideTime || !si.position.startsWith("시")).map((item, i) => {
            const posInfo: Record<string, string> = {
              연간: "조상·사회", 연지: "초년·외부", 월간: "부모·직업",
              월지: "형제·성장", 시간: "자녀·말년", 시지: "노후·결과",
            };
            return (
              <div key={i} className="rounded-xl border border-[var(--border-light)] bg-white/60 p-3.5">
                <div className="mb-1 text-[10px] text-[var(--ink-muted)]">{item.position} — {posInfo[item.position] || ""}</div>
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
      <Section id="daeun" title="운의 흐름" subtitle="대운(10년)과 세운(매년)의 전환" delay={0.45}>
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
            <p className="whitespace-pre-line text-[13px] leading-[1.9] text-[var(--ink-light)]">{reading.seunReading}</p>
          </div>
        )}
      </Section>

      {/* 마무리 */}
      <div className="anim-fade rounded-xl bg-white/50 p-4 text-center" style={{ animationDelay: "0.5s" }}>
        <p className="text-[11px] leading-relaxed text-[var(--ink-muted)]">
          사주는 타고난 기질과 운의 흐름을 비추는 거울이지만, 최종 결과는 본인의 선택과 노력에 달려 있습니다.
        </p>
      </div>
    </div>
  );
}
