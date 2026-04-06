import { Descriptions } from '../../../../packages/react/src/components/ui/Descriptions'

const sampleItems = [
  { key: 'name', label: 'Product', children: 'Skygraph UI Kit' },
  { key: 'sku', label: 'SKU', children: 'SG-2048-A' },
  { key: 'price', label: 'Price', children: '$49.00' },
  { key: 'owner', label: 'Owner', children: 'Design Systems' },
  { key: 'tags', label: 'Tags', children: 'react, typescript, a11y' },
]

export function DescriptionsDemo() {
  return (
    <section style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      <h2>Descriptions</h2>

      <section>
        <h3>Basic</h3>
        <Descriptions title="Product details" column={3} items={sampleItems} />
      </section>

      <section>
        <h3>Bordered</h3>
        <Descriptions bordered title="Bordered table" column={2} items={sampleItems} />
      </section>

      <section>
        <h3>Vertical layout</h3>
        <Descriptions
          layout="vertical"
          column={2}
          items={[
            { key: 'a', label: 'API', children: 'REST + WebSocket' },
            { key: 'b', label: 'Auth', children: 'OAuth2 / API keys' },
            { key: 'c', label: 'SLA', children: '99.9% monthly' },
            { key: 'd', label: 'Region', children: 'EU (Frankfurt)' },
          ]}
        />
      </section>

      <section>
        <h3>Sizes</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Descriptions size="small" title="Small" column={3} items={sampleItems.slice(0, 3)} />
          <Descriptions size="middle" title="Middle" column={3} items={sampleItems.slice(0, 3)} />
          <Descriptions size="default" title="Default" column={3} items={sampleItems.slice(0, 3)} />
        </div>
      </section>

      <section>
        <h3>Multi-span</h3>
        <Descriptions
          bordered
          column={3}
          items={[
            { key: 't', label: 'Title', children: 'Quarterly roadmap', span: 3 },
            { key: 'o', label: 'Owner', children: 'Platform' },
            { key: 's', label: 'Status', children: 'In progress' },
            { key: 'n', label: 'Notes', children: 'Spans two columns.', span: 2 },
          ]}
        />
      </section>

      <section>
        <h3>Without colon</h3>
        <Descriptions
          colon={false}
          column={2}
          title="Labels without punctuation"
          items={[
            { key: 'c1', label: 'Hostname', children: 'edge-01.local' },
            { key: 'c2', label: 'Uptime', children: '14d 4h' },
          ]}
        />
      </section>

      <section>
        <h3>Single column dense</h3>
        <Descriptions size="small" bordered column={1} items={sampleItems.slice(0, 4)} />
      </section>

      <section>
        <h3>Mixed content</h3>
        <Descriptions
          column={2}
          items={[
            { key: 'x', label: 'Status', children: <span style={{ color: 'var(--sg-color-success)' }}>Healthy</span> },
            { key: 'y', label: 'Queue depth', children: <code>12 jobs</code> },
            { key: 'z', label: 'Owner', children: 'Team Omega' },
            { key: 'w', label: 'Link', children: <a href="#demo">View runbook</a> },
          ]}
        />
      </section>
    </section>
  )
}
