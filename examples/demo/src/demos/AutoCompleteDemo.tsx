import { useMemo } from 'react'
import { ComponentDoc, DemoBox, PropsTable, CssVarsTable } from '../components'
import type { PropDef, CssVarDef } from '../components'

import { useAutoCompleteDocStrings } from './autocomplete-doc/useAutoCompleteDocStrings'

import { BasicAutoComplete } from './autocomplete/Basic.demo'
import BasicSource from './autocomplete/Basic.demo?raw'
import { EmailDomainsAutoComplete } from './autocomplete/EmailDomains.demo'
import EmailDomainsSource from './autocomplete/EmailDomains.demo?raw'
import { AsyncSearchAutoComplete } from './autocomplete/AsyncSearch.demo'
import AsyncSearchSource from './autocomplete/AsyncSearch.demo?raw'
import { SizesAutoComplete } from './autocomplete/Sizes.demo'
import SizesSource from './autocomplete/Sizes.demo?raw'
import { StatesAutoComplete } from './autocomplete/States.demo'
import StatesSource from './autocomplete/States.demo?raw'
import { TokensOverrideAutoComplete } from './autocomplete/TokensOverride.demo'
import TokensOverrideSource from './autocomplete/TokensOverride.demo?raw'
import { UnstyledAutoComplete } from './autocomplete/Unstyled.demo'
import UnstyledSource from './autocomplete/Unstyled.demo?raw'

export function AutoCompleteDemo() {
  const t = useAutoCompleteDocStrings()

  const autoCompleteProps = useMemo<PropDef[]>(
    () => [
      { name: 'value', description: t.propValue, type: 'string' },
      { name: 'defaultValue', description: t.propDefaultValue, type: 'string' },
      { name: 'options', description: t.propOptions, type: 'AutoCompleteOption[]' },
      { name: 'placeholder', description: t.propPlaceholder, type: 'string' },
      { name: 'onChange', description: t.propOnChange, type: '(value: string) => void' },
      { name: 'onSearch', description: t.propOnSearch, type: '(query: string) => void' },
      { name: 'onSelect', description: t.propOnSelect, type: '(value, option) => void' },
      { name: 'onBlur', description: t.propOnBlur, type: '() => void' },
      { name: 'size', description: t.propSize, type: "'small' | 'middle' | 'large'", default: "'middle'" },
      { name: 'disabled', description: t.propDisabled, type: 'boolean', default: 'false' },
      { name: 'loading', description: t.propLoading, type: 'boolean', default: 'false' },
      { name: 'className', description: t.propClassName, type: 'string' },
      { name: 'style', description: t.propStyle, type: 'CSSProperties' },
      { name: 'unstyled', description: t.propUnstyled, type: 'boolean', default: 'false' },
    ],
    [t],
  )

  const optionProps = useMemo<PropDef[]>(
    () => [
      { name: 'value', description: t.propOptionValue, type: 'string' },
      { name: 'label', description: t.propOptionLabel, type: 'string' },
    ],
    [t],
  )

  const autoCompleteCssVars = useMemo<CssVarDef[]>(
    () => [
      { name: 'sg-input-*', default: '—', description: t.cssSgInputAll },
      { name: 'sg-color-bg-elevated', default: '#ffffff', description: t.cssSgColorBgElevated },
      { name: 'sg-color-bg-hover', default: 'rgba(0, 0, 0, 0.04)', description: t.cssSgColorBgHover },
      { name: 'sg-color-text', default: 'rgba(0, 0, 0, 0.88)', description: t.cssSgColorText },
      { name: 'sg-color-text-tertiary', default: 'rgba(0, 0, 0, 0.45)', description: t.cssSgColorTextTertiary },
      { name: 'sg-border-radius', default: '6px', description: t.cssSgBorderRadius },
      { name: 'sg-shadow-lg', default: '0 10px 30px rgba(0, 0, 0, 0.12)', description: t.cssSgShadowLg },
      { name: 'sg-padding-xs', default: '8px', description: t.cssSgPaddingXs },
      { name: 'sg-padding-md', default: '16px', description: t.cssSgPaddingMd },
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
        <BasicAutoComplete />
      </DemoBox>

      <DemoBox
        title={t.demoEmailTitle}
        description={t.demoEmailDesc}
        code={EmailDomainsSource}
      >
        <EmailDomainsAutoComplete />
      </DemoBox>

      <DemoBox
        title={t.demoAsyncTitle}
        description={t.demoAsyncDesc}
        code={AsyncSearchSource}
      >
        <AsyncSearchAutoComplete />
      </DemoBox>

      <DemoBox title={t.demoSizesTitle} description={t.demoSizesDesc} code={SizesSource}>
        <SizesAutoComplete />
      </DemoBox>

      <DemoBox title={t.demoStatesTitle} description={t.demoStatesDesc} code={StatesSource}>
        <StatesAutoComplete />
      </DemoBox>

      <DemoBox
        title={t.demoTokensTitle}
        description={t.demoTokensDesc}
        code={TokensOverrideSource}
      >
        <TokensOverrideAutoComplete />
      </DemoBox>

      <DemoBox title={t.demoUnstyledTitle} description={t.demoUnstyledDesc} code={UnstyledSource}>
        <UnstyledAutoComplete />
      </DemoBox>

      <PropsTable title={t.tableAutoCompleteApi} data={autoCompleteProps} />
      <PropsTable title={t.tableOptionApi} data={optionProps} />
      <CssVarsTable
        title={t.tableCssVars}
        hint={t.cssHint}
        data={autoCompleteCssVars}
      />
    </ComponentDoc>
  )
}
