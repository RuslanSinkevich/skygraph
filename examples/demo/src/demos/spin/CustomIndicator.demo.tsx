import { Spin } from '@skygraph/react'

/**
 * `indicator` replaces the default ring entirely. Any ReactNode
 * works — emoji, SVG, or a library icon with its own spin keyframe.
 */
export function CustomIndicatorSpin() {
  return (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
      <Spin indicator={<span style={{ fontSize: 22 }} aria-hidden>⏳</span>} />
      <Spin indicator={<span style={{ fontSize: 22 }} aria-hidden>🌀</span>} />
      <Spin
        indicator={
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
            <circle cx="12" cy="12" r="10" stroke="#e5e7eb" strokeWidth="3" />
            <path
              d="M12 2a10 10 0 0110 10"
              stroke="#2563eb"
              strokeWidth="3"
              strokeLinecap="round"
              style={{ transformOrigin: 'center', animation: 'sg-spin-rotate 0.8s linear infinite' }}
            />
          </svg>
        }
      />
    </div>
  )
}
