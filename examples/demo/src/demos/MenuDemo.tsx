import { useMemo } from 'react'
import { ComponentDoc, DemoBox, PropsTable, CssVarsTable } from '../components'
import type { PropDef, CssVarDef } from '../components'

import { useMenuDocStrings } from './menu-doc/useMenuDocStrings'

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
import { CustomAppLauncherMenu } from './menu/CustomAppLauncher.demo'
import CustomAppLauncherSource from './menu/CustomAppLauncher.demo?raw'
import { CustomGlassTopNavMenu } from './menu/CustomGlassTopNav.demo'
import CustomGlassTopNavSource from './menu/CustomGlassTopNav.demo?raw'
import { CustomCommandPaletteMenu } from './menu/CustomCommandPalette.demo'
import CustomCommandPaletteSource from './menu/CustomCommandPalette.demo?raw'
import { UnstyledMenu } from './menu/Unstyled.demo'
import UnstyledSource from './menu/Unstyled.demo?raw'

export function MenuDemo() {
  const t = useMenuDocStrings()

  const menuProps = useMemo<PropDef[]>(
    () => [
      { name: 'items', description: t.propItems, type: 'MenuItem[]' },
      {
        name: 'mode',
        description: t.propMode,
        type: "'vertical' | 'horizontal' | 'inline'",
        default: "'vertical'",
      },
      { name: 'selectedKeys', description: t.propSelectedKeys, type: 'string[]' },
      {
        name: 'defaultSelectedKeys',
        description: t.propDefaultSelectedKeys,
        type: 'string[]',
        default: '[]',
      },
      { name: 'openKeys', description: t.propOpenKeys, type: 'string[]' },
      {
        name: 'defaultOpenKeys',
        description: t.propDefaultOpenKeys,
        type: 'string[]',
        default: '[]',
      },
      { name: 'onSelect', description: t.propOnSelect, type: '({ key, selectedKeys }) => void' },
      { name: 'onOpenChange', description: t.propOnOpenChange, type: '(keys: string[]) => void' },
      { name: 'theme', description: t.propTheme, type: "'light' | 'dark'", default: "'light'" },
      {
        name: 'inlineCollapsed',
        description: t.propInlineCollapsed,
        type: 'boolean',
        default: 'false',
      },
      { name: 'className', description: t.propClassName, type: 'string' },
      { name: 'style', description: t.propStyle, type: 'CSSProperties' },
      { name: 'unstyled', description: t.propUnstyled, type: 'boolean', default: 'false' },
    ],
    [t],
  )

  const menuItemProps = useMemo<PropDef[]>(
    () => [
      { name: 'key', description: t.itemKey, type: 'string' },
      { name: 'label', description: t.itemLabel, type: 'ReactNode' },
      { name: 'icon', description: t.itemIcon, type: 'ReactNode' },
      { name: 'disabled', description: t.itemDisabled, type: 'boolean' },
      { name: 'danger', description: t.itemDanger, type: 'boolean' },
      { name: 'children', description: t.itemChildren, type: 'MenuItem[]' },
      { name: 'type', description: t.itemType, type: "'group' | 'divider'" },
    ],
    [t],
  )

  const menuCssVars = useMemo<CssVarDef[]>(
    () => [
      { name: 'sg-color-primary', default: 'var(--sg-blue-6)', description: t.cssPrimary },
      { name: 'sg-color-primary-bg', default: 'var(--sg-blue-1)', description: t.cssPrimaryBg },
      {
        name: 'sg-color-primary-hover',
        default: 'var(--sg-blue-5)',
        description: t.cssPrimaryHover,
      },
      { name: 'sg-color-bg-container', default: '#ffffff', description: t.cssBgContainer },
      { name: 'sg-color-bg-elevated', default: '#ffffff', description: t.cssBgElevated },
      { name: 'sg-color-bg-hover', default: 'var(--sg-gray-3)', description: t.cssBgHover },
      { name: 'sg-color-text', default: 'rgba(0, 0, 0, 0.88)', description: t.cssText },
      {
        name: 'sg-color-text-secondary',
        default: 'rgba(0, 0, 0, 0.65)',
        description: t.cssTextSecondary,
      },
      {
        name: 'sg-color-text-tertiary',
        default: 'rgba(0, 0, 0, 0.45)',
        description: t.cssTextTertiary,
      },
      {
        name: 'sg-color-text-disabled',
        default: 'rgba(0, 0, 0, 0.25)',
        description: t.cssTextDisabled,
      },
      {
        name: 'sg-color-border-secondary',
        default: 'var(--sg-gray-4)',
        description: t.cssBorderSecondary,
      },
      { name: 'sg-color-error', default: 'var(--sg-red-5)', description: t.cssError },
      { name: 'sg-color-error-bg', default: 'var(--sg-red-1)', description: t.cssErrorBg },
      { name: 'sg-border-radius-lg', default: '8px', description: t.cssBorderRadiusLg },
      {
        name: 'sg-shadow-lg',
        default: '0 6px 16px rgba(0, 0, 0, 0.08)',
        description: t.cssShadowLg,
      },
      { name: 'sg-font-size', default: '14px', description: t.cssFontSize },
      { name: 'sg-font-size-lg', default: '16px', description: t.cssFontSizeLg },
      { name: 'sg-font-size-sm', default: '12px', description: t.cssFontSizeSm },
      { name: 'sg-height-md', default: '32px', description: t.cssHeightMd },
      { name: 'sg-padding-xs', default: '8px', description: t.cssPaddingXs },
      { name: 'sg-padding-sm', default: '12px', description: t.cssPaddingSm },
      { name: 'sg-padding-md', default: '16px', description: t.cssPaddingMd },
      { name: 'sg-padding-lg', default: '24px', description: t.cssPaddingLg },
      { name: 'sg-margin-xs', default: '8px', description: t.cssMarginXs },
      { name: 'sg-z-dropdown', default: '1050', description: t.cssZDropdown },
      { name: 'sg-line-height', default: '1.5714', description: t.cssLineHeight },
      { name: 'sg-transition-duration', default: '0.2s', description: t.cssTransitionDuration },
      {
        name: 'sg-transition-timing',
        default: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
        description: t.cssTransitionTiming,
      },
    ],
    [t],
  )

  return (
    <ComponentDoc
      title={t.pageTitle}
      description={t.pageLead}
      whenToUse={[t.pageWhen1, t.pageWhen2, t.pageWhen3]}
    >
      <DemoBox title={t.demoVerticalTitle} description={t.demoVerticalDesc} code={VerticalSource}>
        <VerticalMenu />
      </DemoBox>

      <DemoBox
        title={t.demoHorizontalTitle}
        description={t.demoHorizontalDesc}
        code={HorizontalSource}
      >
        <HorizontalMenu />
      </DemoBox>

      <DemoBox title={t.demoInlineTitle} description={t.demoInlineDesc} code={InlineSource}>
        <InlineMenu />
      </DemoBox>

      <DemoBox
        title={t.demoControlledTitle}
        description={t.demoControlledDesc}
        code={ControlledSource}
      >
        <ControlledMenu />
      </DemoBox>

      <DemoBox title={t.demoIconsTitle} description={t.demoIconsDesc} code={WithIconsSource}>
        <WithIconsMenu />
      </DemoBox>

      <DemoBox title={t.demoGroupsTitle} description={t.demoGroupsDesc} code={GroupsDividersSource}>
        <GroupsDividersMenu />
      </DemoBox>

      <DemoBox
        title={t.demoCollapsedTitle}
        description={t.demoCollapsedDesc}
        code={CollapsedSource}
      >
        <CollapsedMenu />
      </DemoBox>

      <DemoBox title={t.demoDarkTitle} description={t.demoDarkDesc} code={DarkThemeSource}>
        <DarkThemeMenu />
      </DemoBox>

      <DemoBox title={t.demoTokensTitle} description={t.demoTokensDesc} code={TokensOverrideSource}>
        <TokensOverrideMenu />
      </DemoBox>

      <DemoBox
        title={t.demoCustomLauncherTitle}
        description={t.demoCustomLauncherDesc}
        code={CustomAppLauncherSource}
      >
        <CustomAppLauncherMenu />
      </DemoBox>

      <DemoBox
        title={t.demoCustomGlassTitle}
        description={t.demoCustomGlassDesc}
        code={CustomGlassTopNavSource}
        vertical
      >
        <CustomGlassTopNavMenu />
      </DemoBox>

      <DemoBox
        title={t.demoCustomPaletteTitle}
        description={t.demoCustomPaletteDesc}
        code={CustomCommandPaletteSource}
      >
        <CustomCommandPaletteMenu />
      </DemoBox>

      <DemoBox title={t.demoUnstyledTitle} description={t.demoUnstyledDesc} code={UnstyledSource}>
        <UnstyledMenu />
      </DemoBox>

      <PropsTable title={t.tableMenuApi} data={menuProps} />
      <PropsTable title={t.tableMenuItem} data={menuItemProps} />
      <CssVarsTable title={t.tableCssVars} hint={t.cssHint} data={menuCssVars} />
    </ComponentDoc>
  )
}
