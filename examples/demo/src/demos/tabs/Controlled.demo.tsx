import { useState } from 'react'
import { Tabs, Button } from '@skygraph/react'

/**
 * Controlled `activeKey` lets you drive Tabs from elsewhere — a deep
 * link, a wizard "Next" button, a keyboard shortcut, etc.
 */
export function ControlledTabs() {
  const [key, setKey] = useState('step-1')
  return (
    <div style={{ width: '100%' }}>
      <div
        style={{
          display: 'flex',
          gap: 8,
          marginBottom: 12,
        }}
      >
        <Button onClick={() => setKey('step-1')} size="small">Jump to 1</Button>
        <Button onClick={() => setKey('step-2')} size="small">Jump to 2</Button>
        <Button onClick={() => setKey('step-3')} size="small">Jump to 3</Button>
      </div>
      <Tabs
        activeKey={key}
        onChange={setKey}
        items={[
          { key: 'step-1', label: 'Step 1', children: <p>Step 1 content</p> },
          { key: 'step-2', label: 'Step 2', children: <p>Step 2 content</p> },
          { key: 'step-3', label: 'Step 3', children: <p>Step 3 content</p> },
        ]}
      />
    </div>
  )
}
