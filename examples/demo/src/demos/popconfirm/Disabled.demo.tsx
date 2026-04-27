import { useState } from 'react'
import { Popconfirm, Switch, Button } from '@skygraph/react'

/**
 * With `disabled`, the Popconfirm becomes a pass-through — the
 * trigger's own onClick fires instead of opening the bubble. Useful
 * for destructive actions that should skip the confirmation once the
 * user has opted into a "never ask again" flow.
 */
export function DisabledPopconfirm() {
  const [guarded, setGuarded] = useState(true)
  const [log, setLog] = useState<string[]>([])

  const pushLog = (line: string) => setLog((l) => [line, ...l].slice(0, 3))

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <label style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
        <Switch checked={guarded} onChange={setGuarded} />
        <span>Ask before deleting</span>
      </label>
      <Popconfirm
        disabled={!guarded}
        title="Delete this item?"
        onConfirm={() => pushLog('Confirmed via popconfirm')}
      >
        <Button onClick={() => !guarded && pushLog('Deleted directly')}>Delete</Button>
      </Popconfirm>
      <ul style={{ fontSize: 12, color: 'var(--sg-color-text-secondary)', margin: 0, paddingLeft: 16 }}>
        {log.map((l, i) => (<li key={i}>{l}</li>))}
      </ul>
    </div>
  )
}
