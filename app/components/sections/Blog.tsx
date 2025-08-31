"use client";
import Container from "../ui/Container";
import SectionHeader from "../ui/SectionHeader";
import { useRef } from "react";

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
  const trackRef = useRef<HTMLDivElement | null>(null);

  const scrollByAmount = (dir: 'prev' | 'next') => {
    const el = trackRef.current;
    if (!el) return;
    const amount = Math.round(el.clientWidth * 0.9);
    el.scrollBy({ left: dir === 'next' ? amount : -amount, behavior: 'smooth' });
  };

  return (
    <section id="blog" className="scroll-mt-24 overflow-hidden py-16">
      <Container>
        <SectionHeader title="Blog" eyebrow="Articles & tips" Icon={BlogIcon} />

        {/* Mobile slider (mirrors Works) */}
        <div className="md:hidden relative mt-6">
          <div
            ref={trackRef}
            id="blog-carousel"
            role="region"
            aria-roledescription="carousel"
            aria-label="Blog posts"
            className="-mx-4 px-4 flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-px-4 pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {posts.map((p) => (
              <a
                key={p.title}
                href={p.href}
                className="snap-start shrink-0 w-[85%] group rounded-xl border border-foreground/10 bg-background/70 backdrop-blur-sm p-5 transition hover:shadow-sm"
              >
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
          <div className="mt-3 flex justify-end gap-2 pr-4">
            <button
              type="button"
              aria-label="Previous"
              onClick={() => scrollByAmount('prev')}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-foreground/15 bg-background/80 backdrop-blur hover:bg-foreground/5"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 18-6-6 6-6"/></svg>
            </button>
            <button
              type="button"
              aria-label="Next"
              onClick={() => scrollByAmount('next')}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-foreground/15 bg-background/80 backdrop-blur hover:bg-foreground/5"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 6 6 6-6 6"/></svg>
            </button>
          </div>
        </div>

        {/* Desktop grid */}
        <div className="mt-6 hidden md:grid gap-4 md:grid-cols-3">
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

