import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { SgSwitchComponent } from '@skygraph/angular'
import { PAGE_STYLES } from '../_shared/page.styles'

@Component({
  selector: 'sg-switch-page',
  standalone: true,
  imports: [SgSwitchComponent],
  template: `
    <h1>Switch</h1>
    <p class="lead">Toggle a single boolean value with optional on/off labels.</p>

    <section class="demo-section">
      <h3>Sizes</h3>
      <div class="row">
        <button sg-switch size="small"></button>
        <button sg-switch></button>
      </div>
    </section>

    <section class="demo-section">
      <h3>With labels</h3>
      <div class="row">
        <button sg-switch checkedChildren="On" unCheckedChildren="Off"></button>
        <button sg-switch [defaultValue]="true" checkedChildren="1" unCheckedChildren="0"></button>
      </div>
    </section>

    <section class="demo-section">
      <h3>States</h3>
      <div class="row">
        <button sg-switch [disabled]="true"></button>
        <button sg-switch [loading]="true" [defaultValue]="true"></button>
      </div>
    </section>

    <section class="demo-section">
      <h3>Two-way binding</h3>
      <div class="row">
        <button sg-switch [(value)]="bound"></button>
        <span class="meta">value = {{ bound }}</span>
      </div>
    </section>
  `,
  styles: [PAGE_STYLES],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SwitchPageComponent {
  bound = false
}
