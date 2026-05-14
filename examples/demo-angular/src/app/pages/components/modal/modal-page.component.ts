import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { SgButtonComponent, SgModalComponent } from '@skygraph/angular'
import {
  ComponentDocComponent,
  CssVarsTableComponent,
  type CssVarDef,
  DemoBoxComponent,
  PropsTableComponent,
  type PropDef,
} from '../../../shared/demo'

const BASIC_SOURCE = `<button sg-button type="primary" (click)="open.set(true)">Open modal</button>
<sg-modal
  [open]="open()"
  title="Create project"
  customFooter
  (closeChange)="open.set(false)"
>
  <p>Press <kbd>Esc</kbd>, click the mask, or use the close button to dismiss.</p>
  <div sg-modal-footer>
    <button sg-button (click)="open.set(false)">Cancel</button>
    <button sg-button type="primary" (click)="open.set(false)">Create</button>
  </div>
</sg-modal>`

const DEFAULT_FOOTER_SOURCE = `<button sg-button type="primary" (click)="open.set(true)">Open modal</button>
<sg-modal
  [open]="open()"
  title="Save changes?"
  [confirmLoading]="loading()"
  (closeChange)="open.set(false)"
  (ok)="handleOk()"
>
  <p>Footer is auto-rendered because (ok) is observed.</p>
</sg-modal>

handleOk() {
  this.loading.set(true)
  setTimeout(() => {
    this.loading.set(false)
    this.open.set(false)
  }, 700)
}`

const NO_FOOTER_SOURCE = `<button sg-button (click)="open.set(true)">Show details</button>
<sg-modal [open]="open()" title="Release 1.4.0" hideFooter (closeChange)="open.set(false)">
  <ul>
    <li>Table now exposes <code>--sg-table-cell-solid-bg</code></li>
    <li>DatePicker accepts <code>DatePreset[]</code> for sidebar shortcuts</li>
    <li>FormList gains a <code>move()</code> action</li>
  </ul>
</sg-modal>`

const WIDTHS_SOURCE = `<button sg-button (click)="narrow.set(true)">360 px</button>
<button sg-button (click)="wide.set(true)">720 px</button>
<button sg-button (click)="full.set(true)">90 vw</button>

<sg-modal [open]="narrow()" title="Narrow" [width]="360" (closeChange)="narrow.set(false)">
  <p>Small dialog for short confirmations.</p>
</sg-modal>
<sg-modal [open]="wide()" title="Wide" [width]="720" (closeChange)="wide.set(false)">
  <p>Use wider modals for dense forms, tables, or side-by-side layouts.</p>
</sg-modal>
<sg-modal [open]="full()" title="Responsive" width="90vw" (closeChange)="full.set(false)">
  <p>CSS lengths work too — 90vw, min(720px, 90vw), etc.</p>
</sg-modal>`

const ASYNC_SOURCE = `<button sg-button (click)="open.set(true)">Save…</button>
<sg-modal
  [open]="open()"
  title="Save changes"
  customFooter
  (closeChange)="!saving() && open.set(false)"
>
  <p>Simulated save — takes ~1.4s. While saving, Cancel is disabled.</p>
  <div sg-modal-footer>
    <button sg-button [disabled]="saving()" (click)="open.set(false)">Cancel</button>
    <button sg-button type="primary" [loading]="saving()" (click)="handleSave()">
      {{ saving() ? 'Saving…' : 'Save' }}
    </button>
  </div>
</sg-modal>`

const TOKENS_SOURCE = `<div class="purple-scope">
  <button sg-button type="primary" (click)="open.set(true)">Open purple modal</button>
  <sg-modal
    [open]="open()"
    title="Scoped tokens"
    customFooter
    (closeChange)="open.set(false)"
  >
    <p>Inside this subtree --sg-color-primary is purple, radius is 14px.</p>
    <div sg-modal-footer>
      <button sg-button (click)="open.set(false)">Cancel</button>
      <button sg-button type="primary" (click)="open.set(false)">Confirm</button>
    </div>
  </sg-modal>
</div>

.purple-scope {
  --sg-color-primary: #7c3aed;
  --sg-color-primary-hover: #6d28d9;
  --sg-color-primary-active: #5b21b6;
  --sg-color-primary-bg: #f3e8ff;
  --sg-border-radius-lg: 14px;
}`

const UNSTYLED_SOURCE = `<button sg-button (click)="open.set(true)">Open headless dialog</button>
<sg-modal
  unstyled
  className="ng-unstyled-dialog"
  [open]="open()"
  title="Headless"
  (closeChange)="open.set(false)"
>
  <div style="padding:16px">
    <p>No SkyGraph styles. Bring your own via className.</p>
    <button sg-button (click)="open.set(false)">Close</button>
  </div>
</sg-modal>`

const PROPS: PropDef[] = [
  { name: 'open', description: 'Controls visibility', type: 'boolean', default: 'false' },
  {
    name: '(closeChange)',
    description: 'Fires on mask click, Escape, or close button',
    type: 'EventEmitter<void>',
  },
  { name: 'title', description: 'Header text (sets the accessible name)', type: 'string' },
  {
    name: 'width',
    description: 'Dialog width — px number or any CSS length',
    type: 'number | string',
    default: '520',
  },
  {
    name: '(ok)',
    description: 'Click on the default primary button — observing it auto-renders OK/Cancel footer',
    type: 'EventEmitter<void>',
  },
  { name: 'okText', description: 'Label for default OK button', type: 'string' },
  { name: 'cancelText', description: 'Label for default Cancel button', type: 'string' },
  {
    name: 'okType',
    description: 'Visual type of default OK button',
    type: "'primary' | 'default' | 'dashed' | 'text'",
    default: "'primary'",
  },
  {
    name: 'confirmLoading',
    description: 'Loading state for default OK button',
    type: 'boolean',
    default: 'false',
  },
  {
    name: 'hideFooter',
    description: 'Drop the footer area entirely (React footer={null})',
    type: 'boolean',
    default: 'false',
  },
  {
    name: 'customFooter',
    description: 'Use the projected [sg-modal-footer] node instead of the default OK/Cancel pair',
    type: 'boolean',
    default: 'false',
  },
  {
    name: 'unstyled',
    description: 'Drop every sg-modal-* class — keeps role/aria/Escape behaviour',
    type: 'boolean',
    default: 'false',
  },
  { name: 'className', description: 'Extra class on the dialog element', type: 'string' },
]

const CSS_VARS: CssVarDef[] = [
  { name: 'sg-modal-width', default: '520px', description: 'Dialog width — set via width input' },
  { name: 'sg-color-bg-elevated', default: '#ffffff', description: 'Dialog background' },
  { name: 'sg-color-text', default: 'rgba(0,0,0,0.88)', description: 'Body text colour' },
  {
    name: 'sg-color-text-heading',
    default: 'rgba(0,0,0,0.88)',
    description: 'Header title colour',
  },
  { name: 'sg-color-bg-mask', default: 'rgba(0,0,0,0.45)', description: 'Backdrop fill' },
  { name: 'sg-border-radius-lg', default: '8px', description: 'Dialog corner radius' },
  {
    name: 'sg-box-shadow',
    default: '0 6px 16px rgba(0,0,0,0.08)',
    description: 'Dialog drop shadow',
  },
]

@Component({
  selector: 'sg-modal-page',
  standalone: true,
  imports: [
    SgModalComponent,
    SgButtonComponent,
    ComponentDocComponent,
    DemoBoxComponent,
    PropsTableComponent,
    CssVarsTableComponent,
  ],
  template: `
    <sg-component-doc
      title="Modal"
      [crumbs]="['Feedback', 'Modal']"
      description="Centered dialog with mask, focus trap, and Escape to close. Inline rendering — no CDK overlay (D7)."
      [whenToUse]="[
        'For interrupting the user with a confirmation, form, or short detail view.',
        'For workflows that need an explicit dismiss step.',
        'For cases where a Drawer would feel too heavyweight or too task-driven.',
      ]"
    >
      <sg-demo-box
        title="Basic"
        description="Title, body, custom footer slot."
        [code]="basicSource"
      >
        <button sg-button type="primary" (click)="basic.set(true)">Open modal</button>
        <sg-modal
          [open]="basic()"
          title="Create project"
          customFooter
          (closeChange)="basic.set(false)"
        >
          <p>Press <kbd>Esc</kbd>, click the mask, or use the close button to dismiss.</p>
          <div sg-modal-footer>
            <button sg-button (click)="basic.set(false)">Cancel</button>
            <button sg-button type="primary" (click)="basic.set(false)">Create</button>
          </div>
        </sg-modal>
      </sg-demo-box>

      <sg-demo-box
        title="Default footer"
        description="Observe (ok) → OK/Cancel pair appears automatically. Labels respect locale.modal.*."
        [code]="defaultFooterSource"
      >
        <button sg-button type="primary" (click)="defaultOpen.set(true)">Open modal</button>
        <sg-modal
          [open]="defaultOpen()"
          title="Save changes?"
          [confirmLoading]="defaultLoading()"
          (closeChange)="defaultOpen.set(false)"
          (ok)="handleDefaultOk()"
        >
          <p>
            Footer is auto-rendered because <code>(ok)</code> is observed. Override labels via
            <code>okText</code>/<code>cancelText</code> or globally with
            <code>provideSgConfig({{ '{' }} locale: ru_RU {{ '}' }})</code>.
          </p>
        </sg-modal>
      </sg-demo-box>

      <sg-demo-box
        title="No footer"
        description="hideFooter drops the footer area entirely — useful for read-only modals."
        [code]="noFooterSource"
      >
        <button sg-button (click)="noFooter.set(true)">Show details</button>
        <sg-modal
          [open]="noFooter()"
          title="Release 1.4.0"
          hideFooter
          (closeChange)="noFooter.set(false)"
        >
          <ul style="margin:4px 0 0 18px;line-height:1.7">
            <li>Table now exposes <code>--sg-table-cell-solid-bg</code></li>
            <li>DatePicker accepts <code>DatePreset[]</code> for sidebar shortcuts</li>
            <li>FormList gains a <code>move()</code> action</li>
          </ul>
        </sg-modal>
      </sg-demo-box>

      <sg-demo-box
        title="Widths"
        description="width accepts a number (pixels) or any CSS length."
        [code]="widthsSource"
      >
        <div style="display:flex;gap:8px;flex-wrap:wrap">
          <button sg-button (click)="narrow.set(true)">360 px</button>
          <button sg-button (click)="wide.set(true)">720 px</button>
          <button sg-button (click)="full.set(true)">90 vw</button>
        </div>
        <sg-modal [open]="narrow()" title="Narrow" [width]="360" (closeChange)="narrow.set(false)">
          <p>Small dialog for short confirmations.</p>
        </sg-modal>
        <sg-modal [open]="wide()" title="Wide" [width]="720" (closeChange)="wide.set(false)">
          <p>Use wider modals for dense forms, tables, or side-by-side layouts.</p>
        </sg-modal>
        <sg-modal [open]="full()" title="Responsive" width="90vw" (closeChange)="full.set(false)">
          <p>CSS lengths work too — <code>90vw</code>, <code>min(720px, 90vw)</code>.</p>
        </sg-modal>
      </sg-demo-box>

      <sg-demo-box
        title="Async confirm"
        description="Custom footer locks Cancel while saving; primary shows loading state."
        [code]="asyncSource"
      >
        <button sg-button (click)="asyncOpen.set(true)">Save…</button>
        <sg-modal
          [open]="asyncOpen()"
          title="Save changes"
          customFooter
          (closeChange)="onAsyncClose()"
        >
          <p>Simulated save — takes ~1.4s. While saving, Cancel is disabled.</p>
          <div sg-modal-footer>
            <button sg-button [disabled]="asyncSaving()" (click)="asyncOpen.set(false)">
              Cancel
            </button>
            <button sg-button type="primary" [loading]="asyncSaving()" (click)="handleAsyncSave()">
              {{ asyncSaving() ? 'Saving…' : 'Save' }}
            </button>
          </div>
        </sg-modal>
      </sg-demo-box>

      <sg-demo-box
        title="Token override"
        description="Wrap the trigger + modal in a token-scoped div to re-skin the entire dialog."
        [code]="tokensSource"
      >
        <div class="ng-modal-purple">
          <button sg-button type="primary" (click)="tokens.set(true)">Open purple modal</button>
          <sg-modal
            [open]="tokens()"
            title="Scoped tokens"
            customFooter
            (closeChange)="tokens.set(false)"
          >
            <p>
              Inside this subtree, <code>--sg-color-primary</code> is purple and the dialog radius
              is 14px. The rest of the app stays blue.
            </p>
            <div sg-modal-footer>
              <button sg-button (click)="tokens.set(false)">Cancel</button>
              <button sg-button type="primary" (click)="tokens.set(false)">Confirm</button>
            </div>
          </sg-modal>
        </div>
      </sg-demo-box>

      <sg-demo-box
        title="Unstyled"
        description="unstyled drops every sg-* class but keeps role/aria/Escape behaviour."
        [code]="unstyledSource"
      >
        <button sg-button (click)="headless.set(true)">Open headless dialog</button>
        <sg-modal
          unstyled
          className="ng-headless-dialog"
          [open]="headless()"
          title="Headless"
          (closeChange)="headless.set(false)"
        >
          <div style="padding:16px">
            <p style="margin-top:0">No SkyGraph styles. Bring your own visuals via className.</p>
            <button sg-button (click)="headless.set(false)">Close</button>
          </div>
        </sg-modal>
      </sg-demo-box>

      <sg-props-table title="Modal API" [data]="props"></sg-props-table>
      <sg-css-vars-table
        [data]="cssVars"
        hint="Override --sg-color-primary on a wrapping div to re-skin every Button inside the modal."
      ></sg-css-vars-table>
    </sg-component-doc>
  `,
  styles: [
    `
      :host ::ng-deep .ng-modal-purple {
        --sg-color-primary: #7c3aed;
        --sg-color-primary-hover: #6d28d9;
        --sg-color-primary-active: #5b21b6;
        --sg-color-primary-bg: #f3e8ff;
        --sg-border-radius-lg: 14px;
      }
      :host ::ng-deep .ng-headless-dialog {
        position: fixed;
        inset: 0;
        margin: auto;
        max-width: 400px;
        height: fit-content;
        background: #fff;
        border-radius: 12px;
        padding: 16px;
        box-shadow: 0 12px 32px rgba(0, 0, 0, 0.2);
        z-index: 1000;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalPageComponent {
  protected readonly basic = signal(false)
  protected readonly defaultOpen = signal(false)
  protected readonly defaultLoading = signal(false)
  protected readonly noFooter = signal(false)
  protected readonly narrow = signal(false)
  protected readonly wide = signal(false)
  protected readonly full = signal(false)
  protected readonly asyncOpen = signal(false)
  protected readonly asyncSaving = signal(false)
  protected readonly tokens = signal(false)
  protected readonly headless = signal(false)

  protected readonly basicSource = BASIC_SOURCE
  protected readonly defaultFooterSource = DEFAULT_FOOTER_SOURCE
  protected readonly noFooterSource = NO_FOOTER_SOURCE
  protected readonly widthsSource = WIDTHS_SOURCE
  protected readonly asyncSource = ASYNC_SOURCE
  protected readonly tokensSource = TOKENS_SOURCE
  protected readonly unstyledSource = UNSTYLED_SOURCE
  protected readonly props = PROPS
  protected readonly cssVars = CSS_VARS

  protected handleDefaultOk(): void {
    this.defaultLoading.set(true)
    setTimeout(() => {
      this.defaultLoading.set(false)
      this.defaultOpen.set(false)
    }, 700)
  }

  protected onAsyncClose(): void {
    if (!this.asyncSaving()) this.asyncOpen.set(false)
  }

  protected handleAsyncSave(): void {
    this.asyncSaving.set(true)
    setTimeout(() => {
      this.asyncSaving.set(false)
      this.asyncOpen.set(false)
    }, 1400)
  }
}
