import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { SgTimePickerComponent } from '@skygraph/angular'
import { PAGE_STYLES } from '../_shared/page.styles'

@Component({
  selector: 'sg-timepicker-page',
  standalone: true,
  imports: [SgTimePickerComponent],
  template: `
    <h1>TimePicker</h1>
    <p class="lead">
      24-hour time picker with hour/minute (and optional second) columns, "Now" and "Clear" buttons.
      12-hour mode and disabled-slot predicates are deferred (<code>F-TimePicker-Limited</code>).
    </p>

    <section class="demo-section">
      <h3>Default (HH:mm)</h3>
      <div class="row">
        <div sg-time-picker [value]="value()" (valueChange)="value.set($event)"></div>
        <span class="meta"
          >value = <code>{{ value() || '∅' }}</code></span
        >
      </div>
    </section>

    <section class="demo-section">
      <h3>With seconds</h3>
      <div sg-time-picker showSecond format="HH:mm:ss"></div>
    </section>

    <section class="demo-section">
      <h3>Step controls</h3>
      <div class="row">
        <div sg-time-picker [hourStep]="2" [minuteStep]="15"></div>
        <span class="meta">2-hour, 15-minute steps</span>
      </div>
    </section>

    <section class="demo-section">
      <h3>Sizes</h3>
      <div class="row">
        <div sg-time-picker size="small"></div>
        <div sg-time-picker size="middle"></div>
        <div sg-time-picker size="large"></div>
      </div>
    </section>

    <section class="demo-section">
      <h3>Disabled</h3>
      <div sg-time-picker disabled value="09:30"></div>
    </section>
  `,
  styles: [PAGE_STYLES],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimePickerPageComponent {
  readonly value = signal<string>('')
}
