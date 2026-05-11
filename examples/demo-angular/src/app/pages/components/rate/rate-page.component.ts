import { ChangeDetectionStrategy, Component } from '@angular/core'
import { SgRateComponent } from '@skygraph/angular'
import { PAGE_STYLES } from '../_shared/page.styles'

@Component({
  selector: 'sg-rate-page',
  standalone: true,
  imports: [SgRateComponent],
  template: `
    <h1>Rate</h1>
    <p class="lead">Star rating with hover preview, half-step, and arrow-key support.</p>

    <section class="demo-section">
      <h3>Default</h3>
      <div sg-rate [defaultValue]="3"></div>
    </section>

    <section class="demo-section">
      <h3>Allow half</h3>
      <div sg-rate [defaultValue]="2.5" allowHalf></div>
    </section>

    <section class="demo-section">
      <h3>Custom character</h3>
      <div sg-rate [defaultValue]="4" character="❤"></div>
    </section>

    <section class="demo-section">
      <h3>Disabled</h3>
      <div sg-rate [defaultValue]="3.5" allowHalf [disabled]="true"></div>
    </section>
  `,
  styles: [PAGE_STYLES],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RatePageComponent {}
