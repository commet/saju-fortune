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

      {/* ★ 종합 풀이 — 최상단 */}
      <section id="summary" className="anim-fade card p-5 sm:p-7" style={{ animationDelay: "0.05s", border: "1px solid var(--accent-soft)", background: "linear-gradient(135deg, var(--accent-bg), var(--bg-card))" }}>
        <h3 className="mb-1 font-[family-name:var(--font-noto-serif)] text-base font-bold text-[var(--accent)] sm:text-[17px]">
          {name}님의 사주 풀이
        </h3>
        <div className="deco-line mb-5 mt-3" />
        <div className="whitespace-pre-line text-[13px] leading-[2] text-[var(--ink-light)]">
          {reading.overview}
        </div>
      </section>

      {/* 인생 방향 */}
      <section className="anim-fade card-warm p-5 sm:p-7" style={{ animationDelay: "0.1s" }}>
        <h3 className="mb-1 font-[family-name:var(--font-noto-serif)] text-base font-bold text-[var(--ink)] sm:text-[17px]">
          인생의 흐름
        </h3>
        <p className="mt-0.5 text-[11px] text-[var(--ink-muted)]">오행 구조로 본 삶의 방향</p>
        <div className="deco-line mb-5 mt-3" />
        <div className="whitespace-pre-line text-[13px] leading-[2] text-[var(--ink-light)]">
          {reading.lifeDir}
        </div>
      </section>

      {/* 사주팔자 차트 */}
      <Section id="chart" title="사주팔자 四柱八字" subtitle="태어난 연·월·일·시의 천간과 지지" delay={0.15}>
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
