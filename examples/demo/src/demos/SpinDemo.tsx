import { ComponentDoc, DemoBox, PropsTable, CssVarsTable } from '../components'
import type { PropDef, CssVarDef } from '../components'

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

const spinProps: PropDef[] = [
  { name: 'spinning', description: 'Whether the spinner is visible', type: 'boolean', default: 'true' },
  { name: 'size', description: 'Ring size — 12 / 24 / 36px for small / middle / large', type: "'small' | 'middle' | 'large'", default: "'middle'" },
  { name: 'delay', description: 'Defer showing the spinner by N ms (prevents flicker)', type: 'number' },
  { name: 'tip', description: 'Caption rendered below the spinner', type: 'string' },
  { name: 'fullscreen', description: 'Cover the viewport with a dimmed backdrop at z-modal', type: 'boolean', default: 'false' },
  { name: 'indicator', description: 'Replace the ring with a custom node', type: 'ReactNode' },
  { name: 'children', description: 'Content to overlay with the spinner', type: 'ReactNode' },
  { name: 'className', description: 'Wrapper className', type: 'string' },
  { name: 'style', description: 'Wrapper inline style', type: 'CSSProperties' },
  { name: 'unstyled', description: 'Drop every sg-spin-* class (headless mode)', type: 'boolean', default: 'false' },
]

const spinCssVars: CssVarDef[] = [
  { name: 'sg-spin-color', default: 'var(--sg-color-primary)', description: 'Ring colour — Spin-local, defaults to the global primary' },
  { name: 'sg-spin-overlay-bg', default: 'rgba(255, 255, 255, 0.65)', description: 'Backdrop colour for container / fullscreen overlay' },
  { name: 'sg-color-primary', default: '#1677ff', description: 'Default ring colour (read through `--sg-spin-color`) + tip text' },
  { name: 'sg-font-size-sm', default: '12px', description: 'Tip text size' },
  { name: 'sg-margin-sm', default: '8px', description: 'Gap between spinner and tip (standalone / overlay / fullscreen)' },
  { name: 'sg-border-radius', default: '6px', description: 'Overlay corner radius (matches the wrapped block)' },
  { name: 'sg-z-loading', default: '900', description: 'z-index of the container overlay' },
  { name: 'sg-z-modal', default: '1000', description: 'z-index of the fullscreen backdrop' },
]

export function SpinDemo() {
  return (
    <ComponentDoc
      title="Spin"
      description="Loading indicator — inline, inside a container (with overlay), or fullscreen. Supports delay, custom indicators, and a single-token color override."
      whenToUse={[
        'Async sections that will render real content shortly.',
        'Buttons + forms that need a loading mask to block duplicate submits.',
        'Route / page transitions — paired with `fullscreen`.',
      ]}
    >
      <DemoBox title="Basic" description="A standalone spinner." code={BasicSource}>
        <BasicSpin />
      </DemoBox>

      <DemoBox title="Sizes" description="Small / middle / large." code={SizesSource}>
        <SizesSpin />
      </DemoBox>

      <DemoBox
        title="Wrapping children"
        description="Blur + mask the wrapped content while `spinning`."
        code={ContainerSource}
      >
        <ContainerSpin />
      </DemoBox>

      <DemoBox
        title="Tip"
        description="Short status line under the spinner."
        code={TipSource}
      >
        <TipSpin />
      </DemoBox>

      <DemoBox
        title="Delay"
        description="Skip the spinner entirely for fast requests."
        code={DelaySource}
      >
        <DelaySpin />
      </DemoBox>

      <DemoBox
        title="Custom color"
        description="Override `--sg-spin-color` per scope — no class wrangling."
        code={CustomColorSource}
      >
        <CustomColorSpin />
      </DemoBox>

      <DemoBox
        title="Custom indicator"
        description="Swap the ring for any ReactNode."
        code={CustomIndicatorSource}
      >
        <CustomIndicatorSpin />
      </DemoBox>

      <DemoBox
        title="Fullscreen"
        description="Viewport-level overlay at z-modal."
        code={FullscreenSource}
      >
        <FullscreenSpin />
      </DemoBox>

      <DemoBox
        title="Tokens override"
        description="Tune ring + overlay background via CSS vars."
        code={TokensOverrideSource}
      >
        <TokensOverrideSpin />
      </DemoBox>

      <DemoBox
        title="Unstyled"
        description="Keep the delay + overlay logic, ship your own visuals."
        code={UnstyledSource}
      >
        <UnstyledSpin />
      </DemoBox>

      <PropsTable title="Spin API" data={spinProps} />
      <CssVarsTable
        title="CSS Variables"
        hint="Spin exposes two component-local tokens: `--sg-spin-color` for the ring and `--sg-spin-overlay-bg` for the container / fullscreen backdrop. Scope them on a wrapper to tint a single section without touching the global primary."
        data={spinCssVars}
      />
    </ComponentDoc>
  )
}
