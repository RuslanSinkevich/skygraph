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
import { SgButtonComponent } from '../button'

export interface SgTransferItem {
  key: string
  title: string
  description?: string
  disabled?: boolean
}

/**
 * Element-selector transfer (two-column shuttle), DOM-equivalent of
 * `packages/react/src/components/complex/Transfer/Transfer.tsx`.
 *
 * Use as `<sg-transfer [dataSource]="…" [(targetKeys)]="…"></sg-transfer>`.
 *
 * Wave 4.2 ships basic two-list transfer with select-all and bulk move.
 * Search, pagination and `oneWay` options are deferred to 4.3 (see
 * findings F-Transfer-Limited).
 */
@Component({
  selector: 'sg-transfer',
  standalone: true,
  imports: [SgButtonComponent],
  template: `
    <div class="sg-transfer-list">
      <div class="sg-transfer-list-header">
        <label class="sg-transfer-list-checkbox">
          <input
            type="checkbox"
            [checked]="allSourceSelected()"
            [disabled]="resolvedDisabled() || sourceItems().length === 0"
            (change)="toggleAllSource($event)"
          />
        </label>
        <span class="sg-transfer-list-header-selected">
          {{ selectedCountText(sourceSelected().length, sourceItems().length) }}
        </span>
        <span class="sg-transfer-list-header-title">{{ titles?.[0] ?? 'Source' }}</span>
      </div>
      <ul class="sg-transfer-list-body">
        @for (item of sourceItems(); track item.key) {
          <li
            [class]="itemClass(item, sourceSelected().includes(item.key))"
            (click)="toggleSource(item)"
          >
            <input
              type="checkbox"
              class="sg-transfer-list-item-checkbox"
              [checked]="sourceSelected().includes(item.key)"
              [disabled]="resolvedDisabled() || item.disabled"
              (click)="$event.stopPropagation()"
              (change)="toggleSource(item)"
            />
            <span class="sg-transfer-list-item-text">{{ item.title }}</span>
          </li>
        }
      </ul>
    </div>

    <div class="sg-transfer-operations">
      <button
        sg-button
        type="primary"
        size="small"
        [disabled]="resolvedDisabled() || !canMoveRight()"
        (click)="moveRight()"
      >
        →
      </button>
      <button
        sg-button
        type="primary"
        size="small"
        [disabled]="resolvedDisabled() || !canMoveLeft()"
        (click)="moveLeft()"
      >
        ←
      </button>
    </div>

    <div class="sg-transfer-list">
      <div class="sg-transfer-list-header">
        <label class="sg-transfer-list-checkbox">
          <input
            type="checkbox"
            [checked]="allTargetSelected()"
            [disabled]="resolvedDisabled() || targetItems().length === 0"
            (change)="toggleAllTarget($event)"
          />
        </label>
        <span class="sg-transfer-list-header-selected">
          {{ selectedCountText(targetSelected().length, targetItems().length) }}
        </span>
        <span class="sg-transfer-list-header-title">{{ titles?.[1] ?? 'Target' }}</span>
      </div>
      <ul class="sg-transfer-list-body">
        @for (item of targetItems(); track item.key) {
          <li
            [class]="itemClass(item, targetSelected().includes(item.key))"
            (click)="toggleTarget(item)"
          >
            <input
              type="checkbox"
              class="sg-transfer-list-item-checkbox"
              [checked]="targetSelected().includes(item.key)"
              [disabled]="resolvedDisabled() || item.disabled"
              (click)="$event.stopPropagation()"
              (change)="toggleTarget(item)"
            />
            <span class="sg-transfer-list-item-text">{{ item.title }}</span>
          </li>
        }
      </ul>
    </div>
  `,
  host: {
    '[class]': 'classes()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SgTransferComponent {
  private readonly cfg = injectSgConfig()
  private readonly _disabled = signal<boolean | undefined>(undefined)
  private readonly _internalKeys = signal<string[]>([])
  private readonly _ctrlKeys = signal<string[] | undefined>(undefined)

  protected readonly sourceSelected = signal<string[]>([])
  protected readonly targetSelected = signal<string[]>([])

  @Input({ required: true }) dataSource: SgTransferItem[] = []
  @Input() titles?: [string, string]

  @Input()
  get targetKeys(): string[] {
    return this._ctrlKeys() ?? this._internalKeys()
  }
  set targetKeys(v: string[]) {
    this._ctrlKeys.set(v)
    this._internalKeys.set(v ?? [])
  }
  @Input()
  set defaultTargetKeys(v: string[]) {
    if (this._ctrlKeys() === undefined) this._internalKeys.set(v ?? [])
  }

  @Input({ transform: booleanAttribute })
  get disabled(): boolean {
    return this.resolvedDisabled()
  }
  set disabled(v: boolean | undefined) {
    this._disabled.set(v)
  }

  @Output() readonly targetKeysChange = new EventEmitter<string[]>()

  readonly resolvedDisabled = computed(() => this._disabled() ?? this.cfg.disabled ?? false)

  readonly classes = computed(() =>
    ['sg-transfer', this.resolvedDisabled() ? 'sg-transfer-disabled' : '']
      .filter(Boolean)
      .join(' '),
  )

  readonly currentKeys = computed(() => this._ctrlKeys() ?? this._internalKeys())

  readonly sourceItems = computed(() => {
    const set = new Set(this.currentKeys())
    return this.dataSource.filter((i) => !set.has(i.key))
  })
  readonly targetItems = computed(() => {
    const set = new Set(this.currentKeys())
    return this.dataSource.filter((i) => set.has(i.key))
  })

  readonly allSourceSelected = computed(() => {
    const enabled = this.sourceItems().filter((i) => !i.disabled)
    return enabled.length > 0 && enabled.every((i) => this.sourceSelected().includes(i.key))
  })
  readonly allTargetSelected = computed(() => {
    const enabled = this.targetItems().filter((i) => !i.disabled)
    return enabled.length > 0 && enabled.every((i) => this.targetSelected().includes(i.key))
  })

  readonly canMoveRight = computed(() =>
    this.sourceSelected().some((k) => {
      const it = this.dataSource.find((i) => i.key === k)
      return it && !it.disabled
    }),
  )

  readonly canMoveLeft = computed(() =>
    this.targetSelected().some((k) => {
      const it = this.dataSource.find((i) => i.key === k)
      return it && !it.disabled
    }),
  )

  itemClass(item: SgTransferItem, selected: boolean): string {
    return [
      'sg-transfer-list-item',
      selected ? 'sg-transfer-list-item-selected' : '',
      item.disabled ? 'sg-transfer-list-item-disabled' : '',
    ]
      .filter(Boolean)
      .join(' ')
  }

  selectedCountText(sel: number, total: number): string {
    return sel > 0
      ? `${sel}/${total} item${total === 1 ? '' : 's'}`
      : `${total} item${total === 1 ? '' : 's'}`
  }

  toggleSource(item: SgTransferItem): void {
    if (this.resolvedDisabled() || item.disabled) return
    this.sourceSelected.update((arr) =>
      arr.includes(item.key) ? arr.filter((k) => k !== item.key) : [...arr, item.key],
    )
  }
  toggleTarget(item: SgTransferItem): void {
    if (this.resolvedDisabled() || item.disabled) return
    this.targetSelected.update((arr) =>
      arr.includes(item.key) ? arr.filter((k) => k !== item.key) : [...arr, item.key],
    )
  }

  toggleAllSource(e: Event): void {
    const checked = (e.target as HTMLInputElement).checked
    const enabled = this.sourceItems()
      .filter((i) => !i.disabled)
      .map((i) => i.key)
    this.sourceSelected.set(checked ? enabled : [])
  }
  toggleAllTarget(e: Event): void {
    const checked = (e.target as HTMLInputElement).checked
    const enabled = this.targetItems()
      .filter((i) => !i.disabled)
      .map((i) => i.key)
    this.targetSelected.set(checked ? enabled : [])
  }

  moveRight(): void {
    const move = this.sourceSelected().filter((k) => {
      const it = this.dataSource.find((i) => i.key === k)
      return it && !it.disabled
    })
    if (move.length === 0) return
    const next = [...this.currentKeys(), ...move]
    if (this._ctrlKeys() === undefined) this._internalKeys.set(next)
    this.sourceSelected.set([])
    this.targetKeysChange.emit(next)
  }

  moveLeft(): void {
    const move = new Set(
      this.targetSelected().filter((k) => {
        const it = this.dataSource.find((i) => i.key === k)
        return it && !it.disabled
      }),
    )
    if (move.size === 0) return
    const next = this.currentKeys().filter((k) => !move.has(k))
    if (this._ctrlKeys() === undefined) this._internalKeys.set(next)
    this.targetSelected.set([])
    this.targetKeysChange.emit(next)
  }
}
