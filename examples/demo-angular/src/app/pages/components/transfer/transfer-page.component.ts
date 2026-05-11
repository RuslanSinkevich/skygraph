import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { SgTransferComponent, type SgTransferItem } from '@skygraph/angular'
import { PAGE_STYLES } from '../_shared/page.styles'

@Component({
  selector: 'sg-transfer-page',
  standalone: true,
  imports: [SgTransferComponent],
  template: `
    <h1>Transfer</h1>
    <p class="lead">
      Two-column shuttle with select-all and bulk move arrows. Search, pagination and one-way mode
      are deferred (<code>F-Transfer-Limited</code>).
    </p>

    <section class="demo-section">
      <h3>Default</h3>
      <sg-transfer
        [dataSource]="data"
        [titles]="['Available', 'Selected']"
        [targetKeys]="targetKeys()"
        (targetKeysChange)="targetKeys.set($event)"
      ></sg-transfer>
      <p class="meta">
        target = <code>[{{ targetKeys().join(', ') }}]</code>
      </p>
    </section>

    <section class="demo-section">
      <h3>Disabled</h3>
      <sg-transfer [dataSource]="data" [defaultTargetKeys]="['1', '3']" disabled></sg-transfer>
    </section>
  `,
  styles: [PAGE_STYLES],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransferPageComponent {
  readonly data: SgTransferItem[] = Array.from({ length: 8 }, (_, i) => ({
    key: String(i + 1),
    title: `Item ${i + 1}`,
    disabled: i === 6,
  }))
  readonly targetKeys = signal<string[]>(['2', '5'])
}
