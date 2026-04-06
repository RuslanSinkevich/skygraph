import { useState } from 'react'
import { List } from '../../../../packages/react/src/components/complex/List'
import { Avatar } from '../../../../packages/react/src/components/ui/Avatar'
import { Button } from '../../../../packages/react/src/components/ui/Button'

type Row = { id: string; title: string; desc: string; avatar: string }

const longData: Row[] = Array.from({ length: 28 }, (_, i) => ({
  id: String(i + 1),
  title: `User ${i + 1}`,
  desc: i % 5 === 0 ? 'Pro account · 2FA enabled' : 'Standard account',
  avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`,
}))

export function ListDemo() {
  const [page, setPage] = useState(1)
  const pageSize = 5
  const slice = longData.slice((page - 1) * pageSize, page * pageSize)

  return (
    <section style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      <h2>List</h2>

      <section>
        <h3>Basic</h3>
        <List
          bordered
          dataSource={[
            { id: '1', text: 'First row' },
            { id: '2', text: 'Second row' },
          ]}
          renderItem={(item) => (
            <List.Item>
              {item.text}
            </List.Item>
          )}
        />
      </section>

      <section>
        <h3>With avatar &amp; meta</h3>
        <List
          dataSource={slice}
          renderItem={(item) => (
            <List.Item
              actions={[
                <Button key="m" type="link" size="small">
                  Message
                </Button>,
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar src={item.avatar} size={40} />}
                title={item.title}
                description={item.desc}
              />
            </List.Item>
          )}
          pagination={{
            current: page,
            pageSize,
            total: longData.length,
            onChange: (p) => setPage(p),
          }}
        />
      </section>

      <section>
        <h3>Grid</h3>
        <List
          grid={{ gutter: 12, column: 3 }}
          dataSource={[
            { id: 'g1', t: 'Card A' },
            { id: 'g2', t: 'Card B' },
            { id: 'g3', t: 'Card C' },
            { id: 'g4', t: 'Card D' },
          ]}
          renderItem={(item) => (
            <List.Item>
              <div
                style={{
                  border: '1px solid var(--sg-color-border-secondary)',
                  borderRadius: 8,
                  padding: 12,
                  background: 'var(--sg-color-fill-quaternary)',
                }}
              >
                {item.t}
              </div>
            </List.Item>
          )}
        />
      </section>

      <section>
        <h3>Loading</h3>
        <List
          loading
          dataSource={[]}
          renderItem={() => null}
        />
      </section>
    </section>
  )
}
