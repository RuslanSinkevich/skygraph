import { ChangeDetectionStrategy, Component } from '@angular/core'
import { SgInputPasswordComponent } from '@skygraph/angular'
import { PAGE_STYLES } from '../_shared/page.styles'

@Component({
  selector: 'sg-inputpassword-page',
  standalone: true,
  imports: [SgInputPasswordComponent],
  template: `
    <h1>InputPassword</h1>
    <p class="lead">Password field with optional show/hide toggle and strength meter.</p>

    <section class="demo-section">
      <h3>Default</h3>
      <div sg-input-password placeholder="Password"></div>
    </section>

    <section class="demo-section">
      <h3>Strength meter</h3>
      <div sg-input-password [showStrength]="true" placeholder="Try Aa1!secure"></div>
    </section>

    <section class="demo-section">
      <h3>No toggle</h3>
      <div sg-input-password [visibilityToggle]="false" defaultValue="hidden"></div>
    </section>
  `,
  styles: [PAGE_STYLES],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputPasswordPageComponent {}
