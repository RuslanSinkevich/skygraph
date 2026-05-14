import { ChangeDetectionStrategy, Component } from '@angular/core'
import { SgMentionsComponent } from '@skygraph/angular'
import {
  ComponentDocComponent,
  CssVarsTableComponent,
  type CssVarDef,
  DemoBoxComponent,
  PropsTableComponent,
  type PropDef,
} from '../../../shared/demo'

const BASIC_SOURCE = `<div sg-mentions placeholder="Try @ or #" prefix="@" rows="4" style="width:480px"></div>`

const MULTI_PREFIX_SOURCE = `<div
  sg-mentions
  [prefix]="['@', '#']"
  rows="4"
  defaultValue="Hello @world #angular"
  style="width:480px"
></div>`

const SIZES_SOURCE = `<div sg-mentions size="small" rows="3" placeholder="small" style="width:380px"></div>
<div sg-mentions rows="3" placeholder="middle (default)" style="width:380px"></div>
<div sg-mentions size="large" rows="3" placeholder="large" style="width:380px"></div>`

const DISABLED_SOURCE = `<div sg-mentions [disabled]="true" defaultValue="Locked field" rows="3" style="width:380px"></div>`

const TOKENS_SOURCE = `<style>
  .teal-scope {
    --sg-input-bg: #f0fdfa;
    --sg-input-border: #5eead4;
    --sg-color-primary: #0d9488;
    --sg-border-radius: 10px;
  }
</style>
<div class="teal-scope" style="max-width:480px">
  <div sg-mentions rows="3" defaultValue="Type @ to mention someone"></div>
</div>`

const PROPS: PropDef[] = [
  { name: 'value', description: 'Controlled value', type: 'string' },
  { name: 'defaultValue', description: 'Initial uncontrolled value', type: 'string' },
  { name: '(valueChange)', description: 'Fires on every keystroke', type: 'EventEmitter<string>' },
  {
    name: 'prefix',
    description: 'Single prefix or array of prefixes used to trigger mentions',
    type: 'string | string[]',
    default: "'@'",
  },
  {
    name: 'options',
    description: 'Suggestion options — auto-suggest is deferred (F-Mentions-Suggestions)',
    type: 'SgMentionOption[]',
  },
  {
    name: 'placement',
    description: 'Dropdown placement (when implemented)',
    type: "'top' | 'bottom'",
    default: "'bottom'",
  },
  { name: 'rows', description: 'Visible textarea rows', type: 'number', default: '3' },
  {
    name: 'size',
    description: 'Component size (inherits from ConfigProvider)',
    type: "'small' | 'middle' | 'large'",
    default: "'middle'",
  },
  { name: 'disabled', description: 'Disable the textarea', type: 'boolean', default: 'false' },
  { name: 'placeholder', description: 'Placeholder text', type: 'string' },
]

const CSS_VARS: CssVarDef[] = [
  {
    name: 'sg-input-bg',
    default: 'var(--sg-color-bg-container)',
    description: 'Textarea background',
  },
  { name: 'sg-input-border', default: 'var(--sg-color-border)', description: 'Textarea border' },
  {
    name: 'sg-color-primary',
    default: 'var(--sg-blue-6)',
    description: 'Mention highlight (when populated)',
  },
  { name: 'sg-color-text', default: 'rgba(0,0,0,0.88)', description: 'Body text colour' },
  { name: 'sg-border-radius', default: '6px', description: 'Textarea corner radius' },
]

@Component({
  selector: 'sg-mentions-page',
  standalone: true,
  imports: [
    SgMentionsComponent,
    ComponentDocComponent,
    DemoBoxComponent,
    PropsTableComponent,
    CssVarsTableComponent,
  ],
  template: `
    <sg-component-doc
      title="Mentions"
      [crumbs]="['Data Entry', 'Mentions']"
      description="Textarea with mention prefixes — pluggable trigger characters and an auto-suggest dropdown (deferred). Today ships only the textarea + change API."
      [whenToUse]="[
        'For comment / chat fields that need @mentions or #tags.',
        'For task descriptions where a small set of references must be embedded.',
        'Until the dropdown lands, treat it as a styled textarea that knows its prefixes.',
      ]"
    >
      <sg-demo-box
        title="Basic"
        description="Single prefix. Type @ to start a mention — auto-suggest is a Wave 4.3 item (F-Mentions-Suggestions)."
        [code]="basicSource"
      >
        <div sg-mentions placeholder="Try @ or #" prefix="@" rows="4" style="width:480px"></div>
      </sg-demo-box>

      <sg-demo-box
        title="Multiple prefixes"
        description="Pass an array to recognise more than one trigger character."
        [code]="multiPrefixSource"
      >
        <div
          sg-mentions
          [prefix]="['@', '#']"
          rows="4"
          defaultValue="Hello @world #angular"
          style="width:480px"
        ></div>
      </sg-demo-box>

      <sg-demo-box
        title="Sizes"
        description="Three sizes inherited from ConfigProvider."
        [code]="sizesSource"
      >
        <div style="display:grid;gap:8px;max-width:480px">
          <div sg-mentions size="small" rows="3" placeholder="small"></div>
          <div sg-mentions rows="3" placeholder="middle (default)"></div>
          <div sg-mentions size="large" rows="3" placeholder="large"></div>
        </div>
      </sg-demo-box>

      <sg-demo-box title="Disabled" description="Disabled blocks input." [code]="disabledSource">
        <div
          sg-mentions
          [disabled]="true"
          defaultValue="Locked field"
          rows="3"
          style="width:480px"
        ></div>
      </sg-demo-box>

      <sg-demo-box
        title="Token override"
        description="Re-skin via standard input + primary tokens."
        [code]="tokensSource"
      >
        <div class="ng-mention-teal">
          <div sg-mentions rows="3" defaultValue="Type @ to mention someone"></div>
        </div>
      </sg-demo-box>

      <sg-props-table title="Mentions API" [data]="props"></sg-props-table>
      <sg-css-vars-table
        [data]="cssVars"
        hint="Mentions inherits the global input + primary tokens. Auto-suggest dropdown is a 4.3 item — see F-Mentions-Suggestions."
      ></sg-css-vars-table>
    </sg-component-doc>
  `,
  styles: [
    `
      :host ::ng-deep .ng-mention-teal {
        --sg-input-bg: #f0fdfa;
        --sg-input-border: #5eead4;
        --sg-color-primary: #0d9488;
        --sg-border-radius: 10px;
        max-width: 480px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MentionsPageComponent {
  protected readonly basicSource = BASIC_SOURCE
  protected readonly multiPrefixSource = MULTI_PREFIX_SOURCE
  protected readonly sizesSource = SIZES_SOURCE
  protected readonly disabledSource = DISABLED_SOURCE
  protected readonly tokensSource = TOKENS_SOURCE
  protected readonly props = PROPS
  protected readonly cssVars = CSS_VARS
}
