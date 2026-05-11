import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { SgSegmentedComponent, type SgSegmentedOption } from '@skygraph/angular'
import { PAGE_STYLES } from '../_shared/page.styles'

@Component({
  selector: 'sg-segmented-page',
  standalone: true,
  imports: [SgSegmentedComponent],
  template: `
    <h1>Segmented</h1>
    <p class="lead">
      Mutually-exclusive segment picker — like a single-select pill group. Options can be plain
      strings or objects with optional icons.
    </p>

    <section class="demo-section">
      <h3>Strings</h3>
      <div sg-segmented [options]="['Daily', 'Weekly', 'Monthly']" [(value)]="v1"></div>
      <p class="meta">Selected: {{ v1() }}</p>
    </section>

    <section class="demo-section">
      <h3>With icons</h3>
      <div sg-segmented [options]="opts" [(value)]="v2"></div>
    </section>

    <section class="demo-section">
      <h3>Block</h3>
      <div sg-segmented [options]="['Left', 'Center', 'Right']" block [(value)]="v3"></div>
    </section>
  `,
  styles: [PAGE_STYLES],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SegmentedPageComponent {
  readonly opts: SgSegmentedOption[] = [
    { label: 'List', value: 'list', icon: '☰' },
    { label: 'Grid', value: 'grid', icon: '▦' },
    { label: 'Card', value: 'card', icon: '▢' },
  ]
  readonly v1 = signal('Daily')
  readonly v2 = signal('list')
  readonly v3 = signal('Center')
}
