import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core'
import { I18nService } from '../../i18n'

type Framework = 'react' | 'vue' | 'angular'

interface FrameworkSpec {
  id: Framework
  label: string
  href: string
  ready: boolean
}

const FRAMEWORKS: FrameworkSpec[] = [
  { id: 'react', label: 'React', href: '/', ready: false },
  { id: 'vue', label: 'Vue', href: '/vue/', ready: false },
  { id: 'angular', label: 'Angular', href: '/angular/', ready: true },
]

/**
 * FrameworkSwitcher — Angular port of
 * `examples/demo/src/components/FrameworkSwitcher.tsx`. DOM and ARIA
 * stay 1:1 (`role="tablist"`, `role="tab"`, `aria-selected`); inline
 * styles match the React reference so visual output is identical
 * without contributing a stylesheet.
 *
 * Anchors use plain `<a href>` because they navigate between separate
 * built demos (different bundlers / output dirs) — Angular Router
 * cannot resolve them.
 */
@Component({
  selector: 'sg-framework-switcher',
  standalone: true,
  template: `
    <div
      role="tablist"
      [attr.aria-label]="i18n.t().frameworkSwitcher.label"
      [style]="containerStyle"
    >
      @for (f of frameworks; track f.id) {
        @if (!f.ready) {
          <span
            role="tab"
            aria-disabled="true"
            [title]="i18n.t().frameworkSwitcher.comingSoonTitle"
            [style]="disabledStyle"
          >
            {{ f.label }}
          </span>
        } @else {
          <a
            [href]="f.href"
            role="tab"
            [attr.aria-selected]="f.id === active()"
            [style]="readyStyle(f.id === active())"
          >
            {{ f.label }}
          </a>
        }
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FrameworkSwitcherComponent {
  readonly active = input<Framework>('angular')

  protected readonly i18n = inject(I18nService)

  protected readonly frameworks = FRAMEWORKS

  protected readonly containerStyle =
    'display:inline-flex;gap:4px;padding:2px;border-radius:8px;' +
    'border:1px solid var(--sg-border, #e5e7eb);background:var(--sg-surface, transparent);'

  private readonly baseStyle =
    'padding:4px 10px;border-radius:6px;font-size:12px;font-weight:500;' +
    'font-family:inherit;text-decoration:none;transition:background 150ms, color 150ms;'

  protected readonly disabledStyle =
    this.baseStyle + 'color:var(--sg-text-muted, #9ca3af);cursor:not-allowed;opacity:0.55;'

  protected readyStyle = (isActive: boolean): string =>
    this.baseStyle +
    `color:${isActive ? 'var(--sg-text, #111827)' : 'var(--sg-text-muted, #6b7280)'};` +
    `background:${isActive ? 'var(--sg-bg-hover, #f3f4f6)' : 'transparent'};` +
    'cursor:pointer;'

  // Marker computed to keep the template change-detection deterministic.
  protected readonly _ = computed(() => this.active())
}
