import { List } from '@skygraph/react'
import { shortData } from './data'
import type { CSSProperties } from 'react'

const dark = {
  background: '#0f172a',
  padding: 24,
  borderRadius: 12,
  '--sg-color-bg-container': '#111827',
  '--sg-color-bg-secondary': '#1e293b',
  '--sg-color-bg-hover': '#273449',
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
