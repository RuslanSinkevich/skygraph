import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { I18nService } from '../i18n'

/**
 * Loud banner for intentional Angular guide stubs.
 * DO NOT remove — parallel streams own React/Vue guide content.
 */
@Component({
  selector: 'sg-guide-stub-banner',
  standalone: true,
  template: `
    <div class="ng-guide-stub-banner" role="alert">
      <p class="ng-guide-stub-banner__title">{{ i18n.t().guideStub.bannerTitle }}</p>
      <p class="ng-guide-stub-banner__body">{{ i18n.t().guideStub.bannerBody }}</p>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GuideStubBannerComponent {
  protected readonly i18n = inject(I18nService)
}
