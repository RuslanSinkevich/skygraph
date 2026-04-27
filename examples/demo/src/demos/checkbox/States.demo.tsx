import { Checkbox } from '@skygraph/react'

/**
 * Every visual state in one place — use this to verify styling overrides
 * cover all cases when theming.
 */
export function StatesCheckbox() {
  return (
    <div style={{ display: 'grid', gap: 8 }}>
      <Checkbox>Unchecked</Checkbox>
      <Checkbox defaultChecked>Checked</Checkbox>
      <Checkbox indeterminate>Indeterminate</Checkbox>
      <Checkbox disabled>Disabled</Checkbox>
      <Checkbox disabled defaultChecked>Disabled + checked</Checkbox>
      <Checkbox loading>Loading</Checkbox>
    </div>
  )
}
