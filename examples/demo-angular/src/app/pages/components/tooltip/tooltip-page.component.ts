import { ChangeDetectionStrategy, Component } from '@angular/core'
import { SgButtonComponent, SgTooltipComponent } from '@skygraph/angular'
import {
  ComponentDocComponent,
  CssVarsTableComponent,
  type CssVarDef,
  DemoBoxComponent,
  PropsTableComponent,
  type PropDef,
} from '../../../shared/demo'

const BASIC_SOURCE = `<span sg-tooltip title="Prompt text">
  <button sg-button>Hover me</button>
</span>`

const PLACEMENT_SOURCE = `<span sg-tooltip title="Top" placement="top"><button sg-button>Top</button></span>
<span sg-tooltip title="Bottom" placement="bottom"><button sg-button>Bottom</button></span>
<span sg-tooltip title="Left" placement="left"><button sg-button>Left</button></span>
<span sg-tooltip title="Right" placement="right"><button sg-button>Right</button></span>`

const ICON_SOURCE = `<label>Brand score</label>
<span sg-tooltip title="Weighted average of NPS, reviews, and social sentiment (0–100).">
  <span tabindex="0" aria-label="More info about brand score" class="info-icon">?</span>
</span>`

const DISABLED_SOURCE = `<span sg-tooltip title="Button is disabled — hover still works">
  <button sg-button [disabled]="true">Disabled</button>
</span>
<span sg-tooltip title="Icon explains the disabled state">
  <button sg-button [disabled]="true">🔒 Locked</button>
</span>`

const RICH_SOURCE = `<ng-template #commitTitle>
  <div style="max-width:220px;white-space:normal;line-height:1.45">
    <strong style="display:block;margin-bottom:4px">Commit</strong>
    <span style="font-size:12px;opacity:0.85">
      Saves the current state to the history — press ⌘⏎ to commit quickly.
    </span>
  </div>
</ng-template>
<span sg-tooltip [titleTemplate]="commitTitle">
  <button sg-button>Hover for details</button>
</span>`

const TOKENS_SOURCE = `<style>
  .brand-scope {
    --sg-color-tooltip-bg: #7c3aed;
    --sg-color-tooltip-text: #faf5ff;
    --sg-border-radius-sm: 8px;
  }
</style>
<div class="brand-scope" style="display:flex;gap:12px">
  <span sg-tooltip title="Brand-coloured tooltip"><button sg-button>Brand tip</button></span>
  <span sg-tooltip title="Rounder corners here too" placement="bottom"><button sg-button>Bottom</button></span>
</div>`

const UNSTYLED_SOURCE = `<ng-template #pill>
  <div class="my-pill">Fully custom look</div>
</ng-template>
<span sg-tooltip unstyled [titleTemplate]="pill">
  <button sg-button>Hover me</button>
</span>

.my-pill {
  background: #0f172a;
  color: #e2e8f0;
  padding: 6px 10px;
  border-radius: 6px;
  font-size: 12px;
  white-space: nowrap;
  margin-top: 8px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.2);
  display: inline-block;
}`

const PROPS: PropDef[] = [
  { name: 'title', description: 'Tooltip text shown on hover / focus', type: 'string' },
  {
    name: 'titleTemplate',
    description: 'Rich-content template — overrides `title` when set',
    type: 'TemplateRef<unknown>',
  },
  {
    name: 'placement',
    description: 'Side of the trigger to anchor the tip',
    type: "'top' | 'bottom' | 'left' | 'right'",
    default: "'top'",
  },
  {
    name: 'unstyled',
    description: 'Drop every sg-tooltip-* class — keep hover behaviour + ARIA wiring',
    type: 'boolean',
    default: 'false',
  },
]

const CSS_VARS: CssVarDef[] = [
  { name: 'sg-color-tooltip-bg', default: '#000000d9', description: 'Tooltip background colour' },
  { name: 'sg-color-tooltip-text', default: '#ffffff', description: 'Tooltip text colour' },
  { name: 'sg-border-radius-sm', default: '4px', description: 'Tooltip corner radius' },
  {
    name: 'sg-shadow',
    default: '0 2px 8px rgba(0,0,0,0.15)',
    description: 'Drop shadow under the tip',
  },
]

@Component({
  selector: 'sg-tooltip-page',
  standalone: true,
  imports: [
    SgTooltipComponent,
    SgButtonComponent,
    ComponentDocComponent,
    DemoBoxComponent,
    PropsTableComponent,
    CssVarsTableComponent,
  ],
  template: `
    <sg-component-doc
      title="Tooltip"
      [crumbs]="['Data Display', 'Tooltip']"
      description="Floating help text shown on hover or focus. Position is decorative (CSS-only, no runtime measure)."
      [whenToUse]="[
        'For terse hints next to icons, fields and buttons.',
        'For disabled-button explanations — Tooltip listens on the wrapper, not the child.',
        'For richer content via a [titleTemplate] reference.',
      ]"
    >
      <sg-demo-box title="Basic" description="Hover the child to reveal." [code]="basicSource">
        <span sg-tooltip title="Prompt text">
          <button sg-button>Hover me</button>
        </span>
      </sg-demo-box>

      <sg-demo-box
        title="Placement"
        description="Four sides — the arrow anchors to the centre of the trigger."
        [code]="placementSource"
      >
        <div
          style="display:grid;grid-template-columns:repeat(2,auto);gap:12px;padding:40px;justify-content:start"
        >
          <span sg-tooltip title="Top" placement="top"><button sg-button>Top</button></span>
          <span sg-tooltip title="Bottom" placement="bottom"
            ><button sg-button>Bottom</button></span
          >
          <span sg-tooltip title="Left" placement="left"><button sg-button>Left</button></span>
          <span sg-tooltip title="Right" placement="right"><button sg-button>Right</button></span>
        </div>
      </sg-demo-box>

      <sg-demo-box
        title="On info icon"
        description="Classic ? icon — set tabindex=0 so keyboard users can read the tip."
        [code]="iconSource"
      >
        <div style="display:flex;align-items:center;gap:8px">
          <label style="font-weight:500">Brand score</label>
          <span sg-tooltip title="Weighted average of NPS, reviews, and social sentiment (0–100).">
            <span tabindex="0" aria-label="More info about brand score" class="info-icon">?</span>
          </span>
        </div>
      </sg-demo-box>

      <sg-demo-box
        title="On disabled trigger"
        description="The wrapper owns the hover listeners — disabled buttons still reveal the tip."
        [code]="disabledSource"
      >
        <div style="display:flex;gap:12px">
          <span sg-tooltip title="Button is disabled — hover still works">
            <button sg-button [disabled]="true">Disabled</button>
          </span>
          <span sg-tooltip title="Icon explains the disabled state">
            <button sg-button [disabled]="true">🔒 Locked</button>
          </span>
        </div>
      </sg-demo-box>

      <sg-demo-box
        title="Rich content"
        description="Pass a TemplateRef via [titleTemplate] for heading + description combos."
        [code]="richSource"
      >
        <ng-template #commitTitle>
          <div style="max-width:220px;white-space:normal;line-height:1.45">
            <strong style="display:block;margin-bottom:4px">Commit</strong>
            <span style="font-size:12px;opacity:0.85">
              Saves the current state to the history — press ⌘⏎ to commit quickly.
            </span>
          </div>
        </ng-template>
        <span sg-tooltip [titleTemplate]="commitTitle">
          <button sg-button>Hover for details</button>
        </span>
      </sg-demo-box>

      <sg-demo-box
        title="Token override"
        description="Tooltip ships dedicated tokens — --sg-color-tooltip-bg / --sg-color-tooltip-text."
        [code]="tokensSource"
      >
        <div class="ng-tt-brand">
          <span sg-tooltip title="Brand-coloured tooltip"
            ><button sg-button>Brand tip</button></span
          >
          <span sg-tooltip title="Rounder corners here too" placement="bottom"
            ><button sg-button>Bottom</button></span
          >
        </div>
      </sg-demo-box>

      <sg-demo-box
        title="Unstyled"
        description="unstyled drops every sg-tooltip-* class — keep hover behaviour + ARIA wiring."
        [code]="unstyledSource"
      >
        <ng-template #pill>
          <div class="ng-tt-pill">Fully custom look</div>
        </ng-template>
        <span sg-tooltip unstyled [titleTemplate]="pill">
          <button sg-button>Hover me</button>
        </span>
      </sg-demo-box>

      <sg-props-table title="Tooltip API" [data]="props"></sg-props-table>
      <sg-css-vars-table
        [data]="cssVars"
        hint="Tooltip ships two component-local tokens. Customise the radius via the global --sg-border-radius-sm."
      ></sg-css-vars-table>
    </sg-component-doc>
  `,
  styles: [
    `
      .info-icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 18px;
        height: 18px;
        border-radius: 50%;
        background: var(--sg-color-bg-container-disabled, #e5e7eb);
        color: var(--sg-color-text-secondary, #4b5563);
        font-size: 12px;
        cursor: help;
        user-select: none;
      }
      :host ::ng-deep .ng-tt-brand {
        --sg-color-tooltip-bg: #7c3aed;
        --sg-color-tooltip-text: #faf5ff;
        --sg-border-radius-sm: 8px;
        display: flex;
        gap: 12px;
      }
      .ng-tt-pill {
        background: #0f172a;
        color: #e2e8f0;
        padding: 6px 10px;
        border-radius: 6px;
        font-size: 12px;
        white-space: nowrap;
        margin-top: 8px;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
        display: inline-block;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TooltipPageComponent {
  protected readonly basicSource = BASIC_SOURCE
  protected readonly placementSource = PLACEMENT_SOURCE
  protected readonly iconSource = ICON_SOURCE
  protected readonly disabledSource = DISABLED_SOURCE
  protected readonly richSource = RICH_SOURCE
  protected readonly tokensSource = TOKENS_SOURCE
  protected readonly unstyledSource = UNSTYLED_SOURCE
  protected readonly props = PROPS
  protected readonly cssVars = CSS_VARS
}
