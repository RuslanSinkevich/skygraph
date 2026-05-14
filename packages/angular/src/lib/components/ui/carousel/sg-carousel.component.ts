import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  Directive,
  Input,
  OnDestroy,
  TemplateRef,
  booleanAttribute,
  computed,
  contentChildren,
  effect,
  inject,
  signal,
} from '@angular/core'
import { CommonModule } from '@angular/common'
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
 */
@Component({
  selector: 'div[sg-carousel]',
  standalone: true,
  imports: [CommonModule, SgCarouselSlideDirective],
  template: `
    @if (_unstyled()) {
      @if (slides()[current()]; as activeSlide) {
        <ng-container [ngTemplateOutlet]="activeSlide.tpl"></ng-container>
      }
      @if (dots && slides().length > 1) {
        <div>
          @for (slide of slides(); let i = $index; track i) {
            <button type="button" [attr.aria-current]="i === current()" (click)="goTo(i)">
              {{ i + 1 }}
            </button>
          }
        </div>
      }
    } @else {
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
              type="button"
              [class]="'sg-carousel-dot' + (i === current() ? ' sg-carousel-dot-active' : '')"
              [attr.aria-label]="slideLabel(i + 1)"
              (click)="goTo(i)"
            ></button>
          }
        </div>
      }
    }
  `,
  host: {
    '[class]': 'classes()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SgCarouselComponent implements OnDestroy {
  private readonly cfg = injectSgConfig()
  private readonly destroyRef = inject(DestroyRef)
  private readonly _current = signal(0)
  protected readonly _unstyled = signal<boolean>(false)
  private readonly _className = signal<string>('')
  private readonly _autoplay = signal<boolean>(false)
  private readonly _autoplaySpeed = signal<number>(3000)
  private timer: ReturnType<typeof setInterval> | null = null

  readonly slides = contentChildren(SgCarouselSlideDirective)

  @Input({ transform: booleanAttribute })
  get autoplay(): boolean {
    return this._autoplay()
  }
  set autoplay(v: boolean) {
    this._autoplay.set(v)
  }

  @Input()
  get autoplaySpeed(): number {
    return this._autoplaySpeed()
  }
  set autoplaySpeed(v: number) {
    this._autoplaySpeed.set(typeof v === 'number' ? v : 3000)
  }

  @Input({ transform: booleanAttribute }) dots = true
  @Input() dotPosition: 'top' | 'bottom' | 'left' | 'right' = 'bottom'
  @Input() effect: 'slide' | 'fade' = 'slide'

  @Input({ transform: booleanAttribute })
  get unstyled(): boolean {
    return this._unstyled()
  }
  set unstyled(v: boolean) {
    this._unstyled.set(v)
  }

  @Input()
  get className(): string {
    return this._className()
  }
  set className(v: string) {
    this._className.set(v ?? '')
  }

  readonly current = this._current.asReadonly()

  readonly classes = computed(() => {
    if (this._unstyled()) return this._className()
    return [
      'sg-carousel',
      `sg-carousel-dots-${this.dotPosition}`,
      this.dotPosition === 'left' || this.dotPosition === 'right' ? 'sg-carousel-vertical' : '',
      this._className(),
    ]
      .filter(Boolean)
      .join(' ')
  })

  constructor() {
    effect(() => {
      const enabled = this._autoplay()
      const speed = this._autoplaySpeed()
      const count = this.slides().length
      this.stopTimer()
      if (!enabled || count <= 1) return
      this.timer = setInterval(() => {
        this._current.update((c) => (c + 1) % Math.max(this.slides().length, 1))
      }, speed)
    })
    this.destroyRef.onDestroy(() => this.stopTimer())
  }

  ngOnDestroy(): void {
    this.stopTimer()
  }

  private stopTimer(): void {
    if (this.timer) {
      clearInterval(this.timer)
      this.timer = null
    }
  }

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
