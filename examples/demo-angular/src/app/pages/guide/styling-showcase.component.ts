import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { I18nService } from '../../i18n'
import { GuideStubBannerComponent } from '../../shared/guide-stub-banner.component'

const GITHUB_URL = 'https://github.com/RuslanSinkevich/skygraph-public'
const REACT_REFERENCE = `${GITHUB_URL}/blob/master/examples/demo/src/demos/StylingShowcasePage.tsx`

/**
 * Guide → Styling Showcase — Angular STUB.
 *
 * ⛔ Intentionally minimal. Full gallery lives in React/Vue demos.
 * Do not port content here without explicit approval — this file is a
 * menu placeholder only.
 */
@Component({
  selector: 'sg-styling-showcase-page',
  standalone: true,
  imports: [GuideStubBannerComponent],
  template: `
    <section class="doc-page">
      <sg-guide-stub-banner />

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
