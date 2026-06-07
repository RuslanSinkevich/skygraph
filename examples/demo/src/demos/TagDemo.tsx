import { useMemo } from 'react'
import { ComponentDoc, DemoBox, PropsTable, CssVarsTable } from '../components'
import type { PropDef, CssVarDef } from '../components'

import { useTagDocStrings } from './tag-doc/useTagDocStrings'

import { BasicTag } from './tag/Basic.demo'
import BasicSource from './tag/Basic.demo?raw'
import { PresetsTag } from './tag/Presets.demo'
import PresetsSource from './tag/Presets.demo?raw'
import { CustomColorTag } from './tag/CustomColor.demo'
import CustomColorSource from './tag/CustomColor.demo?raw'
import { BorderlessTag } from './tag/Borderless.demo'
import BorderlessSource from './tag/Borderless.demo?raw'
import { ClosableTag } from './tag/Closable.demo'
import ClosableSource from './tag/Closable.demo?raw'
import { WithIconTag } from './tag/WithIcon.demo'
import WithIconSource from './tag/WithIcon.demo?raw'
import { TokensOverrideTag } from './tag/TokensOverride.demo'
import TokensOverrideSource from './tag/TokensOverride.demo?raw'

export function TagDemo() {
  const t = useTagDocStrings()

  const tagProps = useMemo<PropDef[]>(
    () => [
      {
        name: 'color',
        description: t.propColor,
        type: "'default' | 'success' | 'error' | 'warning' | 'processing' | string",
        default: "'default'",
      },
      { name: 'closable', description: t.propClosable, type: 'boolean', default: 'false' },
      { name: 'onClose', description: t.propOnClose, type: '() => void' },
      { name: 'bordered', description: t.propBordered, type: 'boolean', default: 'true' },
      { name: 'children', description: t.propChildren, type: 'ReactNode' },
      { name: 'className', description: t.propClassName, type: 'string' },
      { name: 'style', description: t.propStyle, type: 'CSSProperties' },
      { name: 'unstyled', description: t.propUnstyled, type: 'boolean', default: 'false' },
    ],
    [t],
  )

  const tagCssVars = useMemo<CssVarDef[]>(
    () => [
      {
        name: 'sg-color-bg-secondary',
        default: 'rgba(0, 0, 0, 0.02)',
        description: t.cssSgColorBgSecondary,
      },
      { name: 'sg-color-border', default: 'rgba(5, 5, 5, 0.06)', description: t.cssSgColorBorder },
      { name: 'sg-color-text', default: 'rgba(0, 0, 0, 0.88)', description: t.cssSgColorText },
      { name: 'sg-color-success', default: '#52c41a', description: t.cssSgColorSuccess },
      { name: 'sg-color-success-bg', default: '#f6ffed', description: t.cssSgColorSuccessBg },
      { name: 'sg-color-error', default: '#ff4d4f', description: t.cssSgColorError },
      { name: 'sg-color-error-bg', default: '#fff2f0', description: t.cssSgColorErrorBg },
      { name: 'sg-color-warning', default: '#faad14', description: t.cssSgColorWarning },
      { name: 'sg-color-warning-bg', default: '#fffbe6', description: t.cssSgColorWarningBg },
      { name: 'sg-color-primary', default: '#1677ff', description: t.cssSgColorPrimary },
      {
        name: 'sg-color-primary-bg',
        default: 'rgba(22, 119, 255, 0.1)',
        description: t.cssSgColorPrimaryBg,
      },
      { name: 'sg-font-size-sm', default: '12px', description: t.cssSgFontSizeSm },
      { name: 'sg-padding-sm', default: '8px', description: t.cssSgPaddingSm },
      { name: 'sg-border-radius-sm', default: '4px', description: t.cssSgBorderRadiusSm },
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
      crumbs={[t.crumbDataDisplay, t.crumbTag]}
      description={t.pageLead}
      whenToUse={[t.pageWhen1, t.pageWhen2, t.pageWhen3]}
    >
      <DemoBox title={t.demoBasicTitle} description={t.demoBasicDesc} code={BasicSource}>
        <BasicTag />
      </DemoBox>

      <DemoBox title={t.demoPresetsTitle} description={t.demoPresetsDesc} code={PresetsSource}>
        <PresetsTag />
      </DemoBox>

      <DemoBox
        title={t.demoCustomColorTitle}
        description={t.demoCustomColorDesc}
        code={CustomColorSource}
      >
        <CustomColorTag />
      </DemoBox>

      <DemoBox
        title={t.demoBorderlessTitle}
        description={t.demoBorderlessDesc}
        code={BorderlessSource}
      >
        <BorderlessTag />
      </DemoBox>

      <DemoBox title={t.demoClosableTitle} description={t.demoClosableDesc} code={ClosableSource}>
        <ClosableTag />
      </DemoBox>

      <DemoBox title={t.demoWithIconTitle} description={t.demoWithIconDesc} code={WithIconSource}>
        <WithIconTag />
      </DemoBox>

      <DemoBox title={t.demoTokensTitle} description={t.demoTokensDesc} code={TokensOverrideSource}>
        <TokensOverrideTag />
      </DemoBox>

      <PropsTable title={t.tableTagApi} data={tagProps} />
      <CssVarsTable title={t.tableCssVars} hint={t.cssHint} data={tagCssVars} />
    </ComponentDoc>
  )
}
