import { ChangeDetectionStrategy, Component, input, output } from '@angular/core'

export interface FooterLink {
  label: string
  href: string
  external?: boolean
}

export interface FooterColumn {
  title: string
  links: readonly FooterLink[]
}

/**
 * Bottom site footer — Angular port of
 * `examples/_shared-react/src/layout/Footer.tsx`. Four-column link grid
 * plus a 40px-tall bottom strip with copyright and version badge.
 *
 * Internal links (those whose `href` starts with `#/`) fire `select(href)`
 * so the host app can intercept hash-based navigation; external links
 * open in a new tab.
 */
@Component({
  selector: 'sg-footer',
  standalone: true,
  template: `
    <footer class="xshell-footer" role="contentinfo">
      <div class="xshell-footer-inner">
        @for (col of columns(); track col.title) {
          <div class="xshell-footer-col">
            <div class="xshell-footer-col-title">{{ col.title }}</div>
            <ul>
              @for (link of col.links; track link.href) {
                <li>
                  @if (link.external) {
                    <a [href]="link.href" target="_blank" rel="noreferrer noopener">
                      {{ link.label }}
                    </a>
                  } @else {
                    <a [href]="link.href" (click)="onClick($event, link)">
                      {{ link.label }}
                    </a>
                  }
                </li>
              }
            </ul>
          </div>
        }
      </div>
      <div class="xshell-footer-bottom">
        <span>{{ copyright() }}</span>
        @if (version()) {
          <span class="xshell-footer-version">{{ version() }}</span>
        }
        <div class="xshell-footer-spacer"></div>
        <ng-content></ng-content>
      </div>
    </footer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  readonly columns = input<readonly FooterColumn[]>([])
  readonly copyright = input<string>('')
  readonly version = input<string | undefined>(undefined)

  readonly select = output<string>()

  protected onClick(ev: MouseEvent, link: FooterLink): void {
    if (ev.metaKey || ev.ctrlKey || ev.shiftKey || ev.button === 1) return
    ev.preventDefault()
    this.select.emit(link.href)
  }
}
