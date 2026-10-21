/*
  Form submission.

  By default the concept runs in demo mode: forms validate, then show a clear
  "not sent" state. Nothing leaves the browser and nothing is stored.

  To go live, deploy to Vercel with VITE_ENQUIRY_MODE=live plus the server-side
  variables documented in README (the handler is api/enquiry.ts).
*/

export const LIVE = import.meta.env.VITE_ENQUIRY_MODE === 'live'

export type SubmitResult = { ok: true; demo: boolean } | { ok: false; message: string }

export async function submitEnquiry(kind: 'enquiry' | 'booking', data: Record<string, string>): Promise<SubmitResult> {
  if (!LIVE) {
    // Short pause so the sending state is visible and honest about what happens.
    await new Promise((r) => setTimeout(r, 650))
    return { ok: true, demo: true }
  }
  try {
    const res = await fetch('/api/enquiry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ kind, ...data }),
    })
    if (!res.ok) {
      const body = (await res.json().catch(() => null)) as { error?: string } | null
      return { ok: false, message: body?.error ?? 'The enquiry could not be sent. Please call the branch instead.' }
    }
    return { ok: true, demo: false }
  } catch {
    return { ok: false, message: 'No connection. Check your network, or call the branch directly.' }
  }
}

/* ——— Validation shared by both forms ——— */

export type Errors = Record<string, string>

export const validators = {
  name: (v: string) => (v.trim().length < 2 ? 'Please enter your name.' : ''),
  phone: (v: string) => {
    const digits = v.replace(/\D/g, '').replace(/^(91|0)(?=\d{10}$)/, '')
    return /^[6-9]\d{9}$/.test(digits) ? '' : 'Enter a 10-digit Indian mobile number.'
  },
  email: (v: string) => (!v.trim() || /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? '' : 'That email address looks incomplete.'),
  required: (label: string) => (v: string) => (v.trim() ? '' : `Please choose ${label}.`),
  message: (v: string) => (v.trim().length < 10 ? 'Tell us a little more: at least 10 characters.' : ''),
}
