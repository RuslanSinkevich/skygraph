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
  numberAttribute,
  signal,
} from '@angular/core'
import { injectSgConfig } from '../../../config/inject-sg-config'
import type { SizeType } from '../../../types'

/**
 * Tag/chip input, DOM-equivalent of
 * `packages/react/src/components/ui/TagInput.tsx`.
 *
 * Use as `<div sg-tag-input [(value)]="tags" tagColor="success"></div>`.
 */
@Component({
  selector: 'div[sg-tag-input]',
  standalone: true,
  template: `
    @for (tag of tagsList(); let i = $index; track i + ':' + tag) {
      <span [class]="'sg-tag ' + tagColorClass()">
        {{ tag }}
        @if (removable && !isInteractiveDisabled()) {
          <span
            class="sg-tag-close"
            role="button"
            [attr.aria-label]="removeTagLabel()(tag)"
            (click)="removeTag(i, $event)"
            >×</span
          >
        }
      </span>
    }
    <input
      #input
      class="sg-tag-input-field"
      [value]="inputValue()"
      [placeholder]="tagsList().length === 0 ? placeholder : ''"
      [disabled]="isInteractiveDisabled()"
      (input)="onInput($event)"
      (keydown)="onKeyDown($event)"
      (paste)="onPaste($event)"
      (blur)="onBlur()"
      (focus)="sgFocus.emit()"
    />
    @if (maxTags) {
      <span class="sg-tag-input-count">{{ tagsList().length }}/{{ maxTags }}</span>
    }
  `,
  host: {
    '[class]': 'classes()',
    '(click)': 'focusInput()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SgTagInputComponent {
  private readonly cfg = injectSgConfig()
  private readonly _value = signal<string[] | undefined>(undefined)
  private readonly _internal = signal<string[]>([])
  private readonly _disabled = signal<boolean>(false)
  private readonly _loading = signal<boolean>(false)
  private readonly _size = signal<SizeType | undefined>(undefined)
  readonly inputValue = signal<string>('')

  @ViewChild('input') inputRef?: ElementRef<HTMLInputElement>

  @Input() placeholder = 'Add tag...'
  @Input({ transform: numberAttribute }) maxTags?: number
  @Input({ transform: booleanAttribute }) allowDuplicates = false
  @Input({ transform: booleanAttribute }) removable = true
  @Input() tagColor: 'default' | 'success' | 'error' | 'warning' | 'processing' = 'default'

  @Input()
  get value(): string[] {
    return this._value() ?? this._internal()
  }
  set value(v: string[]) {
    this._value.set(v)
    this._internal.set(v ?? [])
  }
  @Input()
  set defaultValue(v: string[]) {
    if (this._value() === undefined) this._internal.set(v ?? [])
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

  @Output() readonly valueChange = new EventEmitter<string[]>()
  @Output() readonly sgFocus = new EventEmitter<void>()
  @Output() readonly sgBlur = new EventEmitter<void>()

  readonly tagsList = computed(() => this._value() ?? this._internal())

  readonly resolvedSize = computed(() => this._size() ?? this.cfg.size ?? 'middle')

  readonly isInteractiveDisabled = computed(
    () => this._disabled() || (this.cfg.disabled ?? false) || this._loading(),
  )

  readonly classes = computed(() =>
    [
      'sg-tag-input',
      `sg-tag-input-${this.resolvedSize()}`,
      this._disabled() || this.cfg.disabled ? 'sg-tag-input-disabled' : '',
    ]
      .filter(Boolean)
      .join(' '),
  )

  readonly removeTagLabel = computed(
    () => this.cfg.locale?.tagInput?.removeTag ?? ((tag: string) => `Remove ${tag}`),
  )

  tagColorClass(): string {
    return this.tagColor !== 'default' ? `sg-tag-${this.tagColor}` : ''
  }

  focusInput(): void {
    this.inputRef?.nativeElement.focus()
  }

  onInput(event: Event): void {
    this.inputValue.set((event.target as HTMLInputElement).value)
  }

  onKeyDown(e: KeyboardEvent): void {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      this.addTag(this.inputValue())
    } else if (e.key === 'Backspace' && !this.inputValue() && this.tagsList().length > 0) {
      this.removeTag(this.tagsList().length - 1)
    }
  }

  onPaste(e: ClipboardEvent): void {
    e.preventDefault()
    const text = e.clipboardData?.getData('text') ?? ''
    const pasted = text
      .split(/[,;\n]+/)
      .map((s) => s.trim())
      .filter(Boolean)
    const next = [...this.tagsList()]
    for (const t of pasted) {
      if (this.maxTags && next.length >= this.maxTags) break
      if (!this.allowDuplicates && next.includes(t)) continue
      next.push(t)
    }
    this.commit(next)
  }

  onBlur(): void {
    if (this.inputValue().trim()) this.addTag(this.inputValue())
    this.sgBlur.emit()
  }

  addTag(raw: string): void {
    const tag = raw.trim()
    if (!tag) return
    const tags = this.tagsList()
    if (this.maxTags && tags.length >= this.maxTags) return
    if (!this.allowDuplicates && tags.includes(tag)) return
    this.commit([...tags, tag])
    this.inputValue.set('')
  }

  removeTag(i: number, e?: Event): void {
    e?.stopPropagation()
    this.commit(this.tagsList().filter((_, j) => j !== i))
  }

  private commit(next: string[]): void {
    if (this._value() === undefined) this._internal.set(next)
    this.valueChange.emit(next)
  }
}
