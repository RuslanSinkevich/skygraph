import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  computed,
} from '@angular/core'
import { injectSgConfig } from '../../../config/inject-sg-config'

export interface SgBreadcrumbItem {
  title: string
  href?: string
}

/**
 * Attribute-selector breadcrumb, DOM-equivalent of
 * `packages/react/src/components/ui/Breadcrumb.tsx`.
 *
 * Use as `<nav sg-breadcrumb [items]="…" separator="/"></nav>`.
 */
@Component({
  selector: 'nav[sg-breadcrumb]',
  standalone: true,
  template: `
    @for (item of items; let i = $index; track i) {
      @if (item.href) {
        <a class="sg-breadcrumb-link" [href]="item.href" (click)="onClick(i, $event)">{{
          item.title
        }}</a>
      } @else {
        <span [class]="i === items.length - 1 ? 'sg-breadcrumb-current' : 'sg-breadcrumb-link'">
          {{ item.title }}
        </span>
      }
      @if (i < items.length - 1) {
        <span class="sg-breadcrumb-separator">{{ separator }}</span>
      }
    }
  `,
  host: {
    class: 'sg-breadcrumb',
    '[attr.aria-label]': 'ariaLabel()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SgBreadcrumbComponent {
  private readonly cfg = injectSgConfig()

  @Input() items: SgBreadcrumbItem[] = []
  @Input() separator = '/'

  /** Emits the index of the clicked link. */
  @Output() readonly itemClick = new EventEmitter<number>()

  readonly ariaLabel = computed(() => this.cfg.locale?.breadcrumb?.ariaLabel ?? 'Breadcrumb')

  onClick(i: number, e: Event): void {
    if (this.itemClick.observed) {
      e.preventDefault()
      this.itemClick.emit(i)
    }
  }
}
