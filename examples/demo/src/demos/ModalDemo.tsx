import { ComponentDoc, DemoBox, PropsTable, CssVarsTable } from '../components'
import type { PropDef, CssVarDef } from '../components'

import { BasicModal } from './modal/Basic.demo'
import BasicSource from './modal/Basic.demo?raw'
import { AsyncConfirmModal } from './modal/AsyncConfirm.demo'
import AsyncConfirmSource from './modal/AsyncConfirm.demo?raw'
import { WidthsModal } from './modal/Widths.demo'
import WidthsSource from './modal/Widths.demo?raw'
import { NoFooterModal } from './modal/NoFooter.demo'
import NoFooterSource from './modal/NoFooter.demo?raw'
import { TokensOverrideModal } from './modal/TokensOverride.demo'
import TokensOverrideSource from './modal/TokensOverride.demo?raw'
import { UnstyledModal } from './modal/Unstyled.demo'
import UnstyledSource from './modal/Unstyled.demo?raw'
import { DefaultFooterModal } from './modal/DefaultFooter.demo'
import DefaultFooterSource from './modal/DefaultFooter.demo?raw'

const modalProps: PropDef[] = [
  { name: 'open', description: 'Controls visibility', type: 'boolean', default: 'false' },
  { name: 'onClose', description: 'Called on Escape, mask click, or close button', type: '() => void' },
  { name: 'title', description: 'Optional heading + accessible name', type: 'string' },
  { name: 'footer', description: 'Override the footer area. Omit to use the default OK/Cancel when `onOk` is set. Pass `null` to drop the footer entirely.', type: 'ReactNode | null' },
  { name: 'onOk', description: 'Called when the default OK button is clicked. Enables the default footer when `footer` is omitted.', type: '() => void | Promise<void>' },
  { name: 'okText', description: 'Default OK label. Falls back to `locale.modal.okText` → "OK".', type: 'string' },
  { name: 'cancelText', description: 'Default Cancel label. Falls back to `locale.modal.cancelText` → "Cancel".', type: 'string' },
  { name: 'okType', description: 'Visual type of the default OK button.', type: "'primary' | 'default' | 'dashed' | 'text'", default: "'primary'" },
  { name: 'confirmLoading', description: 'Puts the OK button in loading state and disables Cancel.', type: 'boolean' },
  { name: 'children', description: 'Body content', type: 'ReactNode' },
  { name: 'width', description: 'Dialog width (number = px, or any CSS length)', type: 'number | string', default: '520' },
  { name: 'className', description: 'Extra class on the dialog root', type: 'string' },
  { name: 'unstyled', description: 'Keep semantics, drop SkyGraph styles', type: 'boolean', default: 'false' },
]

const modalCssVars: CssVarDef[] = [
  { name: 'sg-z-modal', default: '1000', description: 'Stacking layer for the mask + dialog' },
  { name: 'sg-color-overlay', default: 'rgba(0, 0, 0, 0.45)', description: 'Backdrop fill — dark-theme tuned automatically' },
  { name: 'sg-color-bg-elevated', default: 'var(--sg-gray-1)', description: 'Dialog background' },
  { name: 'sg-color-border-secondary', default: 'var(--sg-gray-4)', description: 'Header / footer divider lines' },
  { name: 'sg-color-text', default: 'rgba(0, 0, 0, 0.88)', description: 'Title + body text' },
  { name: 'sg-color-text-tertiary', default: 'rgba(0, 0, 0, 0.45)', description: 'Close icon (× button)' },
  { name: 'sg-color-bg-hover', default: 'var(--sg-gray-3)', description: 'Close icon hover background' },
  { name: 'sg-border-radius-lg', default: '8px', description: 'Dialog corner radius' },
  { name: 'sg-border-radius-sm', default: '4px', description: 'Close icon hit-area radius' },
  { name: 'sg-shadow-lg', default: '0 6px 16px rgba(0, 0, 0, 0.12)', description: 'Dialog drop shadow' },
  { name: 'sg-padding-lg', default: '16px', description: 'Header + body padding' },
  { name: 'sg-padding-md', default: '12px', description: 'Footer vertical padding' },
  { name: 'sg-padding-sm', default: '8px', description: 'Gap between footer buttons' },
  { name: 'sg-padding-xl', default: '24px', description: 'Spacious empty-state / centered layout padding' },
  { name: 'sg-font-size-lg', default: '16px', description: 'Title font size' },
  { name: 'sg-font-size-xl', default: '20px', description: 'Close icon font size' },
]

export function ModalDemo() {
  return (
    <ComponentDoc
      title="Modal"
      badge="Feedback"
      crumbs={['Feedback', 'Modal']}
      description="Dialog with focus trap, Escape-to-close, and scoped token re-skinning."
      whenToUse={[
        'When a user must complete a short task before returning to context (create, confirm, edit).',
        'When you need to show important details without navigating away.',
        'For lightweight confirmations prefer <Popconfirm>. For stepwise flows consider <Drawer>.',
      ]}
    >
      <DemoBox title="Basic" description="Title, body, two-button footer." code={BasicSource}>
        <BasicModal />
      </DemoBox>

      <DemoBox
        title="Default footer (onOk)"
        description="Omit `footer` and pass `onOk` — SkyGraph renders Cancel + OK wired to the locale. `confirmLoading` disables Cancel and spins OK."
        code={DefaultFooterSource}
      >
        <DefaultFooterModal />
      </DemoBox>

      <DemoBox title="Async confirmation" description="Loading footer + guarded Cancel while the task runs." code={AsyncConfirmSource}>
        <AsyncConfirmModal />
      </DemoBox>

      <DemoBox title="Widths" description="`width` takes pixels or any CSS length." code={WidthsSource}>
        <WidthsModal />
      </DemoBox>

      <DemoBox
        title="No footer"
        description="Pass `footer={null}` to drop the divider — read-only dialogs with only the close button."
        code={NoFooterSource}
      >
        <NoFooterModal />
      </DemoBox>

      <DemoBox
        title="Tokens override"
        description="Scope `--sg-color-primary` + `--sg-border-radius-lg` to re-skin one modal."
        code={TokensOverrideSource}
      >
        <TokensOverrideModal />
      </DemoBox>

      <DemoBox
        title="Unstyled"
        description="Headless mode — keeps focus trap and ARIA, drops the visuals."
        code={UnstyledSource}
      >
        <UnstyledModal />
      </DemoBox>

      <PropsTable title="Modal API" data={modalProps} />
      <CssVarsTable
        title="CSS Variables"
        hint="Modal exposes structural spacing + colors. The content (Buttons, Forms) follows its own tokens."
        data={modalCssVars}
      />
    </ComponentDoc>
  )
}
