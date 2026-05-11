import { ChangeDetectionStrategy, Component } from '@angular/core'
import { SgTextareaComponent } from '@skygraph/angular'
import { PAGE_STYLES } from '../_shared/page.styles'

@Component({
  selector: 'sg-textarea-page',
  standalone: true,
  imports: [SgTextareaComponent],
  template: `
    <h1>Textarea</h1>
    <p class="lead">Multi-line text input with optional character count.</p>

    <section class="demo-section">
      <h3>Default</h3>
      <div sg-textarea placeholder="Enter description…" rows="4"></div>
    </section>

    <section class="demo-section">
      <h3>Char count</h3>
      <div sg-textarea [maxLength]="120" showCount placeholder="Up to 120 chars"></div>
    </section>

    <section class="demo-section">
      <h3>Two-way</h3>
      <div sg-textarea [(value)]="bound"></div>
      <p class="meta">{{ bound.length }} chars</p>
    </section>
  `,
  styles: [PAGE_STYLES],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextareaPageComponent {
  bound = ''
}
