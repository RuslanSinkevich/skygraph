import { useState } from 'react'
import { Transfer, type TransferItem } from '../../../../packages/react/src/components/complex/Transfer'

const mkData = (n: number): TransferItem[] =>
  Array.from({ length: n }, (_, i) => ({
    key: `k-${i}`,
    title: `Option ${i + 1}`,
    description: i % 6 === 0 ? 'Has description' : undefined,
    disabled: i === 2 || i === 15,
  }))

const data20 = mkData(20)
const data40 = mkData(40)

export function TransferDemo() {
  const [targets, setTargets] = useState<string[]>(['k-0', 'k-5'])
  const [oneWayTargets, setOneWayTargets] = useState<string[]>(['k-1'])
  const [pageTargets, setPageTargets] = useState<string[]>([])
  const [frozenTargets, setFrozenTargets] = useState<string[]>(['k-3'])
  const [renderTargets, setRenderTargets] = useState<string[]>(['k-0', 'k-1'])

  return (
    <section style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      <h2>Transfer</h2>

      <section>
        <h3>Basic</h3>
        <Transfer
          dataSource={data20}
          targetKeys={targets}
          onChange={(next) => setTargets(next)}
          titles={['Available', 'Chosen']}
        />
      </section>

      <section>
        <h3>With search</h3>
        <Transfer
          showSearch
          searchPlaceholder="Filter…"
          dataSource={data20}
          targetKeys={targets}
          onChange={(next) => setTargets(next)}
          filterOption={(input, item) =>
            item.title.toLowerCase().includes(input.toLowerCase())
          }
        />
      </section>

      <section>
        <h3>One-way</h3>
        <Transfer
          oneWay
          dataSource={data20}
          targetKeys={oneWayTargets}
          onChange={(next) => setOneWayTargets(next)}
          titles={['Pool', 'Assigned']}
        />
      </section>

      <section>
        <h3>Disabled items (in data) + pagination</h3>
        <Transfer
          dataSource={data40}
          targetKeys={pageTargets}
          onChange={(next) => setPageTargets(next)}
          pagination={{ pageSize: 6 }}
          titles={['Source', 'Target']}
        />
      </section>

      <section>
        <h3>Entire control disabled</h3>
        <Transfer
          disabled
          dataSource={data20}
          targetKeys={frozenTargets}
          onChange={(next) => setFrozenTargets(next)}
          titles={['Locked source', 'Locked target']}
        />
      </section>

      <section>
        <h3>Custom item render</h3>
        <Transfer
          dataSource={data20.slice(0, 8)}
          targetKeys={renderTargets}
          onChange={(next) => setRenderTargets(next)}
          render={(item) => (
            <span>
              <strong>{item.title}</strong>
              {item.description ? <span style={{ opacity: 0.65 }}> — {item.description}</span> : null}
            </span>
          )}
        />
      </section>
    </section>
  )
}
