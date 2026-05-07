import { useMemo } from 'react'
import { ComponentDoc, DemoBox, PropsTable, CssVarsTable } from '../components'
import type { PropDef, CssVarDef } from '../components'

import { useDescriptionsDocStrings } from './descriptions-doc/useDescriptionsDocStrings'

import { BasicDescriptions } from './descriptions/Basic.demo'
import BasicSource from './descriptions/Basic.demo?raw'
import { BorderedDescriptions } from './descriptions/Bordered.demo'
import BorderedSource from './descriptions/Bordered.demo?raw'
import { VerticalDescriptions } from './descriptions/Vertical.demo'
import VerticalSource from './descriptions/Vertical.demo?raw'
import { ColumnsDescriptions } from './descriptions/Columns.demo'
import ColumnsSource from './descriptions/Columns.demo?raw'
import { NoColonDescriptions } from './descriptions/NoColon.demo'
import NoColonSource from './descriptions/NoColon.demo?raw'
import { SizesDescriptions } from './descriptions/Sizes.demo'
import SizesSource from './descriptions/Sizes.demo?raw'
import { RichContentDescriptions } from './descriptions/RichContent.demo'
import RichContentSource from './descriptions/RichContent.demo?raw'
import { TokensOverrideDescriptions } from './descriptions/TokensOverride.demo'
import TokensOverrideSource from './descriptions/TokensOverride.demo?raw'
import { UnstyledDescriptions } from './descriptions/Unstyled.demo'
import UnstyledSource from './descriptions/Unstyled.demo?raw'

export function DescriptionsDemo() {
  const t = useDescriptionsDocStrings()

  const descriptionsProps = useMemo<PropDef[]>(
    () => [
      { name: 'title', description: t.propTitle, type: 'ReactNode' },
      { name: 'items', description: t.propItems, type: 'DescriptionsItem[]' },
      { name: 'bordered', description: t.propBordered, type: 'boolean', default: 'false' },
      { name: 'column', description: t.propColumn, type: 'number', default: '3' },
      { name: 'layout', description: t.propLayout, type: "'horizontal' | 'vertical'", default: "'horizontal'" },
      { name: 'colon', description: t.propColon, type: 'boolean', default: 'true' },
      { name: 'size', description: t.propSize, type: "'small' | 'middle' | 'large'", default: "'middle'" },
      { name: 'className', description: t.propClassName, type: 'string' },
      { name: 'style', description: t.propStyle, type: 'CSSProperties' },
      { name: 'unstyled', description: t.propUnstyled, type: 'boolean', default: 'false' },
    ],
    [t],
  )

  const itemProps = useMemo<PropDef[]>(
    () => [
      { name: 'key', description: t.itemKey, type: 'string' },
      { name: 'label', description: t.itemLabel, type: 'ReactNode' },
      { name: 'children', description: t.itemChildren, type: 'ReactNode' },
      { name: 'span', description: t.itemSpan, type: 'number', default: '1' },
    ],
    [t],
  )

  const descCssVars = useMemo<CssVarDef[]>(
    () => [
      { name: 'sg-color-text', default: 'rgba(0, 0, 0, 0.88)', description: t.cssSgColorText },
      { name: 'sg-color-text-secondary', default: 'rgba(0, 0, 0, 0.65)', description: t.cssSgColorTextSecondary },
      { name: 'sg-color-bg-secondary', default: 'rgba(0, 0, 0, 0.04)', description: t.cssSgColorBgSecondary },
      { name: 'sg-color-border-secondary', default: '#f0f0f0', description: t.cssSgColorBorderSecondary },
      { name: 'sg-border-radius', default: '6px', description: t.cssSgBorderRadius },
      { name: 'sg-font-size', default: '14px', description: t.cssSgFontSize },
      { name: 'sg-font-size-sm', default: '12px', description: t.cssSgFontSizeSm },
      { name: 'sg-font-size-lg', default: '16px', description: t.cssSgFontSizeLg },
      { name: 'sg-line-height', default: '1.57', description: t.cssSgLineHeight },
      { name: 'sg-padding-xs', default: '4px', description: t.cssSgPaddingXs },
      { name: 'sg-padding-sm', default: '8px', description: t.cssSgPaddingSm },
      { name: 'sg-padding-md', default: '12px', description: t.cssSgPaddingMd },
      { name: 'sg-padding-lg', default: '16px', description: t.cssSgPaddingLg },
      { name: 'sg-margin-sm', default: '8px', description: t.cssSgMarginSm },
      { name: 'sg-margin-md', default: '12px', description: t.cssSgMarginMd },
    ],
    [t],
  )

  return (
    <ComponentDoc
      title={t.pageTitle}
      badge={t.pageBadge}
      crumbs={[t.crumbDataDisplay, t.crumbDescriptions]}
      description={t.pageLead}
      whenToUse={[t.pageWhen1, t.pageWhen2]}
    >
      <DemoBox title={t.demoBasicTitle} description={t.demoBasicDesc} code={BasicSource}>
        <BasicDescriptions />
      </DemoBox>

      <DemoBox
        title={t.demoBorderedTitle}
        description={t.demoBorderedDesc}
        code={BorderedSource}
      >
        <BorderedDescriptions />
      </DemoBox>

      <DemoBox
        title={t.demoVerticalTitle}
        description={t.demoVerticalDesc}
        code={VerticalSource}
      >
        <VerticalDescriptions />
      </DemoBox>

      <DemoBox
        title={t.demoColumnsTitle}
        description={t.demoColumnsDesc}
        code={ColumnsSource}
      >
        <ColumnsDescriptions />
      </DemoBox>

      <DemoBox
        title={t.demoNoColonTitle}
        description={t.demoNoColonDesc}
        code={NoColonSource}
      >
        <NoColonDescriptions />
      </DemoBox>

      <DemoBox title={t.demoSizesTitle} description={t.demoSizesDesc} code={SizesSource}>
        <SizesDescriptions />
      </DemoBox>

      <DemoBox
        title={t.demoRichContentTitle}
        description={t.demoRichContentDesc}
        code={RichContentSource}
      >
        <RichContentDescriptions />
      </DemoBox>

      <DemoBox
        title={t.demoTokensTitle}
        description={t.demoTokensDesc}
        code={TokensOverrideSource}
      >
        <TokensOverrideDescriptions />
      </DemoBox>

      <DemoBox
        title={t.demoUnstyledTitle}
        description={t.demoUnstyledDesc}
        code={UnstyledSource}
      >
        <UnstyledDescriptions />
      </DemoBox>

      <PropsTable title={t.tableDescriptionsApi} data={descriptionsProps} />
      <PropsTable title={t.tableDescriptionsItem} data={itemProps} />
      <CssVarsTable
        title={t.tableCssVars}
        hint={t.cssHint}
        data={descCssVars}
      />
    </ComponentDoc>
  )
}
