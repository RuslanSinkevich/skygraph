import { useState } from 'react'
import { Pagination } from '@skygraph/react'
import type { CSSProperties } from 'react'

const dark = {
  background: '#0f172a',
  padding: 24,
  borderRadius: 12,
  '--sg-color-bg-container': '#111827',
  '--sg-color-bg-hover': '#273449',
  '--sg-color-border': '#475569',
  '--sg-color-text': '#f8fafc',
  '--sg-color-primary': '#60a5fa',
} as CSSProperties

export function TokensOverridePagination() {
  const [page, setPage] = useState(3)
  return (
    <div style={dark}>
      <Pagination current={page} total={120} onChange={setPage} />
    </div>
  )
}
