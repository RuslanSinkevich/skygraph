import { ChangeDetectionStrategy, Component, effect, inject, input, signal } from '@angular/core'
import { DOCUMENT } from '@angular/common'

const THEME_STORAGE_KEY = 'skygraph-demo-theme'

type Theme = 'light' | 'dark'

function readInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'light'
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY)
    if (stored === 'dark' || stored === 'light') return stored
  } catch {
    // ignore
  }
  if (typeof window.matchMedia === 'function') {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark'
  }
  return 'light'
}

/**
 * Tiny theme toggle — Angular port of
 * `examples/_shared-react/src/layout/ThemeSwitcher.tsx`. Single icon
 * button that flips between light and dark. Persists the choice in
 * `localStorage` and writes `data-sg-theme` on `<html>` so all
 * `var(--sg-color-*)` tokens swap.
 */
@Component({
  selector: 'sg-theme-switcher',
  standalone: true,
  template: `
    <button
      type="button"
      class="xshell-theme"
      (click)="toggle()"
      [attr.aria-label]="ariaLabel()"
      [title]="ariaLabel()"
    >
      @if (theme() === 'dark') {
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <circle cx="8" cy="8" r="3" fill="currentColor" />
          <path
            d="M8 1v2M8 13v2M1 8h2M13 8h2M3.05 3.05l1.4 1.4M11.55 11.55l1.4 1.4M3.05 12.95l1.4-1.4M11.55 4.45l1.4-1.4"
            stroke="currentColor"
            stroke-width="1.4"
            stroke-linecap="round"
          />
        </svg>
      } @else {
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path
            d="M13 9.5A6 6 0 0 1 6.5 3a.5.5 0 0 0-.7-.5A6.5 6.5 0 1 0 13.5 10.2a.5.5 0 0 0-.5-.7Z"
            fill="currentColor"
          />
        </svg>
      }
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeSwitcherComponent {
  readonly ariaLabel = input<string>('Toggle theme')

  protected readonly theme = signal<Theme>(readInitialTheme())

  private readonly doc = inject(DOCUMENT)

  constructor() {
    effect(() => {
      const t = this.theme()
      this.doc.documentElement.setAttribute('data-sg-theme', t)
      try {
        window.localStorage.setItem(THEME_STORAGE_KEY, t)
      } catch {
        // ignore
      }
    })
  }

  toggle(): void {
    this.theme.update((t) => (t === 'dark' ? 'light' : 'dark'))
  }
}
