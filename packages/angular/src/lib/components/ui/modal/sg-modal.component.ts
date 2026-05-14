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
 * Element-selector modal dialog, DOM-equivalent of
 * `packages/react/src/components/ui/Modal.tsx`.
 *
 * Use as `<sg-modal [open]="…" (close)="…" title="…">body</sg-modal>`.
 *
 * Renders inline — no `cdk/overlay` portal in Wave 4.2 (see decision
 * D7 / finding F-Overlay-Inline).
 */
@Component({
  selector: 'sg-modal',
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
          @if (showFooter()) {
            <div>
              @if (showDefaultFooter()) {
                <button sg-button [disabled]="confirmLoading" (click)="closeChange.emit()">
                  {{ resolvedCancelText() }}
                </button>
                <button sg-button [type]="okType" [loading]="confirmLoading" (click)="ok.emit()">
                  {{ resolvedOkText() }}
                </button>
              } @else {
                <ng-content select="[sg-modal-footer]"></ng-content>
              }
            </div>
          }
          <button
            sg-button
            type="text"
            unstyled
            [attr.aria-label]="closeAriaLabel()"
            (click)="closeChange.emit()"
          >
            x
          </button>
        </div>
      } @else {
        <div class="sg-modal-mask" (click)="onMaskClick()">
          <div
            [class]="modalClasses()"
            [style.--sg-modal-width]="widthCss()"
            (click)="$event.stopPropagation()"
            role="dialog"
            aria-modal="true"
            [attr.aria-labelledby]="title ? titleId : null"
            [attr.aria-describedby]="bodyId"
          >
            <div class="sg-modal-header">
              @if (title) {
                <div class="sg-modal-title" [id]="titleId">{{ title }}</div>
              }
              <button
                sg-button
                type="text"
                class="sg-modal-close"
                [attr.aria-label]="closeAriaLabel()"
                (click)="closeChange.emit()"
              >
                ×
              </button>
            </div>
            <div class="sg-modal-body" [id]="bodyId">
              <ng-content></ng-content>
            </div>
            @if (showFooter()) {
              <div class="sg-modal-footer">
                @if (showDefaultFooter()) {
                  <button sg-button [disabled]="confirmLoading" (click)="closeChange.emit()">
                    {{ resolvedCancelText() }}
                  </button>
                  <button sg-button [type]="okType" [loading]="confirmLoading" (click)="ok.emit()">
                    {{ resolvedOkText() }}
                  </button>
                } @else {
                  <ng-content select="[sg-modal-footer]"></ng-content>
                }
              </div>
            }
          </div>
        </div>
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SgModalComponent {
  private readonly cfg = injectSgConfig()
  protected readonly _unstyled = signal<boolean>(false)
  protected readonly _className = signal<string>('')

  readonly titleId = 'sg-modal-title-' + Math.random().toString(36).slice(2, 8)
  readonly bodyId = 'sg-modal-body-' + Math.random().toString(36).slice(2, 8)

  @Input({ transform: booleanAttribute }) open = false
  @Input() title?: string
  @Input() width: number | string = 520
  @Input() okText?: string
  @Input() cancelText?: string
  @Input() okType: 'primary' | 'default' | 'dashed' | 'text' = 'primary'
  @Input({ transform: booleanAttribute }) confirmLoading = false
  /** Hide the default OK/Cancel pair — mirrors React `footer={null}`. */
  @Input({ transform: booleanAttribute }) hideFooter = false
  /** Use the projected `[sg-modal-footer]` instead of the default OK/Cancel. */
  @Input({ transform: booleanAttribute }) customFooter = false
  /** Show the default footer (defaults to true when `(ok)` is observed). */
  @Input({ transform: booleanAttribute }) showOk = false

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
  @Output() readonly ok = new EventEmitter<void>()

  readonly resolvedOkText = computed(() => this.okText ?? this.cfg.locale?.modal?.okText ?? 'OK')
  readonly resolvedCancelText = computed(
    () => this.cancelText ?? this.cfg.locale?.modal?.cancelText ?? 'Cancel',
  )
  readonly closeAriaLabel = computed(() => this.cfg.locale?.modal?.closeAriaLabel ?? 'Close')

  readonly widthCss = computed(() =>
    typeof this.width === 'number' ? `${this.width}px` : this.width,
  )

  readonly modalClasses = computed(() => ['sg-modal', this._className()].filter(Boolean).join(' '))

  showFooter(): boolean {
    return !this.hideFooter && (this.customFooter || this.showOk || this.ok.observed)
  }

  showDefaultFooter(): boolean {
    return !this.customFooter && (this.showOk || this.ok.observed)
  }

  onMaskClick(): void {
    this.closeChange.emit()
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.open) this.closeChange.emit()
  }
}
