import { ConfigProvider, useConfig } from '@skygraph/react'

function CurrentConfig() {
  const config = useConfig()
  return (
    <pre
      style={{
        margin: 0,
        padding: 12,
        background: 'var(--sg-color-bg-secondary)',
        borderRadius: 'var(--sg-border-radius)',
        fontSize: 12,
        overflow: 'auto',
      }}
    >
      {JSON.stringify(
        {
          size: config.size,
          disabled: config.disabled,
          bordered: config.bordered,
          locale: config.locale,
        },
        null,
        2,
      )}
    </pre>
  )
}

export function UseConfigHookDemo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div>
        <h4 style={{ margin: '0 0 6px', fontSize: 13, color: 'var(--sg-color-text-tertiary)' }}>
          No provider
        </h4>
        <CurrentConfig />
      </div>
      <ConfigProvider size="large" disabled bordered>
        <div>
          <h4 style={{ margin: '0 0 6px', fontSize: 13, color: 'var(--sg-color-text-tertiary)' }}>
            Inside &lt;ConfigProvider size=&quot;large&quot; disabled bordered&gt;
          </h4>
          <CurrentConfig />
        </div>
      </ConfigProvider>
    </div>
  )
}
