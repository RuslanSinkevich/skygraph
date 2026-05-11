import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { SgTagComponent } from '@skygraph/angular'
import { PAGE_STYLES } from '../_shared/page.styles'

@Component({
  selector: 'sg-tag-page',
  standalone: true,
  imports: [SgTagComponent],
  template: `
    <h1>Tag</h1>
    <p class="lead">
      Compact label for status, category, or removable selection. Preset semantic colors plus
      borderless and closable variants.
    </p>

    <section class="demo-section">
      <h3>Preset colors</h3>
      <div class="row">
        <span sg-tag>Default</span>
        <span sg-tag color="success">Success</span>
        <span sg-tag color="processing">Processing</span>
        <span sg-tag color="warning">Warning</span>
        <span sg-tag color="error">Error</span>
      </div>
    </section>

    <section class="demo-section">
      <h3>Custom colors</h3>
      <div class="row">
        <span sg-tag color="#1677ff">#1677ff</span>
        <span sg-tag color="#52c41a">#52c41a</span>
        <span sg-tag color="#722ed1">#722ed1</span>
      </div>
    </section>

    <section class="demo-section">
      <h3>Borderless</h3>
      <div class="row">
        <span sg-tag color="success" [bordered]="false">Success</span>
        <span sg-tag color="warning" [bordered]="false">Warning</span>
      </div>
    </section>

    <section class="demo-section">
      <h3>Closable</h3>
      <div class="row">
        @for (t of openTags(); track t) {
          <span sg-tag color="processing" closable (closed)="remove(t)">{{ t }}</span>
        }
      </div>
      <p class="meta">{{ openTags().length }} remaining</p>
    </section>
  `,
  styles: [PAGE_STYLES],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagPageComponent {
  readonly openTags = signal(['Alpha', 'Beta', 'Gamma'])

  remove(t: string): void {
    this.openTags.update((arr) => arr.filter((x) => x !== t))
  }
}
