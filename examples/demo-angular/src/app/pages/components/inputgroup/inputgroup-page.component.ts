import { ChangeDetectionStrategy, Component } from '@angular/core'
import { SgButtonComponent, SgInputComponent, SgInputGroupComponent } from '@skygraph/angular'
import {
  ComponentDocComponent,
  CssVarsTableComponent,
  type CssVarDef,
  DemoBoxComponent,
  PropsTableComponent,
  type PropDef,
} from '../../../shared/demo'

const URL_SOURCE = `<span sg-input-group>
  <span sg-input-group-before>https://</span>
  <span sg-input placeholder="example"></span>
  <span sg-input-group-after>.com</span>
</span>`

const SEARCH_SOURCE = `<span sg-input-group>
  <span sg-input placeholder="Find user"></span>
  <button sg-input-group-after sg-button type="primary">Search</button>
</span>`

const SIZES_SOURCE = `<span sg-input-group size="small">
  <span sg-input-group-before>$</span>
  <span sg-input placeholder="amount"></span>
</span>
<span sg-input-group>
  <span sg-input-group-before>$</span>
  <span sg-input placeholder="amount"></span>
</span>
<span sg-input-group size="large">
  <span sg-input-group-before>$</span>
  <span sg-input placeholder="amount"></span>
</span>`

const SPACED_SOURCE = `<span sg-input-group [compact]="false">
  <span sg-input-group-before>@</span>
  <span sg-input placeholder="username"></span>
  <button sg-input-group-after sg-button>Add</button>
</span>`

const TOKENS_SOURCE = `<style>
  .indigo-scope {
    --sg-color-bg-secondary: #eef2ff;
    --sg-color-border: #c7d2fe;
    --sg-border-radius: 10px;
  }
</style>
<div class="indigo-scope">
  <span sg-input-group>
    <span sg-input-group-before>https://</span>
    <span sg-input placeholder="example"></span>
    <span sg-input-group-after>.com</span>
  </span>
</div>`

const PROPS: PropDef[] = [
  {
    name: '[sg-input-group-before]',
    description: 'Projected addon rendered before the main control',
    type: 'slot',
  },
  {
    name: '[sg-input-group-after]',
    description: 'Projected addon rendered after the main control',
    type: 'slot',
  },
  {
    name: 'compact',
    description: 'Glue children together (no internal gap)',
    type: 'boolean',
    default: 'true',
  },
  {
    name: 'size',
    description: 'Size shared by all children (inherits from ConfigProvider)',
    type: "'small' | 'middle' | 'large'",
    default: "'middle'",
  },
]

const CSS_VARS: CssVarDef[] = [
  { name: 'sg-color-bg-secondary', default: 'var(--sg-gray-2)', description: 'Addon background' },
  { name: 'sg-color-border', default: 'var(--sg-color-border)', description: 'Addon border' },
  {
    name: 'sg-color-text-secondary',
    default: 'rgba(0,0,0,0.65)',
    description: 'Addon text colour',
  },
  { name: 'sg-border-radius', default: '6px', description: 'Outer corner radius' },
]

@Component({
  selector: 'sg-inputgroup-page',
  standalone: true,
  imports: [
    SgInputGroupComponent,
    SgInputComponent,
    SgButtonComponent,
    ComponentDocComponent,
    DemoBoxComponent,
    PropsTableComponent,
    CssVarsTableComponent,
  ],
  template: `
    <sg-component-doc
      title="InputGroup"
      [crumbs]="['Data Entry', 'InputGroup']"
      description="Compose an input with leading / trailing addons that share the input's border and corner radius."
      [whenToUse]="[
        'For URL / e-mail / phone composers — prefixes like https:// or @.',
        'For search bars with a primary Search button glued to the input.',
        'For unit-suffixed numeric inputs — kg, %, USD.',
      ]"
    >
      <sg-demo-box
        title="Prefix + suffix"
        description="Project content into the before / after slots — the wrapper glues borders + corners."
        [code]="urlSource"
      >
        <span sg-input-group>
          <span sg-input-group-before>https://</span>
          <span sg-input placeholder="example"></span>
          <span sg-input-group-after>.com</span>
        </span>
      </sg-demo-box>

      <sg-demo-box
        title="Search + button"
        description="The trailing addon can be a real button — the visual border is shared."
        [code]="searchSource"
      >
        <span sg-input-group>
          <span sg-input placeholder="Find user"></span>
          <button sg-input-group-after sg-button type="primary">Search</button>
        </span>
      </sg-demo-box>

      <sg-demo-box title="Sizes" description="Size cascades to every child." [code]="sizesSource">
        <div style="display:grid;gap:8px">
          <span sg-input-group size="small">
            <span sg-input-group-before>$</span>
            <span sg-input placeholder="amount"></span>
          </span>
          <span sg-input-group>
            <span sg-input-group-before>$</span>
            <span sg-input placeholder="amount"></span>
          </span>
          <span sg-input-group size="large">
            <span sg-input-group-before>$</span>
            <span sg-input placeholder="amount"></span>
          </span>
        </div>
      </sg-demo-box>

      <sg-demo-box
        title="Spaced (non-compact)"
        description="Pass [compact]=false to break the corner-sharing and keep individual radii."
        [code]="spacedSource"
      >
        <span sg-input-group [compact]="false">
          <span sg-input-group-before>@</span>
          <span sg-input placeholder="username"></span>
          <button sg-input-group-after sg-button>Add</button>
        </span>
      </sg-demo-box>

      <sg-demo-box
        title="Token override"
        description="Re-skin the addon palette via global background / border / radius tokens."
        [code]="tokensSource"
      >
        <div class="ng-group-indigo">
          <span sg-input-group>
            <span sg-input-group-before>https://</span>
            <span sg-input placeholder="example"></span>
            <span sg-input-group-after>.com</span>
          </span>
        </div>
      </sg-demo-box>

      <sg-props-table title="InputGroup API" [data]="props"></sg-props-table>
      <sg-css-vars-table
        [data]="cssVars"
        hint="InputGroup has no component-local tokens — addons borrow --sg-color-bg-secondary + --sg-color-border."
      ></sg-css-vars-table>
    </sg-component-doc>
  `,
  styles: [
    `
      :host ::ng-deep .ng-group-indigo {
        --sg-color-bg-secondary: #eef2ff;
        --sg-color-border: #c7d2fe;
        --sg-border-radius: 10px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputGroupPageComponent {
  protected readonly urlSource = URL_SOURCE
  protected readonly searchSource = SEARCH_SOURCE
  protected readonly sizesSource = SIZES_SOURCE
  protected readonly spacedSource = SPACED_SOURCE
  protected readonly tokensSource = TOKENS_SOURCE
  protected readonly props = PROPS
  protected readonly cssVars = CSS_VARS
}
