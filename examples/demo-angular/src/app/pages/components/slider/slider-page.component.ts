import { ChangeDetectionStrategy, Component } from '@angular/core'
import { SgSliderComponent } from '@skygraph/angular'
import { PAGE_STYLES } from '../_shared/page.styles'

@Component({
  selector: 'sg-slider-page',
  standalone: true,
  imports: [SgSliderComponent],
  template: `
    <h1>Slider</h1>
    <p class="lead">Pick a number with pointer or arrow keys.</p>

    <section class="demo-section">
      <h3>Default</h3>
      <div sg-slider [defaultValue]="20" style="width: 360px"></div>
    </section>

    <section class="demo-section">
      <h3>Two-way</h3>
      <div sg-slider [(value)]="bound" [step]="5" style="width: 360px"></div>
      <p class="meta">value = {{ bound }}</p>
    </section>

    <section class="demo-section">
      <h3>Disabled</h3>
      <div sg-slider [defaultValue]="50" [disabled]="true" style="width: 360px"></div>
    </section>
  `,
  styles: [PAGE_STYLES],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SliderPageComponent {
  bound = 30
}
