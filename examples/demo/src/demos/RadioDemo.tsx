import { useMemo } from 'react'
import { ComponentDoc, DemoBox, PropsTable, CssVarsTable } from '../components'
import type { PropDef, CssVarDef } from '../components'

import { useRadioDocStrings } from './radio-doc/useRadioDocStrings'

import { BasicRadio } from './radio/Basic.demo'
import BasicSource from './radio/Basic.demo?raw'
import { VerticalRadio } from './radio/Vertical.demo'
import VerticalSource from './radio/Vertical.demo?raw'
import { DisabledStatesRadio } from './radio/DisabledStates.demo'
import DisabledStatesSource from './radio/DisabledStates.demo?raw'
import { InFormRadio } from './radio/InForm.demo'
import InFormSource from './radio/InForm.demo?raw'
import { TokensOverrideRadio } from './radio/TokensOverride.demo'
import TokensOverrideSource from './radio/TokensOverride.demo?raw'

export function RadioDemo() {
  const t = useRadioDocStrings()

  const radioGroupProps = useMemo<PropDef[]>(
    () => [
      { name: 'value', description: t.propValue, type: 'string | number' },
      { name: 'defaultValue', description: t.propDefaultValue, type: 'string | number' },
      { name: 'options', description: t.propOptions, type: 'RadioOption[]' },
      {
        name: 'direction',
        description: t.propDirection,
        type: "'horizontal' | 'vertical'",
        default: "'horizontal'",
      },
      { name: 'onChange', description: t.propOnChange, type: '(value) => void' },
      { name: 'disabled', description: t.propDisabled, type: 'boolean', default: 'false' },
      { name: 'loading', description: t.propLoading, type: 'boolean', default: 'false' },
      { name: 'className', description: t.propClassName, type: 'string' },
      { name: 'style', description: t.propStyle, type: 'CSSProperties' },
      { name: 'unstyled', description: t.propUnstyled, type: 'boolean', default: 'false' },
    ],
    [t],
  )

  const radioOptionProps = useMemo<PropDef[]>(
    () => [
      { name: 'value', description: t.propOptionValue, type: 'string | number' },
      { name: 'label', description: t.propOptionLabel, type: 'ReactNode' },
      { name: 'disabled', description: t.propOptionDisabled, type: 'boolean' },
    ],
    [t],
  )

  const radioCssVars = useMemo<CssVarDef[]>(
    () => [
      { name: 'sg-color-primary', default: 'var(--sg-blue-6)', description: t.cssSgColorPrimary },
      { name: 'sg-color-text', default: 'rgba(0, 0, 0, 0.88)', description: t.cssSgColorText },
      {
        name: 'sg-color-text-disabled',
        default: 'rgba(0, 0, 0, 0.25)',
        description: t.cssSgColorTextDisabled,
      },
      {
        name: 'sg-color-text-tertiary',
        default: 'rgba(0, 0, 0, 0.45)',
        description: t.cssSgColorTextTertiary,
      },
      { name: 'sg-font-size', default: '14px', description: t.cssSgFontSize },
      { name: 'sg-padding-md', default: '16px', description: t.cssSgPaddingMd },
      { name: 'sg-padding-xs', default: '8px', description: t.cssSgPaddingXs },
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
        <BasicRadio />
      </DemoBox>

      <DemoBox title={t.demoVerticalTitle} description={t.demoVerticalDesc} code={VerticalSource}>
        <VerticalRadio />
      </DemoBox>

      <DemoBox title={t.demoStatesTitle} description={t.demoStatesDesc} code={DisabledStatesSource}>
        <DisabledStatesRadio />
      </DemoBox>

      <DemoBox title={t.demoInFormTitle} description={t.demoInFormDesc} code={InFormSource}>
        <InFormRadio />
      </DemoBox>

      <DemoBox title={t.demoTokensTitle} description={t.demoTokensDesc} code={TokensOverrideSource}>
        <TokensOverrideRadio />
      </DemoBox>

      <PropsTable title={t.tableRadioGroupApi} data={radioGroupProps} />
      <PropsTable title={t.tableRadioOptionApi} data={radioOptionProps} />
      <CssVarsTable title={t.tableCssVars} hint={t.cssHint} data={radioCssVars} />
    </ComponentDoc>
  )
}
