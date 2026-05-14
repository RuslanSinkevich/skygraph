import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { SgRateComponent } from '@skygraph/angular'
import {
  ComponentDocComponent,
  CssVarsTableComponent,
  type CssVarDef,
  DemoBoxComponent,
  PropsTableComponent,
  type PropDef,
} from '../../../shared/demo'

const BASIC_SOURCE = `<div sg-rate [value]="value()" (valueChange)="value.set($event)"></div>
<span>value: {{ value() }}</span>`

const ALLOW_HALF_SOURCE = `<div sg-rate [allowHalf]="true" [value]="half()" (valueChange)="half.set($event)"></div>
<span>value: {{ half() }}</span>`

const COUNT_SOURCE = `<div sg-rate [count]="3" [defaultValue]="2"></div>
<span>3 stars (bad / ok / great)</span>

<div sg-rate [count]="10" [defaultValue]="7"></div>
<span>10 stars (NPS-like)</span>`

const DISABLED_SOURCE = `<div sg-rate [disabled]="true" [defaultValue]="4"></div>
<div sg-rate [disabled]="true" [allowHalf]="true" [defaultValue]="3.5"></div>`

const CUSTOM_CHAR_SOURCE = `<div sg-rate character="♥" [defaultValue]="4"></div>
<div sg-rate character="🔥" [defaultValue]="3"></div>`

const TOKENS_SOURCE = `<style>
  .gold-scope { --sg-color-star: #fbbf24; }
  .rose-scope {
    --sg-color-star: #e11d48;
    --sg-color-border: #fecdd3;
    --sg-font-size-xl: 28px;
  }
</style>
<div class="gold-scope">
  <div sg-rate [defaultValue]="4"></div>
</div>
<div class="rose-scope">
  <div sg-rate [allowHalf]="true" [defaultValue]="3.5" character="♥"></div>
</div>`

const UNSTYLED_SOURCE = `<div sg-rate [unstyled]="true" [defaultValue]="3" class="ng-rate-bare"></div>`

const PROPS: PropDef[] = [
  { name: 'value', description: 'Controlled rating', type: 'number' },
  { name: 'defaultValue', description: 'Initial uncontrolled rating', type: 'number' },
  {
    name: '(valueChange)',
    description: 'Two-way binding — fires when the user clicks / arrow-keys',
    type: 'EventEmitter<number>',
  },
  { name: 'count', description: 'Number of symbols', type: 'number', default: '5' },
  {
    name: 'allowHalf',
    description: 'Pointer position on the symbol commits N or N − 0.5',
    type: 'boolean',
    default: 'false',
  },
  {
    name: 'character',
    description: 'Symbol rendered for every star — emoji / glyph / SVG',
    type: 'string',
    default: "'★'",
  },
  {
    name: 'disabled',
    description: 'Lock the rating; aria-disabled stays correct',
    type: 'boolean',
    default: 'false',
  },
  {
    name: 'unstyled',
    description: 'Drop sg-rate-* classes (keeps role="radiogroup")',
    type: 'boolean',
    default: 'false',
  },
  { name: 'className', description: 'Extra class on the root wrapper', type: 'string' },
]

const CSS_VARS: CssVarDef[] = [
  {
    name: 'sg-color-star',
    default: '#fadb14',
    description: 'Filled-star colour (component-local token)',
  },
  { name: 'sg-color-border', default: 'rgba(5, 5, 5, 0.06)', description: 'Empty-star colour' },
  { name: 'sg-font-size-xl', default: '20px', description: 'Symbol size' },
  { name: 'sg-padding-xs', default: '4px', description: 'Gap between stars' },
  { name: 'sg-transition-duration', default: '180ms', description: 'Hover transition' },
]

@Component({
  selector: 'sg-rate-page',
  standalone: true,
  imports: [
    SgRateComponent,
    ComponentDocComponent,
    DemoBoxComponent,
    PropsTableComponent,
    CssVarsTableComponent,
  ],
  template: `
    <sg-component-doc
      title="Rate"
      [crumbs]="['Data Entry', 'Rate']"
      description="Star rating with hover preview, half-step, custom characters and arrow-key support."
      [whenToUse]="[
        'For fixed-scale ratings — reviews, satisfaction, NPS-style.',
        'For undo: clicking the currently-selected star clears to 0.',
        'Use Slider for arbitrary numeric ranges.',
      ]"
    >
      <sg-demo-box
        title="Basic"
        description="Controlled star rating. Clicking the currently-selected star clears the value (toggle back to 0)."
        [code]="basicSource"
      >
        <div style="display:flex;gap:16px;align-items:center">
          <div sg-rate [value]="value()" (valueChange)="value.set($event)"></div>
          <span style="font-size:12px;color:var(--sg-color-text-secondary)">
            value: {{ value() }}
          </span>
        </div>
      </sg-demo-box>

      <sg-demo-box
        title="Allow half"
        description="Pointer position on the star commits N or N − 0.5."
        [code]="allowHalfSource"
      >
        <div style="display:flex;gap:16px;align-items:center">
          <div sg-rate [allowHalf]="true" [value]="half()" (valueChange)="half.set($event)"></div>
          <span style="font-size:12px;color:var(--sg-color-text-secondary)">
            value: {{ half() }}
          </span>
        </div>
      </sg-demo-box>

      <sg-demo-box
        title="Count"
        description="count picks the number of symbols — 3 for quick sentiment, 10 for NPS-ish."
        [code]="countSource"
      >
        <div style="display:grid;gap:16px">
          <div style="display:flex;gap:12px;align-items:center">
            <div sg-rate [count]="3" [defaultValue]="2"></div>
            <span style="font-size:12px;color:var(--sg-color-text-secondary)"
              >3 stars (bad / ok / great)</span
            >
          </div>
          <div style="display:flex;gap:12px;align-items:center">
            <div sg-rate [count]="10" [defaultValue]="7"></div>
            <span style="font-size:12px;color:var(--sg-color-text-secondary)"
              >10 stars (NPS-like)</span
            >
          </div>
        </div>
      </sg-demo-box>

      <sg-demo-box
        title="Disabled"
        description="disabled locks the rating; aria-disabled stays correct."
        [code]="disabledSource"
      >
        <div style="display:grid;gap:12px">
          <div sg-rate [disabled]="true" [defaultValue]="4"></div>
          <div sg-rate [disabled]="true" [allowHalf]="true" [defaultValue]="3.5"></div>
        </div>
      </sg-demo-box>

      <sg-demo-box
        title="Custom character"
        description="character accepts any unicode string — emoji, glyph or icon font."
        [code]="customCharSource"
      >
        <div style="display:grid;gap:16px">
          <div sg-rate character="♥" [defaultValue]="4"></div>
          <div sg-rate character="🔥" [defaultValue]="3"></div>
        </div>
      </sg-demo-box>

      <sg-demo-box
        title="Token override"
        description="Scope --sg-color-star to recolour the filled stars; --sg-color-border / --sg-font-size-xl tune the rest."
        [code]="tokensSource"
      >
        <div style="display:grid;gap:16px">
          <div class="ng-rate-gold">
            <div sg-rate [defaultValue]="4"></div>
          </div>
          <div class="ng-rate-rose">
            <div sg-rate [allowHalf]="true" [defaultValue]="3.5" character="♥"></div>
          </div>
        </div>
      </sg-demo-box>

      <sg-demo-box
        title="Unstyled"
        description="unstyled drops every SkyGraph class — ARIA semantics (role=radiogroup, role=radio) stay."
        [code]="unstyledSource"
      >
        <div sg-rate [unstyled]="true" [defaultValue]="3" class="ng-rate-bare"></div>
      </sg-demo-box>

      <sg-props-table title="Rate API" [data]="props"></sg-props-table>
      <sg-css-vars-table
        [data]="cssVars"
        hint="Rate owns one dedicated token: --sg-color-star. The empty colour comes from --sg-color-border."
      ></sg-css-vars-table>
    </sg-component-doc>
  `,
  styles: [
    `
      :host ::ng-deep .ng-rate-gold {
        --sg-color-star: #fbbf24;
      }
      :host ::ng-deep .ng-rate-rose {
        --sg-color-star: #e11d48;
        --sg-color-border: #fecdd3;
        --sg-font-size-xl: 28px;
      }
      :host ::ng-deep .ng-rate-bare {
        display: inline-flex;
        gap: 4px;
        font-size: 28px;
        color: #d1d5db;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RatePageComponent {
  protected readonly value = signal(3)
  protected readonly half = signal(2.5)

  protected readonly basicSource = BASIC_SOURCE
  protected readonly allowHalfSource = ALLOW_HALF_SOURCE
  protected readonly countSource = COUNT_SOURCE
  protected readonly disabledSource = DISABLED_SOURCE
  protected readonly customCharSource = CUSTOM_CHAR_SOURCE
  protected readonly tokensSource = TOKENS_SOURCE
  protected readonly unstyledSource = UNSTYLED_SOURCE
  protected readonly props = PROPS
  protected readonly cssVars = CSS_VARS
}
