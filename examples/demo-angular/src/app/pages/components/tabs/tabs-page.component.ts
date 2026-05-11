import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { SgTabsComponent, type SgTabItem } from '@skygraph/angular'
import { PAGE_STYLES } from '../_shared/page.styles'

@Component({
  selector: 'sg-tabs-page',
  standalone: true,
  imports: [SgTabsComponent],
  template: `
    <h1>Tabs</h1>
    <p class="lead">
      Tabbed interface for splitting content into mutually-exclusive panels. Card and line types,
      keyboard navigation (arrows / Home / End), and a controlled <code>[(activeKey)]</code>.
    </p>

    <section class="demo-section">
      <h3>Card (default)</h3>
      <div sg-tabs [items]="basic" [(activeKey)]="key1"></div>
      <p class="meta">Active: {{ key1() }}</p>
    </section>

    <section class="demo-section">
      <h3>Line type</h3>
      <div sg-tabs [items]="basic" type="line" [(activeKey)]="key2"></div>
    </section>

    <section class="demo-section">
      <h3>Disabled and loading tabs</h3>
      <div sg-tabs [items]="states" [(activeKey)]="key3"></div>
    </section>
  `,
  styles: [PAGE_STYLES],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsPageComponent {
  readonly basic: SgTabItem[] = [
    { key: 'overview', label: 'Overview', content: 'Overview panel content' },
    { key: 'usage', label: 'Usage', content: 'Usage panel content' },
    { key: 'api', label: 'API', content: 'API panel content' },
  ]
  readonly states: SgTabItem[] = [
    { key: 'a', label: 'Open', content: 'Active content' },
    { key: 'b', label: 'Locked', content: '', disabled: true },
    { key: 'c', label: 'Loading', content: '', loading: true },
  ]
  readonly key1 = signal<string>('overview')
  readonly key2 = signal<string>('overview')
  readonly key3 = signal<string>('a')
}
