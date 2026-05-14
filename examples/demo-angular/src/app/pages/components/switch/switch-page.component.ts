import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { SgSwitchComponent } from '@skygraph/angular'
import {
  ComponentDocComponent,
  CssVarsTableComponent,
  type CssVarDef,
  DemoBoxComponent,
  PropsTableComponent,
  type PropDef,
} from '../../../shared/demo'

const BASIC_SOURCE = `<button sg-switch [(value)]="checked"></button>
<span>{{ checked ? 'On' : 'Off' }}</span>`

const SIZES_SOURCE = `<button sg-switch size="small" [defaultValue]="true"></button>
<button sg-switch [defaultValue]="true"></button>`

const STATES_SOURCE = `<button sg-switch [disabled]="true"></button>
<button sg-switch [disabled]="true" [defaultValue]="true"></button>
<button sg-switch [loading]="true"></button>
<button sg-switch [loading]="true" [defaultValue]="true"></button>`

const TEXT_ICON_SOURCE = `<button sg-switch [defaultValue]="true" checkedChildren="ON" unCheckedChildren="OFF"></button>
<button sg-switch checkedChildren="1" unCheckedChildren="0"></button>
<button sg-switch [defaultValue]="true" checkedChildren="✓" unCheckedChildren="✕"></button>`

const ASYNC_SOURCE = `<button
  sg-switch
  [value]="enabled()"
  (valueChange)="onAsync($event)"
  [loading]="pending()"
></button>
<span>Notifications: {{ enabled() ? 'on' : 'off' }}</span>`

const TOKENS_SOURCE = `<style>
  .rose-scope {
    --sg-color-primary: #e11d48;
    --sg-color-text-disabled: rgba(225, 29, 72, 0.2);
  }
</style>
<div class="rose-scope">
  <button sg-switch [defaultValue]="true"></button>
  <button sg-switch [defaultValue]="true" checkedChildren="ON" unCheckedChildren="OFF"></button>
  <button sg-switch></button>
</div>`

const UNSTYLED_SOURCE = `<button
  sg-switch
  [unstyled]="true"
  [defaultValue]="true"
  checkedChildren="On"
  unCheckedChildren="Off"
  className="ng-switch-pill"
></button>`

const PROPS: PropDef[] = [
  { name: 'value', description: 'Controlled checked state', type: 'boolean' },
  { name: 'defaultValue', description: 'Initial uncontrolled state', type: 'boolean' },
  {
    name: '(valueChange)',
    description: 'Two-way binding — fires on toggle',
    type: 'EventEmitter<boolean>',
  },
  {
    name: 'checkedChildren',
    description: 'Tiny label rendered inside the track when on',
    type: 'string',
  },
  {
    name: 'unCheckedChildren',
    description: 'Tiny label rendered inside the track when off',
    type: 'string',
  },
  {
    name: 'size',
    description: 'Visual size — small or default',
    type: "'small' | 'middle' | 'large'",
    default: "'middle'",
  },
  {
    name: 'disabled',
    description: 'Disable toggling (inherits from ConfigProvider)',
    type: 'boolean',
    default: 'false',
  },
  {
    name: 'loading',
    description: 'Inline spinner in place of label; blocks clicks',
    type: 'boolean',
    default: 'false',
  },
  {
    name: 'unstyled',
    description: 'Drop sg-switch-* classes (keeps role="switch")',
    type: 'boolean',
    default: 'false',
  },
]

const CSS_VARS: CssVarDef[] = [
  { name: 'sg-color-primary', default: 'var(--sg-blue-6)', description: 'Track colour when on' },
  {
    name: 'sg-color-text-disabled',
    default: 'rgba(0, 0, 0, 0.25)',
    description: 'Track colour when off',
  },
  { name: 'sg-color-white', default: '#ffffff', description: 'Thumb colour + on-state label' },
  { name: 'sg-shadow-sm', default: '0 2px 4px rgba(0, 0, 0, 0.16)', description: 'Thumb shadow' },
  { name: 'sg-transition-duration', default: '180ms', description: 'Thumb / track transition' },
]

@Component({
  selector: 'sg-switch-page',
  standalone: true,
  imports: [
    SgSwitchComponent,
    ComponentDocComponent,
    DemoBoxComponent,
    PropsTableComponent,
    CssVarsTableComponent,
  ],
  template: `
    <sg-component-doc
      title="Switch"
      [crumbs]="['Data Entry', 'Switch']"
      description="Inline on/off control. Two sizes, optional tiny labels inside the track, loading + disabled states, headless mode."
      [whenToUse]="[
        'For settings that toggle immediately — no need for save buttons.',
        'For boolean filters on toolbars (compact via size=small).',
        'Use Checkbox when the change must wait for a separate submit.',
      ]"
    >
      <sg-demo-box
        title="Basic"
        description="Controlled toggle. onChange gives the next boolean — persist it or derive UI state."
        [code]="basicSource"
      >
        <div style="display:flex;gap:12px;align-items:center">
          <button sg-switch [(value)]="checked"></button>
          <span style="font-size:12px;color:var(--sg-color-text-secondary)">
            {{ checked ? 'On' : 'Off' }}
          </span>
        </div>
      </sg-demo-box>

      <sg-demo-box
        title="Sizes"
        description="Two sizes: small (toolbars) and the default."
        [code]="sizesSource"
      >
        <div style="display:flex;gap:16px;align-items:center">
          <button sg-switch size="small" [defaultValue]="true"></button>
          <button sg-switch [defaultValue]="true"></button>
        </div>
      </sg-demo-box>

      <sg-demo-box
        title="States"
        description="Disabled keeps the visual state but blocks clicks; loading shows a spinner in place of the label."
        [code]="statesSource"
      >
        <div style="display:grid;gap:12px">
          <div style="display:flex;gap:16px;align-items:center">
            <button sg-switch [disabled]="true"></button>
            <button sg-switch [disabled]="true" [defaultValue]="true"></button>
          </div>
          <div style="display:flex;gap:16px;align-items:center">
            <button sg-switch [loading]="true"></button>
            <button sg-switch [loading]="true" [defaultValue]="true"></button>
          </div>
        </div>
      </sg-demo-box>

      <sg-demo-box
        title="Text / icon"
        description="checkedChildren / unCheckedChildren render a tiny label inside the track — keep it 1–3 chars."
        [code]="textIconSource"
      >
        <div style="display:flex;gap:16px;align-items:center">
          <button
            sg-switch
            [defaultValue]="true"
            checkedChildren="ON"
            unCheckedChildren="OFF"
          ></button>
          <button sg-switch checkedChildren="1" unCheckedChildren="0"></button>
          <button
            sg-switch
            [defaultValue]="true"
            checkedChildren="✓"
            unCheckedChildren="✕"
          ></button>
        </div>
      </sg-demo-box>

      <sg-demo-box
        title="Async toggle"
        description="Flip optimistically, show a spinner during the request, roll back on rejection."
        [code]="asyncSource"
      >
        <div style="display:flex;gap:12px;align-items:center">
          <button
            sg-switch
            [value]="enabled()"
            (valueChange)="onAsync($event)"
            [loading]="pending()"
          ></button>
          <span style="font-size:12px;color:var(--sg-color-text-secondary)">
            Notifications: {{ enabled() ? 'on' : 'off' }}
          </span>
        </div>
      </sg-demo-box>

      <sg-demo-box
        title="Token override"
        description="Scope --sg-color-primary + --sg-color-text-disabled to rebrand the track."
        [code]="tokensSource"
      >
        <div class="ng-switch-rose">
          <button sg-switch [defaultValue]="true"></button>
          <button
            sg-switch
            [defaultValue]="true"
            checkedChildren="ON"
            unCheckedChildren="OFF"
          ></button>
          <button sg-switch></button>
        </div>
      </sg-demo-box>

      <sg-demo-box
        title="Unstyled"
        description="unstyled drops all SkyGraph styling — keeps role=switch and aria-checked."
        [code]="unstyledSource"
      >
        <div style="display:flex;gap:12px">
          <button
            sg-switch
            [unstyled]="true"
            [defaultValue]="true"
            checkedChildren="On"
            unCheckedChildren="Off"
            class="ng-switch-pill"
          ></button>
          <button
            sg-switch
            [unstyled]="true"
            checkedChildren="On"
            unCheckedChildren="Off"
            class="ng-switch-pill"
          ></button>
        </div>
      </sg-demo-box>

      <sg-props-table title="Switch API" [data]="props"></sg-props-table>
      <sg-css-vars-table
        [data]="cssVars"
        hint="Switch has no component-local tokens — track is --sg-color-text-disabled (off) / --sg-color-primary (on)."
      ></sg-css-vars-table>
    </sg-component-doc>
  `,
  styles: [
    `
      :host ::ng-deep .ng-switch-rose {
        --sg-color-primary: #e11d48;
        --sg-color-text-disabled: rgba(225, 29, 72, 0.2);
        display: flex;
        gap: 16px;
        align-items: center;
      }
      :host ::ng-deep .ng-switch-pill {
        padding: 4px 10px;
        border: 1px solid var(--sg-color-border);
        border-radius: 999px;
        background: transparent;
        font-size: 12px;
        cursor: pointer;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SwitchPageComponent {
  protected checked = false

  protected readonly enabled = signal(false)
  protected readonly pending = signal(false)

  protected readonly basicSource = BASIC_SOURCE
  protected readonly sizesSource = SIZES_SOURCE
  protected readonly statesSource = STATES_SOURCE
  protected readonly textIconSource = TEXT_ICON_SOURCE
  protected readonly asyncSource = ASYNC_SOURCE
  protected readonly tokensSource = TOKENS_SOURCE
  protected readonly unstyledSource = UNSTYLED_SOURCE
  protected readonly props = PROPS
  protected readonly cssVars = CSS_VARS

  protected async onAsync(next: boolean): Promise<void> {
    this.pending.set(true)
    this.enabled.set(next)
    try {
      await new Promise((r) => setTimeout(r, 700))
      if (Math.random() < 0.25) throw new Error('rate limited')
    } catch {
      this.enabled.set(!next)
    } finally {
      this.pending.set(false)
    }
  }
}
