import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  booleanAttribute,
  computed,
  inject,
  signal,
} from '@angular/core'
import { injectSgConfig } from '../../../config/inject-sg-config'

export interface SgDropdownItem {
  key: string
  label: string
  disabled?: boolean
  danger?: boolean
  divider?: boolean
}

/**
 * Element-selector dropdown with `<ng-content>` trigger projection,
 * DOM-equivalent of `packages/react/src/components/ui/Dropdown.tsx`.
 *
 * Use as `<sg-dropdown [items]="…" trigger="click">…trigger…</sg-dropdown>`.
 *
 * Renders inline (no portal — see decision D7 / finding F-Overlay-Inline).
 */
@Component({
  selector: 'sg-dropdown',
  standalone: true,
  template: `
    <div
      class="sg-dropdown-trigger"
      [attr.aria-expanded]="open()"
      aria-haspopup="menu"
      [attr.aria-controls]="menuId"
      [attr.tabindex]="resolvedDisabled() ? -1 : 0"
      (click)="onTriggerClick()"
      (keydown)="onKeyDown($event)"
    >
      <ng-content></ng-content>
    </div>
    @if (open()) {
      <div
        [class]="'sg-dropdown sg-dropdown-' + placement"
        role="menu"
        [id]="menuId"
        (mouseenter)="onMouseEnter()"
        (mouseleave)="onMouseLeave()"
      >
        @for (item of items; let idx = $index; track item.key) {
          @if (item.divider) {
            <div class="sg-dropdown-divider" role="separator"></div>
          } @else {
            <div role="menuitem" [class]="itemClass(item, idx)" (click)="select(item)">
              {{ item.label }}
            </div>
          }
        }
      </div>
    }
  `,
  host: {
    class: 'sg-dropdown-wrapper',
    '(mouseenter)': 'onMouseEnter()',
    '(mouseleave)': 'onMouseLeave()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SgDropdownComponent {
  private readonly cfg = injectSgConfig()
  private readonly el = inject(ElementRef<HTMLElement>)
  private readonly _open = signal(false)
  private readonly _focused = signal(-1)
  private readonly _disabled = signal<boolean | undefined>(undefined)
  private timer: ReturnType<typeof setTimeout> | undefined

  readonly menuId = 'sg-dd-' + Math.random().toString(36).slice(2, 8)

  @Input({ required: true }) items: SgDropdownItem[] = []
  @Input() trigger: 'click' | 'hover' = 'hover'
  @Input() placement: 'bottomLeft' | 'bottomRight' | 'topLeft' | 'topRight' = 'bottomLeft'

  @Input({ transform: booleanAttribute })
  get disabled(): boolean {
    return this.resolvedDisabled()
  }
  set disabled(v: boolean | undefined) {
    this._disabled.set(v)
  }

  @Output() readonly itemSelect = new EventEmitter<string>()

  readonly open = this._open.asReadonly()

  readonly resolvedDisabled = computed(() => this._disabled() ?? this.cfg.disabled ?? false)

  itemClass(item: SgDropdownItem, idx: number): string {
    return [
      'sg-dropdown-item',
      item.disabled ? 'sg-dropdown-item-disabled' : '',
      item.danger ? 'sg-dropdown-item-danger' : '',
      idx === this._focused() ? 'sg-dropdown-item-focused' : '',
    ]
      .filter(Boolean)
      .join(' ')
  }

  onTriggerClick(): void {
    if (this.trigger !== 'click' || this.resolvedDisabled()) return
    this._open.update((v) => !v)
  }

  onMouseEnter(): void {
    if (this.trigger !== 'hover' || this.resolvedDisabled()) return
    if (this.timer) clearTimeout(this.timer)
    this._open.set(true)
  }

  onMouseLeave(): void {
    if (this.trigger !== 'hover') return
    this.timer = setTimeout(() => this._open.set(false), 100)
  }

  select(item: SgDropdownItem): void {
    if (item.disabled) return
    this._open.set(false)
    this.itemSelect.emit(item.key)
  }

  onKeyDown(e: KeyboardEvent): void {
    if (this.resolvedDisabled()) return
    const enabled = this.items
      .map((it, i) => ({ it, i }))
      .filter(({ it }) => !it.divider && !it.disabled)
    const enabledIdx = (start: number, dir: 1 | -1) => {
      if (enabled.length === 0) return -1
      const cur = enabled.findIndex(({ i }) => i === start)
      const nextPos =
        ((cur === -1 ? (dir > 0 ? -1 : enabled.length) : cur) + dir + enabled.length) %
        enabled.length
      return enabled[nextPos].i
    }
    switch (e.key) {
      case 'Enter':
      case ' ': {
        e.preventDefault()
        const idx = this._focused()
        if (this._open() && idx >= 0 && !this.items[idx]?.divider) {
          this.select(this.items[idx])
        } else {
          this._open.update((v) => !v)
        }
        break
      }
      case 'Escape':
        e.preventDefault()
        this._open.set(false)
        break
      case 'ArrowDown':
        e.preventDefault()
        if (!this._open()) {
          this._open.set(true)
          this._focused.set(enabledIdx(-1, 1))
        } else {
          this._focused.set(enabledIdx(this._focused(), 1))
        }
        break
      case 'ArrowUp':
        e.preventDefault()
        if (!this._open()) {
          this._open.set(true)
          this._focused.set(enabledIdx(this.items.length, -1))
        } else {
          this._focused.set(enabledIdx(this._focused(), -1))
        }
        break
    }
  }

  @HostListener('document:mousedown', ['$event'])
  onDocumentClick(e: MouseEvent): void {
    if (!this._open()) return
    if (!this.el.nativeElement.contains(e.target as Node)) this._open.set(false)
  }
}
