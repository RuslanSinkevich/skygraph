import { Popconfirm, Button } from '@skygraph/react'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    title: 'Delete the task',
    description: 'This action cannot be undone.',
    okText: 'Delete',
    cancelText: 'Keep',
    button: 'Delete task',
  },
  ru: {
    title: 'Удалить задачу',
    description: 'Действие нельзя отменить.',
    okText: 'Удалить',
    cancelText: 'Оставить',
    button: 'Удалить задачу',
  },
} as const

/**
 * Adds a second line under the title. The title gets the ⚠ icon and
 * bold weight; the description lines up beside it in secondary text.
 */
export function WithDescriptionPopconfirm() {
  const t = useDemoStrings(STRINGS)
  return (
    <Popconfirm
      title={t.title}
      description={t.description}
      okText={t.okText}
      cancelText={t.cancelText}
    >
      <Button
        type="primary"
        style={{
          background: 'var(--sg-color-error)',
          borderColor: 'var(--sg-color-error)',
        }}
      >
        {t.button}
      </Button>
    </Popconfirm>
  )
}
