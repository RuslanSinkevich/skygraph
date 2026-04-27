import { Timeline } from '@skygraph/react'
import { releaseItems } from './data'

/**
 * `unstyled` renders a plain `<ul>` with label / dot / content
 * nodes per item — no axis, no connector. Bring your own
 * CSS to rebuild the look.
 */
export function UnstyledTimeline() {
  return (
    <div>
      <style>{`
        .demo-raw-timeline { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 12px; }
        .demo-raw-timeline li { display: flex; align-items: center; gap: 12px; padding: 8px 12px; background: #f1f5f9; border-radius: 8px; }
        .demo-raw-timeline li > span:first-child { font-size: 18px; }
      `}</style>
      <Timeline unstyled className="demo-raw-timeline" items={releaseItems} />
    </div>
  )
}
