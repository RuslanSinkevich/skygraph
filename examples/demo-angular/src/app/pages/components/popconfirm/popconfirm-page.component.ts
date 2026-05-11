import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { SgButtonComponent, SgPopconfirmComponent } from '@skygraph/angular'
import { PAGE_STYLES } from '../_shared/page.styles'

@Component({
  selector: 'sg-popconfirm-page',
  standalone: true,
  imports: [SgPopconfirmComponent, SgButtonComponent],
  template: `
    <h1>Popconfirm</h1>
    <p class="lead">
      Lightweight confirm bubble for destructive actions. Closes on outside click and after
      confirm/cancel.
    </p>

    <section class="demo-section">
      <h3>Default</h3>
      <sg-popconfirm
        title="Delete this item?"
        description="This action cannot be undone."
        (confirm)="onConfirm()"
        (cancel)="onCancel()"
      >
        <button sg-button danger>Delete</button>
      </sg-popconfirm>
      <p class="meta">Last action: {{ last() || '—' }}</p>
    </section>
  `,
  styles: [PAGE_STYLES],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopconfirmPageComponent {
  readonly last = signal('')

  onConfirm(): void {
    this.last.set('confirmed')
  }
  onCancel(): void {
    this.last.set('cancelled')
  }
}
