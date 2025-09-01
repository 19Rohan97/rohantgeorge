"use client";
import { useEffect, useState } from "react";
import Script from "next/script";
import SectionHeader from "../ui/SectionHeader";
import Container from "../ui/Container";

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

export default function Contact() {
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [localTime, setLocalTime] = useState("");

  // Update local time for Toronto, CA
  useEffect(() => {
    const fmt = () =>
      new Intl.DateTimeFormat(undefined, {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
        timeZone: "America/Toronto",
      }).format(new Date());
    setLocalTime(fmt());
    const id = setInterval(() => setLocalTime(fmt()), 60_000);
    return () => clearInterval(id);
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const fd = new FormData(form);
    const payload: Record<string, any> = Object.fromEntries(fd.entries());
    try {
      const token = await getRecaptchaToken();
      if (token) payload.recaptchaToken = token;
    } catch {}
    setLoading(true);
    setStatus(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.ok) {
        const detail =
          typeof data?.detail === "string"
            ? data.detail
            : JSON.stringify(data?.detail || {});
        throw new Error(
          data?.error
            ? `${data.error}${detail ? `: ${detail}` : ""}`
            : "Failed to send. Please try again."
        );
      }
      setStatus("Thanks! Your message has been sent.");
      form.reset();
    } catch (err: any) {
      setStatus(
        err?.message || "Something went wrong. Please email me directly."
      );
    } finally {
      setLoading(false);
    }
  }

  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "";

  const getRecaptchaToken = async (): Promise<string | null> => {
    if (!siteKey) return null;
    const w = globalThis as any;
    await new Promise<void>((resolve) => {
      const check = () => {
        if (w.grecaptcha && w.grecaptcha.ready) {
          w.grecaptcha.ready(() => resolve());
        } else {
          setTimeout(check, 50);
        }
      };
      check();
    });
    if (!w.grecaptcha || !w.grecaptcha.execute) return null;
    return await w.grecaptcha.execute(siteKey, { action: "contact" });
  };

  return (
    <section id="contact" className="scroll-mt-24 overflow-hidden py-16">
      <Container>
        {siteKey && (
          <Script
            src={`https://www.google.com/recaptcha/api.js?render=${siteKey}`}
            strategy="afterInteractive"
          />
        )}
        <SectionHeader
          title="Let's work together"
          eyebrow="Contact"
          Icon={MailIcon}
        />

        <div className="mt-6 grid gap-6 md:grid-cols-5">
          <div className="md:col-span-2 rounded-xl border border-foreground/10 bg-background/60 p-5">
            <h4 className="font-medium">Details</h4>
            <div className="mt-3 space-y-3 text-sm text-foreground/80">
              {/* Availability */}
              <div className="flex items-center justify-between gap-3">
                <span className="inline-flex items-center gap-2">
                  <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
                  Open to new projects
                </span>
                <span className="rounded-full border border-foreground/10 bg-foreground/5 px-2 py-1 text-[11px] text-foreground/70">
                  Avg. response: &lt;24h
                </span>
              </div>

              {/* Email with copy */}
              <div className="flex items-center justify-between gap-3">
                <div>
                  <span className="text-foreground/60">Email</span>
                  <a
                    className="ml-2 underline hover:no-underline"
                    href="mailto:hello@example.com?subject=Project%20inquiry"
                  >
                    hello@example.com
                  </a>
                </div>
                <button
                  type="button"
                  onClick={async () => {
                    try {
                      await navigator.clipboard.writeText("hello@example.com");
                      setCopied(true);
                      setTimeout(() => setCopied(false), 1500);
                    } catch {}
                  }}
                  className="inline-flex items-center gap-1 rounded-md border border-foreground/15 bg-foreground/5 px-2 py-1 text-[12px] hover:bg-foreground/10"
                >
                  {copied ? "Copied" : "Copy"}
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect x="9" y="9" width="13" height="13" rx="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                </button>
              </div>

              {/* Location + time */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 21s-6-5.33-6-10a6 6 0 1 1 12 0c0 4.67-6 10-6 10Z" />
                    <circle cx="12" cy="11" r="2" />
                  </svg>
                  <span>Toronto, CA</span>
                </div>
                <span className="inline-flex items-center gap-1 text-foreground/70">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3 3" />
                  </svg>
                  Local time: {localTime}
                </span>
              </div>

              {/* Socials */}
              <div className="pt-2 border-t border-foreground/10">
                <div className="text-foreground/60 text-[12px]">Social</div>
                <div className="mt-2 flex flex-wrap gap-2">
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 rounded-md border border-foreground/15 bg-foreground/5 px-3 py-1.5 text-sm hover:bg-foreground/10"
                  >
                    <svg
                      width="16"
                      height="16"
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
                    className="inline-flex items-center gap-2 rounded-md border border-foreground/15 bg-foreground/5 px-3 py-1.5 text-sm hover:bg-foreground/10"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden
                    >
                      <path d="M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1h-4.59v-7.03h2.36l.35-2.74h-2.71v-1.75c0-.79.22-1.33 1.36-1.33h1.45V6.03c-.71-.08-1.43-.12-2.15-.12-2.13 0-3.59 1.3-3.59 3.68v2.06H10.4v2.74h2.49V21H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
                    </svg>
                    LinkedIn
                  </a>
                </div>
              </div>

              {/* Tech tags */}
              <div>
                <div className="text-foreground/60 text-[12px]">Core stack</div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {[
                    "WordPress",
                    "WooCommerce",
                    "Next.js",
                    "React",
                    "Gutenberg",
                  ].map((t) => (
                    <span
                      key={t}
                      className="text-[11px] rounded-full bg-foreground/5 px-2 py-1 text-foreground/70 border border-foreground/10"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Quick actions */}
              <div className="flex flex-wrap gap-2 pt-2">
                <a
                  href="#resume"
                  className="inline-flex items-center rounded-md border border-foreground/20 px-3 py-1.5 text-sm hover:bg-foreground/5"
                >
                  View Resume
                </a>
                <a
                  href="#works"
                  className="inline-flex items-center rounded-md border border-foreground/20 px-3 py-1.5 text-sm hover:bg-foreground/5"
                >
                  See Projects
                </a>
              </div>
            </div>
          </div>

          <div className="md:col-span-3 rounded-xl border border-foreground/10 bg-background/60 p-5">
            <h4 className="font-medium">Send a message</h4>
            <form onSubmit={onSubmit} className="mt-4 grid gap-4">
              <div className="grid gap-3 sm:grid-cols-2">
                <input
                  name="name"
                  required
                  placeholder="Your name"
                  className="rounded-md border border-foreground/20 bg-transparent px-3 py-2 outline-none focus:ring-2 focus:ring-foreground/20"
                />
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="Email"
                  className="rounded-md border border-foreground/20 bg-transparent px-3 py-2 outline-none focus:ring-2 focus:ring-foreground/20"
                />
              </div>
              <input
                name="subject"
                placeholder="Subject (optional)"
                className="rounded-md border border-foreground/20 bg-transparent px-3 py-2 outline-none focus:ring-2 focus:ring-foreground/20"
              />
              <textarea
                name="message"
                required
                placeholder="Message"
                rows={5}
                className="rounded-md border border-foreground/20 bg-transparent px-3 py-2 outline-none focus:ring-2 focus:ring-foreground/20"
              />
              <div className="flex items-center gap-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center justify-center rounded-md bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-4 py-2 text-sm font-medium hover:opacity-95 disabled:opacity-60"
                >
                  {loading ? "Sending…" : "Send"}
                </button>
                {status && (
                  <p className="text-sm text-foreground/70">{status}</p>
                )}
              </div>

              {siteKey && (
                <p className="text-[11px] text-foreground/50">
                  This site is protected by reCAPTCHA and the Google Privacy
                  Policy and Terms of Service apply.
                </p>
              )}
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
}
