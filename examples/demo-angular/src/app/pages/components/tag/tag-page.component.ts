import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { SgTagComponent } from '@skygraph/angular'
import {
  ComponentDocComponent,
  CssVarsTableComponent,
  type CssVarDef,
  DemoBoxComponent,
  PropsTableComponent,
  type PropDef,
} from '../../../shared/demo'

const BASIC_SOURCE = `<span sg-tag>Tag 1</span>
<span sg-tag>Tag 2</span>
<span sg-tag>Neutral label</span>`

const PRESETS_SOURCE = `<span sg-tag color="default">default</span>
<span sg-tag color="success">success</span>
<span sg-tag color="processing">processing</span>
<span sg-tag color="warning">warning</span>
<span sg-tag color="error">error</span>`

const WITH_ICON_SOURCE = `<span sg-tag color="success"><span aria-hidden="true">✓</span> Verified</span>
<span sg-tag color="processing"><span aria-hidden="true">⟳</span> Syncing…</span>
<span sg-tag color="warning"><span aria-hidden="true">⚠</span> Review</span>
<span sg-tag color="error"><span aria-hidden="true">✕</span> Failed</span>`

const CUSTOM_COLOR_SOURCE = `<span sg-tag color="#f50">#f50</span>
<span sg-tag color="#2db7f5">#2db7f5</span>
<span sg-tag color="#87d068">#87d068</span>
<span sg-tag color="rgb(124, 58, 237)">rgb(124, 58, 237)</span>
<span sg-tag color="teal">teal</span>`

const BORDERLESS_SOURCE = `<span sg-tag [bordered]="false">default</span>
<span sg-tag color="success" [bordered]="false">success</span>
<span sg-tag color="processing" [bordered]="false">processing</span>
<span sg-tag color="error" [bordered]="false">error</span>`

const CLOSABLE_SOURCE = `@for (key of tags(); track key) {
  <span sg-tag color="processing" closable (closed)="remove(key)">{{ key }}</span>
}
@if (tags().length === 0) {
  <button (click)="reset()">Reset</button>
}`

const TOKENS_SOURCE = `<style>
  .tag-scope {
    --sg-border-radius-sm: 999px;
    --sg-padding-sm: 10px;
    --sg-color-success: #16a34a;
    --sg-color-success-bg: #dcfce7;
    --sg-color-warning: #d97706;
    --sg-color-warning-bg: #fef3c7;
    --sg-color-error: #dc2626;
    --sg-color-error-bg: #fee2e2;
    --sg-color-primary: #7c3aed;
    --sg-color-primary-bg: #ede9fe;
  }
</style>
<div class="tag-scope" style="display:flex;gap:8px;flex-wrap:wrap">
  <span sg-tag>default</span>
  <span sg-tag color="success">success</span>
  <span sg-tag color="warning">warning</span>
  <span sg-tag color="error">error</span>
  <span sg-tag color="processing">processing</span>
</div>`

const UNSTYLED_SOURCE = `<span sg-tag unstyled closable class="my-pill">Custom gradient</span>

.my-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 2px 10px;
  border-radius: 999px;
  background: linear-gradient(135deg, #f472b6, #7c3aed);
  color: #fff;
  font-size: 12px;
}`

const PROPS: PropDef[] = [
  {
    name: 'color',
    description:
      'Preset name or any CSS colour. Presets resolve to tokens; arbitrary strings are applied as-is.',
    type: "'default' | 'success' | 'processing' | 'warning' | 'error' | string",
    default: "'default'",
  },
  { name: 'bordered', description: 'Draw the 1px border', type: 'boolean', default: 'true' },
  {
    name: 'closable',
    description: 'Render the × close control',
    type: 'boolean',
    default: 'false',
  },
  {
    name: 'unstyled',
    description: 'Strip every sg-tag-* class — keep only DOM structure',
    type: 'boolean',
    default: 'false',
  },
  { name: 'className', description: 'Extra class appended to the host', type: 'string' },
  { name: '(closed)', description: 'Fires after the × is clicked', type: 'EventEmitter<void>' },
]

const CSS_VARS: CssVarDef[] = [
  {
    name: 'sg-color-bg-secondary',
    default: 'var(--sg-gray-2)',
    description: 'Default tag background',
  },
  { name: 'sg-color-border', default: 'var(--sg-color-border)', description: 'Default tag border' },
  {
    name: 'sg-color-success-bg',
    default: 'var(--sg-green-1)',
    description: 'color=success background',
  },
  {
    name: 'sg-color-success',
    default: 'var(--sg-green-6)',
    description: 'color=success text + border',
  },
  {
    name: 'sg-color-warning-bg',
    default: 'var(--sg-gold-1)',
    description: 'color=warning background',
  },
  {
    name: 'sg-color-warning',
    default: 'var(--sg-gold-6)',
    description: 'color=warning text + border',
  },
  { name: 'sg-color-error-bg', default: 'var(--sg-red-1)', description: 'color=error background' },
  { name: 'sg-color-error', default: 'var(--sg-red-5)', description: 'color=error text + border' },
  {
    name: 'sg-color-primary-bg',
    default: 'var(--sg-blue-1)',
    description: 'color=processing background',
  },
  {
    name: 'sg-color-primary',
    default: 'var(--sg-blue-6)',
    description: 'color=processing text + border',
  },
  { name: 'sg-border-radius-sm', default: '4px', description: 'Tag corner radius' },
  { name: 'sg-padding-sm', default: '6px', description: 'Tag horizontal padding' },
]

@Component({
  selector: 'sg-tag-page',
  standalone: true,
  imports: [
    SgTagComponent,
    ComponentDocComponent,
    DemoBoxComponent,
    PropsTableComponent,
    CssVarsTableComponent,
  ],
  template: `
    <sg-component-doc
      title="Tag"
      [crumbs]="['Data Display', 'Tag']"
      description="Compact label for status, category, or removable selection. Preset semantic colours, custom colour passthrough, borderless and closable variants."
      [whenToUse]="[
        'For status badges in tables and lists.',
        'For removable filters / selected items.',
        'For at-a-glance categorisation in cards.',
      ]"
    >
      <sg-demo-box
        title="Basic"
        description="Default neutral tag using global surface tokens."
        [code]="basicSource"
      >
        <div style="display:flex;gap:8px;flex-wrap:wrap">
          <span sg-tag>Tag 1</span>
          <span sg-tag>Tag 2</span>
          <span sg-tag>Neutral label</span>
        </div>
      </sg-demo-box>

      <sg-demo-box
        title="Preset colours"
        description="Five semantic presets map directly to palette tokens."
        [code]="presetsSource"
      >
        <div style="display:flex;gap:8px;flex-wrap:wrap">
          <span sg-tag color="default">default</span>
          <span sg-tag color="success">success</span>
          <span sg-tag color="processing">processing</span>
          <span sg-tag color="warning">warning</span>
          <span sg-tag color="error">error</span>
        </div>
      </sg-demo-box>

      <sg-demo-box
        title="With icon"
        description="Mix inline content — icons + text — for status pills."
        [code]="withIconSource"
      >
        <div style="display:flex;gap:8px;flex-wrap:wrap">
          <span sg-tag color="success"><span aria-hidden="true">✓</span> Verified</span>
          <span sg-tag color="processing"><span aria-hidden="true">⟳</span> Syncing…</span>
          <span sg-tag color="warning"><span aria-hidden="true">⚠</span> Review</span>
          <span sg-tag color="error"><span aria-hidden="true">✕</span> Failed</span>
        </div>
      </sg-demo-box>

      <sg-demo-box
        title="Custom colour"
        description="Any non-preset string is applied as a raw CSS colour to background + border."
        [code]="customColorSource"
      >
        <div style="display:flex;gap:8px;flex-wrap:wrap">
          <span sg-tag color="#f50">#f50</span>
          <span sg-tag color="#2db7f5">#2db7f5</span>
          <span sg-tag color="#87d068">#87d068</span>
          <span sg-tag color="rgb(124, 58, 237)">rgb(124, 58, 237)</span>
          <span sg-tag color="teal">teal</span>
        </div>
      </sg-demo-box>

      <sg-demo-box
        title="Borderless"
        description="Drop the outline while keeping the tinted background — for dense lists."
        [code]="borderlessSource"
      >
        <div style="display:flex;gap:8px;flex-wrap:wrap">
          <span sg-tag [bordered]="false">default</span>
          <span sg-tag color="success" [bordered]="false">success</span>
          <span sg-tag color="processing" [bordered]="false">processing</span>
          <span sg-tag color="error" [bordered]="false">error</span>
        </div>
      </sg-demo-box>

      <sg-demo-box
        title="Closable"
        description="Add a × button. (closed) fires after the click — manage removal in your model."
        [code]="closableSource"
      >
        <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">
          @for (key of tags(); track key) {
            <span sg-tag color="processing" closable (closed)="remove(key)">{{ key }}</span>
          }
          @if (tags().length === 0) {
            <button type="button" (click)="reset()" style="font:inherit">Reset</button>
          }
        </div>
      </sg-demo-box>

      <sg-demo-box
        title="Token override"
        description="Tag has no component tokens — re-skin via semantic palette globals."
        [code]="tokensSource"
      >
        <div class="ng-tag-scope">
          <span sg-tag>default</span>
          <span sg-tag color="success">success</span>
          <span sg-tag color="warning">warning</span>
          <span sg-tag color="error">error</span>
          <span sg-tag color="processing">processing</span>
        </div>
      </sg-demo-box>

      <sg-demo-box
        title="Unstyled"
        description="unstyled drops every sg-tag-* class — bring your own classes."
        [code]="unstyledSource"
      >
        <span sg-tag unstyled closable class="ng-tag-gradient">Custom gradient</span>
      </sg-demo-box>

      <sg-props-table title="Tag API" [data]="props"></sg-props-table>
      <sg-css-vars-table
        [data]="cssVars"
        hint="Tag has no component-local tokens — preset colour variants borrow the semantic palette."
      ></sg-css-vars-table>
    </sg-component-doc>
  `,
  styles: [
    `
      :host ::ng-deep .ng-tag-scope {
        --sg-border-radius-sm: 999px;
        --sg-padding-sm: 10px;
        --sg-color-success: #16a34a;
        --sg-color-success-bg: #dcfce7;
        --sg-color-warning: #d97706;
        --sg-color-warning-bg: #fef3c7;
        --sg-color-error: #dc2626;
        --sg-color-error-bg: #fee2e2;
        --sg-color-primary: #7c3aed;
        --sg-color-primary-bg: #ede9fe;
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
      }
      .ng-tag-gradient {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 2px 10px;
        border-radius: 999px;
        background: linear-gradient(135deg, #f472b6, #7c3aed);
        color: #fff;
        font-size: 12px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagPageComponent {
  private static readonly KEYS = ['design', 'engineering', 'product', 'research'] as const
  protected readonly tags = signal<string[]>([...TagPageComponent.KEYS])

  protected readonly basicSource = BASIC_SOURCE
  protected readonly presetsSource = PRESETS_SOURCE
  protected readonly withIconSource = WITH_ICON_SOURCE
  protected readonly customColorSource = CUSTOM_COLOR_SOURCE
  protected readonly borderlessSource = BORDERLESS_SOURCE
  protected readonly closableSource = CLOSABLE_SOURCE
  protected readonly tokensSource = TOKENS_SOURCE
  protected readonly unstyledSource = UNSTYLED_SOURCE
  protected readonly props = PROPS
  protected readonly cssVars = CSS_VARS

  protected remove(t: string): void {
    this.tags.update((arr) => arr.filter((x) => x !== t))
  }
  protected reset(): void {
    this.tags.set([...TagPageComponent.KEYS])
  }
}
