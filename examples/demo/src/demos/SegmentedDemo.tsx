import { useState } from 'react'
import { Segmented } from '../../../../packages/react/src/components/ui/Segmented'

const MailIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5L4 8V6l8 5 8-5v2z" />
  </svg>
)
const ListIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z" />
  </svg>
)

export function SegmentedDemo() {
  const [sizeVal, setSizeVal] = useState('M')

  return (
    <section style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <h2>Segmented</h2>

      <section>
        <h3>Basic</h3>
        <Segmented options={['Daily', 'Weekly', 'Monthly', 'Yearly']} defaultValue="Weekly" />
      </section>

      <section>
        <h3>With icons</h3>
        <Segmented
          options={[
            { label: 'Mail', value: 'mail', icon: <MailIcon /> },
            { label: 'List', value: 'list', icon: <ListIcon /> },
            { label: 'Disabled', value: 'x', disabled: true },
          ]}
          defaultValue="mail"
        />
      </section>

      <section>
        <h3>Block (full width)</h3>
        <Segmented block options={['Left', 'Center', 'Right', 'Justify']} defaultValue="Left" />
      </section>

      <section>
        <h3>Sizes (shared selection)</h3>
        <p style={{ fontSize: 12, opacity: 0.75, marginBottom: 8 }}>
          Selected: <code>{sizeVal}</code> — all three controls stay in sync.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 360 }}>
          <Segmented size="small" options={['S', 'M', 'L']} value={sizeVal} onChange={setSizeVal} />
          <Segmented size="middle" options={['S', 'M', 'L']} value={sizeVal} onChange={setSizeVal} />
          <Segmented size="large" options={['S', 'M', 'L']} value={sizeVal} onChange={setSizeVal} />
        </div>
      </section>

      <section>
        <h3>Disabled options &amp; group disabled</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Segmented
            options={[
              { label: 'On', value: 'on' },
              { label: 'Off', value: 'off' },
              { label: 'Deprecated', value: 'dep', disabled: true },
            ]}
            defaultValue="on"
          />
          <Segmented disabled options={['A', 'B', 'C']} defaultValue="B" />
        </div>
      </section>

      <section>
        <h3>String options shorthand</h3>
        <Segmented options={['list', 'grid', 'board', 'timeline']} defaultValue="list" />
      </section>

      <section>
        <h3>onChange callback</h3>
        <SegmentedLog />
      </section>
    </section>
  )
}

function SegmentedLog() {
  const [v, setV] = useState('draft')
  const [log, setLog] = useState<string[]>([])

  return (
    <div>
      <Segmented
        options={['draft', 'review', 'published']}
        value={v}
        onChange={(next) => {
          setV(next)
          setLog((prev) => [`${new Date().toLocaleTimeString()}: ${next}`, ...prev].slice(0, 4))
        }}
      />
      <ul style={{ margin: '8px 0 0', paddingLeft: 18, fontSize: 12, opacity: 0.8 }}>
        {log.map((line, i) => (
          <li key={`${i}-${line}`}>{line}</li>
        ))}
      </ul>
    </div>
  )
}
