import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { SgPaginationComponent } from '@skygraph/angular'
import { PAGE_STYLES } from '../_shared/page.styles'

@Component({
  selector: 'sg-pagination-page',
  standalone: true,
  imports: [SgPaginationComponent],
  template: `
    <h1>Pagination</h1>
    <p class="lead">
      Page-by-page navigation with ellipsis folding, simple variant, page-size changer, and quick
      jumper.
    </p>

    <section class="demo-section">
      <h3>Default</h3>
      <nav
        sg-pagination
        [current]="page1()"
        [total]="500"
        [pageSize]="10"
        showTotal
        (currentChange)="page1.set($event)"
      ></nav>
    </section>

    <section class="demo-section">
      <h3>Simple</h3>
      <nav
        sg-pagination
        [current]="page2()"
        [total]="200"
        [pageSize]="10"
        simple
        (currentChange)="page2.set($event)"
      ></nav>
    </section>

    <section class="demo-section">
      <h3>With size changer + jumper</h3>
      <nav
        sg-pagination
        [current]="page3()"
        [total]="500"
        [pageSize]="size3()"
        showSizeChanger
        showQuickJumper
        showTotal
        (currentChange)="page3.set($event)"
        (pageSizeChange)="size3.set($event); page3.set(1)"
      ></nav>
    </section>
  `,
  styles: [PAGE_STYLES],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationPageComponent {
  readonly page1 = signal(1)
  readonly page2 = signal(1)
  readonly page3 = signal(1)
  readonly size3 = signal(10)
}
