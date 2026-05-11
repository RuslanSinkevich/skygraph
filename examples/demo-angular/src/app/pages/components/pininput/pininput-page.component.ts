import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { SgPinInputComponent } from '@skygraph/angular'
import { PAGE_STYLES } from '../_shared/page.styles'

@Component({
  selector: 'sg-pininput-page',
  standalone: true,
  imports: [SgPinInputComponent],
  template: `
    <h1>PinInput</h1>
    <p class="lead">Fixed-length code input with paste / arrow / backspace navigation.</p>

    <section class="demo-section">
      <h3>4-digit numeric</h3>
      <div sg-pin-input length="4" (complete)="onDone($event)"></div>
    </section>

    <section class="demo-section">
      <h3>6-digit masked</h3>
      <div sg-pin-input length="6" mask="true"></div>
    </section>

    <section class="demo-section">
      <h3>Alphanumeric</h3>
      <div sg-pin-input length="5" type="alphanumeric"></div>
    </section>

    <p class="meta">last completed: "{{ done() }}"</p>
  `,
  styles: [PAGE_STYLES],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PinInputPageComponent {
  readonly done = signal('')
  onDone(v: string): void {
    this.done.set(v)
  }
}
