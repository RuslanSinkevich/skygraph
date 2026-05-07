import { useMemo } from 'react'
import { ComponentDoc, DemoBox, PropsTable, CssVarsTable } from '../components'
import type { PropDef, CssVarDef } from '../components'

import { useSegmentedDocStrings } from './segmented-doc/useSegmentedDocStrings'

import { BasicSegmented } from './segmented/Basic.demo'
import BasicSource from './segmented/Basic.demo?raw'
import { ControlledSegmented } from './segmented/Controlled.demo'
import ControlledSource from './segmented/Controlled.demo?raw'
import { WithIconsSegmented } from './segmented/WithIcons.demo'
import WithIconsSource from './segmented/WithIcons.demo?raw'
import { BlockSegmented } from './segmented/Block.demo'
import BlockSource from './segmented/Block.demo?raw'
import { DisabledSegmented } from './segmented/Disabled.demo'
import DisabledSource from './segmented/Disabled.demo?raw'
import { SizesSegmented } from './segmented/Sizes.demo'
import SizesSource from './segmented/Sizes.demo?raw'
import { TokensOverrideSegmented } from './segmented/TokensOverride.demo'
import TokensOverrideSource from './segmented/TokensOverride.demo?raw'
import { UnstyledSegmented } from './segmented/Unstyled.demo'
import UnstyledSource from './segmented/Unstyled.demo?raw'

export function SegmentedDemo() {
  const t = useSegmentedDocStrings()

  const segmentedProps = useMemo<PropDef[]>(
    () => [
      { name: 'options', description: t.propOptions, type: "string[] | { label, value, icon?, disabled? }[]" },
      { name: 'value', description: t.propValue, type: 'string' },
      { name: 'defaultValue', description: t.propDefaultValue, type: 'string' },
      { name: 'onChange', description: t.propOnChange, type: '(value: string) => void' },
      { name: 'block', description: t.propBlock, type: 'boolean', default: 'false' },
      { name: 'disabled', description: t.propDisabled, type: 'boolean', default: 'false' },
      { name: 'size', description: t.propSize, type: "'small' | 'middle' | 'large'", default: "'middle'" },
      { name: 'className', description: t.propClassName, type: 'string' },
      { name: 'style', description: t.propStyle, type: 'CSSProperties' },
      { name: 'unstyled', description: t.propUnstyled, type: 'boolean', default: 'false' },
    ],
    [t],
  )

  const segmentedCssVars = useMemo<CssVarDef[]>(
    () => [
      { name: 'sg-color-bg-secondary', default: 'rgba(0, 0, 0, 0.04)', description: t.cssSgColorBgSecondary },
      { name: 'sg-color-bg-container', default: '#ffffff', description: t.cssSgColorBgContainer },
      { name: 'sg-color-text', default: 'rgba(0, 0, 0, 0.88)', description: t.cssSgColorText },
      { name: 'sg-color-text-secondary', default: 'rgba(0, 0, 0, 0.65)', description: t.cssSgColorTextSecondary },
      { name: 'sg-color-text-disabled', default: 'rgba(0, 0, 0, 0.25)', description: t.cssSgColorTextDisabled },
      { name: 'sg-border-radius', default: '6px', description: t.cssSgBorderRadius },
      { name: 'sg-border-radius-sm', default: '4px', description: t.cssSgBorderRadiusSm },
      { name: 'sg-shadow-sm', default: '0 1px 2px rgba(0,0,0,0.06)', description: t.cssSgShadowSm },
      { name: 'sg-height-sm', default: '24px', description: t.cssSgHeightSm },
      { name: 'sg-height-md', default: '32px', description: t.cssSgHeightMd },
      { name: 'sg-height-lg', default: '40px', description: t.cssSgHeightLg },
      { name: 'sg-padding-xs', default: '4px', description: t.cssSgPaddingXs },
      { name: 'sg-padding-sm', default: '8px', description: t.cssSgPaddingSm },
      { name: 'sg-padding-md', default: '12px', description: t.cssSgPaddingMd },
      { name: 'sg-padding-lg', default: '16px', description: t.cssSgPaddingLg },
      { name: 'sg-font-size-sm', default: '12px', description: t.cssSgFontSizeSm },
      { name: 'sg-font-size', default: '14px', description: t.cssSgFontSize },
      { name: 'sg-font-size-lg', default: '16px', description: t.cssSgFontSizeLg },
      { name: 'sg-transition-duration', default: '180ms', description: t.cssSgTransitionDuration },
      { name: 'sg-transition-timing', default: 'cubic-bezier(0.645, 0.045, 0.355, 1)', description: t.cssSgTransitionTiming },
    ],
    [t],
  )

  return (
    <ComponentDoc
      title={t.pageTitle}
      badge={t.pageBadge}
      crumbs={[t.crumbDataEntry, t.crumbSegmented]}
      description={t.pageLead}
      whenToUse={[t.pageWhen1, t.pageWhen2]}
    >
      <DemoBox title={t.demoBasicTitle} description={t.demoBasicDesc} code={BasicSource}>
        <BasicSegmented />
      </DemoBox>

      <DemoBox title={t.demoControlledTitle} description={t.demoControlledDesc} code={ControlledSource}>
        <ControlledSegmented />
      </DemoBox>

      <DemoBox title={t.demoWithIconsTitle} description={t.demoWithIconsDesc} code={WithIconsSource}>
        <WithIconsSegmented />
      </DemoBox>

      <DemoBox title={t.demoBlockTitle} description={t.demoBlockDesc} code={BlockSource}>
        <BlockSegmented />
      </DemoBox>

      <DemoBox title={t.demoDisabledTitle} description={t.demoDisabledDesc} code={DisabledSource}>
        <DisabledSegmented />
      </DemoBox>

      <DemoBox title={t.demoSizesTitle} description={t.demoSizesDesc} code={SizesSource}>
        <SizesSegmented />
      </DemoBox>

      <DemoBox title={t.demoTokensOverrideTitle} description={t.demoTokensOverrideDesc} code={TokensOverrideSource}>
        <TokensOverrideSegmented />
      </DemoBox>

      <DemoBox title={t.demoUnstyledTitle} description={t.demoUnstyledDesc} code={UnstyledSource}>
        <UnstyledSegmented />
      </DemoBox>

      <PropsTable title={t.tableSegmentedApi} data={segmentedProps} />
      <CssVarsTable
        title={t.tableCssVars}
        hint={t.cssHint}
        data={segmentedCssVars}
      />
    </ComponentDoc>
  )
}
