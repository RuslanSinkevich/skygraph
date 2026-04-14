import { Pagination } from '@skygraph/react'
import { ComponentDoc, DemoBox, PropsTable } from '../components'
import type { PropDef } from '../components'
import { useState } from 'react'

const paginationProps: PropDef[] = [
  { name: 'current', description: 'Current page number', type: 'number' },
  { name: 'total', description: 'Total number of data items', type: 'number' },
  { name: 'pageSize', description: 'Number of items per page', type: 'number', default: '10' },
  { name: 'onChange', description: 'Callback when page changes', type: '(page: number) => void' },
  { name: 'showTotal', description: 'Show total number', type: 'boolean | ((total, range) => ReactNode)' },
  { name: 'disabled', description: 'Disable pagination', type: 'boolean', default: 'false' },
  { name: 'simple', description: 'Simple mode', type: 'boolean', default: 'false' },
  { name: 'showSizeChanger', description: 'Show page size changer', type: 'boolean', default: 'false' },
  { name: 'showQuickJumper', description: 'Show quick jumper input', type: 'boolean', default: 'false' },
]

export function PaginationDemo() {
  const [page, setPage] = useState(1)
  const [simplePage, setSimplePage] = useState(1)

  return (
    <ComponentDoc
      title="Pagination"
      description="A long list can be divided into several pages using Pagination."
      whenToUse={[
        'When it takes a long time to load/render all items.',
        'When the user needs to browse data by navigating through pages.',
      ]}
    >
      <DemoBox
        title="Basic"
        description="Basic pagination."
        code={`import { Pagination } from '@skygraph/react'

const [page, setPage] = useState(1)

<Pagination current={page} total={50} onChange={setPage} />`}
      >
        <Pagination current={page} total={50} onChange={setPage} />
      </DemoBox>

      <DemoBox
        title="More Pages"
        description="More pages with ellipsis."
        code={`<Pagination current={page} total={500} onChange={setPage} />`}
      >
        <Pagination current={page} total={500} onChange={setPage} />
      </DemoBox>

      <DemoBox
        title="Simple"
        description="Simple mode."
        code={`<Pagination current={page} total={50} simple onChange={setPage} />`}
      >
        <Pagination current={simplePage} total={50} simple onChange={setSimplePage} />
      </DemoBox>

      <DemoBox
        title="Show Total"
        description="Show total items."
        code={`<Pagination current={1} total={85} showTotal />`}
      >
        <Pagination current={page} total={85} showTotal onChange={setPage} />
      </DemoBox>

      <DemoBox
        title="Quick Jumper"
        description="Jump to a page directly."
        code={`<Pagination current={1} total={500} showQuickJumper showSizeChanger />`}
      >
        <Pagination current={page} total={500} showQuickJumper showSizeChanger onChange={setPage} />
      </DemoBox>

      <PropsTable data={paginationProps} />
    </ComponentDoc>
  )
}
