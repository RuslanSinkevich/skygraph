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
  signal,
} from '@angular/core'
import { injectSgConfig } from '../../../config/inject-sg-config'
import type { SizeType } from '../../../types'

/**
 * Inline-edit field, DOM-equivalent of
 * `packages/react/src/components/ui/InlineEdit.tsx`.
 *
 * Use as `<span sg-inline-edit [(value)]="title" placeholder="Click to edit"></span>`.
 *
 * Renders a "view" mode (text + pencil) that switches into an "edit" mode
 * (input + save/cancel buttons) when activated.
 */
@Component({
  selector: 'span[sg-inline-edit]',
  standalone: true,
  template: `
    @if (!editing()) {
      {{ currentValue() || placeholder }}
      @if (!isInteractiveDisabled()) {
        <span class="sg-inline-edit-pencil">✎</span>
      }
    } @else {
      <input
        #input
        [class]="inputClass()"
        [value]="draft()"
        (input)="onInput($event)"
        (keydown)="onKeyDown($event)"
        (blur)="onBlur()"
      />
      @if (showButtons) {
        <span class="sg-inline-edit-actions">
          <button
            type="button"
            class="sg-inline-edit-btn sg-inline-edit-btn-save"
            [attr.aria-label]="saveLabel()"
            (click)="save()"
          >
            ✓
          </button>
          <button
            type="button"
            class="sg-inline-edit-btn sg-inline-edit-btn-cancel"
            [attr.aria-label]="cancelLabel()"
            (click)="cancel()"
          >
            ✕
          </button>
        </span>
      }
    }
  `,
  host: {
    '[class]': 'classes()',
    role: 'button',
    '[attr.tabindex]': 'editing() || isInteractiveDisabled() ? -1 : 0',
    '(click)': 'startEditing()',
    '(keydown)': 'onHostKeyDown($event)',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SgInlineEditComponent {
  private readonly cfg = injectSgConfig()
  private readonly _value = signal<string | undefined>(undefined)
  private readonly _internal = signal<string>('')
  private readonly _disabled = signal<boolean>(false)
  private readonly _loading = signal<boolean>(false)
  private readonly _size = signal<SizeType | undefined>(undefined)
  readonly editing = signal(false)
  readonly draft = signal<string>('')

  @ViewChild('input') inputRef?: ElementRef<HTMLInputElement>

  constructor() {
    effect(() => {
      if (this.editing()) {
        this.draft.set(this.currentValue())
        queueMicrotask(() => this.inputRef?.nativeElement.focus())
      }
    })
  }

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

  @Input() placeholder = 'Click to edit...'
  @Input({ transform: booleanAttribute }) showButtons = true
  @Input({ transform: booleanAttribute }) saveOnBlur = true
  @Input({ transform: booleanAttribute }) saveOnEnter = true

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

  @Output() readonly valueChange = new EventEmitter<string>()
  @Output() readonly sgSave = new EventEmitter<string>()
  @Output() readonly sgCancel = new EventEmitter<void>()

  readonly currentValue = computed(() => this._value() ?? this._internal())

  readonly resolvedSize = computed(() => this._size() ?? this.cfg.size ?? 'middle')

  readonly isInteractiveDisabled = computed(
    () => this._disabled() || (this.cfg.disabled ?? false) || this._loading(),
  )

  readonly classes = computed(() => {
    if (this.editing()) {
      return ['sg-inline-edit', `sg-inline-edit-${this.resolvedSize()}`].join(' ')
    }
    const isEmpty = !this.currentValue()
    return [
      'sg-inline-edit-view',
      `sg-inline-edit-view-${this.resolvedSize()}`,
      isEmpty ? 'sg-inline-edit-view-placeholder' : '',
      this.isInteractiveDisabled() ? 'sg-inline-edit-view-disabled' : '',
    ]
      .filter(Boolean)
      .join(' ')
  })

  readonly saveLabel = computed(() => this.cfg.locale?.inlineEdit?.save ?? 'Save')
  readonly cancelLabel = computed(() => this.cfg.locale?.inlineEdit?.cancel ?? 'Cancel')

  inputClass(): string {
    return ['sg-input', `sg-input-${this.resolvedSize()}`, 'sg-inline-edit-input'].join(' ')
  }

  startEditing(): void {
    if (this.isInteractiveDisabled() || this.editing()) return
    this.editing.set(true)
  }

  onHostKeyDown(e: KeyboardEvent): void {
    if (this.editing()) return
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      this.startEditing()
    }
  }

  onInput(event: Event): void {
    this.draft.set((event.target as HTMLInputElement).value)
  }

  onKeyDown(e: KeyboardEvent): void {
    if (e.key === 'Enter' && this.saveOnEnter) {
      e.preventDefault()
      this.save()
    } else if (e.key === 'Escape') {
      this.cancel()
    }
  }

  onBlur(): void {
    if (this.saveOnBlur && !this.showButtons) this.save()
  }

  save(): void {
    this.editing.set(false)
    const next = this.draft()
    if (this._value() === undefined) this._internal.set(next)
    this.valueChange.emit(next)
    this.sgSave.emit(next)
  }

  cancel(): void {
    this.editing.set(false)
    this.draft.set(this.currentValue())
    this.sgCancel.emit()
  }
}
