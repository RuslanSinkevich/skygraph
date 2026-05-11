import { ChangeDetectionStrategy, Component } from '@angular/core'
import { SgBadgeComponent } from '@skygraph/angular'
import { PAGE_STYLES } from '../_shared/page.styles'

@Component({
  selector: 'sg-badge-page',
  standalone: true,
  imports: [SgBadgeComponent],
  template: `
    <h1>Badge</h1>
    <p class="lead">
      Counts, dots, and status ribbons over arbitrary content. Use
      <code>noChildren</code> when the badge stands on its own (no slot).
    </p>

    <section class="demo-section">
      <h3>Counts on content</h3>
      <div class="row">
        <span sg-badge [count]="5">
          <span class="placeholder">avatar</span>
        </span>
        <span sg-badge [count]="120" [overflowCount]="99">
          <span class="placeholder">notif</span>
        </span>
        <span sg-badge dot>
          <span class="placeholder">dot</span>
        </span>
      </div>
    </section>

    <section class="demo-section">
      <h3>Standalone</h3>
      <div class="row">
        <span sg-badge [count]="42" noChildren></span>
        <span sg-badge dot noChildren></span>
        <span sg-badge [count]="8" color="#722ed1" noChildren></span>
      </div>
    </section>

    <section class="demo-section">
      <h3>Status</h3>
      <div class="row">
        <span sg-badge status="success" text="Success" noChildren></span>
        <span sg-badge status="processing" text="Processing" noChildren></span>
        <span sg-badge status="warning" text="Warning" noChildren></span>
        <span sg-badge status="error" text="Error" noChildren></span>
        <span sg-badge status="default" text="Default" noChildren></span>
      </div>
    </section>
  `,
  styles: [
    PAGE_STYLES,
    `
      .placeholder {
        display: inline-block;
        width: 36px;
        height: 36px;
        border-radius: 6px;
        background: var(--sg-demo-border);
        text-align: center;
        line-height: 36px;
        font-size: 11px;
        color: var(--sg-demo-muted);
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BadgePageComponent {}
