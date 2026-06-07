import { useState, type ReactNode } from 'react'

/**
 * Shared floating-label wrapper used by every input-bearing component
 * (Input, Select, AutoComplete, DatePicker, Cascader, TreeSelect,
 * ColorPicker, InputNumber, TimePicker…).
 *
 * The label sits over the control and glides to the top-left when the field
 * gains focus or holds a value. Focus is tracked from the bubbling React
 * `focus` / `blur` events, so it works regardless of the inner DOM (real
 * `<input>` vs. a `<div role="combobox">` trigger). `filled` is supplied by
 * the demo from its controlled value.
 *
 * Render `<FloatingFieldStyles />` once per demo, then wrap each control in
 * `<FloatingField>`.
 */
const SHEET = `
.demo-ff {
  position: relative;
  width: 100%;
}
.demo-ff-label {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 14px;
  line-height: 1;
  color: var(--sg-color-text-secondary);
  pointer-events: none;
  padding: 0 4px;
  background: transparent;
  transition:
    top 180ms cubic-bezier(0.4, 0, 0.2, 1),
    transform 180ms cubic-bezier(0.4, 0, 0.2, 1),
    color 180ms ease;
  white-space: nowrap;
  z-index: 2;
}
.demo-ff[data-floated='true'] .demo-ff-label {
  top: 0;
  transform: translateY(-50%) scale(0.85);
  transform-origin: left center;
  color: var(--sg-color-primary);
  background: var(--sg-color-bg-container, #ffffff);
}
`

export function FloatingFieldStyles() {
  return <style>{SHEET}</style>
}

export function FloatingField({
  label,
  filled,
  children,
}: {
  label: string
  filled?: boolean
  children: ReactNode
}) {
  const [focused, setFocused] = useState(false)
  return (
    <div
      className="demo-ff"
      data-floated={focused || filled ? 'true' : undefined}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    >
      {children}
      <label className="demo-ff-label">{label}</label>
    </div>
  )
}
