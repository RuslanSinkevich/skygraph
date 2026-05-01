import { useState } from 'react'
import { Button, Modal } from '@skygraph/react'

/**
 * Default OK / Cancel footer driven by `onOk`, `okText`, `cancelText`, and
 * `confirmLoading`. Pair it with `ConfigProvider locale={ru_RU}` to translate
 * the buttons without touching props.
 */
export function DefaultFooterModal() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleOk = async () => {
    setLoading(true)
    await new Promise((r) => setTimeout(r, 700))
    setLoading(false)
    setOpen(false)
  }

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        Open modal
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Save changes?"
        onOk={handleOk}
        confirmLoading={loading}
      >
        <p>
          Footer buttons are rendered automatically because <code>onOk</code> is
          set and <code>footer</code> is omitted. Override labels with
          <code> okText</code> / <code>cancelText</code> or globally via
          <code> ConfigProvider.locale.modal</code>.
        </p>
      </Modal>
    </>
  )
}
