import { useMemo } from 'react'
import { ComponentDoc, DemoBox, PropsTable, CssVarsTable } from '../components'
import type { PropDef, CssVarDef } from '../components'

import { useCollapseDocStrings } from './collapse-doc/useCollapseDocStrings'

import { BasicCollapse } from './collapse/Basic.demo'
import BasicSource from './collapse/Basic.demo?raw'
import { AccordionCollapse } from './collapse/Accordion.demo'
import AccordionSource from './collapse/Accordion.demo?raw'
import { BorderlessCollapse } from './collapse/Borderless.demo'
import BorderlessSource from './collapse/Borderless.demo?raw'
import { GhostCollapse } from './collapse/Ghost.demo'
import GhostSource from './collapse/Ghost.demo?raw'
import { IconPositionCollapse } from './collapse/IconPosition.demo'
import IconPositionSource from './collapse/IconPosition.demo?raw'
import { ExtraCollapse } from './collapse/Extra.demo'
import ExtraSource from './collapse/Extra.demo?raw'
import { DisabledCollapse } from './collapse/Disabled.demo'
import DisabledSource from './collapse/Disabled.demo?raw'
import { NoArrowCollapse } from './collapse/NoArrow.demo'
import NoArrowSource from './collapse/NoArrow.demo?raw'
import { SizesCollapse } from './collapse/Sizes.demo'
import SizesSource from './collapse/Sizes.demo?raw'
import { ControlledCollapse } from './collapse/Controlled.demo'
import ControlledSource from './collapse/Controlled.demo?raw'
import { TokensOverrideCollapse } from './collapse/TokensOverride.demo'
import TokensOverrideSource from './collapse/TokensOverride.demo?raw'

export function CollapseDemo() {
  const t = useCollapseDocStrings()

  const collapseProps = useMemo<PropDef[]>(
    () => [
      { name: 'items', description: t.propItems, type: 'CollapseItem[]', required: true },
      { name: 'activeKey', description: t.propActiveKey, type: 'string | string[]' },
      { name: 'defaultActiveKey', description: t.propDefaultActiveKey, type: 'string | string[]' },
      { name: 'onChange', description: t.propOnChange, type: '(activeKey: string[]) => void' },
      { name: 'accordion', description: t.propAccordion, type: 'boolean', default: 'false' },
      { name: 'bordered', description: t.propBordered, type: 'boolean', default: 'true' },
      {
        name: 'expandIconPosition',
        description: t.propExpandIconPosition,
        type: "'start' | 'end'",
        default: "'start'",
      },
      { name: 'ghost', description: t.propGhost, type: 'boolean', default: 'false' },
      {
        name: 'size',
        description: t.propSize,
        type: "'small' | 'middle' | 'large'",
        default: "'middle'",
      },
      { name: 'className', description: t.propClassName, type: 'string' },
      { name: 'style', description: t.propStyle, type: 'CSSProperties' },
      { name: 'unstyled', description: t.propUnstyled, type: 'boolean', default: 'false' },
    ],
    [t],
  )

  const collapseItemProps = useMemo<PropDef[]>(
    () => [
      { name: 'key', description: t.itemKey, type: 'string', required: true },
      { name: 'label', description: t.itemLabel, type: 'ReactNode', required: true },
      { name: 'children', description: t.itemChildren, type: 'ReactNode', required: true },
      { name: 'extra', description: t.itemExtra, type: 'ReactNode' },
      { name: 'showArrow', description: t.itemShowArrow, type: 'boolean', default: 'true' },
      { name: 'disabled', description: t.itemDisabled, type: 'boolean', default: 'false' },
    ],
    [t],
  )

  const collapseCssVars = useMemo<CssVarDef[]>(
    () => [
      { name: 'sg-color-bg-container', default: '#ffffff', description: t.cssBgContainer },
      {
        name: 'sg-color-bg-secondary',
        default: 'rgba(0, 0, 0, 0.02)',
        description: t.cssBgSecondary,
      },
      { name: 'sg-color-bg-hover', default: 'rgba(0, 0, 0, 0.04)', description: t.cssBgHover },
      {
        name: 'sg-color-border-secondary',
        default: 'rgba(5, 5, 5, 0.06)',
        description: t.cssBorderSecondary,
      },
      { name: 'sg-color-text', default: 'rgba(0, 0, 0, 0.88)', description: t.cssText },
      {
        name: 'sg-color-text-secondary',
        default: 'rgba(0, 0, 0, 0.65)',
        description: t.cssTextSecondary,
      },
      { name: 'sg-color-primary', default: '#1677ff', description: t.cssPrimary },
      { name: 'sg-font-size', default: '14px', description: t.cssFontSize },
      { name: 'sg-font-size-sm', default: '12px', description: t.cssFontSizeSm },
      { name: 'sg-font-size-lg', default: '16px', description: t.cssFontSizeLg },
      { name: 'sg-line-height', default: '1.5714', description: t.cssLineHeight },
      { name: 'sg-height-sm', default: '24px', description: t.cssHeightSm },
      { name: 'sg-height-md', default: '32px', description: t.cssHeightMd },
      { name: 'sg-height-lg', default: '40px', description: t.cssHeightLg },
      { name: 'sg-padding-xs', default: '4px', description: t.cssPaddingXs },
      { name: 'sg-padding-sm', default: '8px', description: t.cssPaddingSm },
      { name: 'sg-padding-md', default: '12px', description: t.cssPaddingMd },
      { name: 'sg-padding-lg', default: '16px', description: t.cssPaddingLg },
      { name: 'sg-padding-xl', default: '20px', description: t.cssPaddingXl },
      { name: 'sg-border-radius-lg', default: '8px', description: t.cssBorderRadiusLg },
      { name: 'sg-transition-duration', default: '180ms', description: t.cssTransitionDuration },
      {
        name: 'sg-transition-timing',
        default: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
        description: t.cssTransitionTiming,
      },
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
        <BasicCollapse />
      </DemoBox>

      <DemoBox
        title={t.demoAccordionTitle}
        description={t.demoAccordionDesc}
        code={AccordionSource}
      >
        <AccordionCollapse />
      </DemoBox>

      <DemoBox
        title={t.demoBorderlessTitle}
        description={t.demoBorderlessDesc}
        code={BorderlessSource}
      >
        <BorderlessCollapse />
      </DemoBox>

      <DemoBox title={t.demoGhostTitle} description={t.demoGhostDesc} code={GhostSource}>
        <GhostCollapse />
      </DemoBox>

      <DemoBox
        title={t.demoIconPositionTitle}
        description={t.demoIconPositionDesc}
        code={IconPositionSource}
      >
        <IconPositionCollapse />
      </DemoBox>

      <DemoBox title={t.demoExtraTitle} description={t.demoExtraDesc} code={ExtraSource}>
        <ExtraCollapse />
      </DemoBox>

      <DemoBox title={t.demoDisabledTitle} description={t.demoDisabledDesc} code={DisabledSource}>
        <DisabledCollapse />
      </DemoBox>

      <DemoBox title={t.demoNoArrowTitle} description={t.demoNoArrowDesc} code={NoArrowSource}>
        <NoArrowCollapse />
      </DemoBox>

      <DemoBox title={t.demoSizesTitle} description={t.demoSizesDesc} code={SizesSource}>
        <SizesCollapse />
      </DemoBox>

      <DemoBox
        title={t.demoControlledTitle}
        description={t.demoControlledDesc}
        code={ControlledSource}
      >
        <ControlledCollapse />
      </DemoBox>

      <DemoBox title={t.demoTokensTitle} description={t.demoTokensDesc} code={TokensOverrideSource}>
        <TokensOverrideCollapse />
      </DemoBox>

      <PropsTable title={t.tableCollapseApi} data={collapseProps} />
      <PropsTable title={t.tableCollapseItem} data={collapseItemProps} />
      <CssVarsTable title={t.tableCssVars} hint={t.cssHint} data={collapseCssVars} />
    </ComponentDoc>
  )
}
