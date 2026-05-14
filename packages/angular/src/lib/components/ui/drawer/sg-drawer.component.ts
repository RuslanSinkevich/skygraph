import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
  booleanAttribute,
  computed,
  signal,
} from '@angular/core'
import { injectSgConfig } from '../../../config/inject-sg-config'
import { SgButtonComponent } from '../button'

/**
 * Element-selector drawer, DOM-equivalent of
 * `packages/react/src/components/ui/Drawer.tsx`.
 *
 * Use as `<sg-drawer [open]="…" (close)="…" placement="right">body</sg-drawer>`.
 *
 * Renders inline (see decision D7 / finding F-Overlay-Inline).
 */
@Component({
  selector: 'sg-drawer',
  standalone: true,
  imports: [SgButtonComponent],
  template: `
    @if (open) {
      @if (_unstyled()) {
        <div
          [class]="_className()"
          role="dialog"
          aria-modal="true"
          [attr.aria-labelledby]="title ? titleId : null"
          [attr.aria-describedby]="bodyId"
        >
          @if (title) {
            <div [id]="titleId">{{ title }}</div>
          }
          <div [id]="bodyId">
            <ng-content></ng-content>
          </div>
          <ng-content select="[sg-drawer-footer]"></ng-content>
          @if (closable) {
            <button [attr.aria-label]="closeAriaLabel()" (click)="closeChange.emit()">×</button>
          }
        </div>
      } @else {
        <div class="sg-drawer-root">
          @if (mask) {
            <div class="sg-drawer-mask" (click)="onMaskClick()"></div>
          }
          <div
            [class]="drawerClasses()"
            [style.width]="isHorizontal() ? sizeCss(width) : '100%'"
            [style.height]="isHorizontal() ? '100%' : sizeCss(height)"
            role="dialog"
            aria-modal="true"
            [attr.aria-labelledby]="title ? titleId : null"
            [attr.aria-describedby]="bodyId"
          >
            @if (title || closable) {
              <div class="sg-drawer-header">
                @if (title) {
                  <div class="sg-drawer-title" [id]="titleId">{{ title }}</div>
                }
                @if (closable) {
                  <button
                    sg-button
                    type="text"
                    class="sg-drawer-close"
                    [attr.aria-label]="closeAriaLabel()"
                    (click)="closeChange.emit()"
                  >
                    ×
                  </button>
                }
              </div>
            }
            <div class="sg-drawer-body" [id]="bodyId">
              <ng-content></ng-content>
            </div>
            <div class="sg-drawer-footer">
              <ng-content select="[sg-drawer-footer]"></ng-content>
            </div>
          </div>
        </div>
      }
    }
  `,
  styles: [
    `
      :host ::ng-deep .sg-drawer-footer:empty {
        display: none;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SgDrawerComponent {
  private readonly cfg = injectSgConfig()
  protected readonly _unstyled = signal<boolean>(false)
  protected readonly _className = signal<string>('')

  readonly titleId = 'sg-drawer-title-' + Math.random().toString(36).slice(2, 8)
  readonly bodyId = 'sg-drawer-body-' + Math.random().toString(36).slice(2, 8)

  @Input({ transform: booleanAttribute }) open = false
  @Input() title?: string
  @Input() placement: 'left' | 'right' | 'top' | 'bottom' = 'right'
  @Input() width: number | string = 378
  @Input() height: number | string = 378
  @Input({ transform: booleanAttribute }) closable = true
  @Input({ transform: booleanAttribute }) mask = true
  @Input({ transform: booleanAttribute }) maskClosable = true

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

  @Output() readonly closeChange = new EventEmitter<void>()

  readonly closeAriaLabel = computed(() => this.cfg.locale?.drawer?.closeAriaLabel ?? 'Close')

  readonly drawerClasses = computed(() =>
    ['sg-drawer', `sg-drawer-${this.placement}`, this._className()].filter(Boolean).join(' '),
  )

  isHorizontal(): boolean {
    return this.placement === 'left' || this.placement === 'right'
  }

  sizeCss(v: number | string): string {
    return typeof v === 'number' ? `${v}px` : v
  }

  onMaskClick(): void {
    if (this.maskClosable) this.closeChange.emit()
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.open) this.closeChange.emit()
  }
}
