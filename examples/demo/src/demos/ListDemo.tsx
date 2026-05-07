import { useMemo } from 'react'
import { ComponentDoc, DemoBox, PropsTable, CssVarsTable } from '../components'
import type { PropDef, CssVarDef } from '../components'

import { useListDocStrings } from './list-doc/useListDocStrings'

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

export function ListDemo() {
  const t = useListDocStrings()

  const listProps = useMemo<PropDef[]>(
    () => [
      { name: 'dataSource', description: t.propDataSource, type: 'T[]' },
      { name: 'renderItem', description: t.propRenderItem, type: '(item: T, index: number) => ReactNode' },
      { name: 'header', description: t.propHeader, type: 'ReactNode' },
      { name: 'footer', description: t.propFooter, type: 'ReactNode' },
      { name: 'loading', description: t.propLoading, type: 'boolean', default: 'false' },
      { name: 'loadMore', description: t.propLoadMore, type: 'ReactNode' },
      { name: 'bordered', description: t.propBordered, type: 'boolean', default: 'false' },
      { name: 'split', description: t.propSplit, type: 'boolean', default: 'true' },
      { name: 'hoverable', description: t.propHoverable, type: 'boolean', default: 'true' },
      { name: 'size', description: t.propSize, type: "'small' | 'default' | 'large'", default: "'default'" },
      { name: 'pagination', description: t.propPagination, type: 'false | { current?, pageSize?, total?, onChange? }' },
      { name: 'grid', description: t.propGrid, type: '{ gutter?, column?, xs?, sm?, md?, lg? }' },
      { name: 'virtual', description: t.propVirtual, type: '{ itemHeight, height, overscan? }' },
      { name: 'locale', description: t.propLocale, type: '{ emptyText?: ReactNode }' },
      { name: 'selectable', description: t.propSelectable, type: 'boolean', default: 'false' },
      { name: 'multiSelect', description: t.propMultiSelect, type: 'boolean', default: 'false' },
      { name: 'selectedKeys / defaultSelectedKeys', description: t.propSelectedKeys, type: 'number[]' },
      { name: 'onSelectionChange', description: t.propOnSelectionChange, type: '(keys: number[], items: T[]) => void' },
      { name: 'draggable', description: t.propDraggable, type: 'boolean', default: 'false' },
      { name: 'onReorder', description: t.propOnReorder, type: '(fromIndex: number, toIndex: number) => void' },
      { name: 'onItemClick', description: t.propOnItemClick, type: '(item: T, index: number) => void' },
      { name: 'rowClassName', description: t.propRowClassName, type: 'string | ((item, index) => string)' },
      { name: 'classNames', description: t.propClassNames, type: 'ListClassNames' },
      { name: 'styles', description: t.propStyles, type: 'ListStyles' },
      { name: 'className / style', description: t.propClassStyle, type: 'string / CSSProperties' },
      { name: 'unstyled', description: t.propUnstyled, type: 'boolean', default: 'false' },
    ],
    [t],
  )

  const listItemProps = useMemo<PropDef[]>(
    () => [
      { name: 'children', description: t.itemChildren, type: 'ReactNode' },
      { name: 'actions', description: t.itemActions, type: 'ReactNode[]' },
      { name: 'extra', description: t.itemExtra, type: 'ReactNode' },
      { name: 'className / style', description: t.itemClassStyle, type: 'string / CSSProperties' },
    ],
    [t],
  )

  const listMetaProps = useMemo<PropDef[]>(
    () => [
      { name: 'avatar', description: t.metaAvatar, type: 'ReactNode' },
      { name: 'title', description: t.metaTitle, type: 'ReactNode' },
      { name: 'description', description: t.metaDescription, type: 'ReactNode' },
    ],
    [t],
  )

  const listCssVars = useMemo<CssVarDef[]>(
    () => [
      { name: 'sg-color-bg', default: '#ffffff', description: t.cssSgColorBg },
      { name: 'sg-color-bg-secondary', default: 'rgba(0, 0, 0, 0.04)', description: t.cssSgColorBgSecondary },
      { name: 'sg-color-bg-hover', default: 'rgba(0, 0, 0, 0.04)', description: t.cssSgColorBgHover },
      { name: 'sg-color-border', default: '#d9d9d9', description: t.cssSgColorBorder },
      { name: 'sg-color-border-secondary', default: '#f0f0f0', description: t.cssSgColorBorderSecondary },
      { name: 'sg-color-text', default: 'rgba(0, 0, 0, 0.88)', description: t.cssSgColorText },
      { name: 'sg-color-text-secondary', default: 'rgba(0, 0, 0, 0.65)', description: t.cssSgColorTextSecondary },
      { name: 'sg-color-primary', default: '#1677ff', description: t.cssSgColorPrimary },
      { name: 'sg-border-radius', default: '6px', description: t.cssSgBorderRadius },
      { name: 'sg-font-size', default: '14px', description: t.cssSgFontSize },
      { name: 'sg-font-size-sm', default: '12px', description: t.cssSgFontSizeSm },
      { name: 'sg-font-size-lg', default: '16px', description: t.cssSgFontSizeLg },
      { name: 'sg-line-height', default: '1.57', description: t.cssSgLineHeight },
      { name: 'sg-padding-sm', default: '8px', description: t.cssSgPaddingSm },
      { name: 'sg-padding-md', default: '12px', description: t.cssSgPaddingMd },
      { name: 'sg-padding-lg', default: '16px', description: t.cssSgPaddingLg },
      { name: 'sg-padding-xl', default: '24px', description: t.cssSgPaddingXl },
      { name: 'sg-margin-xs', default: '4px', description: t.cssSgMarginXs },
      { name: 'sg-transition-duration', default: '180ms', description: t.cssSgTransitionDuration },
    ],
    [t],
  )

  return (
    <ComponentDoc
      title={t.pageTitle}
      badge={t.pageBadge}
      crumbs={[t.crumbDataDisplay, t.crumbList]}
      description={t.pageLead}
      whenToUse={[t.pageWhen1, t.pageWhen2]}
    >
      <DemoBox title={t.demoBasicTitle} description={t.demoBasicDesc} code={BasicSource}>
        <BasicList />
      </DemoBox>

      <DemoBox title={t.demoSizesTitle} description={t.demoSizesDesc} code={SizesSource}>
        <SizesList />
      </DemoBox>

      <DemoBox
        title={t.demoWithMetaTitle}
        description={t.demoWithMetaDesc}
        code={WithMetaSource}
      >
        <WithMetaList />
      </DemoBox>

      <DemoBox
        title={t.demoGridTitle}
        description={t.demoGridDesc}
        code={GridSource}
      >
        <GridList />
      </DemoBox>

      <DemoBox
        title={t.demoPaginationTitle}
        description={t.demoPaginationDesc}
        code={PaginationSource}
      >
        <PaginationList />
      </DemoBox>

      <DemoBox
        title={t.demoLoadingTitle}
        description={t.demoLoadingDesc}
        code={LoadingSource}
      >
        <LoadingList />
      </DemoBox>

      <DemoBox
        title={t.demoEmptyTitle}
        description={t.demoEmptyDesc}
        code={EmptySource}
      >
        <EmptyList />
      </DemoBox>

      <DemoBox
        title={t.demoSelectableTitle}
        description={t.demoSelectableDesc}
        code={SelectableSource}
      >
        <SelectableList />
      </DemoBox>

      <DemoBox
        title={t.demoDraggableTitle}
        description={t.demoDraggableDesc}
        code={DraggableSource}
      >
        <DraggableList />
      </DemoBox>

      <DemoBox
        title={t.demoVirtualTitle}
        description={t.demoVirtualDesc}
        code={VirtualSource}
      >
        <VirtualList />
      </DemoBox>

      <DemoBox
        title={t.demoRowClassNameTitle}
        description={t.demoRowClassNameDesc}
        code={RowClassNameSource}
      >
        <RowClassNameList />
      </DemoBox>

      <DemoBox
        title={t.demoSlotsTitle}
        description={t.demoSlotsDesc}
        code={SlotsSource}
      >
        <SlotsList />
      </DemoBox>

      <DemoBox
        title={t.demoTokensTitle}
        description={t.demoTokensDesc}
        code={TokensOverrideSource}
      >
        <TokensOverrideList />
      </DemoBox>

      <DemoBox
        title={t.demoUnstyledTitle}
        description={t.demoUnstyledDesc}
        code={UnstyledSource}
      >
        <UnstyledList />
      </DemoBox>

      <PropsTable title={t.tableListApi} data={listProps} />
      <PropsTable title={t.tableListItem} data={listItemProps} />
      <PropsTable title={t.tableListItemMeta} data={listMetaProps} />
      <CssVarsTable
        title={t.tableCssVars}
        hint={t.cssHint}
        data={listCssVars}
      />
    </ComponentDoc>
  )
}
