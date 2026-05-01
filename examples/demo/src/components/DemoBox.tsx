import { useState, useRef } from 'react'
import { useI18n } from '../i18n'

export interface DemoBoxProps {
  title: string
  description?: string
  /** Source snippet shown under the "Show Code" toggle. Optional. */
  code?: string
  children: React.ReactNode
  defaultOpen?: boolean
  /** When true, preview doesn't add padding (for wide components like Table). */
  flush?: boolean
  /** Force a column layout inside preview. */
  vertical?: boolean
}

export function DemoBox({
  title,
  description,
  code,
  children,
  defaultOpen = false,
  flush = false,
  vertical = false,
}: DemoBoxProps) {
  const { t } = useI18n()
  const [open, setOpen] = useState(defaultOpen)
  const [copied, setCopied] = useState(false)
  const codeRef = useRef<HTMLPreElement>(null)
  const hasCode = typeof code === 'string' && code.trim().length > 0

  const copy = async () => {
    if (!hasCode) return
    try {
      await navigator.clipboard.writeText(code!)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      // ignore
    }
  }

  return (
    <div className="demo-box">
      <div
        className={[
          'demo-box-preview',
          flush ? 'demo-box-preview-flush' : '',
          vertical ? 'demo-box-preview-vertical' : '',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {children}
      </div>

      <div className="demo-box-meta">
        <div className="demo-box-title">{title}</div>
        {description && <div className="demo-box-description">{description}</div>}
      </div>

      {hasCode && (
        <div className="demo-box-actions" role="toolbar" aria-label={t.demoBox.toolbarLabel}>
          <button
            className="demo-box-action"
            onClick={copy}
            aria-label={t.demoBox.copyCode}
            type="button"
            title={copied ? t.demoBox.copiedToast : t.demoBox.copyCode}
          >
            <span aria-hidden>{copied ? '✓' : '⎘'}</span>
            <span>{copied ? t.demoBox.copied : t.demoBox.copy}</span>
          </button>
          <button
            className="demo-box-action"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label={open ? t.demoBox.hideCodeAria : t.demoBox.showCodeAria}
            type="button"
          >
            <span aria-hidden>{open ? '⌃' : '⌄'}</span>
            <span>{open ? t.demoBox.hideCode : t.demoBox.showCode}</span>
          </button>
        </div>
      )}

      {open && hasCode && (
        <div className="demo-box-code">
          <pre ref={codeRef}>
            <code>{code}</code>
          </pre>
        </div>
      )}
    </div>
  )
}
