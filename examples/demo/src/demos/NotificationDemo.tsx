import { ComponentDoc, DemoBox, PropsTable, CssVarsTable } from '../components'
import type { PropDef, CssVarDef } from '../components'

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

const configProps: PropDef[] = [
  { name: 'type', description: 'Visual variant; picks icon + accent colour', type: "'success' | 'error' | 'warning' | 'info'", default: "'info'" },
  { name: 'message', description: 'Primary line (title).', type: 'ReactNode' },
  { name: 'description', description: 'Secondary detail below the message.', type: 'ReactNode' },
  { name: 'duration', description: 'Auto-dismiss delay in ms; `0` disables auto-close.', type: 'number', default: '4500' },
  { name: 'placement', description: 'Corner stack; must match a mounted `NotificationContainer`.', type: "'topRight' | 'topLeft' | 'bottomRight' | 'bottomLeft'", default: "'topRight'" },
  { name: 'key', description: 'Stable id used as React key + for manual removal. Auto-generated if omitted.', type: 'string' },
  { name: 'onClose', description: 'Fired after the toast leaves the store (manual or auto).', type: '() => void' },
]

const containerProps: PropDef[] = [
  { name: 'placement', description: 'Corner this instance listens to. Mount one per corner you use.', type: "'topRight' | 'topLeft' | 'bottomRight' | 'bottomLeft'", default: "'topRight'" },
  { name: 'unstyled', description: 'Drop every `sg-notification-*` class from the container and cards.', type: 'boolean', default: 'false' },
  { name: 'className', description: 'Extra wrapper className.', type: 'string' },
  { name: 'style', description: 'Inline style for the wrapper.', type: 'CSSProperties' },
]

const utilityMethods: PropDef[] = [
  { name: 'notification.open(config)', description: 'Open a toast with full config.', type: '(config: NotificationConfig) => void' },
  { name: 'notification.success(message, description?)', description: 'Shortcut for `{ type: "success" }`.', type: '(message, description?) => void' },
  { name: 'notification.error(message, description?)', description: 'Shortcut for `{ type: "error" }`.', type: '(message, description?) => void' },
  { name: 'notification.warning(message, description?)', description: 'Shortcut for `{ type: "warning" }`.', type: '(message, description?) => void' },
  { name: 'notification.info(message, description?)', description: 'Shortcut for `{ type: "info" }`.', type: '(message, description?) => void' },
  { name: 'notification.destroy()', description: 'Remove every active toast at once.', type: '() => void' },
]

const notificationCssVars: CssVarDef[] = [
  { name: 'sg-z-notification', default: '1010', description: 'z-index for all `sg-notification-container` stacks' },
  { name: 'sg-padding-xl', default: '24px', description: 'Distance from viewport corner (top/right/bottom/left)' },
  { name: 'sg-padding-md', default: '12px', description: 'Card vertical padding' },
  { name: 'sg-padding-lg', default: '16px', description: 'Card horizontal padding' },
  { name: 'sg-padding-sm', default: '8px', description: 'Gap between icon / content / close button' },
  { name: 'sg-margin-sm', default: '8px', description: 'Gap between stacked toasts' },
  { name: 'sg-margin-xs', default: '4px', description: 'Gap between message and description lines' },
  { name: 'sg-color-bg-elevated', default: '#ffffff', description: 'Card background (elevated surface)' },
  { name: 'sg-color-border-secondary', default: '#f0f0f0', description: 'Card border' },
  { name: 'sg-border-radius-lg', default: '8px', description: 'Card corner radius' },
  { name: 'sg-shadow-lg', default: '0 6px 16px rgba(0,0,0,0.08)', description: 'Card drop shadow' },
  { name: 'sg-transition-duration', default: '0.2s', description: 'Enter / leave animation duration + close-button hover' },
  { name: 'sg-transition-timing', default: 'cubic-bezier(0.645, 0.045, 0.355, 1)', description: 'Enter / leave animation easing' },
  { name: 'sg-font-size', default: '14px', description: 'Message (title) font size' },
  { name: 'sg-font-size-sm', default: '12px', description: 'Description + icon glyph size' },
  { name: 'sg-font-size-lg', default: '16px', description: 'Close button (×) size' },
  { name: 'sg-color-text', default: '#000000d9', description: 'Message (title) colour + close button hover' },
  { name: 'sg-color-text-secondary', default: '#00000073', description: 'Description colour' },
  { name: 'sg-color-text-tertiary', default: '#00000040', description: 'Close button (×) default colour' },
  { name: 'sg-color-success', default: '#52c41a', description: '`type="success"` icon colour' },
  { name: 'sg-color-success-bg', default: '#f6ffed', description: '`type="success"` icon background' },
  { name: 'sg-color-error', default: '#ff4d4f', description: '`type="error"` icon colour' },
  { name: 'sg-color-error-bg', default: '#fff2f0', description: '`type="error"` icon background' },
  { name: 'sg-color-warning', default: '#faad14', description: '`type="warning"` icon colour' },
  { name: 'sg-color-warning-bg', default: '#fffbe6', description: '`type="warning"` icon background' },
  { name: 'sg-color-primary', default: '#1677ff', description: '`type="info"` icon colour' },
  { name: 'sg-color-primary-bg', default: '#e6f4ff', description: '`type="info"` icon background' },
]

export function NotificationDemo() {
  return (
    <ComponentDoc
      title="Notification"
      description="Corner-pinned toasts driven by a global store. Call `notification.open(config)` (or the shorthand helpers) from anywhere — as long as a `NotificationContainer` is mounted for the matching `placement`."
      whenToUse={[
        'System-level feedback that needs more content than a simple inline message.',
        'Background task progress or completion (uploads, saves, long fetches).',
        'Route-independent announcements triggered from deep component trees.',
      ]}
    >
      <DemoBox
        title="Basic"
        description="Simplest usage — title + description, auto-closes after 4.5s."
        code={BasicSource}
      >
        <BasicNotification />
      </DemoBox>

      <DemoBox
        title="Types"
        description="Semantic variants map to icon colour + accent background."
        code={TypesSource}
      >
        <TypesNotification />
      </DemoBox>

      <DemoBox
        title="Duration"
        description="Set `duration` in ms; pass `0` to disable auto-close."
        code={DurationSource}
      >
        <DurationNotification />
      </DemoBox>

      <DemoBox
        title="Placement"
        description="Toasts render in the corner that matches the `placement` option. Each corner needs its own mounted `NotificationContainer` (the demo site mounts three — `topRight`, `topLeft`, `bottomRight`; `bottomLeft` is reserved for the Unstyled example)."
        code={PlacementSource}
      >
        <PlacementNotification />
      </DemoBox>

      <DemoBox
        title="onClose callback"
        description="Observe when a toast is actually removed — manually or by the auto-dismiss timer."
        code={OnCloseSource}
      >
        <OnCloseNotification />
      </DemoBox>

      <DemoBox
        title="Rich content"
        description="`message` and `description` accept any ReactNode — wire up buttons, links, progress bars, anything."
        code={RichContentSource}
      >
        <RichContentNotification />
      </DemoBox>

      <DemoBox
        title="Destroy all"
        description="`notification.destroy()` clears the entire store regardless of placement."
        code={DestroyAllSource}
      >
        <DestroyAllNotification />
      </DemoBox>

      <DemoBox
        title="Tokens override"
        description="Card visuals come from global design tokens — swap them on `:root` or a high-level wrapper that also contains `<NotificationContainer/>`."
        code={TokensOverrideSource}
      >
        <TokensOverrideNotification />
      </DemoBox>

      <DemoBox
        title="Unstyled"
        description="Drop every `sg-notification-*` class via `<NotificationContainer unstyled/>`. You keep the store + portal logic; paint the cards yourself."
        code={UnstyledSource}
      >
        <UnstyledNotification />
      </DemoBox>

      <PropsTable title="NotificationConfig" data={configProps} />
      <PropsTable title="NotificationContainer" data={containerProps} />
      <PropsTable title="notification utility" data={utilityMethods} />
      <CssVarsTable
        title="CSS Variables"
        hint="All tokens are global — the store renders toasts in the ancestor that hosts `<NotificationContainer/>`, so scoping tokens on an inner demo box does not reach the card. Override on `:root`, a theme wrapper, or by mounting a dedicated container inside a scoped wrapper with a distinct `placement`."
        data={notificationCssVars}
      />
    </ComponentDoc>
  )
}
