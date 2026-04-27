import { ComponentDoc, DemoBox, PropsTable, CssVarsTable } from '../components'
import type { PropDef, CssVarDef } from '../components'

import { BasicTag } from './tag/Basic.demo'
import BasicSource from './tag/Basic.demo?raw'
import { PresetsTag } from './tag/Presets.demo'
import PresetsSource from './tag/Presets.demo?raw'
import { CustomColorTag } from './tag/CustomColor.demo'
import CustomColorSource from './tag/CustomColor.demo?raw'
import { BorderlessTag } from './tag/Borderless.demo'
import BorderlessSource from './tag/Borderless.demo?raw'
import { ClosableTag } from './tag/Closable.demo'
import ClosableSource from './tag/Closable.demo?raw'
import { WithIconTag } from './tag/WithIcon.demo'
import WithIconSource from './tag/WithIcon.demo?raw'
import { TokensOverrideTag } from './tag/TokensOverride.demo'
import TokensOverrideSource from './tag/TokensOverride.demo?raw'
import { UnstyledTag } from './tag/Unstyled.demo'
import UnstyledSource from './tag/Unstyled.demo?raw'

const tagProps: PropDef[] = [
  { name: 'color', description: "One of five presets or any raw CSS colour. Only 'default' / 'success' / 'error' / 'warning' / 'processing' map to palette tokens — everything else is applied inline as background + border.", type: "'default' | 'success' | 'error' | 'warning' | 'processing' | string", default: "'default'" },
  { name: 'closable', description: 'Adds a × button next to the label', type: 'boolean', default: 'false' },
  { name: 'onClose', description: 'Fires when the × is clicked (you own the removal)', type: '() => void' },
  { name: 'bordered', description: 'Draw the 1px border', type: 'boolean', default: 'true' },
  { name: 'children', description: 'Tag content (text, icon + text, anything)', type: 'ReactNode' },
  { name: 'className', description: 'Wrapper className', type: 'string' },
  { name: 'style', description: 'Wrapper inline style', type: 'CSSProperties' },
  { name: 'unstyled', description: 'Drop every sg-tag-* class — you own the painting', type: 'boolean', default: 'false' },
]

const tagCssVars: CssVarDef[] = [
  { name: 'sg-color-bg-secondary', default: 'rgba(0, 0, 0, 0.02)', description: 'Default-preset background' },
  { name: 'sg-color-border', default: 'rgba(5, 5, 5, 0.06)', description: 'Default-preset border' },
  { name: 'sg-color-text', default: 'rgba(0, 0, 0, 0.88)', description: 'Default-preset text + "neutral" label' },
  { name: 'sg-color-success', default: '#52c41a', description: 'success preset foreground + border' },
  { name: 'sg-color-success-bg', default: '#f6ffed', description: 'success preset background' },
  { name: 'sg-color-error', default: '#ff4d4f', description: 'error preset foreground + border' },
  { name: 'sg-color-error-bg', default: '#fff2f0', description: 'error preset background' },
  { name: 'sg-color-warning', default: '#faad14', description: 'warning preset foreground + border' },
  { name: 'sg-color-warning-bg', default: '#fffbe6', description: 'warning preset background' },
  { name: 'sg-color-primary', default: '#1677ff', description: 'processing preset foreground + border' },
  { name: 'sg-color-primary-bg', default: 'rgba(22, 119, 255, 0.1)', description: 'processing preset background' },
  { name: 'sg-font-size-sm', default: '12px', description: 'Tag text size' },
  { name: 'sg-padding-sm', default: '8px', description: 'Horizontal padding' },
  { name: 'sg-border-radius-sm', default: '4px', description: 'Corner radius (bump to 999px for pills)' },
  { name: 'sg-transition-duration', default: '180ms', description: 'Colour + hover transition speed' },
  { name: 'sg-transition-timing', default: 'cubic-bezier(0.645, 0.045, 0.355, 1)', description: 'Shared easing' },
]

export function TagDemo() {
  return (
    <ComponentDoc
      title="Tag"
      description="Inline pill for labels, statuses, and filters. Five semantic presets map to palette tokens; any other string is treated as a raw CSS colour."
      whenToUse={[
        'Label rows with a category or tag.',
        'Show a compact status pill next to a title.',
        'Render a removable filter set above a table or search results.',
      ]}
    >
      <DemoBox title="Basic" description="Default neutral preset." code={BasicSource}>
        <BasicTag />
      </DemoBox>

      <DemoBox
        title="Semantic presets"
        description="Five strings resolve to palette tokens."
        code={PresetsSource}
      >
        <PresetsTag />
      </DemoBox>

      <DemoBox
        title="Custom colour"
        description="Any other string is passed through as raw CSS — hex, rgb, hsl, named."
        code={CustomColorSource}
      >
        <CustomColorTag />
      </DemoBox>

      <DemoBox title="Borderless" description="Keeps the tint, drops the edge." code={BorderlessSource}>
        <BorderlessTag />
      </DemoBox>

      <DemoBox
        title="Closable"
        description="Adds a × button; you manage the removal."
        code={ClosableSource}
      >
        <ClosableTag />
      </DemoBox>

      <DemoBox
        title="With icon"
        description="Children is a ReactNode — icon + text is just JSX."
        code={WithIconSource}
      >
        <WithIconTag />
      </DemoBox>

      <DemoBox
        title="Tokens override"
        description="Round corners to 999px for pills, restyle preset palettes with colour tokens."
        code={TokensOverrideSource}
      >
        <TokensOverrideTag />
      </DemoBox>

      <DemoBox
        title="Unstyled"
        description="Drop every sg-tag-* class — you own the painting."
        code={UnstyledSource}
      >
        <UnstyledTag />
      </DemoBox>

      <PropsTable title="Tag API" data={tagProps} />
      <CssVarsTable
        title="CSS Variables"
        hint="Tag has no component-specific tokens — it composes global palette + spacing tokens. For full pills, set `--sg-border-radius-sm: 999px` on a wrapper. For a custom preset palette, override `--sg-color-<preset>` and `--sg-color-<preset>-bg`."
        data={tagCssVars}
      />
    </ComponentDoc>
  )
}
