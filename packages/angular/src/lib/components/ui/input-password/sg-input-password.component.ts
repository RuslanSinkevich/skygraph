import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  booleanAttribute,
  computed,
  signal,
} from '@angular/core'
import { injectSgConfig } from '../../../config/inject-sg-config'
import type { SizeType } from '../../../types'

export type SgPasswordStrength = 'weak' | 'medium' | 'strong' | 'very-strong'

const DEFAULT_LABELS: Record<SgPasswordStrength, string> = {
  weak: 'Weak',
  medium: 'Medium',
  strong: 'Strong',
  'very-strong': 'Very strong',
}

function getStrength(p: string): SgPasswordStrength {
  if (!p || p.length < 4) return 'weak'
  let score = 0
  if (p.length >= 8) score++
  if (p.length >= 12) score++
  if (/[a-z]/.test(p) && /[A-Z]/.test(p)) score++
  if (/\d/.test(p)) score++
  if (/[^a-zA-Z0-9]/.test(p)) score++
  if (score <= 1) return 'weak'
  if (score <= 2) return 'medium'
  if (score <= 3) return 'strong'
  return 'very-strong'
}

/**
 * Attribute-selector password input, DOM-equivalent of
 * `packages/react/src/components/ui/InputPassword.tsx`.
 *
 * Use as `<div sg-input-password [(value)]="pwd" showStrength></div>`.
 *
 * Wrapper is a `<div>` (matches React's outer `<div>` since strength bar
 * renders below the input row).
 */
@Component({
  selector: 'div[sg-input-password]',
  standalone: true,
  template: `
    <span [class]="wrapperInnerClass()">
      <input
        [type]="visible() ? 'text' : 'password'"
        [class]="inputClass()"
        [value]="currentValue()"
        [placeholder]="placeholder || null"
        [disabled]="isInteractiveDisabled()"
        [attr.aria-invalid]="ariaInvalid"
        [attr.aria-required]="ariaRequired"
        (input)="handleInput($event)"
        (blur)="sgBlur.emit()"
        (focus)="sgFocus.emit()"
      />
      @if (loading) {
        <span
          class="sg-spin sg-spin-small"
          role="status"
          aria-live="polite"
          aria-label="Loading"
        ></span>
      } @else if (visibilityToggle) {
        <button
          type="button"
          class="sg-input-password-toggle"
          tabindex="-1"
          [attr.aria-label]="visible() ? hideLabel() : showLabel()"
          (click)="toggleVisible()"
        >
          {{ visible() ? '◉' : '○' }}
        </button>
      }
    </span>
    @if (showStrength && currentValue().length > 0) {
      <div class="sg-input-password-strength">
        <div class="sg-input-password-strength-bar">
          <span
            [class]="'sg-input-password-strength-fill sg-input-password-strength-' + strength()"
          ></span>
        </div>
        <span [class]="'sg-input-password-strength-label sg-input-password-strength-' + strength()">
          {{ resolvedLabels()[strength()] }}
        </span>
      </div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SgInputPasswordComponent {
  private readonly cfg = injectSgConfig()
  private readonly _value = signal<string | undefined>(undefined)
  private readonly _internal = signal<string>('')
  private readonly _disabled = signal<boolean>(false)
  private readonly _loading = signal<boolean>(false)
  private readonly _size = signal<SizeType | undefined>(undefined)
  readonly visible = signal(false)

  @Input()
  get value(): string {
    return this._value() ?? this._internal()
  }
  set value(v: string) {
    this._value.set(v)
    this._internal.set(v ?? '')
  }
  @Input()
  set defaultValue(v: string) {
    if (this._value() === undefined) this._internal.set(v ?? '')
  }

  @Input() placeholder?: string
  @Input({ transform: booleanAttribute }) visibilityToggle = true
  @Input({ transform: booleanAttribute }) showStrength = false
  @Input() strengthLabels?: Partial<Record<SgPasswordStrength, string>>

  @Input({ transform: booleanAttribute })
  get disabled(): boolean {
    return this._disabled()
  }
  set disabled(v: boolean) {
    this._disabled.set(v)
  }

  @Input({ transform: booleanAttribute })
  get loading(): boolean {
    return this._loading()
  }
  set loading(v: boolean) {
    this._loading.set(v)
  }

  @Input()
  get size(): SizeType | undefined {
    return this._size()
  }
  set size(v: SizeType | undefined) {
    this._size.set(v)
  }

  @Input('aria-invalid') ariaInvalid?: boolean | string
  @Input('aria-required') ariaRequired?: boolean | string

  @Output() readonly valueChange = new EventEmitter<string>()
  @Output() readonly sgBlur = new EventEmitter<void>()
  @Output() readonly sgFocus = new EventEmitter<void>()

  readonly currentValue = computed(() => this._value() ?? this._internal())

  readonly resolvedSize = computed(() => this._size() ?? this.cfg.size ?? 'middle')

  readonly isInteractiveDisabled = computed(
    () => this._disabled() || (this.cfg.disabled ?? false) || this._loading(),
  )

  readonly strength = computed(() => getStrength(this.currentValue()))

  readonly resolvedLabels = computed(() => ({
    ...DEFAULT_LABELS,
    ...(this.strengthLabels ?? {}),
  }))

  readonly showLabel = computed(
    () => this.cfg.locale?.inputPassword?.showPassword ?? 'Show password',
  )
  readonly hideLabel = computed(
    () => this.cfg.locale?.inputPassword?.hidePassword ?? 'Hide password',
  )

  wrapperInnerClass(): string {
    return [
      'sg-input-password-wrapper',
      `sg-input-password-wrapper-${this.resolvedSize()}`,
      this._loading() ? 'sg-input-wrapper-loading' : '',
    ]
      .filter(Boolean)
      .join(' ')
  }

  inputClass(): string {
    return ['sg-input', 'sg-input-password', `sg-input-${this.resolvedSize()}`].join(' ')
  }

  toggleVisible(): void {
    this.visible.update((v) => !v)
  }

  handleInput(event: Event): void {
    const v = (event.target as HTMLInputElement).value
    if (this._value() === undefined) this._internal.set(v)
    this.valueChange.emit(v)
  }
}
