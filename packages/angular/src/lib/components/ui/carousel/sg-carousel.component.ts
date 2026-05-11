import {
  ChangeDetectionStrategy,
  Component,
  Input,
  booleanAttribute,
  computed,
  contentChildren,
  signal,
} from '@angular/core'
import { CommonModule } from '@angular/common'
import { Directive, TemplateRef, inject } from '@angular/core'
import { injectSgConfig } from '../../../config/inject-sg-config'

/**
 * Marks one slide inside a `<sg-carousel>`. Wrap each slide's content in
 * `<ng-template sg-carousel-slide>...</ng-template>`.
 */
@Directive({
  selector: '[sg-carousel-slide]',
  standalone: true,
})
export class SgCarouselSlideDirective {
  readonly tpl = inject(TemplateRef<unknown>)
}

/**
 * Attribute-selector carousel, DOM-equivalent of
 * `packages/react/src/components/ui/Carousel.tsx`.
 *
 * Use as:
 * ```html
 * <div sg-carousel>
 *   <ng-template sg-carousel-slide>Slide 1</ng-template>
 *   <ng-template sg-carousel-slide>Slide 2</ng-template>
 * </div>
 * ```
 *
 * `autoplay` is accepted for API parity but is a no-op in 4.2 — see
 * decision D12 / finding F-Carousel-Autoplay.
 */
@Component({
  selector: 'div[sg-carousel]',
  standalone: true,
  imports: [CommonModule, SgCarouselSlideDirective],
  template: `
    <div class="sg-carousel-container">
      <div class="sg-carousel-track">
        @for (slide of slides(); let i = $index; track i) {
          <div
            [class]="slideClass(i)"
            [attr.aria-hidden]="i !== current()"
            [style.transform]="
              effect === 'slide' ? 'translateX(' + (i - current()) * 100 + '%)' : null
            "
          >
            <ng-container [ngTemplateOutlet]="slide.tpl"></ng-container>
          </div>
        }
      </div>
    </div>
    @if (dots && slides().length > 1) {
      <div [class]="dotsClass()">
        @for (slide of slides(); let i = $index; track i) {
          <button
            [class]="'sg-carousel-dot' + (i === current() ? ' sg-carousel-dot-active' : '')"
            [attr.aria-label]="slideLabel(i + 1)"
            (click)="goTo(i)"
          ></button>
        }
      </div>
    }
  `,
  host: {
    '[class]': 'classes()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SgCarouselComponent {
  private readonly cfg = injectSgConfig()
  private readonly _current = signal(0)

  readonly slides = contentChildren(SgCarouselSlideDirective)

  /** No-op in 4.2 (see D12 / F-Carousel-Autoplay), kept for API parity. */
  @Input({ transform: booleanAttribute }) autoplay = false
  @Input() autoplaySpeed = 3000
  @Input({ transform: booleanAttribute }) dots = true
  @Input() dotPosition: 'top' | 'bottom' | 'left' | 'right' = 'bottom'
  @Input() effect: 'slide' | 'fade' = 'slide'

  readonly current = this._current.asReadonly()

  readonly classes = computed(() =>
    [
      'sg-carousel',
      `sg-carousel-dots-${this.dotPosition}`,
      this.dotPosition === 'left' || this.dotPosition === 'right' ? 'sg-carousel-vertical' : '',
    ]
      .filter(Boolean)
      .join(' '),
  )

  dotsClass(): string {
    return [
      'sg-carousel-dots',
      this.dotPosition === 'left' || this.dotPosition === 'right'
        ? 'sg-carousel-dots-vertical'
        : '',
    ]
      .filter(Boolean)
      .join(' ')
  }

  slideClass(i: number): string {
    return [
      'sg-carousel-slide',
      i === this._current() ? 'sg-carousel-slide-active' : '',
      `sg-carousel-effect-${this.effect}`,
    ]
      .filter(Boolean)
      .join(' ')
  }

  slideLabel(index: number): string {
    return (this.cfg.locale?.carousel?.slide ?? ((i: number) => `Slide ${i}`))(index)
  }

  goTo(index: number): void {
    const count = this.slides().length
    if (count === 0) return
    this._current.set(((index % count) + count) % count)
  }
}
