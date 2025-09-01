import { NextResponse } from "next/server";

type Body = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  recaptchaToken?: string;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Body;
    const { name, email, subject, message, recaptchaToken } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Verify Google reCAPTCHA v3 (required if configured)
    const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;
    if (recaptchaSecret) {
      if (!recaptchaToken) {
        return NextResponse.json(
          { ok: false, error: "reCAPTCHA token missing" },
          { status: 400 }
        );
      }
      const verifyParams = new URLSearchParams();
      verifyParams.append("secret", recaptchaSecret);
      verifyParams.append("response", recaptchaToken);
      const verifyRes = await fetch("https://www.google.com/recaptcha/api/siteverify", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: verifyParams.toString(),
        cache: "no-store",
      });
      const verifyData = (await verifyRes.json().catch(() => ({}))) as any;
      const ok = verifyData?.success === true && (typeof verifyData?.score !== "number" || verifyData.score >= 0.5);
      if (!ok) {
        return NextResponse.json(
          { ok: false, error: "reCAPTCHA verification failed", detail: verifyData },
          { status: 400 }
        );
      }
    }

    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_TO_EMAIL || process.env.NEXT_PUBLIC_CONTACT_TO_EMAIL;
    if (!apiKey || !toEmail) {
      return NextResponse.json(
        { ok: false, error: "Server not configured" },
        { status: 500 }
      );
    }

    // Build a safe `from` value acceptable by Resend
    const rawFrom = (process.env.CONTACT_FROM_EMAIL || "Portfolio <onboarding@resend.dev>").trim();
    const emailRegex = /^[^<>\s@]+@[^<>\s@]+\.[^<>\s@]+$/;
    let from = "onboarding@resend.dev"; // safest default per Resend docs
    if (rawFrom.includes("<") && rawFrom.includes(">")) {
      const namePart = rawFrom.split("<")[0].trim();
      const emailPart = rawFrom.substring(rawFrom.indexOf("<") + 1, rawFrom.indexOf(">")).trim();
      if (emailRegex.test(emailPart)) {
        from = namePart ? `${namePart} <${emailPart}>` : emailPart;
      }
    } else if (emailRegex.test(rawFrom)) {
      from = rawFrom;
    }
    const subj = subject?.trim() || `New message from ${name}`;
    const safe = (s: string) => s.replace(/[<>]/g, (m) => ({ "<": "&lt;", ">": "&gt;" }[m]!));

    const html = `
      <div style="font-family:Inter, ui-sans-serif, system-ui; line-height:1.6">
        <h2 style="margin:0 0 8px 0">New portfolio contact</h2>
        <p style="margin:0 0 4px 0"><strong>From:</strong> ${safe(name)} &lt;${safe(email)}&gt;</p>
        ${subject ? `<p style=\"margin:0 0 12px 0\"><strong>Subject:</strong> ${safe(subject)}</p>` : ""}
        <div style="padding:12px; border:1px solid #eee; border-radius:8px; white-space:pre-wrap">${safe(message)}</div>
      </div>
    `;

    const payload = {
      from,
      to: [toEmail],
      subject: subj,
      html,
      text: `${name} <${email}>\n${subject ? `Subject: ${subject}\n\n` : ""}${message}`,
      reply_to: [email],
    } as const;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      // Avoid caching
      cache: "no-store",
    });

    if (!res.ok) {
      let detail: any = null;
      const ct = res.headers.get("content-type") || "";
      if (ct.includes("application/json")) {
        try { detail = await res.json(); } catch {}
      } else {
        try { detail = await res.text(); } catch {}
      }
      return NextResponse.json(
        { ok: false, error: "Resend error", detail },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json({ ok: true, id: data?.id ?? null });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err?.message ?? "Unknown error" },
      { status: 500 }
    );
  }
}
