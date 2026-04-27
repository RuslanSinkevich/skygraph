import { ComponentDoc, DemoBox, PropsTable, CssVarsTable } from '../components'
import type { PropDef, CssVarDef } from '../components'

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

const skeletonProps: PropDef[] = [
  { name: 'active', description: 'Turn on the shimmer animation', type: 'boolean', default: 'false' },
  { name: 'avatar', description: 'Show an avatar placeholder; object form tunes `size` and `shape`', type: 'boolean | { size?: number; shape?: "circle" | "square" }', default: 'false' },
  { name: 'title', description: 'Show the heading bar; object form tunes `width`', type: 'boolean | { width?: number | string }', default: 'true' },
  { name: 'paragraph', description: 'Show paragraph lines; object form tunes `rows` and per-line `width`', type: 'boolean | { rows?: number; width?: Array<number | string> }', default: 'true' },
  { name: 'loading', description: 'When `false`, render `children` instead of the skeleton', type: 'boolean', default: 'true' },
  { name: 'children', description: 'Real content rendered when `loading` is `false`', type: 'ReactNode' },
  { name: 'className', description: 'Wrapper className', type: 'string' },
  { name: 'style', description: 'Wrapper inline style', type: 'CSSProperties' },
  { name: 'unstyled', description: 'Drop every sg-skeleton-* class (headless mode)', type: 'boolean', default: 'false' },
]

const skeletonCssVars: CssVarDef[] = [
  { name: 'sg-color-bg-hover', default: 'rgba(0, 0, 0, 0.04)', description: 'Placeholder fill colour (avatar / title / rows)' },
  { name: 'sg-color-bg-secondary', default: 'rgba(0, 0, 0, 0.02)', description: 'Highlight colour in the shimmer gradient (`active`)' },
  { name: 'sg-border-radius', default: '6px', description: 'Square avatar corner radius' },
  { name: 'sg-border-radius-sm', default: '4px', description: 'Title + paragraph line corner radius' },
  { name: 'sg-padding-lg', default: '16px', description: 'Gap between avatar and content block' },
  { name: 'sg-margin-sm', default: '8px', description: 'Gap between paragraph lines' },
  { name: 'sg-margin-md', default: '12px', description: 'Gap from title to paragraph block' },
]

export function SkeletonDemo() {
  return (
    <ComponentDoc
      title="Skeleton"
      description="Layout-aware placeholder while content loads — avatar, title, and paragraph blocks, with an optional shimmer animation."
      whenToUse={[
        'Feed / list items that rely on a network request.',
        'Cards and dashboard widgets that hydrate after mount.',
        'Any screen where swapping from placeholder to content shouldn\'t jump the layout.',
      ]}
    >
      <DemoBox title="Basic" description="Title + 3 lines, no animation." code={BasicSource}>
        <BasicSkeleton />
      </DemoBox>

      <DemoBox
        title="Active animation"
        description="Turn on the shimmer for long-lived placeholders."
        code={ActiveSource}
      >
        <ActiveSkeleton />
      </DemoBox>

      <DemoBox
        title="With avatar"
        description="Profile / feed item shape."
        code={WithAvatarSource}
      >
        <WithAvatarSkeleton />
      </DemoBox>

      <DemoBox
        title="Paragraph rows & widths"
        description="Match the line count + widths to the real content."
        code={RowsSource}
      >
        <RowsSkeleton />
      </DemoBox>

      <DemoBox
        title="Drop blocks"
        description="Hide title / paragraph / avatar selectively."
        code={NoTitleSource}
      >
        <NoTitleSkeleton />
      </DemoBox>

      <DemoBox
        title="Loading → content swap"
        description="Flip `loading` to swap the skeleton for `children` in place."
        code={LoadingSource}
      >
        <LoadingSkeleton />
      </DemoBox>

      <DemoBox
        title="Card composition"
        description="Compose several Skeletons to mirror a card grid."
        code={CardSource}
      >
        <CardSkeleton />
      </DemoBox>

      <DemoBox
        title="Tokens override"
        description="Scope the two bg tokens for a bespoke skeleton palette."
        code={TokensOverrideSource}
      >
        <TokensOverrideSkeleton />
      </DemoBox>

      <DemoBox
        title="Unstyled"
        description="Keep aria + structure, bring your own styling."
        code={UnstyledSource}
      >
        <UnstyledSkeleton />
      </DemoBox>

      <PropsTable title="Skeleton API" data={skeletonProps} />
      <CssVarsTable
        title="CSS Variables"
        hint="Skeleton has no component-private tokens — it reads `--sg-color-bg-hover` (fill) and `--sg-color-bg-secondary` (shimmer highlight). Swap both on a wrapper for a dark-mode or branded placeholder."
        data={skeletonCssVars}
      />
    </ComponentDoc>
  )
}
