import { AutoComplete } from '@skygraph/react'
import { frameworkOptions } from './data'

/**
 * Three sizes mirror Input / Select. Line them up in the same row and
 * the heights, paddings and font sizes align.
 */
export function SizesAutoComplete() {
  return (
    <div style={{ display: 'grid', gap: 8, maxWidth: 320 }}>
      <AutoComplete size="small" options={frameworkOptions} placeholder="small" />
      <AutoComplete options={frameworkOptions} placeholder="middle (default)" />
      <AutoComplete size="large" options={frameworkOptions} placeholder="large" />
    </div>
  )
}
