import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { I18nService } from '../../i18n'

const GITHUB_URL = 'https://github.com/RuslanSinkevich/skygraph'
const TOKENS_URL = `${GITHUB_URL}/blob/master/packages/styles/tokens.css`
const REACT_REFERENCE = `${GITHUB_URL}/blob/master/examples/demo/src/demos/DesignTokensPage.tsx`

/**
 * Guide → Design Tokens — Angular stub. Same scope-cut as Vue's
 * design-tokens guide: full token explorer is React-only for now.
 */
@Component({
  selector: 'sg-design-tokens-page',
  standalone: true,
  template: `
    <section class="doc-page">
      <h1>{{ i18n.t().guideStub.designTokensTitle }}</h1>
      <p class="doc-lead">{{ i18n.t().guideStub.designTokensLead }}</p>
      <p>{{ i18n.t().guideStub.designTokensDescription }}</p>
      <ul>
        <li>
          <a class="doc-link" [href]="tokensUrl" target="_blank" rel="noreferrer noopener">
            packages/styles/tokens.css
          </a>
          — {{ i18n.t().guideStub.designTokensTokensLine }}
        </li>
        <li>
          <a class="doc-link" [href]="reactReference" target="_blank" rel="noreferrer noopener">
            {{ i18n.t().guideStub.seeReactDocs }}
          </a>
        </li>
      </ul>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DesignTokensPageComponent {
  protected readonly i18n = inject(I18nService)
  protected readonly tokensUrl = TOKENS_URL
  protected readonly reactReference = REACT_REFERENCE
}
