import type { ComponentType, SVGProps } from "react";\nimport Container from "../ui/Container";\nimport SectionHeader from "../ui/SectionHeader";

const WPIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden {...props}>
    <circle cx="12" cy="12" r="10" />
    <path d="M6.5 8.5c1.5-3 6-3.5 8.5-.8 1.6 1.6 1.8 4 .7 6.3L14 20" />
    <path d="M9.5 9.5 13.5 20" />
  </svg>
);
const CartIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden {...props}>
    <path d="M3 4h2l2 12h11l2-8H6" />
    <circle cx="9" cy="20" r="1.5" />
    <circle cx="18" cy="20" r="1.5" />
  </svg>
);
const HeadlessIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden {...props}>
    <rect x="3" y="4" width="18" height="12" rx="2" />
    <path d="M7 20h10" />
    <path d="M8 8h8M8 12h5" />
  </svg>
);
const SeoIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden {...props}>
    <circle cx="11" cy="11" r="7" />
    <path d="m21 21-4.3-4.3" />
    <path d="M9 11h4M11 9v4" />
  </svg>
);

type Item = {
  title: string;
  desc: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  badge: string;
};

const services: Item[] = [
  {
    title: "WordPress (themes/plugins)",
    desc: "Custom themes, plugins, Gutenberg blocks, ACF, multisite‑ready.",
    Icon: WPIcon,
    badge: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  },
  {
    title: "WooCommerce",
    desc: "Conversion‑focused storefronts, checkout optimization, payments, subscriptions.",
    Icon: CartIcon,
    badge: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  },
  {
    title: "Headless WP",
    desc: "WordPress as CMS with Next.js frontends, ISR, and APIs.",
    Icon: HeadlessIcon,
    badge: "bg-cyan-500/10 text-cyan-600 border-cyan-500/20",
  },
  {
    title: "Performance/SEO",
    desc: "Core Web Vitals, caching/CDN, schema, Lighthouse and on‑page SEO.",
    Icon: SeoIcon,
    badge: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  },
];

export default function Services() {
  return (
    <section id="services" className="scroll-mt-24 overflow-hidden py-16">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 -translate-x-1/2 w-[120vw] h-full bg-gradient-to-b from-foreground/[0.03] to-transparent" />
      </div>
      <Container>
        <SectionHeader title="Services" eyebrow="What I do" Icon={WPIcon} />
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {services.map(({ title, desc, Icon, badge }) => (
            <div
              key={title}
              className="relative rounded-xl border border-foreground/10 bg-background/70 backdrop-blur-sm p-5 transition hover:shadow-sm"
            >
              <div className={`inline-flex h-10 w-10 items-center justify-center rounded-lg border ${badge}`}>
                <Icon width={18} height={18} />
              </div>
              <h4 className="mt-3 font-medium">{title}</h4>
              <p className="mt-1.5 text-sm text-foreground/70">{desc}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

