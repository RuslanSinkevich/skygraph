import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { SgSearchInputComponent } from '@skygraph/angular'
import { PAGE_STYLES } from '../_shared/page.styles'

@Component({
  selector: 'sg-searchinput-page',
  standalone: true,
  imports: [SgSearchInputComponent],
  template: `
    <h1>SearchInput</h1>
    <p class="lead">Search box with icon, clear button and optional submit button.</p>

    <section class="demo-section">
      <h3>Default</h3>
      <span sg-search-input placeholder="Type to search…" (search)="onSearch($event)"></span>
      <p class="meta">last query: "{{ lastQuery() }}"</p>
    </section>

    <section class="demo-section">
      <h3>With submit button</h3>
      <span sg-search-input enterButton="Search" (search)="onSearch($event)"></span>
    </section>

    <section class="demo-section">
      <h3>Sizes</h3>
      <div class="col">
        <span sg-search-input size="small" placeholder="Small"></span>
        <span sg-search-input size="large" placeholder="Large"></span>
      </div>
    </section>
  `,
  styles: [PAGE_STYLES],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchInputPageComponent {
  readonly lastQuery = signal('')
  onSearch(q: string): void {
    this.lastQuery.set(q)
  }
}
