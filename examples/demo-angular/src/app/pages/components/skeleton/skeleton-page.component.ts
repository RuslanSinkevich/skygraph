import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { SgButtonComponent, SgSkeletonComponent } from '@skygraph/angular'
import { PAGE_STYLES } from '../_shared/page.styles'

@Component({
  selector: 'sg-skeleton-page',
  standalone: true,
  imports: [SgSkeletonComponent, SgButtonComponent],
  template: `
    <h1>Skeleton</h1>
    <p class="lead">Placeholder UI while content loads.</p>

    <section class="demo-section">
      <h3>Default</h3>
      <div sg-skeleton></div>
    </section>

    <section class="demo-section">
      <h3>Active animation + avatar</h3>
      <div sg-skeleton avatar active></div>
    </section>

    <section class="demo-section">
      <h3>Toggle real content</h3>
      <div class="row">
        <button sg-button (click)="toggle()">
          {{ loading() ? 'Show content' : 'Show skeleton' }}
        </button>
      </div>
      <div sg-skeleton avatar [loading]="loading()" style="margin-top:12px">
        <h3 style="margin:0 0 6px">Real heading</h3>
        <p style="margin:0;color:var(--sg-demo-muted)">
          Real paragraph content shown when loading is false.
        </p>
      </div>
    </section>
  `,
  styles: [PAGE_STYLES],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkeletonPageComponent {
  readonly loading = signal(true)
  toggle(): void {
    this.loading.update((v) => !v)
  }
}
