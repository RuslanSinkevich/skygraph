import { useMemo } from 'react'
import { ComponentDoc, DemoBox, PropsTable, CssVarsTable } from '../components'
import type { PropDef, CssVarDef } from '../components'

import { useSkeletonDocStrings } from './skeleton-doc/useSkeletonDocStrings'

import { BasicSkeleton } from './skeleton/Basic.demo'
import BasicSource from './skeleton/Basic.demo?raw'
import { ActiveSkeleton } from './skeleton/Active.demo'
import ActiveSource from './skeleton/Active.demo?raw'
import { WithAvatarSkeleton } from './skeleton/WithAvatar.demo'
import WithAvatarSource from './skeleton/WithAvatar.demo?raw'
import { RowsSkeleton } from './skeleton/Rows.demo'
import RowsSource from './skeleton/Rows.demo?raw'
import { NoTitleSkeleton } from './skeleton/NoTitle.demo'
import NoTitleSource from './skeleton/NoTitle.demo?raw'
import { LoadingSkeleton } from './skeleton/Loading.demo'
import LoadingSource from './skeleton/Loading.demo?raw'
import { CardSkeleton } from './skeleton/Card.demo'
import CardSource from './skeleton/Card.demo?raw'
import { TokensOverrideSkeleton } from './skeleton/TokensOverride.demo'
import TokensOverrideSource from './skeleton/TokensOverride.demo?raw'
import { UnstyledSkeleton } from './skeleton/Unstyled.demo'
import UnstyledSource from './skeleton/Unstyled.demo?raw'

export function SkeletonDemo() {
  const t = useSkeletonDocStrings()

  const skeletonProps = useMemo<PropDef[]>(
    () => [
      { name: 'active', description: t.propActive, type: 'boolean', default: 'false' },
      { name: 'avatar', description: t.propAvatar, type: 'boolean | { size?: number; shape?: "circle" | "square" }', default: 'false' },
      { name: 'title', description: t.propTitle, type: 'boolean | { width?: number | string }', default: 'true' },
      { name: 'paragraph', description: t.propParagraph, type: 'boolean | { rows?: number; width?: Array<number | string> }', default: 'true' },
      { name: 'loading', description: t.propLoading, type: 'boolean', default: 'true' },
      { name: 'children', description: t.propChildren, type: 'ReactNode' },
      { name: 'className', description: t.propClassName, type: 'string' },
      { name: 'style', description: t.propStyle, type: 'CSSProperties' },
      { name: 'unstyled', description: t.propUnstyled, type: 'boolean', default: 'false' },
    ],
    [t],
  )

  const skeletonCssVars = useMemo<CssVarDef[]>(
    () => [
      { name: 'sg-color-bg-hover', default: 'rgba(0, 0, 0, 0.04)', description: t.cssBgHover },
      { name: 'sg-color-bg-secondary', default: 'rgba(0, 0, 0, 0.02)', description: t.cssBgSecondary },
      { name: 'sg-border-radius', default: '6px', description: t.cssRadius },
      { name: 'sg-border-radius-sm', default: '4px', description: t.cssRadiusSm },
      { name: 'sg-padding-lg', default: '16px', description: t.cssPaddingLg },
      { name: 'sg-margin-sm', default: '8px', description: t.cssMarginSm },
      { name: 'sg-margin-md', default: '12px', description: t.cssMarginMd },
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
        <BasicSkeleton />
      </DemoBox>

      <DemoBox title={t.demoActiveTitle} description={t.demoActiveDesc} code={ActiveSource}>
        <ActiveSkeleton />
      </DemoBox>

      <DemoBox title={t.demoAvatarTitle} description={t.demoAvatarDesc} code={WithAvatarSource}>
        <WithAvatarSkeleton />
      </DemoBox>

      <DemoBox title={t.demoRowsTitle} description={t.demoRowsDesc} code={RowsSource}>
        <RowsSkeleton />
      </DemoBox>

      <DemoBox title={t.demoNoTitleTitle} description={t.demoNoTitleDesc} code={NoTitleSource}>
        <NoTitleSkeleton />
      </DemoBox>

      <DemoBox title={t.demoLoadingTitle} description={t.demoLoadingDesc} code={LoadingSource}>
        <LoadingSkeleton />
      </DemoBox>

      <DemoBox title={t.demoCardTitle} description={t.demoCardDesc} code={CardSource}>
        <CardSkeleton />
      </DemoBox>

      <DemoBox title={t.demoTokensTitle} description={t.demoTokensDesc} code={TokensOverrideSource}>
        <TokensOverrideSkeleton />
      </DemoBox>

      <DemoBox title={t.demoUnstyledTitle} description={t.demoUnstyledDesc} code={UnstyledSource}>
        <UnstyledSkeleton />
      </DemoBox>

      <PropsTable title={t.tableSkeletonApi} data={skeletonProps} />
      <CssVarsTable title={t.tableCssVars} hint={t.cssHint} data={skeletonCssVars} />
    </ComponentDoc>
  )
}
