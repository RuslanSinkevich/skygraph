import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { I18nService } from '../../i18n'

const GITHUB_URL = 'https://github.com/RuslanSinkevich/skygraph-public'
const REACT_REFERENCE = `${GITHUB_URL}/blob/master/examples/demo/src/demos/StylingShowcasePage.tsx`

/**
 * Guide → Styling Showcase — Angular stub.
 *
 * The React reference page (`examples/demo/src/demos/StylingShowcasePage.tsx`)
 * is ~900 lines of interactive recipes. Porting it 1:1 is out of
 * scope for Wave 5.3 — see
 * `docs/_streams/findings/T-Angular-Polish.md#guide-stubs` (mirroring
 * the Vue-side `T-Vue-Demo-Header-Parity.md#guide-stubs`).
 */
@Component({
  selector: 'sg-styling-showcase-page',
  standalone: true,
  template: `
    <section class="doc-page">
      <h1>{{ i18n.t().guideStub.stylingShowcaseTitle }}</h1>
      <p class="doc-lead">{{ i18n.t().guideStub.stylingShowcaseLead }}</p>
      <p>
        <a class="doc-link" [href]="reactReference" target="_blank" rel="noreferrer noopener">
          {{ i18n.t().guideStub.seeReactDocs }}
        </a>
      </p>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StylingShowcasePageComponent {
  protected readonly i18n = inject(I18nService)
  protected readonly reactReference = REACT_REFERENCE
}
