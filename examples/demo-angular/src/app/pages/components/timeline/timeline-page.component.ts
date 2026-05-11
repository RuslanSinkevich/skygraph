import { ChangeDetectionStrategy, Component } from '@angular/core'
import { SgTimelineComponent, type SgTimelineItem } from '@skygraph/angular'
import { PAGE_STYLES } from '../_shared/page.styles'

@Component({
  selector: 'sg-timeline-page',
  standalone: true,
  imports: [SgTimelineComponent],
  template: `
    <h1>Timeline</h1>
    <p class="lead">
      Vertical chronological timeline. Item bodies and dots are
      <code>string</code> in Wave 4.2 (decision <code>D2</code>) — rich
      <code>TemplateRef</code> slots are deferred.
    </p>

    <section class="demo-section">
      <h3>Default (left)</h3>
      <ul sg-timeline [items]="basic"></ul>
    </section>

    <section class="demo-section">
      <h3>Colored dots & labels</h3>
      <ul sg-timeline [items]="colored"></ul>
    </section>

    <section class="demo-section">
      <h3>Alternate</h3>
      <ul sg-timeline mode="alternate" [items]="basic"></ul>
    </section>

    <section class="demo-section">
      <h3>Pending</h3>
      <ul sg-timeline [items]="basic" pending="Recording…" pendingDot="◌"></ul>
    </section>

    <section class="demo-section">
      <h3>Reverse</h3>
      <ul sg-timeline [items]="basic" reverse></ul>
    </section>
  `,
  styles: [PAGE_STYLES],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimelinePageComponent {
  readonly basic: SgTimelineItem[] = [
    { content: 'Created the repository' },
    { content: 'Pushed v0.1.0 release' },
    { content: 'CI pipeline went green' },
    { content: 'Shipped to production' },
  ]
  readonly colored: SgTimelineItem[] = [
    { label: '09:30', content: 'Build started', color: '#1677ff' },
    { label: '09:42', content: 'Tests passed', color: '#52c41a' },
    { label: '09:45', content: 'Deploy queued', color: '#faad14' },
    { label: '09:51', content: 'Live', color: '#52c41a', dot: '✓' },
  ]
}
