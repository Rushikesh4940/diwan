import { useState, type FormEvent } from 'react'
import { submitEnquiry, type Errors } from './submit'

type Rules = Record<string, (v: string) => string>
type Status = { state: 'idle' } | { state: 'sending' } | { state: 'sent'; demo: boolean } | { state: 'error'; message: string }

/* Minimal controlled-form state with per-field validation on blur and on submit. */
export function useForm(kind: 'enquiry' | 'booking', initial: Record<string, string>, rules: Rules) {
  const [values, setValues] = useState(initial)
  const [errors, setErrors] = useState<Errors>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [status, setStatus] = useState<Status>({ state: 'idle' })

  const check = (name: string, v: string) => rules[name]?.(v) ?? ''

  const onChange = (name: string, v: string) => {
    setValues((s) => ({ ...s, [name]: v }))
    if (touched[name]) setErrors((e) => ({ ...e, [name]: check(name, v) }))
  }

  const onBlur = (name: string) => {
    setTouched((t) => ({ ...t, [name]: true }))
    setErrors((e) => ({ ...e, [name]: check(name, values[name] ?? '') }))
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const next: Errors = {}
    for (const name of Object.keys(rules)) {
      const msg = check(name, values[name] ?? '')
      if (msg) next[name] = msg
    }
    setErrors(next)
    setTouched(Object.fromEntries(Object.keys(rules).map((k) => [k, true])))
    const firstInvalid = Object.keys(next)[0]
    if (firstInvalid) {
      e.currentTarget.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus()
      return
    }
    // Honeypot: real people never fill the hidden "company" field.
    if (values.company) return setStatus({ state: 'sent', demo: true })
    setStatus({ state: 'sending' })
    const res = await submitEnquiry(kind, values)
    setStatus(res.ok ? { state: 'sent', demo: res.demo } : { state: 'error', message: res.message })
  }

  const reset = () => {
    setValues(initial)
    setErrors({})
    setTouched({})
    setStatus({ state: 'idle' })
  }

  return { values, errors, status, onChange, onBlur, onSubmit, reset }
}
