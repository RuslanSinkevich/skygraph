import { Steps } from '@skygraph/react'
import { basicSteps } from './data'

/**
 * `unstyled` renders a plain list with `data-status` on each
 * row. Everything else — structure, click behaviour — stays.
 */
export function UnstyledSteps() {
  return (
    <div>
      <style>{`
        .demo-raw-steps { display: flex; flex-direction: column; gap: 10px; }
        .demo-raw-steps > div { display: flex; gap: 10px; align-items: center; padding: 8px 12px; border-radius: 8px; background: #f8fafc; }
        .demo-raw-steps > div[data-status="finish"] { background: #dcfce7; color: #14532d; }
        .demo-raw-steps > div[data-status="process"] { background: #dbeafe; color: #1e3a8a; font-weight: 600; }
        .demo-raw-steps > div[data-status="error"] { background: #fee2e2; color: #7f1d1d; }
      `}</style>
      <Steps unstyled className="demo-raw-steps" current={1} items={basicSteps} />
    </div>
  )
}
