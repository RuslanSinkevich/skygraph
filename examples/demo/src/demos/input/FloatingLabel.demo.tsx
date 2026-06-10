import { useState } from 'react'
import { Input } from '@skygraph/react'
import { useDemoStrings } from '../../i18n'

/**
 * Floating-label inputs built on plain CSS — no core changes.
 *
 * Trick: pass `placeholder=" "` (a single space) so `:placeholder-shown`
 * fires only while the field is empty, then float the label up via
 * `:has(input:focus)` and `:has(input:not(:placeholder-shown))`.
 *
 * Two variants ship with the demo:
 *   • Outlined (Material-3 style) — label notches through the top border.
 *   • Filled — soft tinted box, label glides into a small caption row.
 */
const STRINGS = {
  en: {
    outlined: 'Outlined',
    filled: 'Filled',
    email: 'Email',
    password: 'Password',
    fullName: 'Full name',
    company: 'Company',
  },
  ru: {
    outlined: 'Контурный',
    filled: 'С заливкой',
    email: 'Email',
    password: 'Пароль',
    fullName: 'ФИО',
    company: 'Компания',
  },
} as const

const SHEET = `
.demo-float {
  position: relative;
  width: 100%;
}
.demo-float-label {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  /* Cap the label to the field so a long caption can't spill past the input
   * edge (which read as the label being "too wide"). The notch background
   * then only ever covers the text it wraps. */
  max-width: calc(100% - 24px);
  box-sizing: border-box;
  font-size: 14px;
  color: var(--sg-color-text-secondary);
  pointer-events: none;
  transition:
    top 180ms cubic-bezier(0.4, 0, 0.2, 1),
    transform 180ms cubic-bezier(0.4, 0, 0.2, 1),
    font-size 180ms cubic-bezier(0.4, 0, 0.2, 1),
    color 180ms ease;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Outlined: extra room top + bottom for the label to live above the border. */
.demo-float-outlined .sg-input {
  --sg-input-height: 48px;
  --sg-input-padding: 18px 14px 6px;
}
.demo-float-outlined .demo-float-label {
  background: var(--sg-color-bg-container);
  padding: 0 4px;
}
.demo-float-outlined:has(.sg-input:focus) .demo-float-label,
.demo-float-outlined:has(.sg-input:not(:placeholder-shown)) .demo-float-label {
  top: 0;
  transform: translateY(-50%) scale(0.85);
  transform-origin: left center;
  color: var(--sg-color-primary);
}

/* Filled: tinted surface, label tucks to the top inside the box. */
.demo-float-filled .sg-input {
  --sg-input-height: 48px;
  --sg-input-padding: 18px 14px 6px;
  --sg-input-bg: #f1f5f9;
  --sg-input-border: transparent;
  border-bottom: 2px solid var(--sg-color-border) !important;
  border-radius: var(--sg-border-radius) var(--sg-border-radius) 0 0;
}
.demo-float-filled .sg-input:hover {
  --sg-input-bg: #e2e8f0;
}
.demo-float-filled .sg-input:focus {
  --sg-input-bg: #eef2ff;
  border-bottom-color: var(--sg-color-primary) !important;
  box-shadow: none;
}
.demo-float-filled:has(.sg-input:focus) .demo-float-label,
.demo-float-filled:has(.sg-input:not(:placeholder-shown)) .demo-float-label {
  top: 10px;
  transform: translateY(-50%) scale(0.78);
  transform-origin: left center;
  color: var(--sg-color-primary);
}
`

export function FloatingLabelInput() {
  const t = useDemoStrings(STRINGS)
  const [outName, setOutName] = useState('')
  const [outCompany, setOutCompany] = useState('Acme Inc.')
  const [filEmail, setFilEmail] = useState('')
  const [filPwd, setFilPwd] = useState('')
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 240px))',
        gap: 24,
        maxWidth: 520,
      }}
    >
      <style>{SHEET}</style>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <span
          style={{
            fontSize: 11,
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: 'var(--sg-color-text-tertiary)',
          }}
        >
          {t.outlined}
        </span>
        <div className="demo-float demo-float-outlined">
          <Input value={outName} onChange={setOutName} placeholder=" " />
          <label className="demo-float-label">{t.fullName}</label>
        </div>
        <div className="demo-float demo-float-outlined">
          <Input value={outCompany} onChange={setOutCompany} placeholder=" " />
          <label className="demo-float-label">{t.company}</label>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <span
          style={{
            fontSize: 11,
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: 'var(--sg-color-text-tertiary)',
          }}
        >
          {t.filled}
        </span>
        <div className="demo-float demo-float-filled">
          <Input type="email" value={filEmail} onChange={setFilEmail} placeholder=" " />
          <label className="demo-float-label">{t.email}</label>
        </div>
        <div className="demo-float demo-float-filled">
          <Input type="password" value={filPwd} onChange={setFilPwd} placeholder=" " />
          <label className="demo-float-label">{t.password}</label>
        </div>
      </div>
    </div>
  )
}
