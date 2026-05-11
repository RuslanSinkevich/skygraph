import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  booleanAttribute,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core'
import { injectSgConfig } from '../../../config/inject-sg-config'

/**
 * Attribute-selector checkbox, DOM-equivalent of
 * `packages/react/src/components/ui/Checkbox.tsx`.
 *
 * Use as `<label sg-checkbox [(value)]="checked">Label</label>`.
 *
 * Renders the label wrapper with the input + projected label text. The
 * native `indeterminate` flag is set imperatively on the input.
 */
@Component({
  selector: 'label[sg-checkbox]',
  standalone: true,
  template: `
    <input
      #input
      type="checkbox"
      [class]="inputClass()"
      [attr.aria-checked]="isChecked()"
      [checked]="isChecked()"
      [disabled]="isInteractiveDisabled()"
      (change)="handleChange($event)"
    />
    <span [class]="labelClass()">
      <ng-content></ng-content>
    </span>
    @if (loading) {
      <span
        class="sg-spin sg-spin-small"
        role="status"
        aria-live="polite"
        aria-label="Loading"
      ></span>
    }
  `,
  host: {
    '[class]': 'classes()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SgCheckboxComponent {
  private readonly cfg = injectSgConfig()
  private readonly _value = signal<boolean | undefined>(undefined)
  private readonly _internal = signal<boolean>(false)
  private readonly _disabled = signal<boolean>(false)
  private readonly _loading = signal<boolean>(false)
  private readonly _indeterminate = signal<boolean>(false)
  private readonly _unstyled = signal<boolean>(false)
  private readonly _className = signal<string>('')

  @ViewChild('input') inputRef?: ElementRef<HTMLInputElement>

  constructor() {
    effect(() => {
      const i = this._indeterminate()
      const el = this.inputRef?.nativeElement
      if (el) el.indeterminate = i
    })
  }

  @Input({ transform: booleanAttribute })
  get value(): boolean {
    return this._value() ?? this._internal()
  }
  set value(v: boolean) {
    this._value.set(v)
    this._internal.set(v)
  }

  @Input({ transform: booleanAttribute })
  set defaultValue(v: boolean) {
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

  @Input({ transform: booleanAttribute })
  get indeterminate(): boolean {
    return this._indeterminate()
  }
  set indeterminate(v: boolean) {
    this._indeterminate.set(v)
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

  @Output() readonly valueChange = new EventEmitter<boolean>()

  readonly isChecked = computed(() => this._value() ?? this._internal())

  readonly isInteractiveDisabled = computed(
    () => this._disabled() || (this.cfg.disabled ?? false) || this._loading(),
  )

  readonly classes = computed(() => {
    if (this._unstyled()) return this._className()
    const parts = [
      'sg-checkbox',
      this.isInteractiveDisabled() ? 'sg-checkbox-disabled' : '',
      this._loading() ? 'sg-checkbox-loading' : '',
      this._className(),
    ]
    return parts.filter(Boolean).join(' ')
  })

  inputClass(): string {
    return this._unstyled() ? '' : 'sg-checkbox-input'
  }
  labelClass(): string {
    return this._unstyled() ? '' : 'sg-checkbox-label'
  }

  handleChange(event: Event): void {
    const next = (event.target as HTMLInputElement).checked
    if (this._value() === undefined) this._internal.set(next)
    this.valueChange.emit(next)
  }
}
