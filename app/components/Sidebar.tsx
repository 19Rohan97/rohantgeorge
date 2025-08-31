"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

type NavItem = {
  href: string;
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};
const HomeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    aria-hidden="true"
    {...props}
  >
    <path
      d="M3 10.5 12 3l9 7.5V21a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1v-10.5Z"
      strokeLinejoin="round"
    />
  </svg>
);
const UserIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    aria-hidden="true"
    {...props}
  >
    <path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Z" />
    <path d="M3 22a9 9 0 0 1 18 0" strokeLinecap="round" />
  </svg>
);
const ResumeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    aria-hidden="true"
    {...props}
  >
    <path d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
    <path d="M14 3v5h5" />
    <path d="M9 13h6M9 17h6M9 9h2" />
  </svg>
);
const GridIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    aria-hidden="true"
    {...props}
  >
    <path d="M3 3h8v8H3zM13 3h8v8h-8zM3 13h8v8H3zM13 13h8v8h-8z" />
  </svg>
);
const MailIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    aria-hidden="true"
    {...props}
  >
    <path d="M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z" />
    <path d="m4 7 8 6 8-6" strokeLinejoin="round" />
  </svg>
);

const nav: NavItem[] = [
  { href: "#hero", label: "Home", icon: HomeIcon },
  { href: "#about", label: "About", icon: UserIcon },
  { href: "#resume", label: "Resume", icon: ResumeIcon },
  { href: "#works", label: "Works", icon: GridIcon },
  { href: "#contact", label: "Contact", icon: MailIcon },
];

export default function Sidebar() {
  const [active, setActive] = useState<string>("#hero");

  useEffect(() => {
    type SectionInfo = { id: string; top: number; bottom: number };
    let sections: SectionInfo[] = [];

    const measure = () => {
      sections = nav
        .map((n) => document.getElementById(n.href.slice(1)))
        .filter(Boolean)
        .map((el) => {
          const rect = el!.getBoundingClientRect();
          const top = rect.top + window.scrollY;
          const bottom = top + el!.offsetHeight;
          return { id: el!.id, top, bottom };
        });
    };

    const OFFSET = 100; // bias towards content above the fold

    const update = () => {
      if (!sections.length) measure();
      const scrollY = window.scrollY;
      const viewportBottom = scrollY + window.innerHeight;

      // If scrolled to bottom (or within 2px), force last section
      const doc = document.documentElement;
      if (viewportBottom >= doc.scrollHeight - 2) {
        const last = sections[sections.length - 1];
        if (last) setActive(`#${last.id}`);
        return;
      }

      const y = scrollY + OFFSET;

      // Find last section whose top is <= y
      let current = sections[0]?.id;
      for (const s of sections) {
        if (s.top <= y) current = s.id;
        else break;
      }

      // Safety: if none matched (very top), pick first
      if (!current && sections[0]) current = sections[0].id;

      if (current) setActive(`#${current}`);
    };

    const onScroll = () => requestAnimationFrame(update);
    const onResize = () => {
      measure();
      requestAnimationFrame(update);
    };

    measure();
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  function linkClasses(href: string) {
    const isActive = active === href;
    return [
      "block px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-colors",
      isActive
        ? "bg-foreground/10 text-foreground font-medium"
        : "hover:bg-foreground/5 text-foreground/80",
    ].join(" ");
  }

  function mobileItemClasses(href: string) {
    const isActive = active === href;
    return [
      "flex flex-col items-center justify-center gap-0.5 text-[11px] leading-none",
      isActive ? "text-foreground" : "text-foreground/70",
    ].join(" ");
  }

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex md:fixed md:inset-y-0 md:left-0 md:w-64 md:h-screen bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:border-r border-foreground/10 dark:border-foreground/20 z-40 flex-col">
        <div className="p-6 flex flex-col items-start gap-4">
          <div className="shrink-0 rounded-full overflow-hidden border border-foreground/10">
            <Image src="/Rohan.webp" alt="Avatar" width={90} height={90} />
          </div>
          <div>
            <h1 className="text-lg font-semibold">Rohan T George</h1>
            <p className="text-sm text-foreground/60">WordPress Developer</p>
          </div>
        </div>
        <nav className="px-6">
          <ul className="space-y-2">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={linkClasses(item.href)}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-auto p-6 text-xs text-foreground/60">
          <p>© {new Date().getFullYear()} Rohan T George</p>
        </div>
      </aside>

      {/* Mobile bottom app bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t border-foreground/10 dark:border-foreground/20 z-40">
        <ul className="grid grid-cols-5 h-full justify-items-center">
          {nav.map((item) => (
            <li key={item.href} className="flex">
              <Link href={item.href} className={mobileItemClasses(item.href)}>
                <item.icon width={22} height={22} className="opacity-90" />
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
