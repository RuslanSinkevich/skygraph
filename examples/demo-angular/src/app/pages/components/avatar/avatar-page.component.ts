import { ChangeDetectionStrategy, Component } from '@angular/core'
import { SgAvatarComponent, SgBadgeComponent } from '@skygraph/angular'
import {
  ComponentDocComponent,
  CssVarsTableComponent,
  type CssVarDef,
  DemoBoxComponent,
  PropsTableComponent,
  type PropDef,
} from '../../../shared/demo'

const SIZES_SOURCE = `<span sg-avatar size="small">U</span>
<span sg-avatar>U</span>
<span sg-avatar size="large">U</span>
<span sg-avatar [size]="56">U</span>
<span sg-avatar [size]="72">U</span>`

const SHAPES_SOURCE = `<span sg-avatar size="large">C</span>
<span sg-avatar shape="square" size="large">S</span>
<span sg-avatar size="large" src="https://api.dicebear.com/7.x/miniavs/svg?seed=42" alt="Lisa"></span>
<span sg-avatar shape="square" size="large" src="https://api.dicebear.com/7.x/miniavs/svg?seed=42" alt="Lisa"></span>`

const FALLBACK_SOURCE = `<span sg-avatar size="large" src="https://api.dicebear.com/7.x/miniavs/svg?seed=3" alt="Photo"></span>
<span sg-avatar size="large" aria-label="Unknown user"><span aria-hidden="true">👤</span></span>
<span sg-avatar size="large">AB</span>
<span sg-avatar size="large">김</span>`

const COLORED_SOURCE = `@for (name of people; track name) {
  <span
    sg-avatar
    [attr.aria-label]="name"
    [style.background]="pickColor(name)"
    style="color:#fff"
  >{{ name.slice(0, 1) }}</span>
}`

const GROUP_SOURCE = `<div style="display:flex">
  @for (p of people; track p.name; let i = $index) {
    <span
      sg-avatar
      size="large"
      [src]="'https://api.dicebear.com/7.x/miniavs/svg?seed=' + p.seed"
      [alt]="p.name"
      [style.margin-left.px]="i === 0 ? 0 : -10"
      style="border:2px solid var(--sg-color-bg-container)"
    ></span>
  }
  <span
    sg-avatar
    size="large"
    aria-label="3 more people"
    style="
      margin-left:-10px;
      background: var(--sg-color-fill-secondary, #e5e7eb);
      color: var(--sg-color-text, #111);
      border: 2px solid var(--sg-color-bg-container);
      font-size: 12px;
    "
  >+3</span>
</div>`

const WITH_BADGE_SOURCE = `<span sg-badge dot color="var(--sg-color-success)" [offset]="[-4, 4]">
  <span sg-avatar size="large" src="https://api.dicebear.com/7.x/miniavs/svg?seed=9" alt="Alice"></span>
</span>
<span sg-badge [count]="4" [offset]="[-4, 4]">
  <span sg-avatar size="large" src="https://api.dicebear.com/7.x/miniavs/svg?seed=10" alt="Bob"></span>
</span>
<span sg-badge dot color="var(--sg-color-warning)" [offset]="[-4, 4]">
  <span sg-avatar size="large">CD</span>
</span>`

const TOKENS_SOURCE = `<style>
  .avatar-scope {
    --sg-border-radius: 12px;
    --sg-color-text-disabled: #7c3aed;
    --sg-color-white: #fef3c7;
  }
</style>
<div class="avatar-scope" style="display:flex;gap:12px;align-items:center">
  <span sg-avatar size="large">A</span>
  <span sg-avatar size="large" shape="square">B</span>
  <span sg-avatar size="large" shape="square">C</span>
</div>`

const UNSTYLED_SOURCE = `<span
  sg-avatar
  unstyled
  src="https://api.dicebear.com/7.x/miniavs/svg?seed=24"
  alt="Custom"
  class="my-avatar"
></span>

.my-avatar {
  display: inline-block;
  width: 56px;
  height: 56px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 6px 16px rgba(15, 23, 42, 0.2);
  background: #0f172a;
}`

const PROPS: PropDef[] = [
  {
    name: 'src',
    description: 'Image URL — falls back to projected content when missing',
    type: 'string',
  },
  { name: 'alt', description: 'Image alt text (also used for accessibility)', type: 'string' },
  { name: '<ng-content>', description: 'Fallback initials or icon node', type: 'slot' },
  {
    name: 'shape',
    description: 'Outer shape',
    type: "'circle' | 'square'",
    default: "'circle'",
  },
  {
    name: 'size',
    description: 'Preset name or pixel size',
    type: "'small' | 'middle' | 'large' | number",
    default: "'middle'",
  },
  {
    name: 'unstyled',
    description: 'Drop every sg-avatar-* class and the inline sizing',
    type: 'boolean',
    default: 'false',
  },
  { name: 'aria-label', description: 'Accessible name (use when no visible text)', type: 'string' },
]

const CSS_VARS: CssVarDef[] = [
  {
    name: 'sg-color-text-disabled',
    default: 'rgba(0,0,0,0.25)',
    description: 'Default avatar background (fallback mode)',
  },
  {
    name: 'sg-color-white',
    default: '#ffffff',
    description: 'Default text colour on the fallback background',
  },
  { name: 'sg-color-bg-container', default: '#ffffff', description: 'Group stack divider colour' },
  { name: 'sg-border-radius', default: '6px', description: 'Square corner radius' },
]

@Component({
  selector: 'sg-avatar-page',
  standalone: true,
  imports: [
    SgAvatarComponent,
    SgBadgeComponent,
    ComponentDocComponent,
    DemoBoxComponent,
    PropsTableComponent,
    CssVarsTableComponent,
  ],
  template: `
    <sg-component-doc
      title="Avatar"
      [crumbs]="['Data Display', 'Avatar']"
      description="Compact identity glyph — image, initials, or icon. Circle or rounded-square, with preset or pixel sizes."
      [whenToUse]="[
        'For user identity in lists, tables, comment threads.',
        'For team / group stacking (overlap with negative margin + border).',
        'As a presence anchor when combined with Badge dots.',
      ]"
    >
      <sg-demo-box
        title="Sizes"
        description="small (24px), middle (32px), large (40px), or any number for custom pixel sizes."
        [code]="sizesSource"
      >
        <div style="display:flex;gap:12px;align-items:center">
          <span sg-avatar size="small">U</span>
          <span sg-avatar>U</span>
          <span sg-avatar size="large">U</span>
          <span sg-avatar [size]="56">U</span>
          <span sg-avatar [size]="72">U</span>
        </div>
      </sg-demo-box>

      <sg-demo-box
        title="Shapes"
        description="Circle (default) or rounded square — square uses --sg-border-radius."
        [code]="shapesSource"
      >
        <div style="display:flex;gap:12px;align-items:center">
          <span sg-avatar size="large">C</span>
          <span sg-avatar shape="square" size="large">S</span>
          <span
            sg-avatar
            size="large"
            src="https://api.dicebear.com/7.x/miniavs/svg?seed=42"
            alt="Lisa"
          ></span>
          <span
            sg-avatar
            shape="square"
            size="large"
            src="https://api.dicebear.com/7.x/miniavs/svg?seed=42"
            alt="Lisa"
          ></span>
        </div>
      </sg-demo-box>

      <sg-demo-box
        title="Fallback chain"
        description="src → projected content. Use the initials / icon slot as a graceful degradation path."
        [code]="fallbackSource"
      >
        <div style="display:flex;gap:12px;align-items:center">
          <span
            sg-avatar
            size="large"
            src="https://api.dicebear.com/7.x/miniavs/svg?seed=3"
            alt="Photo"
          ></span>
          <span sg-avatar size="large" aria-label="Unknown user"
            ><span aria-hidden="true">👤</span></span
          >
          <span sg-avatar size="large">AB</span>
          <span sg-avatar size="large">김</span>
        </div>
      </sg-demo-box>

      <sg-demo-box
        title="Coloured initials"
        description="Hash the name to a palette and apply via inline style — the avatar keeps its text colour."
        [code]="coloredSource"
      >
        <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
          @for (name of people; track name) {
            <span
              sg-avatar
              [attr.aria-label]="name"
              [style.background]="pickColor(name)"
              style="color:#fff"
              >{{ name.charAt(0) }}</span
            >
          }
        </div>
      </sg-demo-box>

      <sg-demo-box
        title="Group stack"
        description="Overlap avatars with negative margin + matching border; reserve the last slot for a +N count."
        [code]="groupSource"
      >
        <div style="display:flex">
          @for (p of group; track p.name; let i = $index) {
            <span
              sg-avatar
              size="large"
              [src]="'https://api.dicebear.com/7.x/miniavs/svg?seed=' + p.seed"
              [alt]="p.name"
              [style.margin-left.px]="i === 0 ? 0 : -10"
              style="border:2px solid var(--sg-color-bg-container)"
            ></span>
          }
          <span
            sg-avatar
            size="large"
            aria-label="3 more people"
            style="
              margin-left:-10px;
              background: var(--sg-color-fill-secondary, #e5e7eb);
              color: var(--sg-color-text, #111);
              border: 2px solid var(--sg-color-bg-container);
              font-size: 12px;
            "
            >+3</span
          >
        </div>
      </sg-demo-box>

      <sg-demo-box
        title="With Badge"
        description="Wrap in a Badge to pin presence / notification indicators inside the circular edge."
        [code]="withBadgeSource"
      >
        <div style="display:flex;gap:24px;align-items:center">
          <span sg-badge dot color="var(--sg-color-success)" [offset]="[-4, 4]">
            <span
              sg-avatar
              size="large"
              src="https://api.dicebear.com/7.x/miniavs/svg?seed=9"
              alt="Alice"
            ></span>
          </span>
          <span sg-badge [count]="4" [offset]="[-4, 4]">
            <span
              sg-avatar
              size="large"
              src="https://api.dicebear.com/7.x/miniavs/svg?seed=10"
              alt="Bob"
            ></span>
          </span>
          <span sg-badge dot color="var(--sg-color-warning)" [offset]="[-4, 4]">
            <span sg-avatar size="large">CD</span>
          </span>
        </div>
      </sg-demo-box>

      <sg-demo-box
        title="Token override"
        description="Avatar has no component tokens — re-skin via global border-radius + fallback bg tokens."
        [code]="tokensSource"
      >
        <div class="ng-avatar-scope">
          <span sg-avatar size="large">A</span>
          <span sg-avatar size="large" shape="square">B</span>
          <span sg-avatar size="large" shape="square">C</span>
        </div>
      </sg-demo-box>

      <sg-demo-box
        title="Unstyled"
        description="unstyled drops the sg-avatar-* classes and the inline sizing — size + shape are your responsibility."
        [code]="unstyledSource"
      >
        <span
          sg-avatar
          unstyled
          src="https://api.dicebear.com/7.x/miniavs/svg?seed=24"
          alt="Custom"
          class="ng-avatar-headless"
        ></span>
      </sg-demo-box>

      <sg-props-table title="Avatar API" [data]="props"></sg-props-table>
      <sg-css-vars-table
        [data]="cssVars"
        hint="Avatar inherits global tokens — no component-local CSS variables."
      ></sg-css-vars-table>
    </sg-component-doc>
  `,
  styles: [
    `
      :host ::ng-deep .ng-avatar-scope {
        --sg-border-radius: 12px;
        --sg-color-text-disabled: #7c3aed;
        --sg-color-white: #fef3c7;
        display: flex;
        gap: 12px;
        align-items: center;
      }
      .ng-avatar-headless {
        display: inline-block;
        width: 56px;
        height: 56px;
        border-radius: 16px;
        overflow: hidden;
        box-shadow: 0 6px 16px rgba(15, 23, 42, 0.2);
        background: #0f172a;
      }
      .ng-avatar-headless img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarPageComponent {
  private static readonly PALETTE = [
    '#f97316',
    '#22c55e',
    '#3b82f6',
    '#a855f7',
    '#ef4444',
    '#0ea5e9',
    '#eab308',
  ]

  protected readonly people = ['Alice', 'Bob', 'Carol', 'Dmitry', 'Elena', 'Felix', 'Grace']
  protected readonly group = [
    { name: 'Alice', seed: 1 },
    { name: 'Bob', seed: 2 },
    { name: 'Carol', seed: 3 },
    { name: 'Dmitry', seed: 4 },
  ]

  protected readonly sizesSource = SIZES_SOURCE
  protected readonly shapesSource = SHAPES_SOURCE
  protected readonly fallbackSource = FALLBACK_SOURCE
  protected readonly coloredSource = COLORED_SOURCE
  protected readonly groupSource = GROUP_SOURCE
  protected readonly withBadgeSource = WITH_BADGE_SOURCE
  protected readonly tokensSource = TOKENS_SOURCE
  protected readonly unstyledSource = UNSTYLED_SOURCE
  protected readonly props = PROPS
  protected readonly cssVars = CSS_VARS

  protected pickColor(seed: string): string {
    let hash = 0
    for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) | 0
    return AvatarPageComponent.PALETTE[Math.abs(hash) % AvatarPageComponent.PALETTE.length]!
  }
}
