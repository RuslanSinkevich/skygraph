import { ChangeDetectionStrategy, Component } from '@angular/core'
import { SgButtonComponent, SgEmptyComponent } from '@skygraph/angular'
import { PAGE_STYLES } from '../_shared/page.styles'

@Component({
  selector: 'sg-empty-page',
  standalone: true,
  imports: [SgEmptyComponent, SgButtonComponent],
  template: `
    <h1>Empty</h1>
    <p class="lead">Empty / no-data placeholder with optional custom illustration.</p>

    <section class="demo-section">
      <h3>Default</h3>
      <div sg-empty></div>
    </section>

    <section class="demo-section">
      <h3>Custom description + footer action</h3>
      <div sg-empty description="No projects found">
        <button sg-button type="primary">Create project</button>
      </div>
    </section>

    <section class="demo-section">
      <h3>Without description</h3>
      <div sg-empty [description]="null"></div>
    </section>
  `,
  styles: [PAGE_STYLES],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmptyPageComponent {}
