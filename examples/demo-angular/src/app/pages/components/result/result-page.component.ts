import { ChangeDetectionStrategy, Component } from '@angular/core'
import { SgButtonComponent, SgResultComponent } from '@skygraph/angular'
import { PAGE_STYLES } from '../_shared/page.styles'

@Component({
  selector: 'sg-result-page',
  standalone: true,
  imports: [SgResultComponent, SgButtonComponent],
  template: `
    <h1>Result</h1>
    <p class="lead">Outcome / status page (success, error, 404, etc.) with title + extra slot.</p>

    <section class="demo-section">
      <h3>Success</h3>
      <div
        sg-result
        status="success"
        title="Submission complete!"
        subTitle="Order #2024-001 has been confirmed."
      >
        <button sg-button type="primary" sg-result-extra>Go home</button>
        <button sg-button sg-result-extra>View order</button>
      </div>
    </section>

    <section class="demo-section">
      <h3>404</h3>
      <div
        sg-result
        status="404"
        title="Page not found"
        subTitle="Sorry, the page you visited does not exist."
      >
        <button sg-button type="primary" sg-result-extra>Back home</button>
      </div>
    </section>

    <section class="demo-section">
      <h3>Error</h3>
      <div
        sg-result
        status="error"
        title="Something went wrong"
        subTitle="Please check your input."
      ></div>
    </section>
  `,
  styles: [PAGE_STYLES],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultPageComponent {}
