import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import {
  SgButtonComponent,
  SgNotificationContainerComponent,
  SgNotificationService,
} from '@skygraph/angular'
import { PAGE_STYLES } from '../_shared/page.styles'

@Component({
  selector: 'sg-notification-page',
  standalone: true,
  imports: [SgNotificationContainerComponent, SgButtonComponent],
  template: `
    <h1>Notification</h1>
    <p class="lead">
      Global toast service with success / error / warning / info shorthand. Mount one container per
      corner you intend to use.
    </p>

    <section class="demo-section">
      <h3>Trigger</h3>
      <div class="row">
        <button sg-button type="primary" (click)="info()">Info</button>
        <button sg-button (click)="success()">Success</button>
        <button sg-button danger (click)="error()">Error</button>
        <button sg-button (click)="warn()">Warning</button>
      </div>
    </section>

    <sg-notification-container placement="topRight"></sg-notification-container>
  `,
  styles: [PAGE_STYLES],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationPageComponent {
  private readonly svc = inject(SgNotificationService)

  info(): void {
    this.svc.info('Heads up', 'A neutral message has arrived.')
  }
  success(): void {
    this.svc.success('Saved', 'Changes have been written.')
  }
  error(): void {
    this.svc.error('Failed', 'Something went wrong, retry later.')
  }
  warn(): void {
    this.svc.warning('Careful', 'You are leaving the page with unsaved changes.')
  }
}
