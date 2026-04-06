import { useState } from 'react'
import { Checkbox } from '@skygraph/react'

export function CheckboxDemo() {
  const [checked, setChecked] = useState(false)

  return (
    <section>
      <h2>Checkbox</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <Checkbox checked={checked} onChange={setChecked}>Accept terms</Checkbox>
        <Checkbox defaultChecked>Default checked</Checkbox>
        <Checkbox disabled>Disabled</Checkbox>
        <Checkbox indeterminate>Indeterminate</Checkbox>
        <Checkbox loading>Loading option</Checkbox>
        <Checkbox loading>Another loading</Checkbox>
      </div>
    </section>
  )
}
