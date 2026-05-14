import { ChangeDetectionStrategy, Component } from '@angular/core'
import { SgCarouselComponent, SgCarouselSlideDirective } from '@skygraph/angular'
import {
  ComponentDocComponent,
  CssVarsTableComponent,
  type CssVarDef,
  DemoBoxComponent,
  PropsTableComponent,
  type PropDef,
} from '../../../shared/demo'

const PALETTE = ['#364d79', '#4a7c59', '#8b5e3c', '#6b3fa0']

const BASIC_SOURCE = `<div sg-carousel>
  <ng-template sg-carousel-slide *ngFor="let bg of palette; let i = index">
    <div class="slide" [style.background]="bg">Slide {{ i + 1 }}</div>
  </ng-template>
</div>`

const AUTOPLAY_SOURCE = `<div sg-carousel autoplay [autoplaySpeed]="2500">
  <ng-template sg-carousel-slide *ngFor="let bg of palette; let i = index">
    <div class="slide" [style.background]="bg">Auto {{ i + 1 }}</div>
  </ng-template>
</div>`

const DOT_POSITION_SOURCE = `<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
  <div sg-carousel dotPosition="top">
    <ng-template sg-carousel-slide *ngFor="let bg of palette; let i = index">
      <div class="slide" [style.background]="bg">Top {{ i + 1 }}</div>
    </ng-template>
  </div>
  <div sg-carousel dotPosition="right">
    <ng-template sg-carousel-slide *ngFor="let bg of palette; let i = index">
      <div class="slide" [style.background]="bg">Right {{ i + 1 }}</div>
    </ng-template>
  </div>
</div>`

const FADE_SOURCE = `<div sg-carousel effect="fade" autoplay>
  <ng-template sg-carousel-slide *ngFor="let bg of palette; let i = index">
    <div class="slide" [style.background]="bg">Fade {{ i + 1 }}</div>
  </ng-template>
</div>`

const HIDDEN_DOTS_SOURCE = `<div sg-carousel [dots]="false" autoplay>
  <ng-template sg-carousel-slide *ngFor="let bg of palette; let i = index">
    <div class="slide" [style.background]="bg">Clean {{ i + 1 }}</div>
  </ng-template>
</div>`

const TOKENS_SOURCE = `<style>
  .brand-scope {
    --sg-color-primary: #f97316;
    --sg-color-text-disabled: rgba(249, 115, 22, 0.25);
    --sg-color-text-tertiary: rgba(249, 115, 22, 0.55);
  }
</style>
<div class="brand-scope">
  <div sg-carousel>
    <ng-template sg-carousel-slide *ngFor="let bg of palette; let i = index">
      <div class="slide" [style.background]="bg">Brand {{ i + 1 }}</div>
    </ng-template>
  </div>
</div>`

const UNSTYLED_SOURCE = `<style>
  .ng-raw-carousel { display: flex; flex-direction: column; gap: 8px; }
  .ng-raw-carousel > :not(:last-child) { border-radius: 12px; overflow: hidden; }
  .ng-raw-carousel > div:last-child { display: flex; gap: 8px; }
  .ng-raw-carousel button { width: 28px; height: 28px; border-radius: 999px; border: 1px solid #e5e7eb; background: white; cursor: pointer; }
  .ng-raw-carousel button[aria-current='true'] { background: #111; color: white; border-color: #111; }
</style>
<div sg-carousel unstyled className="ng-raw-carousel">
  <ng-template sg-carousel-slide *ngFor="let bg of palette; let i = index">
    <div class="slide" [style.background]="bg">Raw {{ i + 1 }}</div>
  </ng-template>
</div>`

const PROPS: PropDef[] = [
  {
    name: 'autoplay',
    description: 'Cycles slides on a setInterval',
    type: 'boolean',
    default: 'false',
  },
  { name: 'autoplaySpeed', description: 'Step interval in ms', type: 'number', default: '3000' },
  { name: 'dots', description: 'Show dot navigation', type: 'boolean', default: 'true' },
  {
    name: 'dotPosition',
    description: 'Edge to dock the dots (left/right also flips layout to vertical)',
    type: "'top' | 'bottom' | 'left' | 'right'",
    default: "'bottom'",
  },
  {
    name: 'effect',
    description: 'Transition between slides',
    type: "'slide' | 'fade'",
    default: "'slide'",
  },
  {
    name: 'unstyled',
    description: 'Drop the container chrome — only the active slide + numeric buttons render',
    type: 'boolean',
    default: 'false',
  },
  { name: 'className', description: 'Extra class on the root wrapper', type: 'string' },
]

const CSS_VARS: CssVarDef[] = [
  { name: 'sg-color-primary', default: '#1677ff', description: 'Active dot fill' },
  { name: 'sg-color-text-disabled', default: 'rgba(0,0,0,0.25)', description: 'Idle dot fill' },
  { name: 'sg-color-text-tertiary', default: 'rgba(0,0,0,0.45)', description: 'Dot hover fill' },
  {
    name: 'sg-color-bg-container',
    default: '#ffffff',
    description: 'Track / dot panel background',
  },
  { name: 'sg-border-radius', default: '6px', description: 'Slide / dot corner radius' },
]

@Component({
  selector: 'sg-carousel-page',
  standalone: true,
  imports: [
    SgCarouselComponent,
    SgCarouselSlideDirective,
    ComponentDocComponent,
    DemoBoxComponent,
    PropsTableComponent,
    CssVarsTableComponent,
  ],
  template: `
    <sg-component-doc
      title="Carousel"
      [crumbs]="['Data Display', 'Carousel']"
      description="Cycles through child slides with optional autoplay, dot navigation, and slide or fade transitions."
      [whenToUse]="[
        'For rotating hero sections and feature showcases.',
        'For onboarding flows where each step is a self-contained card.',
        'For image / testimonial galleries.',
      ]"
    >
      <sg-demo-box
        title="Basic"
        description="Each direct slide template becomes one frame. Default effect is horizontal slide, dots sit at the bottom."
        [code]="basicSource"
      >
        <div sg-carousel>
          <ng-template sg-carousel-slide>
            <div class="slide" [style.background]="palette[0]">Slide 1</div>
          </ng-template>
          <ng-template sg-carousel-slide>
            <div class="slide" [style.background]="palette[1]">Slide 2</div>
          </ng-template>
          <ng-template sg-carousel-slide>
            <div class="slide" [style.background]="palette[2]">Slide 3</div>
          </ng-template>
          <ng-template sg-carousel-slide>
            <div class="slide" [style.background]="palette[3]">Slide 4</div>
          </ng-template>
        </div>
      </sg-demo-box>

      <sg-demo-box
        title="Autoplay"
        description="autoplay advances every autoplaySpeed ms (default 3000)."
        [code]="autoplaySource"
      >
        <div sg-carousel autoplay [autoplaySpeed]="2500">
          <ng-template sg-carousel-slide>
            <div class="slide" [style.background]="palette[0]">Auto 1</div>
          </ng-template>
          <ng-template sg-carousel-slide>
            <div class="slide" [style.background]="palette[1]">Auto 2</div>
          </ng-template>
          <ng-template sg-carousel-slide>
            <div class="slide" [style.background]="palette[2]">Auto 3</div>
          </ng-template>
          <ng-template sg-carousel-slide>
            <div class="slide" [style.background]="palette[3]">Auto 4</div>
          </ng-template>
        </div>
      </sg-demo-box>

      <sg-demo-box
        title="Dot position"
        description="Dots can dock on any edge. Left / right switch the carousel to vertical layout."
        [code]="dotPositionSource"
      >
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
          <div sg-carousel dotPosition="top">
            <ng-template sg-carousel-slide>
              <div class="slide" [style.background]="palette[0]">Top 1</div>
            </ng-template>
            <ng-template sg-carousel-slide>
              <div class="slide" [style.background]="palette[1]">Top 2</div>
            </ng-template>
            <ng-template sg-carousel-slide>
              <div class="slide" [style.background]="palette[2]">Top 3</div>
            </ng-template>
            <ng-template sg-carousel-slide>
              <div class="slide" [style.background]="palette[3]">Top 4</div>
            </ng-template>
          </div>
          <div sg-carousel dotPosition="right">
            <ng-template sg-carousel-slide>
              <div class="slide" [style.background]="palette[0]">Right 1</div>
            </ng-template>
            <ng-template sg-carousel-slide>
              <div class="slide" [style.background]="palette[1]">Right 2</div>
            </ng-template>
            <ng-template sg-carousel-slide>
              <div class="slide" [style.background]="palette[2]">Right 3</div>
            </ng-template>
            <ng-template sg-carousel-slide>
              <div class="slide" [style.background]="palette[3]">Right 4</div>
            </ng-template>
          </div>
        </div>
      </sg-demo-box>

      <sg-demo-box
        title="Fade"
        description="effect='fade' crossfades slides via opacity instead of translating the track."
        [code]="fadeSource"
      >
        <div sg-carousel effect="fade" autoplay>
          <ng-template sg-carousel-slide>
            <div class="slide" [style.background]="palette[0]">Fade 1</div>
          </ng-template>
          <ng-template sg-carousel-slide>
            <div class="slide" [style.background]="palette[1]">Fade 2</div>
          </ng-template>
          <ng-template sg-carousel-slide>
            <div class="slide" [style.background]="palette[2]">Fade 3</div>
          </ng-template>
          <ng-template sg-carousel-slide>
            <div class="slide" [style.background]="palette[3]">Fade 4</div>
          </ng-template>
        </div>
      </sg-demo-box>

      <sg-demo-box
        title="Hidden dots"
        description="dots=false hides the indicator strip — best for purely decorative carousels."
        [code]="hiddenDotsSource"
      >
        <div sg-carousel [dots]="false" autoplay>
          <ng-template sg-carousel-slide>
            <div class="slide" [style.background]="palette[0]">Clean 1</div>
          </ng-template>
          <ng-template sg-carousel-slide>
            <div class="slide" [style.background]="palette[1]">Clean 2</div>
          </ng-template>
          <ng-template sg-carousel-slide>
            <div class="slide" [style.background]="palette[2]">Clean 3</div>
          </ng-template>
          <ng-template sg-carousel-slide>
            <div class="slide" [style.background]="palette[3]">Clean 4</div>
          </ng-template>
        </div>
      </sg-demo-box>

      <sg-demo-box
        title="Token override"
        description="Active dot reads --sg-color-primary, idle dots use --sg-color-text-disabled."
        [code]="tokensSource"
      >
        <div class="ng-carousel-brand">
          <div sg-carousel>
            <ng-template sg-carousel-slide>
              <div class="slide" [style.background]="palette[0]">Brand 1</div>
            </ng-template>
            <ng-template sg-carousel-slide>
              <div class="slide" [style.background]="palette[1]">Brand 2</div>
            </ng-template>
            <ng-template sg-carousel-slide>
              <div class="slide" [style.background]="palette[2]">Brand 3</div>
            </ng-template>
            <ng-template sg-carousel-slide>
              <div class="slide" [style.background]="palette[3]">Brand 4</div>
            </ng-template>
          </div>
        </div>
      </sg-demo-box>

      <sg-demo-box
        title="Unstyled"
        description="unstyled drops the container chrome — only the active slide and numeric buttons render."
        [code]="unstyledSource"
      >
        <div sg-carousel unstyled className="ng-raw-carousel">
          <ng-template sg-carousel-slide>
            <div class="slide" [style.background]="palette[0]">Raw 1</div>
          </ng-template>
          <ng-template sg-carousel-slide>
            <div class="slide" [style.background]="palette[1]">Raw 2</div>
          </ng-template>
          <ng-template sg-carousel-slide>
            <div class="slide" [style.background]="palette[2]">Raw 3</div>
          </ng-template>
          <ng-template sg-carousel-slide>
            <div class="slide" [style.background]="palette[3]">Raw 4</div>
          </ng-template>
        </div>
      </sg-demo-box>

      <sg-props-table title="Carousel API" [data]="props"></sg-props-table>
      <sg-css-vars-table
        [data]="cssVars"
        hint="Component-specific tokens are pulled from the global palette — slide background is set per slide via the child element."
      ></sg-css-vars-table>
    </sg-component-doc>
  `,
  styles: [
    `
      .slide {
        height: 160px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 24px;
        font-weight: 600;
        border-radius: 8px;
      }
      :host ::ng-deep .ng-carousel-brand {
        --sg-color-primary: #f97316;
        --sg-color-text-disabled: rgba(249, 115, 22, 0.25);
        --sg-color-text-tertiary: rgba(249, 115, 22, 0.55);
      }
      :host ::ng-deep .ng-raw-carousel {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      :host ::ng-deep .ng-raw-carousel > :not(:last-child) {
        border-radius: 12px;
        overflow: hidden;
      }
      :host ::ng-deep .ng-raw-carousel > div:last-child {
        display: flex;
        gap: 8px;
      }
      :host ::ng-deep .ng-raw-carousel button {
        width: 28px;
        height: 28px;
        border-radius: 999px;
        border: 1px solid #e5e7eb;
        background: white;
        cursor: pointer;
      }
      :host ::ng-deep .ng-raw-carousel button[aria-current='true'] {
        background: #111;
        color: white;
        border-color: #111;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarouselPageComponent {
  protected readonly palette = PALETTE
  protected readonly basicSource = BASIC_SOURCE
  protected readonly autoplaySource = AUTOPLAY_SOURCE
  protected readonly dotPositionSource = DOT_POSITION_SOURCE
  protected readonly fadeSource = FADE_SOURCE
  protected readonly hiddenDotsSource = HIDDEN_DOTS_SOURCE
  protected readonly tokensSource = TOKENS_SOURCE
  protected readonly unstyledSource = UNSTYLED_SOURCE
  protected readonly props = PROPS
  protected readonly cssVars = CSS_VARS
}
