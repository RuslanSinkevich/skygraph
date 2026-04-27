import { useState } from 'react'
import { Drawer, Button } from '@skygraph/react'

type Placement = 'left' | 'right' | 'top' | 'bottom'

/**
 * Horizontal placements (`left` / `right`) use `width`; vertical
 * placements (`top` / `bottom`) use `height`. The slide direction
 * matches the edge automatically.
 */
export function PlacementDrawer() {
  const [open, setOpen] = useState(false)
  const [placement, setPlacement] = useState<Placement>('right')

  return (
    <>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {(['left', 'right', 'top', 'bottom'] as const).map((p) => (
          <Button
            key={p}
            onClick={() => {
              setPlacement(p)
              setOpen(true)
            }}
          >
            {p}
          </Button>
        ))}
      </div>
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        title={`${placement} Drawer`}
        placement={placement}
      >
        <p>Sliding in from the <b>{placement}</b>.</p>
      </Drawer>
    </>
  )
}
