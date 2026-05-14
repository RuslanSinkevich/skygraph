import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { SgSearchInputComponent } from '@skygraph/angular'
import {
  ComponentDocComponent,
  CssVarsTableComponent,
  type CssVarDef,
  DemoBoxComponent,
  PropsTableComponent,
  type PropDef,
} from '../../../shared/demo'

const BASIC_SOURCE = `<span sg-search-input placeholder="Type to search…" (search)="onSearch($event)"></span>
<span>last query: "{{ lastQuery() }}"</span>`

const ENTER_BUTTON_SOURCE = `<span sg-search-input enterButton (search)="onSearch($event)"></span>

<!-- Custom label -->
<span sg-search-input enterButton="Find" (search)="onSearch($event)"></span>`

const SIZES_SOURCE = `<span sg-search-input size="small" placeholder="small"></span>
<span sg-search-input placeholder="middle (default)"></span>
<span sg-search-input size="large" placeholder="large"></span>`

const STATES_SOURCE = `<span sg-search-input [disabled]="true" defaultValue="locked"></span>
<span sg-search-input [loading]="true" placeholder="Searching…"></span>
<span sg-search-input [allowClear]="false" placeholder="No clear button"></span>`

const TOKENS_SOURCE = `<style>
  .lime-scope {
    --sg-color-primary: #65a30d;
    --sg-color-primary-hover: #84cc16;
    --sg-color-border: #d9f99d;
    --sg-border-radius: 999px;
  }
</style>
<div class="lime-scope" style="max-width:360px">
  <span sg-search-input enterButton placeholder="Lime search…"></span>
</div>`

const PROPS: PropDef[] = [
  { name: 'value', description: 'Controlled value', type: 'string' },
  { name: 'defaultValue', description: 'Initial uncontrolled value', type: 'string' },
  { name: '(valueChange)', description: 'Fires on every keystroke', type: 'EventEmitter<string>' },
  {
    name: '(search)',
    description: 'Fires on Enter / button click / clear',
    type: 'EventEmitter<string>',
  },
  { name: 'placeholder', description: 'Placeholder text', type: 'string', default: "'Search...'" },
  {
    name: 'allowClear',
    description: 'Show × inside the field once a value is typed',
    type: 'boolean',
    default: 'true',
  },
  {
    name: 'enterButton',
    description: 'true → default ⌕ button, string → custom label, false → hide',
    type: 'boolean | string',
    default: 'false',
  },
  {
    name: 'size',
    description: 'Component size (inherits from ConfigProvider)',
    type: "'small' | 'middle' | 'large'",
    default: "'middle'",
  },
  {
    name: 'disabled',
    description: 'Disable the field + button',
    type: 'boolean',
    default: 'false',
  },
  {
    name: 'loading',
    description: 'Inline spinner; blocks input',
    type: 'boolean',
    default: 'false',
  },
]

const CSS_VARS: CssVarDef[] = [
  { name: 'sg-input-bg', default: 'var(--sg-color-bg-container)', description: 'Field background' },
  { name: 'sg-input-border', default: 'var(--sg-color-border)', description: 'Field border' },
  { name: 'sg-color-primary', default: 'var(--sg-blue-6)', description: 'Button background' },
  { name: 'sg-color-primary-hover', default: 'var(--sg-blue-5)', description: 'Button hover' },
  {
    name: 'sg-color-text-secondary',
    default: 'rgba(0,0,0,0.65)',
    description: 'Magnifier / clear icon',
  },
  { name: 'sg-border-radius', default: '6px', description: 'Field + button corner radius' },
]

@Component({
  selector: 'sg-searchinput-page',
  standalone: true,
  imports: [
    SgSearchInputComponent,
    ComponentDocComponent,
    DemoBoxComponent,
    PropsTableComponent,
    CssVarsTableComponent,
  ],
  template: `
    <sg-component-doc
      title="SearchInput"
      [crumbs]="['Data Entry', 'SearchInput']"
      description="Search box with a magnifier icon, an optional clear button, and an optional submit button."
      [whenToUse]="[
        'For free-form searches in toolbars or top-bars.',
        'When you want to debounce on (search) instead of every keystroke.',
        'For commands that need an explicit Submit affordance — use enterButton.',
      ]"
    >
      <sg-demo-box
        title="Basic"
        description="Default placeholder + clear button. The (search) event fires on Enter and on clear."
        [code]="basicSource"
      >
        <span sg-search-input placeholder="Type to search…" (search)="onSearch($event)"></span>
        <p style="font-size:12px;color:var(--sg-color-text-secondary);margin:8px 0 0">
          last query: "{{ lastQuery() }}"
        </p>
      </sg-demo-box>

      <sg-demo-box
        title="Submit button"
        description="Pass enterButton for a default ⌕ button or a string for a custom label."
        [code]="enterButtonSource"
      >
        <div style="display:grid;gap:8px;max-width:360px">
          <span sg-search-input enterButton (search)="onSearch($event)"></span>
          <span sg-search-input enterButton="Find" (search)="onSearch($event)"></span>
        </div>
      </sg-demo-box>

      <sg-demo-box
        title="Sizes"
        description="Three sizes inherited from ConfigProvider."
        [code]="sizesSource"
      >
        <div style="display:grid;gap:8px;max-width:320px">
          <span sg-search-input size="small" placeholder="small"></span>
          <span sg-search-input placeholder="middle (default)"></span>
          <span sg-search-input size="large" placeholder="large"></span>
        </div>
      </sg-demo-box>

      <sg-demo-box
        title="States"
        description="Disabled blocks the field; loading swaps the icon for a spinner; allowClear=false keeps the value."
        [code]="statesSource"
      >
        <div style="display:grid;gap:8px;max-width:320px">
          <span sg-search-input [disabled]="true" defaultValue="locked"></span>
          <span sg-search-input [loading]="true" placeholder="Searching…"></span>
          <span sg-search-input [allowClear]="false" placeholder="No clear button"></span>
        </div>
      </sg-demo-box>

      <sg-demo-box
        title="Token override"
        description="Rebrand SearchInput via global palette / radius tokens."
        [code]="tokensSource"
      >
        <div class="ng-search-lime">
          <span sg-search-input enterButton placeholder="Lime search…"></span>
        </div>
      </sg-demo-box>

      <sg-props-table title="SearchInput API" [data]="props"></sg-props-table>
      <sg-css-vars-table
        [data]="cssVars"
        hint="SearchInput has no component-local tokens — re-skin via global primary / input tokens."
      ></sg-css-vars-table>
    </sg-component-doc>
  `,
  styles: [
    `
      :host ::ng-deep .ng-search-lime {
        --sg-color-primary: #65a30d;
        --sg-color-primary-hover: #84cc16;
        --sg-color-border: #d9f99d;
        --sg-border-radius: 999px;
        max-width: 360px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchInputPageComponent {
  protected readonly lastQuery = signal('')
  protected readonly basicSource = BASIC_SOURCE
  protected readonly enterButtonSource = ENTER_BUTTON_SOURCE
  protected readonly sizesSource = SIZES_SOURCE
  protected readonly statesSource = STATES_SOURCE
  protected readonly tokensSource = TOKENS_SOURCE
  protected readonly props = PROPS
  protected readonly cssVars = CSS_VARS

  protected onSearch(q: string): void {
    this.lastQuery.set(q)
  }
}
