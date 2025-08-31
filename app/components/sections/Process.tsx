import Container from "../ui/Container";
import SectionHeader from "../ui/SectionHeader";

const steps = [
  { title: "Discovery", desc: "Goals, scope, audience, success metrics." },
  { title: "Build", desc: "Design systems, themes, plugins, integrations." },
  { title: "QA", desc: "Accessibility, cross‑browser, devices, performance." },
  { title: "Launch", desc: "Zero‑downtime deploy, analytics, monitoring." },
  { title: "Care plan", desc: "Updates, backups, security, optimization." },
] as const;

export default function Process() {
  // Geometry for the circular layout
  const SIZE = 560; // canvas size (bigger ring)
  const CX = SIZE / 2;
  const CY = SIZE / 2;
  const R = 220; // ring radius (increased)

  // Compute node positions around the circle (top first, clockwise)
  const positions = steps.map((_, i) => {
    const angleDeg = -90 + i * (360 / steps.length);
    const angle = (angleDeg * Math.PI) / 180;
    return { x: CX + R * Math.cos(angle), y: CY + R * Math.sin(angle) };
  });

  return (
    <section id="process" className="scroll-mt-24 overflow-hidden py-16">
      <Container>
        <SectionHeader title="Process" eyebrow="How I work" />

        {/* Circular layout on large screens */}
        <div className="relative hidden lg:block mt-6">
          <div className="mx-auto relative" style={{ width: SIZE, height: SIZE }}>
            {/* Connector SVG with arrowheads */}
            <svg aria-hidden viewBox={`0 0 ${SIZE} ${SIZE}`} className="absolute inset-0 text-foreground/25">
              <defs>
                <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
                </marker>
              </defs>
              <g stroke="currentColor" strokeWidth="1.5" fill="none" markerEnd="url(#arrow)">
                {positions.map((p, i) => {
                  const q = positions[(i + 1) % positions.length];
                  return <path key={i} className="process-arc" pathLength={1} style={{ strokeDasharray: 1, strokeDashoffset: 1, animationDelay: `${i * 0.6}s`, animationDuration: "0.6s" }} d={`M ${p.x} ${p.y} A ${R} ${R} 0 0 1 ${q.x} ${q.y}`} />;
                })}
              </g>
              {/* dashed ring */}
              <circle cx={CX} cy={CY} r={R} fill="none" stroke="currentColor" strokeDasharray="2 6" className="opacity-30" />
            </svg>

            {/* Nodes */}
            {positions.map((pos, i) => (
              <Node key={steps[i].title} x={pos.x} y={pos.y} title={steps[i].title} desc={steps[i].desc} />
            ))}

            {/* Center label */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
              <div className="rounded-full border border-foreground/10 bg-foreground/5 px-5 py-2 text-sm text-foreground/70">Process</div>
            </div>
          </div>
        </div>

        {/* Accessible stacked fallback on small screens */}
        <ol className="lg:hidden relative mt-6 border-s border-foreground/10">
          {steps.map((s, i) => (
            <li key={s.title} className="ms-6 py-5 first:pt-0 last:pb-0">
              <span className="absolute -start-3 mt-1 flex h-6 w-6 items-center justify-center rounded-full ring-2 ring-background bg-foreground/10 text-[11px] text-foreground/80">
                {i + 1}
              </span>
              <div className="rounded-xl border border-foreground/10 bg-background/70 backdrop-blur-sm p-4">
                <h4 className="font-medium">{s.title}</h4>
                <p className="mt-2 text-sm text-foreground/70">{s.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

function Node({ x, y, title, desc }: { x: number; y: number; title: string; desc: string }) {
  return (
    <div className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: x, top: y }}>
      <div className="w-[220px] max-w-[48vw] rounded-xl border border-foreground/10 bg-background/70 backdrop-blur-sm p-4 shadow-sm">
        <h4 className="font-medium text-sm">{title}</h4>
        <p className="mt-1 text-[12px] text-foreground/70 leading-snug">{desc}</p>
      </div>
    </div>
  );
}





