import { useState } from 'react'
import { Steps, Button } from '@skygraph/react'
import { basicSteps } from './data'

/**
 * Pass `onChange` to make steps clickable — each step becomes a
 * button and reports its index. Combine with Prev / Next buttons
 * for a complete wizard surface.
 */
export function ClickableSteps() {
  const [current, setCurrent] = useState(1)
  const last = basicSteps.length - 1

  return (
    <div>
      <Steps current={current} onChange={setCurrent} items={basicSteps} />
      <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
        <Button disabled={current <= 0} onClick={() => setCurrent((c) => c - 1)}>Previous</Button>
        <Button
          type="primary"
          disabled={current >= last}
          onClick={() => setCurrent((c) => c + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  )
}
