import { Empty, Button } from '@skygraph/react'

/**
 * `unstyled` drops every SkyGraph class and keeps only the
 * semantic structure: a wrapper with `role="status"`, the image
 * slot, the paragraph, and your children.
 */
export function UnstyledEmpty() {
  return (
    <Empty
      unstyled
      className="demo-empty"
      style={{ display: 'grid', placeItems: 'center', padding: 24, gap: 12 }}
      image={<span style={{ fontSize: 48 }}>🗂️</span>}
      description={<strong>Your own paint job</strong>}
    >
      <Button type="primary">Action</Button>
    </Empty>
  )
}
