import { ChangeDetectionStrategy, Component } from '@angular/core'
import { SgCarouselComponent, SgCarouselSlideDirective } from '@skygraph/angular'
import { PAGE_STYLES } from '../_shared/page.styles'

@Component({
  selector: 'sg-carousel-page',
  standalone: true,
  imports: [SgCarouselComponent, SgCarouselSlideDirective],
  template: `
    <h1>Carousel</h1>
    <p class="lead">
      Slide carousel with dot navigation. Manual paging works; autoplay is a no-op in Wave 4.2 (see
      finding F-Carousel-Autoplay).
    </p>

    <section class="demo-section">
      <h3>Slide effect</h3>
      <div sg-carousel>
        <ng-template sg-carousel-slide>
          <div class="slide" style="background:#1677ff">Slide 1</div>
        </ng-template>
        <ng-template sg-carousel-slide>
          <div class="slide" style="background:#52c41a">Slide 2</div>
        </ng-template>
        <ng-template sg-carousel-slide>
          <div class="slide" style="background:#fa8c16">Slide 3</div>
        </ng-template>
      </div>
    </section>

    <section class="demo-section">
      <h3>Fade effect</h3>
      <div sg-carousel effect="fade">
        <ng-template sg-carousel-slide>
          <div class="slide" style="background:#722ed1">Fade A</div>
        </ng-template>
        <ng-template sg-carousel-slide>
          <div class="slide" style="background:#eb2f96">Fade B</div>
        </ng-template>
      </div>
    </section>
  `,
  styles: [
    PAGE_STYLES,
    `
      .slide {
        height: 160px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 22px;
        font-weight: 600;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarouselPageComponent {}
