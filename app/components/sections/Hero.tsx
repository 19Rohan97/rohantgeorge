import Container from "../ui/Container";
import Typewriter from "../ui/Typewriter";

export default function Hero() {
  return (
    <section
      id="hero"
      className="scroll-mt-24 overflow-hidden relative py-16 md:py-24"
    >
      {/* Background glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 h-64 w-[36rem] blur-3xl opacity-30 bg-gradient-to-r from-blue-500/40 to-cyan-400/40" />
      </div>

      <Container>
        <p className="text-xs uppercase tracking-wider text-foreground/60">
          Welcome
        </p>
        <h2 className="mt-2 text-4xl md:text-6xl font-extrabold leading-tight">
          <span className="bg-gradient-to-r from-blue-500 via-cyan-500 to-emerald-500 bg-clip-text text-transparent">
            Hi, I’m Rohan
          </span>
          <span className="block text-foreground">
            I build{" "}
            <span className="text-blue-600 dark:text-cyan-400">
              <Typewriter
                words={[
                  "WordPress sites",
                  "WooCommerce stores",
                  "headless WordPress",
                  "custom themes",
                  "plugins",
                  "Gutenberg blocks",
                  "Jamstack sites",
                  "performance audits",
                ]}
              />
            </span>
          </span>
        </h2>
        <p className="mt-5 max-w-2xl text-base md:text-lg text-foreground/70">
          WordPress developer with React and Next.js experience — building
          custom themes, plugins, and headless WordPress sites.
        </p>

        <div className="mt-7 flex flex-wrap gap-3">
          <a
            href="#works"
            className="inline-flex items-center rounded-md bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-4 py-2 text-sm font-medium shadow-sm hover:opacity-95"
          >
            View Work
          </a>
          <a
            href="#contact"
            className="inline-flex items-center rounded-md border border-foreground/20 px-4 py-2 text-sm font-medium hover:bg-foreground/5"
          >
            Contact Me
          </a>
          <a
            href="#resume"
            className="inline-flex items-center rounded-md px-4 py-2 text-sm font-medium text-blue-600 dark:text-cyan-400 hover:underline"
          >
            View Resume
          </a>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-foreground/70">
          <a
            href="#"
            className="inline-flex items-center gap-2 hover:text-foreground"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden
            >
              <path d="M12 .5a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.58v-2.1c-3.34.73-4.04-1.42-4.04-1.42-.55-1.4-1.35-1.77-1.35-1.77-1.1-.76.08-.74.08-.74 1.22.09 1.86 1.25 1.86 1.25 1.08 1.85 2.83 1.32 3.52 1 .11-.8.42-1.33.76-1.63-2.66-.3-5.46-1.33-5.46-5.92 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23.66 1.65.24 2.87.12 3.17.77.84 1.23 1.9 1.23 3.22 0 4.6-2.81 5.61-5.48 5.9.43.37.81 1.1.81 2.22v3.29c0 .32.22.69.82.57A12 12 0 0 0 12 .5Z" />
            </svg>
            GitHub
          </a>
          <a
            href="#"
            className="inline-flex items-center gap-2 hover:text-foreground"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden
            >
              <path d="M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1h-4.59v-7.03h2.36l.35-2.74h-2.71v-1.75c0-.79.22-1.33 1.36-1.33h1.45V6.03c-.71-.08-1.43-.12-2.15-.12-2.13 0-3.59 1.3-3.59 3.68v2.06H10.4v2.74h2.49V21H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
            </svg>
            LinkedIn
          </a>
          <a
            href="mailto:hello@example.com"
            className="inline-flex items-center gap-2 hover:text-foreground"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden
            >
              <path d="M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z" />
              <path d="m4 7 8 6 8-6" />
            </svg>
            Email
          </a>
        </div>
      </Container>
    </section>
  );
}
