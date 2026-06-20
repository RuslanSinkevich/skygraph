import { List } from '@skygraph/react'
import { shortData } from './data'
import type { CSSProperties } from 'react'

const dark = {
  background: '#0f172a',
  '--sg-color-primary-bg': 'rgba(96, 165, 250, 0.16)',
  '--sg-color-border-secondary': '#334155',
  '--sg-color-text-secondary': '#cbd5e1',
  padding: 24,
  borderRadius: 12,
  '--sg-color-bg-container': '#1e293b',
  '--sg-color-bg-secondary': '#1e293b',
  '--sg-color-bg-hover': '#334155',
  '--sg-color-border': '#475569',
  '--sg-color-text': '#f8fafc',
} as CSSProperties

export function TokensOverrideList() {
  return (
    <div style={dark}>
      <List
        bordered
        header="List"
        dataSource={shortData}
        renderItem={(item) => <div style={{ padding: '8px 0' }}>{item}</div>}
      />
    </div>
  )
}
