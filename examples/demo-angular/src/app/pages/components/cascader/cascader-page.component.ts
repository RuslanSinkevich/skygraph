import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { SgCascaderComponent, type SgCascaderOption } from '@skygraph/angular'
import { PAGE_STYLES } from '../_shared/page.styles'

@Component({
  selector: 'sg-cascader-page',
  standalone: true,
  imports: [SgCascaderComponent],
  template: `
    <h1>Cascader</h1>
    <p class="lead">
      Hierarchical single-select with click-to-expand columns. Wave 4.2 ships single-select only —
      multi-select, lazy
      <code>loadData</code>, search and <code>changeOnSelect</code> are deferred
      (<code>F-Cascader-Limited</code>).
    </p>

    <section class="demo-section">
      <h3>Default</h3>
      <div class="row">
        <div
          sg-cascader
          [options]="regions"
          [value]="value()"
          (valueChange)="value.set($event)"
          placeholder="Pick a region"
        ></div>
        <span class="meta"
          >value = <code>[{{ value().join(', ') }}]</code></span
        >
      </div>
    </section>

    <section class="demo-section">
      <h3>Sizes</h3>
      <div class="row">
        <div sg-cascader size="small" [options]="regions"></div>
        <div sg-cascader size="middle" [options]="regions"></div>
        <div sg-cascader size="large" [options]="regions"></div>
      </div>
    </section>

    <section class="demo-section">
      <h3>Disabled</h3>
      <div sg-cascader [options]="regions" disabled [value]="['eu', 'de', 'berlin']"></div>
    </section>
  `,
  styles: [PAGE_STYLES],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CascaderPageComponent {
  readonly regions: SgCascaderOption[] = [
    {
      label: 'Europe',
      value: 'eu',
      children: [
        {
          label: 'Germany',
          value: 'de',
          children: [
            { label: 'Berlin', value: 'berlin' },
            { label: 'Munich', value: 'munich' },
          ],
        },
        {
          label: 'France',
          value: 'fr',
          children: [{ label: 'Paris', value: 'paris' }],
        },
      ],
    },
    {
      label: 'Asia',
      value: 'asia',
      children: [
        {
          label: 'Japan',
          value: 'jp',
          children: [
            { label: 'Tokyo', value: 'tokyo' },
            { label: 'Osaka', value: 'osaka' },
          ],
        },
      ],
    },
  ]

  readonly value = signal<(string | number)[]>([])
}
