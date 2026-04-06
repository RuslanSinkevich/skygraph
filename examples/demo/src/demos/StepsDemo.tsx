import { useState } from 'react'
import { Steps } from '../../../../packages/react/src/components/ui/Steps'

const items = [
  { title: 'Cart', description: 'Review items' },
  { title: 'Shipping', description: 'Address & method' },
  { title: 'Payment', description: 'Card details' },
  { title: 'Confirm', description: 'Place order' },
]

const navItems = [
  { title: 'Step 1' },
  { title: 'Step 2' },
  { title: 'Step 3' },
]

export function StepsDemo() {
  const [current, setCurrent] = useState(1)
  const [clickCurrent, setClickCurrent] = useState(0)

  return (
    <section style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      <h2>Steps</h2>

      <section>
        <h3>Horizontal (default)</h3>
        <Steps current={1} items={items} />
      </section>

      <section>
        <h3>Vertical</h3>
        <div style={{ maxWidth: 420 }}>
          <Steps direction="vertical" current={2} items={items} />
        </div>
      </section>

      <section>
        <h3>Small size</h3>
        <Steps size="small" current={0} items={navItems} />
      </section>

      <section>
        <h3>Navigation type</h3>
        <Steps type="navigation" current={1} items={navItems} />
      </section>

      <section>
        <h3>Clickable (onChange)</h3>
        <Steps current={clickCurrent} items={items} onChange={setClickCurrent} />
        <p style={{ marginTop: 8, fontSize: 12, opacity: 0.75 }}>Active index: {clickCurrent}</p>
      </section>

      <section>
        <h3>Error status on a step</h3>
        <Steps
          current={2}
          items={[
            { title: 'Done', status: 'finish' },
            { title: 'Validate', status: 'error', description: 'Invalid tax ID' },
            { title: 'Publish', status: 'wait' },
          ]}
        />
      </section>

      <section>
        <h3>Controlled horizontal</h3>
        <Steps current={current} items={items} onChange={setCurrent} />
        <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
          <button type="button" onClick={() => setCurrent((c) => Math.max(0, c - 1))}>
            Prev
          </button>
          <button type="button" onClick={() => setCurrent((c) => Math.min(items.length - 1, c + 1))}>
            Next
          </button>
        </div>
      </section>

      <section>
        <h3>Descriptions on vertical steps</h3>
        <div style={{ maxWidth: 440 }}>
          <Steps
            direction="vertical"
            current={2}
            items={[
              { title: 'Upload', description: 'Files received' },
              { title: 'Scan', description: 'No threats found' },
              { title: 'Sign', description: 'Awaiting signature' },
              { title: 'Archive', description: 'Pending' },
            ]}
          />
        </div>
      </section>
    </section>
  )
}
