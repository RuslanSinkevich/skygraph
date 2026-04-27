import { ComponentDoc, DemoBox, PropsTable, CssVarsTable } from '../components'
import type { PropDef, CssVarDef } from '../components'

import { BasicPagination } from './pagination/Basic.demo'
import BasicSource from './pagination/Basic.demo?raw'
import { ManyPagesPagination } from './pagination/ManyPages.demo'
import ManyPagesSource from './pagination/ManyPages.demo?raw'
import { SimplePagination } from './pagination/Simple.demo'
import SimpleSource from './pagination/Simple.demo?raw'
import { ShowTotalPagination } from './pagination/ShowTotal.demo'
import ShowTotalSource from './pagination/ShowTotal.demo?raw'
import { SizeChangerPagination } from './pagination/SizeChanger.demo'
import SizeChangerSource from './pagination/SizeChanger.demo?raw'
import { DisabledPagination } from './pagination/Disabled.demo'
import DisabledSource from './pagination/Disabled.demo?raw'
import { TokensOverridePagination } from './pagination/TokensOverride.demo'
import TokensOverrideSource from './pagination/TokensOverride.demo?raw'
import { UnstyledPagination } from './pagination/Unstyled.demo'
import UnstyledSource from './pagination/Unstyled.demo?raw'

const paginationProps: PropDef[] = [
  { name: 'current', description: 'Current page (1-based). Clamped to [1, totalPages]', type: 'number' },
  { name: 'total', description: 'Total number of records', type: 'number' },
  { name: 'pageSize', description: 'Rows per page', type: 'number', default: '10' },
  { name: 'onChange', description: 'Fires when the user picks a different page', type: '(page: number) => void' },
  { name: 'onPageSizeChange', description: 'Fires when the user picks a new page size', type: '(size: number) => void' },
  { name: 'showTotal', description: 'Show "Total N" (boolean) or a custom (total, range) ⇒ ReactNode function', type: 'boolean | ((total, range: [number, number]) => ReactNode)' },
  { name: 'disabled', description: 'Disable all controls', type: 'boolean', default: 'false' },
  { name: 'simple', description: 'Compact "current / total" mode, hides numbered buttons', type: 'boolean', default: 'false' },
  { name: 'showSizeChanger', description: 'Show a <select> for page size', type: 'boolean', default: 'false' },
  { name: 'pageSizeOptions', description: 'Options in the size-changer <select>', type: 'number[]', default: '[10, 20, 50, 100]' },
  { name: 'showQuickJumper', description: 'Show a "Go to page" input', type: 'boolean', default: 'false' },
  { name: 'className', description: 'Wrapper className', type: 'string' },
  { name: 'style', description: 'Wrapper inline style', type: 'CSSProperties' },
  { name: 'unstyled', description: 'Drop every sg-pagination-* class (headless mode)', type: 'boolean', default: 'false' },
]

const paginationCssVars: CssVarDef[] = [
  { name: 'sg-color-bg', default: '#ffffff', description: 'Idle chip background' },
  { name: 'sg-color-border', default: 'rgba(5, 5, 5, 0.06)', description: 'Chip + disabled border' },
  { name: 'sg-color-text', default: 'rgba(0, 0, 0, 0.88)', description: 'Chip text colour + simple pager' },
  { name: 'sg-color-text-secondary', default: 'rgba(0, 0, 0, 0.65)', description: '"Total N" label colour' },
  { name: 'sg-color-text-disabled', default: 'rgba(0, 0, 0, 0.25)', description: 'Disabled chip + ellipsis colour' },
  { name: 'sg-color-primary', default: '#1677ff', description: 'Hover border + active chip background' },
  { name: 'sg-color-primary-hover', default: '#4096ff', description: 'Active chip hover background' },
  { name: 'sg-color-white', default: '#ffffff', description: 'Active chip foreground colour' },
  { name: 'sg-height-md', default: '32px', description: 'Chip height + ellipsis box height' },
  { name: 'sg-padding-sm', default: '8px', description: 'Chip horizontal padding + simple mode gap' },
  { name: 'sg-margin-xs', default: '4px', description: 'Gap between chips' },
  { name: 'sg-margin-sm', default: '8px', description: 'Right margin of the "Total" label' },
  { name: 'sg-border-radius', default: '6px', description: 'Chip corner radius' },
  { name: 'sg-font-size', default: '14px', description: 'Pager text size' },
  { name: 'sg-transition-duration', default: '180ms', description: 'Chip hover transition' },
  { name: 'sg-transition-timing', default: 'cubic-bezier(0.645, 0.045, 0.355, 1)', description: 'Shared easing' },
]

export function PaginationDemo() {
  return (
    <ComponentDoc
      title="Pagination"
      description="Page navigation with ellipsis folding, optional size changer / quick jumper / total label, and a compact simple mode."
      whenToUse={[
        'Long tables or lists — 50+ rows is the usual threshold.',
        'Paged API responses where the full set would be too heavy to stream.',
        'Search-results grids that need deep-link page numbers in the URL.',
      ]}
    >
      <DemoBox title="Basic" description="Prev / next + numbered chips." code={BasicSource}>
        <BasicPagination />
      </DemoBox>

      <DemoBox
        title="Many pages"
        description="Ellipsis folding once total > 7 pages."
        code={ManyPagesSource}
      >
        <ManyPagesPagination />
      </DemoBox>

      <DemoBox
        title="Simple"
        description="Compact 'current / total' flanked by prev / next."
        code={SimpleSource}
      >
        <SimplePagination />
      </DemoBox>

      <DemoBox
        title="Show total"
        description="Boolean for 'Total N', or a function for a custom range label."
        code={ShowTotalSource}
      >
        <ShowTotalPagination />
      </DemoBox>

      <DemoBox
        title="Size changer + quick jumper"
        description="Full enterprise chrome: total, size, and jump-to-page."
        code={SizeChangerSource}
      >
        <SizeChangerPagination />
      </DemoBox>

      <DemoBox
        title="Disabled"
        description="Fade + pointer-events: none while the table is loading."
        code={DisabledSource}
      >
        <DisabledPagination />
      </DemoBox>

      <DemoBox
        title="Tokens override"
        description="Tint --sg-color-primary for the active chip, bump --sg-border-radius for pills."
        code={TokensOverrideSource}
      >
        <TokensOverridePagination />
      </DemoBox>

      <DemoBox
        title="Unstyled"
        description="Keep clamping + a11y; paint the buttons yourself."
        code={UnstyledSource}
      >
        <UnstyledPagination />
      </DemoBox>

      <PropsTable title="Pagination API" data={paginationProps} />
      <CssVarsTable
        title="CSS Variables"
        hint="Pagination has no dedicated tokens — the active chip uses `--sg-color-primary`, idle chips follow the form chip palette. Bump `--sg-border-radius` to 999px for pill shapes; retint `--sg-color-primary` to rebrand."
        data={paginationCssVars}
      />
    </ComponentDoc>
  )
}
