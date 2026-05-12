import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core'
import { I18nService } from '../../i18n'

/**
 * Angular port of `examples/demo/src/components/DemoBox.tsx`. Emits the
 * exact same `.demo-box*` className contract as the React version so
 * the shared `app.css` block from React (already inlined into
 * `examples/demo-angular/src/styles.css`) covers it visually.
 *
 * - Standalone, OnPush, signal inputs.
 * - The "TOC" hookup from React isn't ported (Angular demo doesn't yet
 *   ship a sticky in-page TOC); the component still emits a stable
 *   `id` slug for the title so anchors work.
 */
@Component({
  selector: 'sg-demo-box',
  standalone: true,
  template: `
    <div class="demo-box" [id]="slugId()">
      <div [class]="previewClasses()">
        <ng-content></ng-content>
      </div>

      <div class="demo-box-meta">
        <div class="demo-box-title">{{ title() }}</div>
        @if (description()) {
          <div class="demo-box-description">{{ description() }}</div>
        }
      </div>

      @if (hasCode()) {
        <div
          class="demo-box-actions"
          role="toolbar"
          [attr.aria-label]="i18n.t().demoBox.toolbarLabel"
        >
          <button
            type="button"
            class="demo-box-action"
            (click)="copy()"
            [attr.aria-label]="i18n.t().demoBox.copyCode"
            [title]="copied() ? i18n.t().demoBox.copiedToast : i18n.t().demoBox.copyCode"
          >
            <span aria-hidden="true">{{ copied() ? '✓' : '⎘' }}</span>
            <span>{{ copied() ? i18n.t().demoBox.copied : i18n.t().demoBox.copy }}</span>
          </button>
          <button
            type="button"
            class="demo-box-action"
            (click)="toggle()"
            [attr.aria-expanded]="open()"
            [attr.aria-label]="
              open() ? i18n.t().demoBox.hideCodeAria : i18n.t().demoBox.showCodeAria
            "
          >
            <span aria-hidden="true">{{ open() ? '⌃' : '⌄' }}</span>
            <span>{{ open() ? i18n.t().demoBox.hideCode : i18n.t().demoBox.showCode }}</span>
          </button>
        </div>
      }

      @if (open() && hasCode()) {
        <div class="demo-box-code">
          <pre><code>{{ code() }}</code></pre>
        </div>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DemoBoxComponent {
  readonly title = input.required<string>()
  readonly description = input<string | undefined>(undefined)
  readonly code = input<string | undefined>(undefined)
  readonly defaultOpen = input<boolean>(false)
  readonly flush = input<boolean>(false)
  readonly vertical = input<boolean>(false)

  protected readonly i18n = inject(I18nService)

  protected readonly open = signal(false)
  protected readonly copied = signal(false)

  protected readonly hasCode = computed(() => {
    const c = this.code()
    return typeof c === 'string' && c.trim().length > 0
  })

  protected readonly slugId = computed(() =>
    this.title()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, ''),
  )

  protected readonly previewClasses = computed(() =>
    [
      'demo-box-preview',
      this.flush() ? 'demo-box-preview-flush' : '',
      this.vertical() ? 'demo-box-preview-vertical' : '',
    ]
      .filter(Boolean)
      .join(' '),
  )

  constructor() {
    // Honour `defaultOpen` once at construction.
    queueMicrotask(() => {
      if (this.defaultOpen()) this.open.set(true)
    })
  }

  protected toggle(): void {
    this.open.update((v) => !v)
  }

  protected async copy(): Promise<void> {
    if (!this.hasCode()) return
    try {
      await navigator.clipboard.writeText(this.code()!)
      this.copied.set(true)
      setTimeout(() => this.copied.set(false), 1600)
    } catch {
      /* no clipboard — silently ignore */
    }
  }
}
