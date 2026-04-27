import { Cascader } from '@skygraph/react'
import { categoryOptions } from './data'

/**
 * `multiple` keeps each committed path as a removable tag; `maxTagCount`
 * collapses overflow into a "+N" summary. Uncontrolled for simplicity —
 * Cascader owns the tag list internally.
 */
export function MultipleCascader() {
  return (
    <div style={{ maxWidth: 420 }}>
      <Cascader
        options={categoryOptions}
        multiple
        maxTagCount={2}
        defaultValue={['frontend', 'react', 'hooks']}
        placeholder="Pick multiple stacks"
      />
    </div>
  )
}
