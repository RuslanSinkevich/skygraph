import { useMemo } from 'react'
import { ComponentDoc, DemoBox, PropsTable, CssVarsTable } from '../components'
import type { PropDef, CssVarDef } from '../components'

import { useNotificationDocStrings } from './notification-doc/useNotificationDocStrings'

import { BasicNotification } from './notification/Basic.demo'
import BasicSource from './notification/Basic.demo?raw'
import { TypesNotification } from './notification/Types.demo'
import TypesSource from './notification/Types.demo?raw'
import { DurationNotification } from './notification/Duration.demo'
import DurationSource from './notification/Duration.demo?raw'
import { PlacementNotification } from './notification/Placement.demo'
import PlacementSource from './notification/Placement.demo?raw'
import { OnCloseNotification } from './notification/OnClose.demo'
import OnCloseSource from './notification/OnClose.demo?raw'
import { DestroyAllNotification } from './notification/DestroyAll.demo'
import DestroyAllSource from './notification/DestroyAll.demo?raw'
import { RichContentNotification } from './notification/RichContent.demo'
import RichContentSource from './notification/RichContent.demo?raw'
import { TokensOverrideNotification } from './notification/TokensOverride.demo'
import TokensOverrideSource from './notification/TokensOverride.demo?raw'
import { UnstyledNotification } from './notification/Unstyled.demo'
import UnstyledSource from './notification/Unstyled.demo?raw'

export function NotificationDemo() {
  const t = useNotificationDocStrings()

  const configProps = useMemo<PropDef[]>(
    () => [
      { name: 'type', description: t.cfgType, type: "'success' | 'error' | 'warning' | 'info'", default: "'info'" },
      { name: 'message', description: t.cfgMessage, type: 'ReactNode' },
      { name: 'description', description: t.cfgDescription, type: 'ReactNode' },
      { name: 'duration', description: t.cfgDuration, type: 'number', default: '4500' },
      { name: 'placement', description: t.cfgPlacement, type: "'topRight' | 'topLeft' | 'bottomRight' | 'bottomLeft'", default: "'topRight'" },
      { name: 'key', description: t.cfgKey, type: 'string' },
      { name: 'onClose', description: t.cfgOnClose, type: '() => void' },
    ],
    [t],
  )

  const containerProps = useMemo<PropDef[]>(
    () => [
      { name: 'placement', description: t.containerPlacement, type: "'topRight' | 'topLeft' | 'bottomRight' | 'bottomLeft'", default: "'topRight'" },
      { name: 'unstyled', description: t.containerUnstyled, type: 'boolean', default: 'false' },
      { name: 'className', description: t.containerClassName, type: 'string' },
      { name: 'style', description: t.containerStyle, type: 'CSSProperties' },
    ],
    [t],
  )

  const utilityMethods = useMemo<PropDef[]>(
    () => [
      { name: 'notification.open(config)', description: t.utilOpen, type: '(config: NotificationConfig) => void' },
      { name: 'notification.success(message, description?)', description: t.utilSuccess, type: '(message, description?) => void' },
      { name: 'notification.error(message, description?)', description: t.utilError, type: '(message, description?) => void' },
      { name: 'notification.warning(message, description?)', description: t.utilWarning, type: '(message, description?) => void' },
      { name: 'notification.info(message, description?)', description: t.utilInfo, type: '(message, description?) => void' },
      { name: 'notification.destroy()', description: t.utilDestroy, type: '() => void' },
    ],
    [t],
  )

  const notificationCssVars = useMemo<CssVarDef[]>(
    () => [
      { name: 'sg-z-notification', default: '1010', description: t.cssZ },
      { name: 'sg-padding-xl', default: '24px', description: t.cssPaddingXl },
      { name: 'sg-padding-md', default: '12px', description: t.cssPaddingMd },
      { name: 'sg-padding-lg', default: '16px', description: t.cssPaddingLg },
      { name: 'sg-padding-sm', default: '8px', description: t.cssPaddingSm },
      { name: 'sg-margin-sm', default: '8px', description: t.cssMarginSm },
      { name: 'sg-margin-xs', default: '4px', description: t.cssMarginXs },
      { name: 'sg-color-bg-elevated', default: '#ffffff', description: t.cssBgElevated },
      { name: 'sg-color-border-secondary', default: '#f0f0f0', description: t.cssBorderSecondary },
      { name: 'sg-border-radius-lg', default: '8px', description: t.cssRadiusLg },
      { name: 'sg-shadow-lg', default: '0 6px 16px rgba(0,0,0,0.08)', description: t.cssShadowLg },
      { name: 'sg-transition-duration', default: '0.2s', description: t.cssTransitionDuration },
      { name: 'sg-transition-timing', default: 'cubic-bezier(0.645, 0.045, 0.355, 1)', description: t.cssTransitionTiming },
      { name: 'sg-font-size', default: '14px', description: t.cssFontSize },
      { name: 'sg-font-size-sm', default: '12px', description: t.cssFontSizeSm },
      { name: 'sg-font-size-lg', default: '16px', description: t.cssFontSizeLg },
      { name: 'sg-color-text', default: '#000000d9', description: t.cssText },
      { name: 'sg-color-text-secondary', default: '#00000073', description: t.cssTextSecondary },
      { name: 'sg-color-text-tertiary', default: '#00000040', description: t.cssTextTertiary },
      { name: 'sg-color-success', default: '#52c41a', description: t.cssSuccess },
      { name: 'sg-color-success-bg', default: '#f6ffed', description: t.cssSuccessBg },
      { name: 'sg-color-error', default: '#ff4d4f', description: t.cssError },
      { name: 'sg-color-error-bg', default: '#fff2f0', description: t.cssErrorBg },
      { name: 'sg-color-warning', default: '#faad14', description: t.cssWarning },
      { name: 'sg-color-warning-bg', default: '#fffbe6', description: t.cssWarningBg },
      { name: 'sg-color-primary', default: '#1677ff', description: t.cssPrimary },
      { name: 'sg-color-primary-bg', default: '#e6f4ff', description: t.cssPrimaryBg },
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
        <BasicNotification />
      </DemoBox>

      <DemoBox title={t.demoTypesTitle} description={t.demoTypesDesc} code={TypesSource}>
        <TypesNotification />
      </DemoBox>

      <DemoBox title={t.demoDurationTitle} description={t.demoDurationDesc} code={DurationSource}>
        <DurationNotification />
      </DemoBox>

      <DemoBox title={t.demoPlacementTitle} description={t.demoPlacementDesc} code={PlacementSource}>
        <PlacementNotification />
      </DemoBox>

      <DemoBox title={t.demoOnCloseTitle} description={t.demoOnCloseDesc} code={OnCloseSource}>
        <OnCloseNotification />
      </DemoBox>

      <DemoBox title={t.demoRichTitle} description={t.demoRichDesc} code={RichContentSource}>
        <RichContentNotification />
      </DemoBox>

      <DemoBox title={t.demoDestroyTitle} description={t.demoDestroyDesc} code={DestroyAllSource}>
        <DestroyAllNotification />
      </DemoBox>

      <DemoBox title={t.demoTokensTitle} description={t.demoTokensDesc} code={TokensOverrideSource}>
        <TokensOverrideNotification />
      </DemoBox>

      <DemoBox title={t.demoUnstyledTitle} description={t.demoUnstyledDesc} code={UnstyledSource}>
        <UnstyledNotification />
      </DemoBox>

      <PropsTable title={t.tableConfig} data={configProps} />
      <PropsTable title={t.tableContainer} data={containerProps} />
      <PropsTable title={t.tableUtility} data={utilityMethods} />
      <CssVarsTable title={t.tableCssVars} hint={t.cssHint} data={notificationCssVars} />
    </ComponentDoc>
  )
}
