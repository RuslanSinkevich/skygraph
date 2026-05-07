import { useMemo } from 'react'
import { ComponentDoc, DemoBox, PropsTable, CssVarsTable } from '../components'
import type { PropDef, CssVarDef } from '../components'

import { useTabsDocStrings } from './tabs-doc/useTabsDocStrings'

import { BasicTabs } from './tabs/Basic.demo'
import BasicSource from './tabs/Basic.demo?raw'
import { ControlledTabs } from './tabs/Controlled.demo'
import ControlledSource from './tabs/Controlled.demo?raw'
import { SizesTabs } from './tabs/Sizes.demo'
import SizesSource from './tabs/Sizes.demo?raw'
import { RichLabelsTabs } from './tabs/RichLabels.demo'
import RichLabelsSource from './tabs/RichLabels.demo?raw'
import { StatesTabs } from './tabs/States.demo'
import StatesSource from './tabs/States.demo?raw'
import { TokensOverrideTabs } from './tabs/TokensOverride.demo'
import TokensOverrideSource from './tabs/TokensOverride.demo?raw'
import { LineTabs } from './tabs/Line.demo'
import LineSource from './tabs/Line.demo?raw'

export function TabsDemo() {
  const t = useTabsDocStrings()

  const tabsProps = useMemo<PropDef[]>(
    () => [
      { name: 'items', description: t.propItems, type: 'TabItem[]' },
      { name: 'activeKey', description: t.propActiveKey, type: 'string' },
      { name: 'defaultActiveKey', description: t.propDefaultActiveKey, type: 'string' },
      { name: 'onChange', description: t.propOnChange, type: '(key: string) => void' },
      { name: 'type', description: t.propType, type: "'card' | 'line'", default: "'card'" },
      { name: 'size', description: t.propSize, type: "'small' | 'middle' | 'large'", default: "'middle'" },
      { name: 'className', description: t.propClassName, type: 'string' },
      { name: 'style', description: t.propStyle, type: 'CSSProperties' },
      { name: 'unstyled', description: t.propUnstyled, type: 'boolean', default: 'false' },
    ],
    [t],
  )

  const tabItemProps = useMemo<PropDef[]>(
    () => [
      { name: 'key', description: t.itemKey, type: 'string' },
      { name: 'label', description: t.itemLabel, type: 'ReactNode' },
      { name: 'children', description: t.itemChildren, type: 'ReactNode' },
      { name: 'disabled', description: t.itemDisabled, type: 'boolean', default: 'false' },
      { name: 'loading', description: t.itemLoading, type: 'boolean', default: 'false' },
    ],
    [t],
  )

  const tabsCssVars = useMemo<CssVarDef[]>(
    () => [
      { name: 'sg-color-primary', default: 'var(--sg-blue-6)', description: t.cssPrimary },
      { name: 'sg-color-primary-hover', default: 'var(--sg-blue-5)', description: t.cssPrimaryHover },
      { name: 'sg-color-text', default: 'rgba(0, 0, 0, 0.88)', description: t.cssText },
      { name: 'sg-color-text-secondary', default: 'rgba(0, 0, 0, 0.65)', description: t.cssTextSecondary },
      { name: 'sg-color-text-disabled', default: 'rgba(0, 0, 0, 0.25)', description: t.cssTextDisabled },
      { name: 'sg-color-border-secondary', default: 'var(--sg-gray-4)', description: t.cssBorderSecondary },
      { name: 'sg-color-bg', default: 'var(--sg-gray-1)', description: t.cssBg },
      { name: 'sg-color-bg-secondary', default: 'var(--sg-gray-2)', description: t.cssBgSecondary },
      { name: 'sg-font-size', default: '14px', description: t.cssFontSize },
      { name: 'sg-padding-sm', default: '8px', description: t.cssPaddingSm },
      { name: 'sg-padding-lg', default: '16px', description: t.cssPaddingLg },
      { name: 'sg-padding-xs', default: '4px', description: t.cssPaddingXs },
      { name: 'sg-margin-md', default: '16px', description: t.cssMarginMd },
      { name: 'sg-spin-color', default: 'var(--sg-color-primary) on active tab', description: t.cssSpinColor },
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
        <BasicTabs />
      </DemoBox>

      <DemoBox
        title={t.demoLineTitle}
        description={t.demoLineDesc}
        code={LineSource}
      >
        <LineTabs />
      </DemoBox>

      <DemoBox title={t.demoControlledTitle} description={t.demoControlledDesc} code={ControlledSource}>
        <ControlledTabs />
      </DemoBox>

      <DemoBox title={t.demoSizesTitle} description={t.demoSizesDesc} code={SizesSource}>
        <SizesTabs />
      </DemoBox>

      <DemoBox title={t.demoRichLabelsTitle} description={t.demoRichLabelsDesc} code={RichLabelsSource}>
        <RichLabelsTabs />
      </DemoBox>

      <DemoBox title={t.demoStatesTitle} description={t.demoStatesDesc} code={StatesSource}>
        <StatesTabs />
      </DemoBox>

      <DemoBox
        title={t.demoTokensTitle}
        description={t.demoTokensDesc}
        code={TokensOverrideSource}
      >
        <TokensOverrideTabs />
      </DemoBox>

      <PropsTable title={t.tableTabsApi} data={tabsProps} />
      <PropsTable title={t.tableTabItem} data={tabItemProps} />
      <CssVarsTable
        title={t.tableCssVars}
        hint={t.cssHint}
        data={tabsCssVars}
      />
    </ComponentDoc>
  )
}
