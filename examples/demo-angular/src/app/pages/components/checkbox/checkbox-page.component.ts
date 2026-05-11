import { ChangeDetectionStrategy, Component } from '@angular/core'
import { SgCheckboxComponent } from '@skygraph/angular'
import { PAGE_STYLES } from '../_shared/page.styles'

@Component({
  selector: 'sg-checkbox-page',
  standalone: true,
  imports: [SgCheckboxComponent],
  template: `
    <h1>Checkbox</h1>
    <p class="lead">Boolean choice with label, indeterminate and loading states.</p>

    <section class="demo-section">
      <h3>Basic</h3>
      <div class="row">
        <label sg-checkbox>Default</label>
        <label sg-checkbox [defaultValue]="true">Checked by default</label>
        <label sg-checkbox [disabled]="true">Disabled</label>
        <label sg-checkbox [defaultValue]="true" [disabled]="true">Disabled checked</label>
      </div>
    </section>

    <section class="demo-section">
      <h3>Indeterminate</h3>
      <label sg-checkbox [indeterminate]="true">Some selected</label>
    </section>

    <section class="demo-section">
      <h3>Loading</h3>
      <label sg-checkbox [loading]="true" [defaultValue]="true">Saving…</label>
    </section>

    <section class="demo-section">
      <h3>Two-way binding</h3>
      <div class="row">
        <label sg-checkbox [(value)]="agreed">I agree</label>
        <span class="meta">agreed = {{ agreed }}</span>
      </div>
    </section>
  `,
  styles: [PAGE_STYLES],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxPageComponent {
  agreed = false
}
