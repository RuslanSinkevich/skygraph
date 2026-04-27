import { RadioGroup } from '@skygraph/react'

/**
 * `disabled` on the group blocks every option. Disable individual options
 * via `options[].disabled`. `loading` renders an inline spinner next to
 * the group.
 */
export function DisabledStatesRadio() {
  return (
    <div style={{ display: 'grid', gap: 12 }}>
      <RadioGroup
        defaultValue="small"
        options={[
          { label: 'Small', value: 'small' },
          { label: 'Medium (sold out)', value: 'medium', disabled: true },
          { label: 'Large', value: 'large' },
        ]}
      />
      <RadioGroup
        disabled
        defaultValue="yes"
        options={[
          { label: 'Yes', value: 'yes' },
          { label: 'No', value: 'no' },
        ]}
      />
      <RadioGroup
        loading
        defaultValue="a"
        options={[
          { label: 'Option A', value: 'a' },
          { label: 'Option B', value: 'b' },
        ]}
      />
    </div>
  )
}
