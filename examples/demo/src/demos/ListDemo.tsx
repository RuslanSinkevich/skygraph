import { ComponentDoc, DemoBox, PropsTable, CssVarsTable } from '../components'
import type { PropDef, CssVarDef } from '../components'

import { BasicList } from './list/Basic.demo'
import BasicSource from './list/Basic.demo?raw'
import { SizesList } from './list/Sizes.demo'
import SizesSource from './list/Sizes.demo?raw'
import { WithMetaList } from './list/WithMeta.demo'
import WithMetaSource from './list/WithMeta.demo?raw'
import { GridList } from './list/Grid.demo'
import GridSource from './list/Grid.demo?raw'
import { PaginationList } from './list/Pagination.demo'
import PaginationSource from './list/Pagination.demo?raw'
import { LoadingList } from './list/Loading.demo'
import LoadingSource from './list/Loading.demo?raw'
import { EmptyList } from './list/Empty.demo'
import EmptySource from './list/Empty.demo?raw'
import { SelectableList } from './list/Selectable.demo'
import SelectableSource from './list/Selectable.demo?raw'
import { DraggableList } from './list/Draggable.demo'
import DraggableSource from './list/Draggable.demo?raw'
import { VirtualList } from './list/Virtual.demo'
import VirtualSource from './list/Virtual.demo?raw'
import { RowClassNameList } from './list/RowClassName.demo'
import RowClassNameSource from './list/RowClassName.demo?raw'
import { SlotsList } from './list/Slots.demo'
import SlotsSource from './list/Slots.demo?raw'
import { TokensOverrideList } from './list/TokensOverride.demo'
import TokensOverrideSource from './list/TokensOverride.demo?raw'
import { UnstyledList } from './list/Unstyled.demo'
import UnstyledSource from './list/Unstyled.demo?raw'

const listProps: PropDef[] = [
  { name: 'dataSource', description: 'Items to render', type: 'T[]' },
  { name: 'renderItem', description: 'Renders a single item', type: '(item: T, index: number) => ReactNode' },
  { name: 'header', description: 'Content above the list body', type: 'ReactNode' },
  { name: 'footer', description: 'Content below the list body', type: 'ReactNode' },
  { name: 'loading', description: 'Wrap the items area in a Spin overlay', type: 'boolean', default: 'false' },
  { name: 'loadMore', description: 'Extra slot below the items for a "load more" action', type: 'ReactNode' },
  { name: 'bordered', description: 'Outline the list and tint header / footer', type: 'boolean', default: 'false' },
  { name: 'split', description: 'Render dividers between items', type: 'boolean', default: 'true' },
  { name: 'hoverable', description: 'Highlight rows on hover', type: 'boolean', default: 'true' },
  { name: 'size', description: 'Padding preset (this is List-specific; not tied to ConfigProvider.size)', type: "'small' | 'default' | 'large'", default: "'default'" },
  { name: 'pagination', description: 'Pagination config — pass `false` to disable', type: 'false | { current?, pageSize?, total?, onChange? }' },
  { name: 'grid', description: 'Grid layout config with responsive column counts', type: '{ gutter?, column?, xs?, sm?, md?, lg? }' },
  { name: 'virtual', description: 'Fixed-height virtualization', type: '{ itemHeight, height, overscan? }' },
  { name: 'locale', description: 'Localized strings (currently `emptyText`)', type: '{ emptyText?: ReactNode }' },
  { name: 'selectable', description: 'Enable click-to-select', type: 'boolean', default: 'false' },
  { name: 'multiSelect', description: 'Allow Ctrl/Cmd-click multi-selection', type: 'boolean', default: 'false' },
  { name: 'selectedKeys / defaultSelectedKeys', description: 'Controlled / initial selected indices', type: 'number[]' },
  { name: 'onSelectionChange', description: 'Fires when selection changes', type: '(keys: number[], items: T[]) => void' },
  { name: 'draggable', description: 'Enable drag-and-drop reorder with a handle', type: 'boolean', default: 'false' },
  { name: 'onReorder', description: 'Fires after a drop', type: '(fromIndex: number, toIndex: number) => void' },
  { name: 'onItemClick', description: 'Row click handler (fires even without selection)', type: '(item: T, index: number) => void' },
  { name: 'rowClassName', description: 'Static class or predicate for row styling', type: 'string | ((item, index) => string)' },
  { name: 'classNames', description: 'Slot classes (root / header / footer / items / item / empty / pagination)', type: 'ListClassNames' },
  { name: 'styles', description: 'Slot inline styles', type: 'ListStyles' },
  { name: 'className / style', description: 'Root class / style', type: 'string / CSSProperties' },
  { name: 'unstyled', description: 'Drop every sg-list-* style', type: 'boolean', default: 'false' },
]

const listItemProps: PropDef[] = [
  { name: 'children', description: 'Main cell content', type: 'ReactNode' },
  { name: 'actions', description: 'Inline actions rendered after the main content with hairline dividers', type: 'ReactNode[]' },
  { name: 'extra', description: 'Secondary column aligned to the end of the row', type: 'ReactNode' },
  { name: 'className / style', description: 'Row class / style', type: 'string / CSSProperties' },
]

const listMetaProps: PropDef[] = [
  { name: 'avatar', description: 'Leading visual (Avatar, icon, letter)', type: 'ReactNode' },
  { name: 'title', description: 'Primary line', type: 'ReactNode' },
  { name: 'description', description: 'Secondary line under the title', type: 'ReactNode' },
]

const listCssVars: CssVarDef[] = [
  { name: 'sg-color-bg', default: '#ffffff', description: 'Items background' },
  { name: 'sg-color-bg-secondary', default: 'rgba(0, 0, 0, 0.04)', description: 'Header / footer background' },
  { name: 'sg-color-bg-hover', default: 'rgba(0, 0, 0, 0.04)', description: 'Row hover background' },
  { name: 'sg-color-border', default: '#d9d9d9', description: '`bordered` outline + action-divider lines' },
  { name: 'sg-color-border-secondary', default: '#f0f0f0', description: 'Row dividers when `split`' },
  { name: 'sg-color-text', default: 'rgba(0, 0, 0, 0.88)', description: 'Body / title text' },
  { name: 'sg-color-text-secondary', default: 'rgba(0, 0, 0, 0.65)', description: 'Action + description colour' },
  { name: 'sg-color-primary', default: '#1677ff', description: 'Action hover colour' },
  { name: 'sg-border-radius', default: '6px', description: '`bordered` outer radius + grid cell radius' },
  { name: 'sg-font-size', default: '14px', description: 'Base list font size' },
  { name: 'sg-font-size-sm', default: '12px', description: '`size="small"` + description font size' },
  { name: 'sg-font-size-lg', default: '16px', description: '`size="large"` title font size' },
  { name: 'sg-line-height', default: '1.57', description: 'Shared line-height' },
  { name: 'sg-padding-sm', default: '8px', description: '`size="small"` vertical padding + action gap' },
  { name: 'sg-padding-md', default: '12px', description: 'Default vertical padding + meta gap' },
  { name: 'sg-padding-lg', default: '16px', description: 'Default horizontal padding' },
  { name: 'sg-padding-xl', default: '24px', description: 'Empty-state padding + `extra` left margin' },
  { name: 'sg-margin-xs', default: '4px', description: 'Meta title → description spacing' },
  { name: 'sg-transition-duration', default: '180ms', description: 'Hover / action colour transition' },
]

export function ListDemo() {
  return (
    <ComponentDoc
      title="List"
      badge="Data Display"
      crumbs={['Data Display', 'List']}
      description="Collection renderer with header / footer, pagination, grid, virtualization, selection and drag-and-drop."
      whenToUse={[
        'When you need to render a homogeneous collection that isn\'t big enough to warrant a Table.',
        'When the item layout is meaningful (avatar + title + actions) and you want slots for it — see `List.Item.Meta`.',
      ]}
    >
      <DemoBox title="Basic" description="dataSource + renderItem, with a bordered frame." code={BasicSource}>
        <BasicList />
      </DemoBox>

      <DemoBox title="Sizes" description="Small, default, large." code={SizesSource}>
        <SizesList />
      </DemoBox>

      <DemoBox
        title="With Meta"
        description="List.Item + List.Item.Meta for structured rows."
        code={WithMetaSource}
      >
        <WithMetaList />
      </DemoBox>

      <DemoBox
        title="Grid layout"
        description="Responsive grid of cards with breakpoint overrides."
        code={GridSource}
      >
        <GridList />
      </DemoBox>

      <DemoBox
        title="Pagination"
        description="Built-in Pagination in the footer."
        code={PaginationSource}
      >
        <PaginationList />
      </DemoBox>

      <DemoBox
        title="Loading"
        description="Spin overlay while refreshing."
        code={LoadingSource}
      >
        <LoadingList />
      </DemoBox>

      <DemoBox
        title="Empty"
        description="Built-in Empty + localized emptyText."
        code={EmptySource}
      >
        <EmptyList />
      </DemoBox>

      <DemoBox
        title="Selectable"
        description="Click-to-select, plus Ctrl/Cmd for multi-pick."
        code={SelectableSource}
      >
        <SelectableList />
      </DemoBox>

      <DemoBox
        title="Draggable"
        description="Drag rows with the ⠿ handle, own the reorder."
        code={DraggableSource}
      >
        <DraggableList />
      </DemoBox>

      <DemoBox
        title="Virtual"
        description="Windowed rendering for 10,000+ rows."
        code={VirtualSource}
      >
        <VirtualList />
      </DemoBox>

      <DemoBox
        title="rowClassName"
        description="Highlight rows by predicate."
        code={RowClassNameSource}
      >
        <RowClassNameList />
      </DemoBox>

      <DemoBox
        title="Slots (classNames / styles)"
        description="Target stable DOM slots."
        code={SlotsSource}
      >
        <SlotsList />
      </DemoBox>

      <DemoBox
        title="Tokens override"
        description="Rebrand the hover / border / header via global tokens."
        code={TokensOverrideSource}
      >
        <TokensOverrideList />
      </DemoBox>

      <DemoBox
        title="Unstyled"
        description="Drop sg-list-* styles, keep behaviour."
        code={UnstyledSource}
      >
        <UnstyledList />
      </DemoBox>

      <PropsTable title="List API" data={listProps} />
      <PropsTable title="List.Item" data={listItemProps} />
      <PropsTable title="List.Item.Meta" data={listMetaProps} />
      <CssVarsTable
        title="CSS Variables"
        hint="List has no component-local tokens. It reads `--sg-color-bg-hover` (rows), `--sg-color-border*` (outlines / dividers) and `--sg-color-bg-secondary` (header / footer) — override any of them on a wrapper."
        data={listCssVars}
      />
    </ComponentDoc>
  )
}
