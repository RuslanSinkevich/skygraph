import type { TimelineItem } from '@skygraph/react'

export const releaseItems: TimelineItem[] = [
  { children: 'Ship 1.0 — initial public release' },
  { children: 'Fix critical auth bug in hotfix 1.0.1' },
  { children: 'Roll out 1.1 with Tree + TreeSelect', color: 'green' },
  { children: 'Incident: degraded pagination perf', color: 'red' },
]

export const releaseLabels: TimelineItem[] = [
  { label: '2024-09-01', children: 'Ship 1.0' },
  { label: '2024-09-04', children: 'Hotfix 1.0.1' },
  { label: '2024-10-02', children: 'Release 1.1' },
  { label: '2024-10-03', children: 'Incident resolved' },
]
