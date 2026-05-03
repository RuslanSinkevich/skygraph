import { Tooltip, Button } from '@skygraph/react'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    title: 'Prompt text',
    button: 'Hover me',
  },
  ru: {
    title: 'Подсказка',
    button: 'Наведите курсор',
  },
} as const

/**
 * The simplest Tooltip. Hover the child to reveal; leave to hide.
 * `aria-describedby` is wired up automatically so screen readers
 * read the tip once the child is focused.
 */
export function BasicTooltip() {
  const t = useDemoStrings(STRINGS)
  return (
    <Tooltip title={t.title}>
      <Button>{t.button}</Button>
    </Tooltip>
  )
}
