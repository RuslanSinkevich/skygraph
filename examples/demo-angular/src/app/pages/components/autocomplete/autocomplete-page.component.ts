import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core'
import { SgAutoCompleteComponent, type SgAutoCompleteOption } from '@skygraph/angular'
import {
  ComponentDocComponent,
  CssVarsTableComponent,
  type CssVarDef,
  DemoBoxComponent,
  PropsTableComponent,
  type PropDef,
} from '../../../shared/demo'

const FRAMEWORK_OPTIONS: SgAutoCompleteOption[] = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'solid', label: 'Solid' },
  { value: 'angular', label: 'Angular' },
  { value: 'preact', label: 'Preact' },
  { value: 'lit', label: 'Lit' },
  { value: 'qwik', label: 'Qwik' },
]

const EMAIL_DOMAINS = [
  'gmail.com',
  'outlook.com',
  'icloud.com',
  'yahoo.com',
  'proton.me',
  'hey.com',
  'fastmail.com',
]

const CITY_DATABASE = [
  'Amsterdam',
  'Berlin',
  'Copenhagen',
  'Dublin',
  'Edinburgh',
  'Florence',
  'Geneva',
  'Helsinki',
  'Istanbul',
  'Jerusalem',
  'Kyoto',
  'Lisbon',
  'Madrid',
  'Nairobi',
  'Oslo',
  'Paris',
  'Quebec',
  'Riga',
  'Stockholm',
  'Tokyo',
  'Uppsala',
  'Vienna',
  'Warsaw',
  'Yokohama',
  'Zurich',
]

const BASIC_SOURCE = `<div
  sg-autocomplete
  [options]="frameworkOptions"
  [value]="value()"
  (valueChange)="value.set($event)"
  placeholder="Type to filter…"
></div>
<span>{{ value() ? 'Current: "' + value() + '"' : 'Start typing to see suggestions.' }}</span>`

const EMAIL_SOURCE = `<div
  sg-autocomplete
  [value]="email()"
  (valueChange)="email.set($event)"
  [options]="emailOptions()"
  placeholder="name@…"
></div>`

const ASYNC_SOURCE = `<div
  sg-autocomplete
  [value]="cityValue()"
  (valueChange)="setCity($event)"
  [options]="cityOptions()"
  [loading]="cityLoading()"
  placeholder="Search cities…"
></div>`

const SIZES_SOURCE = `<div sg-autocomplete size="small" [options]="frameworkOptions" placeholder="small"></div>
<div sg-autocomplete [options]="frameworkOptions" placeholder="middle (default)"></div>
<div sg-autocomplete size="large" [options]="frameworkOptions" placeholder="large"></div>`

const STATES_SOURCE = `<div sg-autocomplete [disabled]="true" [options]="frameworkOptions" placeholder="Disabled"></div>
<div sg-autocomplete [loading]="true" [options]="frameworkOptions" placeholder="Loading…"></div>`

const TOKENS_SOURCE = `<style>
  .amber-scope {
    --sg-input-border: #f59e0b;
    --sg-input-radius: 12px;
    --sg-color-bg-elevated: #fff7ed;
    --sg-color-bg-hover: #fed7aa;
    --sg-color-text: #7c2d12;
    max-width: 320px;
  }
</style>
<div class="amber-scope">
  <div sg-autocomplete [options]="frameworkOptions" placeholder="Scoped amber theme"></div>
</div>`

const UNSTYLED_SOURCE = `<div
  sg-autocomplete
  [unstyled]="true"
  [options]="frameworkOptions"
  placeholder="Headless combobox"
  className="demo-unstyled-input"
></div>`

const PROPS: PropDef[] = [
  { name: 'value', description: 'Controlled input text', type: 'string' },
  { name: 'defaultValue', description: 'Initial uncontrolled value', type: 'string' },
  {
    name: 'options',
    description: 'Suggestion list — filtered case-insensitive by label',
    type: 'AutoCompleteOption[]',
  },
  { name: 'placeholder', description: 'Placeholder text', type: 'string' },
  {
    name: '(valueChange)',
    description: 'Two-way binding — fires on every keystroke and on option pick',
    type: 'EventEmitter<string>',
  },
  {
    name: '(searchChange)',
    description: 'Fires on every keystroke — wire to server-side search',
    type: 'EventEmitter<string>',
  },
  {
    name: '(optionSelect)',
    description: 'Fires when the user picks a suggestion',
    type: 'EventEmitter<AutoCompleteOption>',
  },
  { name: '(blurEvent)', description: 'Blur event', type: 'EventEmitter<void>' },
  {
    name: 'size',
    description: 'Component size (inherits from ConfigProvider)',
    type: "'small' | 'middle' | 'large'",
    default: "'middle'",
  },
  {
    name: 'disabled',
    description: 'Lock the input',
    type: 'boolean',
    default: 'false',
  },
  {
    name: 'loading',
    description: 'Inline spinner — block edits while fetching',
    type: 'boolean',
    default: 'false',
  },
  { name: 'className', description: 'Extra class on the root wrapper', type: 'string' },
  {
    name: 'unstyled',
    description: 'Drop all SkyGraph styling — keeps role="combobox" semantics',
    type: 'boolean',
    default: 'false',
  },
]

const OPTION_PROPS: PropDef[] = [
  { name: 'value', description: 'Text written into the input when picked', type: 'string' },
  { name: 'label', description: 'Display text for the dropdown row', type: 'string' },
]

const CSS_VARS: CssVarDef[] = [
  {
    name: 'sg-input-*',
    default: '—',
    description: 'Inherits the whole --sg-input-* scope from Input',
  },
  { name: 'sg-color-bg-elevated', default: '#ffffff', description: 'Dropdown background' },
  {
    name: 'sg-color-bg-hover',
    default: 'rgba(0, 0, 0, 0.04)',
    description: 'Row hover background',
  },
  { name: 'sg-color-text', default: 'rgba(0, 0, 0, 0.88)', description: 'Row text colour' },
  {
    name: 'sg-color-text-tertiary',
    default: 'rgba(0, 0, 0, 0.45)',
    description: 'Empty-state / secondary text',
  },
  { name: 'sg-border-radius', default: '6px', description: 'Dropdown corner radius' },
  {
    name: 'sg-shadow-lg',
    default: '0 10px 30px rgba(0, 0, 0, 0.12)',
    description: 'Dropdown shadow',
  },
  { name: 'sg-padding-xs', default: '8px', description: 'Vertical padding of dropdown rows' },
  { name: 'sg-padding-md', default: '16px', description: 'Horizontal padding of dropdown rows' },
  { name: 'sg-transition-duration', default: '180ms', description: 'Hover / focus transition' },
]

@Component({
  selector: 'sg-autocomplete-page',
  standalone: true,
  imports: [
    SgAutoCompleteComponent,
    ComponentDocComponent,
    DemoBoxComponent,
    PropsTableComponent,
    CssVarsTableComponent,
  ],
  template: `
    <sg-component-doc
      title="AutoComplete"
      [crumbs]="['Data Entry', 'AutoComplete']"
      description="Text input backed by a suggestion list. The typed value is the source of truth; picking a row writes its value into the field. Filtering is case-insensitive by label."
      [whenToUse]="[
        'For free-text fields where suggestions accelerate input — cities, frameworks, hashtags.',
        'For async server-side search via (searchChange) — debounce externally.',
        'Use Select if the value must come from a fixed list, Mentions for @-aware inserts.',
      ]"
    >
      <sg-demo-box
        title="Basic"
        description="Type to filter the option list. Selecting a row writes its value into the input."
        [code]="basicSource"
      >
        <div style="display:grid;gap:8px;max-width:320px">
          <div
            sg-autocomplete
            [options]="frameworkOptions"
            [value]="value()"
            (valueChange)="value.set($event)"
            placeholder="Type to filter…"
          ></div>
          <span style="font-size:12px;color:var(--sg-color-text-secondary)">
            {{ value() ? 'Current: "' + value() + '"' : 'Start typing to see suggestions.' }}
          </span>
        </div>
      </sg-demo-box>

      <sg-demo-box
        title="Email domains"
        description="Derive the suggestion list from the current input — the prefix is replayed against each known domain."
        [code]="emailSource"
      >
        <div style="max-width:320px">
          <div
            sg-autocomplete
            [value]="email()"
            (valueChange)="email.set($event)"
            [options]="emailOptions()"
            placeholder="name@…"
          ></div>
        </div>
      </sg-demo-box>

      <sg-demo-box
        title="Async search"
        description="Fire server-side search via (searchChange); show loading until the response arrives."
        [code]="asyncSource"
      >
        <div style="max-width:320px">
          <div
            sg-autocomplete
            [value]="cityValue()"
            (valueChange)="setCity($event)"
            [options]="cityOptions()"
            [loading]="cityLoading()"
            placeholder="Search cities…"
          ></div>
        </div>
      </sg-demo-box>

      <sg-demo-box
        title="Sizes"
        description="Three sizes mirror Input / Select — line them up and the heights align."
        [code]="sizesSource"
      >
        <div style="display:grid;gap:8px;max-width:320px">
          <div sg-autocomplete size="small" [options]="frameworkOptions" placeholder="small"></div>
          <div sg-autocomplete [options]="frameworkOptions" placeholder="middle (default)"></div>
          <div sg-autocomplete size="large" [options]="frameworkOptions" placeholder="large"></div>
        </div>
      </sg-demo-box>

      <sg-demo-box
        title="States"
        description="Disabled locks the input; loading keeps it visible but blocks edits and shows the spinner."
        [code]="statesSource"
      >
        <div style="display:grid;gap:8px;max-width:320px">
          <div
            sg-autocomplete
            [disabled]="true"
            [options]="frameworkOptions"
            placeholder="Disabled"
          ></div>
          <div
            sg-autocomplete
            [loading]="true"
            [options]="frameworkOptions"
            placeholder="Loading…"
          ></div>
        </div>
      </sg-demo-box>

      <sg-demo-box
        title="Token override"
        description="Scope --sg-input-* + --sg-color-bg-* to rebrand a single group."
        [code]="tokensSource"
      >
        <div class="amber-scope">
          <div sg-autocomplete [options]="frameworkOptions" placeholder="Scoped amber theme"></div>
        </div>
      </sg-demo-box>

      <sg-demo-box
        title="Unstyled"
        description="unstyled drops every SkyGraph class on both input and dropdown — semantics stay."
        [code]="unstyledSource"
      >
        <div
          sg-autocomplete
          [unstyled]="true"
          [options]="frameworkOptions"
          placeholder="Headless combobox"
          className="ng-autocomplete-unstyled"
        ></div>
      </sg-demo-box>

      <sg-props-table title="AutoComplete API" [data]="props"></sg-props-table>
      <sg-props-table title="AutoCompleteOption" [data]="optionProps"></sg-props-table>
      <sg-css-vars-table
        [data]="cssVars"
        hint="AutoComplete reuses the --sg-input-* scope for the field and global --sg-color-bg-elevated / --sg-shadow-lg for the dropdown."
      ></sg-css-vars-table>
    </sg-component-doc>
  `,
  styles: [
    `
      :host ::ng-deep .amber-scope {
        --sg-input-border: #f59e0b;
        --sg-input-radius: 12px;
        --sg-color-bg-elevated: #fff7ed;
        --sg-color-bg-hover: #fed7aa;
        --sg-color-text: #7c2d12;
        max-width: 320px;
      }
      :host ::ng-deep .ng-autocomplete-unstyled {
        width: 100%;
        max-width: 320px;
        border: 2px solid #94a3b8;
        border-radius: 6px;
        padding: 10px 14px;
        font-size: 14px;
        background: white;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutoCompletePageComponent {
  protected readonly frameworkOptions = FRAMEWORK_OPTIONS

  protected readonly value = signal('')
  protected readonly email = signal('')
  protected readonly emailOptions = computed<SgAutoCompleteOption[]>(() => {
    const v = this.email()
    const at = v.indexOf('@')
    const prefix = at === -1 ? v : v.slice(0, at)
    if (!prefix) return []
    return EMAIL_DOMAINS.map((d) => ({ value: `${prefix}@${d}`, label: `${prefix}@${d}` }))
  })

  protected readonly cityValue = signal('')
  protected readonly cityOptions = signal<SgAutoCompleteOption[]>([])
  protected readonly cityLoading = signal(false)
  private cityTimer: number | null = null

  protected readonly basicSource = BASIC_SOURCE
  protected readonly emailSource = EMAIL_SOURCE
  protected readonly asyncSource = ASYNC_SOURCE
  protected readonly sizesSource = SIZES_SOURCE
  protected readonly statesSource = STATES_SOURCE
  protected readonly tokensSource = TOKENS_SOURCE
  protected readonly unstyledSource = UNSTYLED_SOURCE
  protected readonly props = PROPS
  protected readonly optionProps = OPTION_PROPS
  protected readonly cssVars = CSS_VARS

  protected setCity(q: string): void {
    this.cityValue.set(q)
    if (this.cityTimer !== null) window.clearTimeout(this.cityTimer)
    if (!q) {
      this.cityOptions.set([])
      this.cityLoading.set(false)
      return
    }
    this.cityLoading.set(true)
    this.cityTimer = window.setTimeout(() => {
      const next = CITY_DATABASE.filter((c) => c.toLowerCase().includes(q.toLowerCase()))
        .slice(0, 6)
        .map((c) => ({ value: c, label: c }))
      this.cityOptions.set(next)
      this.cityLoading.set(false)
    }, 350)
  }
}
