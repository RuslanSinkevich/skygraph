import { ComponentDoc, DemoBox, PropsTable, CssVarsTable } from '../components'
import type { PropDef, CssVarDef } from '../components'

import { BasicCascader } from './cascader/Basic.demo'
import BasicSource from './cascader/Basic.demo?raw'
import { DefaultValueCascader } from './cascader/DefaultValue.demo'
import DefaultValueSource from './cascader/DefaultValue.demo?raw'
import { HoverTriggerCascader } from './cascader/HoverTrigger.demo'
import HoverTriggerSource from './cascader/HoverTrigger.demo?raw'
import { ChangeOnSelectCascader } from './cascader/ChangeOnSelect.demo'
import ChangeOnSelectSource from './cascader/ChangeOnSelect.demo?raw'
import { SearchCascader } from './cascader/Search.demo'
import SearchSource from './cascader/Search.demo?raw'
import { MultipleCascader } from './cascader/Multiple.demo'
import MultipleSource from './cascader/Multiple.demo?raw'
import { SizesCascader } from './cascader/Sizes.demo'
import SizesSource from './cascader/Sizes.demo?raw'
import { DisabledCascader } from './cascader/Disabled.demo'
import DisabledSource from './cascader/Disabled.demo?raw'
import { CustomRenderCascader } from './cascader/CustomRender.demo'
import CustomRenderSource from './cascader/CustomRender.demo?raw'
import { AsyncLoadCascader } from './cascader/AsyncLoad.demo'
import AsyncLoadSource from './cascader/AsyncLoad.demo?raw'
import { TokensOverrideCascader } from './cascader/TokensOverride.demo'
import TokensOverrideSource from './cascader/TokensOverride.demo?raw'
import { UnstyledCascader } from './cascader/Unstyled.demo'
import UnstyledSource from './cascader/Unstyled.demo?raw'

const cascaderProps: PropDef[] = [
  { name: 'options', description: 'Top-level options; each may nest children', type: 'CascaderOption[]' },
  { name: 'value', description: 'Selected path from root to current value (controlled)', type: '(string | number)[]' },
  { name: 'defaultValue', description: 'Initial path when uncontrolled', type: '(string | number)[]' },
  { name: 'onChange', description: 'Fires with value path and resolved option chain', type: '(value, selected) => void' },
  { name: 'placeholder', description: 'Trigger placeholder', type: 'string' },
  { name: 'allowClear', description: 'Show clear (×) button when a value is set', type: 'boolean', default: 'true' },
  { name: 'disabled', description: 'Disable the whole cascader', type: 'boolean', default: 'false' },
  { name: 'size', description: 'Matches Input/Select size tokens', type: "'small' | 'middle' | 'large'", default: "'middle'" },
  { name: 'multiple', description: 'Accumulate paths as removable tags', type: 'boolean', default: 'false' },
  { name: 'showSearch', description: 'Enable search across flattened paths', type: 'boolean | { filter }', default: 'false' },
  { name: 'expandTrigger', description: 'Open the next column on click or hover', type: "'click' | 'hover'", default: "'click'" },
  { name: 'changeOnSelect', description: 'Commit on every level, not only on leaf', type: 'boolean', default: 'false' },
  { name: 'displayRender', description: 'Custom trigger label renderer', type: '(labels, selected) => ReactNode' },
  { name: 'loadData', description: 'Lazy-load children when option.isLeaf=false', type: '(selected) => void' },
  { name: 'maxTagCount', description: 'Collapse multiple tags past this limit', type: 'number' },
  { name: 'dropdownStyle', description: 'Inline style for the dropdown panel', type: 'CSSProperties' },
  { name: 'className', description: 'Root wrapper className', type: 'string' },
  { name: 'style', description: 'Root wrapper inline style', type: 'CSSProperties' },
  { name: 'unstyled', description: 'Drop every SkyGraph class — keep only semantics', type: 'boolean', default: 'false' },
]

const optionProps: PropDef[] = [
  { name: 'value', description: 'Stable value for this level', type: 'string | number' },
  { name: 'label', description: 'Display node for the row', type: 'ReactNode' },
  { name: 'children', description: 'Nested options', type: 'CascaderOption[]' },
  { name: 'disabled', description: 'Dim & block selection', type: 'boolean' },
  { name: 'isLeaf', description: 'If false — loadData fires on expand', type: 'boolean' },
]

const cascaderCssVars: CssVarDef[] = [
  { name: 'sg-color-primary', default: 'var(--sg-blue-6)', description: 'Focus border, active row indicator, checkbox fill' },
  { name: 'sg-color-primary-hover', default: 'var(--sg-blue-5)', description: 'Hover border on trigger' },
  { name: 'sg-color-primary-bg', default: 'var(--sg-blue-1)', description: 'Focus glow + active row background' },
  { name: 'sg-color-bg-container', default: '#ffffff', description: 'Trigger + panel background' },
  { name: 'sg-color-bg-elevated', default: '#ffffff', description: 'Dropdown surface background' },
  { name: 'sg-color-bg-hover', default: 'var(--sg-gray-3)', description: 'Row hover + tag background' },
  { name: 'sg-color-text', default: 'rgba(0, 0, 0, 0.88)', description: 'Option + value text color' },
  { name: 'sg-color-text-placeholder', default: 'rgba(0, 0, 0, 0.45)', description: 'Placeholder + empty panel text' },
  { name: 'sg-color-text-tertiary', default: 'rgba(0, 0, 0, 0.45)', description: 'Separator arrow, clear icon base' },
  { name: 'sg-color-text-disabled', default: 'rgba(0, 0, 0, 0.25)', description: 'Disabled option text' },
  { name: 'sg-color-border', default: 'var(--sg-gray-5)', description: 'Trigger border' },
  { name: 'sg-color-border-secondary', default: 'var(--sg-gray-4)', description: 'Column divider + tag border' },
  { name: 'sg-border-radius', default: '6px', description: 'Trigger + panel radius' },
  { name: 'sg-border-radius-sm', default: '4px', description: 'Tag + checkbox radius' },
  { name: 'sg-shadow-lg', default: '0 6px 16px rgba(0, 0, 0, 0.08)', description: 'Dropdown shadow' },
  { name: 'sg-font-size', default: '14px', description: 'Base font size' },
  { name: 'sg-font-size-sm', default: '12px', description: 'Tag + small-size font' },
  { name: 'sg-font-size-lg', default: '16px', description: 'Large-size font' },
  { name: 'sg-height-sm', default: '24px', description: 'Small trigger min-height' },
  { name: 'sg-height-md', default: '32px', description: 'Default trigger min-height' },
  { name: 'sg-height-lg', default: '40px', description: 'Large trigger min-height' },
  { name: 'sg-padding-xs', default: '8px', description: 'Row vertical padding + gap' },
  { name: 'sg-padding-sm', default: '12px', description: 'Option icon gap' },
  { name: 'sg-padding-md', default: '16px', description: 'Row horizontal padding' },
  { name: 'sg-padding-lg', default: '24px', description: 'Empty panel padding' },
  { name: 'sg-transition-duration', default: '0.2s', description: 'Hover / focus transition' },
  { name: 'sg-transition-timing', default: 'cubic-bezier(0.645, 0.045, 0.355, 1)', description: 'Transition easing' },
]

export function CascaderDemo() {
  return (
    <ComponentDoc
      title="Cascader"
      description="Column-based picker for ordered hierarchical data: region → city → district, taxonomy → subcategory → tag, etc."
      whenToUse={[
        'When the value is a path rather than a single node (province + city + district).',
        'When options form a clear hierarchy and column-by-column drill-down is faster than a deep tree.',
        'When users benefit from parent-level commits (changeOnSelect) or cross-branch search (showSearch).',
      ]}
    >
      <DemoBox title="Basic" description="Controlled drill-down with both value and labels." code={BasicSource}>
        <BasicCascader />
      </DemoBox>

      <DemoBox title="Default value" description="Uncontrolled cascader with a preset path." code={DefaultValueSource}>
        <DefaultValueCascader />
      </DemoBox>

      <DemoBox title="Hover trigger" description="Open the next column on hover for fast drill-down." code={HoverTriggerSource}>
        <HoverTriggerCascader />
      </DemoBox>

      <DemoBox title="Change on select" description="Commit on every level, not only on leaf." code={ChangeOnSelectSource}>
        <ChangeOnSelectCascader />
      </DemoBox>

      <DemoBox title="Search" description="Built-in path search + pluggable filter." code={SearchSource}>
        <SearchCascader />
      </DemoBox>

      <DemoBox title="Multiple" description="Collect paths as tags, with overflow collapse." code={MultipleSource}>
        <MultipleCascader />
      </DemoBox>

      <DemoBox title="Sizes" description="Small / middle / large — matches Input + Select tokens." code={SizesSource}>
        <SizesCascader />
      </DemoBox>

      <DemoBox title="Disabled" description="Disable the whole control or individual options." code={DisabledSource}>
        <DisabledCascader />
      </DemoBox>

      <DemoBox title="Custom trigger" description="Replace the default label with a richer renderer." code={CustomRenderSource}>
        <CustomRenderCascader />
      </DemoBox>

      <DemoBox title="Async loading" description="Populate children on demand via loadData." code={AsyncLoadSource}>
        <AsyncLoadCascader />
      </DemoBox>

      <DemoBox
        title="Tokens override"
        description="Scope global tokens on a wrapper to re-skin a single Cascader."
        code={TokensOverrideSource}
      >
        <TokensOverrideCascader />
      </DemoBox>

      <DemoBox title="Unstyled" description="Semantics only — paint with your own CSS." code={UnstyledSource}>
        <UnstyledCascader />
      </DemoBox>

      <PropsTable title="Cascader API" data={cascaderProps} />
      <PropsTable title="CascaderOption" data={optionProps} />
      <CssVarsTable
        title="CSS Variables"
        hint="Cascader has no component-scoped tokens — it is fully driven by the global palette. Override the globals on a scoped wrapper to re-skin a single instance."
        data={cascaderCssVars}
      />
    </ComponentDoc>
  )
}
