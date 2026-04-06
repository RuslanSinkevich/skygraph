import { useState } from 'react'
import { Collapse } from '../../../../packages/react/src/components/ui/Collapse'

const panelBody = (text: string) => <p style={{ margin: 0 }}>{text}</p>

export function CollapseDemo() {
  const [accordionKey, setAccordionKey] = useState<string[]>(['a'])

  return (
    <section style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <h2>Collapse</h2>

      <section>
        <h3>Basic (multiple panels)</h3>
        <Collapse
          defaultActiveKey={['1']}
          items={[
            { key: '1', label: 'Panel 1', children: panelBody('First panel content.') },
            { key: '2', label: 'Panel 2', children: panelBody('Second panel content.') },
            { key: '3', label: 'Panel 3', children: panelBody('Third panel content.') },
          ]}
        />
      </section>

      <section>
        <h3>Bordered (default)</h3>
        <Collapse
          bordered
          defaultActiveKey={['b1']}
          items={[
            { key: 'b1', label: 'Section A', children: panelBody('Bordered container (default styling).') },
            { key: 'b2', label: 'Section B', children: panelBody('Contrast with ghost variant below.') },
          ]}
        />
      </section>

      <section>
        <h3>Accordion (single open)</h3>
        <Collapse
          accordion
          activeKey={accordionKey}
          onChange={setAccordionKey}
          items={[
            { key: 'a', label: 'Alpha', children: panelBody('Only one section stays open.') },
            { key: 'b', label: 'Beta', children: panelBody('Switching closes the other.') },
            { key: 'c', label: 'Gamma', children: panelBody('Controlled via useState.') },
          ]}
        />
      </section>

      <section>
        <h3>Ghost &amp; bordered off</h3>
        <Collapse
          ghost
          bordered={false}
          defaultActiveKey={['x']}
          items={[
            { key: 'x', label: 'Ghost panel', children: panelBody('No outer border; lighter chrome.') },
            { key: 'y', label: 'Another', children: panelBody('Useful on tinted backgrounds.') },
          ]}
        />
      </section>

      <section>
        <h3>Expand icon at end</h3>
        <Collapse
          expandIconPosition="end"
          defaultActiveKey={['e1']}
          items={[
            {
              key: 'e1',
              label: 'FAQ: Billing',
              children: panelBody('Arrow aligns to the trailing edge.'),
            },
            {
              key: 'e2',
              label: 'FAQ: Security',
              extra: <span style={{ fontSize: 12, opacity: 0.65 }}>Updated</span>,
              children: panelBody('Extra slot stays in the header row.'),
            },
          ]}
        />
      </section>

      <section>
        <h3>Sizes: small / middle / large</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Collapse
            size="small"
            defaultActiveKey={['s']}
            items={[{ key: 's', label: 'Small', children: panelBody('Compact header height.') }]}
          />
          <Collapse
            size="middle"
            defaultActiveKey={['m']}
            items={[{ key: 'm', label: 'Middle (default)', children: panelBody('Default density.') }]}
          />
          <Collapse
            size="large"
            defaultActiveKey={['l']}
            items={[{ key: 'l', label: 'Large', children: panelBody('More breathing room.') }]}
          />
        </div>
      </section>
    </section>
  )
}
