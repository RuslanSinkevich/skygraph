import { useState } from 'react'
import { Cascader } from '@skygraph/react'
import type { CascaderOption } from '@skygraph/react'

const seed: CascaderOption[] = [
  { value: 'dynamic-1', label: 'Dynamic Option 1', isLeaf: false },
  { value: 'dynamic-2', label: 'Dynamic Option 2', isLeaf: false },
]

/**
 * Mark a node `isLeaf: false` to advertise expandable children and hand
 * loading to `loadData`. This demo fakes a network round-trip with a
 * timeout and populates `children` on the selected option.
 */
export function AsyncLoadCascader() {
  const [options, setOptions] = useState<CascaderOption[]>(seed)

  const loadData = (selected: CascaderOption[]) => {
    const target = selected[selected.length - 1]
    setTimeout(() => {
      target.children = [
        { value: `${target.value}-child-1`, label: `${target.label} → child 1` },
        { value: `${target.value}-child-2`, label: `${target.label} → child 2`, isLeaf: true },
      ]
      setOptions((prev) => [...prev])
    }, 700)
  }

  return (
    <div style={{ maxWidth: 340 }}>
      <Cascader options={options} loadData={loadData} placeholder="Open to load children" />
    </div>
  )
}
