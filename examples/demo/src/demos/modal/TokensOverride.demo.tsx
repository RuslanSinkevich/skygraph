import { useState } from 'react'
import { Button, Modal } from '@skygraph/react'
import { useDemoStrings } from '../../i18n'
import { TokenScopeCards } from '../_shared/TokenScopeCards'

/**
 * Scoping tokens on the wrapper reskins the trigger and the dialog it opens —
 * every `type="primary"` button inherits the scoped palette. Three recipes —
 * branded green, dark field, glass pick.
 */
const STRINGS = {
  en: {
    open: 'Open modal',
    title: 'Scoped tokens',
    body: 'Primary palette is scoped here.',
    cancel: 'Cancel',
    ok: 'Confirm',
  },
  ru: {
    open: 'Открыть',
    title: 'Скоуп токенов',
    body: 'Primary-палитра скоупится здесь.',
    cancel: 'Отмена',
    ok: 'Ок',
  },
} as const

function ModalCard() {
  const t = useDemoStrings(STRINGS)
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        {t.open}
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={t.title}
        footer={
          <>
            <Button onClick={() => setOpen(false)}>{t.cancel}</Button>
            <Button type="primary" onClick={() => setOpen(false)}>
              {t.ok}
            </Button>
          </>
        }
      >
        <p>{t.body}</p>
      </Modal>
    </>
  )
}

export function TokensOverrideModal() {
  return <TokenScopeCards render={() => <ModalCard />} />
}
