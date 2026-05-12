import { Injectable, signal } from '@angular/core'

/**
 * Tiny shared signal so `<sg-header>` can ask `<sg-app-shell>` to open
 * the mobile sidebar drawer without a parent/child query. Mirrors
 * `useAppShell()` from `_shared-react/layout/AppShell.tsx`.
 */
@Injectable({ providedIn: 'root' })
export class AppShellService {
  readonly sidebarOpen = signal(false)
  open(): void {
    this.sidebarOpen.set(true)
  }
  close(): void {
    this.sidebarOpen.set(false)
  }
  toggle(): void {
    this.sidebarOpen.update((v) => !v)
  }
}
