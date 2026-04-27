import { TreeSelect } from '@skygraph/react'
import { orgTree } from './data'

/**
 * TreeSelect shares Input tokens for the control and uses
 * `--sg-color-primary` for the selected pills / focused row.
 */
export function TokensOverrideTreeSelect() {
  return (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
      <div
        style={
          {
            '--sg-color-primary': '#16a34a',
            '--sg-color-primary-bg': '#dcfce7',
            '--sg-color-primary-hover': '#15803d',
            width: 320,
          } as React.CSSProperties
        }
      >
        <TreeSelect
          treeData={orgTree}
          multiple
          treeDefaultExpandAll
          placeholder="Green branded"
          allowClear
        />
      </div>
      <div
        style={
          {
            '--sg-input-radius': '14px',
            '--sg-input-height': '44px',
            width: 320,
          } as React.CSSProperties
        }
      >
        <TreeSelect
          treeData={orgTree}
          treeDefaultExpandAll
          placeholder="Soft & tall"
          allowClear
        />
      </div>
    </div>
  )
}
