import { Cascader } from '@skygraph/react'
import { regionOptions } from './data'

/**
 * `displayRender` replaces the default "A / B / C" trigger label. You get
 * the raw `labels` array and the matching `CascaderOption` objects — so you
 * can mix icons, colored tags, or translations in one pass.
 */
export function CustomRenderCascader() {
  return (
    <div style={{ maxWidth: 420 }}>
      <Cascader
        options={regionOptions}
        defaultValue={['zhejiang', 'hangzhou', 'xihu']}
        displayRender={(labels) =>
          labels.length ? (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <span style={{
                padding: '1px 8px',
                borderRadius: 999,
                background: 'var(--sg-color-primary-bg)',
                color: 'var(--sg-color-primary)',
                fontSize: 12,
              }}>{labels[0]}</span>
              <span style={{ color: 'var(--sg-color-text-tertiary)' }}>›</span>
              <strong>{labels[labels.length - 1]}</strong>
            </span>
          ) : null
        }
      />
    </div>
  )
}
