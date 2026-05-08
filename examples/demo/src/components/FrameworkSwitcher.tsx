import type React from 'react'

type Framework = 'react' | 'vue' | 'angular'

const FRAMEWORKS: { id: Framework; label: string; href: string; ready: boolean }[] = [
  { id: 'react', label: 'React', href: '/', ready: true },
  { id: 'vue', label: 'Vue', href: '/vue/', ready: false },
  { id: 'angular', label: 'Angular', href: '/angular/', ready: false },
]

export function FrameworkSwitcher({ active }: { active: Framework }) {
  return (
    <div
      role="tablist"
      aria-label="Framework"
      style={{
        display: 'inline-flex',
        gap: 4,
        padding: 2,
        borderRadius: 8,
        border: '1px solid var(--sg-border, #e5e7eb)',
        background: 'var(--sg-surface, transparent)',
      }}
    >
      {FRAMEWORKS.map((f) => {
        const isActive = f.id === active
        const baseStyle: React.CSSProperties = {
          padding: '4px 10px',
          borderRadius: 6,
          fontSize: 12,
          fontWeight: 500,
          fontFamily: 'inherit',
          textDecoration: 'none',
          transition: 'background 150ms, color 150ms',
        }
        if (!f.ready) {
          return (
            <span
              key={f.id}
              role="tab"
              aria-disabled="true"
              title="Coming soon"
              style={{
                ...baseStyle,
                color: 'var(--sg-text-muted, #9ca3af)',
                cursor: 'not-allowed',
                opacity: 0.55,
              }}
            >
              {f.label}
            </span>
          )
        }
        return (
          <a
            key={f.id}
            href={f.href}
            role="tab"
            aria-selected={isActive}
            style={{
              ...baseStyle,
              color: isActive ? 'var(--sg-text, #111827)' : 'var(--sg-text-muted, #6b7280)',
              background: isActive ? 'var(--sg-bg-hover, #f3f4f6)' : 'transparent',
              cursor: 'pointer',
            }}
          >
            {f.label}
          </a>
        )
      })}
    </div>
  )
}
