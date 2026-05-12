import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { SgTagComponent } from '@skygraph/angular'
import {
  ComponentDocComponent,
  DemoBoxComponent,
  PropsTableComponent,
  type PropDef,
} from '../../../shared/demo'

const PRESETS_SOURCE = `<span sg-tag>Default</span>
<span sg-tag color="success">Success</span>
<span sg-tag color="processing">Processing</span>
<span sg-tag color="warning">Warning</span>
<span sg-tag color="error">Error</span>`

const CUSTOM_SOURCE = `<span sg-tag color="#1677ff">#1677ff</span>
<span sg-tag color="#52c41a">#52c41a</span>
<span sg-tag color="#722ed1">#722ed1</span>`

const BORDERLESS_SOURCE = `<span sg-tag color="success" [bordered]="false">Success</span>
<span sg-tag color="warning" [bordered]="false">Warning</span>`

const CLOSABLE_SOURCE = `@for (t of openTags(); track t) {
  <span sg-tag color="processing" closable (closed)="remove(t)">{{ t }}</span>
}`

const TAG_PROPS: PropDef[] = [
  {
    name: 'color',
    description: 'Preset palette name or custom CSS color.',
    type: "'default' | 'success' | 'processing' | 'warning' | 'error' | string",
    default: "'default'",
  },
  { name: 'bordered', description: 'Render the 1px border.', type: 'boolean', default: 'true' },
  {
    name: 'closable',
    description: 'Render the close (×) button.',
    type: 'boolean',
    default: 'false',
  },
  {
    name: '(closed)',
    description: 'Fires after the close button is clicked.',
    type: 'EventEmitter<void>',
  },
]

@Component({
  selector: 'sg-tag-page',
  standalone: true,
  imports: [SgTagComponent, ComponentDocComponent, DemoBoxComponent, PropsTableComponent],
  template: `
    <sg-component-doc
      title="Tag"
      description="Compact label for status, category, or removable selection. Preset semantic colors plus borderless and closable variants."
      [crumbs]="['Data Display', 'Tag']"
      [whenToUse]="[
        'For status badges in tables and lists.',
        'For removable filters / selected items.',
        'For at-a-glance categorisation in cards.',
      ]"
    >
      <sg-demo-box
        title="Preset colors"
        description="Five semantic presets that swap with the active theme."
        [code]="presetsSource"
      >
        <span sg-tag>Default</span>
        <span sg-tag color="success">Success</span>
        <span sg-tag color="processing">Processing</span>
        <span sg-tag color="warning">Warning</span>
        <span sg-tag color="error">Error</span>
      </sg-demo-box>

      <sg-demo-box
        title="Custom colors"
        description="Pass any CSS color literal — the component picks readable text/border automatically."
        [code]="customSource"
      >
        <span sg-tag color="#1677ff">#1677ff</span>
        <span sg-tag color="#52c41a">#52c41a</span>
        <span sg-tag color="#722ed1">#722ed1</span>
      </sg-demo-box>

      <sg-demo-box
        title="Borderless"
        description="Drop the 1px border for a softer in-text look."
        [code]="borderlessSource"
      >
        <span sg-tag color="success" [bordered]="false">Success</span>
        <span sg-tag color="warning" [bordered]="false">Warning</span>
      </sg-demo-box>

      <sg-demo-box
        title="Closable"
        description="Add a close (×) button. (closed) fires after the click — track and dismiss in your model."
        [code]="closableSource"
      >
        @for (t of openTags(); track t) {
          <span sg-tag color="processing" closable (closed)="remove(t)">{{ t }}</span>
        }
      </sg-demo-box>

      <sg-props-table [data]="tagProps"></sg-props-table>
    </sg-component-doc>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagPageComponent {
  readonly openTags = signal(['Alpha', 'Beta', 'Gamma'])

  protected readonly presetsSource = PRESETS_SOURCE
  protected readonly customSource = CUSTOM_SOURCE
  protected readonly borderlessSource = BORDERLESS_SOURCE
  protected readonly closableSource = CLOSABLE_SOURCE
  protected readonly tagProps = TAG_PROPS

  remove(t: string): void {
    this.openTags.update((arr) => arr.filter((x) => x !== t))
  }
}
