import { Injectable, signal } from '@angular/core'

export type SgNotificationType = 'success' | 'error' | 'warning' | 'info'

export type SgNotificationPlacement = 'topRight' | 'topLeft' | 'bottomRight' | 'bottomLeft'

export interface SgNotificationConfig {
  type?: SgNotificationType
  message: string
  description?: string
  /** ms; `0` disables auto-close. @default 4500 */
  duration?: number
  key?: string
  placement?: SgNotificationPlacement
  onClose?: () => void
}

export interface SgNotificationItem extends SgNotificationConfig {
  id: string
}

let counter = 0

/**
 * Global notification store, mirrors the singleton
 * `notification.{open,success,error,warning,info,destroy}` API of React.
 *
 * Mount one `<sg-notification-container [placement]="…">` per corner you
 * intend to use, then inject `SgNotificationService` and call `open(...)`.
 */
@Injectable({ providedIn: 'root' })
export class SgNotificationService {
  readonly items = signal<SgNotificationItem[]>([])

  open(config: SgNotificationConfig): string {
    const id = config.key ?? `sg-notif-${++counter}`
    const item: SgNotificationItem = { ...config, id }
    this.items.update((curr) => [...curr, item])
    const duration = config.duration ?? 4500
    if (duration > 0) setTimeout(() => this.close(id), duration)
    return id
  }

  success(message: string, description?: string): string {
    return this.open({ type: 'success', message, description })
  }
  error(message: string, description?: string): string {
    return this.open({ type: 'error', message, description })
  }
  warning(message: string, description?: string): string {
    return this.open({ type: 'warning', message, description })
  }
  info(message: string, description?: string): string {
    return this.open({ type: 'info', message, description })
  }

  close(id: string): void {
    const item = this.items().find((i) => i.id === id)
    this.items.update((curr) => curr.filter((i) => i.id !== id))
    item?.onClose?.()
  }

  destroy(): void {
    this.items.set([])
  }
}
