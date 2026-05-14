import { ChangeDetectionStrategy, Component } from '@angular/core'
import { SgInlineEditComponent } from '@skygraph/angular'
import {
  ComponentDocComponent,
  CssVarsTableComponent,
  type CssVarDef,
  DemoBoxComponent,
  PropsTableComponent,
  type PropDef,
} from '../../../shared/demo'

const BASIC_SOURCE = `<span sg-inline-edit defaultValue="Project name"></span>`

const NO_BUTTONS_SOURCE = `<span sg-inline-edit defaultValue="Click to edit" [showButtons]="false"></span>`

const TWO_WAY_SOURCE = `<span sg-inline-edit [(value)]="bound"></span>
<span>value = "{{ bound }}"</span>`

const SIZES_SOURCE = `<span sg-inline-edit size="small" defaultValue="small"></span>
<span sg-inline-edit defaultValue="middle (default)"></span>
<span sg-inline-edit size="large" defaultValue="large"></span>`

const STATES_SOURCE = `<span sg-inline-edit [disabled]="true" defaultValue="Read-only"></span>
<span sg-inline-edit [loading]="true" defaultValue="Saving…"></span>`

const TOKENS_SOURCE = `<style>
  .amber-scope {
    --sg-color-primary: #f59e0b;
    --sg-color-primary-bg: #fef3c7;
    --sg-color-border: #fcd34d;
    --sg-border-radius: 999px;
  }
</style>
<div class="amber-scope">
  <span sg-inline-edit defaultValue="Amber theme"></span>
</div>`

const PROPS: PropDef[] = [
  { name: 'value', description: 'Controlled value', type: 'string' },
  { name: 'defaultValue', description: 'Initial uncontrolled value', type: 'string' },
  { name: '(valueChange)', description: 'Fires on save', type: 'EventEmitter<string>' },
  {
    name: '(sgSave)',
    description: 'Fires on save (alongside valueChange)',
    type: 'EventEmitter<string>',
  },
  { name: '(sgCancel)', description: 'Fires on Esc / cancel button', type: 'EventEmitter<void>' },
  {
    name: 'placeholder',
    description: 'Hint shown when the value is empty',
    type: 'string',
    default: "'Click to edit...'",
  },
  {
    name: 'showButtons',
    description: 'Render save / cancel buttons in edit mode',
    type: 'boolean',
    default: 'true',
  },
  {
    name: 'saveOnBlur',
    description: 'Save when the input loses focus (only without buttons)',
    type: 'boolean',
    default: 'true',
  },
  {
    name: 'saveOnEnter',
    description: 'Save when Enter is pressed',
    type: 'boolean',
    default: 'true',
  },
  {
    name: 'size',
    description: 'Component size (inherits from ConfigProvider)',
    type: "'small' | 'middle' | 'large'",
    default: "'middle'",
  },
  { name: 'disabled', description: 'Block edit mode', type: 'boolean', default: 'false' },
  {
    name: 'loading',
    description: 'Disable + apply a loading visual',
    type: 'boolean',
    default: 'false',
  },
]

const CSS_VARS: CssVarDef[] = [
  {
    name: 'sg-input-bg',
    default: 'var(--sg-color-bg-container)',
    description: 'Edit-mode background',
  },
  { name: 'sg-input-border', default: 'var(--sg-color-border)', description: 'Edit-mode border' },
  {
    name: 'sg-color-primary',
    default: 'var(--sg-blue-6)',
    description: 'Save button + pencil colour',
  },
  { name: 'sg-color-text', default: 'rgba(0,0,0,0.88)', description: 'View-mode text' },
  {
    name: 'sg-color-text-tertiary',
    default: 'rgba(0,0,0,0.45)',
    description: 'Placeholder colour',
  },
  { name: 'sg-border-radius', default: '6px', description: 'Input corner radius' },
]

@Component({
  selector: 'sg-inlineedit-page',
  standalone: true,
  imports: [
    SgInlineEditComponent,
    ComponentDocComponent,
    DemoBoxComponent,
    PropsTableComponent,
    CssVarsTableComponent,
  ],
  template: `
    <sg-component-doc
      title="InlineEdit"
      [crumbs]="['Data Entry', 'InlineEdit']"
      description="Text field that toggles between view and edit modes. Click / Enter to start, Enter / blur to save, Esc to cancel."
      [whenToUse]="[
        'For task titles, project names, descriptions — anywhere a single field benefits from in-place editing.',
        'For inline forms that should feel like a wiki — no modal, no separate page.',
        'When you want progressive disclosure: most of the time the row is read-only.',
      ]"
    >
      <sg-demo-box
        title="Basic"
        description="Click the pencil or the text itself to enter edit mode."
        [code]="basicSource"
      >
        <span sg-inline-edit defaultValue="Project name"></span>
      </sg-demo-box>

      <sg-demo-box
        title="Save on blur, no buttons"
        description="Drop the buttons for a minimal UI — blur saves, Esc cancels."
        [code]="noButtonsSource"
      >
        <span sg-inline-edit defaultValue="Click to edit" [showButtons]="false"></span>
      </sg-demo-box>

      <sg-demo-box
        title="Two-way binding"
        description="Two-way [(value)] binding."
        [code]="twoWaySource"
      >
        <span sg-inline-edit [(value)]="bound"></span>
        <p style="font-size:12px;color:var(--sg-color-text-secondary);margin:8px 0 0">
          value = "{{ bound }}"
        </p>
      </sg-demo-box>

      <sg-demo-box
        title="Sizes"
        description="Three sizes inherited from ConfigProvider."
        [code]="sizesSource"
      >
        <div style="display:flex;flex-direction:column;gap:8px">
          <span sg-inline-edit size="small" defaultValue="small"></span>
          <span sg-inline-edit defaultValue="middle (default)"></span>
          <span sg-inline-edit size="large" defaultValue="large"></span>
        </div>
      </sg-demo-box>

      <sg-demo-box
        title="States"
        description="Disabled blocks edit mode; loading applies a busy visual."
        [code]="statesSource"
      >
        <div style="display:flex;flex-direction:column;gap:8px">
          <span sg-inline-edit [disabled]="true" defaultValue="Read-only"></span>
          <span sg-inline-edit [loading]="true" defaultValue="Saving…"></span>
        </div>
      </sg-demo-box>

      <sg-demo-box
        title="Token override"
        description="Rebrand via standard input + primary tokens."
        [code]="tokensSource"
      >
        <div class="ng-inline-amber">
          <span sg-inline-edit defaultValue="Amber theme"></span>
        </div>
      </sg-demo-box>

      <sg-props-table title="InlineEdit API" [data]="props"></sg-props-table>
      <sg-css-vars-table
        [data]="cssVars"
        hint="InlineEdit has no component-local tokens — borrows global input + primary tokens."
      ></sg-css-vars-table>
    </sg-component-doc>
  `,
  styles: [
    `
      :host ::ng-deep .ng-inline-amber {
        --sg-color-primary: #f59e0b;
        --sg-color-primary-bg: #fef3c7;
        --sg-color-border: #fcd34d;
        --sg-border-radius: 999px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InlineEditPageComponent {
  protected bound = 'Edit me'
  protected readonly basicSource = BASIC_SOURCE
  protected readonly noButtonsSource = NO_BUTTONS_SOURCE
  protected readonly twoWaySource = TWO_WAY_SOURCE
  protected readonly sizesSource = SIZES_SOURCE
  protected readonly statesSource = STATES_SOURCE
  protected readonly tokensSource = TOKENS_SOURCE
  protected readonly props = PROPS
  protected readonly cssVars = CSS_VARS
}
