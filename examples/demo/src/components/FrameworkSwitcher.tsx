import type React from 'react'

type Framework = 'react' | 'vue'

const FRAMEWORKS: { id: Framework; label: string; href: string; ready: boolean }[] = [
  { id: 'react', label: 'React', href: '/', ready: true },
  { id: 'vue', label: 'Vue', href: '/vue/', ready: true },
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
        border: '1px solid var(--sg-color-border)',
        background: 'transparent',
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
                color: 'var(--sg-color-text-tertiary)',
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
              color: isActive ? 'var(--sg-color-text)' : 'var(--sg-color-text-secondary)',
              background: isActive ? 'var(--sg-color-bg-hover)' : 'transparent',
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
