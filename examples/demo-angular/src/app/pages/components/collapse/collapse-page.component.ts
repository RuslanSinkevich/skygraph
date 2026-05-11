import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { SgCollapseComponent, type SgCollapseItem } from '@skygraph/angular'
import { PAGE_STYLES } from '../_shared/page.styles'

@Component({
  selector: 'sg-collapse-page',
  standalone: true,
  imports: [SgCollapseComponent],
  template: `
    <h1>Collapse</h1>
    <p class="lead">
      Vertical stack of expandable panels. Multi-open by default; turn on
      <code>accordion</code> to enforce single-open.
    </p>

    <section class="demo-section">
      <h3>Default (multi-open)</h3>
      <div sg-collapse [items]="items" [(activeKey)]="open1"></div>
    </section>

    <section class="demo-section">
      <h3>Accordion</h3>
      <div sg-collapse [items]="items" accordion [(activeKey)]="open2"></div>
    </section>

    <section class="demo-section">
      <h3>Ghost, no border</h3>
      <div sg-collapse [items]="items" ghost [bordered]="false" [(activeKey)]="open3"></div>
    </section>
  `,
  styles: [PAGE_STYLES],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollapsePageComponent {
  readonly items: SgCollapseItem[] = [
    {
      key: 'why',
      label: 'Why use SkyGraph?',
      content: 'Because it is fast, accessible, and framework-agnostic.',
    },
    {
      key: 'when',
      label: 'When should I use it?',
      content: 'When you ship multi-framework UI with a shared CSS contract.',
    },
    {
      key: 'how',
      label: 'How do I get started?',
      content: 'Install @skygraph/angular and provide SgConfig at app root.',
    },
  ]
  readonly open1 = signal<string | string[] | undefined>(['why'])
  readonly open2 = signal<string | string[] | undefined>('when')
  readonly open3 = signal<string | string[] | undefined>(['how'])
}
