import { ChangeDetectionStrategy, Component } from '@angular/core'
import { SgInlineEditComponent } from '@skygraph/angular'
import { PAGE_STYLES } from '../_shared/page.styles'

@Component({
  selector: 'sg-inlineedit-page',
  standalone: true,
  imports: [SgInlineEditComponent],
  template: `
    <h1>InlineEdit</h1>
    <p class="lead">Inline text field switching between view and edit modes.</p>

    <section class="demo-section">
      <h3>Default</h3>
      <span sg-inline-edit defaultValue="Project name"></span>
    </section>

    <section class="demo-section">
      <h3>Save on blur, no buttons</h3>
      <span sg-inline-edit defaultValue="Click to edit" [showButtons]="false"></span>
    </section>

    <section class="demo-section">
      <h3>Two-way</h3>
      <span sg-inline-edit [(value)]="bound"></span>
      <p class="meta">value = "{{ bound }}"</p>
    </section>
  `,
  styles: [PAGE_STYLES],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InlineEditPageComponent {
  bound = 'Edit me'
}
