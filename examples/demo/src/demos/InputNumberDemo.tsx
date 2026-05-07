import { useMemo } from 'react'
import { ComponentDoc, DemoBox, PropsTable, CssVarsTable } from '../components'
import type { PropDef, CssVarDef } from '../components'

import { useInputNumberDocStrings } from './inputnumber-doc/useInputNumberDocStrings'

import { BasicInputNumber } from './inputnumber/Basic.demo'
import BasicSource from './inputnumber/Basic.demo?raw'
import { MinMaxStepInputNumber } from './inputnumber/MinMaxStep.demo'
import MinMaxStepSource from './inputnumber/MinMaxStep.demo?raw'
import { PrecisionInputNumber } from './inputnumber/Precision.demo'
import PrecisionSource from './inputnumber/Precision.demo?raw'
import { SizesInputNumber } from './inputnumber/Sizes.demo'
import SizesSource from './inputnumber/Sizes.demo?raw'
import { StatesInputNumber } from './inputnumber/States.demo'
import StatesSource from './inputnumber/States.demo?raw'
import { InFormInputNumber } from './inputnumber/InForm.demo'
import InFormSource from './inputnumber/InForm.demo?raw'
import { TokensOverrideInputNumber } from './inputnumber/TokensOverride.demo'
import TokensOverrideSource from './inputnumber/TokensOverride.demo?raw'
import { UnstyledInputNumber } from './inputnumber/Unstyled.demo'
import UnstyledSource from './inputnumber/Unstyled.demo?raw'

export function InputNumberDemo() {
  const t = useInputNumberDocStrings()

  const inputNumberProps = useMemo<PropDef[]>(
    () => [
      { name: 'value', description: t.propValue, type: 'number' },
      { name: 'defaultValue', description: t.propDefaultValue, type: 'number' },
      { name: 'min', description: t.propMin, type: 'number' },
      { name: 'max', description: t.propMax, type: 'number' },
      { name: 'step', description: t.propStep, type: 'number', default: '1' },
      { name: 'precision', description: t.propPrecision, type: 'number' },
      { name: 'placeholder', description: t.propPlaceholder, type: 'string' },
      { name: 'onChange', description: t.propOnChange, type: '(value: number | null) => void' },
      { name: 'onBlur', description: t.propOnBlur, type: '() => void' },
      { name: 'disabled', description: t.propDisabled, type: 'boolean', default: 'false' },
      { name: 'loading', description: t.propLoading, type: 'boolean', default: 'false' },
      { name: 'size', description: t.propSize, type: "'small' | 'middle' | 'large'", default: "'middle'" },
      { name: 'className', description: t.propClassName, type: 'string' },
      { name: 'style', description: t.propStyle, type: 'CSSProperties' },
      { name: 'unstyled', description: t.propUnstyled, type: 'boolean', default: 'false' },
    ],
    [t],
  )

  const inputNumberCssVars = useMemo<CssVarDef[]>(
    () => [
      { name: 'sg-color-border', default: 'rgba(5, 5, 5, 0.06)', description: t.cssSgColorBorder },
      { name: 'sg-border-radius', default: '6px', description: t.cssSgBorderRadius },
      { name: 'sg-color-bg-container', default: '#ffffff', description: t.cssSgColorBgContainer },
      { name: 'sg-color-bg-secondary', default: 'rgba(0, 0, 0, 0.02)', description: t.cssSgColorBgSecondary },
      { name: 'sg-color-bg-hover', default: 'rgba(0, 0, 0, 0.04)', description: t.cssSgColorBgHover },
      { name: 'sg-color-text', default: 'rgba(0, 0, 0, 0.88)', description: t.cssSgColorText },
      { name: 'sg-color-text-disabled', default: 'rgba(0, 0, 0, 0.25)', description: t.cssSgColorTextDisabled },
      { name: 'sg-color-text-tertiary', default: 'rgba(0, 0, 0, 0.45)', description: t.cssSgColorTextTertiary },
      { name: 'sg-font-size', default: '14px', description: t.cssSgFontSize },
      { name: 'sg-font-size-sm', default: '12px', description: t.cssSgFontSizeSm },
      { name: 'sg-font-size-lg', default: '16px', description: t.cssSgFontSizeLg },
      { name: 'sg-height-sm', default: '24px', description: t.cssSgHeightSm },
      { name: 'sg-height-md', default: '32px', description: t.cssSgHeightMd },
      { name: 'sg-height-lg', default: '40px', description: t.cssSgHeightLg },
      { name: 'sg-padding-xs', default: '8px', description: t.cssSgPaddingXs },
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
        <BasicInputNumber />
      </DemoBox>

      <DemoBox title={t.demoMinMaxStepTitle} description={t.demoMinMaxStepDesc} code={MinMaxStepSource}>
        <MinMaxStepInputNumber />
      </DemoBox>

      <DemoBox title={t.demoPrecisionTitle} description={t.demoPrecisionDesc} code={PrecisionSource}>
        <PrecisionInputNumber />
      </DemoBox>

      <DemoBox title={t.demoSizesTitle} description={t.demoSizesDesc} code={SizesSource}>
        <SizesInputNumber />
      </DemoBox>

      <DemoBox title={t.demoStatesTitle} description={t.demoStatesDesc} code={StatesSource}>
        <StatesInputNumber />
      </DemoBox>

      <DemoBox title={t.demoInFormTitle} description={t.demoInFormDesc} code={InFormSource}>
        <InFormInputNumber />
      </DemoBox>

      <DemoBox title={t.demoTokensTitle} description={t.demoTokensDesc} code={TokensOverrideSource}>
        <TokensOverrideInputNumber />
      </DemoBox>

      <DemoBox title={t.demoUnstyledTitle} description={t.demoUnstyledDesc} code={UnstyledSource}>
        <UnstyledInputNumber />
      </DemoBox>

      <PropsTable title={t.tableInputNumberApi} data={inputNumberProps} />
      <CssVarsTable
        title={t.tableCssVars}
        hint={t.cssHint}
        data={inputNumberCssVars}
      />
    </ComponentDoc>
  )
}
