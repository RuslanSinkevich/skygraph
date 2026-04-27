import { Descriptions } from '@skygraph/react'
import { userItems } from './data'

/**
 * `unstyled` drops every class and renders a bare `<table>` —
 * labels in `<th>`, values in `<td>`. Perfect starting point
 * for custom theming.
 */
export function UnstyledDescriptions() {
  return (
    <div>
      <style>{`
        .demo-raw-desc { font-family: system-ui, sans-serif; }
        .demo-raw-desc > div:first-child { font-weight: 700; margin-bottom: 10px; }
        .demo-raw-desc table { border-collapse: collapse; width: 100%; }
        .demo-raw-desc th { text-align: left; padding: 6px 12px 6px 0; color: #475569; font-weight: 500; }
        .demo-raw-desc td { padding: 6px 0; }
      `}</style>
      <Descriptions
        unstyled
        className="demo-raw-desc"
        title="Raw descriptions"
        items={userItems}
      />
    </div>
  )
}
