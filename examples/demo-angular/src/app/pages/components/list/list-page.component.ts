import { ChangeDetectionStrategy, Component } from '@angular/core'
import {
  SgListComponent,
  SgListItemComponent,
  SgListItemTemplateDirective,
} from '@skygraph/angular'
import { PAGE_STYLES } from '../_shared/page.styles'

interface Person {
  name: string
  role: string
}

@Component({
  selector: 'sg-list-page',
  standalone: true,
  imports: [SgListComponent, SgListItemComponent, SgListItemTemplateDirective],
  template: `
    <h1>List</h1>
    <p class="lead">
      Vertical list with header / footer / split / bordered / size / hover / row click. Pagination,
      virtual scroll, drag-and-drop, grid layout and multi-select are deferred
      (<code>F-List-Limited</code>). Use <code>&lt;ng-template sgListItem&gt;</code> to render rows.
    </p>

    <section class="demo-section">
      <h3>Default</h3>
      <div sg-list [dataSource]="people" header="Team" footer="3 members">
        <ng-template sgListItem let-person>
          <div sg-list-item>
            <strong>{{ person.name }}</strong> · <span class="meta">{{ person.role }}</span>
          </div>
        </ng-template>
      </div>
    </section>

    <section class="demo-section">
      <h3>Bordered, small</h3>
      <div sg-list [dataSource]="people" size="small" bordered>
        <ng-template sgListItem let-person>
          <div sg-list-item>{{ person.name }} — {{ person.role }}</div>
        </ng-template>
      </div>
    </section>

    <section class="demo-section">
      <h3>Selectable</h3>
      <div sg-list [dataSource]="people" selectable>
        <ng-template sgListItem let-person>
          <div sg-list-item>{{ person.name }}</div>
        </ng-template>
      </div>
    </section>

    <section class="demo-section">
      <h3>Empty / loading</h3>
      <div sg-list [dataSource]="empty" header="Empty"></div>
      <br />
      <div sg-list [dataSource]="people" loading></div>
    </section>
  `,
  styles: [PAGE_STYLES],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListPageComponent {
  readonly people: Person[] = [
    { name: 'Ada Lovelace', role: 'Mathematician' },
    { name: 'Alan Turing', role: 'Computer scientist' },
    { name: 'Grace Hopper', role: 'Naval officer' },
  ]
  readonly empty: Person[] = []
}
