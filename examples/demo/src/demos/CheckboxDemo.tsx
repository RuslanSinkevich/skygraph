import { useMemo } from 'react'
import { ComponentDoc, DemoBox, PropsTable, CssVarsTable } from '../components'
import type { PropDef, CssVarDef } from '../components'

import { useCheckboxDocStrings } from './checkbox-doc/useCheckboxDocStrings'

import { BasicCheckbox } from './checkbox/Basic.demo'
import BasicSource from './checkbox/Basic.demo?raw'
import { StatesCheckbox } from './checkbox/States.demo'
import StatesSource from './checkbox/States.demo?raw'
import { CheckAllCheckbox } from './checkbox/CheckAll.demo'
import CheckAllSource from './checkbox/CheckAll.demo?raw'
import { RichLabelCheckbox } from './checkbox/RichLabel.demo'
import RichLabelSource from './checkbox/RichLabel.demo?raw'
import { InFormCheckbox } from './checkbox/InForm.demo'
import InFormSource from './checkbox/InForm.demo?raw'
import { TokensOverrideCheckbox } from './checkbox/TokensOverride.demo'
import TokensOverrideSource from './checkbox/TokensOverride.demo?raw'
import { UnstyledCheckbox } from './checkbox/Unstyled.demo'
import UnstyledSource from './checkbox/Unstyled.demo?raw'

export function CheckboxDemo() {
  const t = useCheckboxDocStrings()

  const checkboxProps = useMemo<PropDef[]>(
    () => [
      { name: 'checked', description: t.propChecked, type: 'boolean' },
      { name: 'defaultChecked', description: t.propDefaultChecked, type: 'boolean', default: 'false' },
      { name: 'indeterminate', description: t.propIndeterminate, type: 'boolean', default: 'false' },
      { name: 'onChange', description: t.propOnChange, type: '(checked: boolean) => void' },
      { name: 'disabled', description: t.propDisabled, type: 'boolean', default: 'false' },
      { name: 'loading', description: t.propLoading, type: 'boolean', default: 'false' },
      { name: 'children', description: t.propChildren, type: 'ReactNode' },
      { name: 'className', description: t.propClassName, type: 'string' },
      { name: 'style', description: t.propStyle, type: 'CSSProperties' },
      { name: 'unstyled', description: t.propUnstyled, type: 'boolean', default: 'false' },
    ],
    [t],
  )

  const checkboxCssVars = useMemo<CssVarDef[]>(
    () => [
      { name: 'sg-color-primary', default: 'var(--sg-blue-6)', description: t.cssSgColorPrimary },
      { name: 'sg-color-text', default: 'rgba(0, 0, 0, 0.88)', description: t.cssSgColorText },
      { name: 'sg-color-text-disabled', default: 'rgba(0, 0, 0, 0.25)', description: t.cssSgColorTextDisabled },
      { name: 'sg-color-text-tertiary', default: 'rgba(0, 0, 0, 0.45)', description: t.cssSgColorTextTertiary },
      { name: 'sg-font-size', default: '14px', description: t.cssSgFontSize },
      { name: 'sg-line-height', default: '1.5714', description: t.cssSgLineHeight },
      { name: 'sg-padding-sm', default: '12px', description: t.cssSgPaddingSm },
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
        <BasicCheckbox />
      </DemoBox>

      <DemoBox title={t.demoStatesTitle} description={t.demoStatesDesc} code={StatesSource}>
        <StatesCheckbox />
      </DemoBox>

      <DemoBox title={t.demoCheckAllTitle} description={t.demoCheckAllDesc} code={CheckAllSource}>
        <CheckAllCheckbox />
      </DemoBox>

      <DemoBox title={t.demoRichLabelTitle} description={t.demoRichLabelDesc} code={RichLabelSource}>
        <RichLabelCheckbox />
      </DemoBox>

      <DemoBox title={t.demoInFormTitle} description={t.demoInFormDesc} code={InFormSource}>
        <InFormCheckbox />
      </DemoBox>

      <DemoBox
        title={t.demoTokensTitle}
        description={t.demoTokensDesc}
        code={TokensOverrideSource}
      >
        <TokensOverrideCheckbox />
      </DemoBox>

      <DemoBox title={t.demoUnstyledTitle} description={t.demoUnstyledDesc} code={UnstyledSource}>
        <UnstyledCheckbox />
      </DemoBox>

      <PropsTable data={checkboxProps} />
      <CssVarsTable
        title={t.tableCssVars}
        hint={t.cssHint}
        data={checkboxCssVars}
      />
    </ComponentDoc>
  )
}
