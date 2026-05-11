import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { SgButtonComponent, SgDropdownComponent, type SgDropdownItem } from '@skygraph/angular'
import { PAGE_STYLES } from '../_shared/page.styles'

@Component({
  selector: 'sg-dropdown-page',
  standalone: true,
  imports: [SgDropdownComponent, SgButtonComponent],
  template: `
    <h1>Dropdown</h1>
    <p class="lead">
      Anchored menu opened by hover or click, with keyboard support (arrows / Enter / Esc) and
      outside-click close. Renders inline (no portal) — see decision D7.
    </p>

    <section class="demo-section">
      <h3>Click trigger</h3>
      <sg-dropdown [items]="items" trigger="click" (itemSelect)="lastClick.set($event)">
        <button sg-button>Open menu</button>
      </sg-dropdown>
      <p class="meta">Last selected: {{ lastClick() || '—' }}</p>
    </section>

    <section class="demo-section">
      <h3>Hover trigger</h3>
      <sg-dropdown [items]="items" trigger="hover">
        <button sg-button type="primary">Hover me</button>
      </sg-dropdown>
    </section>
  `,
  styles: [PAGE_STYLES],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownPageComponent {
  readonly items: SgDropdownItem[] = [
    { key: 'edit', label: 'Edit' },
    { key: 'duplicate', label: 'Duplicate' },
    { key: 'd1', label: '', divider: true },
    { key: 'delete', label: 'Delete', danger: true },
  ]
  readonly lastClick = signal<string>('')
}
