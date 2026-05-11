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

export interface SgSegmentedOption {
  label: string
  value: string
  /** Plain-string icon (see decision D2). */
  icon?: string
  disabled?: boolean
}

/**
 * Attribute-selector segmented control, DOM-equivalent of
 * `packages/react/src/components/ui/Segmented.tsx`.
 *
 * Use as `<div sg-segmented [options]="…" [(value)]="…"></div>`.
 *
 * Options may be passed as `string[]` or `SgSegmentedOption[]`.
 */
@Component({
  selector: 'div[sg-segmented]',
  standalone: true,
  template: `
    @for (opt of normalized(); track opt.value) {
      <div
        role="radio"
        [attr.aria-checked]="opt.value === current()"
        [class]="optionClass(opt)"
        (click)="select(opt)"
      >
        @if (opt.icon) {
          <span class="sg-segmented-item-icon">{{ opt.icon }}</span>
        }
        <span class="sg-segmented-item-label">{{ opt.label }}</span>
      </div>
    }
  `,
  host: {
    '[class]': 'classes()',
    role: 'radiogroup',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SgSegmentedComponent {
  private readonly cfg = injectSgConfig()
  private readonly _value = signal<string | undefined>(undefined)
  private readonly _internal = signal<string>('')
  private readonly _disabled = signal<boolean | undefined>(undefined)
  private readonly _size = signal<SizeType | undefined>(undefined)

  @Input() options: (string | SgSegmentedOption)[] = []

  @Input()
  get value(): string {
    return this._value() ?? this._internal()
  }
  set value(v: string) {
    this._value.set(v)
    if (v !== undefined && v !== null) this._internal.set(v)
  }
  @Input()
  set defaultValue(v: string) {
    if (this._value() === undefined) this._internal.set(v ?? '')
  }

  @Input({ transform: booleanAttribute })
  get disabled(): boolean {
    return this.resolvedDisabled()
  }
  set disabled(v: boolean | undefined) {
    this._disabled.set(v)
  }

  @Input({ transform: booleanAttribute }) block = false

  @Input()
  get size(): SizeType | undefined {
    return this._size()
  }
  set size(v: SizeType | undefined) {
    this._size.set(v)
  }

  @Output() readonly valueChange = new EventEmitter<string>()

  readonly normalized = computed<SgSegmentedOption[]>(() =>
    (this.options ?? []).map((o) => (typeof o === 'string' ? { label: o, value: o } : o)),
  )

  readonly current = computed(() => {
    const v = this._value() ?? this._internal()
    if (v) return v
    return this.normalized()[0]?.value ?? ''
  })

  readonly resolvedDisabled = computed(() => this._disabled() ?? this.cfg.disabled ?? false)

  readonly resolvedSize = computed(() => this._size() ?? this.cfg.size ?? 'middle')

  readonly classes = computed(() =>
    [
      'sg-segmented',
      `sg-segmented-${this.resolvedSize()}`,
      this.block ? 'sg-segmented-block' : '',
      this.resolvedDisabled() ? 'sg-segmented-disabled' : '',
    ]
      .filter(Boolean)
      .join(' '),
  )

  optionClass(opt: SgSegmentedOption): string {
    return [
      'sg-segmented-item',
      opt.value === this.current() ? 'sg-segmented-item-selected' : '',
      opt.disabled ? 'sg-segmented-item-disabled' : '',
    ]
      .filter(Boolean)
      .join(' ')
  }

  select(opt: SgSegmentedOption): void {
    if (this.resolvedDisabled() || opt.disabled) return
    if (this._value() === undefined) this._internal.set(opt.value)
    this.valueChange.emit(opt.value)
  }
}
