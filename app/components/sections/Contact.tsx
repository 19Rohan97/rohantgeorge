"use client";
import { useState } from "react";
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

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const fd = new FormData(form);
    const payload = Object.fromEntries(fd.entries());
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
        const detail = typeof data?.detail === 'string' ? data.detail : JSON.stringify(data?.detail || {});
        throw new Error(data?.error ? `${data.error}${detail ? `: ${detail}` : ''}` : "Failed to send. Please try again.");
      }
      setStatus("Thanks! Your message has been sent.");
      form.reset();
    } catch (err: any) {
      setStatus(err?.message || "Something went wrong. Please email me directly.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="contact" className="scroll-mt-24 overflow-hidden py-16">
      <Container>
        <SectionHeader
          title="Let’s work together"
          eyebrow="Contact"
          Icon={MailIcon}
        />

        <div className="mt-6 grid gap-6 md:grid-cols-5">
          <div className="md:col-span-2 rounded-xl border border-foreground/10 bg-background/60 p-5">
            <h4 className="font-medium">Details</h4>
            <ul className="mt-3 space-y-2 text-sm text-foreground/70">
              <li className="flex items-center gap-2">
                <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
                Available for new projects
              </li>
              <li>
                Email:{" "}
                <a
                  className="underline hover:no-underline"
                  href="mailto:hello@example.com"
                >
                  hello@example.com
                </a>
              </li>
              <li>Location: Toronot, CA (remote‑friendly)</li>
            </ul>
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
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
}
