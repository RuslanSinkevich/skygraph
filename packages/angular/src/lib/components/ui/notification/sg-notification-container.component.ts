import { ChangeDetectionStrategy, Component, Input, computed, inject } from '@angular/core'
import { injectSgConfig } from '../../../config/inject-sg-config'
import {
  SgNotificationService,
  type SgNotificationItem,
  type SgNotificationPlacement,
  type SgNotificationType,
} from './sg-notification.service'

const TYPE_ICONS: Record<SgNotificationType, string> = {
  success: '✓',
  error: '✕',
  warning: '⚠',
  info: 'ℹ',
}

/**
 * Element-selector toast container, DOM-equivalent of
 * `packages/react/src/components/ui/Notification.tsx`'s
 * `NotificationContainer`.
 *
 * Mount one per corner you intend to use:
 * `<sg-notification-container placement="topRight"></sg-notification-container>`.
 */
@Component({
  selector: 'sg-notification-container',
  standalone: true,
  template: `
    @for (item of filtered(); track item.id) {
      <div [class]="'sg-notification sg-notification-' + (item.type ?? 'info')" role="alert">
        <div class="sg-notification-icon">{{ icons[item.type ?? 'info'] }}</div>
        <div class="sg-notification-content">
          <div class="sg-notification-message">{{ item.message }}</div>
          @if (item.description) {
            <div class="sg-notification-description">{{ item.description }}</div>
          }
        </div>
        <button
          class="sg-notification-close"
          [attr.aria-label]="closeAriaLabel()"
          (click)="close(item)"
        >
          ×
        </button>
      </div>
    }
  `,
  host: {
    '[class]': 'classes()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SgNotificationContainerComponent {
  private readonly svc = inject(SgNotificationService)
  private readonly cfg = injectSgConfig()

  readonly icons = TYPE_ICONS

  @Input() placement: SgNotificationPlacement = 'topRight'

  readonly filtered = computed(() =>
    this.svc.items().filter((i) => (i.placement ?? 'topRight') === this.placement),
  )

  readonly classes = computed(() => `sg-notification-container sg-notification-${this.placement}`)

  readonly closeAriaLabel = computed(() => this.cfg.locale?.notification?.closeAriaLabel ?? 'Close')

  close(item: SgNotificationItem): void {
    this.svc.close(item.id)
  }
}
