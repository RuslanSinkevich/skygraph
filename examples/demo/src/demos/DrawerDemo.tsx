import { useState } from 'react'
import { Button, Drawer } from '@skygraph/react'

export function DrawerDemo() {
  const [right, setRight] = useState(false)
  const [left, setLeft] = useState(false)
  const [bottom, setBottom] = useState(false)

  return (
    <section>
      <h2>Drawer</h2>
      <p style={{ color: 'var(--sg-color-text-secondary)', marginBottom: 16 }}>
        Slide-in panel from any edge. Supports title, footer, and mask.
      </p>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <Button type="primary" onClick={() => setRight(true)}>Open Right</Button>
        <Button onClick={() => setLeft(true)}>Open Left</Button>
        <Button onClick={() => setBottom(true)}>Open Bottom</Button>
      </div>

      <Drawer open={right} onClose={() => setRight(false)} title="Right Drawer">
        <p>Drawer content goes here.</p>
        <p style={{ color: 'var(--sg-color-text-secondary)' }}>Press Escape or click the mask to close.</p>
      </Drawer>

      <Drawer open={left} onClose={() => setLeft(false)} title="Left Drawer" placement="left">
        <p>Left side panel content.</p>
      </Drawer>

      <Drawer
        open={bottom}
        onClose={() => setBottom(false)}
        title="Bottom Drawer"
        placement="bottom"
        height={250}
        footer={
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
            <Button onClick={() => setBottom(false)}>Cancel</Button>
            <Button type="primary" onClick={() => setBottom(false)}>OK</Button>
          </div>
        }
      >
        <p>Bottom panel with footer actions.</p>
      </Drawer>
    </section>
  )
}
