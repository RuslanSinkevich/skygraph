import { useMemo } from 'react'
import { ComponentDoc, DemoBox, PropsTable, CssVarsTable } from '../components'
import type { PropDef, CssVarDef } from '../components'

import { useButtonDocStrings } from './button-doc/useButtonDocStrings'

import { TypesButton } from './button/Types.demo'
import TypesSource from './button/Types.demo?raw'
import { SizesButton } from './button/Sizes.demo'
import SizesSource from './button/Sizes.demo?raw'
import { LoadingButton } from './button/Loading.demo'
import LoadingSource from './button/Loading.demo?raw'
import { DisabledButton } from './button/Disabled.demo'
import DisabledSource from './button/Disabled.demo?raw'
import { WithIconButton } from './button/WithIcon.demo'
import WithIconSource from './button/WithIcon.demo?raw'
import { TokensOverrideButton } from './button/TokensOverride.demo'
import TokensOverrideSource from './button/TokensOverride.demo?raw'

export function ButtonDemo() {
  const t = useButtonDocStrings()

  const buttonProps = useMemo<PropDef[]>(
    () => [
      {
        name: 'type',
        description: t.propType,
        type: "'default' | 'primary' | 'dashed' | 'text' | 'link'",
        default: "'default'",
      },
      {
        name: 'size',
        description: t.propSize,
        type: "'small' | 'middle' | 'large'",
        default: "'middle'",
      },
      { name: 'disabled', description: t.propDisabled, type: 'boolean', default: 'false' },
      { name: 'loading', description: t.propLoading, type: 'boolean', default: 'false' },
      {
        name: 'htmlType',
        description: t.propHtmlType,
        type: "'button' | 'submit' | 'reset'",
        default: "'button'",
      },
      { name: 'danger', description: t.propDanger, type: 'boolean', default: 'false' },
      { name: 'block', description: t.propBlock, type: 'boolean', default: 'false' },
      {
        name: 'onClick',
        description: t.propOnClick,
        type: '(e: MouseEvent<HTMLButtonElement>) => void',
      },
      { name: 'children', description: t.propChildren, type: 'ReactNode' },
      { name: 'className', description: t.propClassName, type: 'string' },
      { name: 'style', description: t.propStyle, type: 'CSSProperties' },
      { name: 'unstyled', description: t.propUnstyled, type: 'boolean', default: 'false' },
    ],
    [t],
  )

  const buttonCssVars = useMemo<CssVarDef[]>(
    () => [
      { name: 'sg-btn-height', default: 'var(--sg-height-md)', description: t.cssSgBtnHeight },
      { name: 'sg-btn-padding', default: '0 var(--sg-padding-md)', description: t.cssSgBtnPadding },
      { name: 'sg-btn-radius', default: 'var(--sg-border-radius)', description: t.cssSgBtnRadius },
      { name: 'sg-btn-font-size', default: 'var(--sg-font-size)', description: t.cssSgBtnFontSize },
      { name: 'sg-btn-bg', default: 'transparent', description: t.cssSgBtnBg },
      { name: 'sg-btn-color', default: 'var(--sg-color-text)', description: t.cssSgBtnColor },
      { name: 'sg-btn-border', default: 'var(--sg-color-border)', description: t.cssSgBtnBorder },
      { name: 'sg-color-primary', default: '#1677ff', description: t.cssSgColorPrimary },
      { name: 'sg-color-primary-hover', default: '#4096ff', description: t.cssSgColorPrimaryHover },
      {
        name: 'sg-color-primary-active',
        default: '#0958d9',
        description: t.cssSgColorPrimaryActive,
      },
      { name: 'sg-color-primary-bg', default: '#e6f4ff', description: t.cssSgColorPrimaryBg },
      { name: 'sg-color-white', default: '#ffffff', description: t.cssSgColorWhite },
      {
        name: 'sg-color-bg-hover',
        default: 'rgba(0, 0, 0, 0.04)',
        description: t.cssSgColorBgHover,
      },
      {
        name: 'sg-color-bg-disabled',
        default: 'rgba(0, 0, 0, 0.04)',
        description: t.cssSgColorBgDisabled,
      },
      {
        name: 'sg-color-text-disabled',
        default: 'rgba(0, 0, 0, 0.25)',
        description: t.cssSgColorTextDisabled,
      },
      { name: 'sg-height-sm', default: '24px', description: t.cssSgHeightSm },
      { name: 'sg-height-md', default: '32px', description: t.cssSgHeightMd },
      { name: 'sg-height-lg', default: '40px', description: t.cssSgHeightLg },
      { name: 'sg-padding-xs', default: '4px', description: t.cssSgPaddingXs },
      { name: 'sg-padding-sm', default: '8px', description: t.cssSgPaddingSm },
      { name: 'sg-padding-md', default: '12px', description: t.cssSgPaddingMd },
      { name: 'sg-padding-lg', default: '16px', description: t.cssSgPaddingLg },
      { name: 'sg-transition-duration', default: '180ms', description: t.cssSgTransitionDuration },
      {
        name: 'sg-transition-timing',
        default: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
        description: t.cssSgTransitionTiming,
      },
    ],
    [t],
  )

  return (
    <ComponentDoc
      title={t.pageTitle}
      badge={t.pageBadge}
      crumbs={[t.crumbGeneral, t.crumbButton]}
      description={t.pageLead}
      whenToUse={[t.pageWhen1, t.pageWhen2]}
    >
      <DemoBox title={t.demoTypesTitle} description={t.demoTypesDesc} code={TypesSource}>
        <TypesButton />
      </DemoBox>

      <DemoBox title={t.demoSizesTitle} description={t.demoSizesDesc} code={SizesSource}>
        <SizesButton />
      </DemoBox>

      <DemoBox title={t.demoLoadingTitle} description={t.demoLoadingDesc} code={LoadingSource}>
        <LoadingButton />
      </DemoBox>

      <DemoBox title={t.demoDisabledTitle} description={t.demoDisabledDesc} code={DisabledSource}>
        <DisabledButton />
      </DemoBox>

      <DemoBox title={t.demoIconTitle} description={t.demoIconDesc} code={WithIconSource}>
        <WithIconButton />
      </DemoBox>

      <DemoBox
        title={t.demoTokensOverrideTitle}
        description={t.demoTokensOverrideDesc}
        code={TokensOverrideSource}
      >
        <TokensOverrideButton />
      </DemoBox>

      <PropsTable title={t.tableButtonApi} data={buttonProps} />
      <CssVarsTable title={t.tableCssVars} hint={t.cssHint} data={buttonCssVars} />
    </ComponentDoc>
  )
}
