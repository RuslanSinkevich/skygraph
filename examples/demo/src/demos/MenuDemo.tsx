import { ComponentDoc, DemoBox, PropsTable, CssVarsTable } from '../components'
import type { PropDef, CssVarDef } from '../components'

import { VerticalMenu } from './menu/Vertical.demo'
import VerticalSource from './menu/Vertical.demo?raw'
import { HorizontalMenu } from './menu/Horizontal.demo'
import HorizontalSource from './menu/Horizontal.demo?raw'
import { InlineMenu } from './menu/Inline.demo'
import InlineSource from './menu/Inline.demo?raw'
import { ControlledMenu } from './menu/Controlled.demo'
import ControlledSource from './menu/Controlled.demo?raw'
import { WithIconsMenu } from './menu/WithIcons.demo'
import WithIconsSource from './menu/WithIcons.demo?raw'
import { GroupsDividersMenu } from './menu/GroupsDividers.demo'
import GroupsDividersSource from './menu/GroupsDividers.demo?raw'
import { CollapsedMenu } from './menu/Collapsed.demo'
import CollapsedSource from './menu/Collapsed.demo?raw'
import { DarkThemeMenu } from './menu/DarkTheme.demo'
import DarkThemeSource from './menu/DarkTheme.demo?raw'
import { TokensOverrideMenu } from './menu/TokensOverride.demo'
import TokensOverrideSource from './menu/TokensOverride.demo?raw'
import { UnstyledMenu } from './menu/Unstyled.demo'
import UnstyledSource from './menu/Unstyled.demo?raw'

const menuProps: PropDef[] = [
  { name: 'items', description: 'Top-level items (may nest children, groups, dividers)', type: 'MenuItem[]' },
  { name: 'mode', description: 'Layout and interaction mode', type: "'vertical' | 'horizontal' | 'inline'", default: "'vertical'" },
  { name: 'selectedKeys', description: 'Controlled selected keys', type: 'string[]' },
  { name: 'defaultSelectedKeys', description: 'Initial selected keys', type: 'string[]', default: '[]' },
  { name: 'openKeys', description: 'Controlled open submenu keys', type: 'string[]' },
  { name: 'defaultOpenKeys', description: 'Initial open submenu keys', type: 'string[]', default: '[]' },
  { name: 'onSelect', description: 'Fires after user selects a leaf item', type: '({ key, selectedKeys }) => void' },
  { name: 'onOpenChange', description: 'Fires when inline submenu expands/collapses', type: '(keys: string[]) => void' },
  { name: 'theme', description: 'Built-in palette', type: "'light' | 'dark'", default: "'light'" },
  { name: 'inlineCollapsed', description: 'Collapse inline mode to icons only', type: 'boolean', default: 'false' },
  { name: 'className', description: 'Root className', type: 'string' },
  { name: 'style', description: 'Root inline style', type: 'CSSProperties' },
  { name: 'unstyled', description: 'Strip every SkyGraph class — semantics only', type: 'boolean', default: 'false' },
]

const menuItemProps: PropDef[] = [
  { name: 'key', description: 'Unique id (selection + open-key tracking)', type: 'string' },
  { name: 'label', description: 'Display label / node', type: 'ReactNode' },
  { name: 'icon', description: 'Leading icon node', type: 'ReactNode' },
  { name: 'disabled', description: 'Dim + block activation', type: 'boolean' },
  { name: 'danger', description: 'Apply error color (destructive action)', type: 'boolean' },
  { name: 'children', description: 'Nested items (creates a submenu)', type: 'MenuItem[]' },
  { name: 'type', description: "'group' renders a titled section; 'divider' draws a rule", type: "'group' | 'divider'" },
]

const menuCssVars: CssVarDef[] = [
  { name: 'sg-color-primary', default: 'var(--sg-blue-6)', description: 'Selected item text, dark-theme selected background, horizontal underline' },
  { name: 'sg-color-primary-bg', default: 'var(--sg-blue-1)', description: 'Selected item background (light theme)' },
  { name: 'sg-color-primary-hover', default: 'var(--sg-blue-5)', description: 'Horizontal hover underline' },
  { name: 'sg-color-bg-container', default: '#ffffff', description: 'Menu surface background' },
  { name: 'sg-color-bg-elevated', default: '#ffffff', description: 'Popover submenu surface' },
  { name: 'sg-color-bg-hover', default: 'var(--sg-gray-3)', description: 'Row hover background' },
  { name: 'sg-color-text', default: 'rgba(0, 0, 0, 0.88)', description: 'Default menu text' },
  { name: 'sg-color-text-secondary', default: 'rgba(0, 0, 0, 0.65)', description: 'Dark theme default text' },
  { name: 'sg-color-text-tertiary', default: 'rgba(0, 0, 0, 0.45)', description: 'Group title text' },
  { name: 'sg-color-text-disabled', default: 'rgba(0, 0, 0, 0.25)', description: 'Disabled item text' },
  { name: 'sg-color-border-secondary', default: 'var(--sg-gray-4)', description: 'Vertical divider, popup border' },
  { name: 'sg-color-error', default: 'var(--sg-red-5)', description: 'Danger item text' },
  { name: 'sg-color-error-bg', default: 'var(--sg-red-1)', description: 'Danger item hover background' },
  { name: 'sg-border-radius-lg', default: '8px', description: 'Popup submenu radius' },
  { name: 'sg-shadow-lg', default: '0 6px 16px rgba(0, 0, 0, 0.08)', description: 'Popup submenu shadow' },
  { name: 'sg-font-size', default: '14px', description: 'Menu text size' },
  { name: 'sg-font-size-lg', default: '16px', description: 'Icon size' },
  { name: 'sg-font-size-sm', default: '12px', description: 'Group title font size' },
  { name: 'sg-height-md', default: '32px', description: 'Minimum row height' },
  { name: 'sg-padding-xs', default: '8px', description: 'Row vertical padding + top/bottom gutters' },
  { name: 'sg-padding-sm', default: '12px', description: 'Icon / label gap, horizontal row padding' },
  { name: 'sg-padding-md', default: '16px', description: 'Horizontal row padding (horizontal mode)' },
  { name: 'sg-padding-lg', default: '24px', description: 'Row horizontal padding, inline left indent' },
  { name: 'sg-margin-xs', default: '8px', description: 'Divider vertical margin' },
  { name: 'sg-z-dropdown', default: '1050', description: 'Popup submenu z-index' },
  { name: 'sg-line-height', default: '1.5714', description: 'Text line-height' },
  { name: 'sg-transition-duration', default: '0.2s', description: 'Hover / selection transition' },
  { name: 'sg-transition-timing', default: 'cubic-bezier(0.645, 0.045, 0.355, 1)', description: 'Transition easing' },
]

export function MenuDemo() {
  return (
    <ComponentDoc
      title="Menu"
      description="Versatile navigation menu — vertical sidebars, horizontal top bars, inline trees, collapsed rails, dark and branded themes."
      whenToUse={[
        'As the primary navigation of an application (sidebar + top bar).',
        'When you need nested submenus with predictable open/close behaviour.',
        'For contextual action lists with groups, dividers and danger items.',
      ]}
    >
      <DemoBox title="Vertical" description="Sidebar layout, submenus open in a popover." code={VerticalSource}>
        <VerticalMenu />
      </DemoBox>

      <DemoBox title="Horizontal" description="Top-nav layout with hover dropdown." code={HorizontalSource}>
        <HorizontalMenu />
      </DemoBox>

      <DemoBox title="Inline" description="Submenus expand in place — best for deep trees." code={InlineSource}>
        <InlineMenu />
      </DemoBox>

      <DemoBox title="Controlled" description="Own selectedKeys/openKeys from the outside." code={ControlledSource}>
        <ControlledMenu />
      </DemoBox>

      <DemoBox title="Icons" description="Every item can carry a leading icon node." code={WithIconsSource}>
        <WithIconsMenu />
      </DemoBox>

      <DemoBox title="Groups, dividers & danger" description="Structured menus with destructive actions." code={GroupsDividersSource}>
        <GroupsDividersMenu />
      </DemoBox>

      <DemoBox title="Collapsed rail" description="inlineCollapsed → icons only; popovers on hover." code={CollapsedSource}>
        <CollapsedMenu />
      </DemoBox>

      <DemoBox title="Dark theme" description="theme='dark' for dark surfaces." code={DarkThemeSource}>
        <DarkThemeMenu />
      </DemoBox>

      <DemoBox
        title="Tokens override"
        description="Scope globals on a wrapper to re-skin a single menu."
        code={TokensOverrideSource}
      >
        <TokensOverrideMenu />
      </DemoBox>

      <DemoBox title="Unstyled" description="ARIA semantics only — bring your own CSS." code={UnstyledSource}>
        <UnstyledMenu />
      </DemoBox>

      <PropsTable title="Menu API" data={menuProps} />
      <PropsTable title="MenuItem" data={menuItemProps} />
      <CssVarsTable
        title="CSS Variables"
        hint="Menu has no component-scoped tokens — only global palette/spacing variables drive its look. Override the globals on a scoped wrapper to re-skin a single instance."
        data={menuCssVars}
      />
    </ComponentDoc>
  )
}
