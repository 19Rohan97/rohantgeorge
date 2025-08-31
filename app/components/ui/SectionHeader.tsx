import React from 'react';

export type IconType = (props: React.SVGProps<SVGSVGElement>) => JSX.Element;

export default function SectionHeader({
  title,
  eyebrow,
  Icon,
}: {
  title: string;
  eyebrow?: string;
  Icon?: IconType;
}) {
  return (
    <header className="mb-4">
      {eyebrow && (
        <p className="text-[11px] uppercase tracking-wider text-foreground/60">{eyebrow}</p>
      )}
      <div className="mt-1 flex items-center gap-2">
        {Icon && (
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-foreground/5 border border-foreground/10 text-foreground/80">
            <Icon width={16} height={16} aria-hidden />
          </span>
        )}
        <h3 className="text-2xl md:text-3xl font-semibold">{title}</h3>
      </div>
    </header>
  );
}
