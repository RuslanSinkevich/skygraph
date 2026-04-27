import { List } from '@skygraph/react'
import { shortData } from './data'

/**
 * `unstyled` strips every `sg-list-*` class — wrapper, items,
 * Spin, Empty. Rebuild the look with your own CSS while
 * keeping selection, pagination and drag-drop behaviour intact.
 */
export function UnstyledList() {
  return (
    <div>
      <style>{`
        .demo-raw-list { border: 2px dashed #a3a3a3; padding: 16px; border-radius: 12px; }
        .demo-raw-list > div { display: flex; flex-direction: column; gap: 8px; }
        .demo-raw-list > div > div { padding: 8px 10px; border-radius: 8px; background: #f5f5f5; }
        .demo-raw-list > div > div:hover { background: #e7e5e4; }
      `}</style>
      <List
        unstyled
        className="demo-raw-list"
        dataSource={shortData}
        renderItem={(item) => <div>{item}</div>}
      />
    </div>
  )
}
