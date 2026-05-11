import { ChangeDetectionStrategy, Component } from '@angular/core'
import { SgInputComponent } from '@skygraph/angular'
import { PAGE_STYLES } from '../_shared/page.styles'

@Component({
  selector: 'sg-input-page',
  standalone: true,
  imports: [SgInputComponent],
  template: `
    <h1>Input</h1>
    <p class="lead">Single-line text input with sizes, loading and read-only state.</p>

    <section class="demo-section">
      <h3>Sizes</h3>
      <div class="col">
        <span sg-input size="small" placeholder="Small"></span>
        <span sg-input placeholder="Middle (default)"></span>
        <span sg-input size="large" placeholder="Large"></span>
      </div>
    </section>

    <section class="demo-section">
      <h3>States</h3>
      <div class="col">
        <span sg-input value="readonly text" [readOnly]="true"></span>
        <span sg-input value="disabled" [disabled]="true"></span>
        <span sg-input value="loading…" [loading]="true"></span>
      </div>
    </section>

    <section class="demo-section">
      <h3>Two-way</h3>
      <div class="col">
        <span sg-input [(value)]="bound" placeholder="Type here"></span>
        <span class="meta">value = "{{ bound }}"</span>
      </div>
    </section>
  `,
  styles: [PAGE_STYLES],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputPageComponent {
  bound = ''
}
