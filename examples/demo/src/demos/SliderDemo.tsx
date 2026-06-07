import { useMemo } from 'react'
import { ComponentDoc, DemoBox, PropsTable, CssVarsTable } from '../components'
import type { PropDef, CssVarDef } from '../components'

import { useSliderDocStrings } from './slider-doc/useSliderDocStrings'

import { BasicSlider } from './slider/Basic.demo'
import BasicSource from './slider/Basic.demo?raw'
import { MinMaxStepSlider } from './slider/MinMaxStep.demo'
import MinMaxStepSource from './slider/MinMaxStep.demo?raw'
import { WithValueSlider } from './slider/WithValue.demo'
import WithValueSource from './slider/WithValue.demo?raw'
import { DisabledSlider } from './slider/Disabled.demo'
import DisabledSource from './slider/Disabled.demo?raw'
import { InFormSlider } from './slider/InForm.demo'
import InFormSource from './slider/InForm.demo?raw'
import { TokensOverrideSlider } from './slider/TokensOverride.demo'
import TokensOverrideSource from './slider/TokensOverride.demo?raw'

export function SliderDemo() {
  const t = useSliderDocStrings()

  const sliderProps = useMemo<PropDef[]>(
    () => [
      { name: 'value', description: t.propValue, type: 'number' },
      { name: 'defaultValue', description: t.propDefaultValue, type: 'number', default: '0' },
      { name: 'min', description: t.propMin, type: 'number', default: '0' },
      { name: 'max', description: t.propMax, type: 'number', default: '100' },
      { name: 'step', description: t.propStep, type: 'number', default: '1' },
      { name: 'onChange', description: t.propOnChange, type: '(value: number) => void' },
      { name: 'disabled', description: t.propDisabled, type: 'boolean', default: 'false' },
      { name: 'className', description: t.propClassName, type: 'string' },
      { name: 'style', description: t.propStyle, type: 'CSSProperties' },
      { name: 'unstyled', description: t.propUnstyled, type: 'boolean', default: 'false' },
    ],
    [t],
  )

  const sliderCssVars = useMemo<CssVarDef[]>(
    () => [
      {
        name: 'sg-slider-min-inline-size',
        default: 'calc(8 * var(--sg-font-size))',
        description: t.cssSgSliderMinInlineSize,
      },
      { name: 'sg-color-primary', default: 'var(--sg-blue-6)', description: t.cssSgColorPrimary },
      {
        name: 'sg-color-primary-bg',
        default: 'rgba(22, 119, 255, 0.1)',
        description: t.cssSgColorPrimaryBg,
      },
      { name: 'sg-color-border', default: 'rgba(5, 5, 5, 0.06)', description: t.cssSgColorBorder },
      { name: 'sg-color-white', default: '#ffffff', description: t.cssSgColorWhite },
      { name: 'sg-padding-sm', default: '12px', description: t.cssSgPaddingSm },
      { name: 'sg-transition-duration', default: '180ms', description: t.cssSgTransitionDuration },
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
        <BasicSlider />
      </DemoBox>

      <DemoBox
        title={t.demoMinMaxStepTitle}
        description={t.demoMinMaxStepDesc}
        code={MinMaxStepSource}
      >
        <MinMaxStepSlider />
      </DemoBox>

      <DemoBox
        title={t.demoWithValueTitle}
        description={t.demoWithValueDesc}
        code={WithValueSource}
      >
        <WithValueSlider />
      </DemoBox>

      <DemoBox title={t.demoDisabledTitle} description={t.demoDisabledDesc} code={DisabledSource}>
        <DisabledSlider />
      </DemoBox>

      <DemoBox title={t.demoInFormTitle} description={t.demoInFormDesc} code={InFormSource}>
        <InFormSlider />
      </DemoBox>

      <DemoBox title={t.demoTokensTitle} description={t.demoTokensDesc} code={TokensOverrideSource}>
        <TokensOverrideSlider />
      </DemoBox>

      <PropsTable title={t.tableSliderApi} data={sliderProps} />
      <CssVarsTable title={t.tableCssVars} hint={t.cssHint} data={sliderCssVars} />
    </ComponentDoc>
  )
}
