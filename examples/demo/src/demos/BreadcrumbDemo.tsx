import { useMemo } from 'react'
import { ComponentDoc, DemoBox, PropsTable, CssVarsTable } from '../components'
import type { PropDef, CssVarDef } from '../components'

import { useBreadcrumbDocStrings } from './breadcrumb-doc/useBreadcrumbDocStrings'

import { BasicBreadcrumb } from './breadcrumb/Basic.demo'
import BasicSource from './breadcrumb/Basic.demo?raw'
import { SeparatorBreadcrumb } from './breadcrumb/Separator.demo'
import SeparatorSource from './breadcrumb/Separator.demo?raw'
import { OnClickBreadcrumb } from './breadcrumb/OnClick.demo'
import OnClickSource from './breadcrumb/OnClick.demo?raw'
import { WithIconsBreadcrumb } from './breadcrumb/WithIcons.demo'
import WithIconsSource from './breadcrumb/WithIcons.demo?raw'
import { DropdownBreadcrumb } from './breadcrumb/Dropdown.demo'
import DropdownSource from './breadcrumb/Dropdown.demo?raw'
import { TokensOverrideBreadcrumb } from './breadcrumb/TokensOverride.demo'
import TokensOverrideSource from './breadcrumb/TokensOverride.demo?raw'
import { UnstyledBreadcrumb } from './breadcrumb/Unstyled.demo'
import UnstyledSource from './breadcrumb/Unstyled.demo?raw'

export function BreadcrumbDemo() {
  const t = useBreadcrumbDocStrings()

  const breadcrumbProps = useMemo<PropDef[]>(
    () => [
      { name: 'items', description: t.propItems, type: 'BreadcrumbItem[]' },
      { name: 'separator', description: t.propSeparator, type: 'ReactNode', default: "'/'" },
      { name: 'className', description: t.propClassName, type: 'string' },
      { name: 'style', description: t.propStyle, type: 'CSSProperties' },
      { name: 'unstyled', description: t.propUnstyled, type: 'boolean', default: 'false' },
    ],
    [t],
  )

  const breadcrumbItemProps = useMemo<PropDef[]>(
    () => [
      { name: 'title', description: t.itemTitle, type: 'ReactNode' },
      { name: 'href', description: t.itemHref, type: 'string' },
      { name: 'onClick', description: t.itemOnClick, type: '() => void' },
    ],
    [t],
  )

  const breadcrumbCssVars = useMemo<CssVarDef[]>(
    () => [
      { name: 'sg-color-text', default: 'rgba(0, 0, 0, 0.88)', description: t.cssText },
      { name: 'sg-color-text-secondary', default: 'rgba(0, 0, 0, 0.65)', description: t.cssTextSecondary },
      { name: 'sg-color-text-tertiary', default: 'rgba(0, 0, 0, 0.45)', description: t.cssTextTertiary },
      { name: 'sg-color-primary', default: '#1677ff', description: t.cssPrimary },
      { name: 'sg-font-size', default: '14px', description: t.cssFontSize },
      { name: 'sg-line-height', default: '1.5714', description: t.cssLineHeight },
      { name: 'sg-padding-sm', default: '8px', description: t.cssPaddingSm },
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
        <BasicBreadcrumb />
      </DemoBox>

      <DemoBox
        title={t.demoSeparatorTitle}
        description={t.demoSeparatorDesc}
        code={SeparatorSource}
      >
        <SeparatorBreadcrumb />
      </DemoBox>

      <DemoBox
        title={t.demoOnClickTitle}
        description={t.demoOnClickDesc}
        code={OnClickSource}
      >
        <OnClickBreadcrumb />
      </DemoBox>

      <DemoBox
        title={t.demoIconsTitle}
        description={t.demoIconsDesc}
        code={WithIconsSource}
      >
        <WithIconsBreadcrumb />
      </DemoBox>

      <DemoBox
        title={t.demoDropdownTitle}
        description={t.demoDropdownDesc}
        code={DropdownSource}
      >
        <DropdownBreadcrumb />
      </DemoBox>

      <DemoBox
        title={t.demoTokensTitle}
        description={t.demoTokensDesc}
        code={TokensOverrideSource}
      >
        <TokensOverrideBreadcrumb />
      </DemoBox>

      <DemoBox
        title={t.demoUnstyledTitle}
        description={t.demoUnstyledDesc}
        code={UnstyledSource}
      >
        <UnstyledBreadcrumb />
      </DemoBox>

      <PropsTable title={t.tableBreadcrumbApi} data={breadcrumbProps} />
      <PropsTable title={t.tableBreadcrumbItem} data={breadcrumbItemProps} />
      <CssVarsTable
        title={t.tableCssVars}
        hint={t.cssHint}
        data={breadcrumbCssVars}
      />
    </ComponentDoc>
  )
}
