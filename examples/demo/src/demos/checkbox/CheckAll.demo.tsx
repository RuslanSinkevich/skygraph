import { useMemo, useState } from 'react'
import { Checkbox } from '@skygraph/react'

const options = ['Apple', 'Pear', 'Orange', 'Banana', 'Mango']

/**
 * Classic "check all" pattern — a parent checkbox with indeterminate
 * state when only some children are selected. Uses a single array of
 * checked keys for the state.
 */
export function CheckAllCheckbox() {
  const [checked, setChecked] = useState<string[]>(['Apple'])

  const { allChecked, indeterminate } = useMemo(
    () => ({
      allChecked: checked.length === options.length,
      indeterminate: checked.length > 0 && checked.length < options.length,
    }),
    [checked],
  )

  return (
    <div style={{ display: 'grid', gap: 8 }}>
      <Checkbox
        checked={allChecked}
        indeterminate={indeterminate}
        onChange={(c) => setChecked(c ? options : [])}
      >
        <strong>Check all ({checked.length}/{options.length})</strong>
      </Checkbox>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4, paddingLeft: 20 }}>
        {options.map((opt) => (
          <Checkbox
            key={opt}
            checked={checked.includes(opt)}
            onChange={(c) =>
              setChecked((prev) => (c ? [...prev, opt] : prev.filter((x) => x !== opt)))
            }
          >
            {opt}
          </Checkbox>
        ))}
      </div>
    </div>
  )
}
