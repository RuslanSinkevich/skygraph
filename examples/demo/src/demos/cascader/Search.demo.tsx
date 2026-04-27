import { Cascader } from '@skygraph/react'
import { regionOptions } from './data'

/**
 * `showSearch` turns the trigger into a search field. Type any token and
 * matching full paths (not single nodes) are offered. You can pass a custom
 * filter to change the match rules.
 */
export function SearchCascader() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 340 }}>
      <Cascader options={regionOptions} showSearch placeholder="Type a city or district" />
      <Cascader
        options={regionOptions}
        showSearch={{
          filter: (input, path) =>
            path.some((o) => String(o.label).toLowerCase().startsWith(input.toLowerCase())),
        }}
        placeholder="Custom filter: starts-with match"
      />
    </div>
  )
}
