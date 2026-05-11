import { ChangeDetectionStrategy, Component } from '@angular/core'
import { SgDescriptionsComponent, type SgDescriptionsItem } from '@skygraph/angular'
import { PAGE_STYLES } from '../_shared/page.styles'

@Component({
  selector: 'sg-descriptions-page',
  standalone: true,
  imports: [SgDescriptionsComponent],
  template: `
    <h1>Descriptions</h1>
    <p class="lead">
      Compact key-value table for read-only data summaries. Supports bordered / borderless,
      horizontal / vertical layouts, and per-item column spans.
    </p>

    <section class="demo-section">
      <h3>Default</h3>
      <div sg-descriptions title="User profile" [items]="items" [column]="3"></div>
    </section>

    <section class="demo-section">
      <h3>Bordered</h3>
      <div sg-descriptions title="User profile" [items]="items" [column]="3" bordered></div>
    </section>

    <section class="demo-section">
      <h3>Vertical layout</h3>
      <div sg-descriptions [items]="items" layout="vertical" [column]="3" bordered></div>
    </section>
  `,
  styles: [PAGE_STYLES],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DescriptionsPageComponent {
  readonly items: SgDescriptionsItem[] = [
    { label: 'Name', value: 'Jane Doe' },
    { label: 'Phone', value: '+1 555 0100' },
    { label: 'Email', value: 'jane@example.com' },
    { label: 'Role', value: 'Engineer' },
    { label: 'Joined', value: '2024-03-12', span: 2 },
  ]
}
