import { useState, useEffect } from 'react'
import { Spin, Button } from '@skygraph/react'

/**
 * `fullscreen` stretches Spin across the viewport with a dimmed
 * backdrop at `--sg-z-modal`. Use sparingly — for page-level
 * gates like initial hydration or route transitions.
 */
export function FullscreenSpin() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const timer = setTimeout(() => setOpen(false), 1500)
    return () => clearTimeout(timer)
  }, [open])

  return (
    <div>
      <Button type="primary" onClick={() => setOpen(true)}>
        Show fullscreen spinner (1.5s)
      </Button>
      {open && <Spin fullscreen tip="Deploying..." />}
    </div>
  )
}
