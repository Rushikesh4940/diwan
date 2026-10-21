import { useId, type ReactNode } from 'react'

type Common = {
  label: string
  name: string
  value: string
  onChange: (name: string, value: string) => void
  onBlur?: (name: string) => void
  error?: string
  hint?: string
  required?: boolean
  dark?: boolean
  hideLabel?: boolean
  className?: string
}

type InputProps = Common & {
  as?: 'input'
  type?: string
  autoComplete?: string
  inputMode?: 'text' | 'tel' | 'email' | 'numeric'
  placeholder?: string
  min?: string
  max?: string
}
type TextareaProps = Common & { as: 'textarea'; placeholder?: string }
type SelectProps = Common & { as: 'select'; children: ReactNode }

/* One labelled control with its hint and error wired up for screen readers. */
export function Field(props: InputProps | TextareaProps | SelectProps) {
  const id = useId()
  const { label, name, value, onChange, onBlur, error, hint, required, dark, hideLabel, className = '' } = props
  const describedBy = [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(' ') || undefined
  const shared = {
    id,
    name,
    value,
    required,
    'aria-invalid': Boolean(error),
    'aria-describedby': describedBy,
    className: `field ${dark ? 'field-dark' : ''}`,
    onBlur: () => onBlur?.(name),
  }

  return (
    <div className={className}>
      <label htmlFor={id} className={hideLabel ? 'sr-only' : 'field-label'}>
        {label}
        {!required && !hideLabel && <span className="font-normal opacity-75"> (optional)</span>}
      </label>
      {props.as === 'textarea' ? (
        <textarea {...shared} placeholder={props.placeholder} onChange={(e) => onChange(name, e.target.value)} />
      ) : props.as === 'select' ? (
        <select {...shared} onChange={(e) => onChange(name, e.target.value)}>
          {props.children}
        </select>
      ) : (
        <input
          {...shared}
          type={props.type ?? 'text'}
          autoComplete={props.autoComplete}
          inputMode={props.inputMode}
          placeholder={props.placeholder}
          min={props.min}
          max={props.max}
          onChange={(e) => onChange(name, e.target.value)}
        />
      )}
      {hint && (
        <p id={`${id}-hint`} className="mt-1.5 text-base opacity-80">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className={`field-error ${dark ? 'text-danger' : 'text-[#8c1d13]'}`}>
          {error}
        </p>
      )}
    </div>
  )
}
