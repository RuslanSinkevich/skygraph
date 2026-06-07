import { useState } from 'react'
import { Drawer, Button } from '@skygraph/react'
import { useDemoStrings } from '../../i18n'
import { TokenScopeCards } from '../_shared/TokenScopeCards'

/**
 * Drawer composes `--sg-color-bg-elevated` for the panel, `--sg-color-overlay`
 * for the mask and `--sg-shadow-lg` for the lift. Three scoped recipes —
 * branded green, dark field, glass pick — rebrand the trigger and panel.
 */
const STRINGS = {
  en: {
    open: 'Open drawer',
    title: 'Scoped drawer',
    body: 'Panel, mask and shadow follow the scoped tokens.',
  },
  ru: { open: 'Открыть', title: 'Скоуп Drawer', body: 'Панель, маска и тень следуют за токенами.' },
} as const

function DrawerCard() {
  const t = useDemoStrings(STRINGS)
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        {t.open}
      </Button>
      <Drawer open={open} onClose={() => setOpen(false)} title={t.title}>
        <p>{t.body}</p>
      </Drawer>
    </>
  )
}

export function TokensOverrideDrawer() {
  return <TokenScopeCards render={() => <DrawerCard />} />
}
