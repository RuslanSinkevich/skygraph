import { useState } from 'react'
import { Pagination } from '@skygraph/react'

export function PaginationDemo() {
  const [page1, setPage1] = useState(1)
  const [page2, setPage2] = useState(3)
  const [page3, setPage3] = useState(1)

  return (
    <section>
      <h2>Pagination</h2>
      <p style={{ color: 'var(--sg-color-text-secondary)', marginBottom: 16 }}>
        Page navigation with ellipsis, total count, and simple mode.
      </p>

      <h4 style={{ marginBottom: 8 }}>Basic</h4>
      <div style={{ marginBottom: 24 }}>
        <Pagination current={page1} total={50} onChange={setPage1} />
      </div>

      <h4 style={{ marginBottom: 8 }}>Many Pages + Show Total</h4>
      <div style={{ marginBottom: 24 }}>
        <Pagination current={page2} total={500} showTotal onChange={setPage2} />
      </div>

      <h4 style={{ marginBottom: 8 }}>Simple Mode</h4>
      <div style={{ marginBottom: 24 }}>
        <Pagination current={page3} total={100} simple onChange={setPage3} />
      </div>

      <h4 style={{ marginBottom: 8 }}>Disabled</h4>
      <Pagination current={1} total={50} disabled />
    </section>
  )
}
