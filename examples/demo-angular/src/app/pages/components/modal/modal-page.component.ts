import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { SgButtonComponent, SgModalComponent } from '@skygraph/angular'
import { PAGE_STYLES } from '../_shared/page.styles'

@Component({
  selector: 'sg-modal-page',
  standalone: true,
  imports: [SgModalComponent, SgButtonComponent],
  template: `
    <h1>Modal</h1>
    <p class="lead">
      Centered dialog with mask, optional header / footer, focus on first tabbable element, and
      Escape to close. Wave 4.2 renders inline (no CDK Overlay) — see decision D7.
    </p>

    <section class="demo-section">
      <h3>Basic</h3>
      <button sg-button type="primary" (click)="open1.set(true)">Open</button>
      <sg-modal [open]="open1()" title="Hello" (closeChange)="open1.set(false)">
        Body content goes here.
      </sg-modal>
    </section>

    <section class="demo-section">
      <h3>With OK / Cancel</h3>
      <button sg-button (click)="open2.set(true)">Open with confirm</button>
      <sg-modal [open]="open2()" title="Confirm" (closeChange)="open2.set(false)" (ok)="onOk()">
        Are you sure you want to proceed?
      </sg-modal>
    </section>
  `,
  styles: [PAGE_STYLES],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalPageComponent {
  readonly open1 = signal(false)
  readonly open2 = signal(false)

  onOk(): void {
    this.open2.set(false)
  }
}
