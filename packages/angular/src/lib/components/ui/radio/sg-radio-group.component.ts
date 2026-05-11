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

/** One selectable option in a radio group. */
export interface SgRadioOption {
  label: string
  value: string | number
  disabled?: boolean
}

/**
 * Attribute-selector radio group, DOM-equivalent of
 * `packages/react/src/components/ui/Radio.tsx`.
 *
 * Use as `<div sg-radio-group [options]="opts" [(value)]="v"></div>`.
 */
@Component({
  selector: 'div[sg-radio-group]',
  standalone: true,
  template: `
    @for (opt of options; track opt.value) {
      <label [class]="optionClass(opt)">
        <input
          type="radio"
          role="radio"
          [class]="inputClass()"
          [attr.aria-checked]="value === opt.value"
          [checked]="value === opt.value"
          [disabled]="isOptionDisabled(opt)"
          [name]="groupName"
          (change)="handleChange(opt)"
        />
        <span [class]="labelClass()">{{ opt.label }}</span>
        @if (loading && value === opt.value) {
          <span
            class="sg-spin sg-spin-small"
            role="status"
            aria-live="polite"
            aria-label="Loading"
          ></span>
        }
      </label>
    }
  `,
  host: {
    '[class]': 'classes()',
    role: 'radiogroup',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SgRadioGroupComponent {
  private static gid = 0
  private readonly cfg = injectSgConfig()
  private readonly _value = signal<string | number | undefined>(undefined)
  private readonly _internal = signal<string | number | undefined>(undefined)
  private readonly _disabled = signal<boolean>(false)
  private readonly _loading = signal<boolean>(false)
  private readonly _direction = signal<'horizontal' | 'vertical'>('horizontal')
  private readonly _unstyled = signal<boolean>(false)
  private readonly _className = signal<string>('')

  readonly groupName = `sg-radio-group-${++SgRadioGroupComponent.gid}`

  @Input() options: SgRadioOption[] = []

  @Input()
  get value(): string | number | undefined {
    return this._value() ?? this._internal()
  }
  set value(v: string | number | undefined) {
    this._value.set(v)
    this._internal.set(v)
  }

  @Input()
  set defaultValue(v: string | number | undefined) {
    if (this._value() === undefined) this._internal.set(v)
  }

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
  get direction(): 'horizontal' | 'vertical' {
    return this._direction()
  }
  set direction(v: 'horizontal' | 'vertical') {
    this._direction.set(v ?? 'horizontal')
  }

  @Input({ transform: booleanAttribute })
  get unstyled(): boolean {
    return this._unstyled()
  }
  set unstyled(v: boolean) {
    this._unstyled.set(v)
  }

  @Input()
  get className(): string {
    return this._className()
  }
  set className(v: string) {
    this._className.set(v ?? '')
  }

  @Output() readonly valueChange = new EventEmitter<string | number>()

  readonly isInteractiveDisabled = computed(
    () => this._disabled() || (this.cfg.disabled ?? false) || this._loading(),
  )

  readonly classes = computed(() => {
    if (this._unstyled()) return this._className()
    const parts = [
      'sg-radio-group',
      `sg-radio-group-${this._direction()}`,
      this._loading() ? 'sg-radio-group-loading' : '',
      this._className(),
    ]
    return parts.filter(Boolean).join(' ')
  })

  optionClass(opt: SgRadioOption): string {
    if (this._unstyled()) return ''
    const parts = [
      'sg-radio',
      this.value === opt.value ? 'sg-radio-checked' : '',
      this.isOptionDisabled(opt) ? 'sg-radio-disabled' : '',
    ]
    return parts.filter(Boolean).join(' ')
  }

  inputClass(): string {
    return this._unstyled() ? '' : 'sg-radio-input'
  }
  labelClass(): string {
    return this._unstyled() ? '' : 'sg-radio-label'
  }

  isOptionDisabled(opt: SgRadioOption): boolean {
    return Boolean(opt.disabled) || this.isInteractiveDisabled()
  }

  handleChange(opt: SgRadioOption): void {
    if (this.isOptionDisabled(opt)) return
    if (this._value() === undefined) this._internal.set(opt.value)
    this.valueChange.emit(opt.value)
  }
}
