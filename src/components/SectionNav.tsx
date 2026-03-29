"use client";

import { useState, useEffect } from "react";

const SECTIONS = [
  { id: "ohaeng", label: "오행" },
  { id: "summary", label: "풀이" },
  { id: "chart", label: "명식" },
  { id: "sipsung", label: "십성" },
  { id: "daeun", label: "운세" },
];

export default function SectionNav() {
  const [active, setActive] = useState("chart");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { threshold: 0.2, rootMargin: "-64px 0px -50% 0px" }
    );
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="no-scrollbar sticky top-[52px] z-20 -mx-5 flex gap-0.5 overflow-x-auto border-b border-[var(--border-light)] bg-[var(--bg-main)]/90 px-5 backdrop-blur-md sm:-mx-6 sm:justify-center sm:px-6">
      {SECTIONS.map(({ id, label }) => (
        <a
          key={id}
          href={`#${id}`}
          className={`relative shrink-0 px-3.5 py-2.5 text-[12px] font-medium transition-colors ${
            active === id
              ? "text-[var(--ink)]"
              : "text-[var(--ink-muted)] hover:text-[var(--ink-light)]"
          }`}
        >
          {label}
          {active === id && (
            <span className="absolute bottom-0 left-1/2 h-[2px] w-5 -translate-x-1/2 rounded-full bg-[var(--accent)]" />
          )}
        </a>
      ))}
    </nav>
  );
}
