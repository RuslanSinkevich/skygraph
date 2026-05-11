import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { SgButtonComponent, SgProgressComponent } from '@skygraph/angular'
import { PAGE_STYLES } from '../_shared/page.styles'

@Component({
  selector: 'sg-progress-page',
  standalone: true,
  imports: [SgProgressComponent, SgButtonComponent],
  template: `
    <h1>Progress</h1>
    <p class="lead">Line and circular progress indicator.</p>

    <section class="demo-section">
      <h3>Line</h3>
      <div class="col">
        <div sg-progress [percent]="30"></div>
        <div sg-progress [percent]="60" status="active"></div>
        <div sg-progress [percent]="80" status="error"></div>
        <div sg-progress [percent]="100"></div>
      </div>
    </section>

    <section class="demo-section">
      <h3>Circle</h3>
      <div class="row">
        <div sg-progress type="circle" [percent]="25"></div>
        <div sg-progress type="circle" [percent]="60" strokeColor="#722ed1"></div>
        <div sg-progress type="circle" [percent]="100"></div>
      </div>
    </section>

    <section class="demo-section">
      <h3>Animated</h3>
      <div class="row">
        <button sg-button (click)="step(-10)">−10</button>
        <button sg-button (click)="step(10)">+10</button>
      </div>
      <div sg-progress [percent]="value()" style="margin-top:12px"></div>
    </section>
  `,
  styles: [PAGE_STYLES],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressPageComponent {
  readonly value = signal(40)
  step(d: number): void {
    this.value.update((n) => Math.max(0, Math.min(100, n + d)))
  }
}
