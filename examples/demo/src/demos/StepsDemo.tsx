import { useMemo } from 'react'
import { ComponentDoc, DemoBox, PropsTable, CssVarsTable } from '../components'
import type { PropDef, CssVarDef } from '../components'

import { useStepsDocStrings } from './steps-doc/useStepsDocStrings'

import { BasicSteps } from './steps/Basic.demo'
import BasicSource from './steps/Basic.demo?raw'
import { ClickableSteps } from './steps/Clickable.demo'
import ClickableSource from './steps/Clickable.demo?raw'
import { VerticalSteps } from './steps/Vertical.demo'
import VerticalSource from './steps/Vertical.demo?raw'
import { ErrorStatusSteps } from './steps/ErrorStatus.demo'
import ErrorStatusSource from './steps/ErrorStatus.demo?raw'
import { CustomIconSteps } from './steps/CustomIcon.demo'
import CustomIconSource from './steps/CustomIcon.demo?raw'
import { SizesSteps } from './steps/Sizes.demo'
import SizesSource from './steps/Sizes.demo?raw'
import { NavigationSteps } from './steps/Navigation.demo'
import NavigationSource from './steps/Navigation.demo?raw'
import { TokensOverrideSteps } from './steps/TokensOverride.demo'
import TokensOverrideSource from './steps/TokensOverride.demo?raw'
import { UnstyledSteps } from './steps/Unstyled.demo'
import UnstyledSource from './steps/Unstyled.demo?raw'

export function StepsDemo() {
  const t = useStepsDocStrings()

  const stepsProps = useMemo<PropDef[]>(
    () => [
      { name: 'current', description: t.propCurrent, type: 'number' },
      { name: 'items', description: t.propItems, type: 'StepItem[]' },
      { name: 'direction', description: t.propDirection, type: "'horizontal' | 'vertical'", default: "'horizontal'" },
      { name: 'onChange', description: t.propOnChange, type: '(current: number) => void' },
      { name: 'type', description: t.propType, type: "'default' | 'navigation'", default: "'default'" },
      { name: 'size', description: t.propSize, type: "'small' | 'middle' | 'large'", default: "'middle'" },
      { name: 'className', description: t.propClassName, type: 'string' },
      { name: 'style', description: t.propStyle, type: 'CSSProperties' },
      { name: 'unstyled', description: t.propUnstyled, type: 'boolean', default: 'false' },
    ],
    [t],
  )

  const stepItemProps = useMemo<PropDef[]>(
    () => [
      { name: 'title', description: t.itemTitle, type: 'ReactNode' },
      { name: 'description', description: t.itemDescription, type: 'ReactNode' },
      { name: 'icon', description: t.itemIcon, type: 'ReactNode' },
      { name: 'status', description: t.itemStatus, type: "'wait' | 'process' | 'finish' | 'error'" },
    ],
    [t],
  )

  const stepsCssVars = useMemo<CssVarDef[]>(
    () => [
      { name: 'sg-color-primary', default: '#1677ff', description: t.cssPrimary },
      { name: 'sg-color-error', default: '#ff4d4f', description: t.cssError },
      { name: 'sg-color-text', default: 'rgba(0, 0, 0, 0.88)', description: t.cssText },
      { name: 'sg-color-text-disabled', default: 'rgba(0, 0, 0, 0.25)', description: t.cssTextDisabled },
      { name: 'sg-color-text-tertiary', default: 'rgba(0, 0, 0, 0.45)', description: t.cssTextTertiary },
      { name: 'sg-color-border', default: '#d9d9d9', description: t.cssBorder },
      { name: 'sg-color-border-secondary', default: '#f0f0f0', description: t.cssBorderSecondary },
      { name: 'sg-color-white', default: '#ffffff', description: t.cssWhite },
      { name: 'sg-font-size', default: '14px', description: t.cssFontSize },
      { name: 'sg-font-size-sm', default: '12px', description: t.cssFontSizeSm },
      { name: 'sg-font-size-lg', default: '16px', description: t.cssFontSizeLg },
      { name: 'sg-padding-sm', default: '8px', description: t.cssPaddingSm },
      { name: 'sg-padding-lg', default: '16px', description: t.cssPaddingLg },
      { name: 'sg-margin-xs', default: '4px', description: t.cssMarginXs },
      { name: 'sg-margin-sm', default: '8px', description: t.cssMarginSm },
      { name: 'sg-transition-duration', default: '180ms', description: t.cssTransitionDuration },
      { name: 'sg-transition-timing', default: 'cubic-bezier(0.645, 0.045, 0.355, 1)', description: t.cssTransitionTiming },
    ],
    [t],
  )

  return (
    <ComponentDoc
      title={t.pageTitle}
      badge={t.pageBadge}
      crumbs={[t.crumbNavigation, t.crumbSteps]}
      description={t.pageLead}
      whenToUse={[t.pageWhen1, t.pageWhen2]}
    >
      <DemoBox title={t.demoBasicTitle} description={t.demoBasicDesc} code={BasicSource}>
        <BasicSteps />
      </DemoBox>

      <DemoBox
        title={t.demoClickableTitle}
        description={t.demoClickableDesc}
        code={ClickableSource}
      >
        <ClickableSteps />
      </DemoBox>

      <DemoBox
        title={t.demoVerticalTitle}
        description={t.demoVerticalDesc}
        code={VerticalSource}
      >
        <VerticalSteps />
      </DemoBox>

      <DemoBox
        title={t.demoErrorTitle}
        description={t.demoErrorDesc}
        code={ErrorStatusSource}
      >
        <ErrorStatusSteps />
      </DemoBox>

      <DemoBox
        title={t.demoCustomIconTitle}
        description={t.demoCustomIconDesc}
        code={CustomIconSource}
      >
        <CustomIconSteps />
      </DemoBox>

      <DemoBox title={t.demoSizesTitle} description={t.demoSizesDesc} code={SizesSource}>
        <SizesSteps />
      </DemoBox>

      <DemoBox
        title={t.demoNavigationTitle}
        description={t.demoNavigationDesc}
        code={NavigationSource}
      >
        <NavigationSteps />
      </DemoBox>

      <DemoBox
        title={t.demoTokensTitle}
        description={t.demoTokensDesc}
        code={TokensOverrideSource}
      >
        <TokensOverrideSteps />
      </DemoBox>

      <DemoBox
        title={t.demoUnstyledTitle}
        description={t.demoUnstyledDesc}
        code={UnstyledSource}
      >
        <UnstyledSteps />
      </DemoBox>

      <PropsTable title={t.tableStepsApi} data={stepsProps} />
      <PropsTable title={t.tableStepItem} data={stepItemProps} />
      <CssVarsTable
        title={t.tableCssVars}
        hint={t.cssHint}
        data={stepsCssVars}
      />
    </ComponentDoc>
  )
}
