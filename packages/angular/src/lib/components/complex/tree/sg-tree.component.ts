import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  booleanAttribute,
  computed,
  numberAttribute,
  signal,
} from '@angular/core'
import { injectSgConfig } from '../../../config/inject-sg-config'

export type SgTreeKey = string | number

export interface SgTreeDataNode {
  key: SgTreeKey
  title: string
  children?: SgTreeDataNode[]
  disabled?: boolean
  isLeaf?: boolean
  icon?: string
}

interface FlatNode {
  node: SgTreeDataNode
  depth: number
  parentKeys: SgTreeKey[]
  isLeaf: boolean
}

/**
 * Attribute-selector tree, DOM-equivalent of
 * `packages/react/src/components/complex/Tree/Tree.tsx` (basic
 * single-select read subset).
 *
 * Wave 4.2 ships expand / collapse and single-select with directory
 * mode and `showLine`/`showIcon` toggles. Checkable nodes
 * (`checkable`), draggable rows, async `loadData`, search bar, inline
 * edit, virtual scroll, keyboard navigation and inline action buttons
 * are deferred to 4.3 (see findings F-Tree-Limited).
 */
@Component({
  selector: 'div[sg-tree]',
  standalone: true,
  template: `
    @if (flatNodes().length === 0) {
      <div class="sg-tree-empty">{{ emptyText }}</div>
    } @else {
      @for (item of visibleNodes(); track item.node.key) {
        <div
          [class]="rowClass(item)"
          role="treeitem"
          [attr.aria-expanded]="item.isLeaf ? null : isExpanded(item.node.key)"
          [attr.aria-selected]="isSelected(item.node.key)"
          [attr.aria-level]="item.depth + 1"
          [attr.data-key]="item.node.key"
          [style.padding-left.px]="item.depth * indentSize"
          (click)="onRowClick(item)"
        >
          @if (item.isLeaf) {
            <span class="sg-tree-switcher sg-tree-switcher-noop"></span>
          } @else {
            <span
              [class]="switcherClass(item.node.key)"
              (click)="toggleExpand(item.node.key, $event)"
            >
              <svg
                [attr.class]="arrowClass(item.node.key)"
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
              >
                <path
                  d="M3 2L7 5L3 8"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
          }
          @if (showIcon || directory) {
            <span class="sg-tree-icon">{{ iconFor(item) }}</span>
          }
          <span [class]="titleClass()">{{ item.node.title }}</span>
        </div>
      }
    }
  `,
  host: {
    '[class]': 'classes()',
    role: 'tree',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SgTreeComponent {
  private readonly cfg = injectSgConfig()

  protected readonly _expanded = signal<Set<SgTreeKey>>(new Set())
  protected readonly _selected = signal<SgTreeKey[]>([])
  private _initialized = false

  @Input({ required: true })
  set treeData(v: SgTreeDataNode[]) {
    this._treeData = v ?? []
    if (!this._initialized) {
      this._initialized = true
      if (this.defaultExpandAll) {
        const keys = new Set<SgTreeKey>()
        const collect = (nodes: SgTreeDataNode[]): void => {
          for (const n of nodes) {
            if (n.children?.length) {
              keys.add(n.key)
              collect(n.children)
            }
          }
        }
        collect(this._treeData)
        this._expanded.set(keys)
      } else if (this.defaultExpandedKeys) {
        this._expanded.set(new Set(this.defaultExpandedKeys))
      }
      if (this.defaultSelectedKeys) {
        this._selected.set([...this.defaultSelectedKeys])
      }
    }
  }
  get treeData(): SgTreeDataNode[] {
    return this._treeData
  }
  private _treeData: SgTreeDataNode[] = []

  @Input() defaultExpandedKeys?: SgTreeKey[]
  @Input() defaultSelectedKeys?: SgTreeKey[]
  @Input({ transform: booleanAttribute }) defaultExpandAll = false
  @Input({ transform: booleanAttribute }) selectable = true
  @Input({ transform: booleanAttribute }) showLine = false
  @Input({ transform: booleanAttribute }) showIcon = false
  @Input({ transform: booleanAttribute }) blockNode = false
  @Input({ transform: booleanAttribute }) directory = false
  @Input({ transform: booleanAttribute }) disabled = false
  @Input({ transform: booleanAttribute }) animated = true
  @Input({ transform: numberAttribute }) indentSize = 24
  @Input() emptyText = 'No data'

  @Output() readonly expandedKeysChange = new EventEmitter<SgTreeKey[]>()
  @Output() readonly selectedKeysChange = new EventEmitter<SgTreeKey[]>()

  readonly classes = computed(() =>
    [
      'sg-tree',
      this.showLine ? 'sg-tree-show-line' : '',
      this.blockNode ? 'sg-tree-block-node' : '',
      this.directory ? 'sg-tree-directory' : '',
      this.disabled ? 'sg-tree-disabled' : '',
      this.animated ? 'sg-tree-animated' : '',
    ]
      .filter(Boolean)
      .join(' '),
  )

  readonly flatNodes = computed<FlatNode[]>(() => {
    const out: FlatNode[] = []
    const walk = (nodes: SgTreeDataNode[], depth: number, parentKeys: SgTreeKey[]): void => {
      for (const n of nodes) {
        const isLeaf = n.isLeaf ?? !(n.children && n.children.length > 0)
        out.push({ node: n, depth, parentKeys, isLeaf })
        if (n.children && n.children.length > 0) {
          walk(n.children, depth + 1, [...parentKeys, n.key])
        }
      }
    }
    walk(this._treeData, 0, [])
    return out
  })

  readonly visibleNodes = computed<FlatNode[]>(() => {
    const exp = this._expanded()
    return this.flatNodes().filter((row) => row.parentKeys.every((p) => exp.has(p)))
  })

  isExpanded(k: SgTreeKey): boolean {
    return this._expanded().has(k)
  }
  isSelected(k: SgTreeKey): boolean {
    return this._selected().includes(k)
  }

  rowClass(item: FlatNode): string {
    return [
      'sg-tree-node',
      this.isSelected(item.node.key) ? 'sg-tree-node-selected' : '',
      item.node.disabled || this.disabled ? 'sg-tree-node-disabled' : '',
      item.isLeaf ? 'sg-tree-node-leaf' : '',
      this.isExpanded(item.node.key) ? 'sg-tree-node-expanded' : '',
      this.showLine ? 'sg-tree-node-show-line' : '',
    ]
      .filter(Boolean)
      .join(' ')
  }

  switcherClass(k: SgTreeKey): string {
    return (
      'sg-tree-switcher ' +
      (this.isExpanded(k) ? 'sg-tree-switcher-open' : 'sg-tree-switcher-close')
    )
  }

  arrowClass(k: SgTreeKey): string {
    return 'sg-tree-switcher-arrow' + (this.isExpanded(k) ? ' sg-tree-switcher-arrow-open' : '')
  }

  titleClass(): string {
    return 'sg-tree-title' + (this.selectable ? ' sg-tree-title-selectable' : '')
  }

  iconFor(item: FlatNode): string {
    if (item.node.icon) return item.node.icon
    if (this.directory) return this.isExpanded(item.node.key) ? '📂' : '📁'
    return ''
  }

  toggleExpand(k: SgTreeKey, e: Event): void {
    e.stopPropagation()
    const cur = new Set(this._expanded())
    if (cur.has(k)) cur.delete(k)
    else cur.add(k)
    this._expanded.set(cur)
    this.expandedKeysChange.emit([...cur])
  }

  onRowClick(item: FlatNode): void {
    if (this.disabled || item.node.disabled) return
    if (this.directory && !item.isLeaf) {
      this.toggleExpand(item.node.key, new Event('click'))
    }
    if (!this.selectable) return
    const cur = this._selected()
    const next = cur.includes(item.node.key) ? [] : [item.node.key]
    this._selected.set(next)
    this.selectedKeysChange.emit(next)
  }
}
