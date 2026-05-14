import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { SgButtonComponent, SgTimelineComponent, type SgTimelineItem } from '@skygraph/angular'
import {
  ComponentDocComponent,
  CssVarsTableComponent,
  type CssVarDef,
  DemoBoxComponent,
  PropsTableComponent,
  type PropDef,
} from '../../../shared/demo'

const RELEASE_ITEMS: SgTimelineItem[] = [
  { content: 'Ship 1.0 — initial public release' },
  { content: 'Fix critical auth bug in hotfix 1.0.1' },
  { content: 'Roll out 1.1 with Tree + TreeSelect', color: 'green' },
  { content: 'Incident: degraded pagination perf', color: 'red' },
]

const RELEASE_LABELS: SgTimelineItem[] = [
  { label: '2024-09-01', content: 'Ship 1.0' },
  { label: '2024-09-04', content: 'Hotfix 1.0.1' },
  { label: '2024-10-02', content: 'Release 1.1' },
  { label: '2024-10-03', content: 'Incident resolved' },
]

const BASIC_SOURCE = `<ul sg-timeline [items]="releaseItems"></ul>`

const PENDING_SOURCE = `<ul
  sg-timeline
  pending="Deploying to production..."
  pendingDot="⏳"
  [items]="[
    { content: 'Built release 1.2.0' },
    { content: 'Ran smoke tests', color: 'green' },
    { content: 'Queued deploy' },
  ]"
></ul>`

const REVERSE_SOURCE = `<button sg-button size="small" (click)="reverse.set(!reverse())">
  {{ reverse() ? 'Oldest first' : 'Newest first' }}
</button>
<ul sg-timeline [reverse]="reverse()" [items]="releaseItems"></ul>`

const ALTERNATE_SOURCE = `<ul sg-timeline mode="alternate" [items]="releaseLabels"></ul>`

const RIGHT_SOURCE = `<ul sg-timeline mode="right" [items]="releaseItems"></ul>`

const CUSTOM_DOT_SOURCE = `<ul
  sg-timeline
  [items]="[
    { content: 'Created account', dot: '🧑' },
    { content: 'Purchased plan', dot: '💳' },
    { content: 'Shipped project', dot: '🚀', color: 'green' },
    { content: 'Investigating outage', dot: '⚠️', color: '#dc2626' },
  ]"
></ul>`

const CUSTOM_COLOR_SOURCE = `<ul
  sg-timeline
  [items]="[
    { content: 'Primary (default ring)' },
    { content: 'Success ring', color: 'var(--sg-color-success)' },
    { content: 'Warning ring', color: '#d97706' },
    { content: 'Custom purple', color: '#7c3aed' },
  ]"
></ul>`

const TOKENS_SOURCE = `<style>
  .dark-scope {
    padding: 16px;
    border-radius: 12px;
    background: #0f172a;
    color: #e2e8f0;
    --sg-color-primary: #38bdf8;
    --sg-color-text: #e2e8f0;
    --sg-color-text-secondary: #94a3b8;
    --sg-color-text-tertiary: #64748b;
    --sg-color-border-secondary: #334155;
    --sg-color-bg: #0f172a;
  }
</style>
<div class="dark-scope">
  <ul sg-timeline [items]="releaseItems" pending="Awaiting approval…"></ul>
</div>`

const UNSTYLED_SOURCE = `<ul sg-timeline unstyled className="my-timeline" [items]="releaseItems"></ul>

.my-timeline {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.my-timeline li {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 12px;
  background: #f1f5f9;
  border-radius: 8px;
}`

const PROPS: PropDef[] = [
  { name: 'items', description: 'Array of timeline rows', type: 'SgTimelineItem[]' },
  {
    name: 'mode',
    description: 'Layout side — left, right, or alternating',
    type: "'left' | 'right' | 'alternate'",
    default: "'left'",
  },
  {
    name: 'reverse',
    description: 'Flip the visual order in place',
    type: 'boolean',
    default: 'false',
  },
  { name: 'pending', description: 'Optional muted tail row text', type: 'string' },
  { name: 'pendingDot', description: 'Custom dot for the pending row', type: 'string' },
  {
    name: 'unstyled',
    description: 'Drop every sg-timeline-* class — keep DOM only',
    type: 'boolean',
    default: 'false',
  },
  { name: 'className', description: 'Extra class on the root <ul>', type: 'string' },
]

const ITEM_PROPS: PropDef[] = [
  { name: 'content', description: 'Body text (plain string in current build)', type: 'string' },
  { name: 'label', description: 'Optional label rendered on the axis side', type: 'string' },
  { name: 'color', description: 'CSS colour applied to the default ring', type: 'string' },
  { name: 'dot', description: 'Custom dot (replaces the default ring)', type: 'string' },
  { name: 'position', description: 'Force item side; overrides mode', type: "'left' | 'right'" },
]

const CSS_VARS: CssVarDef[] = [
  { name: 'sg-color-primary', default: 'var(--sg-blue-6)', description: 'Default dot ring colour' },
  {
    name: 'sg-color-border-secondary',
    default: 'var(--sg-gray-4)',
    description: 'Connector line colour',
  },
  { name: 'sg-color-text', default: 'rgba(0,0,0,0.88)', description: 'Item body colour' },
  { name: 'sg-color-text-secondary', default: 'rgba(0,0,0,0.65)', description: 'Label colour' },
  {
    name: 'sg-color-text-tertiary',
    default: 'rgba(0,0,0,0.45)',
    description: 'Pending row colour',
  },
  { name: 'sg-color-bg', default: '#ffffff', description: 'Dot inner fill (in dark themes)' },
]

@Component({
  selector: 'sg-timeline-page',
  standalone: true,
  imports: [
    SgTimelineComponent,
    SgButtonComponent,
    ComponentDocComponent,
    DemoBoxComponent,
    PropsTableComponent,
    CssVarsTableComponent,
  ],
  template: `
    <sg-component-doc
      title="Timeline"
      [crumbs]="['Data Display', 'Timeline']"
      description="Vertical chronology with a dot per row, connector, optional label, pending tail, alternate layout, and reverse order."
      [whenToUse]="[
        'For release histories, change logs, project milestones.',
        'For activity feeds with an explicit chronology.',
        'For grouped narratives — use mode=alternate for chunkier reads. Horizontal / EventTimeline are deferred (F-EventTimeline).',
      ]"
    >
      <sg-demo-box
        title="Basic"
        description="Each item renders a dot + connector + body."
        [code]="basicSource"
      >
        <ul sg-timeline [items]="releaseItems"></ul>
      </sg-demo-box>

      <sg-demo-box
        title="Pending"
        description="pending appends a muted tail; pendingDot swaps the marker."
        [code]="pendingSource"
      >
        <ul
          sg-timeline
          pending="Deploying to production..."
          pendingDot="⏳"
          [items]="pendingItems"
        ></ul>
      </sg-demo-box>

      <sg-demo-box
        title="Reverse"
        description="Flip the visual order in-place — useful when the source data is chronological."
        [code]="reverseSource"
      >
        <button sg-button size="small" (click)="toggleReverse()">
          {{ reverse() ? 'Oldest first' : 'Newest first' }}
        </button>
        <div style="margin-top:16px">
          <ul sg-timeline [reverse]="reverse()" [items]="releaseItems"></ul>
        </div>
      </sg-demo-box>

      <sg-demo-box
        title="Alternate + labels"
        description="mode='alternate' splits items left/right of the axis. label renders on the axis side."
        [code]="alternateSource"
      >
        <ul sg-timeline mode="alternate" [items]="releaseLabels"></ul>
      </sg-demo-box>

      <sg-demo-box
        title="Right mode"
        description="mode='right' flips the axis to the opposite side."
        [code]="rightSource"
      >
        <ul sg-timeline mode="right" [items]="releaseItems"></ul>
      </sg-demo-box>

      <sg-demo-box
        title="Custom dot"
        description="dot replaces the ring with any glyph — emoji, icon, letter badge."
        [code]="customDotSource"
      >
        <ul sg-timeline [items]="customDotItems"></ul>
      </sg-demo-box>

      <sg-demo-box
        title="Custom colour"
        description="color tints the default ring (border + text). Any CSS colour works."
        [code]="customColorSource"
      >
        <ul sg-timeline [items]="customColorItems"></ul>
      </sg-demo-box>

      <sg-demo-box
        title="Token override"
        description="Re-skin the default ring + connector + pending colours via global tokens."
        [code]="tokensSource"
      >
        <div class="ng-tl-dark">
          <ul sg-timeline [items]="releaseItems" pending="Awaiting approval…"></ul>
        </div>
      </sg-demo-box>

      <sg-demo-box
        title="Unstyled"
        description="unstyled drops every sg-timeline-* class — bring your own layout."
        [code]="unstyledSource"
      >
        <ul sg-timeline unstyled className="ng-raw-timeline" [items]="releaseItems"></ul>
      </sg-demo-box>

      <sg-props-table title="Timeline API" [data]="props"></sg-props-table>
      <sg-props-table title="SgTimelineItem" [data]="itemProps"></sg-props-table>
      <sg-css-vars-table
        [data]="cssVars"
        hint="Timeline has no component-local tokens. Horizontal layout / EventTimeline are deferred (F-EventTimeline)."
      ></sg-css-vars-table>
    </sg-component-doc>
  `,
  styles: [
    `
      :host ::ng-deep .ng-tl-dark {
        padding: 16px;
        border-radius: 12px;
        background: #0f172a;
        color: #e2e8f0;
        --sg-color-primary: #38bdf8;
        --sg-color-text: #e2e8f0;
        --sg-color-text-secondary: #94a3b8;
        --sg-color-text-tertiary: #64748b;
        --sg-color-border-secondary: #334155;
        --sg-color-bg: #0f172a;
      }
      :host ::ng-deep .ng-raw-timeline {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      :host ::ng-deep .ng-raw-timeline li {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 8px 12px;
        background: #f1f5f9;
        border-radius: 8px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimelinePageComponent {
  protected readonly releaseItems = RELEASE_ITEMS
  protected readonly releaseLabels = RELEASE_LABELS
  protected readonly pendingItems: SgTimelineItem[] = [
    { content: 'Built release 1.2.0' },
    { content: 'Ran smoke tests', color: 'green' },
    { content: 'Queued deploy' },
  ]
  protected readonly customDotItems: SgTimelineItem[] = [
    { content: 'Created account', dot: '🧑' },
    { content: 'Purchased plan', dot: '💳' },
    { content: 'Shipped project', dot: '🚀', color: 'green' },
    { content: 'Investigating outage', dot: '⚠️', color: '#dc2626' },
  ]
  protected readonly customColorItems: SgTimelineItem[] = [
    { content: 'Primary (default ring)' },
    { content: 'Success ring', color: 'var(--sg-color-success)' },
    { content: 'Warning ring', color: '#d97706' },
    { content: 'Custom purple', color: '#7c3aed' },
  ]

  protected readonly reverse = signal(false)

  protected readonly basicSource = BASIC_SOURCE
  protected readonly pendingSource = PENDING_SOURCE
  protected readonly reverseSource = REVERSE_SOURCE
  protected readonly alternateSource = ALTERNATE_SOURCE
  protected readonly rightSource = RIGHT_SOURCE
  protected readonly customDotSource = CUSTOM_DOT_SOURCE
  protected readonly customColorSource = CUSTOM_COLOR_SOURCE
  protected readonly tokensSource = TOKENS_SOURCE
  protected readonly unstyledSource = UNSTYLED_SOURCE
  protected readonly props = PROPS
  protected readonly itemProps = ITEM_PROPS
  protected readonly cssVars = CSS_VARS

  protected toggleReverse(): void {
    this.reverse.update((v) => !v)
  }
}
