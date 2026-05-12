import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { SgButtonComponent } from '@skygraph/angular'
import {
  ComponentDocComponent,
  CssVarsTableComponent,
  type CssVarDef,
  DemoBoxComponent,
  PropsTableComponent,
  type PropDef,
} from '../../../shared/demo'

const TYPES_SOURCE = `<button sg-button>Default</button>
<button sg-button type="primary">Primary</button>
<button sg-button type="dashed">Dashed</button>
<button sg-button type="text">Text</button>
<button sg-button type="link">Link</button>`

const SIZES_SOURCE = `<button sg-button type="primary" size="small">Small</button>
<button sg-button type="primary">Middle (default)</button>
<button sg-button type="primary" size="large">Large</button>`

const LOADING_SOURCE = `<button sg-button type="primary" [loading]="true">Loading</button>
<button sg-button [loading]="true">Default loading</button>`

const DISABLED_SOURCE = `<button sg-button type="primary" [disabled]="true">Disabled</button>
<button sg-button [disabled]="true">Default disabled</button>
<button sg-button type="text" [disabled]="true">Text disabled</button>`

const DANGER_SOURCE = `<button sg-button type="default" [danger]="true">Delete</button>
<button sg-button type="primary" [danger]="true">Delete (primary)</button>
<button sg-button type="text" [danger]="true">Delete (text)</button>`

const BLOCK_SOURCE = `<button sg-button type="primary" [block]="true">Full-width primary</button>
<button sg-button [block]="true">Full-width default</button>`

const CLICK_SOURCE = `import { Component, signal } from '@angular/core'
import { SgButtonComponent } from '@skygraph/angular'

@Component({
  standalone: true,
  imports: [SgButtonComponent],
  template: \`
    <button sg-button (click)="inc()">Click me</button>
    <span>{{ clicks() }} click(s)</span>
  \`,
})
export class ClickHostComponent {
  readonly clicks = signal(0)
  inc() { this.clicks.update((n) => n + 1) }
}`

const BUTTON_PROPS: PropDef[] = [
  {
    name: 'type',
    description: 'Visual variant.',
    type: "'default' | 'primary' | 'dashed' | 'text' | 'link'",
    default: "'default'",
  },
  {
    name: 'size',
    description: 'Button size.',
    type: "'small' | 'middle' | 'large'",
    default: "'middle'",
  },
  { name: 'disabled', description: 'Disables the button.', type: 'boolean', default: 'false' },
  {
    name: 'loading',
    description: 'Shows a spin indicator and forces aria-busy/disabled.',
    type: 'boolean',
    default: 'false',
  },
  {
    name: 'danger',
    description: 'Switches to the danger color palette.',
    type: 'boolean',
    default: 'false',
  },
  {
    name: 'block',
    description: 'Stretches the button to fill the parent width.',
    type: 'boolean',
    default: 'false',
  },
  {
    name: 'htmlType',
    description: 'Underlying HTML `type` attribute (button only).',
    type: "'button' | 'submit' | 'reset'",
    default: "'button'",
  },
  {
    name: 'unstyled',
    description: 'Drops .sg-button-* classes — bring your own CSS.',
    type: 'boolean',
    default: 'false',
  },
  { name: '(click)', description: 'Click event.', type: 'EventEmitter<MouseEvent>' },
]

const BUTTON_CSS_VARS: CssVarDef[] = [
  {
    name: 'sg-btn-height',
    default: 'var(--sg-height-md)',
    description: 'Button height (matches size).',
  },
  { name: 'sg-btn-padding', default: '0 var(--sg-padding-md)', description: 'Horizontal padding.' },
  { name: 'sg-btn-radius', default: 'var(--sg-border-radius)', description: 'Border radius.' },
  { name: 'sg-btn-font-size', default: 'var(--sg-font-size)', description: 'Font size.' },
  { name: 'sg-btn-bg', default: 'transparent', description: 'Default background.' },
  { name: 'sg-btn-color', default: 'var(--sg-color-text)', description: 'Default text color.' },
  {
    name: 'sg-btn-border',
    default: 'var(--sg-color-border)',
    description: 'Default border color.',
  },
  { name: 'sg-color-primary', default: '#1677ff', description: 'Primary palette base.' },
  { name: 'sg-color-primary-hover', default: '#4096ff', description: 'Primary hover color.' },
  { name: 'sg-color-primary-active', default: '#0958d9', description: 'Primary pressed color.' },
]

@Component({
  selector: 'sg-button-page',
  standalone: true,
  imports: [
    SgButtonComponent,
    ComponentDocComponent,
    DemoBoxComponent,
    PropsTableComponent,
    CssVarsTableComponent,
  ],
  template: `
    <sg-component-doc
      title="Button"
      description="Trigger an action — submit a form, open a dialog, navigate. Visual style is controlled by 'type'; size, danger, block, loading and disabled states are independent inputs."
      [crumbs]="['General', 'Button']"
      [whenToUse]="[
        'For primary actions — Submit, Save, Continue.',
        'For destructive actions — pair with the danger palette.',
        'For navigation — prefer type=\\'link\\' over a styled <a>.',
      ]"
    >
      <sg-demo-box
        title="Types"
        description="Five visual variants. The default is unstyled-looking — use type=primary for the page's primary action."
        [code]="typesSource"
      >
        <button sg-button>Default</button>
        <button sg-button type="primary">Primary</button>
        <button sg-button type="dashed">Dashed</button>
        <button sg-button type="text">Text</button>
        <button sg-button type="link">Link</button>
      </sg-demo-box>

      <sg-demo-box
        title="Sizes"
        description="Three sizes. 'middle' is the default; size cascades from provideSgConfig() / SgConfigProvider when not set."
        [code]="sizesSource"
      >
        <button sg-button type="primary" size="small">Small</button>
        <button sg-button type="primary">Middle (default)</button>
        <button sg-button type="primary" size="large">Large</button>
      </sg-demo-box>

      <sg-demo-box
        title="Loading"
        description="Inserts an inline sg-spin and sets aria-busy/disabled so the button cannot be re-clicked."
        [code]="loadingSource"
      >
        <button sg-button type="primary" [loading]="true">Loading</button>
        <button sg-button [loading]="true">Default loading</button>
      </sg-demo-box>

      <sg-demo-box
        title="Disabled"
        description="Sets aria-disabled and prevents clicks. Style mirrors the React adapter."
        [code]="disabledSource"
      >
        <button sg-button type="primary" [disabled]="true">Disabled</button>
        <button sg-button [disabled]="true">Default disabled</button>
        <button sg-button type="text" [disabled]="true">Text disabled</button>
      </sg-demo-box>

      <sg-demo-box
        title="Danger"
        description="Switches the button to the destructive palette. Combine with type for variants."
        [code]="dangerSource"
      >
        <button sg-button type="default" [danger]="true">Delete</button>
        <button sg-button type="primary" [danger]="true">Delete (primary)</button>
        <button sg-button type="text" [danger]="true">Delete (text)</button>
      </sg-demo-box>

      <sg-demo-box
        title="Block"
        description="Full-width button — useful in mobile forms and CTA blocks."
        [code]="blockSource"
      >
        <button sg-button type="primary" [block]="true">Full-width primary</button>
        <button sg-button [block]="true">Full-width default</button>
      </sg-demo-box>

      <sg-demo-box
        title="Click event"
        description="Standard Angular (click) emitter. Combine with signals for reactive counters."
        [code]="clickSource"
      >
        <button sg-button (click)="inc()">Click me</button>
        <span style="margin-left:10px;font-size:13px;color:var(--sg-color-text-secondary)">
          {{ clicks() }} click{{ clicks() === 1 ? '' : 's' }}
        </span>
      </sg-demo-box>

      <sg-props-table [data]="buttonProps"></sg-props-table>
      <sg-css-vars-table
        [data]="buttonCssVars"
        hint="Override these tokens per scope to retheme buttons without forking the component."
      ></sg-css-vars-table>
    </sg-component-doc>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonPageComponent {
  readonly clicks = signal(0)

  protected readonly typesSource = TYPES_SOURCE
  protected readonly sizesSource = SIZES_SOURCE
  protected readonly loadingSource = LOADING_SOURCE
  protected readonly disabledSource = DISABLED_SOURCE
  protected readonly dangerSource = DANGER_SOURCE
  protected readonly blockSource = BLOCK_SOURCE
  protected readonly clickSource = CLICK_SOURCE
  protected readonly buttonProps = BUTTON_PROPS
  protected readonly buttonCssVars = BUTTON_CSS_VARS

  inc(): void {
    this.clicks.update((n) => n + 1)
  }
}
