import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { SgBadgeComponent, SgButtonComponent } from '@skygraph/angular'
import {
  ComponentDocComponent,
  CssVarsTableComponent,
  type CssVarDef,
  DemoBoxComponent,
  PropsTableComponent,
  type PropDef,
} from '../../../shared/demo'

const BASIC_SOURCE = `<span sg-badge [count]="count()">
  <span class="demo-box"></span>
</span>
<span sg-badge [count]="0" showZero>
  <span class="demo-box"></span>
</span>

<button sg-button size="small" (click)="dec()">−</button>
<button sg-button size="small" (click)="inc()">+</button>`

const STATUS_SOURCE = `<span sg-badge status="success" text="Success" noChildren></span>
<span sg-badge status="error" text="Error" noChildren></span>
<span sg-badge status="warning" text="Warning" noChildren></span>
<span sg-badge status="processing" text="Processing" noChildren></span>
<span sg-badge status="default" text="Default" noChildren></span>`

const OVERFLOW_SOURCE = `<span sg-badge [count]="99"><span class="demo-box"></span></span>
<span sg-badge [count]="100"><span class="demo-box"></span></span>
<span sg-badge [count]="1000" [overflowCount]="999"><span class="demo-box"></span></span>`

const DOT_SOURCE = `<span sg-badge dot><span class="demo-box"></span></span>
<span sg-badge dot color="var(--sg-color-success)"><span class="demo-box"></span></span>
<span sg-badge dot color="var(--sg-color-warning)"><span class="demo-box"></span></span>`

const CUSTOM_COLOR_SOURCE = `<span sg-badge color="#722ed1" [count]="5"><span class="demo-box"></span></span>
<span sg-badge color="#eb2f96" [count]="12"><span class="demo-box"></span></span>
<span sg-badge color="#16a34a" dot><span class="demo-box"></span></span>
<span sg-badge color="var(--sg-color-primary)" [count]="3"><span class="demo-box"></span></span>`

const OFFSET_SOURCE = `<span sg-badge [count]="5" [offset]="[-6, 6]">
  <span class="demo-box demo-circle"></span>
</span>
<span sg-badge [count]="5" [offset]="[8, -4]">
  <span class="demo-box"></span>
</span>
<span sg-badge dot [offset]="[-2, 2]">
  <span class="demo-box demo-circle"></span>
</span>`

const TOKENS_SOURCE = `<style>
  .badge-scope {
    --sg-color-error: #7c3aed;
    --sg-color-primary: #f97316;
    --sg-color-bg: #fef3c7;
    padding: 16px;
    background: #fef3c7;
  }
</style>
<div class="badge-scope" style="display:flex;gap:24px">
  <span sg-badge [count]="5"><span class="demo-box"></span></span>
  <span sg-badge dot><span class="demo-box"></span></span>
  <span sg-badge status="processing" text="Connecting…" noChildren></span>
</div>`

const UNSTYLED_SOURCE = `<span sg-badge unstyled [count]="7">
  <span class="my-box"></span>
</span>`

const PROPS: PropDef[] = [
  { name: 'count', description: 'Numeric value shown on the badge', type: 'number' },
  {
    name: 'overflowCount',
    description: 'Maximum count before showing {n}+',
    type: 'number',
    default: '99',
  },
  {
    name: 'showZero',
    description: 'Render badge even when count is 0',
    type: 'boolean',
    default: 'false',
  },
  {
    name: 'dot',
    description: 'Render a small dot instead of a number',
    type: 'boolean',
    default: 'false',
  },
  {
    name: 'status',
    description: 'Preset status colour — pairs with text',
    type: "'success' | 'error' | 'warning' | 'processing' | 'default'",
  },
  { name: 'text', description: 'Label rendered next to a status dot', type: 'string' },
  {
    name: 'color',
    description: 'Custom CSS colour for the dot / count background',
    type: 'string',
  },
  {
    name: 'offset',
    description: 'Pixel offset [right, top] applied to the floating count / dot',
    type: '[number, number]',
  },
  {
    name: 'noChildren',
    description:
      'Mark the badge as standalone (no projected child). Required for status-only badges.',
    type: 'boolean',
    default: 'false',
  },
  {
    name: 'unstyled',
    description: 'Strip every sg-badge-* class — keep only DOM structure',
    type: 'boolean',
    default: 'false',
  },
]

const CSS_VARS: CssVarDef[] = [
  {
    name: 'sg-color-error',
    default: 'var(--sg-red-5)',
    description: 'Default count + dot background',
  },
  {
    name: 'sg-color-bg',
    default: '#ffffff',
    description: 'Tiny outline around the floating count / dot',
  },
  { name: 'sg-color-success', default: 'var(--sg-green-6)', description: 'status="success"' },
  { name: 'sg-color-warning', default: 'var(--sg-gold-6)', description: 'status="warning"' },
  { name: 'sg-color-primary', default: 'var(--sg-blue-6)', description: 'status="processing"' },
  {
    name: 'sg-color-text-secondary',
    default: 'rgba(0,0,0,0.65)',
    description: 'status="default" dot + status text',
  },
  { name: 'sg-border-radius-sm', default: '4px', description: 'Count chip radius' },
]

@Component({
  selector: 'sg-badge-page',
  standalone: true,
  imports: [
    SgBadgeComponent,
    SgButtonComponent,
    ComponentDocComponent,
    DemoBoxComponent,
    PropsTableComponent,
    CssVarsTableComponent,
  ],
  template: `
    <sg-component-doc
      title="Badge"
      [crumbs]="['Data Display', 'Badge']"
      description="Pin a count or dot to the top-right of an element, or render a standalone status row. Counts above overflowCount collapse to {n}+."
      [whenToUse]="[
        'For unread / pending counters on icons, avatars, menu items.',
        'For status rows in lists — connection state, build status, attention markers.',
        'For visual hints of activity (use dot when the exact number does not matter).',
      ]"
    >
      <sg-demo-box
        title="Basic"
        description="Wraps a child and pins a count to its top-right. count=0 stays hidden unless showZero is set."
        [code]="basicSource"
      >
        <div style="display:flex;gap:24px">
          <span sg-badge [count]="count()">
            <span class="demo-tile"></span>
          </span>
          <span sg-badge [count]="0" showZero>
            <span class="demo-tile"></span>
          </span>
        </div>
        <div style="margin-top:12px;display:flex;gap:8px">
          <button sg-button size="small" (click)="dec()">−</button>
          <button sg-button size="small" (click)="inc()">+</button>
        </div>
      </sg-demo-box>

      <sg-demo-box
        title="Status"
        description="Status-only badges render a coloured dot + label row. processing pulses."
        [code]="statusSource"
      >
        <div style="display:flex;flex-direction:column;gap:8px">
          <span sg-badge status="success" text="Success" noChildren></span>
          <span sg-badge status="error" text="Error" noChildren></span>
          <span sg-badge status="warning" text="Warning" noChildren></span>
          <span sg-badge status="processing" text="Processing" noChildren></span>
          <span sg-badge status="default" text="Default" noChildren></span>
        </div>
      </sg-demo-box>

      <sg-demo-box
        title="Overflow"
        description="Numbers above overflowCount collapse to {n}+."
        [code]="overflowSource"
      >
        <div style="display:flex;gap:24px">
          <span sg-badge [count]="99"><span class="demo-tile"></span></span>
          <span sg-badge [count]="100"><span class="demo-tile"></span></span>
          <span sg-badge [count]="1000" [overflowCount]="999"><span class="demo-tile"></span></span>
        </div>
      </sg-demo-box>

      <sg-demo-box
        title="Dot"
        description="dot drops the pill and renders a small 8x8 indicator — for unread signals."
        [code]="dotSource"
      >
        <div style="display:flex;gap:24px">
          <span sg-badge dot><span class="demo-tile"></span></span>
          <span sg-badge dot color="var(--sg-color-success)"><span class="demo-tile"></span></span>
          <span sg-badge dot color="var(--sg-color-warning)"><span class="demo-tile"></span></span>
        </div>
      </sg-demo-box>

      <sg-demo-box
        title="Custom colour"
        description="Pass any CSS colour or token reference to color."
        [code]="customColorSource"
      >
        <div style="display:flex;gap:24px">
          <span sg-badge color="#722ed1" [count]="5"><span class="demo-tile"></span></span>
          <span sg-badge color="#eb2f96" [count]="12"><span class="demo-tile"></span></span>
          <span sg-badge color="#16a34a" dot><span class="demo-tile"></span></span>
          <span sg-badge color="var(--sg-color-primary)" [count]="3"
            ><span class="demo-tile"></span
          ></span>
        </div>
      </sg-demo-box>

      <sg-demo-box
        title="Offset"
        description="offset shifts the count / dot by [right, top] pixels — useful over circular avatars."
        [code]="offsetSource"
      >
        <div style="display:flex;gap:24px">
          <span sg-badge [count]="5" [offset]="[-6, 6]">
            <span class="demo-tile demo-circle"></span>
          </span>
          <span sg-badge [count]="5" [offset]="[8, -4]">
            <span class="demo-tile"></span>
          </span>
          <span sg-badge dot [offset]="[-2, 2]">
            <span class="demo-tile demo-circle"></span>
          </span>
        </div>
      </sg-demo-box>

      <sg-demo-box
        title="Token override"
        description="Badge has no component tokens — re-skin via --sg-color-error / --sg-color-primary / --sg-color-bg."
        [code]="tokensSource"
      >
        <div class="ng-badge-scope">
          <span sg-badge [count]="5"><span class="demo-tile"></span></span>
          <span sg-badge dot><span class="demo-tile"></span></span>
          <span sg-badge status="processing" text="Connecting…" noChildren></span>
        </div>
      </sg-demo-box>

      <sg-demo-box
        title="Unstyled"
        description="unstyled drops every sg-badge-* class and just renders <span><sup/></span>."
        [code]="unstyledSource"
      >
        <div class="ng-badge-headless">
          <span sg-badge unstyled [count]="7">
            <span class="ng-badge-headless-box"></span>
          </span>
        </div>
      </sg-demo-box>

      <sg-props-table title="Badge API" [data]="props"></sg-props-table>
      <sg-css-vars-table
        [data]="cssVars"
        hint="Badge has no component-local tokens. Counts borrow --sg-color-error; status rows use their respective semantic tokens."
      ></sg-css-vars-table>
    </sg-component-doc>
  `,
  styles: [
    `
      .demo-tile {
        display: inline-block;
        width: 42px;
        height: 42px;
        border-radius: 6px;
        background: var(--sg-color-bg-container);
        border: 1px solid var(--sg-color-border);
        box-shadow: inset 0 0 0 1px color-mix(in srgb, white 55%, transparent);
      }
      .demo-circle {
        border-radius: 50% !important;
      }
      :host ::ng-deep .ng-badge-scope {
        --sg-color-error: #7c3aed;
        --sg-color-primary: #f97316;
        --sg-color-bg: #fef3c7;
        padding: 16px;
        background: #fef3c7;
        display: flex;
        gap: 24px;
      }
      .ng-badge-headless {
        padding: 16px;
        background: #0f172a;
        color: #e2e8f0;
        border-radius: 8px;
        display: inline-block;
      }
      .ng-badge-headless-box {
        display: inline-block;
        width: 42px;
        height: 42px;
        border-radius: 6px;
        background: #1e293b;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BadgePageComponent {
  protected readonly count = signal(5)

  protected readonly basicSource = BASIC_SOURCE
  protected readonly statusSource = STATUS_SOURCE
  protected readonly overflowSource = OVERFLOW_SOURCE
  protected readonly dotSource = DOT_SOURCE
  protected readonly customColorSource = CUSTOM_COLOR_SOURCE
  protected readonly offsetSource = OFFSET_SOURCE
  protected readonly tokensSource = TOKENS_SOURCE
  protected readonly unstyledSource = UNSTYLED_SOURCE
  protected readonly props = PROPS
  protected readonly cssVars = CSS_VARS

  protected inc(): void {
    this.count.update((c) => c + 1)
  }
  protected dec(): void {
    this.count.update((c) => Math.max(0, c - 1))
  }
}
