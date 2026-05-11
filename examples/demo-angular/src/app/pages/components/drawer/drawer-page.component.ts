import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { SgButtonComponent, SgDrawerComponent } from '@skygraph/angular'
import { PAGE_STYLES } from '../_shared/page.styles'

@Component({
  selector: 'sg-drawer-page',
  standalone: true,
  imports: [SgDrawerComponent, SgButtonComponent],
  template: `
    <h1>Drawer</h1>
    <p class="lead">
      Slide-in side panel with mask, optional header / close button. Renders inline in Wave 4.2 (no
      portal — see decision D7).
    </p>

    <section class="demo-section">
      <h3>Right (default)</h3>
      <button sg-button type="primary" (click)="open1.set(true)">Open right drawer</button>
      <sg-drawer [open]="open1()" title="Right" (closeChange)="open1.set(false)">
        <p>Right-side body content.</p>
      </sg-drawer>
    </section>

    <section class="demo-section">
      <h3>Bottom</h3>
      <button sg-button (click)="open2.set(true)">Open bottom drawer</button>
      <sg-drawer
        [open]="open2()"
        title="Bottom"
        placement="bottom"
        (closeChange)="open2.set(false)"
      >
        Bottom drawer body.
      </sg-drawer>
    </section>
  `,
  styles: [PAGE_STYLES],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DrawerPageComponent {
  readonly open1 = signal(false)
  readonly open2 = signal(false)
}
