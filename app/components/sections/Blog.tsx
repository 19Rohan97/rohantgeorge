import Container from "../ui/Container";
import SectionHeader from "../ui/SectionHeader";

const BlogIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden {...props}>
    <path d="M4 4h10v6H4zM4 14h16v6H4z" />
    <path d="M14 4h6v6h-6z" />
  </svg>
);

const posts = [
  {
    title: 'Headless WordPress with Next.js: when and why',
    excerpt: 'A practical guide to choosing headless WP, tradeoffs, and patterns for ISR and previews.',
    href: '#',
    date: 'Aug 2025',
    tags: ['Headless', 'Next.js']
  },
  {
    title: 'Optimizing Core Web Vitals for WordPress',
    excerpt: 'From image optimization to server caching and theme tweaks that move the needle.',
    href: '#',
    date: 'Jul 2025',
    tags: ['Performance', 'SEO']
  },
  {
    title: 'WooCommerce performance tips',
    excerpt: 'Reduce checkout friction, improve TTFB, and tune for mobile conversions.',
    href: '#',
    date: 'Jun 2025',
    tags: ['WooCommerce']
  },
];

export default function Blog() {
  return (
    <section id="blog" className="scroll-mt-24 overflow-hidden py-16">
      <Container>
        <SectionHeader title="Blog" eyebrow="Articles & tips" Icon={BlogIcon} />

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {posts.map((p) => (
            <a key={p.title} href={p.href} className="group rounded-xl border border-foreground/10 bg-background/70 backdrop-blur-sm p-5 transition hover:shadow-sm">
              <div className="flex items-center justify-between gap-3 text-[12px] text-foreground/60">
                <span>{p.date}</span>
                <div className="flex flex-wrap gap-1">
                  {p.tags?.map((t) => (
                    <span key={t} className="rounded-full bg-foreground/5 border border-foreground/10 px-2 py-0.5">{t}</span>
                  ))}
                </div>
              </div>
              <h4 className="mt-2 font-medium group-hover:underline">{p.title}</h4>
              <p className="mt-1.5 text-sm text-foreground/70">{p.excerpt}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-[12px] text-foreground/60">Read more
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17 17 7M7 7h10v10"/></svg>
              </span>
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}
