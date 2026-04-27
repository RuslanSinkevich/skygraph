import { Result, Button } from '@skygraph/react'

/**
 * `unstyled` keeps the semantic structure and `aria-live` but drops
 * every SkyGraph class. The preset `icon` still resolves from the
 * `status`, so you get the SVG without the chrome.
 */
export function UnstyledResult() {
  return (
    <Result
      unstyled
      status="success"
      title="Saved"
      subTitle="Your changes were persisted."
      style={{
        display: 'grid',
        justifyItems: 'center',
        padding: 24,
        gap: 8,
        background: '#ecfdf5',
        border: '1px solid #a7f3d0',
        borderRadius: 12,
        color: '#065f46',
      }}
      extra={<Button type="primary">OK</Button>}
    />
  )
}
