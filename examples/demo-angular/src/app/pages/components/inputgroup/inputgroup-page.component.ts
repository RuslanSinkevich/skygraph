import { ChangeDetectionStrategy, Component } from '@angular/core'
import { SgButtonComponent, SgInputComponent, SgInputGroupComponent } from '@skygraph/angular'
import { PAGE_STYLES } from '../_shared/page.styles'

@Component({
  selector: 'sg-inputgroup-page',
  standalone: true,
  imports: [SgInputGroupComponent, SgInputComponent, SgButtonComponent],
  template: `
    <h1>InputGroup</h1>
    <p class="lead">Compose an input with leading/trailing addons.</p>

    <section class="demo-section">
      <h3>Prefix + suffix</h3>
      <span sg-input-group>
        <span sg-input-group-before>https://</span>
        <span sg-input placeholder="example"></span>
        <span sg-input-group-after>.com</span>
      </span>
    </section>

    <section class="demo-section">
      <h3>Search + button</h3>
      <span sg-input-group>
        <span sg-input placeholder="Find user"></span>
        <button sg-input-group-after sg-button type="primary">Search</button>
      </span>
    </section>
  `,
  styles: [PAGE_STYLES],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputGroupPageComponent {}
