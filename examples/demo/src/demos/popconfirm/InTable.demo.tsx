import { useState } from 'react'
import { Popconfirm, Button } from '@skygraph/react'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    task1: 'Launch checklist',
    task2: 'Design review',
    task3: 'Q4 postmortem',
    colTask: 'Task',
    confirmTitle: 'Delete',
    confirmDesc: 'This cannot be undone.',
    okText: 'Delete',
    button: 'Delete',
    allDeleted: 'All tasks deleted.',
    reset: 'Reset',
  },
  ru: {
    task1: 'Чек-лист запуска',
    task2: 'Дизайн-ревью',
    task3: 'Постмортем Q4',
    colTask: 'Задача',
    confirmTitle: 'Удалить',
    confirmDesc: 'Действие нельзя отменить.',
    okText: 'Удалить',
    button: 'Удалить',
    allDeleted: 'Все задачи удалены.',
    reset: 'Сбросить',
  },
} as const

/**
 * Canonical pattern: row-level "Delete" buttons wrapped in Popconfirm
 * so the user doesn't wipe data by accident. Use `placement="left"`
 * so the bubble opens into the table body instead of clipping.
 */
type Row = { id: number; name: string }

export function InTablePopconfirm() {
  const t = useDemoStrings(STRINGS)
  const initialRows: Row[] = [
    { id: 1, name: t.task1 },
    { id: 2, name: t.task2 },
    { id: 3, name: t.task3 },
  ]
  const [rows, setRows] = useState<Row[]>(initialRows)

  return (
    <table style={{ borderCollapse: 'collapse', fontSize: 14 }}>
      <thead>
        <tr>
          <th style={{ textAlign: 'left', padding: '6px 12px' }}>{t.colTask}</th>
          <th style={{ padding: '6px 12px' }}></th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.id} style={{ borderTop: '1px solid var(--sg-color-border)' }}>
            <td style={{ padding: '6px 12px' }}>{row.name}</td>
            <td style={{ padding: '6px 12px' }}>
              <Popconfirm
                title={`${t.confirmTitle} "${row.name}"?`}
                description={t.confirmDesc}
                okText={t.okText}
                placement="left"
                onConfirm={() => setRows((r) => r.filter((x) => x.id !== row.id))}
              >
                <Button size="small">{t.button}</Button>
              </Popconfirm>
            </td>
          </tr>
        ))}
        {rows.length === 0 && (
          <tr>
            <td colSpan={2} style={{ padding: '12px', color: 'var(--sg-color-text-secondary)' }}>
              {t.allDeleted}{' '}
              <Button size="small" onClick={() => setRows(initialRows)}>{t.reset}</Button>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  )
}
