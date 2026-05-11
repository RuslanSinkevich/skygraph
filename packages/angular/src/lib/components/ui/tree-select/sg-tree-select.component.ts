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
import type { SizeType } from '../../../types'

export interface SgTreeNode {
  key: string | number
  title: string
  disabled?: boolean
  children?: SgTreeNode[]
}

interface FlatRow {
  node: SgTreeNode
  depth: number
  hidden: boolean
  expanded: boolean
}

/**
 * Attribute-selector tree-select, DOM-equivalent of
 * `packages/react/src/components/complex/TreeSelect/TreeSelect.tsx` (single
 * mode subset).
 *
 * Use as `<div sg-tree-select [treeData]="…" [(value)]="key"></div>`.
 *
 * Wave 4.2 ships single-select with expand/collapse. Multi-select with
 * checkboxes (`treeCheckable`) and `showSearch` are deferred to 4.3
 * (see findings F-TreeSelect-Limited).
 */
@Component({
  selector: 'div[sg-tree-select]',
  standalone: true,
  template: `
    <div class="sg-tree-select-selector" (click)="toggleOpen()">
      @if (display()) {
        <span class="sg-tree-select-selection-item">{{ display() }}</span>
      } @else {
        <span class="sg-tree-select-placeholder">{{ placeholder }}</span>
      }
      <span class="sg-tree-select-arrow">{{ open() ? '▲' : '▼' }}</span>
    </div>
    @if (open()) {
      <div class="sg-tree-select-dropdown">
        <div class="sg-tree-select-tree">
          @for (row of rows(); track row.node.key) {
            @if (!row.hidden) {
              <div
                [class]="rowClass(row)"
                [style.padding-left.px]="row.depth * 16"
                (click)="onRowClick(row, $event)"
              >
                @if (row.node.children?.length) {
                  <span class="sg-tree-select-switcher" (click)="toggleExpand(row, $event)">{{
                    row.expanded ? '▾' : '▸'
                  }}</span>
                } @else {
                  <span class="sg-tree-select-switcher sg-tree-select-switcher-leaf"></span>
                }
                <span class="sg-tree-select-node-title">{{ row.node.title }}</span>
              </div>
            }
          }
        </div>
      </div>
    }
  `,
  host: {
    '[class]': 'classes()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SgTreeSelectComponent {
  private readonly cfg = injectSgConfig()
  private readonly el = inject(ElementRef<HTMLElement>)

  protected readonly _open = signal(false)
  protected readonly _internal = signal<string | number | undefined>(undefined)
  protected readonly _ctrl = signal<string | number | undefined>(undefined)
  protected readonly _expanded = signal<Set<string | number>>(new Set())
  protected readonly _disabled = signal<boolean | undefined>(undefined)
  protected readonly _size = signal<SizeType | undefined>(undefined)

  @Input({ required: true }) treeData: SgTreeNode[] = []
  @Input() placeholder = 'Please select'

  @Input({ transform: booleanAttribute })
  set treeDefaultExpandAll(v: boolean) {
    if (v) this._expanded.set(new Set(this.collectAllKeys(this.treeData)))
  }

  @Input()
  get value(): string | number | undefined {
    return this._ctrl() ?? this._internal()
  }
  set value(v: string | number | undefined) {
    this._ctrl.set(v)
    if (v !== undefined) this._internal.set(v)
  }
  @Input()
  set defaultValue(v: string | number | undefined) {
    if (this._ctrl() === undefined) this._internal.set(v)
  }

  @Input({ transform: booleanAttribute })
  get disabled(): boolean {
    return this.resolvedDisabled()
  }
  set disabled(v: boolean | undefined) {
    this._disabled.set(v)
  }

  @Input()
  get size(): SizeType | undefined {
    return this._size()
  }
  set size(v: SizeType | undefined) {
    this._size.set(v)
  }

  @Output() readonly valueChange = new EventEmitter<string | number>()

  readonly open = this._open.asReadonly()

  readonly resolvedDisabled = computed(() => this._disabled() ?? this.cfg.disabled ?? false)

  readonly resolvedSize = computed(() => this._size() ?? this.cfg.size ?? 'middle')

  readonly classes = computed(() =>
    [
      'sg-tree-select',
      `sg-tree-select-${this.resolvedSize()}`,
      this._open() ? 'sg-tree-select-open' : '',
      this.resolvedDisabled() ? 'sg-tree-select-disabled' : '',
    ]
      .filter(Boolean)
      .join(' '),
  )

  readonly display = computed(() => {
    const v = this._ctrl() ?? this._internal()
    if (v === undefined) return ''
    return this.findNode(this.treeData, v)?.title ?? ''
  })

  readonly rows = computed<FlatRow[]>(() => {
    const out: FlatRow[] = []
    const expanded = this._expanded()
    const walk = (nodes: SgTreeNode[], depth: number, hidden: boolean): void => {
      for (const node of nodes) {
        const isExpanded = expanded.has(node.key)
        out.push({ node, depth, hidden, expanded: isExpanded })
        if (node.children?.length) walk(node.children, depth + 1, hidden || !isExpanded)
      }
    }
    walk(this.treeData, 0, false)
    return out
  })

  rowClass(row: FlatRow): string {
    const v = this._ctrl() ?? this._internal()
    return [
      'sg-tree-select-node',
      v === row.node.key ? 'sg-tree-select-node-selected' : '',
      row.node.disabled ? 'sg-tree-select-node-disabled' : '',
    ]
      .filter(Boolean)
      .join(' ')
  }

  toggleOpen(): void {
    if (this.resolvedDisabled()) return
    this._open.update((v) => !v)
  }

  toggleExpand(row: FlatRow, e: Event): void {
    e.stopPropagation()
    this._expanded.update((set) => {
      const next = new Set(set)
      if (next.has(row.node.key)) next.delete(row.node.key)
      else next.add(row.node.key)
      return next
    })
  }

  onRowClick(row: FlatRow, _e: Event): void {
    if (row.node.disabled) return
    if (this._ctrl() === undefined) this._internal.set(row.node.key)
    this.valueChange.emit(row.node.key)
    this._open.set(false)
  }

  private findNode(nodes: SgTreeNode[], key: string | number): SgTreeNode | undefined {
    for (const n of nodes) {
      if (n.key === key) return n
      if (n.children) {
        const f = this.findNode(n.children, key)
        if (f) return f
      }
    }
    return undefined
  }

  private collectAllKeys(nodes: SgTreeNode[]): (string | number)[] {
    const out: (string | number)[] = []
    const walk = (list: SgTreeNode[]): void => {
      for (const n of list) {
        out.push(n.key)
        if (n.children) walk(n.children)
      }
    }
    walk(nodes)
    return out
  }

  @HostListener('document:mousedown', ['$event'])
  onDocumentClick(e: MouseEvent): void {
    if (!this._open()) return
    if (!this.el.nativeElement.contains(e.target as Node)) this._open.set(false)
  }
}
