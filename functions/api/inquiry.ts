// Cloudflare Pages Function: POST /api/inquiry
//
// Validates an inquiry and forwards it. Configure ONE of these in the
// Pages project's environment variables:
//   INQUIRY_WEBHOOK_URL  – any JSON webhook (Zapier, Make, Slack, n8n…)
//   RESEND_API_KEY + INQUIRY_TO (+ optional INQUIRY_FROM) – email via Resend
// With neither set, it answers 503 and the site offers a pre-filled email
// to info@joehubers.com instead, so no inquiry is silently lost.

interface Env {
  INQUIRY_WEBHOOK_URL?: string;
  RESEND_API_KEY?: string;
  INQUIRY_TO?: string;
  INQUIRY_FROM?: string;
}

type Ctx = { request: Request; env: Env };

const TYPES: Record<string, string> = {
  wedding: 'Wedding',
  catering: 'Catering & delivery',
  'private-event': 'Company picnic or private event',
  birthday: 'Birthday party',
  'field-trip': 'School field trip',
  'power-lunch': 'Power Lunch meeting',
  general: 'General question',
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json', 'cache-control': 'no-store' } });

const clip = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

export const onRequestPost = async ({ request, env }: Ctx) => {
  let data: Record<string, unknown>;
  try {
    data = await request.json();
  } catch {
    return json({ ok: false, error: 'Invalid request' }, 400);
  }

  // Honeypot: bots fill the hidden "company" field. Pretend success.
  if (clip(data.company, 200)) return json({ ok: true });

  const inquiry = {
    type: TYPES[clip(data.type, 40)] ?? 'General question',
    firstName: clip(data.firstName, 80),
    lastName: clip(data.lastName, 80),
    email: clip(data.email, 160),
    phone: clip(data.phone, 40),
    date: clip(data.date, 20),
    guests: clip(data.guests, 10),
    message: clip(data.message, 5000),
    receivedAt: new Date().toISOString(),
  };

  if (!inquiry.firstName || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inquiry.email) || !inquiry.message) {
    return json({ ok: false, error: 'Please complete the required fields.' }, 422);
  }

  const text = [
    `New ${inquiry.type} inquiry from joehubers.com`,
    '',
    `Name: ${inquiry.firstName} ${inquiry.lastName}`.trim(),
    `Email: ${inquiry.email}`,
    inquiry.phone && `Phone: ${inquiry.phone}`,
    inquiry.date && `Preferred date: ${inquiry.date}`,
    inquiry.guests && `Estimated guests: ${inquiry.guests}`,
    '',
    inquiry.message,
  ]
    .filter((l) => l !== '' && l !== undefined)
    .join('\n');

  try {
    if (env.INQUIRY_WEBHOOK_URL) {
      const r = await fetch(env.INQUIRY_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ ...inquiry, text }),
      });
      if (!r.ok) throw new Error(`Webhook ${r.status}`);
      return json({ ok: true });
    }
    if (env.RESEND_API_KEY && env.INQUIRY_TO) {
      const r = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { authorization: `Bearer ${env.RESEND_API_KEY}`, 'content-type': 'application/json' },
        body: JSON.stringify({
          from: env.INQUIRY_FROM ?? 'Joe Huber’s Website <website@joehubers.com>',
          to: env.INQUIRY_TO.split(',').map((s) => s.trim()),
          reply_to: inquiry.email,
          subject: `${inquiry.type} inquiry: ${inquiry.firstName} ${inquiry.lastName}`.trim(),
          text,
        }),
      });
      if (!r.ok) throw new Error(`Resend ${r.status}`);
      return json({ ok: true });
    }
  } catch (e) {
    console.error('Inquiry delivery failed', e);
    return json({ ok: false, error: 'Delivery failed' }, 502);
  }

  return json({ ok: false, error: 'Inquiry delivery is not configured' }, 503);
};

export const onRequest = () => json({ ok: false, error: 'Method not allowed' }, 405);
