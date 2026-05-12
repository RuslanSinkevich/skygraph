import { ChangeDetectionStrategy, Component, input, output } from '@angular/core'

export interface SidebarItem {
  key: string
  label: string
  disabled?: boolean
}

export interface SidebarSection {
  title: string
  items: readonly SidebarItem[]
}

/**
 * Contextual sidebar — Angular port of
 * `examples/_shared-react/src/layout/Sidebar.tsx`. Renders grouped
 * sections (typical components / guide nav). Visibility is owned by
 * `<sg-app-shell [hasSidebar]>` — this component is content-only.
 *
 * Items emit `select(key)` so the parent app can intercept (typically
 * to push a route into the Angular Router).
 */
@Component({
  selector: 'sg-sidebar',
  standalone: true,
  template: `
    @if (sections().length === 0) {
      <div class="xshell-sidebar-empty">{{ emptyLabel() }}</div>
    } @else {
      @for (section of sections(); track section.title) {
        <div class="xshell-sidebar-section">
          <div class="xshell-sidebar-section-title">{{ section.title }}</div>
          @for (item of section.items; track item.key) {
            <a
              [class]="itemClasses(item)"
              [href]="'#/' + item.key"
              [attr.aria-disabled]="item.disabled || null"
              (click)="onItemClick($event, item)"
            >
              {{ item.label }}
            </a>
          }
        </div>
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  readonly sections = input<readonly SidebarSection[]>([])
  readonly active = input<string | null>(null)
  readonly emptyLabel = input<string>('Nothing to show')

  readonly select = output<string>()

  protected itemClasses(item: SidebarItem): string {
    return ['xshell-sidebar-item', this.active() === item.key ? 'xshell-sidebar-item--active' : '']
      .filter(Boolean)
      .join(' ')
  }

  protected onItemClick(ev: MouseEvent, item: SidebarItem): void {
    if (item.disabled) {
      ev.preventDefault()
      return
    }
    if (ev.metaKey || ev.ctrlKey || ev.shiftKey || ev.button === 1) return
    ev.preventDefault()
    this.select.emit(item.key)
  }
}
