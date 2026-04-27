import { Button } from '@skygraph/react'

/**
 * `disabled` dims the button, sets `aria-disabled` and blocks
 * both click and keyboard activation. Each type has its own
 * disabled look — `text` / `link` keep their minimal chrome.
 */
export function DisabledButton() {
  return (
    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
      <Button disabled>Default</Button>
      <Button type="primary" disabled>Primary</Button>
      <Button type="dashed" disabled>Dashed</Button>
      <Button type="text" disabled>Text</Button>
      <Button type="link" disabled>Link</Button>
    </div>
  )
}
