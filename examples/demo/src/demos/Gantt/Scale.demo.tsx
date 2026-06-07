import { useState } from 'react'
import { Gantt } from '@skygraph/react'
import type { GanttScale, GanttTask } from '@skygraph/react'
import { useDemoStrings, useI18n } from '../../i18n'

const TASKS = {
  en: [
    {
      id: 'q1',
      name: 'Q1 launch',
      start: Date.UTC(2026, 0, 1),
      end: Date.UTC(2026, 2, 31),
      progress: 0.4,
    },
    {
      id: 'q2',
      name: 'Q2 follow-up',
      start: Date.UTC(2026, 3, 1),
      end: Date.UTC(2026, 5, 30),
      dependencies: ['q1'],
    },
    {
      id: 'q3',
      name: 'Q3 audit',
      start: Date.UTC(2026, 6, 1),
      end: Date.UTC(2026, 8, 30),
      dependencies: ['q2'],
    },
  ],
  ru: [
    {
      id: 'q1',
      name: 'Запуск Q1',
      start: Date.UTC(2026, 0, 1),
      end: Date.UTC(2026, 2, 31),
      progress: 0.4,
    },
    {
      id: 'q2',
      name: 'Доработки Q2',
      start: Date.UTC(2026, 3, 1),
      end: Date.UTC(2026, 5, 30),
      dependencies: ['q1'],
    },
    {
      id: 'q3',
      name: 'Аудит Q3',
      start: Date.UTC(2026, 6, 1),
      end: Date.UTC(2026, 8, 30),
      dependencies: ['q2'],
    },
  ],
} as const satisfies Record<string, readonly GanttTask[]>

const SCALE_LABELS = {
  en: { day: 'Day', week: 'Week', month: 'Month', quarter: 'Quarter' },
  ru: { day: 'День', week: 'Неделя', month: 'Месяц', quarter: 'Квартал' },
} as const

/**
 * Switch the time-axis granularity at runtime. Bars stay anchored to their
 * dates — only the column width and the snap step (when dragging) change.
 */
export function ScaleGantt() {
  const [scale, setScale] = useState<GanttScale>('month')
  const { locale } = useI18n()
  const tasks = TASKS[locale] ?? TASKS.en
  const labels = useDemoStrings(SCALE_LABELS)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', gap: 8 }}>
        {(['day', 'week', 'month', 'quarter'] as const).map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setScale(s)}
            style={{
              padding: '4px 10px',
              borderRadius: 4,
              border: '1px solid var(--sg-color-border)',
              background: scale === s ? 'var(--sg-color-primary)' : 'var(--sg-color-bg-container)',
              color: scale === s ? 'var(--sg-color-white)' : 'var(--sg-color-text)',
              cursor: 'pointer',
            }}
          >
            {labels[s]}
          </button>
        ))}
      </div>
      <Gantt
        tasks={tasks}
        scale={scale}
        columnWidth={scale === 'day' ? 24 : 60}
        rowHeight={32}
        sidebarWidth={140}
      />
    </div>
  )
}
