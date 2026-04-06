import { Timeline } from '../../../../packages/react/src/components/ui/Timeline'

const basicItems = [
  { children: <span>Create branch <code>feat/ui</code></span> },
  { children: <span>Push 3 commits</span> },
  { children: <span>Open pull request #42</span> },
]

export function TimelineDemo() {
  return (
    <section style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      <h2>Timeline</h2>

      <section>
        <h3>Basic (mode left)</h3>
        <Timeline items={basicItems} />
      </section>

      <section>
        <h3>Colors</h3>
        <Timeline
          items={[
            { color: 'var(--sg-color-success)', children: 'Build passed' },
            { color: 'var(--sg-color-warning)', children: 'Tests flaky — retry scheduled' },
            { color: 'var(--sg-color-error)', children: 'Deploy rolled back' },
            { color: 'var(--sg-color-primary)', children: 'Manual approval granted' },
          ]}
        />
      </section>

      <section>
        <h3>Custom dots</h3>
        <Timeline
          items={[
            {
              dot: <span style={{ fontSize: 14 }}>📝</span>,
              children: 'Draft saved',
            },
            {
              dot: <span style={{ fontSize: 14 }}>👀</span>,
              children: 'Review requested',
            },
            {
              dot: <span style={{ fontSize: 14 }}>✅</span>,
              children: 'Merged to main',
            },
          ]}
        />
      </section>

      <section>
        <h3>Alternate mode</h3>
        <Timeline
          mode="alternate"
          items={[
            { children: 'Event A', label: '09:00' },
            { children: 'Event B', label: '11:30' },
            { children: 'Event C', label: '15:00' },
          ]}
        />
      </section>

      <section>
        <h3>Pending</h3>
        <Timeline
          pending="CI running…"
          pendingDot={<span style={{ fontSize: 10, opacity: 0.7 }}>⏳</span>}
          items={[
            { children: 'Queued job #9102' },
            { children: 'Lint & typecheck' },
          ]}
        />
      </section>

      <section>
        <h3>Reverse order</h3>
        <Timeline
          reverse
          items={[
            { label: '18:00', children: 'Deployed v2.4.0' },
            { label: '17:40', children: 'Staging sign-off' },
            { label: '17:00', children: 'Merge release branch' },
          ]}
        />
      </section>

      <section>
        <h3>Right-aligned labels (mode right)</h3>
        <Timeline
          mode="right"
          items={[
            { label: 'Mon', children: 'Kickoff' },
            { label: 'Wed', children: 'Mid-week sync' },
            { label: 'Fri', children: 'Demo' },
          ]}
        />
      </section>
    </section>
  )
}
