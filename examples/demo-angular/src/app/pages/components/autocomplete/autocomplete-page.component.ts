import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { SgAutoCompleteComponent, type SgAutoCompleteOption } from '@skygraph/angular'
import { PAGE_STYLES } from '../_shared/page.styles'

@Component({
  selector: 'sg-autocomplete-page',
  standalone: true,
  imports: [SgAutoCompleteComponent],
  template: `
    <h1>AutoComplete</h1>
    <p class="lead">
      Free-text input with a suggestion dropdown filtered client-side (case-insensitive by label).
      Inline rendering, no portal.
    </p>

    <section class="demo-section">
      <h3>Default</h3>
      <div class="row">
        <div
          sg-autocomplete
          [options]="cities"
          [value]="value()"
          (valueChange)="value.set($event)"
          placeholder="Type a city"
        ></div>
        <span class="meta"
          >value = <code>{{ value() }}</code></span
        >
      </div>
    </section>

    <section class="demo-section">
      <h3>Sizes</h3>
      <div class="row">
        <div sg-autocomplete size="small" [options]="cities"></div>
        <div sg-autocomplete size="middle" [options]="cities"></div>
        <div sg-autocomplete size="large" [options]="cities"></div>
      </div>
    </section>

    <section class="demo-section">
      <h3>Disabled & Loading</h3>
      <div class="row">
        <div sg-autocomplete [options]="cities" disabled value="Berlin"></div>
        <div sg-autocomplete [options]="cities" loading></div>
      </div>
    </section>
  `,
  styles: [PAGE_STYLES],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutoCompletePageComponent {
  readonly cities: SgAutoCompleteOption[] = [
    { label: 'Berlin', value: 'Berlin' },
    { label: 'Boston', value: 'Boston' },
    { label: 'Bangkok', value: 'Bangkok' },
    { label: 'Madrid', value: 'Madrid' },
    { label: 'Munich', value: 'Munich' },
    { label: 'Tokyo', value: 'Tokyo' },
  ]

  readonly value = signal('')
}
