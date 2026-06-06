import { List } from '@skygraph/react'
import { shortData } from './data'

/**
 * `classNames` + `styles` let you target stable DOM slots
 * (root / header / footer / items / item / empty / pagination)
 * without writing deep descendant selectors.
 */
export function SlotsList() {
  return (
    <div>
      <style>{`
        .demo-list-root {
          border-color: color-mix(in srgb, var(--sg-color-primary) 35%, var(--sg-color-border));
        }
        .demo-list-header {
          background: var(--sg-color-primary-bg);
          color: var(--sg-color-primary);
        }
        .demo-list-item { transition: transform 160ms ease; }
        .demo-list-item:hover { transform: translateX(4px); }
      `}</style>
      <List
        bordered
        dataSource={shortData}
        header="Header (themed via slots)"
        footer="Footer"
        classNames={{
          root: 'demo-list-root',
          header: 'demo-list-header',
          item: 'demo-list-item',
        }}
        styles={{
          header: { fontWeight: 700 },
          item: { borderRadius: 10 },
        }}
        renderItem={(item, index) => (
          <div style={{ padding: '8px 0' }}>
            {index + 1}. {item}
          </div>
        )}
      />
    </div>
  )
}
