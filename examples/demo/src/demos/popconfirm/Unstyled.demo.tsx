import { Popconfirm, Button } from '@skygraph/react'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    title: 'Proceed?',
    okText: 'Yes',
    cancelText: 'No',
    button: 'Click me',
  },
  ru: {
    title: 'Продолжить?',
    okText: 'Да',
    cancelText: 'Нет',
    button: 'Нажмите',
  },
} as const

/**
 * `unstyled` removes every `sg-popconfirm-*` class and renders a
 * minimal alertdialog with native buttons. Focus trap, outside-click
 * handling, and ARIA wiring stay — the painting is yours.
 */
export function UnstyledPopconfirm() {
  const t = useDemoStrings(STRINGS)
  return (
    <Popconfirm unstyled title={t.title} okText={t.okText} cancelText={t.cancelText}>
      <Button>{t.button}</Button>
    </Popconfirm>
  )
}
