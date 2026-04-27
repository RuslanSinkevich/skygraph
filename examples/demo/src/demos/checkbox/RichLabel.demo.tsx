import { Checkbox } from '@skygraph/react'

/**
 * `children` is a ReactNode — embed rich labels with descriptions, links,
 * or badges. Keep the touch target tight by wrapping extra text inside
 * the same element.
 */
export function RichLabelCheckbox() {
  return (
    <div style={{ display: 'grid', gap: 12 }}>
      <Checkbox defaultChecked>
        <div>
          <div>Enable two-factor authentication</div>
          <div style={{ fontSize: 12, color: 'var(--sg-color-text-tertiary)' }}>
            Adds a second step after password — recommended for admins.
          </div>
        </div>
      </Checkbox>

      <Checkbox>
        <span>
          I accept the <a href="#terms" onClick={(e) => e.preventDefault()}>Terms of Service</a>{' '}
          and <a href="#privacy" onClick={(e) => e.preventDefault()}>Privacy Policy</a>
        </span>
      </Checkbox>
    </div>
  )
}
