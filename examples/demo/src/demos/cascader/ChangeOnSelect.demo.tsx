import { Cascader } from '@skygraph/react'
import { categoryOptions } from './data'

/**
 * By default Cascader commits only when a leaf is reached. `changeOnSelect`
 * emits every intermediate path — useful for taxonomies where parents are
 * valid selections (e.g. "Frontend" alone is meaningful).
 */
export function ChangeOnSelectCascader() {
  return (
    <div style={{ maxWidth: 340 }}>
      <Cascader
        options={categoryOptions}
        changeOnSelect
        placeholder="Pick any level"
      />
    </div>
  )
}
