import { useState } from 'react'
import { Drawer, Button } from '@skygraph/react'

/**
 * `width` and `height` accept any CSS length — a number is treated as
 * px. Use percentages for fully responsive drawers on mobile.
 */
export function SizesDrawer() {
  const [size, setSize] = useState<null | 'narrow' | 'wide' | 'full'>(null)

  const config = {
    narrow: { width: 280, label: 'Narrow (280px)' },
    wide: { width: 640, label: 'Wide (640px)' },
    full: { width: '90%', label: 'Responsive (90%)' },
  } as const

  return (
    <>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <Button onClick={() => setSize('narrow')}>Narrow</Button>
        <Button onClick={() => setSize('wide')}>Wide</Button>
        <Button onClick={() => setSize('full')}>Responsive</Button>
      </div>
      <Drawer
        open={size !== null}
        onClose={() => setSize(null)}
        title={size ? config[size].label : ''}
        width={size ? config[size].width : undefined}
      >
        <p>Change `width` to any CSS length — px, %, vw all work.</p>
      </Drawer>
    </>
  )
}
