import { useMemo } from 'react'
import { ComponentDoc, DemoBox, PropsTable, CssVarsTable } from '../components'
import type { PropDef, CssVarDef } from '../components'

import { useTransferDocStrings } from './transfer-doc/useTransferDocStrings'

import { BasicTransfer } from './transfer/Basic.demo'
import BasicSource from './transfer/Basic.demo?raw'
import { SearchTransfer } from './transfer/Search.demo'
import SearchSource from './transfer/Search.demo?raw'
import { OneWayTransfer } from './transfer/OneWay.demo'
import OneWaySource from './transfer/OneWay.demo?raw'
import { TitlesTransfer } from './transfer/Titles.demo'
import TitlesSource from './transfer/Titles.demo?raw'
import { CustomRenderTransfer } from './transfer/CustomRender.demo'
import CustomRenderSource from './transfer/CustomRender.demo?raw'
import { DisabledTransfer } from './transfer/Disabled.demo'
import DisabledSource from './transfer/Disabled.demo?raw'
import { TokensOverrideTransfer } from './transfer/TokensOverride.demo'
import TokensOverrideSource from './transfer/TokensOverride.demo?raw'

export function TransferDemo() {
  const t = useTransferDocStrings()

  const transferProps = useMemo<PropDef[]>(
    () => [
      { name: 'dataSource', description: t.propDataSource, type: 'TransferItem[]' },
      { name: 'targetKeys', description: t.propTargetKeys, type: 'string[]' },
      { name: 'defaultTargetKeys', description: t.propDefaultTargetKeys, type: 'string[]' },
      { name: 'onChange', description: t.propOnChange, type: '(targetKeys, direction, moveKeys) => void' },
      { name: 'onSelectChange', description: t.propOnSelectChange, type: '(sourceSelected, targetSelected) => void' },
      { name: 'showSearch', description: t.propShowSearch, type: 'boolean', default: 'false' },
      { name: 'titles', description: t.propTitles, type: '[string, string]', default: "['Source', 'Target']" },
      { name: 'render', description: t.propRender, type: '(item: TransferItem) => ReactNode' },
      { name: 'listStyle', description: t.propListStyle, type: 'CSSProperties' },
      { name: 'oneWay', description: t.propOneWay, type: 'boolean', default: 'false' },
      { name: 'disabled', description: t.propDisabled, type: 'boolean', default: 'false' },
      { name: 'className', description: t.propClassName, type: 'string' },
      { name: 'style', description: t.propStyle, type: 'CSSProperties' },
      { name: 'unstyled', description: t.propUnstyled, type: 'boolean', default: 'false' },
    ],
    [t],
  )

  const transferItemProps = useMemo<PropDef[]>(
    () => [
      { name: 'key', description: t.itemKey, type: 'string' },
      { name: 'title', description: t.itemTitle, type: 'string' },
      { name: 'description', description: t.itemDescription, type: 'string' },
      { name: 'disabled', description: t.itemDisabled, type: 'boolean', default: 'false' },
    ],
    [t],
  )

  const transferCssVars = useMemo<CssVarDef[]>(
    () => [
      { name: 'sg-color-bg-container', default: '#ffffff', description: t.cssSgColorBgContainer },
      { name: 'sg-color-bg-secondary', default: 'rgba(0, 0, 0, 0.04)', description: t.cssSgColorBgSecondary },
      { name: 'sg-color-bg-hover', default: 'rgba(0, 0, 0, 0.04)', description: t.cssSgColorBgHover },
      { name: 'sg-color-primary-bg', default: '#e6f4ff', description: t.cssSgColorPrimaryBg },
      { name: 'sg-color-border', default: '#d9d9d9', description: t.cssSgColorBorder },
      { name: 'sg-color-border-secondary', default: '#f0f0f0', description: t.cssSgColorBorderSecondary },
      { name: 'sg-color-text', default: 'rgba(0, 0, 0, 0.88)', description: t.cssSgColorText },
      { name: 'sg-color-text-secondary', default: 'rgba(0, 0, 0, 0.65)', description: t.cssSgColorTextSecondary },
      { name: 'sg-color-text-tertiary', default: 'rgba(0, 0, 0, 0.45)', description: t.cssSgColorTextTertiary },
      { name: 'sg-color-text-disabled', default: 'rgba(0, 0, 0, 0.25)', description: t.cssSgColorTextDisabled },
      { name: 'sg-border-radius', default: '6px', description: t.cssSgBorderRadius },
      { name: 'sg-font-size', default: '14px', description: t.cssSgFontSize },
      { name: 'sg-font-size-sm', default: '12px', description: t.cssSgFontSizeSm },
      { name: 'sg-padding-xs', default: '4px', description: t.cssSgPaddingXs },
      { name: 'sg-padding-sm', default: '8px', description: t.cssSgPaddingSm },
      { name: 'sg-padding-md', default: '12px', description: t.cssSgPaddingMd },
      { name: 'sg-padding-xl', default: '24px', description: t.cssSgPaddingXl },
      { name: 'sg-height-md', default: '32px', description: t.cssSgHeightMd },
      { name: 'sg-transition-duration', default: '180ms', description: t.cssSgTransitionDuration },
    ],
    [t],
  )

  return (
    <ComponentDoc
      title={t.pageTitle}
      badge={t.pageBadge}
      crumbs={[t.crumbDataEntry, t.crumbTransfer]}
      description={t.pageLead}
      whenToUse={[t.pageWhen1, t.pageWhen2]}
    >
      <DemoBox title={t.demoBasicTitle} description={t.demoBasicDesc} code={BasicSource}>
        <BasicTransfer />
      </DemoBox>

      <DemoBox title={t.demoSearchTitle} description={t.demoSearchDesc} code={SearchSource}>
        <SearchTransfer />
      </DemoBox>

      <DemoBox title={t.demoOneWayTitle} description={t.demoOneWayDesc} code={OneWaySource}>
        <OneWayTransfer />
      </DemoBox>

      <DemoBox title={t.demoTitlesTitle} description={t.demoTitlesDesc} code={TitlesSource}>
        <TitlesTransfer />
      </DemoBox>

      <DemoBox title={t.demoCustomRenderTitle} description={t.demoCustomRenderDesc} code={CustomRenderSource}>
        <CustomRenderTransfer />
      </DemoBox>

      <DemoBox title={t.demoDisabledTitle} description={t.demoDisabledDesc} code={DisabledSource}>
        <DisabledTransfer />
      </DemoBox>

      <DemoBox title={t.demoTokensOverrideTitle} description={t.demoTokensOverrideDesc} code={TokensOverrideSource}>
        <TokensOverrideTransfer />
      </DemoBox>

      <PropsTable title={t.tableTransferApi} data={transferProps} />
      <PropsTable title={t.tableTransferItem} data={transferItemProps} />
      <CssVarsTable
        title={t.tableCssVars}
        hint={t.cssHint}
        data={transferCssVars}
      />
    </ComponentDoc>
  )
}
