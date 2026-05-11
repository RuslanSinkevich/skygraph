import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { SgSelectComponent, type SgSelectOption } from '@skygraph/angular'
import { PAGE_STYLES } from '../_shared/page.styles'

@Component({
  selector: 'sg-select-page',
  standalone: true,
  imports: [SgSelectComponent],
  template: `
    <h1>Select</h1>
    <p class="lead">
      Single- and multi-select combobox with keyboard navigation. Renders inline (no portal) in Wave
      4.2 — see <code>F-Overlay-Inline</code>.
    </p>

    <section class="demo-section">
      <h3>Default (single)</h3>
      <div class="row">
        <div
          sg-select
          [options]="fruits"
          [value]="single()"
          (valueChange)="onSingle($event)"
          placeholder="Pick a fruit"
        ></div>
        <span class="meta"
          >value = <code>{{ single() ?? '∅' }}</code></span
        >
      </div>
    </section>

    <section class="demo-section">
      <h3>Multiple</h3>
      <div class="row">
        <div
          sg-select
          multiple
          [options]="fruits"
          [value]="multi()"
          (valueChange)="onMulti($event)"
          placeholder="Pick fruits"
        ></div>
        <span class="meta">{{ multi().length }} selected</span>
      </div>
    </section>

    <section class="demo-section">
      <h3>Sizes</h3>
      <div class="row">
        <div sg-select size="small" [options]="fruits"></div>
        <div sg-select size="middle" [options]="fruits"></div>
        <div sg-select size="large" [options]="fruits"></div>
      </div>
    </section>

    <section class="demo-section">
      <h3>Disabled & Loading</h3>
      <div class="row">
        <div sg-select [options]="fruits" disabled value="apple"></div>
        <div sg-select [options]="fruits" loading></div>
      </div>
    </section>
  `,
  styles: [PAGE_STYLES],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectPageComponent {
  readonly fruits: SgSelectOption[] = [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Cherry', value: 'cherry' },
    { label: 'Durian', value: 'durian', disabled: true },
    { label: 'Mango', value: 'mango' },
  ]

  readonly single = signal<string | number | undefined>('apple')
  readonly multi = signal<(string | number)[]>(['apple', 'mango'])

  onSingle(v: string | number | (string | number)[]): void {
    this.single.set(v as string | number)
  }
  onMulti(v: string | number | (string | number)[]): void {
    this.multi.set(v as (string | number)[])
  }
}
