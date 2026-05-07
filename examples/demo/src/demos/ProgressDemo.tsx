import { useMemo } from 'react'
import { ComponentDoc, DemoBox, PropsTable, CssVarsTable } from '../components'
import type { PropDef, CssVarDef } from '../components'

import { useProgressDocStrings } from './progress-doc/useProgressDocStrings'

import { LineProgress } from './progress/Line.demo'
import LineSource from './progress/Line.demo?raw'
import { CircleProgress } from './progress/Circle.demo'
import CircleSource from './progress/Circle.demo?raw'
import { DynamicProgress } from './progress/Dynamic.demo'
import DynamicSource from './progress/Dynamic.demo?raw'
import { ActiveProgress } from './progress/Active.demo'
import ActiveSource from './progress/Active.demo?raw'
import { CustomColorProgress } from './progress/CustomColor.demo'
import CustomColorSource from './progress/CustomColor.demo?raw'
import { SizesProgress } from './progress/Sizes.demo'
import SizesSource from './progress/Sizes.demo?raw'
import { NoInfoProgress } from './progress/NoInfo.demo'
import NoInfoSource from './progress/NoInfo.demo?raw'
import { TokensOverrideProgress } from './progress/TokensOverride.demo'
import TokensOverrideSource from './progress/TokensOverride.demo?raw'
import { UnstyledProgress } from './progress/Unstyled.demo'
import UnstyledSource from './progress/Unstyled.demo?raw'

export function ProgressDemo() {
  const t = useProgressDocStrings()

  const progressProps = useMemo<PropDef[]>(
    () => [
      { name: 'percent', description: t.propPercent, type: 'number', required: true },
      { name: 'type', description: t.propType, type: "'line' | 'circle'", default: "'line'" },
      { name: 'status', description: t.propStatus, type: "'normal' | 'success' | 'error' | 'active'", default: "'normal'" },
      { name: 'showInfo', description: t.propShowInfo, type: 'boolean', default: 'true' },
      { name: 'strokeWidth', description: t.propStrokeWidth, type: 'number' },
      { name: 'strokeColor', description: t.propStrokeColor, type: 'string' },
      { name: 'width', description: t.propWidth, type: 'number', default: '120' },
      { name: 'size', description: t.propSize, type: "'small' | 'middle' | 'large'", default: "'middle'" },
      { name: 'className', description: t.propClassName, type: 'string' },
      { name: 'style', description: t.propStyle, type: 'CSSProperties' },
      { name: 'unstyled', description: t.propUnstyled, type: 'boolean', default: 'false' },
    ],
    [t],
  )

  const progressCssVars = useMemo<CssVarDef[]>(
    () => [
      { name: 'sg-color-primary', default: '#1677ff', description: t.cssPrimary },
      { name: 'sg-color-success', default: '#52c41a', description: t.cssSuccess },
      { name: 'sg-color-error', default: '#ff4d4f', description: t.cssError },
      { name: 'sg-color-bg-hover', default: 'rgba(0, 0, 0, 0.04)', description: t.cssBgHover },
      { name: 'sg-color-text', default: 'rgba(0, 0, 0, 0.88)', description: t.cssText },
      { name: 'sg-color-text-secondary', default: 'rgba(0, 0, 0, 0.65)', description: t.cssTextSecondary },
      { name: 'sg-font-size-sm', default: '12px', description: t.cssFontSizeSm },
      { name: 'sg-font-size-xl', default: '20px', description: t.cssFontSizeXl },
      { name: 'sg-padding-sm', default: '8px', description: t.cssPaddingSm },
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
      <DemoBox title={t.demoLineTitle} description={t.demoLineDesc} code={LineSource}>
        <LineProgress />
      </DemoBox>

      <DemoBox title={t.demoCircleTitle} description={t.demoCircleDesc} code={CircleSource}>
        <CircleProgress />
      </DemoBox>

      <DemoBox title={t.demoActiveTitle} description={t.demoActiveDesc} code={ActiveSource}>
        <ActiveProgress />
      </DemoBox>

      <DemoBox title={t.demoDynamicTitle} description={t.demoDynamicDesc} code={DynamicSource}>
        <DynamicProgress />
      </DemoBox>

      <DemoBox title={t.demoCustomColorTitle} description={t.demoCustomColorDesc} code={CustomColorSource}>
        <CustomColorProgress />
      </DemoBox>

      <DemoBox title={t.demoSizesTitle} description={t.demoSizesDesc} code={SizesSource}>
        <SizesProgress />
      </DemoBox>

      <DemoBox title={t.demoNoInfoTitle} description={t.demoNoInfoDesc} code={NoInfoSource}>
        <NoInfoProgress />
      </DemoBox>

      <DemoBox title={t.demoTokensTitle} description={t.demoTokensDesc} code={TokensOverrideSource}>
        <TokensOverrideProgress />
      </DemoBox>

      <DemoBox title={t.demoUnstyledTitle} description={t.demoUnstyledDesc} code={UnstyledSource}>
        <UnstyledProgress />
      </DemoBox>

      <PropsTable title={t.tableProgressApi} data={progressProps} />
      <CssVarsTable title={t.tableCssVars} hint={t.cssHint} data={progressCssVars} />
    </ComponentDoc>
  )
}
