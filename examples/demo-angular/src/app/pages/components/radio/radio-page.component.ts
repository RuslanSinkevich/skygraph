import { ChangeDetectionStrategy, Component } from '@angular/core'
import { SgRadioGroupComponent, type SgRadioOption } from '@skygraph/angular'
import { PAGE_STYLES } from '../_shared/page.styles'

@Component({
  selector: 'sg-radio-page',
  standalone: true,
  imports: [SgRadioGroupComponent],
  template: `
    <h1>Radio</h1>
    <p class="lead">Mutually exclusive group of options with horizontal/vertical layout.</p>

    <section class="demo-section">
      <h3>Horizontal</h3>
      <div sg-radio-group [options]="opts" [defaultValue]="'a'"></div>
    </section>

    <section class="demo-section">
      <h3>Vertical</h3>
      <div sg-radio-group [options]="opts" direction="vertical" [defaultValue]="'b'"></div>
    </section>

    <section class="demo-section">
      <h3>Disabled option</h3>
      <div sg-radio-group [options]="optsDisabled" [defaultValue]="'a'"></div>
    </section>

    <section class="demo-section">
      <h3>Two-way</h3>
      <div sg-radio-group [options]="opts" [(value)]="bound"></div>
      <p class="meta">value = {{ bound }}</p>
    </section>
  `,
  styles: [PAGE_STYLES],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioPageComponent {
  bound: string | number = 'a'
  readonly opts: SgRadioOption[] = [
    { label: 'Option A', value: 'a' },
    { label: 'Option B', value: 'b' },
    { label: 'Option C', value: 'c' },
  ]
  readonly optsDisabled: SgRadioOption[] = [
    { label: 'Available', value: 'a' },
    { label: 'Locked', value: 'b', disabled: true },
    { label: 'Available', value: 'c' },
  ]
}
