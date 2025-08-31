import SectionHeader from "../ui/SectionHeader";
import Container from "../ui/Container";

const UserIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" {...props}>
    <path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Z" />
    <path d="M3 22a9 9 0 0 1 18 0" strokeLinecap="round" />
  </svg>
);

export default function About() {
  const skills = [
    'WordPress', 'PHP', 'WooCommerce', 'ACF', 'Gutenberg/Blocks', 'Headless WP',
    'Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'REST API', 'GraphQL', 'WP-CLI', 'Vercel'
  ];

  return (
    <section id="about" className="scroll-mt-24 overflow-hidden py-16">
      <Container>
        <SectionHeader title="A little about me" eyebrow="About" Icon={UserIcon} />

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-foreground/10 p-5 bg-background/60">
            <p className="text-foreground/80">
              I’m a WordPress-first developer. I build custom themes, plugins, and headless WordPress apps
              with React and Next.js — focusing on performance, clean code, and great UX.
            </p>
            <ul className="mt-4 grid gap-2 text-sm text-foreground/70">
              <li>• Performance, SEO, and Core Web Vitals</li>
              <li>• Clean architecture and great DX/UX</li>
              <li>• Headless WordPress with React/Next.js</li>
            </ul>
          </div>

          <div className="rounded-xl border border-foreground/10 p-5 bg-background/60">
            <h4 className="font-medium">Skills</h4>
            <div className="mt-3 flex flex-wrap gap-2">
              {skills.map((s) => (
                <span key={s} className="inline-flex items-center rounded-full border border-foreground/15 px-3 py-1 text-xs text-foreground/80 bg-foreground/5">
                  {s}
                </span>
              ))}
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-lg border border-foreground/10 p-3">
                <p className="text-foreground/60">Currently</p>
                <p className="font-medium">WordPress 6.x, Gutenberg, Next.js 15</p>
              </div>
              <div className="rounded-lg border border-foreground/10 p-3">
                <p className="text-foreground/60">Exploring</p>
                <p className="font-medium">Headless WP patterns, server actions</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
