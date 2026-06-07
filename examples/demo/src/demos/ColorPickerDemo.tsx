import { useMemo } from 'react'
import { ComponentDoc, DemoBox, PropsTable, CssVarsTable } from '../components'
import type { PropDef, CssVarDef } from '../components'

import { useColorPickerDocStrings } from './colorpicker-doc/useColorPickerDocStrings'

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
import { FloatingLabelColorPicker } from './colorpicker/FloatingLabel.demo'
import FloatingLabelSource from './colorpicker/FloatingLabel.demo?raw'

export function ColorPickerDemo() {
  const t = useColorPickerDocStrings()

  const colorPickerProps = useMemo<PropDef[]>(
    () => [
      { name: 'value', description: t.propValue, type: 'string' },
      {
        name: 'defaultValue',
        description: t.propDefaultValue,
        type: 'string',
        default: "'#1677ff'",
      },
      { name: 'onChange', description: t.propOnChange, type: '(color: string) => void' },
      { name: 'format', description: t.propFormat, type: "'hex' | 'rgb'", default: "'hex'" },
      {
        name: 'presets',
        description: t.propPresets,
        type: 'Array<{ label: string; colors: string[] }>',
      },
      {
        name: 'showText',
        description: t.propShowText,
        type: 'boolean | ((color: string) => ReactNode)',
        default: 'false',
      },
      {
        name: 'trigger',
        description: t.propTrigger,
        type: "'click' | 'hover'",
        default: "'click'",
      },
      { name: 'open', description: t.propOpen, type: 'boolean' },
      { name: 'onOpenChange', description: t.propOnOpenChange, type: '(open: boolean) => void' },
      {
        name: 'size',
        description: t.propSize,
        type: "'small' | 'middle' | 'large'",
        default: "'middle'",
      },
      { name: 'disabled', description: t.propDisabled, type: 'boolean', default: 'false' },
      { name: 'className', description: t.propClassName, type: 'string' },
      { name: 'style', description: t.propStyle, type: 'CSSProperties' },
      { name: 'unstyled', description: t.propUnstyled, type: 'boolean', default: 'false' },
    ],
    [t],
  )

  const colorPickerCssVars = useMemo<CssVarDef[]>(
    () => [
      { name: 'sg-color-border', default: 'rgba(5, 5, 5, 0.06)', description: t.cssSgColorBorder },
      {
        name: 'sg-color-border-secondary',
        default: 'rgba(5, 5, 5, 0.04)',
        description: t.cssSgColorBorderSecondary,
      },
      { name: 'sg-color-primary', default: '#1677ff', description: t.cssSgColorPrimary },
      { name: 'sg-color-primary-hover', default: '#4096ff', description: t.cssSgColorPrimaryHover },
      {
        name: 'sg-color-primary-bg',
        default: 'rgba(22, 119, 255, 0.1)',
        description: t.cssSgColorPrimaryBg,
      },
      { name: 'sg-color-bg-container', default: '#ffffff', description: t.cssSgColorBgContainer },
      { name: 'sg-color-bg-elevated', default: '#ffffff', description: t.cssSgColorBgElevated },
      { name: 'sg-color-text', default: 'rgba(0, 0, 0, 0.88)', description: t.cssSgColorText },
      {
        name: 'sg-color-text-secondary',
        default: 'rgba(0, 0, 0, 0.65)',
        description: t.cssSgColorTextSecondary,
      },
      {
        name: 'sg-color-text-tertiary',
        default: 'rgba(0, 0, 0, 0.45)',
        description: t.cssSgColorTextTertiary,
      },
      { name: 'sg-border-radius', default: '6px', description: t.cssSgBorderRadius },
      { name: 'sg-border-radius-sm', default: '4px', description: t.cssSgBorderRadiusSm },
      { name: 'sg-border-radius-lg', default: '8px', description: t.cssSgBorderRadiusLg },
      { name: 'sg-height-sm', default: '24px', description: t.cssSgHeightSm },
      { name: 'sg-height-md', default: '32px', description: t.cssSgHeightMd },
      { name: 'sg-height-lg', default: '40px', description: t.cssSgHeightLg },
      { name: 'sg-padding-xs', default: '4px', description: t.cssSgPaddingXs },
      { name: 'sg-padding-sm', default: '8px', description: t.cssSgPaddingSm },
      { name: 'sg-padding-md', default: '12px', description: t.cssSgPaddingMd },
      { name: 'sg-font-size', default: '14px', description: t.cssSgFontSize },
      { name: 'sg-font-size-sm', default: '12px', description: t.cssSgFontSizeSm },
      {
        name: 'sg-shadow-lg',
        default: '0 6px 16px rgba(0,0,0,0.08)',
        description: t.cssSgShadowLg,
      },
      { name: 'sg-transition-duration', default: '180ms', description: t.cssSgTransitionDuration },
      {
        name: 'sg-transition-timing',
        default: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
        description: t.cssSgTransitionTiming,
      },
      { name: 'sg-z-dropdown', default: '1050', description: t.cssSgZDropdown },
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
        <BasicColorPicker />
      </DemoBox>

      <DemoBox title={t.demoFormatsTitle} description={t.demoFormatsDesc} code={FormatsSource}>
        <FormatsColorPicker />
      </DemoBox>

      <DemoBox title={t.demoPresetsTitle} description={t.demoPresetsDesc} code={PresetsSource}>
        <PresetsColorPicker />
      </DemoBox>

      <DemoBox title={t.demoSizesTitle} description={t.demoSizesDesc} code={SizesSource}>
        <SizesColorPicker />
      </DemoBox>

      <DemoBox title={t.demoTriggerTitle} description={t.demoTriggerDesc} code={TriggerSource}>
        <TriggerColorPicker />
      </DemoBox>

      <DemoBox title={t.demoDisabledTitle} description={t.demoDisabledDesc} code={DisabledSource}>
        <DisabledColorPicker />
      </DemoBox>

      <DemoBox
        title={t.demoThemeSwapTitle}
        description={t.demoThemeSwapDesc}
        code={ThemeSwapSource}
      >
        <ThemeSwapColorPicker />
      </DemoBox>

      <DemoBox
        title={t.demoTokensOverrideTitle}
        description={t.demoTokensOverrideDesc}
        code={TokensOverrideSource}
      >
        <TokensOverrideColorPicker />
      </DemoBox>

      <DemoBox
        title={t.demoFloatingLabelTitle}
        description={t.demoFloatingLabelDesc}
        code={FloatingLabelSource}
      >
        <FloatingLabelColorPicker />
      </DemoBox>

      <PropsTable title={t.tableColorPickerApi} data={colorPickerProps} />
      <CssVarsTable title={t.tableCssVars} hint={t.cssHint} data={colorPickerCssVars} />
    </ComponentDoc>
  )
}
