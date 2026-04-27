import { ComponentDoc, DemoBox, PropsTable, CssVarsTable } from '../components'
import type { PropDef, CssVarDef } from '../components'

import { BasicDropdown } from './dropdown/Basic.demo'
import BasicSource from './dropdown/Basic.demo?raw'
import { TriggerDropdown } from './dropdown/Trigger.demo'
import TriggerSource from './dropdown/Trigger.demo?raw'
import { PlacementDropdown } from './dropdown/Placement.demo'
import PlacementSource from './dropdown/Placement.demo?raw'
import { RichItemsDropdown } from './dropdown/RichItems.demo'
import RichItemsSource from './dropdown/RichItems.demo?raw'
import { DisabledDropdown } from './dropdown/Disabled.demo'
import DisabledSource from './dropdown/Disabled.demo?raw'
import { KeyboardDropdown } from './dropdown/Keyboard.demo'
import KeyboardSource from './dropdown/Keyboard.demo?raw'
import { TokensOverrideDropdown } from './dropdown/TokensOverride.demo'
import TokensOverrideSource from './dropdown/TokensOverride.demo?raw'
import { UnstyledDropdown } from './dropdown/Unstyled.demo'
import UnstyledSource from './dropdown/Unstyled.demo?raw'

const dropdownProps: PropDef[] = [
  { name: 'items', description: 'Menu rows and dividers', type: 'DropdownItem[]' },
  { name: 'onSelect', description: 'Fires with the selected item.key', type: '(key: string) => void' },
  { name: 'trigger', description: 'Open the menu on click or hover', type: "'click' | 'hover'", default: "'hover'" },
  { name: 'placement', description: 'Corner the menu anchors to', type: "'bottomLeft' | 'bottomRight' | 'topLeft' | 'topRight'", default: "'bottomLeft'" },
  { name: 'disabled', description: 'Block opening and selection', type: 'boolean', default: 'false' },
  { name: 'children', description: 'Element that acts as the trigger', type: 'ReactElement' },
  { name: 'className', description: 'Wrapper className', type: 'string' },
  { name: 'unstyled', description: 'Drop every sg-dropdown-* class (headless mode)', type: 'boolean', default: 'false' },
]

const dropdownItemProps: PropDef[] = [
  { name: 'key', description: 'Stable identifier passed to onSelect', type: 'string' },
  { name: 'label', description: 'Row content (any ReactNode)', type: 'ReactNode' },
  { name: 'disabled', description: 'Lock the row', type: 'boolean' },
  { name: 'danger', description: 'Paint the row in error colours', type: 'boolean' },
  { name: 'divider', description: 'Render a separator instead of a row (label is ignored)', type: 'boolean' },
]

const dropdownCssVars: CssVarDef[] = [
  { name: 'sg-color-bg-elevated', default: '#ffffff', description: 'Menu background' },
  { name: 'sg-color-border-secondary', default: 'rgba(5, 5, 5, 0.04)', description: 'Menu border + divider colour' },
  { name: 'sg-color-bg-hover', default: 'rgba(0, 0, 0, 0.04)', description: 'Row hover background' },
  { name: 'sg-color-text', default: 'rgba(0, 0, 0, 0.88)', description: 'Row text colour' },
  { name: 'sg-color-text-disabled', default: 'rgba(0, 0, 0, 0.25)', description: 'Disabled row colour' },
  { name: 'sg-color-error', default: '#ff4d4f', description: 'Danger row text' },
  { name: 'sg-color-error-bg', default: '#fff2f0', description: 'Danger row hover background' },
  { name: 'sg-font-size', default: '14px', description: 'Row text size' },
  { name: 'sg-line-height', default: '1.5714', description: 'Row line-height' },
  { name: 'sg-padding-xs', default: '4px', description: 'Row vertical padding + menu vertical padding' },
  { name: 'sg-padding-md', default: '12px', description: 'Row horizontal padding' },
  { name: 'sg-margin-xs', default: '4px', description: 'Divider vertical spacing' },
  { name: 'sg-border-radius-lg', default: '8px', description: 'Menu corner radius' },
  { name: 'sg-shadow-lg', default: '0 6px 16px rgba(0,0,0,0.08)', description: 'Menu elevation' },
  { name: 'sg-z-dropdown', default: '1050', description: 'Menu stacking layer' },
  { name: 'sg-transition-duration', default: '180ms', description: 'Row hover + open animation speed' },
  { name: 'sg-transition-timing', default: 'cubic-bezier(0.645, 0.045, 0.355, 1)', description: 'Shared easing' },
]

export function DropdownDemo() {
  return (
    <ComponentDoc
      title="Dropdown"
      description="Anchored action menu. Opens on click or hover, fully keyboard-accessible, and supports danger / disabled / divider rows."
      whenToUse={[
        'Row-level actions or kebab menus that would be noisy as inline buttons.',
        'File / edit / view-style menus where items share semantic grouping.',
        'Contextual navigation where hover preview is faster than click.',
      ]}
    >
      <DemoBox title="Basic" description="Hover to open; onSelect gets the item.key." code={BasicSource}>
        <BasicDropdown />
      </DemoBox>

      <DemoBox
        title="Trigger"
        description="Click for action menus, hover for chrome."
        code={TriggerSource}
      >
        <TriggerDropdown />
      </DemoBox>

      <DemoBox
        title="Placement"
        description="Four corners — pick what fits the viewport."
        code={PlacementSource}
      >
        <PlacementDropdown />
      </DemoBox>

      <DemoBox
        title="Rich items"
        description="label is a full ReactNode — icons, shortcuts, two-line rows."
        code={RichItemsSource}
      >
        <RichItemsDropdown />
      </DemoBox>

      <DemoBox
        title="Disabled"
        description="Menu can't open; onSelect is suppressed."
        code={DisabledSource}
      >
        <DisabledDropdown />
      </DemoBox>

      <DemoBox
        title="Keyboard"
        description="Space / Enter open, ↑ / ↓ move, Esc closes."
        code={KeyboardSource}
      >
        <KeyboardDropdown />
      </DemoBox>

      <DemoBox
        title="Tokens override"
        description="Retint surface, hover, and danger tokens on a wrapper."
        code={TokensOverrideSource}
      >
        <TokensOverrideDropdown />
      </DemoBox>

      <DemoBox
        title="Unstyled"
        description="Keep behaviour + keyboard handling, bring your own paint."
        code={UnstyledSource}
      >
        <UnstyledDropdown />
      </DemoBox>

      <PropsTable title="Dropdown API" data={dropdownProps} />
      <PropsTable title="DropdownItem" data={dropdownItemProps} />
      <CssVarsTable
        title="CSS Variables"
        hint="Dropdown has no dedicated tokens — it composes the elevated surface palette and the hover background. `danger` rows use `--sg-color-error` + `--sg-color-error-bg`. Tune `--sg-border-radius-lg` for rounder menus."
        data={dropdownCssVars}
      />
    </ComponentDoc>
  )
}
