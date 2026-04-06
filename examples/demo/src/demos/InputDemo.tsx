import { useState } from 'react'
import { Input } from '@skygraph/react'

export function InputDemo() {
  const [value, setValue] = useState('')

  return (
    <section>
      <h2>Input</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 400 }}>
        <Input size="small" placeholder="Small input" />
        <Input placeholder="Default input" value={value} onChange={setValue} />
        <Input size="large" placeholder="Large input" />
        <Input disabled placeholder="Disabled" />
        <Input type="password" placeholder="Password" />

        <h3 style={{ marginTop: 8 }}>Loading state (Spin inside Input)</h3>
        <Input loading placeholder="Loading..." />
        <Input loading size="small" placeholder="Small loading" />
        <Input loading size="large" placeholder="Large loading" />
      </div>
    </section>
  )
}
