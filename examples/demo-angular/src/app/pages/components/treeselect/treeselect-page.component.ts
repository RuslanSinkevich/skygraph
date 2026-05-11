import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { SgTreeSelectComponent, type SgTreeNode } from '@skygraph/angular'
import { PAGE_STYLES } from '../_shared/page.styles'

@Component({
  selector: 'sg-tree-select-page',
  standalone: true,
  imports: [SgTreeSelectComponent],
  template: `
    <h1>TreeSelect</h1>
    <p class="lead">
      Single-select with hierarchical expand/collapse rows. Multi-select checkboxes
      (<code>treeCheckable</code>) and <code>showSearch</code>
      are deferred (<code>F-TreeSelect-Limited</code>).
    </p>

    <section class="demo-section">
      <h3>Default</h3>
      <div class="row">
        <div
          sg-tree-select
          [treeData]="data"
          [value]="value()"
          (valueChange)="onChange($event)"
          placeholder="Pick a node"
          treeDefaultExpandAll
        ></div>
        <span class="meta"
          >value = <code>{{ value() ?? '∅' }}</code></span
        >
      </div>
    </section>

    <section class="demo-section">
      <h3>Sizes</h3>
      <div class="row">
        <div sg-tree-select size="small" [treeData]="data"></div>
        <div sg-tree-select size="middle" [treeData]="data"></div>
        <div sg-tree-select size="large" [treeData]="data"></div>
      </div>
    </section>

    <section class="demo-section">
      <h3>Disabled</h3>
      <div sg-tree-select [treeData]="data" disabled value="berlin"></div>
    </section>
  `,
  styles: [PAGE_STYLES],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TreeSelectPageComponent {
  readonly data: SgTreeNode[] = [
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
        { key: 'fr', title: 'France', children: [{ key: 'paris', title: 'Paris' }] },
      ],
    },
    {
      key: 'asia',
      title: 'Asia',
      children: [{ key: 'jp', title: 'Japan', children: [{ key: 'tokyo', title: 'Tokyo' }] }],
    },
  ]

  readonly value = signal<string | number | undefined>(undefined)

  onChange(v: string | number | undefined): void {
    this.value.set(v)
  }
}
