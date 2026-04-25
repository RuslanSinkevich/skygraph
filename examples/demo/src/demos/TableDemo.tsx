import { useState } from 'react'
import { Table, Tag, Badge, Button, Input } from '@skygraph/react'
import type { TableColumn, FilterDropdownProps } from '@skygraph/react'
import { ComponentDoc, DemoBox, PropsTable } from '../components'
import type { PropDef } from '../components'

const people = Array.from({ length: 12 }, (_, i) => ({
  id: `r${i}`,
  data: {
    name: ['Alice Johnson', 'Bob Smith', 'Charlie Brown', 'Diana Prince', 'Eve Davis', 'Frank Miller'][i % 6],
    age: 22 + (i * 3) % 30,
    email: `user${i}@example.com`,
    city: ['Moscow', 'Berlin', 'Tokyo', 'London', 'Paris', 'New York'][i % 6],
    role: ['Developer', 'Designer', 'Manager', 'QA'][i % 4],
    salary: 3000 + i * 500,
    status: i % 3 === 0 ? 'active' : 'inactive',
  },
}))

const tableProps: PropDef[] = [
  { name: 'columns', description: 'Table columns configuration', type: 'TableColumn[]' },
  { name: 'data', description: 'Data rows with id and data fields', type: 'Array<{ id, data }>' },
  { name: 'pageSize', description: 'Rows per page', type: 'number', default: '10' },
  { name: 'showPagination', description: 'Show pagination', type: 'boolean', default: 'true' },
  { name: 'bordered', description: 'Show all borders', type: 'boolean', default: 'false' },
  { name: 'size', description: 'Table density', type: "'small' | 'middle' | 'large'", default: "'middle'" },
  { name: 'loading', description: 'Show loading overlay', type: 'boolean', default: 'false' },
  { name: 'searchable', description: 'Show global search box', type: 'boolean', default: 'false' },
  { name: 'scroll', description: 'Horizontal scroll width', type: '{ x?: number }' },
  { name: 'rowSelection', description: 'Row selection config', type: '{ selectedKeys, onChange }' },
  { name: 'expandable', description: 'Expandable row config', type: '{ expandedRowRender }' },
  { name: 'tree', description: 'Tree data config', type: '{ defaultExpandAllRows?, indentSize? }' },
  { name: 'summary', description: 'Summary row render function', type: '(rows) => SummaryCell[][]' },
  { name: 'draggable', description: 'Enable column drag & drop reorder', type: 'boolean', default: 'false' },
  { name: 'onColumnOrderChange', description: 'Callback on column reorder', type: '(keys: string[]) => void' },
  { name: 'onCellEdit', description: 'Callback on cell edit', type: '(id, column, value) => void' },
  { name: 'rowClassName', description: 'Custom class for rows', type: '(row) => string' },
  { name: 'classNames', description: 'Slot classes (root/toolbar/headerCell/bodyCell/row/...)', type: 'TableClassNames' },
  { name: 'styles', description: 'Slot inline styles (root/toolbar/headerCell/bodyCell/row/...)', type: 'TableStyles' },
  { name: 'locale', description: 'Locale overrides', type: '{ emptyText? }' },
  { name: 'unstyled', description: 'Remove all built-in styles', type: 'boolean', default: 'false' },
]

const columnProps: PropDef[] = [
  { name: 'key', description: 'Unique column key (matches data field)', type: 'string' },
  { name: 'title', description: 'Column header text', type: 'ReactNode' },
  { name: 'width', description: 'Column width in px', type: 'number' },
  { name: 'align', description: 'Text alignment', type: "'left' | 'center' | 'right'" },
  { name: 'sortable', description: 'Enable sorting', type: 'boolean' },
  { name: 'fixed', description: 'Fix column position', type: "'left' | 'right'" },
  { name: 'resizable', description: 'Enable column resize', type: 'boolean' },
  { name: 'editable', description: 'Enable inline cell editing', type: 'boolean' },
  { name: 'ellipsis', description: 'Truncate text with ellipsis', type: 'boolean' },
  { name: 'render', description: 'Custom cell render function', type: '(value, row) => ReactNode' },
  { name: 'headerClassName', description: 'Class for header cell of this column', type: 'string' },
  { name: 'filters', description: 'Filter menu items', type: 'Array<{ text, value }>' },
  { name: 'onFilter', description: 'Filter logic function', type: '(filterValue, row) => boolean' },
  { name: 'filterMultiple', description: 'Allow multiple filter values', type: 'boolean', default: 'true' },
  { name: 'filterMode', description: 'Use search input instead of checkboxes', type: "'search'" },
  { name: 'filterSearch', description: 'Show search in filter dropdown', type: 'boolean | Function' },
  { name: 'filterDropdown', description: 'Custom filter dropdown render', type: '(props: FilterDropdownProps) => ReactNode' },
  { name: 'filterIcon', description: 'Custom filter icon', type: '(filtered: boolean) => ReactNode' },
  { name: 'defaultFilteredValue', description: 'Default filter values on mount', type: 'any[]' },
  { name: 'children', description: 'Nested columns for column groups', type: 'TableColumn[]' },
  { name: 'onCell', description: 'Custom cell attributes (row/col span)', type: '(row, index) => CellSpan' },
]

function BasicTable() {
  const columns: TableColumn[] = [
    { key: 'name', title: 'Name', sortable: true, width: 180 },
    { key: 'age', title: 'Age', sortable: true, width: 80, align: 'center' },
    { key: 'city', title: 'City', sortable: true, width: 120 },
    {
      key: 'status', title: 'Status', width: 100,
      render: (val) => <Tag color={val === 'active' ? 'success' : 'default'}>{String(val)}</Tag>,
    },
  ]

  return (
    <DemoBox
      title="Basic"
      description="Simple table with sorting and custom render."
      code={`const columns: TableColumn[] = [
  { key: 'name', title: 'Name', sortable: true, width: 180 },
  { key: 'age', title: 'Age', sortable: true, width: 80, align: 'center' },
  { key: 'city', title: 'City', sortable: true, width: 120 },
  {
    key: 'status', title: 'Status', width: 100,
    render: (val) => <Tag color={val === 'active' ? 'success' : 'default'}>{val}</Tag>,
  },
]

<Table columns={columns} data={data} pageSize={5} />`}
    >
      <div style={{ width: '100%' }}>
        <Table columns={columns} data={people} pageSize={5} />
      </div>
    </DemoBox>
  )
}

function SelectionTable() {
  const [selected, setSelected] = useState<string[]>([])

  const columns: TableColumn[] = [
    { key: 'name', title: 'Name', width: 180 },
    { key: 'age', title: 'Age', width: 80, align: 'center' },
    { key: 'email', title: 'Email', width: 200 },
    { key: 'role', title: 'Role', width: 120 },
  ]

  return (
    <DemoBox
      title="Row Selection"
      description="Checkbox selection with select all. Controlled state."
      code={`const [selected, setSelected] = useState<string[]>([])

<Table
  columns={columns}
  data={data}
  pageSize={6}
  rowSelection={{
    selectedKeys: selected,
    onChange: (keys) => setSelected(keys),
  }}
/>`}
    >
      <div style={{ width: '100%' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: 'var(--sg-color-text-secondary)' }}>
          Selected: {selected.length}
          {selected.length > 0 && (
            <Button size="small" type="text" onClick={() => setSelected([])} style={{ marginLeft: 8 }}>Clear</Button>
          )}
        </div>
        <Table
          columns={columns}
          data={people}
          pageSize={6}
          rowSelection={{ selectedKeys: selected, onChange: (keys) => setSelected(keys) }}
        />
      </div>
    </DemoBox>
  )
}

function ExpandableTable() {
  const columns: TableColumn[] = [
    { key: 'name', title: 'Name', width: 180 },
    { key: 'age', title: 'Age', width: 80, align: 'center' },
    { key: 'city', title: 'City', width: 120 },
    { key: 'role', title: 'Role', width: 120 },
  ]

  return (
    <DemoBox
      title="Expandable Rows"
      description="Click the arrow to expand a row and see extra content."
      code={`<Table
  columns={columns}
  data={data}
  expandable={{
    expandedRowRender: (row) => (
      <div>{row.name} works as {row.role} in {row.city}.</div>
    ),
  }}
/>`}
    >
      <div style={{ width: '100%' }}>
        <Table
          columns={columns}
          data={people}
          pageSize={6}
          expandable={{
            expandedRowRender: (row) => (
              <div style={{ padding: '4px 0' }}>
                <strong>{String(row.name)}</strong> works as {String(row.role)} in {String(row.city)}.
                Email: {String(row.email ?? 'N/A')}. Salary: ${String(row.salary ?? 'N/A')}.
              </div>
            ),
          }}
        />
      </div>
    </DemoBox>
  )
}

function FixedColumnsTable() {
  const columns: TableColumn[] = [
    { key: 'name', title: 'Name', width: 150, fixed: 'left' },
    { key: 'age', title: 'Age', width: 80, align: 'center' },
    { key: 'email', title: 'Email', width: 220 },
    { key: 'city', title: 'City', width: 150 },
    { key: 'role', title: 'Role', width: 150 },
    { key: 'salary', title: 'Salary', width: 120, align: 'right' },
    {
      key: 'action', title: 'Action', width: 100, fixed: 'right',
      render: () => <Button size="small" type="text">Edit</Button>,
    },
  ]

  return (
    <DemoBox
      title="Fixed Columns"
      description="Name is fixed left, Action is fixed right. Scroll horizontally."
      code={`const columns = [
  { key: 'name', title: 'Name', fixed: 'left', width: 150 },
  // ... more columns ...
  { key: 'action', title: 'Action', fixed: 'right', width: 100 },
]

<Table columns={columns} data={data} scroll={{ x: 1000 }} />`}
    >
      <div style={{ width: '100%' }}>
        <Table columns={columns} data={people} pageSize={6} scroll={{ x: 1000 }} showPagination={false} />
      </div>
    </DemoBox>
  )
}

function EditableTable() {
  const [data, setData] = useState(
    people.slice(0, 5).map((r) => ({ ...r, data: { ...r.data } }))
  )

  const columns: TableColumn[] = [
    { key: 'name', title: 'Name', width: 180, editable: true },
    { key: 'age', title: 'Age', width: 80, align: 'center', editable: true },
    { key: 'city', title: 'City', width: 150, editable: true },
    { key: 'role', title: 'Role', width: 150 },
  ]

  return (
    <DemoBox
      title="Editable Cells"
      description="Double-click a cell to edit. Enter to save, Escape to cancel."
      code={`const columns = [
  { key: 'name', title: 'Name', editable: true },
  { key: 'age', title: 'Age', editable: true },
  // ...
]

<Table
  columns={columns}
  data={data}
  onCellEdit={(id, col, val) => { /* update data */ }}
/>`}
    >
      <div style={{ width: '100%' }}>
        <Table
          columns={columns}
          data={data}
          showPagination={false}
          onCellEdit={(id, col, val) => {
            setData((prev) =>
              prev.map((r) =>
                r.id === id ? { ...r, data: { ...r.data, [col]: val } } : r
              )
            )
          }}
        />
      </div>
    </DemoBox>
  )
}

function FilterTable() {
  const columns: TableColumn[] = [
    { key: 'name', title: 'Name', width: 180, sortable: true },
    { key: 'age', title: 'Age', width: 80, align: 'center', sortable: true },
    { key: 'city', title: 'City', width: 150 },
    {
      key: 'role', title: 'Role', width: 150,
      filters: [
        { text: 'Developer', value: 'Developer' },
        { text: 'Designer', value: 'Designer' },
        { text: 'Manager', value: 'Manager' },
        { text: 'QA', value: 'QA' },
      ],
      onFilter: (value, row) => row.role === value,
    },
    {
      key: 'status', title: 'Status', width: 100,
      filters: [
        { text: 'Active', value: 'active' },
        { text: 'Inactive', value: 'inactive' },
      ],
      onFilter: (value, row) => row.status === value,
      render: (val) => <Badge status={val === 'active' ? 'success' : 'default'} text={String(val)} />,
    },
  ]

  return (
    <DemoBox
      title="Column Filters"
      description="Multiple filter types: checkbox multi-select on Role and Status columns."
      code={`{
  key: 'role', title: 'Role',
  filters: [
    { text: 'Developer', value: 'Developer' },
    { text: 'Designer', value: 'Designer' },
  ],
  onFilter: (value, row) => row.role === value,
}`}
    >
      <div style={{ width: '100%' }}>
        <Table columns={columns} data={people} pageSize={6} />
      </div>
    </DemoBox>
  )
}

function FilterSearchTable() {
  const columns: TableColumn[] = [
    {
      key: 'name', title: 'Name', width: 180,
      filterMode: 'search',
      onFilter: (value, row) => String(row.name).toLowerCase().includes(String(value).toLowerCase()),
    },
    { key: 'age', title: 'Age', width: 80, align: 'center' },
    {
      key: 'email', title: 'Email', width: 220,
      filterMode: 'search',
      onFilter: (value, row) => String(row.email).toLowerCase().includes(String(value).toLowerCase()),
    },
    { key: 'city', title: 'City', width: 150 },
  ]

  return (
    <DemoBox
      title="Search Filter"
      description="Name and Email use filterMode='search' — type text to filter by substring."
      code={`{
  key: 'name', title: 'Name',
  filterMode: 'search',
  onFilter: (value, row) =>
    String(row.name).toLowerCase().includes(String(value).toLowerCase()),
}`}
    >
      <div style={{ width: '100%' }}>
        <Table columns={columns} data={people} pageSize={6} />
      </div>
    </DemoBox>
  )
}

function CustomFilterDropdownTable() {
  const columns: TableColumn[] = [
    {
      key: 'name', title: 'Name', width: 200,
      filterDropdown: ({ selectedKeys, setSelectedKeys, confirm, clearFilters }: FilterDropdownProps) => (
        <div style={{ padding: 8, display: 'flex', flexDirection: 'column', gap: 8, minWidth: 200 }}>
          <Input
            placeholder="Search name..."
            size="small"
            value={(selectedKeys[0] as string) ?? ''}
            onChange={(v) => setSelectedKeys(v ? [v] : [])}
          />
          <div style={{ display: 'flex', gap: 4, justifyContent: 'space-between' }}>
            <Button size="small" onClick={clearFilters}>Reset</Button>
            <Button size="small" type="primary" onClick={confirm}>Search</Button>
          </div>
        </div>
      ),
      filterIcon: (filtered: boolean) => (
        <span style={{ color: filtered ? 'var(--sg-color-primary)' : undefined }}>🔍</span>
      ),
      onFilter: (value, row) => String(row.name).toLowerCase().includes(String(value).toLowerCase()),
    },
    { key: 'age', title: 'Age', width: 80, align: 'center' },
    { key: 'city', title: 'City', width: 150 },
    { key: 'role', title: 'Role', width: 120 },
  ]

  return (
    <DemoBox
      title="Custom Filter Dropdown"
      description="Fully custom filter UI using filterDropdown prop."
      code={`{
  key: 'name', title: 'Name',
  filterDropdown: ({ selectedKeys, setSelectedKeys, confirm, clearFilters }) => (
    <div>
      <Input value={selectedKeys[0]} onChange={(v) => setSelectedKeys(v ? [v] : [])} />
      <Button onClick={clearFilters}>Reset</Button>
      <Button type="primary" onClick={confirm}>Search</Button>
    </div>
  ),
  filterIcon: (filtered) => <span style={{ color: filtered ? 'blue' : undefined }}>🔍</span>,
  onFilter: (value, row) => row.name.toLowerCase().includes(value.toLowerCase()),
}`}
    >
      <div style={{ width: '100%' }}>
        <Table columns={columns} data={people} pageSize={6} />
      </div>
    </DemoBox>
  )
}

const treeData = [
  {
    id: 'org',
    data: {
      name: 'Acme Corporation', head: 'CEO — John Doe', budget: 2000000, employees: 340,
      children: [
        {
          id: 'dept-eng',
          data: {
            name: 'Engineering', head: 'VP — Alice Johnson', budget: 800000, employees: 120,
            children: [
              { id: 'team-frontend', data: { name: 'Frontend', head: 'Lead — Bob Smith', budget: 350000, employees: 50 } },
              { id: 'team-backend', data: { name: 'Backend', head: 'Lead — Julia Chen', budget: 300000, employees: 45 } },
              { id: 'team-qa', data: { name: 'QA', head: 'Lead — Nancy Black', budget: 150000, employees: 25 } },
            ],
          },
        },
        { id: 'dept-design', data: { name: 'Design', head: 'VP — Oscar Gray', budget: 400000, employees: 60 } },
        { id: 'dept-product', data: { name: 'Product', head: 'VP — Tina Copper', budget: 300000, employees: 40 } },
      ],
    },
  },
]

function TreeDataTable() {
  const columns: TableColumn[] = [
    { key: 'name', title: 'Organization Unit', width: 280 },
    { key: 'head', title: 'Head', width: 200 },
    { key: 'employees', title: 'People', width: 80, align: 'center' },
    { key: 'budget', title: 'Budget', width: 130, align: 'right', render: (v) => `$${Number(v).toLocaleString()}` },
  ]

  return (
    <DemoBox
      title="Tree Data"
      description="Hierarchical org chart with nested children. Click arrows to expand/collapse."
      code={`const treeData = [
  {
    id: 'org',
    data: {
      name: 'Acme Corporation',
      children: [
        { id: 'eng', data: { name: 'Engineering', children: [...] } },
        { id: 'design', data: { name: 'Design' } },
      ],
    },
  },
]

<Table
  columns={columns}
  data={treeData}
  tree={{ defaultExpandAllRows: true, indentSize: 22 }}
/>`}
    >
      <div style={{ width: '100%' }}>
        <Table
          columns={columns}
          data={treeData}
          tree={{ defaultExpandAllRows: true, indentSize: 22 }}
          showPagination={false}
        />
      </div>
    </DemoBox>
  )
}

function ColumnGroupTable() {
  const columns: TableColumn[] = [
    { key: 'name', title: 'Name', width: 160 },
    {
      key: 'contact-group', title: 'Contact Info',
      children: [
        { key: 'email', title: 'Email', width: 200 },
        { key: 'city', title: 'City', width: 120 },
      ],
    },
    {
      key: 'work-group', title: 'Work',
      children: [
        { key: 'role', title: 'Role', width: 120 },
        { key: 'salary', title: 'Salary', width: 110, align: 'right', render: (v) => `$${Number(v).toLocaleString()}` },
      ],
    },
  ]

  return (
    <DemoBox
      title="Column Groups"
      description="Multi-level header with grouped columns (Contact Info, Work)."
      code={`const columns = [
  { key: 'name', title: 'Name' },
  {
    key: 'contact', title: 'Contact Info',
    children: [
      { key: 'email', title: 'Email' },
      { key: 'city', title: 'City' },
    ],
  },
]

<Table columns={columns} data={data} bordered />`}
    >
      <div style={{ width: '100%' }}>
        <Table columns={columns} data={people} pageSize={6} bordered />
      </div>
    </DemoBox>
  )
}

function SummaryTable() {
  const columns: TableColumn[] = [
    { key: 'name', title: 'Name', width: 180 },
    { key: 'role', title: 'Role', width: 150 },
    { key: 'salary', title: 'Salary', width: 120, align: 'right' },
  ]

  return (
    <DemoBox
      title="Summary Row"
      description="Footer row showing totals and averages."
      code={`<Table
  columns={columns}
  data={data}
  summary={(rows) => {
    const total = rows.reduce((s, r) => s + Number(r.data.salary), 0)
    return [[
      { content: \`Total: \${rows.length}\`, colSpan: 2 },
      { content: \`$\${total.toLocaleString()}\`, align: 'right' },
    ]]
  }}
/>`}
    >
      <div style={{ width: '100%' }}>
        <Table
          columns={columns}
          data={people}
          showPagination={false}
          summary={(rows) => {
            const total = rows.reduce((sum, r) => sum + (Number(r.data.salary) || 0), 0)
            const avg = rows.length ? Math.round(total / rows.length) : 0
            return [
              [
                { content: `Total: ${rows.length} people`, colSpan: 2 },
                { content: `$${total.toLocaleString()}`, align: 'right' as const },
              ],
              [
                { content: 'Average', colSpan: 2 },
                { content: `$${avg.toLocaleString()}`, align: 'right' as const },
              ],
            ]
          }}
        />
      </div>
    </DemoBox>
  )
}

function LoadingTable() {
  const [loading, setLoading] = useState(true)

  const columns: TableColumn[] = [
    { key: 'name', title: 'Name', width: 180 },
    { key: 'age', title: 'Age', width: 80, align: 'center' },
    { key: 'city', title: 'City', width: 150 },
    { key: 'role', title: 'Role', width: 120 },
  ]

  return (
    <DemoBox
      title="Loading State"
      description="Table with loading overlay. Toggle to see the effect."
      code={`<Table columns={columns} data={data} loading={true} />`}
    >
      <div style={{ width: '100%' }}>
        <div style={{ marginBottom: 8 }}>
          <Button size="small" onClick={() => setLoading((v) => !v)}>
            {loading ? 'Stop loading' : 'Start loading'}
          </Button>
        </div>
        <Table columns={columns} data={people.slice(0, 4)} loading={loading} showPagination={false} />
      </div>
    </DemoBox>
  )
}

function SearchTable() {
  const columns: TableColumn[] = [
    { key: 'name', title: 'Name', width: 180 },
    { key: 'email', title: 'Email', width: 220 },
    { key: 'city', title: 'City', width: 150 },
    { key: 'role', title: 'Role', width: 150 },
  ]

  return (
    <DemoBox
      title="Global Search"
      description="Type in the search box to filter across all columns."
      code={`<Table columns={columns} data={data} searchable />`}
    >
      <div style={{ width: '100%' }}>
        <Table columns={columns} data={people} pageSize={6} searchable />
      </div>
    </DemoBox>
  )
}

function EmptyTable() {
  const columns: TableColumn[] = [
    { key: 'name', title: 'Name', width: 180 },
    { key: 'age', title: 'Age', width: 80 },
    { key: 'city', title: 'City', width: 150 },
  ]

  return (
    <DemoBox
      title="Empty State"
      description="Table with no data and custom empty text."
      code={`<Table
  columns={columns}
  data={[]}
  locale={{ emptyText: '🔍 No results found.' }}
/>`}
    >
      <div style={{ width: '100%' }}>
        <Table
          columns={columns}
          data={[]}
          showPagination={false}
          locale={{ emptyText: '🔍 No results found. Try adjusting your filters.' }}
        />
      </div>
    </DemoBox>
  )
}

function KitchenSinkTable() {
  const [selected, setSelected] = useState<string[]>([])

  const columns: TableColumn[] = [
    { key: 'name', title: 'Name', width: 160, sortable: true, fixed: 'left', resizable: true },
    { key: 'age', title: 'Age', width: 80, sortable: true, align: 'center', editable: true },
    { key: 'email', title: 'Email', width: 200, resizable: true, ellipsis: true },
    { key: 'city', title: 'City', width: 130, sortable: true, resizable: true },
    {
      key: 'role', title: 'Role', width: 130, resizable: true,
      filters: [
        { text: 'Developer', value: 'Developer' },
        { text: 'Designer', value: 'Designer' },
        { text: 'Manager', value: 'Manager' },
        { text: 'QA', value: 'QA' },
      ],
      onFilter: (value, row) => row.role === value,
    },
    { key: 'salary', title: 'Salary', width: 110, align: 'right', sortable: true },
    {
      key: 'status', title: 'Status', width: 100,
      render: (val) => <Tag color={val === 'active' ? 'success' : 'default'}>{String(val)}</Tag>,
    },
    {
      key: 'action', title: 'Action', width: 90, fixed: 'right',
      render: () => <Button size="small" type="text">Edit</Button>,
    },
  ]

  return (
    <DemoBox
      title="Kitchen Sink"
      description="All features combined: selection, expand, sort, filter, search, resize, fixed columns, editable, summary."
      code={`<Table
  columns={columns}
  data={data}
  searchable
  bordered
  scroll={{ x: 1100 }}
  rowSelection={{ selectedKeys, onChange }}
  expandable={{ expandedRowRender: (row) => <div>Details for {row.name}</div> }}
  summary={(rows) => [[{ content: \`\${rows.length} rows\`, colSpan: 6 }, ...]]}
/>`}
    >
      <div style={{ width: '100%' }}>
        <Table
          columns={columns}
          data={people}
          pageSize={6}
          searchable
          bordered
          scroll={{ x: 1100 }}
          rowSelection={{ selectedKeys: selected, onChange: (keys) => setSelected(keys) }}
          expandable={{
            expandedRowRender: (row) => (
              <div>Details for <strong>{String(row.name)}</strong>: {String(row.email)}, ${String(row.salary)}</div>
            ),
          }}
          onCellEdit={(id, col, val) => { console.log('Edit:', id, col, val) }}
          summary={(rows) => {
            const total = rows.reduce((s, r) => s + (Number(r.data.salary) || 0), 0)
            return [[
              { content: `${rows.length} rows`, colSpan: 6 },
              { content: `$${total.toLocaleString()}` },
              { content: '' },
            ]]
          }}
        />
      </div>
    </DemoBox>
  )
}

function StylingWithSlotsTable() {
  const columns: TableColumn[] = [
    { key: 'name', title: 'Name', width: 180, headerClassName: 'demo-th-name' },
    { key: 'city', title: 'City', width: 120 },
    {
      key: 'status',
      title: 'Status',
      width: 120,
      headerClassName: 'demo-th-status',
      render: (val) => <Badge status={val === 'active' ? 'success' : 'default'} text={String(val)} />,
    },
  ]

  return (
    <DemoBox
      title="Styling: classNames / styles (slots)"
      description="Style stable DOM slots without deep selectors. Also shows column.headerClassName."
      code={`<Table
  columns={[
    { key: 'name', title: 'Name', headerClassName: 'demo-th-name' },
    { key: 'city', title: 'City' },
    { key: 'status', title: 'Status', headerClassName: 'demo-th-status' },
  ]}
  data={people}
  pageSize={5}
  searchable
  classNames={{
    root: 'demo-table-root',
    toolbar: 'demo-table-toolbar',
    headerCell: 'demo-table-th',
    bodyCell: 'demo-table-td',
    row: 'demo-table-row',
  }}
  styles={{
    headerCell: { fontSize: 13, letterSpacing: '0.04em' },
    bodyCell: { fontFamily: 'SFMono-Regular, Consolas, Menlo, monospace' },
  }}
/>`}
    >
      <div style={{ width: '100%' }}>
        <Table
          columns={columns}
          data={people}
          pageSize={5}
          searchable
          classNames={{
            root: 'demo-table-root',
            toolbar: 'demo-table-toolbar',
            headerCell: 'demo-table-th',
            bodyCell: 'demo-table-td',
            row: 'demo-table-row',
          }}
          styles={{
            headerCell: { fontSize: 13, letterSpacing: '0.04em' },
            bodyCell: { fontFamily: 'SFMono-Regular, Consolas, Menlo, monospace' },
          }}
        />
      </div>
    </DemoBox>
  )
}

function StylingWithTokensTable() {
  const columns: TableColumn[] = [
    { key: 'name', title: 'Name', width: 180 },
    { key: 'age', title: 'Age', width: 80, align: 'center' },
    {
      key: 'salary',
      title: 'Salary',
      width: 120,
      align: 'right',
      render: (v) => `$${Number(v).toLocaleString()}`,
    },
  ]

  return (
    <DemoBox
      title="Styling: component tokens (per instance)"
      description="Override `--sg-table-*` tokens on a wrapper to restyle a single table."
      code={`<div style={{
  ['--sg-table-header-bg' as any]: 'color-mix(in srgb, var(--sg-color-primary-bg) 55%, var(--sg-color-bg) 45%)',
  ['--sg-table-row-hover-bg' as any]: 'var(--sg-color-primary-bg)',
  ['--sg-table-border-color' as any]: 'color-mix(in srgb, var(--sg-color-primary) 25%, var(--sg-color-border-secondary) 75%)',
  ['--sg-table-cell-padding' as any]: '10px 12px',
}}>
  <Table ... />
</div>`}
    >
      <div
        style={{
          width: '100%',
          ['--sg-table-header-bg' as never]:
            'color-mix(in srgb, var(--sg-color-primary-bg) 55%, var(--sg-color-bg) 45%)',
          ['--sg-table-row-hover-bg' as never]: 'var(--sg-color-primary-bg)',
          ['--sg-table-border-color' as never]:
            'color-mix(in srgb, var(--sg-color-primary) 25%, var(--sg-color-border-secondary) 75%)',
          ['--sg-table-cell-padding' as never]: '10px 12px',
        }}
      >
        <Table columns={columns} data={people} pageSize={5} />
      </div>
    </DemoBox>
  )
}

function UnstyledTable() {
  const columns: TableColumn[] = [
    { key: 'name', title: 'Name', width: 180 },
    { key: 'city', title: 'City', width: 120 },
    { key: 'role', title: 'Role', width: 120 },
  ]

  return (
    <DemoBox
      title="Styling: unstyled (headless visual)"
      description="Strip SkyGraph styles and bring your own CSS/layout. Semantics and behavior stay."
      code={`<div className="demo-unstyled-card">
  <div className="demo-unstyled-card-title">Unstyled table wrapper</div>
  <Table unstyled columns={columns} data={people} pageSize={5} />
</div>`}
    >
      <div className="demo-unstyled-card" style={{ width: '100%' }}>
        <div className="demo-unstyled-card-title">Unstyled table wrapper</div>
        <div className="demo-unstyled-card-row">
          <button className="demo-unstyled-btn" type="button">Custom action</button>
          <span style={{ color: 'var(--sg-color-text-secondary)' }}>No SkyGraph table CSS used.</span>
        </div>
        <div style={{ width: '100%' }}>
          <Table unstyled columns={columns} data={people} pageSize={5} />
        </div>
      </div>
    </DemoBox>
  )
}

export function TableDemo() {
  return (
    <ComponentDoc
      title="Table"
      description="A table displays rows of data. Built on div + CSS Grid for maximum flexibility."
      whenToUse={[
        'To display a collection of structured data.',
        'To sort, search, paginate, and filter data.',
        'For hierarchical data display using tree mode.',
      ]}
    >
      <BasicTable />
      <SelectionTable />
      <ExpandableTable />
      <TreeDataTable />
      <ColumnGroupTable />
      <FixedColumnsTable />
      <EditableTable />
      <FilterTable />
      <FilterSearchTable />
      <CustomFilterDropdownTable />
      <SearchTable />
      <SummaryTable />
      <LoadingTable />
      <EmptyTable />
      <KitchenSinkTable />
      <StylingWithSlotsTable />
      <StylingWithTokensTable />
      <UnstyledTable />

      <PropsTable title="Table API" data={tableProps} />
      <PropsTable title="Column API" data={columnProps} />
    </ComponentDoc>
  )
}
