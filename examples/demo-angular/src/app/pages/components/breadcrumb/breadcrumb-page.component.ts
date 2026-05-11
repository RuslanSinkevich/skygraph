import { ChangeDetectionStrategy, Component } from '@angular/core'
import { SgBreadcrumbComponent, type SgBreadcrumbItem } from '@skygraph/angular'
import { PAGE_STYLES } from '../_shared/page.styles'

@Component({
  selector: 'sg-breadcrumb-page',
  standalone: true,
  imports: [SgBreadcrumbComponent],
  template: `
    <h1>Breadcrumb</h1>
    <p class="lead">
      Hierarchical navigation showing the path from a root location to the current page. Supports
      custom separators and link / non-link segments.
    </p>

    <section class="demo-section">
      <h3>Default</h3>
      <nav sg-breadcrumb [items]="trail"></nav>
    </section>

    <section class="demo-section">
      <h3>Custom separator</h3>
      <nav sg-breadcrumb [items]="trail" separator=">"></nav>
    </section>
  `,
  styles: [PAGE_STYLES],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbPageComponent {
  readonly trail: SgBreadcrumbItem[] = [
    { title: 'Home', href: '/' },
    { title: 'Components', href: '/components' },
    { title: 'Breadcrumb' },
  ]
}
