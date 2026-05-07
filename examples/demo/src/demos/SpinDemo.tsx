import { useMemo } from 'react'
import { ComponentDoc, DemoBox, PropsTable, CssVarsTable } from '../components'
import type { PropDef, CssVarDef } from '../components'

import { useSpinDocStrings } from './spin-doc/useSpinDocStrings'

import { BasicSpin } from './spin/Basic.demo'
import BasicSource from './spin/Basic.demo?raw'
import { SizesSpin } from './spin/Sizes.demo'
import SizesSource from './spin/Sizes.demo?raw'
import { ContainerSpin } from './spin/Container.demo'
import ContainerSource from './spin/Container.demo?raw'
import { TipSpin } from './spin/Tip.demo'
import TipSource from './spin/Tip.demo?raw'
import { DelaySpin } from './spin/Delay.demo'
import DelaySource from './spin/Delay.demo?raw'
import { CustomColorSpin } from './spin/CustomColor.demo'
import CustomColorSource from './spin/CustomColor.demo?raw'
import { CustomIndicatorSpin } from './spin/CustomIndicator.demo'
import CustomIndicatorSource from './spin/CustomIndicator.demo?raw'
import { FullscreenSpin } from './spin/Fullscreen.demo'
import FullscreenSource from './spin/Fullscreen.demo?raw'
import { TokensOverrideSpin } from './spin/TokensOverride.demo'
import TokensOverrideSource from './spin/TokensOverride.demo?raw'
import { UnstyledSpin } from './spin/Unstyled.demo'
import UnstyledSource from './spin/Unstyled.demo?raw'

export function SpinDemo() {
  const t = useSpinDocStrings()

  const spinProps = useMemo<PropDef[]>(
    () => [
      { name: 'spinning', description: t.propSpinning, type: 'boolean', default: 'true' },
      { name: 'size', description: t.propSize, type: "'small' | 'middle' | 'large'", default: "'middle'" },
      { name: 'delay', description: t.propDelay, type: 'number' },
      { name: 'tip', description: t.propTip, type: 'string' },
      { name: 'fullscreen', description: t.propFullscreen, type: 'boolean', default: 'false' },
      { name: 'indicator', description: t.propIndicator, type: 'ReactNode' },
      { name: 'children', description: t.propChildren, type: 'ReactNode' },
      { name: 'className', description: t.propClassName, type: 'string' },
      { name: 'style', description: t.propStyle, type: 'CSSProperties' },
      { name: 'unstyled', description: t.propUnstyled, type: 'boolean', default: 'false' },
    ],
    [t],
  )

  const spinCssVars = useMemo<CssVarDef[]>(
    () => [
      { name: 'sg-spin-color', default: 'var(--sg-color-primary)', description: t.cssSpinColor },
      { name: 'sg-spin-overlay-bg', default: 'rgba(255, 255, 255, 0.65)', description: t.cssSpinOverlayBg },
      { name: 'sg-color-primary', default: '#1677ff', description: t.cssPrimary },
      { name: 'sg-font-size-sm', default: '12px', description: t.cssFontSizeSm },
      { name: 'sg-margin-sm', default: '8px', description: t.cssMarginSm },
      { name: 'sg-border-radius', default: '6px', description: t.cssRadius },
      { name: 'sg-z-loading', default: '900', description: t.cssZLoading },
      { name: 'sg-z-modal', default: '1000', description: t.cssZModal },
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
        <BasicSpin />
      </DemoBox>

      <DemoBox title={t.demoSizesTitle} description={t.demoSizesDesc} code={SizesSource}>
        <SizesSpin />
      </DemoBox>

      <DemoBox title={t.demoContainerTitle} description={t.demoContainerDesc} code={ContainerSource}>
        <ContainerSpin />
      </DemoBox>

      <DemoBox title={t.demoTipTitle} description={t.demoTipDesc} code={TipSource}>
        <TipSpin />
      </DemoBox>

      <DemoBox title={t.demoDelayTitle} description={t.demoDelayDesc} code={DelaySource}>
        <DelaySpin />
      </DemoBox>

      <DemoBox title={t.demoCustomColorTitle} description={t.demoCustomColorDesc} code={CustomColorSource}>
        <CustomColorSpin />
      </DemoBox>

      <DemoBox title={t.demoCustomIndicatorTitle} description={t.demoCustomIndicatorDesc} code={CustomIndicatorSource}>
        <CustomIndicatorSpin />
      </DemoBox>

      <DemoBox title={t.demoFullscreenTitle} description={t.demoFullscreenDesc} code={FullscreenSource}>
        <FullscreenSpin />
      </DemoBox>

      <DemoBox title={t.demoTokensTitle} description={t.demoTokensDesc} code={TokensOverrideSource}>
        <TokensOverrideSpin />
      </DemoBox>

      <DemoBox title={t.demoUnstyledTitle} description={t.demoUnstyledDesc} code={UnstyledSource}>
        <UnstyledSpin />
      </DemoBox>

      <PropsTable title={t.tableSpinApi} data={spinProps} />
      <CssVarsTable title={t.tableCssVars} hint={t.cssHint} data={spinCssVars} />
    </ComponentDoc>
  )
}
