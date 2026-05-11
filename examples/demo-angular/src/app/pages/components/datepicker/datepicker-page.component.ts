import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { SgDatePickerComponent } from '@skygraph/angular'
import { PAGE_STYLES } from '../_shared/page.styles'

@Component({
  selector: 'sg-datepicker-page',
  standalone: true,
  imports: [SgDatePickerComponent],
  template: `
    <h1>DatePicker</h1>
    <p class="lead">
      Single-date picker with month/year navigation and a "Today" button. Time panel, presets, range
      picker and disabled-date predicates are deferred (<code>F-DatePicker-Limited</code>).
    </p>

    <section class="demo-section">
      <h3>Default</h3>
      <div class="row">
        <div sg-date-picker [value]="value()" (valueChange)="value.set($event)"></div>
        <span class="meta"
          >value = <code>{{ value() ? value()!.toISOString().slice(0, 10) : '∅' }}</code></span
        >
      </div>
    </section>

    <section class="demo-section">
      <h3>Custom format</h3>
      <div sg-date-picker format="DD.MM.YYYY" placeholder="dd.mm.yyyy"></div>
    </section>

    <section class="demo-section">
      <h3>Sizes</h3>
      <div class="row">
        <div sg-date-picker size="small"></div>
        <div sg-date-picker size="middle"></div>
        <div sg-date-picker size="large"></div>
      </div>
    </section>

    <section class="demo-section">
      <h3>Disabled</h3>
      <div sg-date-picker disabled [value]="value()"></div>
    </section>
  `,
  styles: [PAGE_STYLES],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatePickerPageComponent {
  readonly value = signal<Date | null>(new Date())
}
