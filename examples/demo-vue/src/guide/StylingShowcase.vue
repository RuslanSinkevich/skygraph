<script setup lang="ts">
/**
 * Guide → Styling Showcase (`/guide/styling-showcase`).
 *
 * Vue 3 port of `examples/demo/src/demos/StylingShowcasePage.tsx`. The
 * page renders the same 15 styling recipes the React side does, so the
 * two demos stay paritetic — palette, semantic swatches, scoped brand,
 * dark scope, four component-token recipes (Button/Input/Table), four
 * slot recipes (Table classNames/styles, per-column headerClassName,
 * conditional rows, conditional cells via `#cell` slot), List slots,
 * conditional List items, unstyled mix, and the per-feature
 * interactive brand composer.
 *
 * Vue-side deltas vs React (kept narrow):
 *   - React `column.cellClassName` is React-only on `SgTable`. The Vue
 *     parity recipe wires the same condition through the `#cell` slot
 *     — same DOM contract (`.demo-table-cell-*` classes), same UX.
 *   - Helper classes (`.demo-swatches`, `.demo-scope-card`, `.demo-
 *     unstyled-card`, `.demo-table-*`, `.demo-list-*`) ship via
 *     `./styling-showcase.css` instead of the global `src/style.css`
 *     because Vue's table demo CSS reuses some of the names — scoping
 *     them with `.guide-styling` keeps both pages isolated. See the
 *     file header for the rationale.
 */
import { computed, ref } from 'vue'
import {
  SgBadge,
  SgButton,
  SgInput,
  SgList,
  SgModal,
  SgProgress,
  SgSelect,
  SgSwitch,
  SgTable,
  SgTag,
} from '@skygraph/vue'
import type { TableColumn } from '@skygraph/vue'
import { ComponentDoc, DemoBox } from '../demos/components'
import { useStylingShowcaseDocStrings } from './styling-showcase-doc/useStrings'
import './styling-showcase.css'

const t = useStylingShowcaseDocStrings()

// ── Shared fixtures ────────────────────────────────────────────────────

// SgTable's `data` prop expects `Record<string, unknown>`, so we keep
// the row payload as a plain index-signature object instead of a strict
// interface. This matches React's `RowData` shape in the React port.
type RowData = Record<string, unknown> & {
  name: string
  city: string
  status: 'active' | 'inactive' | 'pending'
  score: number
}

const tableData: Array<{ id: string; data: RowData }> = [
  { id: '1', data: { name: 'Alice', city: 'Moscow', status: 'active', score: 92 } },
  { id: '2', data: { name: 'Bob', city: 'Berlin', status: 'inactive', score: 41 } },
  { id: '3', data: { name: 'Charlie', city: 'Tokyo', status: 'active', score: 78 } },
  { id: '4', data: { name: 'Diana', city: 'Paris', status: 'pending', score: 55 } },
  { id: '5', data: { name: 'Eve', city: 'London', status: 'active', score: 88 } },
]

const paletteTokens: Array<{ name: string; shades: number }> = [
  { name: 'blue', shades: 10 },
  { name: 'gray', shades: 10 },
  { name: 'red', shades: 10 },
  { name: 'green', shades: 10 },
  { name: 'orange', shades: 10 },
]

const semanticTokens: string[] = [
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

function shadesOf(count: number): number[] {
  return Array.from({ length: count }, (_, i) => i + 1)
}

// ── Static columns ─────────────────────────────────────────────────────

const tableTokensColumns = computed<TableColumn[]>(() => [
  { key: 'name', title: 'Name', width: 160 },
  { key: 'city', title: 'City', width: 140 },
  { key: 'status', title: 'Status', width: 120 },
])

const slotsTableColumns = computed<TableColumn[]>(() => [
  { key: 'name', title: 'Name', width: 160, sortable: true },
  { key: 'city', title: 'City', width: 120 },
  { key: 'score', title: 'Score', width: 100, align: 'right' },
  { key: 'status', title: 'Status', width: 120 },
])

const headerColColumns = computed<TableColumn[]>(() => [
  { key: 'name', title: 'Name', sortable: true, width: 160, headerClassName: 'th-strong' },
  { key: 'city', title: 'City', width: 140 },
  { key: 'score', title: 'Score', width: 100, align: 'right', headerClassName: 'th-numeric' },
  { key: 'status', title: 'Status', width: 120, headerClassName: 'th-status' },
])

const conditionalRowsColumns = computed<TableColumn[]>(() => [
  { key: 'name', title: 'Name', width: 160 },
  { key: 'city', title: 'City', width: 140 },
  { key: 'score', title: 'Score', width: 100, align: 'right' },
  { key: 'status', title: 'Status', width: 120 },
])

const conditionalCellsColumns = computed<TableColumn[]>(() => [
  { key: 'name', title: 'Name', width: 160 },
  { key: 'city', title: 'City', width: 140 },
  { key: 'score', title: 'Score', width: 120, align: 'right' },
  { key: 'status', title: 'Status', width: 120 },
])

const perFeatureColumns = computed<TableColumn[]>(() => [
  { key: 'name', title: 'Name', width: 160 },
  { key: 'score', title: 'Score', width: 100, align: 'right' },
  { key: 'status', title: 'Status', width: 120 },
])

// ── Helpers ────────────────────────────────────────────────────────────

function scoreCellClass(score: number): string {
  if (score < 50) return 'demo-table-cell-critical'
  if (score >= 80) return 'demo-table-cell-ok'
  return ''
}

function rowFeaturedClass(row: Record<string, unknown>): string {
  const score = typeof row.score === 'number' ? row.score : 0
  return score >= 85 ? 'demo-table-row-featured' : ''
}

// ── List fixtures ──────────────────────────────────────────────────────

const slotsListData = computed(() => [
  t.value.listItem1,
  t.value.listItem2,
  t.value.listItem3,
  t.value.listItem4,
])

const conditionalListItems = computed(() => [
  { id: 1, title: t.value.condListItem1, featured: false },
  { id: 2, title: t.value.condListItem2, featured: true },
  { id: 3, title: t.value.condListItem3, featured: false },
  { id: 4, title: t.value.condListItem4, featured: false },
])

function listItemFeaturedClass(item: { featured: boolean }): string {
  return item.featured ? 'demo-list-item-featured' : ''
}

// ── Unstyled mix ───────────────────────────────────────────────────────

const unstyledModalOpen = ref(false)

// ── Per-feature brand composer ─────────────────────────────────────────

const radius = ref(10)
const primary = ref('#7c3aed')

const perFeatureScope = computed<Record<string, string>>(() => ({
  '--sg-color-primary': primary.value,
  '--sg-color-primary-hover': primary.value,
  '--sg-color-primary-bg': `color-mix(in srgb, ${primary.value} 18%, var(--sg-color-bg) 82%)`,
  '--sg-border-radius': `${radius.value}px`,
  '--sg-btn-radius': `${radius.value}px`,
  '--sg-input-radius': `${radius.value}px`,
  '--sg-table-header-bg': `color-mix(in srgb, ${primary.value} 10%, var(--sg-color-bg) 90%)`,
  '--sg-table-row-hover-bg': `color-mix(in srgb, ${primary.value} 6%, var(--sg-color-bg) 94%)`,
}))

function onPrimaryInput(event: Event) {
  primary.value = (event.target as HTMLInputElement).value
}

function onRadiusInput(event: Event) {
  radius.value = Number((event.target as HTMLInputElement).value)
}

// ── Static code snippets (rendered as-is in DemoBox) ──────────────────

const PALETTE_CODE = `<!-- Every palette token is stable. -->
var(--sg-blue-1) … var(--sg-blue-10)
var(--sg-gray-1) … var(--sg-gray-10)
var(--sg-red-1) … var(--sg-red-10)
var(--sg-green-1) … var(--sg-green-10)
var(--sg-orange-1) … var(--sg-orange-10)`

const SEMANTIC_CODE = `<!-- Semantic tokens follow data-sg-theme="dark|light".
     Override them to re-skin without touching components. -->
var(--sg-color-bg)
var(--sg-color-text)
var(--sg-color-primary)
var(--sg-color-success) | --sg-color-error | --sg-color-warning`

const SCOPED_BRAND_CODE = `<div
  :style="{
    '--sg-color-primary': '#e91e63',
    '--sg-color-primary-hover': '#c2185b',
    '--sg-color-primary-bg': '#fce4ec',
    '--sg-border-radius': '10px',
    '--sg-font-size': '15px',
  }"
>
  <SgButton type="primary">Primary</SgButton>
  <SgInput placeholder="Inherits tokens" />
  <SgSwitch :modelValue="true" />
  <SgProgress :percent="60" />
</div>`

const DARK_SCOPE_CODE = `<div
  data-sg-theme="dark"
  :style="{ padding: '16px', borderRadius: '8px', background: '#0d1117' }"
>
  <SgButton type="primary">Primary</SgButton>
  <SgInput placeholder="Dark input" />
  <SgTag color="success">active</SgTag>
</div>`

const BTN_TOKENS_CODE = `<div
  :style="{
    '--sg-btn-height': '40px',
    '--sg-btn-radius': '999px',
    '--sg-btn-font-size': '15px',
    '--sg-btn-padding': '0 20px',
  }"
>
  <SgButton type="primary">Pill primary</SgButton>
  <SgButton>Pill default</SgButton>
</div>`

const INPUT_TOKENS_CODE = `<div
  :style="{
    '--sg-input-height': '44px',
    '--sg-input-radius': '14px',
    '--sg-input-font-size': '16px',
  }"
>
  <SgInput placeholder="Rounded soft input" />
  <SgSelect
    :options="[
      { value: 'a', label: 'Alpha' },
      { value: 'b', label: 'Beta' },
    ]"
    placeholder="Matching select"
  />
</div>`

const TABLE_TOKENS_CODE = `<div
  :style="{
    '--sg-table-row-height': '56px',
    '--sg-table-header-bg': '#fff7ed',
    '--sg-table-row-hover-bg': '#fff4e5',
    '--sg-table-cell-padding': '12px 16px',
  }"
>
  <SgTable :columns="cols" :data="data" :show-pagination="false" />
</div>`

const SLOTS_TABLE_CODE = `<SgTable
  :columns="cols"
  :data="data"
  searchable
  :class-names="{
    root: 'demo-table-root',
    toolbar: 'demo-table-toolbar',
    headerCell: 'demo-table-th',
    bodyCell: 'demo-table-td',
  }"
  :styles="{
    headerCell: { fontSize: 13, letterSpacing: '0.05em' },
    bodyCell: { fontFamily: 'monospace' },
  }"
/>`

const HEADER_COL_CODE = `<SgTable
  :columns="[
    { key: 'name',   title: 'Name',   headerClassName: 'th-strong' },
    { key: 'score',  title: 'Score',  headerClassName: 'th-numeric' },
    { key: 'status', title: 'Status', headerClassName: 'th-status' },
  ]"
  :data="data"
/>

.th-strong  { text-transform: uppercase; letter-spacing: 0.05em; }
.th-numeric { font-variant-numeric: tabular-nums; }
.th-status  { color: var(--sg-color-primary); }`

const COND_ROWS_CODE = `<SgTable
  :columns="cols"
  :data="data"
  :row-class-name="(row) =>
    (row.score ?? 0) >= 85 ? 'demo-table-row-featured' : ''"
/>`

const COND_CELLS_CODE = `<!-- Vue parity for React's column.cellClassName:
     wrap body cells through the #cell slot and emit the same class. -->
<SgTable :columns="cols" :data="data">
  <template #cell="{ column, value }">
    <span
      v-if="column.key === 'score'"
      :class="scoreCellClass(Number(value))"
    >{{ value }}</span>
  </template>
</SgTable>`

const SLOTS_LIST_CODE = `<SgList
  bordered
  :header="'Styling principles'"
  :footer="'All three levels compose.'"
  :data-source="items"
  :class-names="{ header: 'demo-list-header', item: 'demo-list-item' }"
  :styles="{ item: { borderRadius: 10 } }"
>
  <template #default="{ item, index }">
    <div style="padding: 8px 0">{{ index + 1 }}. {{ item }}</div>
  </template>
</SgList>`

const COND_LIST_CODE = `<SgList
  bordered
  :data-source="items"
  :row-class-name="(item) => item.featured ? 'demo-list-item-featured' : ''"
>
  <template #default="{ item }">
    <div style="display: flex; gap: 8px; align-items: center; justify-content: space-between">
      <span>{{ item.title }}</span>
      <SgTag>#{{ item.id }}</SgTag>
    </div>
  </template>
</SgList>`

const UNSTYLED_CODE = `<SgButton :unstyled="true" class="demo-unstyled-btn">Custom button</SgButton>
<SgInput :unstyled="true" class="demo-unstyled-input" placeholder="Bring your own CSS" />
<SgModal :unstyled="true" :open="open" title="Custom modal" @close="close" />`

const PER_FEATURE_CODE = `const scope = {
  '--sg-color-primary': primary,
  '--sg-color-primary-bg': \`color-mix(in srgb, \${primary} 18%, var(--sg-color-bg) 82%)\`,
  '--sg-border-radius': \`\${radius}px\`,
  '--sg-btn-radius': \`\${radius}px\`,
  '--sg-input-radius': \`\${radius}px\`,
  '--sg-table-header-bg': \`color-mix(in srgb, \${primary} 10%, var(--sg-color-bg) 90%)\`,
}

<div :style="scope">…</div>`
</script>

<template>
  <div class="guide-styling">
    <ComponentDoc
      :title="t.pageTitle"
      :badge="t.pageBadge"
      :crumbs="[t.crumbGuide, t.crumbStylingShowcase]"
      :description="t.pageLead"
      :when-to-use="[t.pageWhen1, t.pageWhen2, t.pageWhen3]"
    >
      <template #notes>
        {{ t.notesPart1 }}
        <code>docs/styling-contract.md</code>
        {{ t.notesPart2 }}
        <code>docs/styling-recipes.md</code>
        {{ t.notesPart3 }}
      </template>

      <!-- 1. Palette swatches ────────────────────────────────────────── -->
      <DemoBox
        :title="t.recipePaletteTitle"
        :description="t.recipePaletteDesc"
        :code="PALETTE_CODE"
      >
        <div class="demo-swatches">
          <template v-for="p in paletteTokens" :key="p.name">
            <div
              v-for="shade in shadesOf(p.shades)"
              :key="`${p.name}-${shade}`"
              class="demo-swatch"
            >
              <div
                class="demo-swatch-box"
                :style="{ background: `var(--sg-${p.name}-${shade})` }"
              />
              <div class="demo-swatch-meta">
                <strong>--sg-{{ p.name }}-{{ shade }}</strong>
                {{ p.name }}-{{ shade }}
              </div>
            </div>
          </template>
        </div>
      </DemoBox>

      <!-- 2. Semantic swatches ───────────────────────────────────────── -->
      <DemoBox
        :title="t.recipeSemanticTitle"
        :description="t.recipeSemanticDesc"
        :code="SEMANTIC_CODE"
      >
        <div class="demo-swatches">
          <div v-for="token in semanticTokens" :key="token" class="demo-swatch">
            <div class="demo-swatch-box" :style="{ background: `var(${token})` }" />
            <div class="demo-swatch-meta">
              <strong>{{ token }}</strong>
              {{ t.swatchSemanticBadge }}
            </div>
          </div>
        </div>
      </DemoBox>

      <!-- 3. Scoped brand via tokens ─────────────────────────────────── -->
      <DemoBox
        :title="t.recipeScopedBrandTitle"
        :description="t.recipeScopedBrandDesc"
        :code="SCOPED_BRAND_CODE"
      >
        <div
          class="demo-scope-card"
          :style="{
            width: '100%',
            '--sg-color-primary': '#e91e63',
            '--sg-color-primary-hover': '#c2185b',
            '--sg-color-primary-bg': '#fce4ec',
            '--sg-border-radius': '10px',
            '--sg-font-size': '15px',
          }"
        >
          <h4>{{ t.recipeScopedBrandHeading }}</h4>
          <div class="demo-scope-row">
            <SgButton type="primary">{{ t.scopedBrandPrimary }}</SgButton>
            <SgButton>{{ t.scopedBrandDefault }}</SgButton>
            <SgInput :style="{ width: '240px' }" :placeholder="t.scopedBrandInputPlaceholder" />
            <SgSwitch :model-value="true" />
          </div>
          <SgProgress :percent="60" />
        </div>
      </DemoBox>

      <!-- 4. Dark scope ──────────────────────────────────────────────── -->
      <DemoBox :title="t.recipeDarkTitle" :description="t.recipeDarkDesc" :code="DARK_SCOPE_CODE">
        <div data-sg-theme="dark" class="demo-dark-scope" :style="{ width: '100%' }">
          <div class="demo-scope-row" :style="{ gap: '12px' }">
            <SgButton type="primary">{{ t.darkPrimary }}</SgButton>
            <SgButton>{{ t.darkDefault }}</SgButton>
            <SgInput :style="{ width: '220px' }" :placeholder="t.darkInputPlaceholder" />
            <SgTag color="success">active</SgTag>
            <SgTag color="error">error</SgTag>
            <SgBadge :count="5" />
          </div>
        </div>
      </DemoBox>

      <!-- 5. Component tokens — Button ───────────────────────────────── -->
      <DemoBox
        :title="t.recipeBtnTokensTitle"
        :description="t.recipeBtnTokensDesc"
        :code="BTN_TOKENS_CODE"
      >
        <div
          class="demo-scope-row"
          :style="{
            '--sg-btn-height': '40px',
            '--sg-btn-radius': '999px',
            '--sg-btn-font-size': '15px',
            '--sg-btn-padding': '0 20px',
          }"
        >
          <SgButton type="primary">{{ t.pillPrimary }}</SgButton>
          <SgButton>{{ t.pillDefault }}</SgButton>
          <SgButton type="dashed">{{ t.pillDashed }}</SgButton>
        </div>
      </DemoBox>

      <!-- 6. Component tokens — Input / Select ───────────────────────── -->
      <DemoBox
        :title="t.recipeInputTokensTitle"
        :description="t.recipeInputTokensDesc"
        :code="INPUT_TOKENS_CODE"
      >
        <div
          class="demo-scope-row"
          :style="{
            '--sg-input-height': '44px',
            '--sg-input-radius': '14px',
            '--sg-input-font-size': '16px',
          }"
        >
          <SgInput :placeholder="t.roundedInputPlaceholder" :style="{ width: '260px' }" />
          <SgSelect
            :options="[
              { value: 'a', label: 'Alpha' },
              { value: 'b', label: 'Beta' },
              { value: 'c', label: 'Gamma' },
            ]"
            :placeholder="t.matchingSelectPlaceholder"
            :style="{ width: '220px' }"
          />
        </div>
      </DemoBox>

      <!-- 7. Component tokens — Table ────────────────────────────────── -->
      <DemoBox
        :title="t.recipeTableTokensTitle"
        :description="t.recipeTableTokensDesc"
        :code="TABLE_TOKENS_CODE"
        flush
      >
        <div
          :style="{
            width: '100%',
            '--sg-table-row-height': '56px',
            '--sg-table-header-bg': '#fff7ed',
            '--sg-table-row-hover-bg': '#fff4e5',
            '--sg-table-cell-padding': '12px 16px',
          }"
        >
          <SgTable :columns="tableTokensColumns" :data="tableData" :show-pagination="false">
            <template #cell="{ column, value }">
              <SgTag
                v-if="column.key === 'status'"
                :color="value === 'active' ? 'success' : 'default'"
                >{{ String(value) }}</SgTag
              >
            </template>
          </SgTable>
        </div>
      </DemoBox>

      <!-- 8. Slots — Table ───────────────────────────────────────────── -->
      <DemoBox
        :title="t.recipeSlotsTableTitle"
        :description="t.recipeSlotsTableDesc"
        :code="SLOTS_TABLE_CODE"
        flush
      >
        <div :style="{ width: '100%' }">
          <div class="demo-slot-legend" :style="{ padding: '8px 12px' }">
            <span class="demo-slot-legend-item" :style="{ color: 'var(--sg-color-primary)' }">
              <code :style="{ fontSize: '11px', background: 'transparent' }">root</code>
            </span>
            <span class="demo-slot-legend-item" :style="{ color: '#ff9800' }">
              <code :style="{ fontSize: '11px', background: 'transparent' }">toolbar</code>
            </span>
            <span class="demo-slot-legend-item" :style="{ color: 'var(--sg-color-success)' }">
              <code :style="{ fontSize: '11px', background: 'transparent' }">headerCell</code>
            </span>
            <span class="demo-slot-legend-item" :style="{ color: 'var(--sg-color-warning)' }">
              <code :style="{ fontSize: '11px', background: 'transparent' }">bodyCell</code>
            </span>
          </div>
          <SgTable
            :columns="slotsTableColumns"
            :data="tableData"
            searchable
            :show-pagination="false"
            :class-names="{
              root: 'demo-table-root',
              toolbar: 'demo-table-toolbar',
              headerCell: 'demo-table-th',
              bodyCell: 'demo-table-td',
            }"
            :styles="{
              headerCell: { fontSize: 13, letterSpacing: '0.05em' },
              bodyCell: { fontFamily: 'SFMono-Regular, Consolas, Menlo, monospace' },
            }"
          >
            <template #cell="{ column, value }">
              <SgTag
                v-if="column.key === 'status'"
                :color="value === 'active' ? 'success' : 'default'"
                >{{ String(value) }}</SgTag
              >
            </template>
          </SgTable>
        </div>
      </DemoBox>

      <!-- 9. Per-column headerClassName ──────────────────────────────── -->
      <DemoBox
        :title="t.recipeHeaderColTitle"
        :description="t.recipeHeaderColDesc"
        :code="HEADER_COL_CODE"
        flush
      >
        <div :style="{ width: '100%' }">
          <SgTable :columns="headerColColumns" :data="tableData" :show-pagination="false">
            <template #cell="{ column, value }">
              <SgTag
                v-if="column.key === 'status'"
                :color="value === 'active' ? 'success' : 'default'"
                >{{ String(value) }}</SgTag
              >
            </template>
          </SgTable>
        </div>
      </DemoBox>

      <!-- 10. Conditional rows ───────────────────────────────────────── -->
      <DemoBox
        :title="t.recipeCondRowsTitle"
        :description="t.recipeCondRowsDesc"
        :code="COND_ROWS_CODE"
        flush
      >
        <div :style="{ width: '100%' }">
          <SgTable
            :columns="conditionalRowsColumns"
            :data="tableData"
            :show-pagination="false"
            :row-class-name="rowFeaturedClass"
          >
            <template #cell="{ column, value }">
              <SgTag
                v-if="column.key === 'status'"
                :color="value === 'active' ? 'success' : 'default'"
                >{{ String(value) }}</SgTag
              >
            </template>
          </SgTable>
        </div>
      </DemoBox>

      <!-- 11. Conditional cells (#cell slot) ─────────────────────────── -->
      <DemoBox
        :title="t.recipeCondCellsTitle"
        :description="t.recipeCondCellsDesc"
        :code="COND_CELLS_CODE"
        flush
      >
        <div :style="{ width: '100%' }">
          <SgTable :columns="conditionalCellsColumns" :data="tableData" :show-pagination="false">
            <template #cell="{ column, value }">
              <span v-if="column.key === 'score'" :class="scoreCellClass(Number(value))">{{
                String(value)
              }}</span>
              <SgTag
                v-else-if="column.key === 'status'"
                :color="value === 'active' ? 'success' : 'default'"
                >{{ String(value) }}</SgTag
              >
            </template>
          </SgTable>
        </div>
      </DemoBox>

      <!-- 12. Slots — List ───────────────────────────────────────────── -->
      <DemoBox
        :title="t.recipeSlotsListTitle"
        :description="t.recipeSlotsListDesc"
        :code="SLOTS_LIST_CODE"
        flush
      >
        <div :style="{ width: '100%' }">
          <div class="demo-slot-legend" :style="{ padding: '8px 12px' }">
            <span class="demo-slot-legend-item" :style="{ color: 'var(--sg-color-primary)' }">
              <code :style="{ fontSize: '11px', background: 'transparent' }">root</code>
            </span>
            <span class="demo-slot-legend-item" :style="{ color: '#ff9800' }">
              <code :style="{ fontSize: '11px', background: 'transparent' }">header</code>
            </span>
            <span class="demo-slot-legend-item" :style="{ color: 'var(--sg-color-success)' }">
              <code :style="{ fontSize: '11px', background: 'transparent' }">item</code>
            </span>
          </div>
          <SgList
            bordered
            :header="t.slotsListHeader"
            :footer="t.slotsListFooter"
            :data-source="slotsListData"
            :class-names="{ header: 'demo-list-header', item: 'demo-list-item' }"
            :styles="{ item: { borderRadius: 10 } }"
          >
            <template #default="{ item, index }">
              <div :style="{ padding: '8px 0' }">{{ index + 1 }}. {{ item }}</div>
            </template>
          </SgList>
        </div>
      </DemoBox>

      <!-- 13. Conditional List items ─────────────────────────────────── -->
      <DemoBox
        :title="t.recipeCondListTitle"
        :description="t.recipeCondListDesc"
        :code="COND_LIST_CODE"
        flush
      >
        <SgList
          bordered
          :data-source="conditionalListItems"
          :row-class-name="listItemFeaturedClass"
        >
          <template #default="{ item }">
            <div
              :style="{
                display: 'flex',
                gap: '8px',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
              }"
            >
              <span>{{ item.title }}</span>
              <SgTag>#{{ item.id }}</SgTag>
            </div>
          </template>
        </SgList>
      </DemoBox>

      <!-- 14. Unstyled mix ───────────────────────────────────────────── -->
      <DemoBox
        :title="t.recipeUnstyledTitle"
        :description="t.recipeUnstyledDesc"
        :code="UNSTYLED_CODE"
      >
        <div class="demo-unstyled-card" :style="{ width: '100%' }">
          <div class="demo-unstyled-card-title">{{ t.unstyledWrapperTitle }}</div>
          <div class="demo-unstyled-card-row">
            <SgButton :unstyled="true" class="demo-unstyled-btn" @click="unstyledModalOpen = true">
              {{ t.unstyledOpenButton }}
            </SgButton>
            <SgInput
              :unstyled="true"
              class="demo-unstyled-input"
              :placeholder="t.unstyledInputPlaceholder"
            />
          </div>
          <SgModal
            :unstyled="true"
            :open="unstyledModalOpen"
            :title="t.unstyledModalTitle"
            @close="unstyledModalOpen = false"
          >
            <div class="demo-unstyled-card">
              <div :style="{ padding: '12px', fontSize: '14px' }">
                {{ t.unstyledModalBody }}
              </div>
              <div
                :style="{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  gap: '8px',
                  padding: '8px',
                }"
              >
                <SgButton
                  :unstyled="true"
                  class="demo-unstyled-btn"
                  @click="unstyledModalOpen = false"
                >
                  {{ t.unstyledModalClose }}
                </SgButton>
              </div>
            </div>
          </SgModal>
        </div>
      </DemoBox>

      <!-- 15. Per-feature brand composer ─────────────────────────────── -->
      <DemoBox
        :title="t.recipePerFeatureTitle"
        :description="t.recipePerFeatureDesc"
        :code="PER_FEATURE_CODE"
        flush
      >
        <div :style="{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }">
          <div
            :style="{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '12px',
              alignItems: 'center',
              padding: '12px 16px',
              borderBottom: '1px solid var(--sg-color-border-secondary)',
            }"
          >
            <label :style="{ display: 'flex', gap: '8px', alignItems: 'center', fontSize: '13px' }">
              {{ t.perFeatureLabelPrimary }}
              <input
                type="color"
                :value="primary"
                :style="{ width: '36px', height: '26px', border: 'none', background: 'none' }"
                @input="onPrimaryInput"
              />
            </label>
            <label :style="{ display: 'flex', gap: '8px', alignItems: 'center', fontSize: '13px' }">
              {{ t.perFeatureLabelRadius }}
              <input type="range" :min="0" :max="20" :value="radius" @input="onRadiusInput" />
              <code :style="{ padding: '2px 6px' }">{{ radius }}px</code>
            </label>
          </div>
          <div :style="perFeatureScope">
            <div :style="{ padding: '16px 24px', display: 'flex', gap: '12px', flexWrap: 'wrap' }">
              <SgButton type="primary">{{ t.perFeaturePrimary }}</SgButton>
              <SgButton>{{ t.perFeatureDefault }}</SgButton>
              <SgInput :style="{ width: '220px' }" :placeholder="t.perFeatureInputPlaceholder" />
            </div>
            <SgTable :columns="perFeatureColumns" :data="tableData" :show-pagination="false">
              <template #cell="{ column, value }">
                <SgTag
                  v-if="column.key === 'status'"
                  :color="value === 'active' ? 'success' : 'default'"
                  >{{ String(value) }}</SgTag
                >
              </template>
            </SgTable>
          </div>
        </div>
      </DemoBox>
    </ComponentDoc>
  </div>
</template>
