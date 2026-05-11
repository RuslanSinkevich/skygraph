import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { SgCalendarComponent } from '@skygraph/angular'
import { PAGE_STYLES } from '../_shared/page.styles'

@Component({
  selector: 'sg-calendar-page',
  standalone: true,
  imports: [SgCalendarComponent],
  template: `
    <h1>Calendar</h1>
    <p class="lead">
      Single-date month-view calendar with month / year navigation and "Today" button. Year mode,
      range selection, multi-select, event markers, week numbers, keyboard navigation and
      <code>cellRender</code> are deferred (<code>F-Calendar-Limited</code>).
    </p>

    <section class="demo-section">
      <h3>Default (fullscreen)</h3>
      <div sg-calendar [value]="value()" (valueChange)="value.set($event)"></div>
      <p class="meta">
        Selected: <code>{{ value()?.toDateString() ?? '∅' }}</code>
      </p>
    </section>

    <section class="demo-section">
      <h3>Compact card</h3>
      <div sg-calendar [fullscreen]="false"></div>
    </section>

    <section class="demo-section">
      <h3>Week starts on Monday</h3>
      <div sg-calendar [weekStartDay]="1"></div>
    </section>
  `,
  styles: [PAGE_STYLES],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarPageComponent {
  readonly value = signal<Date | null>(new Date())
}
