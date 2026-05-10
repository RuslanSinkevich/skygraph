import type { TimelineItem } from '@skygraph/vue'

/**
 * Shared sample data used by Basic / Reverse / RightMode /
 * TokensOverride / Unstyled demos. Mirrors the React
 * `examples/demo/src/demos/timeline/data.ts` (Vue uses
 * `content` instead of React's `children`).
 */
export const releaseItems: TimelineItem[] = [
  { content: 'Ship 1.0 — initial public release' },
  { content: 'Fix critical auth bug in hotfix 1.0.1' },
  { content: 'Roll out 1.1 with Tree + TreeSelect', color: 'green' },
  { content: 'Incident: degraded pagination perf', color: 'red' },
]

export const releaseLabels: TimelineItem[] = [
  { label: '2024-09-01', content: 'Ship 1.0' },
  { label: '2024-09-04', content: 'Hotfix 1.0.1' },
  { label: '2024-10-02', content: 'Release 1.1' },
  { label: '2024-10-03', content: 'Incident resolved' },
]
