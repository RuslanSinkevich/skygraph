import { useState } from 'react'
import { Button, Modal } from '@skygraph/react'

/**
 * Wrapping the Modal (and its trigger) in a token-scoped div re-skins
 * only that modal. Every `type="primary"` Button inside inherits the
 * same palette — no component prop changes needed.
 */
export function TokensOverrideModal() {
  const [open, setOpen] = useState(false)
  return (
    <div
      style={
        {
          '--sg-color-primary': '#7c3aed',
          '--sg-color-primary-hover': '#6d28d9',
          '--sg-color-primary-active': '#5b21b6',
          '--sg-color-primary-bg': '#f3e8ff',
          '--sg-border-radius-lg': '14px',
        } as React.CSSProperties
      }
    >
      <Button type="primary" onClick={() => setOpen(true)}>
        Open purple modal
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Scoped tokens"
        footer={
          <>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="primary" onClick={() => setOpen(false)}>
              Confirm
            </Button>
          </>
        }
      >
        <p>
          Inside this subtree, <code>--sg-color-primary</code> is purple and
          the dialog radius is 14px. The rest of the app stays blue.
        </p>
      </Modal>
    </div>
  )
}
