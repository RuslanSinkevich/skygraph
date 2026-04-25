import { useMemo, useState } from 'react'
import {
  Button,
  Input,
  List,
  Modal,
  Table,
  Tag,
  Select,
  Switch,
  Progress,
  Badge,
} from '@skygraph/react'
import type { TableColumn } from '@skygraph/react'
import { ComponentDoc, DemoBox } from '../components'

// ──────────────────────────────────────────────────────────────────────────
// Shared fixtures
// ──────────────────────────────────────────────────────────────────────────

type RowData = {
  name: string
  city: string
  status: 'active' | 'inactive' | 'pending'
  score: number
}

const tableData = [
  { id: '1', data: { name: 'Alice', city: 'Moscow', status: 'active', score: 92 } },
  { id: '2', data: { name: 'Bob', city: 'Berlin', status: 'inactive', score: 41 } },
  { id: '3', data: { name: 'Charlie', city: 'Tokyo', status: 'active', score: 78 } },
  { id: '4', data: { name: 'Diana', city: 'Paris', status: 'pending', score: 55 } },
  { id: '5', data: { name: 'Eve', city: 'London', status: 'active', score: 88 } },
] satisfies Array<{ id: string; data: RowData }>

const listData = [
  'Override tokens globally or per instance.',
  'Use slot classNames/styles for complex components.',
  'Use unstyled for full control.',
  'rowClassName, cellClassName, headerClassName — conditional styling without !important.',
]

// ──────────────────────────────────────────────────────────────────────────
// Token palettes
// ──────────────────────────────────────────────────────────────────────────

const paletteTokens: Array<{ name: string; shades: number }> = [
  { name: 'blue', shades: 10 },
  { name: 'gray', shades: 10 },
  { name: 'red', shades: 10 },
  { name: 'green', shades: 10 },
  { name: 'orange', shades: 10 },
]

const semanticTokens = [
  '--sg-color-bg',
  '--sg-color-bg-elevated',
  '--sg-color-bg-secondary',
  '--sg-color-text',
  '--sg-color-text-secondary',
  '--sg-color-border',
  '--sg-color-border-secondary',
  '--sg-color-primary',
  '--sg-color-primary-hover',
  '--sg-color-primary-bg',
  '--sg-color-success',
  '--sg-color-error',
  '--sg-color-warning',
]

// ──────────────────────────────────────────────────────────────────────────
// Styling recipes
// ──────────────────────────────────────────────────────────────────────────

export function StylingShowcasePage() {
  return (
    <ComponentDoc
      title="Styling Showcase"
      badge="Contract"
      crumbs={['Guide', 'Styling Showcase']}
      description="Concentrated tour of SkyGraph styling. Everything here is a public, stable API — tokens, root classes, slot keys, classNames/styles props, and unstyled mode."
      whenToUse={[
        'Learn the three levels of styling: tokens → classNames/styles → unstyled.',
        'Copy recipes into real apps. They all work without !important and without deep selectors.',
        'Verify the styling contract visually before shipping.',
      ]}
      notes={
        <>
          Full reference: <code>docs/styling-contract.md</code>, practical recipes:{' '}
          <code>docs/styling-recipes.md</code>. Every slot shown here is enumerated in §4 of the contract.
        </>
      }
    >
      <PaletteSwatches />
      <SemanticSwatches />
      <TokenOverride />
      <DarkScope />
      <ComponentTokensButton />
      <ComponentTokensInput />
      <ComponentTokensTable />
      <SlotsTable />
      <SlotsHeaderColumn />
      <ConditionalRowsTable />
      <ConditionalCellsTable />
      <SlotsList />
      <ConditionalList />
      <UnstyledMix />
      <PerFeatureBrand />
    </ComponentDoc>
  )
}

// ──────────────────────────────────────────────────────────────────────────
// 1. Palette swatches
// ──────────────────────────────────────────────────────────────────────────

function PaletteSwatches() {
  const code = `/* Every palette token is stable. */
var(--sg-blue-1) … var(--sg-blue-10)
var(--sg-gray-1) … var(--sg-gray-10)
var(--sg-red-1) … var(--sg-red-10)
var(--sg-green-1) … var(--sg-green-10)
var(--sg-orange-1) … var(--sg-orange-10)`

  return (
    <DemoBox
      title="Palette tokens"
      description="Stable numeric scales for each accent colour. Safe to read from any CSS."
      code={code}
    >
      <div className="demo-swatches">
        {paletteTokens.map((p) =>
          Array.from({ length: p.shades }, (_, i) => i + 1).map((shade) => {
            const token = `--sg-${p.name}-${shade}`
            return (
              <div key={token} className="demo-swatch">
                <div className="demo-swatch-box" style={{ background: `var(${token})` }} />
                <div className="demo-swatch-meta">
                  <strong>{token}</strong>
                  {p.name}-{shade}
                </div>
              </div>
            )
          }),
        )}
      </div>
    </DemoBox>
  )
}

// ──────────────────────────────────────────────────────────────────────────
// 2. Semantic swatches
// ──────────────────────────────────────────────────────────────────────────

function SemanticSwatches() {
  const code = `/* Semantic tokens follow data-sg-theme="dark|light".
   Override them to re-skin without touching components. */
var(--sg-color-bg)
var(--sg-color-text)
var(--sg-color-primary)
var(--sg-color-success) | --sg-color-error | --sg-color-warning`

  return (
    <DemoBox
      title="Semantic tokens"
      description="These tokens switch automatically with data-sg-theme. Override them on a scope to re-skin everything inside."
      code={code}
    >
      <div className="demo-swatches">
        {semanticTokens.map((token) => (
          <div key={token} className="demo-swatch">
            <div className="demo-swatch-box" style={{ background: `var(${token})` }} />
            <div className="demo-swatch-meta">
              <strong>{token}</strong>
              semantic
            </div>
          </div>
        ))}
      </div>
    </DemoBox>
  )
}

// ──────────────────────────────────────────────────────────────────────────
// 3. Scoped brand
// ──────────────────────────────────────────────────────────────────────────

function TokenOverride() {
  const code = `<div
  style={{
    ['--sg-color-primary' as any]: '#e91e63',
    ['--sg-color-primary-hover' as any]: '#c2185b',
    ['--sg-color-primary-bg' as any]: '#fce4ec',
    ['--sg-border-radius' as any]: '10px',
    ['--sg-font-size' as any]: '15px',
  }}
>
  <Button type="primary">Primary</Button>
  <Input placeholder="Inherits tokens" />
  <Switch defaultChecked />
  <Progress percent={60} />
</div>`

  return (
    <DemoBox
      title="Scoped brand via tokens"
      description="Wrap any subtree and override semantic tokens. Everything inside picks them up — buttons, inputs, switches, progress, anything that reads the tokens."
      code={code}
    >
      <div
        className="demo-scope-card"
        style={{
          width: '100%',
          ['--sg-color-primary' as never]: '#e91e63',
          ['--sg-color-primary-hover' as never]: '#c2185b',
          ['--sg-color-primary-bg' as never]: '#fce4ec',
          ['--sg-border-radius' as never]: '10px',
          ['--sg-font-size' as never]: '15px',
        }}
      >
        <h4>Scoped brand card</h4>
        <div className="demo-scope-row">
          <Button type="primary">Primary</Button>
          <Button>Default</Button>
          <Input style={{ width: 240 }} placeholder="Inherits tokens" />
          <Switch defaultChecked />
        </div>
        <Progress percent={60} />
      </div>
    </DemoBox>
  )
}

// ──────────────────────────────────────────────────────────────────────────
// 4. Dark scope (data-sg-theme="dark")
// ──────────────────────────────────────────────────────────────────────────

function DarkScope() {
  const code = `<div data-sg-theme="dark" style={{ padding: 16, borderRadius: 8, background: '#0d1117' }}>
  <Button type="primary">Primary</Button>
  <Input placeholder="Dark input" />
  <Tag color="success">active</Tag>
</div>`

  return (
    <DemoBox
      title='Dark theme scope (data-sg-theme="dark")'
      description="Put the attribute on ANY container — all semantic tokens inside switch to dark. Layout and palette are unchanged."
      code={code}
    >
      <div data-sg-theme="dark" className="demo-dark-scope" style={{ width: '100%' }}>
        <div className="demo-scope-row" style={{ gap: 12 }}>
          <Button type="primary">Primary</Button>
          <Button>Default</Button>
          <Input style={{ width: 220 }} placeholder="Dark input" />
          <Tag color="success">active</Tag>
          <Tag color="error">error</Tag>
          <Badge count={5} />
        </div>
      </div>
    </DemoBox>
  )
}

// ──────────────────────────────────────────────────────────────────────────
// 5. Component tokens: Button
// ──────────────────────────────────────────────────────────────────────────

function ComponentTokensButton() {
  const code = `<div
  style={{
    ['--sg-btn-height' as any]: '40px',
    ['--sg-btn-radius' as any]: '999px',
    ['--sg-btn-font-size' as any]: '15px',
    ['--sg-btn-padding' as any]: '0 20px',
  }}
>
  <Button type="primary">Pill primary</Button>
  <Button>Pill default</Button>
</div>`

  return (
    <DemoBox
      title="Component tokens — Button"
      description="Override --sg-btn-* on a local scope. Only these buttons become pills, the rest of the app stays intact."
      code={code}
    >
      <div
        className="demo-scope-row"
        style={{
          ['--sg-btn-height' as never]: '40px',
          ['--sg-btn-radius' as never]: '999px',
          ['--sg-btn-font-size' as never]: '15px',
          ['--sg-btn-padding' as never]: '0 20px',
        }}
      >
        <Button type="primary">Pill primary</Button>
        <Button>Pill default</Button>
        <Button type="dashed">Pill dashed</Button>
      </div>
    </DemoBox>
  )
}

// ──────────────────────────────────────────────────────────────────────────
// 6. Component tokens: Input (radius + height)
// ──────────────────────────────────────────────────────────────────────────

function ComponentTokensInput() {
  const code = `<div
  style={{
    ['--sg-input-height' as any]: '44px',
    ['--sg-input-radius' as any]: '14px',
    ['--sg-input-font-size' as any]: '16px',
  }}
>
  <Input placeholder="Rounded soft input" />
  <Select
    options={[{ value: 'a', label: 'Alpha' }, { value: 'b', label: 'Beta' }]}
    placeholder="Matching select"
  />
</div>`

  return (
    <DemoBox
      title="Component tokens — Input / Select"
      description="Same trick for inputs. Tokens are per-component and documented in the contract."
      code={code}
    >
      <div
        className="demo-scope-row"
        style={{
          ['--sg-input-height' as never]: '44px',
          ['--sg-input-radius' as never]: '14px',
          ['--sg-input-font-size' as never]: '16px',
        }}
      >
        <Input placeholder="Rounded soft input" style={{ width: 260 }} />
        <Select
          options={[
            { value: 'a', label: 'Alpha' },
            { value: 'b', label: 'Beta' },
            { value: 'c', label: 'Gamma' },
          ]}
          placeholder="Matching select"
          style={{ width: 220 }}
        />
      </div>
    </DemoBox>
  )
}

// ──────────────────────────────────────────────────────────────────────────
// 7. Component tokens: Table
// ──────────────────────────────────────────────────────────────────────────

function ComponentTokensTable() {
  const columns: TableColumn[] = [
    { key: 'name', title: 'Name', width: 160 },
    { key: 'city', title: 'City', width: 140 },
    {
      key: 'status',
      title: 'Status',
      width: 120,
      render: (v) => <Tag color={v === 'active' ? 'success' : 'default'}>{String(v)}</Tag>,
    },
  ]

  const code = `<div
  style={{
    ['--sg-table-row-height' as any]: '56px',
    ['--sg-table-header-bg' as any]: '#fff7ed',
    ['--sg-table-row-hover-bg' as any]: '#fff4e5',
    ['--sg-table-cell-padding' as any]: '12px 16px',
  }}
>
  <Table columns={cols} data={data} showPagination={false} />
</div>`

  return (
    <DemoBox
      title="Component tokens — Table"
      description="Change density, header background, hover colour via --sg-table-* without redeclaring classes."
      code={code}
      flush
    >
      <div
        style={{
          width: '100%',
          ['--sg-table-row-height' as never]: '56px',
          ['--sg-table-header-bg' as never]: '#fff7ed',
          ['--sg-table-row-hover-bg' as never]: '#fff4e5',
          ['--sg-table-cell-padding' as never]: '12px 16px',
        }}
      >
        <Table columns={columns} data={tableData} showPagination={false} />
      </div>
    </DemoBox>
  )
}

// ──────────────────────────────────────────────────────────────────────────
// 8. Slots: Table (classNames + styles)
// ──────────────────────────────────────────────────────────────────────────

function SlotsTable() {
  const columns: TableColumn[] = [
    { key: 'name', title: 'Name', width: 160, sortable: true },
    { key: 'city', title: 'City', width: 120 },
    { key: 'score', title: 'Score', width: 100, align: 'right' },
    {
      key: 'status',
      title: 'Status',
      width: 120,
      render: (v) => <Tag color={v === 'active' ? 'success' : 'default'}>{String(v)}</Tag>,
    },
  ]

  const code = `<Table
  columns={cols}
  data={data}
  searchable
  classNames={{
    root: 'demo-table-root',
    toolbar: 'demo-table-toolbar',
    headerCell: 'demo-table-th',
    bodyCell: 'demo-table-td',
  }}
  styles={{
    headerCell: { fontSize: 13, letterSpacing: '0.05em' },
    bodyCell: { fontFamily: 'monospace' },
  }}
/>`

  return (
    <DemoBox
      title="Slots — Table (classNames + styles)"
      description="Target stable DOM nodes by slot key. No deep selectors, no !important. Every slot key is documented in §4 of the contract."
      code={code}
      flush
    >
      <div style={{ width: '100%' }}>
        <SlotLegend
          items={[
            { label: 'root', color: 'var(--sg-color-primary)' },
            { label: 'toolbar', color: '#ff9800' },
            { label: 'headerCell', color: 'var(--sg-color-success)' },
            { label: 'bodyCell', color: 'var(--sg-color-warning)' },
          ]}
        />
        <Table
          columns={columns}
          data={tableData}
          searchable
          showPagination={false}
          classNames={{
            root: 'demo-table-root',
            toolbar: 'demo-table-toolbar',
            headerCell: 'demo-table-th',
            bodyCell: 'demo-table-td',
          }}
          styles={{
            headerCell: { fontSize: 13, letterSpacing: '0.05em' },
            bodyCell: { fontFamily: 'SFMono-Regular, Consolas, Menlo, monospace' },
          }}
        />
      </div>
    </DemoBox>
  )
}

// ──────────────────────────────────────────────────────────────────────────
// 9. Per-column headerClassName
// ──────────────────────────────────────────────────────────────────────────

function SlotsHeaderColumn() {
  const columns: TableColumn[] = [
    {
      key: 'name',
      title: 'Name',
      sortable: true,
      width: 160,
      headerClassName: 'th-strong',
    },
    { key: 'city', title: 'City', width: 140 },
    { key: 'score', title: 'Score', width: 100, align: 'right', headerClassName: 'th-numeric' },
    {
      key: 'status',
      title: 'Status',
      width: 120,
      headerClassName: 'th-status',
      render: (v) => <Tag color={v === 'active' ? 'success' : 'default'}>{String(v)}</Tag>,
    },
  ]

  const code = `<Table
  columns={[
    { key: 'name',   title: 'Name',   headerClassName: 'th-strong' },
    { key: 'score',  title: 'Score',  headerClassName: 'th-numeric' },
    { key: 'status', title: 'Status', headerClassName: 'th-status' },
  ]}
  data={data}
/>

.th-strong  { text-transform: uppercase; letter-spacing: 0.05em; }
.th-numeric { font-variant-numeric: tabular-nums; }
.th-status  { color: var(--sg-color-primary); }`

  return (
    <DemoBox
      title="Per-column headerClassName"
      description="Parity with column.cellClassName. Style a single header cell without touching the others."
      code={code}
      flush
    >
      <style>{`
        .th-strong  { text-transform: uppercase; letter-spacing: 0.05em; font-weight: 700; }
        .th-numeric { font-variant-numeric: tabular-nums; color: var(--sg-color-text-secondary); }
        .th-status  { color: var(--sg-color-primary); }
      `}</style>
      <div style={{ width: '100%' }}>
        <Table columns={columns} data={tableData} showPagination={false} />
      </div>
    </DemoBox>
  )
}

// ──────────────────────────────────────────────────────────────────────────
// 10. rowClassName conditional colouring
// ──────────────────────────────────────────────────────────────────────────

function ConditionalRowsTable() {
  const columns: TableColumn[] = [
    { key: 'name', title: 'Name', width: 160 },
    { key: 'city', title: 'City', width: 140 },
    { key: 'score', title: 'Score', width: 100, align: 'right' },
    {
      key: 'status',
      title: 'Status',
      width: 120,
      render: (v) => <Tag color={v === 'active' ? 'success' : 'default'}>{String(v)}</Tag>,
    },
  ]

  const code = `<Table
  columns={cols}
  data={data}
  rowClassName={(row) =>
    row.data.score >= 85 ? 'demo-table-row-featured' : ''
  }
/>`

  return (
    <DemoBox
      title="Conditional rows (rowClassName)"
      description="High-scorers get a featured background. Pure CSS class, zero !important."
      code={code}
      flush
    >
      <div style={{ width: '100%' }}>
        <Table
          columns={columns}
          data={tableData}
          showPagination={false}
          rowClassName={(row) => {
            const score = (row as { score?: number }).score ?? 0
            return score >= 85 ? 'demo-table-row-featured' : ''
          }}
        />
      </div>
    </DemoBox>
  )
}

// ──────────────────────────────────────────────────────────────────────────
// 11. Conditional cells (column.cellClassName + render)
// ──────────────────────────────────────────────────────────────────────────

function ConditionalCellsTable() {
  const columns: TableColumn[] = [
    { key: 'name', title: 'Name', width: 160 },
    { key: 'city', title: 'City', width: 140 },
    {
      key: 'score',
      title: 'Score',
      width: 120,
      align: 'right',
      cellClassName: (value) => {
        const score = typeof value === 'number' ? value : 0
        if (score < 50) return 'demo-table-cell-critical'
        if (score >= 80) return 'demo-table-cell-ok'
        return ''
      },
      render: (v) => String(v),
    },
    {
      key: 'status',
      title: 'Status',
      width: 120,
      render: (v) => <Tag color={v === 'active' ? 'success' : 'default'}>{String(v)}</Tag>,
    },
  ]

  const code = `const columns = [
  {
    key: 'score',
    title: 'Score',
    cellClassName: (row) => {
      const d = row.data
      if (d.score < 50) return 'demo-table-cell-critical'
      if (d.score >= 80) return 'demo-table-cell-ok'
      return ''
    },
  },
]`

  return (
    <DemoBox
      title="Conditional cells (column.cellClassName)"
      description="Per-column hook runs for every body cell and returns a class name."
      code={code}
      flush
    >
      <div style={{ width: '100%' }}>
        <Table columns={columns} data={tableData} showPagination={false} />
      </div>
    </DemoBox>
  )
}

// ──────────────────────────────────────────────────────────────────────────
// 12. Slots: List
// ──────────────────────────────────────────────────────────────────────────

function SlotsList() {
  const code = `<List
  header="Styling principles"
  footer="All three levels compose."
  dataSource={listData}
  classNames={{ root: 'demo-list', header: 'demo-list-header', item: 'demo-list-item' }}
  styles={{ item: { borderRadius: 10 } }}
  renderItem={(t, i) => <div>{i + 1}. {t}</div>}
/>`

  return (
    <DemoBox
      title="Slots — List (classNames + styles)"
      description="Same API as Table. Every slot key is declared in the contract: root / header / footer / items / item / empty / pagination."
      code={code}
      flush
    >
      <div style={{ width: '100%' }}>
        <SlotLegend
          items={[
            { label: 'root', color: 'var(--sg-color-primary)' },
            { label: 'header', color: '#ff9800' },
            { label: 'item', color: 'var(--sg-color-success)' },
          ]}
        />
        <List
          bordered
          header="Styling principles"
          footer="All three levels compose."
          dataSource={listData}
          classNames={{
            header: 'demo-list-header',
            item: 'demo-list-item',
          }}
          styles={{ item: { borderRadius: 10 } }}
          renderItem={(t: string, i: number) => (
            <div style={{ padding: '8px 0' }}>
              {i + 1}. {t}
            </div>
          )}
        />
      </div>
    </DemoBox>
  )
}

// ──────────────────────────────────────────────────────────────────────────
// 13. Conditional List items (rowClassName)
// ──────────────────────────────────────────────────────────────────────────

function ConditionalList() {
  const items = [
    { id: 1, title: 'Override tokens', featured: false },
    { id: 2, title: 'Slot classNames/styles', featured: true },
    { id: 3, title: 'Unstyled', featured: false },
    { id: 4, title: 'Dark theme via data-sg-theme', featured: false },
  ]

  const code = `<List
  dataSource={items}
  rowClassName={(item) => item.featured ? 'demo-list-item-featured' : ''}
  renderItem={(it) => (
    <List.Item actions={[<Tag color="primary">#{it.id}</Tag>]}>
      {it.title}
    </List.Item>
  )}
/>`

  return (
    <DemoBox
      title="Conditional List items (rowClassName)"
      description="Pick items dynamically — pinned, featured, read, unread — with one function."
      code={code}
      flush
    >
      <List
        bordered
        dataSource={items}
        rowClassName={(item: unknown) =>
          (item as (typeof items)[number]).featured ? 'demo-list-item-featured' : ''
        }
        renderItem={(it: unknown) => {
          const item = it as (typeof items)[number]
          return (
            <List.Item actions={[<Tag key="id">#{item.id}</Tag>]}>{item.title}</List.Item>
          )
        }}
      />
    </DemoBox>
  )
}

// ──────────────────────────────────────────────────────────────────────────
// 14. Unstyled mix
// ──────────────────────────────────────────────────────────────────────────

function UnstyledMix() {
  const [open, setOpen] = useState(false)

  const code = `<Button unstyled className="demo-unstyled-btn">Custom button</Button>
<Input unstyled className="demo-unstyled-input" placeholder="Bring your own CSS" />
<Modal unstyled open={open} onClose={close} title="Custom modal" className="my-modal" />`

  return (
    <DemoBox
      title="Unstyled: full visual control"
      description="Each component rendered with unstyled keeps semantics (roles, aria-*, focus trap) but ships zero default CSS."
      code={code}
    >
      <div className="demo-unstyled-card" style={{ width: '100%' }}>
        <div className="demo-unstyled-card-title">Unstyled wrapper</div>
        <div className="demo-unstyled-card-row">
          <Button unstyled className="demo-unstyled-btn" onClick={() => setOpen(true)}>
            Open custom modal
          </Button>
          <Input unstyled className="demo-unstyled-input" placeholder="Bring your own CSS" />
        </div>
        <Modal
          unstyled
          open={open}
          onClose={() => setOpen(false)}
          title="Custom modal"
          className="demo-unstyled-card"
        >
          <div style={{ padding: 12, fontSize: 14 }}>
            This modal shipped with no CSS from the library. Semantics (role, aria-modal, focus trap)
            are still wired up.
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, padding: 8 }}>
            <Button unstyled className="demo-unstyled-btn" onClick={() => setOpen(false)}>
              Close
            </Button>
          </div>
        </Modal>
      </div>
    </DemoBox>
  )
}

// ──────────────────────────────────────────────────────────────────────────
// 15. Per-feature brand (composed recipe)
// ──────────────────────────────────────────────────────────────────────────

function PerFeatureBrand() {
  const [radius, setRadius] = useState(10)
  const [primary, setPrimary] = useState('#7c3aed')

  const scopeStyle = useMemo(
    () => ({
      ['--sg-color-primary' as never]: primary,
      ['--sg-color-primary-hover' as never]: primary,
      ['--sg-color-primary-bg' as never]: `color-mix(in srgb, ${primary} 18%, var(--sg-color-bg) 82%)`,
      ['--sg-border-radius' as never]: `${radius}px`,
      ['--sg-btn-radius' as never]: `${radius}px`,
      ['--sg-input-radius' as never]: `${radius}px`,
      ['--sg-table-header-bg' as never]: `color-mix(in srgb, ${primary} 10%, var(--sg-color-bg) 90%)`,
      ['--sg-table-row-hover-bg' as never]: `color-mix(in srgb, ${primary} 6%, var(--sg-color-bg) 94%)`,
    }),
    [primary, radius],
  )

  const code = `const scope = {
  ['--sg-color-primary' as any]: primary,
  ['--sg-color-primary-bg' as any]: mix(primary, bg, 18%),
  ['--sg-border-radius' as any]: \`\${radius}px\`,
  ['--sg-btn-radius' as any]: \`\${radius}px\`,
  ['--sg-input-radius' as any]: \`\${radius}px\`,
  ['--sg-table-header-bg' as any]: mix(primary, bg, 10%),
}

<div style={scope}>...</div>`

  const columns: TableColumn[] = [
    { key: 'name', title: 'Name', width: 160 },
    { key: 'score', title: 'Score', width: 100, align: 'right' },
    {
      key: 'status',
      title: 'Status',
      width: 120,
      render: (v) => <Tag color={v === 'active' ? 'success' : 'default'}>{String(v)}</Tag>,
    },
  ]

  return (
    <DemoBox
      title="Per-feature brand (composed)"
      description="Interactive: move the slider, pick a colour. One scope restyles a whole feature — buttons, inputs, table header, row hover — with no rebuild."
      code={code}
      flush
    >
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 12,
            alignItems: 'center',
            padding: '12px 16px',
            borderBottom: '1px solid var(--sg-color-border-secondary)',
          }}
        >
          <label style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 13 }}>
            Primary
            <input
              type="color"
              value={primary}
              onChange={(e) => setPrimary(e.target.value)}
              style={{ width: 36, height: 26, border: 'none', background: 'none' }}
            />
          </label>
          <label style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 13 }}>
            Radius
            <input
              type="range"
              min={0}
              max={20}
              value={radius}
              onChange={(e) => setRadius(Number(e.target.value))}
            />
            <code style={{ padding: '2px 6px' }}>{radius}px</code>
          </label>
        </div>
        <div style={scopeStyle}>
          <div style={{ padding: '16px 24px', display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Button type="primary">Primary</Button>
            <Button>Default</Button>
            <Input style={{ width: 220 }} placeholder="Scoped input" />
          </div>
          <Table columns={columns} data={tableData} showPagination={false} />
        </div>
      </div>
    </DemoBox>
  )
}

// ──────────────────────────────────────────────────────────────────────────
// Helpers
// ──────────────────────────────────────────────────────────────────────────

function SlotLegend({ items }: { items: Array<{ label: string; color: string }> }) {
  return (
    <div className="demo-slot-legend" style={{ padding: '8px 12px' }}>
      {items.map((it) => (
        <span key={it.label} className="demo-slot-legend-item" style={{ color: it.color }}>
          <code style={{ fontSize: 11, background: 'transparent' }}>{it.label}</code>
        </span>
      ))}
    </div>
  )
}
