import SectionHeader from "../ui/SectionHeader";
import Container from "../ui/Container";

const BriefcaseIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" {...props}>
    <path d="M3 8h18a2 2 0 0 1 2 2v7a3 3 0 0 1-3 3H4a3 3 0 0 1-3-3v-7a2 2 0 0 1 2-2Z" />
    <path d="M8 8V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    <path d="M3 13h18" />
  </svg>
);

const items = [
  {
    role: 'Senior Developer',
    company: 'Company XYZ',
    period: '2023 — Present',
    desc: 'Leading WordPress platform work: custom themes/plugins, Gutenberg, and scalable component libraries.',
  },
  {
    role: 'Full‑Stack Developer',
    company: 'ABC Studio',
    period: '2021 — 2023',
    desc: 'Built headless WordPress sites with Next.js/React, optimized Core Web Vitals, and integrated WooCommerce.',
  },
  {
    role: 'B.Tech — Computer Science',
    company: 'University',
    period: '2017 — 2021',
    desc: 'Focused on web technologies with emphasis on WordPress and modern JS.',
  },
];

export default function Resume() {
  return (
    <section id="resume" className="scroll-mt-24 overflow-hidden py-16">
      <Container>
        <SectionHeader title="Experience & Education" eyebrow="Resume" Icon={BriefcaseIcon} />

        <ol className="relative mt-6 border-s border-foreground/10">
          {items.map((item, i) => (
            <li key={i} className="ms-6 pb-8 last:pb-0">
              <span className="absolute -start-3 mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-xs font-bold ring-2 ring-background">
                {items.length - i}
              </span>
              <div className="rounded-xl border border-foreground/10 bg-background/60 p-4">
                <div className="flex items-center justify-between gap-4">
                  <p className="font-medium">{item.role} — {item.company}</p>
                  <span className="whitespace-nowrap text-xs text-foreground/60">{item.period}</span>
                </div>
                <p className="mt-2 text-sm text-foreground/70">{item.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}


