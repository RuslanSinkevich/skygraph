import { Button } from '@skygraph/react'

/**
 * Five visual variants. `primary` is the CTA, `default` sits next
 * to it for secondary actions, `dashed` suggests "add", `text`
 * and `link` are for inline / toolbar actions where a bordered
 * button would feel heavy.
 */
export function TypesButton() {
  return (
    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
      <Button>Default</Button>
      <Button type="primary">Primary</Button>
      <Button type="dashed">Dashed</Button>
      <Button type="text">Text</Button>
      <Button type="link">Link</Button>
    </div>
  )
}
