import { ComponentDoc, DemoBox, PropsTable, CssVarsTable } from '../components'
import type { PropDef, CssVarDef } from '../components'

import { BasicColorPicker } from './colorpicker/Basic.demo'
import BasicSource from './colorpicker/Basic.demo?raw'
import { FormatsColorPicker } from './colorpicker/Formats.demo'
import FormatsSource from './colorpicker/Formats.demo?raw'
import { PresetsColorPicker } from './colorpicker/Presets.demo'
import PresetsSource from './colorpicker/Presets.demo?raw'
import { SizesColorPicker } from './colorpicker/Sizes.demo'
import SizesSource from './colorpicker/Sizes.demo?raw'
import { TriggerColorPicker } from './colorpicker/Trigger.demo'
import TriggerSource from './colorpicker/Trigger.demo?raw'
import { DisabledColorPicker } from './colorpicker/Disabled.demo'
import DisabledSource from './colorpicker/Disabled.demo?raw'
import { ThemeSwapColorPicker } from './colorpicker/ThemeSwap.demo'
import ThemeSwapSource from './colorpicker/ThemeSwap.demo?raw'
import { TokensOverrideColorPicker } from './colorpicker/TokensOverride.demo'
import TokensOverrideSource from './colorpicker/TokensOverride.demo?raw'
import { UnstyledColorPicker } from './colorpicker/Unstyled.demo'
import UnstyledSource from './colorpicker/Unstyled.demo?raw'

const colorPickerProps: PropDef[] = [
  { name: 'value', description: 'Controlled colour as hex "#rrggbb" or "rgb(r, g, b)"', type: 'string' },
  { name: 'defaultValue', description: 'Initial colour when uncontrolled', type: 'string', default: "'#1677ff'" },
  { name: 'onChange', description: 'Fires with the formatted colour string', type: '(color: string) => void' },
  { name: 'format', description: 'Display + onChange payload format', type: "'hex' | 'rgb'", default: "'hex'" },
  { name: 'presets', description: 'Grouped preset swatches', type: 'Array<{ label: string; colors: string[] }>' },
  { name: 'showText', description: 'Show formatted text next to the swatch, or render custom node', type: 'boolean | ((color: string) => ReactNode)', default: 'false' },
  { name: 'trigger', description: 'How the panel opens', type: "'click' | 'hover'", default: "'click'" },
  { name: 'open', description: 'Controlled open state of the panel', type: 'boolean' },
  { name: 'onOpenChange', description: 'Fires when the panel opens or closes', type: '(open: boolean) => void' },
  { name: 'size', description: 'Trigger height + swatch size', type: "'small' | 'middle' | 'large'", default: "'middle'" },
  { name: 'disabled', description: 'Lock the picker', type: 'boolean', default: 'false' },
  { name: 'className', description: 'Wrapper className', type: 'string' },
  { name: 'style', description: 'Wrapper inline style', type: 'CSSProperties' },
  { name: 'unstyled', description: 'Drop all SkyGraph classes (headless mode)', type: 'boolean', default: 'false' },
]

const colorPickerCssVars: CssVarDef[] = [
  { name: 'sg-color-border', default: 'rgba(5, 5, 5, 0.06)', description: 'Trigger border, swatch border, input border inside panel' },
  { name: 'sg-color-border-secondary', default: 'rgba(5, 5, 5, 0.04)', description: 'Dropdown border + swatch outline' },
  { name: 'sg-color-primary', default: '#1677ff', description: 'Focus ring on trigger and hex/rgb input' },
  { name: 'sg-color-primary-hover', default: '#4096ff', description: 'Trigger hover border' },
  { name: 'sg-color-primary-bg', default: 'rgba(22, 119, 255, 0.1)', description: 'Focus glow + preset hover halo' },
  { name: 'sg-color-bg-container', default: '#ffffff', description: 'Trigger background + hex input background' },
  { name: 'sg-color-bg-elevated', default: '#ffffff', description: 'Dropdown panel background' },
  { name: 'sg-color-text', default: 'rgba(0, 0, 0, 0.88)', description: 'Trigger and input text colour' },
  { name: 'sg-color-text-secondary', default: 'rgba(0, 0, 0, 0.65)', description: 'Formatted value label (showText)' },
  { name: 'sg-color-text-tertiary', default: 'rgba(0, 0, 0, 0.45)', description: 'Preset group label' },
  { name: 'sg-border-radius', default: '6px', description: 'Trigger border radius' },
  { name: 'sg-border-radius-sm', default: '4px', description: 'Swatches, preview, hex input radius' },
  { name: 'sg-border-radius-lg', default: '8px', description: 'Dropdown panel radius' },
  { name: 'sg-height-sm', default: '24px', description: 'Trigger height (size="small") + hex input height' },
  { name: 'sg-height-md', default: '32px', description: 'Trigger height (size="middle")' },
  { name: 'sg-height-lg', default: '40px', description: 'Trigger height (size="large")' },
  { name: 'sg-padding-xs', default: '4px', description: 'Compact swatch / preset gaps' },
  { name: 'sg-padding-sm', default: '8px', description: 'Trigger inner gap + input row gap' },
  { name: 'sg-padding-md', default: '12px', description: 'Dropdown padding' },
  { name: 'sg-font-size', default: '14px', description: 'Trigger text size' },
  { name: 'sg-font-size-sm', default: '12px', description: 'Hex input + preset label + showText' },
  { name: 'sg-shadow-lg', default: '0 6px 16px rgba(0,0,0,0.08)', description: 'Dropdown elevation' },
  { name: 'sg-transition-duration', default: '180ms', description: 'Focus / hover / preset transition speed' },
  { name: 'sg-transition-timing', default: 'cubic-bezier(0.645, 0.045, 0.355, 1)', description: 'Shared easing' },
  { name: 'sg-z-dropdown', default: '1050', description: 'Stacking layer of the dropdown' },
]

export function ColorPickerDemo() {
  return (
    <ComponentDoc
      title="ColorPicker"
      description="Popover color picker with saturation square, hue strip, hex / rgb input and optional preset groups. Supports click / hover triggers and controlled open state."
      whenToUse={[
        'Let users pick brand colours — feed the result straight into --sg-color-primary.',
        'Design-tool style interactions where a swatch + popover is cleaner than a modal.',
        'Surveys or configs that accept an arbitrary colour instead of a fixed palette.',
      ]}
    >
      <DemoBox title="Basic" description="Controlled hex value bound to a live preview swatch." code={BasicSource}>
        <BasicColorPicker />
      </DemoBox>

      <DemoBox
        title="Format"
        description="Pick between hex and rgb payloads — the trigger label mirrors the chosen format."
        code={FormatsSource}
      >
        <FormatsColorPicker />
      </DemoBox>

      <DemoBox
        title="Presets"
        description="Grouped preset swatches under the panel for brand palettes."
        code={PresetsSource}
      >
        <PresetsColorPicker />
      </DemoBox>

      <DemoBox title="Sizes" description="Trigger height + swatch scale with the size prop." code={SizesSource}>
        <SizesColorPicker />
      </DemoBox>

      <DemoBox
        title="Trigger"
        description="Click is the default; hover is useful in toolbars."
        code={TriggerSource}
      >
        <TriggerColorPicker />
      </DemoBox>

      <DemoBox title="Disabled" description="Trigger stays readable but won't open." code={DisabledSource}>
        <DisabledColorPicker />
      </DemoBox>

      <DemoBox
        title="Live theme swap"
        description="Drive --sg-color-primary from the picker and watch every component restyle instantly."
        code={ThemeSwapSource}
      >
        <ThemeSwapColorPicker />
      </DemoBox>

      <DemoBox
        title="Tokens override"
        description="Scope global colour / radius tokens on a wrapper to restyle without a theme file."
        code={TokensOverrideSource}
      >
        <TokensOverrideColorPicker />
      </DemoBox>

      <DemoBox
        title="Unstyled"
        description="Drop every SkyGraph class and bring your own design — behaviour stays."
        code={UnstyledSource}
      >
        <UnstyledColorPicker />
      </DemoBox>

      <PropsTable title="ColorPicker API" data={colorPickerProps} />
      <CssVarsTable
        title="CSS Variables"
        hint="ColorPicker has no component-specific tokens — it composes the global form tokens (trigger) and surface tokens (dropdown). Override them on a wrapper with inline style={{ '--sg-...': ... }} to restyle."
        data={colorPickerCssVars}
      />
    </ComponentDoc>
  )
}
