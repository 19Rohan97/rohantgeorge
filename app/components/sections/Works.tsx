'use client';
import Image from 'next/image';
import { useRef } from 'react';
import SectionHeader from "../ui/SectionHeader";
import Container from "../ui/Container";

const GridIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" {...props}>
    <path d="M3 3h8v8H3zM13 3h8v8h-8zM3 13h8v8H3zM13 13h8v8h-8z" />
  </svg>
);

const projects = [
  {
    title: "WooCommerce Storefront",
    description: "Custom WordPress theme with WooCommerce, optimized checkout and caching",
    image: "/next.svg",
    href: "#",
    tags: ["WordPress", "WooCommerce", "Performance"]
  },
  {
    title: "Headless WP + Next.js",
    description: "Gutenberg-powered CMS with a Next.js frontend and ISR",
    image: "/next.svg",
    href: "#",
    tags: ["Headless WP", "Next.js", "ISR"]
  },
  {
    title: "Plugin: Content Blocks",
    description: "Custom Gutenberg blocks and ACF fields for marketers",
    image: "/next.svg",
    href: "#",
    tags: ["Gutenberg", "ACF", "Plugin"]
  },
];

export default function Works() {
  const trackRef = useRef<HTMLDivElement | null>(null);

  const scrollByAmount = (dir: 'prev' | 'next') => {
    const el = trackRef.current;
    if (!el) return;
    const amount = Math.round(el.clientWidth * 0.9);
    el.scrollBy({ left: dir === 'next' ? amount : -amount, behavior: 'smooth' });
  };

  return (
    <section id="works" className="scroll-mt-24 overflow-hidden py-16">
      <Container>
        <SectionHeader title="Selected projects" eyebrow="Works" Icon={GridIcon} />

        {/* Mobile slider */}
        <div className="md:hidden relative">
          <div
            ref={trackRef}
            id="works-carousel"
            role="region"
            aria-roledescription="carousel"
            aria-label="Projects"
            className="-mx-4 px-4 flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-px-4 pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {projects.map((p) => (
              <a
                key={p.title}
                href={p.href}
                className="snap-start shrink-0 w-[85%] rounded-xl border border-foreground/10 bg-background/60 overflow-hidden shadow-sm hover:shadow-md transition-transform duration-200 hover:-translate-y-0.5"
              >
                <div className="relative aspect-video bg-gradient-to-br from-foreground/5 to-foreground/10">
                  <Image src={p.image} alt="" fill className="object-contain p-6 dark:invert" />
                  <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-t from-black/20 to-transparent" />
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <h4 className="font-medium">{p.title}</h4>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-60 group-hover:opacity-100"><path d="M7 17 17 7M7 7h10v10"/></svg>
                  </div>
                  <p className="mt-1 text-sm text-foreground/70">{p.description}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span key={t} className="text-[11px] rounded-full bg-foreground/5 px-2 py-1 text-foreground/70 border border-foreground/10">{t}</span>
                    ))}
                  </div>
                </div>
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
        <div className="mt-6 hidden md:grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <a key={p.title} href={p.href} className="group rounded-xl border border-foreground/10 bg-background/60 overflow-hidden shadow-sm hover:shadow-md transition-transform duration-200 hover:-translate-y-0.5">
              <div className="relative aspect-video bg-gradient-to-br from-foreground/5 to-foreground/10">
                <Image src={p.image} alt="" fill className="object-contain p-6 dark:invert" />
                <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-t from-black/20 to-transparent" />
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <h4 className="font-medium">{p.title}</h4>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-60 group-hover:opacity-100"><path d="M7 17 17 7M7 7h10v10"/></svg>
                </div>
                <p className="mt-1 text-sm text-foreground/70">{p.description}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span key={t} className="text-[11px] rounded-full bg-foreground/5 px-2 py-1 text-foreground/70 border border-foreground/10">{t}</span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}
