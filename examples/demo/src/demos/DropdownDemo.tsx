import { useMemo } from 'react'
import { ComponentDoc, DemoBox, PropsTable, CssVarsTable } from '../components'
import type { PropDef, CssVarDef } from '../components'

import { useDropdownDocStrings } from './dropdown-doc/useDropdownDocStrings'

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

export function DropdownDemo() {
  const t = useDropdownDocStrings()

  const dropdownProps = useMemo<PropDef[]>(
    () => [
      { name: 'items', description: t.propItems, type: 'DropdownItem[]' },
      { name: 'onSelect', description: t.propOnSelect, type: '(key: string) => void' },
      { name: 'trigger', description: t.propTrigger, type: "'click' | 'hover'", default: "'hover'" },
      { name: 'placement', description: t.propPlacement, type: "'bottomLeft' | 'bottomRight' | 'topLeft' | 'topRight'", default: "'bottomLeft'" },
      { name: 'disabled', description: t.propDisabled, type: 'boolean', default: 'false' },
      { name: 'children', description: t.propChildren, type: 'ReactElement' },
      { name: 'className', description: t.propClassName, type: 'string' },
      { name: 'unstyled', description: t.propUnstyled, type: 'boolean', default: 'false' },
    ],
    [t],
  )

  const dropdownItemProps = useMemo<PropDef[]>(
    () => [
      { name: 'key', description: t.itemKey, type: 'string' },
      { name: 'label', description: t.itemLabel, type: 'ReactNode' },
      { name: 'disabled', description: t.itemDisabled, type: 'boolean' },
      { name: 'danger', description: t.itemDanger, type: 'boolean' },
      { name: 'divider', description: t.itemDivider, type: 'boolean' },
    ],
    [t],
  )

  const dropdownCssVars = useMemo<CssVarDef[]>(
    () => [
      { name: 'sg-color-bg-elevated', default: '#ffffff', description: t.cssBgElevated },
      { name: 'sg-color-border-secondary', default: 'rgba(5, 5, 5, 0.04)', description: t.cssBorderSecondary },
      { name: 'sg-color-bg-hover', default: 'rgba(0, 0, 0, 0.04)', description: t.cssBgHover },
      { name: 'sg-color-text', default: 'rgba(0, 0, 0, 0.88)', description: t.cssText },
      { name: 'sg-color-text-disabled', default: 'rgba(0, 0, 0, 0.25)', description: t.cssTextDisabled },
      { name: 'sg-color-error', default: '#ff4d4f', description: t.cssError },
      { name: 'sg-color-error-bg', default: '#fff2f0', description: t.cssErrorBg },
      { name: 'sg-font-size', default: '14px', description: t.cssFontSize },
      { name: 'sg-line-height', default: '1.5714', description: t.cssLineHeight },
      { name: 'sg-padding-xs', default: '4px', description: t.cssPaddingXs },
      { name: 'sg-padding-md', default: '12px', description: t.cssPaddingMd },
      { name: 'sg-margin-xs', default: '4px', description: t.cssMarginXs },
      { name: 'sg-border-radius-lg', default: '8px', description: t.cssBorderRadiusLg },
      { name: 'sg-shadow-lg', default: '0 6px 16px rgba(0,0,0,0.08)', description: t.cssShadowLg },
      { name: 'sg-z-dropdown', default: '1050', description: t.cssZDropdown },
      { name: 'sg-transition-duration', default: '180ms', description: t.cssTransitionDuration },
      { name: 'sg-transition-timing', default: 'cubic-bezier(0.645, 0.045, 0.355, 1)', description: t.cssTransitionTiming },
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
        <BasicDropdown />
      </DemoBox>

      <DemoBox
        title={t.demoTriggerTitle}
        description={t.demoTriggerDesc}
        code={TriggerSource}
      >
        <TriggerDropdown />
      </DemoBox>

      <DemoBox
        title={t.demoPlacementTitle}
        description={t.demoPlacementDesc}
        code={PlacementSource}
      >
        <PlacementDropdown />
      </DemoBox>

      <DemoBox
        title={t.demoRichTitle}
        description={t.demoRichDesc}
        code={RichItemsSource}
      >
        <RichItemsDropdown />
      </DemoBox>

      <DemoBox
        title={t.demoDisabledTitle}
        description={t.demoDisabledDesc}
        code={DisabledSource}
      >
        <DisabledDropdown />
      </DemoBox>

      <DemoBox
        title={t.demoKeyboardTitle}
        description={t.demoKeyboardDesc}
        code={KeyboardSource}
      >
        <KeyboardDropdown />
      </DemoBox>

      <DemoBox
        title={t.demoTokensTitle}
        description={t.demoTokensDesc}
        code={TokensOverrideSource}
      >
        <TokensOverrideDropdown />
      </DemoBox>

      <DemoBox
        title={t.demoUnstyledTitle}
        description={t.demoUnstyledDesc}
        code={UnstyledSource}
      >
        <UnstyledDropdown />
      </DemoBox>

      <PropsTable title={t.tableDropdownApi} data={dropdownProps} />
      <PropsTable title={t.tableDropdownItem} data={dropdownItemProps} />
      <CssVarsTable
        title={t.tableCssVars}
        hint={t.cssHint}
        data={dropdownCssVars}
      />
    </ComponentDoc>
  )
}
