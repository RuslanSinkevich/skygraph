import { useMemo } from 'react'
import { ComponentDoc, DemoBox, PropsTable, CssVarsTable } from '../components'
import type { PropDef, CssVarDef } from '../components'

import { usePaginationDocStrings } from './pagination-doc/usePaginationDocStrings'

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

export function PaginationDemo() {
  const t = usePaginationDocStrings()

  const paginationProps = useMemo<PropDef[]>(
    () => [
      { name: 'current', description: t.propCurrent, type: 'number' },
      { name: 'total', description: t.propTotal, type: 'number' },
      { name: 'pageSize', description: t.propPageSize, type: 'number', default: '10' },
      { name: 'onChange', description: t.propOnChange, type: '(page: number) => void' },
      { name: 'onPageSizeChange', description: t.propOnPageSizeChange, type: '(size: number) => void' },
      { name: 'showTotal', description: t.propShowTotal, type: 'boolean | ((total, range: [number, number]) => ReactNode)' },
      { name: 'disabled', description: t.propDisabled, type: 'boolean', default: 'false' },
      { name: 'simple', description: t.propSimple, type: 'boolean', default: 'false' },
      { name: 'showSizeChanger', description: t.propShowSizeChanger, type: 'boolean', default: 'false' },
      { name: 'pageSizeOptions', description: t.propPageSizeOptions, type: 'number[]', default: '[10, 20, 50, 100]' },
      { name: 'showQuickJumper', description: t.propShowQuickJumper, type: 'boolean', default: 'false' },
      { name: 'className', description: t.propClassName, type: 'string' },
      { name: 'style', description: t.propStyle, type: 'CSSProperties' },
      { name: 'unstyled', description: t.propUnstyled, type: 'boolean', default: 'false' },
    ],
    [t],
  )

  const paginationCssVars = useMemo<CssVarDef[]>(
    () => [
      { name: 'sg-color-bg', default: '#ffffff', description: t.cssBg },
      { name: 'sg-color-border', default: 'rgba(5, 5, 5, 0.06)', description: t.cssBorder },
      { name: 'sg-color-text', default: 'rgba(0, 0, 0, 0.88)', description: t.cssText },
      { name: 'sg-color-text-secondary', default: 'rgba(0, 0, 0, 0.65)', description: t.cssTextSecondary },
      { name: 'sg-color-text-disabled', default: 'rgba(0, 0, 0, 0.25)', description: t.cssTextDisabled },
      { name: 'sg-color-primary', default: '#1677ff', description: t.cssPrimary },
      { name: 'sg-color-primary-hover', default: '#4096ff', description: t.cssPrimaryHover },
      { name: 'sg-color-white', default: '#ffffff', description: t.cssWhite },
      { name: 'sg-height-md', default: '32px', description: t.cssHeightMd },
      { name: 'sg-padding-sm', default: '8px', description: t.cssPaddingSm },
      { name: 'sg-margin-xs', default: '4px', description: t.cssMarginXs },
      { name: 'sg-font-size-sm', default: '12px', description: t.cssFontSizeSm },
      { name: 'sg-border-radius', default: '6px', description: t.cssBorderRadius },
      { name: 'sg-font-size', default: '14px', description: t.cssFontSize },
      { name: 'sg-transition-duration', default: '180ms', description: t.cssTransitionDuration },
      { name: 'sg-transition-timing', default: 'cubic-bezier(0.645, 0.045, 0.355, 1)', description: t.cssTransitionTiming },
    ],
    [t],
  )

  return (
    <ComponentDoc
      title={t.pageTitle}
      description={t.pageLead}
      whenToUse={[t.pageWhen1, t.pageWhen2, t.pageWhen3]}
    >
      <DemoBox title={t.demoBasicTitle} description={t.demoBasicDesc} code={BasicSource}>
        <BasicPagination />
      </DemoBox>

      <DemoBox
        title={t.demoManyPagesTitle}
        description={t.demoManyPagesDesc}
        code={ManyPagesSource}
      >
        <ManyPagesPagination />
      </DemoBox>

      <DemoBox
        title={t.demoSimpleTitle}
        description={t.demoSimpleDesc}
        code={SimpleSource}
      >
        <SimplePagination />
      </DemoBox>

      <DemoBox
        title={t.demoShowTotalTitle}
        description={t.demoShowTotalDesc}
        code={ShowTotalSource}
      >
        <ShowTotalPagination />
      </DemoBox>

      <DemoBox
        title={t.demoSizeChangerTitle}
        description={t.demoSizeChangerDesc}
        code={SizeChangerSource}
      >
        <SizeChangerPagination />
      </DemoBox>

      <DemoBox
        title={t.demoDisabledTitle}
        description={t.demoDisabledDesc}
        code={DisabledSource}
      >
        <DisabledPagination />
      </DemoBox>

      <DemoBox
        title={t.demoTokensTitle}
        description={t.demoTokensDesc}
        code={TokensOverrideSource}
      >
        <TokensOverridePagination />
      </DemoBox>

      <DemoBox
        title={t.demoUnstyledTitle}
        description={t.demoUnstyledDesc}
        code={UnstyledSource}
      >
        <UnstyledPagination />
      </DemoBox>

      <PropsTable title={t.tablePaginationApi} data={paginationProps} />
      <CssVarsTable
        title={t.tableCssVars}
        hint={t.cssHint}
        data={paginationCssVars}
      />
    </ComponentDoc>
  )
}
