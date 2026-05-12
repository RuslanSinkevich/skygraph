import { ChangeDetectionStrategy, Component, input, output } from '@angular/core'

export interface LanguageOption {
  code: string
  label: string
  fullName?: string
}

/**
 * Inline pill group — Angular port of
 * `examples/_shared-react/src/layout/LanguageSwitcher.tsx`. Each
 * language gets a short button; the active code is filled, others are
 * subtle. Used in the header extras slot.
 */
@Component({
  selector: 'sg-language-switcher',
  standalone: true,
  template: `
    <div role="group" [attr.aria-label]="groupLabel()" class="xshell-lang">
      @for (opt of options(); track opt.code) {
        <button
          type="button"
          [class]="
            opt.code === active() ? 'xshell-lang-btn xshell-lang-btn--active' : 'xshell-lang-btn'
          "
          (click)="change.emit(opt.code)"
          [attr.aria-pressed]="opt.code === active()"
          [title]="opt.fullName ?? opt.label"
        >
          {{ opt.label }}
        </button>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguageSwitcherComponent {
  readonly options = input<readonly LanguageOption[]>([])
  readonly active = input<string>('')
  readonly groupLabel = input<string>('Language')

  readonly change = output<string>()
}
