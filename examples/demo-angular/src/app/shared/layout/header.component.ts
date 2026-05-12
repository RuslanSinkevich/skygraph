import { ChangeDetectionStrategy, Component, computed, inject, input, output } from '@angular/core'
import { AppShellService } from './app-shell.service'

export interface NavItem {
  /** Stable key — also used to test `active` equality. */
  key: string
  /** Visible label. */
  label: string
  /**
   * Optional href. When set, the link opens in the current tab
   * (use `external` for `target="_blank"`). When omitted, the
   * `select(key)` output fires instead.
   */
  href?: string
  /** Render as external link (target=_blank + ↗ marker). */
  external?: boolean
}

/**
 * Top app bar — Angular port of
 * `examples/_shared-react/src/layout/Header.tsx`. Sticky, 56px tall,
 * single-pixel bottom border. Holds the brand mark, a horizontal nav
 * row, an optional search input and a slot for app-specific extras
 * (theme switcher, language switcher, framework switcher).
 *
 * On ≤1024px the nav row is replaced by a burger button that toggles
 * the AppShell's sidebar drawer via `AppShellService.open()`.
 */
@Component({
  selector: 'sg-header',
  standalone: true,
  template: `
    <header class="xshell-header" role="banner">
      <button
        type="button"
        class="xshell-header-burger"
        (click)="shell.open()"
        [attr.aria-label]="burgerAriaLabel()"
      >
        <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
          <path
            d="M2 4h14M2 9h14M2 14h14"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
          />
        </svg>
      </button>

      <button
        type="button"
        class="xshell-logo"
        (click)="brandClick.emit()"
        [attr.aria-label]="brand()"
      >
        <span class="xshell-logo-mark" aria-hidden="true"></span>
        {{ brand() }}
      </button>

      <nav class="xshell-nav" aria-label="Primary">
        @for (it of items(); track it.key) {
          @if (it.href && it.external) {
            <a [href]="it.href" [class]="navClasses(it)" target="_blank" rel="noreferrer noopener">
              {{ it.label }}
            </a>
          } @else if (it.href) {
            <a [href]="it.href" [class]="navClasses(it)" (click)="onLinkClick($event, it)">
              {{ it.label }}
            </a>
          } @else {
            <button type="button" [class]="navClasses(it)" (click)="select.emit(it.key)">
              {{ it.label }}
            </button>
          }
        }
      </nav>

      <div class="xshell-header-spacer"></div>

      @if (showSearch()) {
        <div class="xshell-search">
          <svg class="xshell-search-icon" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <circle cx="6" cy="6" r="4.25" stroke="currentColor" stroke-width="1.4" />
            <path d="M9 9l3 3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" />
          </svg>
          <input
            type="search"
            [value]="searchValue() ?? ''"
            (input)="onSearchInput($event)"
            [placeholder]="searchPlaceholder()"
            [attr.aria-label]="searchAriaLabel() ?? searchPlaceholder()"
          />
        </div>
      }

      <div class="xshell-header-extras">
        <ng-content></ng-content>
      </div>
    </header>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  readonly brand = input<string>('SkyGraph')
  readonly items = input<readonly NavItem[]>([])
  readonly active = input<string | null>(null)
  readonly searchValue = input<string | undefined>(undefined)
  readonly showSearch = input<boolean>(false)
  readonly searchPlaceholder = input<string>('Search')
  readonly searchAriaLabel = input<string | undefined>(undefined)
  readonly burgerAriaLabel = input<string>('Open navigation')

  readonly select = output<string>()
  readonly brandClick = output<void>()
  readonly searchChange = output<string>()

  protected readonly shell = inject(AppShellService)

  protected navClasses(it: NavItem): string {
    return [
      'xshell-nav-item',
      this.active() === it.key ? 'xshell-nav-item--active' : '',
      it.external ? 'xshell-nav-item-external' : '',
    ]
      .filter(Boolean)
      .join(' ')
  }

  protected onLinkClick(ev: MouseEvent, it: NavItem): void {
    // Allow modifier-clicks (cmd / ctrl) and middle-click to behave natively.
    if (ev.metaKey || ev.ctrlKey || ev.shiftKey || ev.button === 1) return
    ev.preventDefault()
    this.select.emit(it.key)
  }

  protected onSearchInput(ev: Event): void {
    this.searchChange.emit((ev.target as HTMLInputElement).value)
  }

  // Marker computed to make change-detection deterministic when only
  // `active` changes (signal inputs auto-track).
  protected readonly _ = computed(() => [this.active(), this.items().length])
}
