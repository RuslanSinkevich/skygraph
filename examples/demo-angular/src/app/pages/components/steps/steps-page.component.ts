import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { SgStepsComponent, type SgStepItem } from '@skygraph/angular'
import { PAGE_STYLES } from '../_shared/page.styles'

@Component({
  selector: 'sg-steps-page',
  standalone: true,
  imports: [SgStepsComponent],
  template: `
    <h1>Steps</h1>
    <p class="lead">
      Linear sequence indicator with finish/process/wait/error states. Items are derived from
      <code>current</code> unless an item overrides <code>status</code>.
    </p>

    <section class="demo-section">
      <h3>Horizontal</h3>
      <div sg-steps [items]="items" [current]="current()"></div>
      <div class="row" style="margin-top:12px">
        <button (click)="prev()">Prev</button>
        <button (click)="next()">Next</button>
      </div>
    </section>

    <section class="demo-section">
      <h3>Vertical, with error</h3>
      <div sg-steps direction="vertical" [items]="errored" [current]="1"></div>
    </section>
  `,
  styles: [PAGE_STYLES],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepsPageComponent {
  readonly items: SgStepItem[] = [
    { title: 'Login', description: 'Sign in to your account' },
    { title: 'Verify', description: 'Confirm your email' },
    { title: 'Done', description: 'Welcome aboard' },
  ]
  readonly errored: SgStepItem[] = [
    { title: 'Submit', description: 'Form sent' },
    { title: 'Review', description: 'Returned with errors', status: 'error' },
    { title: 'Approve', description: 'Pending review' },
  ]
  readonly current = signal(1)

  prev(): void {
    this.current.update((c) => Math.max(0, c - 1))
  }
  next(): void {
    this.current.update((c) => Math.min(this.items.length - 1, c + 1))
  }
}
