import { useState } from 'react'
import { Table, Tag, Badge, Button, Spin, Input } from '@skygraph/react'
import type { TableColumn, SummaryCell, CellSpan, FilterDropdownProps } from '@skygraph/react'

// ---- Shared data ----

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

function Section({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 40 }}>
      <h3 style={{ margin: '0 0 4px' }}>{title}</h3>
      <p style={{ color: 'var(--sg-color-text-secondary)', margin: '0 0 12px', fontSize: 13 }}>{description}</p>
      {children}
    </div>
  )
}

// ---- Basic ----

function BasicTable() {
  const columns: TableColumn[] = [
    { key: 'name', title: 'Name', sortable: true, width: 180 },
    { key: 'age', title: 'Age', sortable: true, width: 80, align: 'center' },
    { key: 'city', title: 'City', sortable: true, width: 120 },
    {
      key: 'status', title: 'Status', width: 100,
      render: (val) => (
        <Tag color={val === 'active' ? 'success' : 'default'}>{String(val)}</Tag>
      ),
    },
  ]

  return (
    <Section title="Basic" description="Simple table with sorting and custom render.">
      <Table columns={columns} data={people} pageSize={5} />
    </Section>
  )
}

// ---- Row Selection ----

function SelectionTable() {
  const [selected, setSelected] = useState<string[]>([])

  const columns: TableColumn[] = [
    { key: 'name', title: 'Name', width: 180 },
    { key: 'age', title: 'Age', width: 80, align: 'center' },
    { key: 'email', title: 'Email', width: 200 },
    { key: 'role', title: 'Role', width: 120 },
  ]

  return (
    <Section title="Row Selection" description="Checkbox selection with select all. Controlled state.">
      <div style={{ marginBottom: 8, fontSize: 13, color: 'var(--sg-color-text-secondary)' }}>
        Selected: {selected.length}
        {selected.length > 0 && (
          <Button size="small" type="text" onClick={() => setSelected([])} style={{ marginLeft: 8 }}>
            Clear
          </Button>
        )}
      </div>
      <Table
        columns={columns}
        data={people}
        pageSize={6}
        rowSelection={{
          selectedKeys: selected,
          onChange: (keys) => setSelected(keys),
        }}
      />
    </Section>
  )
}

// ---- Expandable ----

function ExpandableTable() {
  const columns: TableColumn[] = [
    { key: 'name', title: 'Name', width: 180 },
    { key: 'age', title: 'Age', width: 80, align: 'center' },
    { key: 'city', title: 'City', width: 120 },
    { key: 'role', title: 'Role', width: 120 },
  ]

  return (
    <Section title="Expandable Rows" description="Click the arrow to expand a row and see extra content.">
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
    </Section>
  )
}

// ---- Fixed Columns ----

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
    <Section title="Fixed Columns" description="Name is fixed left, Action is fixed right. Scroll horizontally.">
      <Table columns={columns} data={people} pageSize={6} scroll={{ x: 1000 }} showPagination={false} />
    </Section>
  )
}

// ---- Resizable Columns ----

function ResizableTable() {
  const columns: TableColumn[] = [
    { key: 'name', title: 'Name', width: 180, resizable: true },
    { key: 'age', title: 'Age', width: 80, resizable: true, align: 'center' },
    { key: 'city', title: 'City', width: 150, resizable: true },
    { key: 'role', title: 'Role', width: 150, resizable: true },
    { key: 'email', title: 'Email', width: 220, resizable: true },
  ]

  return (
    <Section title="Resizable Columns" description="Drag the right edge of column headers to resize.">
      <Table columns={columns} data={people.slice(0, 5)} showPagination={false} />
    </Section>
  )
}

// ---- Draggable Columns ----

function DraggableTable() {
  const [order, setOrder] = useState<string[] | null>(null)

  const columns: TableColumn[] = [
    { key: 'name', title: 'Name', width: 180 },
    { key: 'age', title: 'Age', width: 80, align: 'center' },
    { key: 'city', title: 'City', width: 150 },
    { key: 'role', title: 'Role', width: 150 },
  ]

  return (
    <Section title="Draggable Columns" description="Drag column headers to reorder them.">
      {order && (
        <div style={{ fontSize: 12, color: 'var(--sg-color-text-tertiary)', marginBottom: 8 }}>
          Order: {order.join(' → ')}
        </div>
      )}
      <Table
        columns={columns}
        data={people.slice(0, 5)}
        draggable
        onColumnOrderChange={setOrder}
        showPagination={false}
      />
    </Section>
  )
}

// ---- Editable Cells ----

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
    <Section title="Editable Cells" description="Double-click a cell to edit. Enter to save, Escape to cancel.">
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
    </Section>
  )
}

// ---- Filter: Checkbox (multi-select) ----

function FilterCheckboxTable() {
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
      render: (val) => (
        <Badge status={val === 'active' ? 'success' : 'default'} text={String(val)} />
      ),
    },
  ]

  return (
    <Section title="Filter: Checkbox (multi)" description="Multiple filters active simultaneously. Role + Status work independently.">
      <Table columns={columns} data={people} pageSize={6} />
    </Section>
  )
}

// ---- Filter: Radio (single-select) ----

function FilterRadioTable() {
  const columns: TableColumn[] = [
    { key: 'name', title: 'Name', width: 180 },
    { key: 'age', title: 'Age', width: 80, align: 'center' },
    {
      key: 'city', title: 'City', width: 150,
      filterMultiple: false,
      filters: [
        { text: 'Moscow', value: 'Moscow' },
        { text: 'Berlin', value: 'Berlin' },
        { text: 'Tokyo', value: 'Tokyo' },
        { text: 'London', value: 'London' },
        { text: 'Paris', value: 'Paris' },
        { text: 'New York', value: 'New York' },
      ],
      onFilter: (value, row) => row.city === value,
    },
    { key: 'role', title: 'Role', width: 120 },
  ]

  return (
    <Section title="Filter: Radio (single)" description="City column uses filterMultiple=false — only one value at a time.">
      <Table columns={columns} data={people} pageSize={6} />
    </Section>
  )
}

// ---- Filter: Search mode (text input by 🔍) ----

function FilterSearchModeTable() {
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
    <Section title="Filter: Search Mode (🔍)" description="Name and Email use filterMode='search' — type text to filter by substring.">
      <Table columns={columns} data={people} pageSize={6} />
    </Section>
  )
}

// ---- Filter: With search inside dropdown ----

function FilterWithSearchTable() {
  const allCities = ['Moscow', 'Berlin', 'Tokyo', 'London', 'Paris', 'New York']

  const columns: TableColumn[] = [
    { key: 'name', title: 'Name', width: 180 },
    { key: 'age', title: 'Age', width: 80, align: 'center' },
    {
      key: 'city', title: 'City', width: 150,
      filterSearch: true,
      filters: allCities.map((c) => ({ text: c, value: c })),
      onFilter: (value, row) => row.city === value,
    },
    {
      key: 'role', title: 'Role', width: 150,
      filterSearch: (input, record) => record.text.toLowerCase().startsWith(input.toLowerCase()),
      filters: [
        { text: 'Developer', value: 'Developer' },
        { text: 'Designer', value: 'Designer' },
        { text: 'Manager', value: 'Manager' },
        { text: 'QA Engineer', value: 'QA' },
      ],
      onFilter: (value, row) => row.role === value,
    },
  ]

  return (
    <Section title="Filter: Search in Dropdown" description="City uses filterSearch=true, Role uses custom filterSearch function (startsWith).">
      <Table columns={columns} data={people} pageSize={6} />
    </Section>
  )
}

// ---- Filter: Custom filterDropdown ----

function FilterCustomDropdownTable() {
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
    {
      key: 'salary', title: 'Salary', width: 130, align: 'right',
      filterDropdown: ({ selectedKeys, setSelectedKeys, confirm, clearFilters }: FilterDropdownProps) => {
        const min = (selectedKeys[0] as number) ?? 0
        const max = (selectedKeys[1] as number) ?? 99999
        return (
          <div style={{ padding: 8, display: 'flex', flexDirection: 'column', gap: 8, minWidth: 180 }}>
            <div style={{ fontSize: 12, fontWeight: 600 }}>Salary range</div>
            <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
              <input
                type="number" placeholder="Min" value={min || ''}
                onChange={(e) => setSelectedKeys([Number(e.target.value) || 0, max])}
                style={{ width: 70, padding: '2px 4px', borderRadius: 4, border: '1px solid var(--sg-color-border)' }}
              />
              <span>—</span>
              <input
                type="number" placeholder="Max" value={max === 99999 ? '' : max}
                onChange={(e) => setSelectedKeys([min, Number(e.target.value) || 99999])}
                style={{ width: 70, padding: '2px 4px', borderRadius: 4, border: '1px solid var(--sg-color-border)' }}
              />
            </div>
            <div style={{ display: 'flex', gap: 4, justifyContent: 'space-between' }}>
              <Button size="small" onClick={clearFilters}>Reset</Button>
              <Button size="small" type="primary" onClick={confirm}>Apply</Button>
            </div>
          </div>
        )
      },
      filterIcon: (filtered: boolean) => (
        <span style={{ color: filtered ? 'var(--sg-color-primary)' : undefined }}>💰</span>
      ),
      onFilter: (value, row) => {
        const salary = Number(row.salary)
        if (Array.isArray(value)) return false
        return true
      },
      render: (v) => `$${Number(v).toLocaleString()}`,
    },
    { key: 'city', title: 'City', width: 150 },
    { key: 'role', title: 'Role', width: 120 },
  ]

  return (
    <Section title="Filter: Custom Dropdown" description="Name has custom search input. Salary has custom range filter with min/max inputs.">
      <Table columns={columns} data={people} pageSize={6} />
    </Section>
  )
}

// ---- Filter: Default values ----

function FilterDefaultValueTable() {
  const columns: TableColumn[] = [
    { key: 'name', title: 'Name', width: 180 },
    { key: 'age', title: 'Age', width: 80, align: 'center' },
    { key: 'city', title: 'City', width: 150 },
    {
      key: 'role', title: 'Role', width: 150,
      defaultFilteredValue: ['Developer'],
      filters: [
        { text: 'Developer', value: 'Developer' },
        { text: 'Designer', value: 'Designer' },
        { text: 'Manager', value: 'Manager' },
        { text: 'QA', value: 'QA' },
      ],
      onFilter: (value, row) => row.role === value,
    },
  ]

  return (
    <Section title="Filter: Default Value" description="Role is pre-filtered to 'Developer' on mount via defaultFilteredValue.">
      <Table columns={columns} data={people} pageSize={6} />
    </Section>
  )
}

// ---- Global Search ----

function SearchTable() {
  const columns: TableColumn[] = [
    { key: 'name', title: 'Name', width: 180 },
    { key: 'email', title: 'Email', width: 220 },
    { key: 'city', title: 'City', width: 150 },
    { key: 'role', title: 'Role', width: 150 },
  ]

  return (
    <Section title="Global Search" description="Type in the search box to filter across all columns.">
      <Table columns={columns} data={people} pageSize={6} searchable />
    </Section>
  )
}

// ---- Combined Filters ----

function CombinedFiltersTable() {
  const columns: TableColumn[] = [
    {
      key: 'name', title: 'Name', width: 180,
      filterMode: 'search',
      onFilter: (value, row) => String(row.name).toLowerCase().includes(String(value).toLowerCase()),
    },
    { key: 'age', title: 'Age', width: 80, align: 'center', sortable: true },
    {
      key: 'city', title: 'City', width: 150,
      filterMultiple: false,
      filters: ['Moscow', 'Berlin', 'Tokyo', 'London', 'Paris', 'New York'].map((c) => ({ text: c, value: c })),
      onFilter: (value, row) => row.city === value,
    },
    {
      key: 'role', title: 'Role', width: 150,
      filterSearch: true,
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
      render: (val) => <Tag color={val === 'active' ? 'success' : 'error'}>{String(val)}</Tag>,
    },
  ]

  return (
    <Section title="Combined Filters" description="All filter types at once: Name=search, City=radio, Role=checkbox+search, Status=checkbox. All work simultaneously.">
      <Table columns={columns} data={people} pageSize={8} searchable />
    </Section>
  )
}

// ---- Summary ----

function SummaryTable() {
  const columns: TableColumn[] = [
    { key: 'name', title: 'Name', width: 180 },
    { key: 'role', title: 'Role', width: 150 },
    { key: 'salary', title: 'Salary', width: 120, align: 'right' },
  ]

  return (
    <Section title="Summary Row" description="Footer row showing totals.">
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
    </Section>
  )
}

// ---- Bordered + Sizes ----

function BorderedTable() {
  const columns: TableColumn[] = [
    { key: 'name', title: 'Name', width: 180 },
    { key: 'age', title: 'Age', width: 80, align: 'center' },
    { key: 'city', title: 'City', width: 150 },
  ]

  return (
    <Section title="Bordered & Sizes" description="Bordered table in small size.">
      <Table columns={columns} data={people.slice(0, 4)} bordered size="small" showPagination={false} />
    </Section>
  )
}

// ---- Tree Data ----

const treeData = [
  {
    id: 'org',
    data: {
      name: 'Acme Corporation',
      head: 'CEO — John Doe',
      budget: 2000000,
      employees: 340,
      children: [
        {
          id: 'dept-eng',
          data: {
            name: 'Engineering',
            head: 'VP — Alice Johnson',
            budget: 800000,
            employees: 120,
            children: [
              {
                id: 'div-frontend',
                data: {
                  name: 'Frontend Division',
                  head: 'Director — Bob Smith',
                  budget: 350000,
                  employees: 50,
                  children: [
                    {
                      id: 'team-react',
                      data: {
                        name: 'React Team',
                        head: 'Lead — Charlie Brown',
                        budget: 180000,
                        employees: 25,
                        children: [
                          {
                            id: 'squad-ui',
                            data: {
                              name: 'UI Components Squad',
                              head: 'Senior — Diana Prince',
                              budget: 90000,
                              employees: 12,
                              children: [
                                { id: 'pair-a', data: { name: 'Pair A (Forms)', head: 'Eve Davis', budget: 45000, employees: 6 } },
                                { id: 'pair-b', data: { name: 'Pair B (Tables)', head: 'Frank Miller', budget: 45000, employees: 6 } },
                              ],
                            },
                          },
                          { id: 'squad-perf', data: { name: 'Performance Squad', head: 'Grace Lee', budget: 90000, employees: 13 } },
                        ],
                      },
                    },
                    { id: 'team-vue', data: { name: 'Vue Team', head: 'Lead — Hannah Wilson', budget: 100000, employees: 15 } },
                    { id: 'team-mobile', data: { name: 'Mobile (RN)', head: 'Lead — Ivan Petrov', budget: 70000, employees: 10 } },
                  ],
                },
              },
              {
                id: 'div-backend',
                data: {
                  name: 'Backend Division',
                  head: 'Director — Julia Chen',
                  budget: 300000,
                  employees: 45,
                  children: [
                    { id: 'team-api', data: { name: 'API Team', head: 'Lead — Kevin Brown', budget: 150000, employees: 20 } },
                    { id: 'team-db', data: { name: 'Database Team', head: 'Lead — Laura White', budget: 100000, employees: 15 } },
                    { id: 'team-infra', data: { name: 'Infrastructure', head: 'Lead — Mike Green', budget: 50000, employees: 10 } },
                  ],
                },
              },
              { id: 'div-qa', data: { name: 'QA Division', head: 'Director — Nancy Black', budget: 150000, employees: 25 } },
            ],
          },
        },
        {
          id: 'dept-design',
          data: {
            name: 'Design',
            head: 'VP — Oscar Gray',
            budget: 400000,
            employees: 60,
            children: [
              {
                id: 'team-ux',
                data: {
                  name: 'UX Research',
                  head: 'Lead — Patricia Blue',
                  budget: 200000,
                  employees: 30,
                  children: [
                    { id: 'sub-quant', data: { name: 'Quantitative Research', head: 'Quinn Red', budget: 100000, employees: 15 } },
                    { id: 'sub-qual', data: { name: 'Qualitative Research', head: 'Rachel Gold', budget: 100000, employees: 15 } },
                  ],
                },
              },
              { id: 'team-visual', data: { name: 'Visual Design', head: 'Lead — Sam Silver', budget: 200000, employees: 30 } },
            ],
          },
        },
        {
          id: 'dept-product',
          data: {
            name: 'Product',
            head: 'VP — Tina Copper',
            budget: 300000,
            employees: 40,
            children: [
              { id: 'team-growth', data: { name: 'Growth PM', head: 'Lead — Uma Bronze', budget: 150000, employees: 20 } },
              { id: 'team-platform', data: { name: 'Platform PM', head: 'Lead — Victor Iron', budget: 150000, employees: 20 } },
            ],
          },
        },
        { id: 'dept-hr', data: { name: 'HR & Operations', head: 'VP — Wendy Stone', budget: 200000, employees: 40 } },
        { id: 'dept-marketing', data: { name: 'Marketing', head: 'VP — Xavier Wood', budget: 300000, employees: 80 } },
      ],
    },
  },
]

function TreeDataTable() {
  const columns: TableColumn[] = [
    { key: 'name', title: 'Organization Unit', width: 320 },
    { key: 'head', title: 'Head', width: 200 },
    { key: 'employees', title: 'People', width: 80, align: 'center' },
    { key: 'budget', title: 'Budget', width: 130, align: 'right', render: (v) => `$${Number(v).toLocaleString()}` },
  ]

  return (
    <Section title="Tree Data (unlimited nesting)" description="6-level org chart. Depth is unlimited — just nest children as deep as needed.">
      <Table
        columns={columns}
        data={treeData}
        tree={{ defaultExpandAllRows: true, indentSize: 22 }}
        showPagination={false}
      />
    </Section>
  )
}

// ---- Column Groups ----

function ColumnGroupTable() {
  const columns: TableColumn[] = [
    { key: 'name', title: 'Name', width: 160 },
    {
      key: 'contact-group',
      title: 'Contact Info',
      children: [
        { key: 'email', title: 'Email', width: 200 },
        { key: 'city', title: 'City', width: 120 },
      ],
    },
    {
      key: 'work-group',
      title: 'Work',
      children: [
        { key: 'role', title: 'Role', width: 120 },
        { key: 'salary', title: 'Salary', width: 110, align: 'right', render: (v) => `$${Number(v).toLocaleString()}` },
      ],
    },
    {
      key: 'status', title: 'Status', width: 100,
      render: (val) => <Tag color={val === 'active' ? 'success' : 'default'}>{String(val)}</Tag>,
    },
  ]

  return (
    <Section title="Column Groups" description="Multi-level header with grouped columns (Contact Info, Work).">
      <Table columns={columns} data={people} pageSize={6} bordered />
    </Section>
  )
}

// ---- Row/Col Span ----

function SpanTable() {
  const spanData = [
    { id: 's1', data: { name: 'Alice Johnson', phone: '555-0101', email: 'alice@example.com', city: 'Moscow', role: 'Developer' } },
    { id: 's2', data: { name: 'Alice Johnson', phone: '555-0102', email: 'alice2@example.com', city: 'Moscow', role: 'Developer' } },
    { id: 's3', data: { name: 'Bob Smith', phone: '555-0201', email: 'bob@example.com', city: 'Berlin', role: 'Designer' } },
    { id: 's4', data: { name: 'Bob Smith', phone: '555-0202', email: 'bob2@example.com', city: 'Berlin', role: 'Manager' } },
    { id: 's5', data: { name: 'Charlie Brown', phone: '555-0301', email: 'charlie@example.com', city: 'Tokyo', role: 'QA' } },
  ]

  const columns: TableColumn[] = [
    {
      key: 'name', title: 'Name', width: 160,
      onCell: (_row, rowIndex) => {
        if (rowIndex === 0) return { rowSpan: 2 }
        if (rowIndex === 1) return { rowSpan: 0 }
        if (rowIndex === 2) return { rowSpan: 2 }
        if (rowIndex === 3) return { rowSpan: 0 }
        return {}
      },
    },
    { key: 'phone', title: 'Phone', width: 130 },
    { key: 'email', title: 'Email', width: 200 },
    {
      key: 'city', title: 'City', width: 120,
      onCell: (_row, rowIndex) => {
        if (rowIndex === 0) return { rowSpan: 2 }
        if (rowIndex === 1) return { rowSpan: 0 }
        if (rowIndex === 2) return { rowSpan: 2 }
        if (rowIndex === 3) return { rowSpan: 0 }
        return {}
      },
    },
    { key: 'role', title: 'Role', width: 120 },
  ]

  return (
    <Section title="Row / Column Span" description="Merged cells: Name and City span across rows for the same person.">
      <Table columns={columns} data={spanData} showPagination={false} bordered />
    </Section>
  )
}

// ---- Loading ----

function LoadingTable() {
  const [loading, setLoading] = useState(true)

  const columns: TableColumn[] = [
    { key: 'name', title: 'Name', width: 180 },
    { key: 'age', title: 'Age', width: 80, align: 'center' },
    { key: 'city', title: 'City', width: 150 },
    { key: 'role', title: 'Role', width: 120 },
  ]

  return (
    <Section title="Loading State" description="Table with loading overlay. Toggle to see the effect.">
      <div style={{ marginBottom: 8 }}>
        <Button size="small" onClick={() => setLoading((v) => !v)}>
          {loading ? 'Stop loading' : 'Start loading'}
        </Button>
      </div>
      <Table columns={columns} data={people.slice(0, 4)} loading={loading} showPagination={false} />
    </Section>
  )
}

// ---- Row ClassName ----

function RowClassNameTable() {
  const columns: TableColumn[] = [
    { key: 'name', title: 'Name', width: 180 },
    { key: 'age', title: 'Age', width: 80, align: 'center' },
    { key: 'salary', title: 'Salary', width: 120, align: 'right' },
    {
      key: 'status', title: 'Status', width: 100,
      render: (val) => <Tag color={val === 'active' ? 'success' : 'error'}>{String(val)}</Tag>,
    },
  ]

  return (
    <Section title="Row ClassName" description="Rows with status='inactive' get a custom highlight class.">
      <Table
        columns={columns}
        data={people.slice(0, 6)}
        showPagination={false}
        rowClassName={(row) => row.status === 'inactive' ? 'sg-table-row-warning' : ''}
      />
    </Section>
  )
}

// ---- Empty + Locale ----

function EmptyTable() {
  const columns: TableColumn[] = [
    { key: 'name', title: 'Name', width: 180 },
    { key: 'age', title: 'Age', width: 80 },
    { key: 'city', title: 'City', width: 150 },
  ]

  return (
    <Section title="Empty State & Locale" description="Table with no data and custom empty text.">
      <Table
        columns={columns}
        data={[]}
        showPagination={false}
        locale={{ emptyText: '🔍 No results found. Try adjusting your filters.' }}
      />
    </Section>
  )
}

// ---- Kitchen Sink ----

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
      render: (_, row) => <Button size="small" type="text">Edit</Button>,
    },
  ]

  return (
    <Section title="Kitchen Sink" description="All features combined: selection, expand, sort, filter, search, resize, fixed columns, editable, summary.">
      <Table
        columns={columns}
        data={people}
        pageSize={6}
        searchable
        bordered
        scroll={{ x: 1100 }}
        rowSelection={{
          selectedKeys: selected,
          onChange: (keys) => setSelected(keys),
        }}
        expandable={{
          expandedRowRender: (row) => (
            <div>Details for <strong>{String(row.name)}</strong>: {String(row.email)}, ${String(row.salary)}</div>
          ),
        }}
        onCellEdit={(id, col, val) => {
          console.log('Edit:', id, col, val)
        }}
        summary={(rows) => {
          const total = rows.reduce((s, r) => s + (Number(r.data.salary) || 0), 0)
          return [[
            { content: `${rows.length} rows`, colSpan: 6 },
            { content: `$${total.toLocaleString()}` },
            { content: '' },
          ]]
        }}
      />
    </Section>
  )
}

// ---- Main Demo ----

export function TableDemo() {
  return (
    <section>
      <h2>Table</h2>
      <p style={{ color: 'var(--sg-color-text-secondary)', marginBottom: 24 }}>
        Data table built on div + CSS Grid. Each section demonstrates a feature.
      </p>

      <BasicTable />
      <SelectionTable />
      <ExpandableTable />
      <TreeDataTable />
      <ColumnGroupTable />
      <SpanTable />
      <FixedColumnsTable />
      <ResizableTable />
      <DraggableTable />
      <EditableTable />
      <FilterCheckboxTable />
      <FilterRadioTable />
      <FilterSearchModeTable />
      <FilterWithSearchTable />
      <FilterCustomDropdownTable />
      <FilterDefaultValueTable />
      <SearchTable />
      <CombinedFiltersTable />
      <SummaryTable />
      <LoadingTable />
      <RowClassNameTable />
      <EmptyTable />
      <BorderedTable />
      <KitchenSinkTable />
    </section>
  )
}
