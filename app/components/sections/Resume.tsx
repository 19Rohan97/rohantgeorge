"use client";

import SectionHeader from "../ui/SectionHeader";
import Container from "../ui/Container";
import { useState, KeyboardEvent } from "react";

const BriefcaseIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    aria-hidden="true"
    {...props}
  >
    <path d="M3 8h18a2 2 0 0 1 2 2v7a3 3 0 0 1-3 3H4a3 3 0 0 1-3-3v-7a2 2 0 0 1 2-2Z" />
    <path d="M8 8V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    <path d="M3 13h18" />
  </svg>
);

const GraduationCapIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    aria-hidden="true"
    {...props}
  >
    <path d="M22 10L12 6 2 10l10 4 10-4Z" />
    <path d="M6 12v4.5a6 6 0 0 0 12 0V12" />
  </svg>
);

type Item = {
  role: string;
  company: string;
  period: string;
  desc: string;
};

const experienceItems: Item[] = [
  {
    role: "Senior Developer",
    company: "Company XYZ",
    period: "2023 - Present",
    desc: "Leading WordPress platform work: custom themes/plugins, Gutenberg, and scalable component libraries.",
  },
  {
    role: "Full-Stack Developer",
    company: "ABC Studio",
    period: "2021 - 2023",
    desc: "Built headless WordPress sites with Next.js/React, optimized Core Web Vitals, and integrated WooCommerce.",
  },
];

const educationItems: Item[] = [
  {
    role: "B.Tech - Computer Science",
    company: "University",
    period: "2017 - 2021",
    desc: "Focused on web technologies with emphasis on WordPress and modern JS.",
  },
];

function TimelineList({ items }: { items: Item[] }) {
  return (
    <ol className="mt-4">
      {items.map((item, i) => (
        <li
          key={i}
          className="relative pb-8 pl-12 last:pb-0 before:absolute before:left-5.5 before:top-6 before:bottom-0 before:w-px before:bg-gradient-to-b before:from-blue-600/60 before:via-cyan-500/50 before:to-transparent last:before:hidden"
        >
          <span className="absolute left-2 top-2 z-[1] flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-[11px] font-bold ring-2 ring-background">
            {items.length - i}
          </span>
          <div className="rounded-xl border border-foreground/10 bg-background/60 p-4 transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <p className="font-medium">
                {item.role} - {item.company}
              </p>
              <span className="whitespace-nowrap text-xs text-foreground/60">
                {item.period}
              </span>
            </div>
            <p className="mt-2 text-sm text-foreground/70">{item.desc}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

export default function Resume() {
  const [active, setActive] = useState<"experience" | "education">(
    "experience"
  );

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      setActive((prev) => (prev === "experience" ? "education" : "experience"));
    }
  };

  const tabBase =
    "relative z-[1] inline-flex w-full items-center justify-center rounded-lg px-3 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/60 cursor-pointer";

  return (
    <section id="resume" className="scroll-mt-24 overflow-hidden py-16">
      <Container>
        <SectionHeader
          title="Experience & Education"
          eyebrow="Resume"
          Icon={BriefcaseIcon}
        />

        <div
          role="tablist"
          aria-orientation="horizontal"
          aria-label="Resume tabs"
          className="mt-6 relative w-full rounded-xl border border-foreground/10 bg-foreground/5 p-1"
          onKeyDown={onKeyDown}
        >
          <div
            aria-hidden
            className={`pointer-events-none absolute top-1 bottom-1 left-1 w-[calc(50%-0.25rem)] rounded-lg bg-background shadow-sm ring-1 ring-foreground/10 transition-transform duration-300 ease-out ${
              active === "experience" ? "translate-x-0" : "translate-x-full"
            }`}
          />
          <div className="grid grid-cols-2">
            <button
              id="tab-experience"
              role="tab"
              aria-selected={active === "experience"}
              aria-controls="panel-experience"
              className={`${tabBase} ${
                active === "experience"
                  ? "text-foreground"
                  : "text-foreground/70 hover:text-foreground"
              }`}
              onClick={() => setActive("experience")}
            >
              Experience
            </button>
            <button
              id="tab-education"
              role="tab"
              aria-selected={active === "education"}
              aria-controls="panel-education"
              className={`${tabBase} ${
                active === "education"
                  ? "text-foreground"
                  : "text-foreground/70 hover:text-foreground"
              }`}
              onClick={() => setActive("education")}
            >
              Education
            </button>
          </div>
        </div>

        <div className="mt-6">
          <div
            id="panel-experience"
            role="tabpanel"
            aria-labelledby="tab-experience"
            hidden={active !== "experience"}
          >
            <TimelineList items={experienceItems} />
          </div>
          <div
            id="panel-education"
            role="tabpanel"
            aria-labelledby="tab-education"
            hidden={active !== "education"}
          >
            <TimelineList items={educationItems} />
          </div>
        </div>
      </Container>
    </section>
  );
}
