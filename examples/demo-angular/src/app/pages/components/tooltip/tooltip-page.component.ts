import { ChangeDetectionStrategy, Component } from '@angular/core'
import { SgButtonComponent, SgTooltipComponent } from '@skygraph/angular'
import { PAGE_STYLES } from '../_shared/page.styles'

@Component({
  selector: 'sg-tooltip-page',
  standalone: true,
  imports: [SgButtonComponent, SgTooltipComponent],
  template: `
    <h1>Tooltip</h1>
    <p class="lead">
      Floating help text shown on hover or focus. Position is decorative (CSS-only, no runtime
      measure — same as React).
    </p>

    <section class="demo-section">
      <h3>Placements</h3>
      <div class="row">
        <span sg-tooltip title="Top tooltip" placement="top">
          <button sg-button>Top</button>
        </span>
        <span sg-tooltip title="Bottom tooltip" placement="bottom">
          <button sg-button>Bottom</button>
        </span>
        <span sg-tooltip title="Left tooltip" placement="left">
          <button sg-button>Left</button>
        </span>
        <span sg-tooltip title="Right tooltip" placement="right">
          <button sg-button>Right</button>
        </span>
      </div>
    </section>
  `,
  styles: [PAGE_STYLES],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TooltipPageComponent {}
