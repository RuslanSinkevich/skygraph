import { Collapse } from '@skygraph/react'
import { sampleItems } from './data'

/**
 * `unstyled` strips every class but keeps the keyboard / aria
 * plumbing and the accordion logic. Pair it with your own CSS
 * (Tailwind, CSS modules, etc.) to ship any layout.
 */
export function UnstyledCollapse() {
  return (
    <div
      style={{
        fontFamily: 'monospace',
        fontSize: 13,
      }}
    >
      <style>{`
        .demo-unstyled button {
          background: none;
          border: none;
          padding: 8px 12px;
          width: 100%;
          text-align: left;
          cursor: pointer;
          border-top: 1px solid #e2e8f0;
        }
        .demo-unstyled button[aria-expanded="true"] {
          background: #eff6ff;
          color: #1d4ed8;
          font-weight: 600;
        }
        .demo-unstyled button:first-child { border-top: none; }
        .demo-unstyled > div > div { padding: 8px 12px; color: #475569; }
      `}</style>
      <div className="demo-unstyled">
        <Collapse unstyled items={sampleItems} defaultActiveKey={['1']} />
      </div>
    </div>
  )
}
