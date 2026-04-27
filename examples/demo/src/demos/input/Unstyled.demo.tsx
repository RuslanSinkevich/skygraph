import { Input, Textarea } from '@skygraph/react'

/**
 * `unstyled` strips every SkyGraph class — you get a bare native
 * input/textarea with the semantics preserved. Drop in your own CSS
 * or Tailwind classes via `className`.
 */
export function UnstyledInput() {
  return (
    <div style={{ display: 'grid', gap: 8, maxWidth: 360 }}>
      <Input unstyled className="demo-unstyled-input" placeholder="Native input + custom class" />
      <Textarea
        unstyled
        className="demo-unstyled-input"
        placeholder="Native textarea + custom class"
        rows={3}
      />
    </div>
  )
}
