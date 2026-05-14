import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core'
import { SgCheckboxComponent } from '@skygraph/angular'
import {
  ComponentDocComponent,
  CssVarsTableComponent,
  type CssVarDef,
  DemoBoxComponent,
  PropsTableComponent,
  type PropDef,
} from '../../../shared/demo'

const KEYS = ['apple', 'pear', 'orange', 'banana', 'mango'] as const
type FruitKey = (typeof KEYS)[number]

const BASIC_SOURCE = `<label sg-checkbox [(value)]="checked">I agree to the terms</label>
<span>state: {{ checked ? 'checked' : 'unchecked' }}</span>`

const STATES_SOURCE = `<label sg-checkbox>Unchecked</label>
<label sg-checkbox [defaultValue]="true">Checked</label>
<label sg-checkbox [indeterminate]="true">Indeterminate</label>
<label sg-checkbox [disabled]="true">Disabled</label>
<label sg-checkbox [disabled]="true" [defaultValue]="true">Disabled + checked</label>
<label sg-checkbox [loading]="true">Loading</label>`

const CHECK_ALL_SOURCE = `<label
  sg-checkbox
  [value]="allChecked()"
  [indeterminate]="indeterminate()"
  (valueChange)="setAll($event)"
>
  <strong>Check all ({{ checked().length }}/{{ keys.length }})</strong>
</label>
@for (key of keys; track key) {
  <label
    sg-checkbox
    [value]="checked().includes(key)"
    (valueChange)="toggle(key, $event)"
  >{{ key }}</label>
}`

const RICH_LABEL_SOURCE = `<label sg-checkbox [defaultValue]="true">
  <div>
    <div>Enable two-factor authentication</div>
    <div style="font-size:12px;color:var(--sg-color-text-tertiary)">
      Adds a second step after password — recommended for admins.
    </div>
  </div>
</label>
<label sg-checkbox>
  <span>
    I accept the
    <a href="#" (click)="$event.preventDefault()">Terms of Service</a>
    and
    <a href="#" (click)="$event.preventDefault()">Privacy Policy</a>
  </span>
</label>`

const TOKENS_SOURCE = `<style>
  .magenta-scope {
    --sg-color-primary: var(--sg-magenta-6);
    --sg-color-text: #6b0e4a;
    --sg-font-size: 13px;
  }
</style>
<div class="magenta-scope">
  <label sg-checkbox [defaultValue]="true">Magenta brand</label>
  <label sg-checkbox [indeterminate]="true">Indeterminate</label>
  <label sg-checkbox>Small + magenta</label>
</div>`

const UNSTYLED_SOURCE = `<label sg-checkbox [unstyled]="true" [defaultValue]="true">Unstyled checked</label>
<label sg-checkbox [unstyled]="true" [indeterminate]="true">Unstyled indeterminate</label>
<label sg-checkbox [unstyled]="true" [disabled]="true">Unstyled disabled</label>`

const PROPS: PropDef[] = [
  { name: 'value', description: 'Controlled checked state', type: 'boolean' },
  { name: 'defaultValue', description: 'Initial uncontrolled state', type: 'boolean' },
  {
    name: '(valueChange)',
    description: 'Two-way binding — fires when the user toggles',
    type: 'EventEmitter<boolean>',
  },
  {
    name: 'indeterminate',
    description: 'Native indeterminate flag on the input',
    type: 'boolean',
    default: 'false',
  },
  {
    name: 'disabled',
    description: 'Disable the input (inherits from ConfigProvider)',
    type: 'boolean',
    default: 'false',
  },
  {
    name: 'loading',
    description: 'Inline spinner — blocks toggles',
    type: 'boolean',
    default: 'false',
  },
  {
    name: 'unstyled',
    description: 'Drop sg-checkbox-* classes (keeps semantics)',
    type: 'boolean',
    default: 'false',
  },
  { name: 'className', description: 'Extra class on the root label', type: 'string' },
]

const CSS_VARS: CssVarDef[] = [
  {
    name: 'sg-color-primary',
    default: 'var(--sg-blue-6)',
    description: 'Pinned to the native accent-color',
  },
  { name: 'sg-color-text', default: 'rgba(0, 0, 0, 0.88)', description: 'Label text colour' },
  {
    name: 'sg-color-text-disabled',
    default: 'rgba(0, 0, 0, 0.25)',
    description: 'Disabled label colour',
  },
  { name: 'sg-font-size', default: '14px', description: 'Label font size' },
  { name: 'sg-padding-xs', default: '4px', description: 'Gap between input and label' },
]

@Component({
  selector: 'sg-checkbox-page',
  standalone: true,
  imports: [
    SgCheckboxComponent,
    ComponentDocComponent,
    DemoBoxComponent,
    PropsTableComponent,
    CssVarsTableComponent,
  ],
  template: `
    <sg-component-doc
      title="Checkbox"
      [crumbs]="['Data Entry', 'Checkbox']"
      description="Boolean choice with a label. Indeterminate, loading and disabled states, headless mode, and a single tweak point (--sg-color-primary) for the accent."
      [whenToUse]="[
        'For toggling individual flags — opt-ins, terms acceptance, filters.',
        'For multi-select where each row stands on its own (use a parent indeterminate for check-all).',
        'Use Switch for an inline on/off setting, Radio for mutually exclusive choices.',
      ]"
    >
      <sg-demo-box
        title="Basic"
        description="Controlled checkbox with label. The native accent-color matches --sg-color-primary."
        [code]="basicSource"
      >
        <div style="display:flex;gap:16px;align-items:center">
          <label sg-checkbox [(value)]="basicChecked">I agree to the terms</label>
          <span style="font-size:12px;color:var(--sg-color-text-secondary)">
            state: {{ basicChecked ? 'checked' : 'unchecked' }}
          </span>
        </div>
      </sg-demo-box>

      <sg-demo-box
        title="States"
        description="Every visual state in one place — useful for verifying theme overrides."
        [code]="statesSource"
      >
        <div style="display:grid;gap:8px">
          <label sg-checkbox>Unchecked</label>
          <label sg-checkbox [defaultValue]="true">Checked</label>
          <label sg-checkbox [indeterminate]="true">Indeterminate</label>
          <label sg-checkbox [disabled]="true">Disabled</label>
          <label sg-checkbox [disabled]="true" [defaultValue]="true">Disabled + checked</label>
          <label sg-checkbox [loading]="true">Loading</label>
        </div>
      </sg-demo-box>

      <sg-demo-box
        title="Check all"
        description="Classic check-all pattern — parent flips to indeterminate when only some children are selected."
        [code]="checkAllSource"
      >
        <div style="display:grid;gap:8px">
          <label
            sg-checkbox
            [value]="allChecked()"
            [indeterminate]="indeterminate()"
            (valueChange)="setAll($event)"
          >
            <strong>Check all ({{ checked().length }}/{{ keys.length }})</strong>
          </label>
          <div style="display:flex;flex-direction:column;gap:4px;padding-left:20px">
            @for (key of keys; track key) {
              <label
                sg-checkbox
                [value]="checked().includes(key)"
                (valueChange)="toggle(key, $event)"
                >{{ key }}</label
              >
            }
          </div>
        </div>
      </sg-demo-box>

      <sg-demo-box
        title="Rich label"
        description="children is a Node — embed descriptions, links or badges. Keep the touch target tight."
        [code]="richLabelSource"
      >
        <div style="display:grid;gap:12px">
          <label sg-checkbox [defaultValue]="true">
            <div>
              <div>Enable two-factor authentication</div>
              <div style="font-size:12px;color:var(--sg-color-text-tertiary)">
                Adds a second step after password — recommended for admins.
              </div>
            </div>
          </label>
          <label sg-checkbox>
            <span>
              I accept the
              <a href="#" (click)="$event.preventDefault()">Terms of Service</a>
              and
              <a href="#" (click)="$event.preventDefault()">Privacy Policy</a>
            </span>
          </label>
        </div>
      </sg-demo-box>

      <sg-demo-box
        title="Token override"
        description="Checkbox has no own tokens — scope global --sg-color-primary / --sg-color-text to re-skin a group."
        [code]="tokensSource"
      >
        <div class="ng-checkbox-magenta">
          <label sg-checkbox [defaultValue]="true">Magenta brand</label>
          <label sg-checkbox [indeterminate]="true">Indeterminate</label>
          <label sg-checkbox>Small + magenta</label>
        </div>
      </sg-demo-box>

      <sg-demo-box
        title="Unstyled"
        description="unstyled removes SkyGraph classes — you get the native checkbox + label wrapper."
        [code]="unstyledSource"
      >
        <div style="display:grid;gap:6px">
          <label sg-checkbox [unstyled]="true" [defaultValue]="true">Unstyled checked</label>
          <label sg-checkbox [unstyled]="true" [indeterminate]="true">Unstyled indeterminate</label>
          <label sg-checkbox [unstyled]="true" [disabled]="true">Unstyled disabled</label>
        </div>
      </sg-demo-box>

      <sg-props-table title="Checkbox API" [data]="props"></sg-props-table>
      <sg-css-vars-table
        [data]="cssVars"
        hint="Checkbox has no component-local tokens. The native accent-color is pinned to --sg-color-primary; label text inherits global text tokens."
      ></sg-css-vars-table>
    </sg-component-doc>
  `,
  styles: [
    `
      :host ::ng-deep .ng-checkbox-magenta {
        --sg-color-primary: var(--sg-magenta-6, #c41d7f);
        --sg-color-text: #6b0e4a;
        --sg-font-size: 13px;
        display: grid;
        gap: 6px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxPageComponent {
  protected readonly keys = KEYS
  protected basicChecked = false

  protected readonly checked = signal<FruitKey[]>(['apple'])
  protected readonly allChecked = computed(() => this.checked().length === KEYS.length)
  protected readonly indeterminate = computed(
    () => this.checked().length > 0 && this.checked().length < KEYS.length,
  )

  protected readonly basicSource = BASIC_SOURCE
  protected readonly statesSource = STATES_SOURCE
  protected readonly checkAllSource = CHECK_ALL_SOURCE
  protected readonly richLabelSource = RICH_LABEL_SOURCE
  protected readonly tokensSource = TOKENS_SOURCE
  protected readonly unstyledSource = UNSTYLED_SOURCE
  protected readonly props = PROPS
  protected readonly cssVars = CSS_VARS

  protected setAll(c: boolean): void {
    this.checked.set(c ? [...KEYS] : [])
  }

  protected toggle(key: FruitKey, c: boolean): void {
    this.checked.update((prev) => (c ? [...prev, key] : prev.filter((x) => x !== key)))
  }
}
