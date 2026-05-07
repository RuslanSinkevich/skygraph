import { useMemo } from 'react'
import { ComponentDoc, DemoBox, PropsTable, CssVarsTable } from '../components'
import type { PropDef, CssVarDef } from '../components'

import { useModalDocStrings } from './modal-doc/useModalDocStrings'

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

export function ModalDemo() {
  const t = useModalDocStrings()

  const modalProps = useMemo<PropDef[]>(
    () => [
      { name: 'open', description: t.propOpen, type: 'boolean', default: 'false' },
      { name: 'onClose', description: t.propOnClose, type: '() => void' },
      { name: 'title', description: t.propTitle, type: 'string' },
      { name: 'footer', description: t.propFooter, type: 'ReactNode | null' },
      { name: 'onOk', description: t.propOnOk, type: '() => void | Promise<void>' },
      { name: 'okText', description: t.propOkText, type: 'string' },
      { name: 'cancelText', description: t.propCancelText, type: 'string' },
      { name: 'okType', description: t.propOkType, type: "'primary' | 'default' | 'dashed' | 'text'", default: "'primary'" },
      { name: 'confirmLoading', description: t.propConfirmLoading, type: 'boolean' },
      { name: 'children', description: t.propChildren, type: 'ReactNode' },
      { name: 'width', description: t.propWidth, type: 'number | string', default: '520' },
      { name: 'className', description: t.propClassName, type: 'string' },
      { name: 'unstyled', description: t.propUnstyled, type: 'boolean', default: 'false' },
    ],
    [t],
  )

  const modalCssVars = useMemo<CssVarDef[]>(
    () => [
      { name: 'sg-z-modal', default: '1000', description: t.cssZModal },
      { name: 'sg-color-overlay', default: 'rgba(0, 0, 0, 0.45)', description: t.cssOverlay },
      { name: 'sg-color-bg-elevated', default: 'var(--sg-gray-1)', description: t.cssBgElevated },
      { name: 'sg-color-border-secondary', default: 'var(--sg-gray-4)', description: t.cssBorderSecondary },
      { name: 'sg-color-text', default: 'rgba(0, 0, 0, 0.88)', description: t.cssText },
      { name: 'sg-color-text-tertiary', default: 'rgba(0, 0, 0, 0.45)', description: t.cssTextTertiary },
      { name: 'sg-color-bg-hover', default: 'var(--sg-gray-3)', description: t.cssBgHover },
      { name: 'sg-border-radius-lg', default: '8px', description: t.cssRadiusLg },
      { name: 'sg-border-radius-sm', default: '4px', description: t.cssRadiusSm },
      { name: 'sg-shadow-lg', default: '0 6px 16px rgba(0, 0, 0, 0.12)', description: t.cssShadowLg },
      { name: 'sg-padding-lg', default: '16px', description: t.cssPaddingLg },
      { name: 'sg-padding-md', default: '12px', description: t.cssPaddingMd },
      { name: 'sg-padding-sm', default: '8px', description: t.cssPaddingSm },
      { name: 'sg-padding-xl', default: '24px', description: t.cssPaddingXl },
      { name: 'sg-font-size-lg', default: '16px', description: t.cssFontSizeLg },
      { name: 'sg-font-size-xl', default: '20px', description: t.cssFontSizeXl },
    ],
    [t],
  )

  return (
    <ComponentDoc
      title={t.pageTitle}
      badge={t.pageBadge}
      crumbs={[t.crumbFeedback, t.crumbModal]}
      description={t.pageLead}
      whenToUse={[t.pageWhen1, t.pageWhen2, t.pageWhen3]}
    >
      <DemoBox title={t.demoBasicTitle} description={t.demoBasicDesc} code={BasicSource}>
        <BasicModal />
      </DemoBox>

      <DemoBox title={t.demoDefaultFooterTitle} description={t.demoDefaultFooterDesc} code={DefaultFooterSource}>
        <DefaultFooterModal />
      </DemoBox>

      <DemoBox title={t.demoAsyncTitle} description={t.demoAsyncDesc} code={AsyncConfirmSource}>
        <AsyncConfirmModal />
      </DemoBox>

      <DemoBox title={t.demoWidthsTitle} description={t.demoWidthsDesc} code={WidthsSource}>
        <WidthsModal />
      </DemoBox>

      <DemoBox title={t.demoNoFooterTitle} description={t.demoNoFooterDesc} code={NoFooterSource}>
        <NoFooterModal />
      </DemoBox>

      <DemoBox title={t.demoTokensTitle} description={t.demoTokensDesc} code={TokensOverrideSource}>
        <TokensOverrideModal />
      </DemoBox>

      <DemoBox title={t.demoUnstyledTitle} description={t.demoUnstyledDesc} code={UnstyledSource}>
        <UnstyledModal />
      </DemoBox>

      <PropsTable title={t.tableModalApi} data={modalProps} />
      <CssVarsTable title={t.tableCssVars} hint={t.cssHint} data={modalCssVars} />
    </ComponentDoc>
  )
}
