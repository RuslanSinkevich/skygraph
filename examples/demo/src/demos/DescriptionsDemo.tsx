import { ComponentDoc, DemoBox, PropsTable, CssVarsTable } from '../components'
import type { PropDef, CssVarDef } from '../components'

import { BasicDescriptions } from './descriptions/Basic.demo'
import BasicSource from './descriptions/Basic.demo?raw'
import { BorderedDescriptions } from './descriptions/Bordered.demo'
import BorderedSource from './descriptions/Bordered.demo?raw'
import { VerticalDescriptions } from './descriptions/Vertical.demo'
import VerticalSource from './descriptions/Vertical.demo?raw'
import { ColumnsDescriptions } from './descriptions/Columns.demo'
import ColumnsSource from './descriptions/Columns.demo?raw'
import { NoColonDescriptions } from './descriptions/NoColon.demo'
import NoColonSource from './descriptions/NoColon.demo?raw'
import { SizesDescriptions } from './descriptions/Sizes.demo'
import SizesSource from './descriptions/Sizes.demo?raw'
import { RichContentDescriptions } from './descriptions/RichContent.demo'
import RichContentSource from './descriptions/RichContent.demo?raw'
import { TokensOverrideDescriptions } from './descriptions/TokensOverride.demo'
import TokensOverrideSource from './descriptions/TokensOverride.demo?raw'
import { UnstyledDescriptions } from './descriptions/Unstyled.demo'
import UnstyledSource from './descriptions/Unstyled.demo?raw'

const descriptionsProps: PropDef[] = [
  { name: 'title', description: 'Optional heading rendered above the table', type: 'ReactNode' },
  { name: 'items', description: 'Label / value pairs rendered according to `column` + per-item `span`', type: 'DescriptionsItem[]' },
  { name: 'bordered', description: 'Wraps the table in a border + tints the label column', type: 'boolean', default: 'false' },
  { name: 'column', description: 'Number of label / value pairs per row', type: 'number', default: '3' },
  { name: 'layout', description: 'Stack labels above values (`vertical`) or side-by-side (`horizontal`)', type: "'horizontal' | 'vertical'", default: "'horizontal'" },
  { name: 'colon', description: 'Append a `:` after every label', type: 'boolean', default: 'true' },
  { name: 'size', description: 'Padding / font preset — inherits from ConfigProvider', type: "'small' | 'middle' | 'large'", default: "'middle'" },
  { name: 'className', description: 'Extra class on the root', type: 'string' },
  { name: 'style', description: 'Inline style on the root', type: 'CSSProperties' },
  { name: 'unstyled', description: 'Drop every sg-descriptions-* class; render a bare `<table>`', type: 'boolean', default: 'false' },
]

const itemProps: PropDef[] = [
  { name: 'key', description: 'Stable key for reconciliation', type: 'string' },
  { name: 'label', description: 'First-cell / header row label', type: 'ReactNode' },
  { name: 'children', description: 'Value content', type: 'ReactNode' },
  { name: 'span', description: 'Column span (capped at the `column` prop)', type: 'number', default: '1' },
]

const descCssVars: CssVarDef[] = [
  { name: 'sg-color-text', default: 'rgba(0, 0, 0, 0.88)', description: 'Value colour + title colour' },
  { name: 'sg-color-text-secondary', default: 'rgba(0, 0, 0, 0.65)', description: 'Label colour' },
  { name: 'sg-color-bg-secondary', default: 'rgba(0, 0, 0, 0.04)', description: 'Label column background in `bordered` mode' },
  { name: 'sg-color-border-secondary', default: '#f0f0f0', description: 'Table border + row dividers in `bordered` mode' },
  { name: 'sg-border-radius', default: '6px', description: 'Outer corners of the bordered table' },
  { name: 'sg-font-size', default: '14px', description: 'Base cell font size' },
  { name: 'sg-font-size-sm', default: '12px', description: '`size="small"` font size' },
  { name: 'sg-font-size-lg', default: '16px', description: 'Title font size' },
  { name: 'sg-line-height', default: '1.57', description: 'Line-height for labels / values / title' },
  { name: 'sg-padding-xs', default: '4px', description: '`size="small"` vertical padding' },
  { name: 'sg-padding-sm', default: '8px', description: 'Default vertical padding / horizontal padding in small-bordered' },
  { name: 'sg-padding-md', default: '12px', description: 'Default horizontal padding between label and value' },
  { name: 'sg-padding-lg', default: '16px', description: 'Horizontal padding in bordered mode' },
  { name: 'sg-margin-sm', default: '8px', description: 'Right margin of the colon' },
  { name: 'sg-margin-md', default: '12px', description: 'Space between title and table' },
]

export function DescriptionsDemo() {
  return (
    <ComponentDoc
      title="Descriptions"
      badge="Data Display"
      crumbs={['Data Display', 'Descriptions']}
      description="Read-only key / value table for detail pages. Supports horizontal + vertical layouts, a bordered variant, variable column count and per-item `span`."
      whenToUse={[
        'Showing a block of read-only fields — invoices, profile summaries, incident details.',
        'When a data table feels too heavy but a plain `<dl>` would be too minimal.',
      ]}
    >
      <DemoBox title="Basic" description="Default 3-column, horizontal layout." code={BasicSource}>
        <BasicDescriptions />
      </DemoBox>

      <DemoBox
        title="Bordered"
        description="Bordered frame + tinted label column."
        code={BorderedSource}
      >
        <BorderedDescriptions />
      </DemoBox>

      <DemoBox
        title="Vertical layout"
        description="Labels above values — good for long cell content."
        code={VerticalSource}
      >
        <VerticalDescriptions />
      </DemoBox>

      <DemoBox
        title="Columns"
        description="Change column density; `span` widens items."
        code={ColumnsSource}
      >
        <ColumnsDescriptions />
      </DemoBox>

      <DemoBox
        title="No colon"
        description="Drop the trailing colon after labels."
        code={NoColonSource}
      >
        <NoColonDescriptions />
      </DemoBox>

      <DemoBox title="Sizes" description="Small and middle padding / font presets." code={SizesSource}>
        <SizesDescriptions />
      </DemoBox>

      <DemoBox
        title="Rich content"
        description="Labels and values accept any ReactNode — Badge, Tag, links…"
        code={RichContentSource}
      >
        <RichContentDescriptions />
      </DemoBox>

      <DemoBox
        title="Tokens override"
        description="Scope the label-bg / border tokens to rebrand the frame."
        code={TokensOverrideSource}
      >
        <TokensOverrideDescriptions />
      </DemoBox>

      <DemoBox
        title="Unstyled"
        description="Bare `<table>` — bring your own CSS."
        code={UnstyledSource}
      >
        <UnstyledDescriptions />
      </DemoBox>

      <PropsTable title="Descriptions API" data={descriptionsProps} />
      <PropsTable title="DescriptionsItem" data={itemProps} />
      <CssVarsTable
        title="CSS Variables"
        hint="Descriptions has no component-local tokens. Rebrand via the global palette — especially `--sg-color-bg-secondary` (label column in bordered mode) and `--sg-color-border-secondary` (dividers)."
        data={descCssVars}
      />
    </ComponentDoc>
  )
}
