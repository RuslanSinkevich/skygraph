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

/**
 * Single menu entry (string-label parity — see decisions D2).
 * Submenus are limited to one level deep in Wave 4.2; deeper nesting
 * works structurally but no popover positioning is rendered.
 */
export interface SgMenuItem {
  key: string
  label: string
  icon?: string
  disabled?: boolean
  danger?: boolean
  children?: SgMenuItem[]
  type?: 'group' | 'divider'
}

/**
 * Attribute-selector menu, DOM-equivalent of
 * `packages/react/src/components/ui/Menu.tsx`.
 *
 * Use as `<ul sg-menu [items]="…" mode="inline" [(selectedKeys)]="…"></ul>`.
 *
 * `inline` mode supports expandable submenus (toggle via header click).
 * `vertical` and `horizontal` modes render a flat list (popover-on-hover
 * is a 4.3 task — see findings; the menu still emits the right classes).
 */
@Component({
  selector: 'ul[sg-menu]',
  standalone: true,
  template: `
    @for (item of items; track item.key) {
      @if (item.type === 'divider') {
        <li class="sg-menu-divider" role="separator"></li>
      } @else if (item.type === 'group') {
        <li class="sg-menu-group" role="group">
          <div class="sg-menu-group-title">{{ item.label }}</div>
          <ul class="sg-menu-group-list" role="menu">
            @for (child of item.children || []; track child.key) {
              <li
                role="menuitem"
                [class]="itemClass(child, false)"
                [attr.aria-selected]="isSelected(child.key)"
                [attr.aria-disabled]="child.disabled || null"
                (click)="select(child)"
              >
                @if (child.icon) {
                  <span class="sg-menu-item-icon">{{ child.icon }}</span>
                }
                <span class="sg-menu-item-label">{{ child.label }}</span>
              </li>
            }
          </ul>
        </li>
      } @else if (item.children && item.children.length) {
        <li
          [class]="
            ['sg-menu-submenu-wrapper', isOpen(item.key) ? 'sg-menu-submenu-open' : '']
              .join(' ')
              .trim()
          "
        >
          <div
            role="menuitem"
            [class]="itemClass(item, true)"
            aria-haspopup="menu"
            [attr.aria-expanded]="isOpen(item.key)"
            (click)="toggleOpen(item)"
          >
            @if (item.icon) {
              <span class="sg-menu-item-icon">{{ item.icon }}</span>
            }
            <span class="sg-menu-item-label">{{ item.label }}</span>
            <span
              [class]="
                'sg-menu-submenu-arrow ' + (isOpen(item.key) ? 'sg-menu-submenu-arrow-open' : '')
              "
            ></span>
          </div>
          @if (mode === 'inline' && isOpen(item.key)) {
            <ul class="sg-menu-inline-sub sg-menu-inline-sub-open" role="menu">
              @for (child of item.children; track child.key) {
                <li
                  role="menuitem"
                  [class]="itemClass(child, false)"
                  [attr.aria-selected]="isSelected(child.key)"
                  (click)="select(child)"
                >
                  @if (child.icon) {
                    <span class="sg-menu-item-icon">{{ child.icon }}</span>
                  }
                  <span class="sg-menu-item-label">{{ child.label }}</span>
                </li>
              }
            </ul>
          }
        </li>
      } @else {
        <li
          role="menuitem"
          [class]="itemClass(item, false)"
          [attr.aria-selected]="isSelected(item.key)"
          [attr.aria-disabled]="item.disabled || null"
          (click)="select(item)"
        >
          @if (item.icon) {
            <span class="sg-menu-item-icon">{{ item.icon }}</span>
          }
          <span class="sg-menu-item-label">{{ item.label }}</span>
        </li>
      }
    }
  `,
  host: {
    '[class]': 'classes()',
    role: 'menu',
    '[attr.aria-orientation]': 'mode === "horizontal" ? "horizontal" : "vertical"',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SgMenuComponent {
  private readonly _selected = signal<string[]>([])
  private readonly _open = signal<string[]>([])
  private readonly _ctrlSelected = signal<string[] | undefined>(undefined)
  private readonly _ctrlOpen = signal<string[] | undefined>(undefined)
  private readonly _collapsed = signal<boolean>(false)

  @Input() items: SgMenuItem[] = []
  @Input() mode: 'vertical' | 'horizontal' | 'inline' = 'vertical'
  @Input() theme: 'light' | 'dark' = 'light'

  @Input()
  get selectedKeys(): string[] {
    return this._ctrlSelected() ?? this._selected()
  }
  set selectedKeys(v: string[]) {
    this._ctrlSelected.set(v)
    this._selected.set(v ?? [])
  }
  @Input()
  set defaultSelectedKeys(v: string[]) {
    if (this._ctrlSelected() === undefined) this._selected.set(v ?? [])
  }

  @Input()
  get openKeys(): string[] {
    return this._ctrlOpen() ?? this._open()
  }
  set openKeys(v: string[]) {
    this._ctrlOpen.set(v)
    this._open.set(v ?? [])
  }
  @Input()
  set defaultOpenKeys(v: string[]) {
    if (this._ctrlOpen() === undefined) this._open.set(v ?? [])
  }

  @Input({ transform: booleanAttribute })
  get inlineCollapsed(): boolean {
    return this._collapsed()
  }
  set inlineCollapsed(v: boolean) {
    this._collapsed.set(v)
  }

  @Output() readonly selectedKeysChange = new EventEmitter<string[]>()
  @Output() readonly openKeysChange = new EventEmitter<string[]>()

  readonly classes = computed(() =>
    [
      'sg-menu',
      `sg-menu-${this.mode}`,
      `sg-menu-${this.theme}`,
      this._collapsed() ? 'sg-menu-collapsed' : '',
    ]
      .filter(Boolean)
      .join(' '),
  )

  itemClass(item: SgMenuItem, hasChildren: boolean): string {
    return [
      'sg-menu-item',
      this.isSelected(item.key) && !hasChildren ? 'sg-menu-item-selected' : '',
      item.disabled ? 'sg-menu-item-disabled' : '',
      item.danger ? 'sg-menu-item-danger' : '',
      hasChildren ? 'sg-menu-submenu' : '',
    ]
      .filter(Boolean)
      .join(' ')
  }

  isSelected(key: string): boolean {
    return this.selectedKeys.includes(key)
  }

  isOpen(key: string): boolean {
    return this.openKeys.includes(key)
  }

  select(item: SgMenuItem): void {
    if (item.disabled) return
    const next = [item.key]
    if (this._ctrlSelected() === undefined) this._selected.set(next)
    this.selectedKeysChange.emit(next)
  }

  toggleOpen(item: SgMenuItem): void {
    if (item.disabled) return
    const cur = this.openKeys
    const next = cur.includes(item.key) ? cur.filter((k) => k !== item.key) : [...cur, item.key]
    if (this._ctrlOpen() === undefined) this._open.set(next)
    this.openKeysChange.emit(next)
  }
}
