import { useState } from 'react'

export interface DemoBoxProps {
  title: string
  description?: string
  code: string
  children: React.ReactNode
  defaultOpen?: boolean
}

export function DemoBox({ title, description, code, children, defaultOpen = false }: DemoBoxProps) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="demo-box">
      <div className="demo-box-preview">{children}</div>
      <div className="demo-box-meta">
        <div className="demo-box-title">{title}</div>
        {description && <div className="demo-box-description">{description}</div>}
      </div>
      <div className="demo-box-actions">
        <button
          className="demo-box-toggle"
          onClick={() => setOpen(!open)}
          title={open ? 'Hide Code' : 'Show Code'}
        >
          {open ? '▴ Hide Code' : '▾ Show Code'}
        </button>
      </div>
      {open && (
        <div className="demo-box-code">
          <pre><code>{code}</code></pre>
        </div>
      )}
    </div>
  )
}
