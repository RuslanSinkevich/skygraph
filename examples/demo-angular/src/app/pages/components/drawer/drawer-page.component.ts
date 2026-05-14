import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { SgButtonComponent, SgDrawerComponent } from '@skygraph/angular'
import {
  ComponentDocComponent,
  CssVarsTableComponent,
  type CssVarDef,
  DemoBoxComponent,
  PropsTableComponent,
  type PropDef,
} from '../../../shared/demo'

type Placement = 'left' | 'right' | 'top' | 'bottom'

const BASIC_SOURCE = `<button sg-button type="primary" (click)="open.set(true)">Open Drawer</button>
<sg-drawer [open]="open()" title="Basic Drawer" (closeChange)="open.set(false)">
  <p>Close with ESC, the × button, or by clicking the mask.</p>
</sg-drawer>`

const PLACEMENT_SOURCE = `<button sg-button *ngFor="let p of placements"
  (click)="placement.set(p); open.set(true)">{{ p }}</button>

<sg-drawer
  [open]="open()"
  [title]="placement() + ' Drawer'"
  [placement]="placement()"
  (closeChange)="open.set(false)"
>
  <p>Sliding in from the <b>{{ placement() }}</b>.</p>
</sg-drawer>`

const SIZES_SOURCE = `<button sg-button (click)="size.set('narrow')">Narrow</button>
<button sg-button (click)="size.set('wide')">Wide</button>
<button sg-button (click)="size.set('full')">Responsive</button>

<sg-drawer
  [open]="size() !== null"
  [title]="size() ? config[size()!].label : ''"
  [width]="size() ? config[size()!].width : 378"
  (closeChange)="size.set(null)"
>
  <p>width accepts any CSS length — px, %, vw all work.</p>
</sg-drawer>`

const FOOTER_SOURCE = `<button sg-button (click)="open.set(true)">Edit record</button>
<sg-drawer [open]="open()" title="Edit record" (closeChange)="open.set(false)">
  <p *ngFor="let i of [1,2,3,4,5,6,7,8]">Form row {{ i }} — scroll the body while the footer stays pinned.</p>
  <div sg-drawer-footer style="display:flex;gap:8px;justify-content:flex-end">
    <button sg-button (click)="open.set(false)">Cancel</button>
    <button sg-button type="primary" (click)="open.set(false)">Save</button>
  </div>
</sg-drawer>`

const NO_MASK_SOURCE = `<button sg-button (click)="mode.set('no-mask')">Open without mask</button>
<button sg-button (click)="mode.set('sticky')">Mask, but not closable</button>

<sg-drawer
  [open]="mode() === 'no-mask'"
  title="No mask"
  [mask]="false"
  [width]="320"
  (closeChange)="mode.set(null)"
>
  <p>The background stays interactive.</p>
</sg-drawer>
<sg-drawer
  [open]="mode() === 'sticky'"
  title="Mask but not closable"
  [maskClosable]="false"
  [width]="320"
  (closeChange)="mode.set(null)"
>
  <p>Mask is dim, clicks on it do nothing — use the × or ESC.</p>
</sg-drawer>`

const TOKENS_SOURCE = `<div class="dark-scope">
  <button sg-button (click)="open.set(true)">Open dark drawer</button>
  <sg-drawer [open]="open()" title="Dark theme" (closeChange)="open.set(false)">
    <p>Panel, mask, and shadow all follow the scoped tokens.</p>
  </sg-drawer>
</div>

.dark-scope {
  --sg-color-bg-elevated: #0f172a;
  --sg-color-border-secondary: rgba(148, 163, 184, 0.15);
  --sg-color-text: #e2e8f0;
  --sg-color-text-tertiary: #94a3b8;
  --sg-color-overlay: rgba(2, 6, 23, 0.7);
  --sg-shadow-lg: 0 18px 40px rgba(2, 6, 23, 0.5);
}`

const UNSTYLED_SOURCE = `<button sg-button (click)="open.set(true)">Open unstyled</button>
<sg-drawer
  unstyled
  className="ng-headless-drawer"
  [open]="open()"
  title="Unstyled"
  (closeChange)="open.set(false)"
>
  <p>Behaviour + a11y stay, painting is yours.</p>
</sg-drawer>

.ng-headless-drawer {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 320px;
  padding: 24px;
  background: #fff;
  box-shadow: -8px 0 24px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 12px;
}`

const PROPS: PropDef[] = [
  { name: 'open', description: 'Controls visibility', type: 'boolean', default: 'false' },
  {
    name: '(closeChange)',
    description: 'Fires on Escape, mask click, or close button',
    type: 'EventEmitter<void>',
  },
  { name: 'title', description: 'Header text — sets the accessible name', type: 'string' },
  {
    name: 'placement',
    description: 'Edge from which the panel enters',
    type: "'left' | 'right' | 'top' | 'bottom'",
    default: "'right'",
  },
  {
    name: 'width',
    description: 'Width for left/right placement',
    type: 'number | string',
    default: '378',
  },
  {
    name: 'height',
    description: 'Height for top/bottom placement',
    type: 'number | string',
    default: '378',
  },
  { name: 'closable', description: 'Show the × close control', type: 'boolean', default: 'true' },
  { name: 'mask', description: 'Render the dimmed backdrop', type: 'boolean', default: 'true' },
  {
    name: 'maskClosable',
    description: 'Clicking the mask closes the drawer',
    type: 'boolean',
    default: 'true',
  },
  {
    name: 'unstyled',
    description: 'Drop every sg-drawer-* class — keeps role/aria/Escape',
    type: 'boolean',
    default: 'false',
  },
  { name: 'className', description: 'Extra class on the panel element', type: 'string' },
]

const CSS_VARS: CssVarDef[] = [
  { name: 'sg-color-bg-elevated', default: '#ffffff', description: 'Panel background' },
  { name: 'sg-color-overlay', default: 'rgba(0,0,0,0.45)', description: 'Mask fill' },
  { name: 'sg-color-text', default: 'rgba(0,0,0,0.88)', description: 'Body text colour' },
  {
    name: 'sg-color-text-tertiary',
    default: 'rgba(0,0,0,0.45)',
    description: 'Close button icon colour',
  },
  {
    name: 'sg-color-border-secondary',
    default: 'var(--sg-gray-4)',
    description: 'Header / footer divider',
  },
  {
    name: 'sg-shadow-lg',
    default: '0 6px 16px rgba(0,0,0,0.08)',
    description: 'Panel drop shadow',
  },
  {
    name: 'sg-padding-xl',
    default: '24px',
    description: 'Header / body / footer horizontal padding',
  },
]

@Component({
  selector: 'sg-drawer-page',
  standalone: true,
  imports: [
    SgDrawerComponent,
    SgButtonComponent,
    ComponentDocComponent,
    DemoBoxComponent,
    PropsTableComponent,
    CssVarsTableComponent,
  ],
  template: `
    <sg-component-doc
      title="Drawer"
      [crumbs]="['Feedback', 'Drawer']"
      description="Slide-in side panel with mask, optional header, close button, and focus trap. Renders inline — see decision D7."
      [whenToUse]="[
        'For task-oriented side panels — editing a record without leaving the list.',
        'For mobile menus and contextual settings.',
        'For inspecting detail in dense tables.',
      ]"
    >
      <sg-demo-box
        title="Basic"
        description="Toggle open to slide in. ESC, mask click, and close button all close."
        [code]="basicSource"
      >
        <button sg-button type="primary" (click)="basicOpen.set(true)">Open Drawer</button>
        <sg-drawer [open]="basicOpen()" title="Basic Drawer" (closeChange)="basicOpen.set(false)">
          <p>Some supplementary content lives here.</p>
          <p>Close with ESC, the × button, or by clicking the mask.</p>
        </sg-drawer>
      </sg-demo-box>

      <sg-demo-box
        title="Placement"
        description="Horizontal placements use width, vertical use height. Slide direction matches the edge."
        [code]="placementSource"
      >
        <div style="display:flex;gap:8px;flex-wrap:wrap">
          @for (p of placements; track p) {
            <button sg-button (click)="placement.set(p); placementOpen.set(true)">{{ p }}</button>
          }
        </div>
        <sg-drawer
          [open]="placementOpen()"
          [title]="placement() + ' Drawer'"
          [placement]="placement()"
          (closeChange)="placementOpen.set(false)"
        >
          <p>
            Sliding in from the <b>{{ placement() }}</b
            >.
          </p>
        </sg-drawer>
      </sg-demo-box>

      <sg-demo-box
        title="Sizes"
        description="width / height accept any CSS length. Use percentages for fully responsive drawers."
        [code]="sizesSource"
      >
        <div style="display:flex;gap:8px;flex-wrap:wrap">
          <button sg-button (click)="size.set('narrow')">Narrow</button>
          <button sg-button (click)="size.set('wide')">Wide</button>
          <button sg-button (click)="size.set('full')">Responsive</button>
        </div>
        <sg-drawer
          [open]="size() !== null"
          [title]="currentSizeLabel()"
          [width]="currentSizeWidth()"
          (closeChange)="size.set(null)"
        >
          <p>Change <code>width</code> to any CSS length — px, %, vw all work.</p>
        </sg-drawer>
      </sg-demo-box>

      <sg-demo-box
        title="Footer"
        description="Project content with [sg-drawer-footer] — sticky region under the scrolling body."
        [code]="footerSource"
      >
        <button sg-button (click)="footerOpen.set(true)">Edit record</button>
        <sg-drawer
          [open]="footerOpen()"
          title="Edit record"
          [width]="420"
          (closeChange)="footerOpen.set(false)"
        >
          @for (i of footerRows; track i) {
            <p>Form row {{ i }} — scroll the body while the footer stays pinned.</p>
          }
          <div sg-drawer-footer style="display:flex;gap:8px;justify-content:flex-end">
            <button sg-button (click)="footerOpen.set(false)">Cancel</button>
            <button sg-button type="primary" (click)="footerOpen.set(false)">Save</button>
          </div>
        </sg-drawer>
      </sg-demo-box>

      <sg-demo-box
        title="No mask / sticky"
        description="mask=false keeps the background interactive. maskClosable=false forces explicit dismissal."
        [code]="noMaskSource"
      >
        <div style="display:flex;gap:8px;flex-wrap:wrap">
          <button sg-button (click)="mode.set('no-mask')">Open without mask</button>
          <button sg-button (click)="mode.set('sticky')">Mask, but not closable</button>
        </div>
        <sg-drawer
          [open]="mode() === 'no-mask'"
          title="No mask"
          [mask]="false"
          [width]="320"
          (closeChange)="mode.set(null)"
        >
          <p>The background stays interactive.</p>
        </sg-drawer>
        <sg-drawer
          [open]="mode() === 'sticky'"
          title="Mask but not closable"
          [maskClosable]="false"
          [width]="320"
          (closeChange)="mode.set(null)"
        >
          <p>Mask is dim, clicks on it do nothing — use the × or ESC.</p>
        </sg-drawer>
      </sg-demo-box>

      <sg-demo-box
        title="Token override"
        description="Drawer has no component-specific tokens — compose --sg-color-bg-elevated, --sg-color-overlay, --sg-shadow-lg."
        [code]="tokensSource"
      >
        <div class="ng-drawer-dark">
          <button sg-button (click)="tokensOpen.set(true)">Open dark drawer</button>
          <sg-drawer [open]="tokensOpen()" title="Dark theme" (closeChange)="tokensOpen.set(false)">
            <p style="color:inherit">
              Panel, mask, and shadow all follow the scoped tokens — drop this wrapper higher in the
              tree for a theme-wide dark drawer.
            </p>
          </sg-drawer>
        </div>
      </sg-demo-box>

      <sg-demo-box
        title="Unstyled"
        description="unstyled drops slide animation, mask, and every sg-drawer-* class — focus trap, ESC, and ARIA stay."
        [code]="unstyledSource"
      >
        <button sg-button (click)="headless.set(true)">Open unstyled</button>
        <sg-drawer
          unstyled
          className="ng-headless-drawer"
          [open]="headless()"
          title="Unstyled"
          (closeChange)="headless.set(false)"
        >
          <p>Behaviour + a11y stay, painting is yours.</p>
        </sg-drawer>
      </sg-demo-box>

      <sg-props-table title="Drawer API" [data]="props"></sg-props-table>
      <sg-css-vars-table
        [data]="cssVars"
        hint="Drawer composes the surface palette. Override --sg-color-bg-elevated / --sg-shadow-lg on a wrapping div to re-skin."
      ></sg-css-vars-table>
    </sg-component-doc>
  `,
  styles: [
    `
      :host ::ng-deep .ng-drawer-dark {
        --sg-color-bg-elevated: #0f172a;
        --sg-color-border-secondary: rgba(148, 163, 184, 0.15);
        --sg-color-text: #e2e8f0;
        --sg-color-text-tertiary: #94a3b8;
        --sg-color-overlay: rgba(2, 6, 23, 0.7);
        --sg-shadow-lg: 0 18px 40px rgba(2, 6, 23, 0.5);
      }
      :host ::ng-deep .ng-headless-drawer {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        width: 320px;
        padding: 24px;
        background: #fff;
        box-shadow: -8px 0 24px rgba(0, 0, 0, 0.15);
        z-index: 1000;
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DrawerPageComponent {
  protected readonly placements: Placement[] = ['left', 'right', 'top', 'bottom']
  protected readonly footerRows = [1, 2, 3, 4, 5, 6, 7, 8]
  protected readonly basicOpen = signal(false)
  protected readonly placementOpen = signal(false)
  protected readonly placement = signal<Placement>('right')
  protected readonly size = signal<null | 'narrow' | 'wide' | 'full'>(null)
  protected readonly footerOpen = signal(false)
  protected readonly mode = signal<null | 'no-mask' | 'sticky'>(null)
  protected readonly tokensOpen = signal(false)
  protected readonly headless = signal(false)

  protected readonly sizeConfig = {
    narrow: { width: 280, label: 'Narrow (280px)' },
    wide: { width: 640, label: 'Wide (640px)' },
    full: { width: '90%' as const, label: 'Responsive (90%)' },
  }

  protected readonly basicSource = BASIC_SOURCE
  protected readonly placementSource = PLACEMENT_SOURCE
  protected readonly sizesSource = SIZES_SOURCE
  protected readonly footerSource = FOOTER_SOURCE
  protected readonly noMaskSource = NO_MASK_SOURCE
  protected readonly tokensSource = TOKENS_SOURCE
  protected readonly unstyledSource = UNSTYLED_SOURCE
  protected readonly props = PROPS
  protected readonly cssVars = CSS_VARS

  protected currentSizeLabel(): string {
    const s = this.size()
    return s ? this.sizeConfig[s].label : ''
  }
  protected currentSizeWidth(): number | string {
    const s = this.size()
    return s ? this.sizeConfig[s].width : 378
  }
}
