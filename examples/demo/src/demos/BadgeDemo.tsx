import { useMemo } from 'react'
import { ComponentDoc, DemoBox, PropsTable, CssVarsTable } from '../components'
import type { PropDef, CssVarDef } from '../components'

import { useBadgeDocStrings } from './badge-doc/useBadgeDocStrings'

import { BasicBadge } from './badge/Basic.demo'
import BasicSource from './badge/Basic.demo?raw'
import { OverflowBadge } from './badge/Overflow.demo'
import OverflowSource from './badge/Overflow.demo?raw'
import { DotBadge } from './badge/Dot.demo'
import DotSource from './badge/Dot.demo?raw'
import { StatusBadge } from './badge/Status.demo'
import StatusSource from './badge/Status.demo?raw'
import { CustomColorBadge } from './badge/CustomColor.demo'
import CustomColorSource from './badge/CustomColor.demo?raw'
import { OffsetBadge } from './badge/Offset.demo'
import OffsetSource from './badge/Offset.demo?raw'
import { TokensOverrideBadge } from './badge/TokensOverride.demo'
import TokensOverrideSource from './badge/TokensOverride.demo?raw'

export function BadgeDemo() {
  const t = useBadgeDocStrings()

  const badgeProps = useMemo<PropDef[]>(
    () => [
      { name: 'count', description: t.propCount, type: 'number' },
      { name: 'dot', description: t.propDot, type: 'boolean', default: 'false' },
      { name: 'overflowCount', description: t.propOverflowCount, type: 'number', default: '99' },
      { name: 'showZero', description: t.propShowZero, type: 'boolean', default: 'false' },
      { name: 'color', description: t.propColor, type: 'string' },
      {
        name: 'status',
        description: t.propStatus,
        type: "'success' | 'error' | 'warning' | 'processing' | 'default'",
      },
      { name: 'text', description: t.propText, type: 'ReactNode' },
      { name: 'offset', description: t.propOffset, type: '[number, number]' },
      { name: 'children', description: t.propChildren, type: 'ReactNode' },
      { name: 'className', description: t.propClassName, type: 'string' },
      { name: 'style', description: t.propStyle, type: 'CSSProperties' },
      { name: 'unstyled', description: t.propUnstyled, type: 'boolean', default: 'false' },
    ],
    [t],
  )

  const badgeCssVars = useMemo<CssVarDef[]>(
    () => [
      { name: 'sg-color-error', default: '#ff4d4f', description: t.cssSgColorError },
      { name: 'sg-color-white', default: '#ffffff', description: t.cssSgColorWhite },
      { name: 'sg-color-bg', default: '#ffffff', description: t.cssSgColorBg },
      { name: 'sg-color-success', default: '#52c41a', description: t.cssSgColorSuccess },
      { name: 'sg-color-warning', default: '#faad14', description: t.cssSgColorWarning },
      { name: 'sg-color-primary', default: '#1677ff', description: t.cssSgColorPrimary },
      {
        name: 'sg-color-text-disabled',
        default: 'rgba(0, 0, 0, 0.25)',
        description: t.cssSgColorTextDisabled,
      },
      { name: 'sg-color-text', default: 'rgba(0, 0, 0, 0.88)', description: t.cssSgColorText },
      { name: 'sg-font-size', default: '14px', description: t.cssSgFontSize },
      { name: 'sg-font-size-sm', default: '12px', description: t.cssSgFontSizeSm },
      { name: 'sg-padding-sm', default: '8px', description: t.cssSgPaddingSm },
      { name: 'sg-line-height', default: '1.5714', description: t.cssSgLineHeight },
      { name: 'sg-z-base', default: '1', description: t.cssSgZBase },
    ],
    [t],
  )

  return (
    <ComponentDoc
      title={t.pageTitle}
      badge={t.pageBadge}
      crumbs={[t.crumbDataDisplay, t.crumbBadge]}
      description={t.pageLead}
      whenToUse={[t.pageWhen1, t.pageWhen2, t.pageWhen3]}
    >
      <DemoBox title={t.demoBasicTitle} description={t.demoBasicDesc} code={BasicSource}>
        <BasicBadge />
      </DemoBox>

      <DemoBox title={t.demoOverflowTitle} description={t.demoOverflowDesc} code={OverflowSource}>
        <OverflowBadge />
      </DemoBox>

      <DemoBox title={t.demoDotTitle} description={t.demoDotDesc} code={DotSource}>
        <DotBadge />
      </DemoBox>

      <DemoBox title={t.demoStatusTitle} description={t.demoStatusDesc} code={StatusSource}>
        <StatusBadge />
      </DemoBox>

      <DemoBox
        title={t.demoCustomColorTitle}
        description={t.demoCustomColorDesc}
        code={CustomColorSource}
      >
        <CustomColorBadge />
      </DemoBox>

      <DemoBox title={t.demoOffsetTitle} description={t.demoOffsetDesc} code={OffsetSource}>
        <OffsetBadge />
      </DemoBox>

      <DemoBox title={t.demoTokensTitle} description={t.demoTokensDesc} code={TokensOverrideSource}>
        <TokensOverrideBadge />
      </DemoBox>

      <PropsTable title={t.tableBadgeApi} data={badgeProps} />
      <CssVarsTable title={t.tableCssVars} hint={t.cssHint} data={badgeCssVars} />
    </ComponentDoc>
  )
}
