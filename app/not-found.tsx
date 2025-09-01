import Link from "next/link";
import Container from "./components/ui/Container";

export default function NotFound() {
  return (
    <section className="scroll-mt-24 overflow-hidden py-20 h-dvh flex justify-center items-center">
      {/* Soft background accent */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[10%] -translate-x-1/2 h-72 w-[40rem] blur-3xl opacity-25 bg-gradient-to-r from-blue-500/40 to-cyan-400/40" />
      </div>

      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-eyebrow text-xs uppercase tracking-wider text-foreground/60">
            Oops
          </p>
          <h1 className="font-heading mt-2 text-5xl md:text-7xl font-extrabold leading-tight">
            <span className="bg-gradient-to-r from-blue-500 via-cyan-500 to-emerald-500 bg-clip-text text-transparent">
              404
            </span>
          </h1>
          <h2 className="mt-2 text-2xl md:text-3xl font-semibold">
            Page not found
          </h2>
          <p className="mt-3 text-foreground/70">
            The page you’re looking for doesn’t exist or has moved. Try heading
            back home or explore my work and get in touch.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center rounded-md bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-4 py-2 text-sm font-medium shadow-sm hover:opacity-95"
            >
              Go Home
            </Link>
            <Link
              href="/#works"
              className="inline-flex items-center rounded-md border border-foreground/20 px-4 py-2 text-sm font-medium hover:bg-foreground/5"
            >
              View Work
            </Link>
            <Link
              href="/#contact"
              className="inline-flex items-center rounded-md px-4 py-2 text-sm font-medium text-blue-600 dark:text-cyan-400 hover:underline"
            >
              Contact Me
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
