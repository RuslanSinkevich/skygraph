import { useState } from 'react'
import { Gantt } from '@skygraph/react'
import type { GanttScale, GanttTask } from '@skygraph/react'

const tasks: GanttTask[] = [
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
]

/**
 * Switch the time-axis granularity at runtime. Bars stay anchored to their
 * dates — only the column width and the snap step (when dragging) change.
 */
export function ScaleGantt() {
  const [scale, setScale] = useState<GanttScale>('month')
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
              border: '1px solid #d9d9d9',
              background: scale === s ? '#1677ff' : '#fff',
              color: scale === s ? '#fff' : '#262626',
              cursor: 'pointer',
            }}
          >
            {s}
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
