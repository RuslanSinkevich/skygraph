import { ChangeDetectionStrategy, Component } from '@angular/core'
import { SgAvatarComponent } from '@skygraph/angular'
import { PAGE_STYLES } from '../_shared/page.styles'

@Component({
  selector: 'sg-avatar-page',
  standalone: true,
  imports: [SgAvatarComponent],
  template: `
    <h1>Avatar</h1>
    <p class="lead">User avatar from image, initials, or icon — circle or square.</p>

    <section class="demo-section">
      <h3>Sizes</h3>
      <div class="row">
        <span sg-avatar size="small">A</span>
        <span sg-avatar>B</span>
        <span sg-avatar size="large">C</span>
        <span sg-avatar [size]="56">XL</span>
      </div>
    </section>

    <section class="demo-section">
      <h3>Shapes</h3>
      <div class="row">
        <span sg-avatar shape="circle">JD</span>
        <span sg-avatar shape="square">MK</span>
      </div>
    </section>

    <section class="demo-section">
      <h3>Image</h3>
      <div class="row">
        <span sg-avatar src="https://i.pravatar.cc/64?img=12" alt="User"></span>
        <span sg-avatar src="https://i.pravatar.cc/64?img=42" alt="Other"></span>
      </div>
    </section>
  `,
  styles: [PAGE_STYLES],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarPageComponent {}
