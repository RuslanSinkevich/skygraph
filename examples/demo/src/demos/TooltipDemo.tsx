import { useMemo } from 'react'
import { ComponentDoc, DemoBox, PropsTable, CssVarsTable } from '../components'
import type { PropDef, CssVarDef } from '../components'

import { useTooltipDocStrings } from './tooltip-doc/useTooltipDocStrings'

import { BasicTooltip } from './tooltip/Basic.demo'
import BasicSource from './tooltip/Basic.demo?raw'
import { PlacementTooltip } from './tooltip/Placement.demo'
import PlacementSource from './tooltip/Placement.demo?raw'
import { RichContentTooltip } from './tooltip/RichContent.demo'
import RichContentSource from './tooltip/RichContent.demo?raw'
import { OnDisabledTooltip } from './tooltip/OnDisabled.demo'
import OnDisabledSource from './tooltip/OnDisabled.demo?raw'
import { OnIconTooltip } from './tooltip/OnIcon.demo'
import OnIconSource from './tooltip/OnIcon.demo?raw'
import { TokensOverrideTooltip } from './tooltip/TokensOverride.demo'
import TokensOverrideSource from './tooltip/TokensOverride.demo?raw'
import { UnstyledTooltip } from './tooltip/Unstyled.demo'
import UnstyledSource from './tooltip/Unstyled.demo?raw'

export function TooltipDemo() {
  const t = useTooltipDocStrings()

  const tooltipProps = useMemo<PropDef[]>(
    () => [
      { name: 'title', description: t.propTitle, type: 'ReactNode' },
      { name: 'placement', description: t.propPlacement, type: "'top' | 'bottom' | 'left' | 'right'", default: "'top'" },
      { name: 'children', description: t.propChildren, type: 'ReactElement' },
      { name: 'className', description: t.propClassName, type: 'string' },
      { name: 'unstyled', description: t.propUnstyled, type: 'boolean', default: 'false' },
    ],
    [t],
  )

  const tooltipCssVars = useMemo<CssVarDef[]>(
    () => [
      { name: 'sg-color-tooltip-bg', default: 'rgba(0, 0, 0, 0.85)', description: t.cssTooltipBg },
      { name: 'sg-color-tooltip-text', default: '#ffffff', description: t.cssTooltipText },
      { name: 'sg-font-size-sm', default: '12px', description: t.cssFontSizeSm },
      { name: 'sg-padding-xs', default: '4px', description: t.cssPaddingXs },
      { name: 'sg-padding-sm', default: '8px', description: t.cssPaddingSm },
      { name: 'sg-border-radius-sm', default: '4px', description: t.cssRadiusSm },
      { name: 'sg-shadow', default: '0 6px 16px rgba(0,0,0,0.08)', description: t.cssShadow },
      { name: 'sg-z-tooltip', default: '1070', description: t.cssZTooltip },
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
        <BasicTooltip />
      </DemoBox>

      <DemoBox title={t.demoPlacementTitle} description={t.demoPlacementDesc} code={PlacementSource}>
        <PlacementTooltip />
      </DemoBox>

      <DemoBox title={t.demoRichTitle} description={t.demoRichDesc} code={RichContentSource}>
        <RichContentTooltip />
      </DemoBox>

      <DemoBox title={t.demoDisabledTitle} description={t.demoDisabledDesc} code={OnDisabledSource}>
        <OnDisabledTooltip />
      </DemoBox>

      <DemoBox title={t.demoIconTitle} description={t.demoIconDesc} code={OnIconSource}>
        <OnIconTooltip />
      </DemoBox>

      <DemoBox title={t.demoTokensTitle} description={t.demoTokensDesc} code={TokensOverrideSource}>
        <TokensOverrideTooltip />
      </DemoBox>

      <DemoBox title={t.demoUnstyledTitle} description={t.demoUnstyledDesc} code={UnstyledSource}>
        <UnstyledTooltip />
      </DemoBox>

      <PropsTable title={t.tableTooltipApi} data={tooltipProps} />
      <CssVarsTable title={t.tableCssVars} hint={t.cssHint} data={tooltipCssVars} />
    </ComponentDoc>
  )
}
