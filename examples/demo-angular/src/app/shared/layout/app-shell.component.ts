import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  computed,
  effect,
  inject,
  input,
} from '@angular/core'
import { AppShellService } from './app-shell.service'

export type AppShellSection =
  | 'components'
  | 'showcases'
  | 'guide'
  | 'tokens'
  | 'changelog'
  | 'about'
  | 'landing'
  | null

/**
 * Top-level layout shell — Angular port of
 * `examples/_shared-react/src/layout/AppShell.tsx`. Renders the sticky
 * header, a contextual sidebar gutter (projected via the `[sidebar]`
 * slot) and a footer. Pages slot into `<sg-app-shell>` content via
 * `<router-outlet>`.
 *
 * `hasSidebar` is set externally because Angular's `<ng-content>`
 * projection cannot be queried from the parent (unlike Vue / React
 * children inspection). The host page passes `[hasSidebar]` based on
 * the route's section.
 */
@Component({
  selector: 'sg-app-shell',
  standalone: true,
  template: `
    <ng-content select="[appShellHeader]"></ng-content>
    <div class="xshell-body">
      @if (hasSidebar()) {
        <aside class="xshell-sidebar" aria-label="Section navigation">
          <ng-content select="[appShellSidebar]"></ng-content>
        </aside>
        <div class="xshell-sidebar-backdrop" (click)="shell.close()" aria-hidden="true"></div>
      }
      <main class="xshell-main">
        <div class="xshell-main-inner">
          <ng-content></ng-content>
        </div>
      </main>
    </div>
    <ng-content select="[appShellFooter]"></ng-content>
  `,
  host: {
    '[class]': 'classes()',
    '[attr.data-section]': 'section() ?? "none"',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppShellComponent {
  readonly section = input<AppShellSection>(null)
  readonly hasSidebar = input(false)
  readonly flush = input(false)

  protected readonly shell = inject(AppShellService)

  readonly classes = computed(() =>
    [
      'xshell',
      `xshell--section-${this.section() ?? 'none'}`,
      this.hasSidebar() ? '' : 'xshell--no-sidebar',
      this.shell.sidebarOpen() ? 'xshell--sidebar-open' : '',
      this.flush() ? 'xshell--flush' : '',
    ]
      .filter(Boolean)
      .join(' '),
  )

  constructor() {
    // Auto-close the drawer on every section change, matching React.
    effect(() => {
      this.section()
      this.shell.close()
    })
  }

  @HostListener('document:keydown.escape')
  onEsc(): void {
    if (this.shell.sidebarOpen()) this.shell.close()
  }
}
