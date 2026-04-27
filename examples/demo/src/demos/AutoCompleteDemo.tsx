import { ComponentDoc, DemoBox, PropsTable, CssVarsTable } from '../components'
import type { PropDef, CssVarDef } from '../components'

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

const autoCompleteProps: PropDef[] = [
  { name: 'value', description: 'Controlled text value', type: 'string' },
  { name: 'defaultValue', description: 'Initial value when uncontrolled', type: 'string' },
  { name: 'options', description: 'Suggestion rows (filtered by label)', type: 'AutoCompleteOption[]' },
  { name: 'placeholder', description: 'Input placeholder', type: 'string' },
  { name: 'onChange', description: 'Fires whenever the text changes (typing or pick)', type: '(value: string) => void' },
  { name: 'onSearch', description: 'Fires on every keystroke — use for async lookups', type: '(query: string) => void' },
  { name: 'onSelect', description: 'Fires when a suggestion row is clicked', type: '(value, option) => void' },
  { name: 'onBlur', description: 'Fires when the input loses focus', type: '() => void' },
  { name: 'size', description: 'Height preset (matches Input)', type: "'small' | 'middle' | 'large'", default: "'middle'" },
  { name: 'disabled', description: 'Block interaction', type: 'boolean', default: 'false' },
  { name: 'loading', description: 'Show inline spinner and block interaction', type: 'boolean', default: 'false' },
  { name: 'className', description: 'Wrapper className', type: 'string' },
  { name: 'style', description: 'Wrapper inline style', type: 'CSSProperties' },
  { name: 'unstyled', description: 'Drop SkyGraph classes (headless mode)', type: 'boolean', default: 'false' },
]

const optionProps: PropDef[] = [
  { name: 'value', description: 'String written to the input on pick', type: 'string' },
  { name: 'label', description: 'Text shown in the list + used for filtering', type: 'string' },
]

const autoCompleteCssVars: CssVarDef[] = [
  { name: 'sg-input-*', default: '—', description: 'AutoComplete reuses the full --sg-input-* group for the field itself — see Input for the list.' },
  { name: 'sg-color-bg-elevated', default: '#ffffff', description: 'Dropdown background' },
  { name: 'sg-color-bg-hover', default: 'rgba(0, 0, 0, 0.04)', description: 'Highlight on suggestion hover' },
  { name: 'sg-color-text', default: 'rgba(0, 0, 0, 0.88)', description: 'Suggestion text color' },
  { name: 'sg-color-text-tertiary', default: 'rgba(0, 0, 0, 0.45)', description: 'Inline spinner color during loading' },
  { name: 'sg-border-radius', default: '6px', description: 'Dropdown radius' },
  { name: 'sg-shadow-lg', default: '0 10px 30px rgba(0, 0, 0, 0.12)', description: 'Dropdown elevation' },
  { name: 'sg-padding-xs', default: '8px', description: 'Vertical dropdown padding & option padding-top/bottom' },
  { name: 'sg-padding-md', default: '16px', description: 'Option horizontal padding' },
  { name: 'sg-transition-duration', default: '180ms', description: 'Option hover background transition' },
]

export function AutoCompleteDemo() {
  return (
    <ComponentDoc
      title="AutoComplete"
      description="Text input with a dropdown of filtered suggestions. The typed string is the committed value — selecting a row just writes it back."
      whenToUse={[
        'Free-form text where a few known values are likely (cities, emails, tags).',
        'Email prefixes: auto-append known domains after the user types a local part.',
        'Async lookup from a server — use `onSearch` + `loading` to show progress.',
      ]}
    >
      <DemoBox title="Basic" description="Static suggestions filtered client-side by label." code={BasicSource}>
        <BasicAutoComplete />
      </DemoBox>

      <DemoBox
        title="Email domain suggestions"
        description="Derive the list from the current input — classic mail-client behaviour."
        code={EmailDomainsSource}
      >
        <EmailDomainsAutoComplete />
      </DemoBox>

      <DemoBox
        title="Async search"
        description="Debounced onSearch + loading state for server lookups."
        code={AsyncSearchSource}
      >
        <AsyncSearchAutoComplete />
      </DemoBox>

      <DemoBox title="Sizes" description="Small / default / large, aligned with Input." code={SizesSource}>
        <SizesAutoComplete />
      </DemoBox>

      <DemoBox title="States" description="Disabled and loading." code={StatesSource}>
        <StatesAutoComplete />
      </DemoBox>

      <DemoBox
        title="Tokens override"
        description="Scope --sg-input-* and global tokens to rebrand one instance."
        code={TokensOverrideSource}
      >
        <TokensOverrideAutoComplete />
      </DemoBox>

      <DemoBox title="Unstyled" description="Headless mode — semantics only, no SkyGraph classes." code={UnstyledSource}>
        <UnstyledAutoComplete />
      </DemoBox>

      <PropsTable title="AutoComplete API" data={autoCompleteProps} />
      <PropsTable title="AutoCompleteOption" data={optionProps} />
      <CssVarsTable
        title="CSS Variables"
        hint="AutoComplete reuses the full `--sg-input-*` group for the field itself; the dropdown uses the same globals as Select (bg-elevated, bg-hover, shadow-lg, border-radius)."
        data={autoCompleteCssVars}
      />
    </ComponentDoc>
  )
}
