/*
  Optional Vercel serverless function for live enquiries and booking requests.

  It is only called when the site is built with VITE_ENQUIRY_MODE=live.
  It validates the payload again on the server, drops bot submissions, and
  emails the request to the business through Resend (https://resend.com).

  Required server-side environment variables (never prefixed with VITE_):
    RESEND_API_KEY   API key for Resend
    ENQUIRY_TO       Inbox that receives requests, e.g. custcare@diwanautocare.com
    ENQUIRY_FROM     Verified sender, e.g. "Website <web@diwanautocare.com>"

  Nothing is stored. For rate limiting in production, put Vercel's Firewall
  rate-limit rule (or a KV-backed counter) in front of /api/enquiry.
*/

type Payload = Record<string, unknown>

const MAX = { name: 80, phone: 20, email: 120, message: 2000, notes: 2000, vehicle: 80, size: 40 }

const clean = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '')

const escape = (s: string) => s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`)

function validate(body: Payload) {
  const name = clean(body.name, MAX.name)
  const phone = clean(body.phone, MAX.phone).replace(/\D/g, '').replace(/^(91|0)(?=\d{10}$)/, '')
  const email = clean(body.email, MAX.email)
  if (name.length < 2) return 'Please enter your name.'
  if (!/^[6-9]\d{9}$/.test(phone)) return 'Enter a 10-digit Indian mobile number.'
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return 'That email address looks incomplete.'
  if (body.kind !== 'enquiry' && body.kind !== 'booking') return 'Unknown request type.'
  return null
}

export async function POST(req: Request): Promise<Response> {
  const { RESEND_API_KEY, ENQUIRY_TO, ENQUIRY_FROM } = process.env
  if (!RESEND_API_KEY || !ENQUIRY_TO || !ENQUIRY_FROM) {
    return Response.json({ error: 'Enquiries are not configured yet. Please call the branch.' }, { status: 503 })
  }

  let body: Payload
  try {
    body = (await req.json()) as Payload
  } catch {
    return Response.json({ error: 'Invalid request.' }, { status: 400 })
  }

  // Honeypot: pretend success so bots learn nothing.
  if (clean(body.company, 100)) return Response.json({ ok: true })

  const problem = validate(body)
  if (problem) return Response.json({ error: problem }, { status: 422 })

  const fields = ['kind', 'name', 'phone', 'email', 'service', 'branch', 'date', 'slot', 'vehicle', 'size', 'message', 'notes']
  const rows = fields
    .map((k) => [k, clean(body[k], 2000)] as const)
    .filter(([, v]) => v)
    .map(([k, v]) => `<tr><th align="left">${k}</th><td>${escape(v).replace(/\n/g, '<br>')}</td></tr>`)
    .join('')

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: ENQUIRY_FROM,
      to: [ENQUIRY_TO],
      reply_to: clean(body.email, MAX.email) || undefined,
      subject: `Website ${body.kind === 'booking' ? 'booking request' : 'enquiry'}: ${clean(body.name, MAX.name)}`,
      html: `<table cellpadding="6">${rows}</table>`,
    }),
  })

  if (!res.ok) return Response.json({ error: 'The enquiry could not be sent. Please call the branch.' }, { status: 502 })
  return Response.json({ ok: true })
}
