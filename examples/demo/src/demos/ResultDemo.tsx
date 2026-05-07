import { useMemo } from 'react'
import { ComponentDoc, DemoBox, PropsTable, CssVarsTable } from '../components'
import type { PropDef, CssVarDef } from '../components'

import { useResultDocStrings } from './result-doc/useResultDocStrings'

import { SuccessResult } from './result/Success.demo'
import SuccessSource from './result/Success.demo?raw'
import { ErrorResult } from './result/Error.demo'
import ErrorSource from './result/Error.demo?raw'
import { InfoWarningResult } from './result/InfoWarning.demo'
import InfoWarningSource from './result/InfoWarning.demo?raw'
import { HttpResult } from './result/Http.demo'
import HttpSource from './result/Http.demo?raw'
import { CustomIconResult } from './result/CustomIcon.demo'
import CustomIconSource from './result/CustomIcon.demo?raw'
import { WithContentResult } from './result/WithContent.demo'
import WithContentSource from './result/WithContent.demo?raw'
import { TokensOverrideResult } from './result/TokensOverride.demo'
import TokensOverrideSource from './result/TokensOverride.demo?raw'
import { UnstyledResult } from './result/Unstyled.demo'
import UnstyledSource from './result/Unstyled.demo?raw'

export function ResultDemo() {
  const t = useResultDocStrings()

  const resultProps = useMemo<PropDef[]>(
    () => [
      { name: 'status', description: t.propStatus, type: "'success' | 'error' | 'info' | 'warning' | '404' | '403' | '500'", required: true },
      { name: 'title', description: t.propTitle, type: 'ReactNode', required: true },
      { name: 'subTitle', description: t.propSubTitle, type: 'ReactNode' },
      { name: 'icon', description: t.propIcon, type: 'ReactNode' },
      { name: 'extra', description: t.propExtra, type: 'ReactNode' },
      { name: 'children', description: t.propChildren, type: 'ReactNode' },
      { name: 'className', description: t.propClassName, type: 'string' },
      { name: 'style', description: t.propStyle, type: 'CSSProperties' },
      { name: 'unstyled', description: t.propUnstyled, type: 'boolean', default: 'false' },
    ],
    [t],
  )

  const resultCssVars = useMemo<CssVarDef[]>(
    () => [
      { name: 'sg-color-success', default: '#52c41a', description: t.cssSuccess },
      { name: 'sg-color-error', default: '#ff4d4f', description: t.cssError },
      { name: 'sg-color-warning', default: '#faad14', description: t.cssWarning },
      { name: 'sg-color-primary', default: '#1677ff', description: t.cssPrimary },
      { name: 'sg-color-text-tertiary', default: 'rgba(0, 0, 0, 0.45)', description: t.cssTextTertiary },
      { name: 'sg-color-text', default: 'rgba(0, 0, 0, 0.88)', description: t.cssText },
      { name: 'sg-color-text-secondary', default: 'rgba(0, 0, 0, 0.65)', description: t.cssTextSecondary },
      { name: 'sg-color-bg-secondary', default: 'rgba(0, 0, 0, 0.02)', description: t.cssBgSecondary },
      { name: 'sg-font-size', default: '14px', description: t.cssFontSize },
      { name: 'sg-font-size-xl', default: '20px', description: t.cssFontSizeXl },
      { name: 'sg-line-height', default: '1.5714', description: t.cssLineHeight },
      { name: 'sg-padding-lg', default: '16px', description: t.cssPaddingLg },
      { name: 'sg-padding-xl', default: '20px', description: t.cssPaddingXl },
      { name: 'sg-padding-sm', default: '8px', description: t.cssPaddingSm },
      { name: 'sg-margin-sm', default: '8px', description: t.cssMarginSm },
      { name: 'sg-margin-lg', default: '16px', description: t.cssMarginLg },
      { name: 'sg-border-radius', default: '6px', description: t.cssRadius },
    ],
    [t],
  )

  return (
    <ComponentDoc
      title={t.pageTitle}
      description={t.pageLead}
      whenToUse={[t.pageWhen1, t.pageWhen2, t.pageWhen3]}
    >
      <DemoBox title={t.demoSuccessTitle} description={t.demoSuccessDesc} code={SuccessSource}>
        <SuccessResult />
      </DemoBox>

      <DemoBox title={t.demoErrorTitle} description={t.demoErrorDesc} code={ErrorSource}>
        <ErrorResult />
      </DemoBox>

      <DemoBox title={t.demoInfoTitle} description={t.demoInfoDesc} code={InfoWarningSource}>
        <InfoWarningResult />
      </DemoBox>

      <DemoBox title={t.demoHttpTitle} description={t.demoHttpDesc} code={HttpSource}>
        <HttpResult />
      </DemoBox>

      <DemoBox title={t.demoIconTitle} description={t.demoIconDesc} code={CustomIconSource}>
        <CustomIconResult />
      </DemoBox>

      <DemoBox title={t.demoContentTitle} description={t.demoContentDesc} code={WithContentSource}>
        <WithContentResult />
      </DemoBox>

      <DemoBox title={t.demoTokensTitle} description={t.demoTokensDesc} code={TokensOverrideSource}>
        <TokensOverrideResult />
      </DemoBox>

      <DemoBox title={t.demoUnstyledTitle} description={t.demoUnstyledDesc} code={UnstyledSource}>
        <UnstyledResult />
      </DemoBox>

      <PropsTable title={t.tableResultApi} data={resultProps} />
      <CssVarsTable title={t.tableCssVars} hint={t.cssHint} data={resultCssVars} />
    </ComponentDoc>
  )
}
