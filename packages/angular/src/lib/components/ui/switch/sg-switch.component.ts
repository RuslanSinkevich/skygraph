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

/**
 * Attribute-selector toggle switch, DOM-equivalent of
 * `packages/react/src/components/ui/Switch.tsx`.
 *
 * Use as `<button sg-switch [(value)]="checked">…</button>`.
 *
 * `checkedChildren` / `unCheckedChildren` are accepted as plain strings
 * (see decisions D2). Loading inlines a `<span class="sg-spin sg-spin-small"
 * role="status">` indicator (decision D5) — `SgSpinComponent` is not imported.
 */
@Component({
  selector: 'button[sg-switch]',
  standalone: true,
  template: `
    <span class="sg-switch-inner">
      @if (loading) {
        <span
          class="sg-spin sg-spin-small"
          role="status"
          aria-live="polite"
          aria-label="Loading"
        ></span>
      } @else {
        @if (isChecked()) {
          {{ checkedChildren }}
        } @else {
          {{ unCheckedChildren }}
        }
      }
    </span>
    <span class="sg-switch-handle"></span>
  `,
  host: {
    '[class]': 'classes()',
    role: 'switch',
    type: 'button',
    '[attr.aria-checked]': 'isChecked()',
    '[attr.disabled]': 'isInteractiveDisabled() ? "" : null',
    '(click)': 'handleClick($event)',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SgSwitchComponent {
  private readonly cfg = injectSgConfig()
  private readonly _value = signal<boolean | undefined>(undefined)
  private readonly _internal = signal<boolean>(false)
  private readonly _disabled = signal<boolean>(false)
  private readonly _loading = signal<boolean>(false)
  private readonly _size = signal<SizeType | undefined>(undefined)

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

  @Input()
  get size(): SizeType | undefined {
    return this._size()
  }
  set size(v: SizeType | undefined) {
    this._size.set(v)
  }

  @Input() checkedChildren?: string
  @Input() unCheckedChildren?: string

  @Output() readonly valueChange = new EventEmitter<boolean>()

  readonly isChecked = computed(() => this._value() ?? this._internal())

  readonly isInteractiveDisabled = computed(
    () => this._disabled() || (this.cfg.disabled ?? false) || this._loading(),
  )

  readonly switchSizeClass = computed(() => {
    const s = this._size() ?? this.cfg.size ?? 'middle'
    return s === 'small' ? 'small' : 'default'
  })

  readonly classes = computed(() => {
    const parts = [
      'sg-switch',
      `sg-switch-${this.switchSizeClass()}`,
      this.isChecked() ? 'sg-switch-checked' : '',
      this.isInteractiveDisabled() ? 'sg-switch-disabled' : '',
      this._loading() ? 'sg-switch-loading' : '',
    ]
    return parts.filter(Boolean).join(' ')
  })

  handleClick(event: Event): void {
    if (this.isInteractiveDisabled()) {
      event.preventDefault()
      return
    }
    const next = !this.isChecked()
    if (this._value() === undefined) this._internal.set(next)
    this.valueChange.emit(next)
  }
}
