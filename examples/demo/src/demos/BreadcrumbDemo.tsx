import { ComponentDoc, DemoBox, PropsTable, CssVarsTable } from '../components'
import type { PropDef, CssVarDef } from '../components'

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

const breadcrumbProps: PropDef[] = [
  { name: 'items', description: 'Ordered trail from root to current page', type: 'BreadcrumbItem[]' },
  { name: 'separator', description: 'Node rendered between segments', type: 'ReactNode', default: "'/'" },
  { name: 'className', description: 'Wrapper className', type: 'string' },
  { name: 'style', description: 'Wrapper inline style', type: 'CSSProperties' },
  { name: 'unstyled', description: 'Drop sg-breadcrumb-* classes (nav + a11y stay)', type: 'boolean', default: 'false' },
]

const breadcrumbItemProps: PropDef[] = [
  { name: 'title', description: 'Segment content — ReactNode', type: 'ReactNode' },
  { name: 'href', description: 'Renders the segment as an <a href>', type: 'string' },
  { name: 'onClick', description: 'Click handler; preempts navigation when href is also set', type: '() => void' },
]

const breadcrumbCssVars: CssVarDef[] = [
  { name: 'sg-color-text', default: 'rgba(0, 0, 0, 0.88)', description: 'Wrapper + current segment colour (bolded)' },
  { name: 'sg-color-text-secondary', default: 'rgba(0, 0, 0, 0.65)', description: 'Linked segment colour' },
  { name: 'sg-color-text-tertiary', default: 'rgba(0, 0, 0, 0.45)', description: 'Separator colour' },
  { name: 'sg-color-primary', default: '#1677ff', description: 'Link hover colour' },
  { name: 'sg-font-size', default: '14px', description: 'Segment font size' },
  { name: 'sg-line-height', default: '1.5714', description: 'Wrapper line-height' },
  { name: 'sg-padding-sm', default: '8px', description: 'Separator horizontal margin' },
  { name: 'sg-transition-duration', default: '180ms', description: 'Link hover transition' },
  { name: 'sg-transition-timing', default: 'cubic-bezier(0.645, 0.045, 0.355, 1)', description: 'Shared easing' },
]

export function BreadcrumbDemo() {
  return (
    <ComponentDoc
      title="Breadcrumb"
      description="Hierarchical location indicator. The last segment is non-interactive and marks the current page; everything before it is linked."
      whenToUse={[
        'Three or more levels of hierarchy where users need a way back to a parent.',
        'Long pages where the page title alone doesn\u2019t tell you where you are.',
        'Router-driven apps that need a lightweight navigation trail.',
      ]}
    >
      <DemoBox title="Basic" description="Trail with two links + a current page." code={BasicSource}>
        <BasicBreadcrumb />
      </DemoBox>

      <DemoBox
        title="Custom separator"
        description="Any ReactNode — character, chevron, dot."
        code={SeparatorSource}
      >
        <SeparatorBreadcrumb />
      </DemoBox>

      <DemoBox
        title="onClick handlers"
        description="Preempt navigation for SPA routers."
        code={OnClickSource}
      >
        <OnClickBreadcrumb />
      </DemoBox>

      <DemoBox
        title="With icons"
        description="Use ReactNode in title to add visual cues."
        code={WithIconsSource}
      >
        <WithIconsBreadcrumb />
      </DemoBox>

      <DemoBox
        title="With Dropdown"
        description="Embed a Dropdown inside a segment for sibling navigation."
        code={DropdownSource}
      >
        <DropdownBreadcrumb />
      </DemoBox>

      <DemoBox
        title="Tokens override"
        description="Scope the text palette + `--sg-color-primary` to rebrand."
        code={TokensOverrideSource}
      >
        <TokensOverrideBreadcrumb />
      </DemoBox>

      <DemoBox
        title="Unstyled"
        description="Drop the classes; the <nav> + a11y label stay."
        code={UnstyledSource}
      >
        <UnstyledBreadcrumb />
      </DemoBox>

      <PropsTable title="Breadcrumb API" data={breadcrumbProps} />
      <PropsTable title="BreadcrumbItem" data={breadcrumbItemProps} />
      <CssVarsTable
        title="CSS Variables"
        hint="Breadcrumb has no dedicated tokens — it only reuses the text palette and `--sg-color-primary` for link hover. Scope those on a wrapper for per-section theming; no class overrides needed."
        data={breadcrumbCssVars}
      />
    </ComponentDoc>
  )
}
