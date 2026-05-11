import { ChangeDetectionStrategy, Component } from '@angular/core'
import { SgInputNumberComponent } from '@skygraph/angular'
import { PAGE_STYLES } from '../_shared/page.styles'

@Component({
  selector: 'sg-inputnumber-page',
  standalone: true,
  imports: [SgInputNumberComponent],
  template: `
    <h1>InputNumber</h1>
    <p class="lead">Numeric field with +/− stepper, clamping and precision.</p>

    <section class="demo-section">
      <h3>Default</h3>
      <span sg-input-number [defaultValue]="5"></span>
    </section>

    <section class="demo-section">
      <h3>With bounds</h3>
      <div class="row">
        <span sg-input-number [defaultValue]="0" [min]="-10" [max]="10" [step]="1"></span>
        <span sg-input-number [defaultValue]="0.5" [step]="0.1" [precision]="1"></span>
      </div>
    </section>

    <section class="demo-section">
      <h3>Two-way</h3>
      <div class="row">
        <span sg-input-number [(value)]="bound" [min]="0" [max]="100"></span>
        <span class="meta">value = {{ bound }}</span>
      </div>
    </section>
  `,
  styles: [PAGE_STYLES],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputNumberPageComponent {
  bound: number | null = 10
}
