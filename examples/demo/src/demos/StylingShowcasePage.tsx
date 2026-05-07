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
import { useStylingShowcaseDocStrings } from './styling-showcase-doc/useStylingShowcaseDocStrings'

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
  const t = useStylingShowcaseDocStrings()
  return (
    <ComponentDoc
      title={t.pageTitle}
      badge={t.pageBadge}
      crumbs={[t.crumbGuide, t.crumbStylingShowcase]}
      description={t.pageLead}
      whenToUse={[t.pageWhen1, t.pageWhen2, t.pageWhen3]}
      notes={
        <>
          {t.notesPart1}
          <code>docs/styling-contract.md</code>
          {t.notesPart2}
          <code>docs/styling-recipes.md</code>
          {t.notesPart3}
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
  const t = useStylingShowcaseDocStrings()
  const code = `/* Every palette token is stable. */
var(--sg-blue-1) … var(--sg-blue-10)
var(--sg-gray-1) … var(--sg-gray-10)
var(--sg-red-1) … var(--sg-red-10)
var(--sg-green-1) … var(--sg-green-10)
var(--sg-orange-1) … var(--sg-orange-10)`

  return (
    <DemoBox
      title={t.recipePaletteTitle}
      description={t.recipePaletteDesc}
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
  const t = useStylingShowcaseDocStrings()
  const code = `/* Semantic tokens follow data-sg-theme="dark|light".
   Override them to re-skin without touching components. */
var(--sg-color-bg)
var(--sg-color-text)
var(--sg-color-primary)
var(--sg-color-success) | --sg-color-error | --sg-color-warning`

  return (
    <DemoBox
      title={t.recipeSemanticTitle}
      description={t.recipeSemanticDesc}
      code={code}
    >
      <div className="demo-swatches">
        {semanticTokens.map((token) => (
          <div key={token} className="demo-swatch">
            <div className="demo-swatch-box" style={{ background: `var(${token})` }} />
            <div className="demo-swatch-meta">
              <strong>{token}</strong>
              {t.swatchSemanticBadge}
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
  const t = useStylingShowcaseDocStrings()
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
      title={t.recipeScopedBrandTitle}
      description={t.recipeScopedBrandDesc}
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
        <h4>{t.recipeScopedBrandHeading}</h4>
        <div className="demo-scope-row">
          <Button type="primary">{t.scopedBrandPrimary}</Button>
          <Button>{t.scopedBrandDefault}</Button>
          <Input style={{ width: 240 }} placeholder={t.scopedBrandInputPlaceholder} />
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
  const t = useStylingShowcaseDocStrings()
  const code = `<div data-sg-theme="dark" style={{ padding: 16, borderRadius: 8, background: '#0d1117' }}>
  <Button type="primary">Primary</Button>
  <Input placeholder="Dark input" />
  <Tag color="success">active</Tag>
</div>`

  return (
    <DemoBox
      title={t.recipeDarkTitle}
      description={t.recipeDarkDesc}
      code={code}
    >
      <div data-sg-theme="dark" className="demo-dark-scope" style={{ width: '100%' }}>
        <div className="demo-scope-row" style={{ gap: 12 }}>
          <Button type="primary">{t.darkPrimary}</Button>
          <Button>{t.darkDefault}</Button>
          <Input style={{ width: 220 }} placeholder={t.darkInputPlaceholder} />
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
  const t = useStylingShowcaseDocStrings()
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
      title={t.recipeBtnTokensTitle}
      description={t.recipeBtnTokensDesc}
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
        <Button type="primary">{t.pillPrimary}</Button>
        <Button>{t.pillDefault}</Button>
        <Button type="dashed">{t.pillDashed}</Button>
      </div>
    </DemoBox>
  )
}

// ──────────────────────────────────────────────────────────────────────────
// 6. Component tokens: Input (radius + height)
// ──────────────────────────────────────────────────────────────────────────

function ComponentTokensInput() {
  const t = useStylingShowcaseDocStrings()
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
      title={t.recipeInputTokensTitle}
      description={t.recipeInputTokensDesc}
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
        <Input placeholder={t.roundedInputPlaceholder} style={{ width: 260 }} />
        <Select
          options={[
            { value: 'a', label: 'Alpha' },
            { value: 'b', label: 'Beta' },
            { value: 'c', label: 'Gamma' },
          ]}
          placeholder={t.matchingSelectPlaceholder}
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
  const t = useStylingShowcaseDocStrings()
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
      title={t.recipeTableTokensTitle}
      description={t.recipeTableTokensDesc}
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
  const t = useStylingShowcaseDocStrings()
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
      title={t.recipeSlotsTableTitle}
      description={t.recipeSlotsTableDesc}
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
  const t = useStylingShowcaseDocStrings()
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
      title={t.recipeHeaderColTitle}
      description={t.recipeHeaderColDesc}
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
  const t = useStylingShowcaseDocStrings()
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
      title={t.recipeCondRowsTitle}
      description={t.recipeCondRowsDesc}
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
  const t = useStylingShowcaseDocStrings()
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
      title={t.recipeCondCellsTitle}
      description={t.recipeCondCellsDesc}
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
  const t = useStylingShowcaseDocStrings()
  const listData = [t.listItem1, t.listItem2, t.listItem3, t.listItem4]
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
      title={t.recipeSlotsListTitle}
      description={t.recipeSlotsListDesc}
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
          header={t.slotsListHeader}
          footer={t.slotsListFooter}
          dataSource={listData}
          classNames={{
            header: 'demo-list-header',
            item: 'demo-list-item',
          }}
          styles={{ item: { borderRadius: 10 } }}
          renderItem={(text: string, i: number) => (
            <div style={{ padding: '8px 0' }}>
              {i + 1}. {text}
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
  const t = useStylingShowcaseDocStrings()
  const items = [
    { id: 1, title: t.condListItem1, featured: false },
    { id: 2, title: t.condListItem2, featured: true },
    { id: 3, title: t.condListItem3, featured: false },
    { id: 4, title: t.condListItem4, featured: false },
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
      title={t.recipeCondListTitle}
      description={t.recipeCondListDesc}
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
  const t = useStylingShowcaseDocStrings()
  const [open, setOpen] = useState(false)

  const code = `<Button unstyled className="demo-unstyled-btn">Custom button</Button>
<Input unstyled className="demo-unstyled-input" placeholder="Bring your own CSS" />
<Modal unstyled open={open} onClose={close} title="Custom modal" className="my-modal" />`

  return (
    <DemoBox
      title={t.recipeUnstyledTitle}
      description={t.recipeUnstyledDesc}
      code={code}
    >
      <div className="demo-unstyled-card" style={{ width: '100%' }}>
        <div className="demo-unstyled-card-title">{t.unstyledWrapperTitle}</div>
        <div className="demo-unstyled-card-row">
          <Button unstyled className="demo-unstyled-btn" onClick={() => setOpen(true)}>
            {t.unstyledOpenButton}
          </Button>
          <Input unstyled className="demo-unstyled-input" placeholder={t.unstyledInputPlaceholder} />
        </div>
        <Modal
          unstyled
          open={open}
          onClose={() => setOpen(false)}
          title={t.unstyledModalTitle}
          className="demo-unstyled-card"
        >
          <div style={{ padding: 12, fontSize: 14 }}>{t.unstyledModalBody}</div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, padding: 8 }}>
            <Button unstyled className="demo-unstyled-btn" onClick={() => setOpen(false)}>
              {t.unstyledModalClose}
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
  const t = useStylingShowcaseDocStrings()
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
      title={t.recipePerFeatureTitle}
      description={t.recipePerFeatureDesc}
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
            {t.perFeatureLabelPrimary}
            <input
              type="color"
              value={primary}
              onChange={(e) => setPrimary(e.target.value)}
              style={{ width: 36, height: 26, border: 'none', background: 'none' }}
            />
          </label>
          <label style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 13 }}>
            {t.perFeatureLabelRadius}
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
            <Button type="primary">{t.perFeaturePrimary}</Button>
            <Button>{t.perFeatureDefault}</Button>
            <Input style={{ width: 220 }} placeholder={t.perFeatureInputPlaceholder} />
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
