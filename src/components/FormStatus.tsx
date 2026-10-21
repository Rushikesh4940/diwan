import { CheckCircle2, AlertCircle } from 'lucide-react'
import { LIVE } from '../lib/submit'

/* What happened after submit, said plainly. In demo mode nothing was sent. */
export function SentNotice({ demo, what, onReset, dark }: { demo: boolean; what: string; onReset: () => void; dark?: boolean }) {
  return (
    <div role="status" className="flex flex-col items-start gap-4" style={{ animation: 'rise-in 500ms var(--ease-out-expo) both' }}>
      <CheckCircle2 size={36} aria-hidden="true" />
      {demo ? (
        <>
          <p className="h-item">Your {what} is ready. This is a demo, so it was not sent.</p>
          <p className="max-w-[46ch]">
            On a live site it would go straight to the Diwan Auto Care team. Nothing you typed has been stored or
            shared. To reach the business today, call a branch directly.
          </p>
        </>
      ) : (
        <>
          <p className="h-item">Thank you. Your {what} has been sent.</p>
          <p className="max-w-[46ch]">The team will call you back during opening hours. This is a request, not a confirmed booking.</p>
        </>
      )}
      <button type="button" onClick={onReset} className={`btn ${dark ? 'btn-quiet' : 'btn-dark'}`}>
        Start again
      </button>
    </div>
  )
}

export function ErrorNotice({ message }: { message: string }) {
  return (
    <p role="alert" className="flex items-start gap-2 font-semibold">
      <AlertCircle size={20} className="mt-0.5 shrink-0" aria-hidden="true" /> {message}
    </p>
  )
}

export function DemoNote({ className = '' }: { className?: string }) {
  if (LIVE) return null
  return (
    <p className={`text-base ${className}`}>
      <strong>Demo form.</strong> It checks what you type but does not send or store anything.
    </p>
  )
}
