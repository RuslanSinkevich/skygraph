import { Empty } from '../../../../packages/react/src/components/ui/Empty'
import { Button } from '../../../../packages/react/src/components/ui/Button'

export function EmptyDemo() {
  return (
    <section style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <h2>Empty</h2>

      <section>
        <h3>Default</h3>
        <Empty />
      </section>

      <section>
        <h3>Custom image</h3>
        <Empty
          image={
            <div
              style={{
                width: 80,
                height: 80,
                borderRadius: 12,
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                margin: '0 auto',
              }}
            />
          }
          description="No assets uploaded yet"
        />
      </section>

      <section>
        <h3>Custom description only</h3>
        <Empty description={<>Use filters or <strong>clear search</strong> to see results.</>} />
      </section>

      <section>
        <h3>With action (footer slot)</h3>
        <Empty
          description="You have no notifications"
          image={
            <svg width="64" height="48" viewBox="0 0 64 48" aria-hidden>
              <rect x="8" y="12" width="48" height="28" rx="4" fill="currentColor" opacity="0.12" />
              <circle cx="32" cy="26" r="6" fill="currentColor" opacity="0.35" />
            </svg>
          }
        >
          <Button type="primary" size="small">
            Create notification
          </Button>
        </Empty>
      </section>

      <section>
        <h3>Null description (image only)</h3>
        <Empty description={null} image={<span style={{ fontSize: 48, opacity: 0.35 }}>📭</span>} />
      </section>

      <section>
        <h3>Inline layout sample</h3>
        <div
          style={{
            display: 'flex',
            gap: 24,
            alignItems: 'center',
            flexWrap: 'wrap',
            padding: 16,
            border: '1px dashed var(--sg-color-border-secondary)',
            borderRadius: 8,
          }}
        >
          <Empty style={{ margin: 0 }} description="Left column" />
          <Empty style={{ margin: 0 }} description="Right column" />
        </div>
      </section>

      <section>
        <h3>Rich description (React node)</h3>
        <Empty
          description={
            <span>
              No matches for <strong>query:&nbsp;</strong>
              <code>is:archived</code>
            </span>
          }
        />
      </section>

      <section>
        <h3>Secondary action</h3>
        <Empty description="Import a CSV to get started">
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
            <Button size="small">Import</Button>
            <Button size="small" type="dashed">
              Download template
            </Button>
          </div>
        </Empty>
      </section>
    </section>
  )
}
