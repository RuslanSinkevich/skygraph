import { ChangeDetectionStrategy, Component } from '@angular/core'
import { SgTagInputComponent } from '@skygraph/angular'
import { PAGE_STYLES } from '../_shared/page.styles'

@Component({
  selector: 'sg-taginput-page',
  standalone: true,
  imports: [SgTagInputComponent],
  template: `
    <h1>TagInput</h1>
    <p class="lead">Multi-value chip input — Enter / comma adds, Backspace removes.</p>

    <section class="demo-section">
      <h3>Default</h3>
      <div sg-tag-input [defaultValue]="['angular', 'react']" style="width: 360px"></div>
    </section>

    <section class="demo-section">
      <h3>Max + colored chips</h3>
      <div
        sg-tag-input
        [defaultValue]="['vue']"
        [maxTags]="5"
        tagColor="success"
        style="width: 360px"
      ></div>
    </section>

    <section class="demo-section">
      <h3>Two-way</h3>
      <div sg-tag-input [(value)]="bound" style="width: 360px"></div>
      <p class="meta">{{ bound.length }} tag(s): {{ bound.join(', ') || '—' }}</p>
    </section>
  `,
  styles: [PAGE_STYLES],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagInputPageComponent {
  bound: string[] = []
}
