import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { SgTreeComponent, type SgTreeDataNode } from '@skygraph/angular'
import { PAGE_STYLES } from '../_shared/page.styles'

@Component({
  selector: 'sg-tree-page',
  standalone: true,
  imports: [SgTreeComponent],
  template: `
    <h1>Tree</h1>
    <p class="lead">
      Hierarchical view with expand / collapse and single-select. Checkable nodes, draggable rows,
      async <code>loadData</code>, search, inline edit, virtual scroll, keyboard navigation and
      action buttons are deferred (<code>F-Tree-Limited</code>).
    </p>

    <section class="demo-section">
      <h3>Default (single-select)</h3>
      <div
        sg-tree
        [treeData]="data"
        defaultExpandAll
        (selectedKeysChange)="selected.set($event)"
      ></div>
      <p class="meta">
        selected = <code>[{{ selected().join(', ') }}]</code>
      </p>
    </section>

    <section class="demo-section">
      <h3>Directory mode</h3>
      <div sg-tree [treeData]="data" directory defaultExpandAll></div>
    </section>

    <section class="demo-section">
      <h3>Show line</h3>
      <div sg-tree [treeData]="data" showLine [defaultExpandedKeys]="['eu']"></div>
    </section>

    <section class="demo-section">
      <h3>Disabled</h3>
      <div sg-tree [treeData]="data" disabled defaultExpandAll></div>
    </section>
  `,
  styles: [PAGE_STYLES],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TreePageComponent {
  readonly data: SgTreeDataNode[] = [
    {
      key: 'eu',
      title: 'Europe',
      children: [
        {
          key: 'de',
          title: 'Germany',
          children: [
            { key: 'berlin', title: 'Berlin' },
            { key: 'munich', title: 'Munich' },
          ],
        },
        {
          key: 'fr',
          title: 'France',
          children: [{ key: 'paris', title: 'Paris' }],
        },
      ],
    },
    {
      key: 'asia',
      title: 'Asia',
      children: [
        {
          key: 'jp',
          title: 'Japan',
          children: [
            { key: 'tokyo', title: 'Tokyo' },
            { key: 'osaka', title: 'Osaka' },
          ],
        },
      ],
    },
  ]

  readonly selected = signal<(string | number)[]>([])
}
