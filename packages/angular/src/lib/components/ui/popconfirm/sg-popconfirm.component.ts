import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  booleanAttribute,
  computed,
  inject,
  signal,
} from '@angular/core'
import { injectSgConfig } from '../../../config/inject-sg-config'
import { SgButtonComponent } from '../button'

/**
 * Element-selector confirmation popup, DOM-equivalent of
 * `packages/react/src/components/ui/Popconfirm.tsx`.
 *
 * Use as `<sg-popconfirm title="…" (confirm)="…">trigger</sg-popconfirm>`.
 *
 * Renders inline (no portal — see decision D7 / finding F-Overlay-Inline).
 */
@Component({
  selector: 'sg-popconfirm',
  standalone: true,
  imports: [SgButtonComponent],
  template: `
    <div (click)="onTriggerClick()" [attr.aria-describedby]="open() ? popconfirmId : null">
      <ng-content></ng-content>
    </div>
    @if (open()) {
      <div
        [id]="popconfirmId"
        role="alertdialog"
        [class]="'sg-popconfirm sg-popconfirm-' + placement"
      >
        <div class="sg-popconfirm-arrow"></div>
        <div class="sg-popconfirm-inner">
          <div class="sg-popconfirm-title">
            <span class="sg-popconfirm-icon">⚠</span>
            {{ title }}
          </div>
          @if (description) {
            <div class="sg-popconfirm-description">{{ description }}</div>
          }
          <div class="sg-popconfirm-buttons">
            <button sg-button size="small" (click)="onCancel()">{{ resolvedCancelText() }}</button>
            <button sg-button size="small" type="primary" (click)="onConfirm()">
              {{ resolvedOkText() }}
            </button>
          </div>
        </div>
      </div>
    }
  `,
  host: {
    class: 'sg-popconfirm-wrapper',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SgPopconfirmComponent {
  private readonly cfg = injectSgConfig()
  private readonly el = inject(ElementRef<HTMLElement>)
  private readonly _open = signal(false)

  readonly popconfirmId = 'sg-popconfirm-' + Math.random().toString(36).slice(2, 8)

  @Input({ required: true }) title!: string
  @Input() description?: string
  @Input() okText?: string
  @Input() cancelText?: string
  @Input() placement: 'top' | 'bottom' | 'left' | 'right' = 'top'
  @Input({ transform: booleanAttribute }) disabled = false

  @Output() readonly confirm = new EventEmitter<void>()
  @Output() readonly cancel = new EventEmitter<void>()

  readonly open = this._open.asReadonly()

  readonly resolvedOkText = computed(
    () => this.okText ?? this.cfg.locale?.popconfirm?.okText ?? 'Yes',
  )
  readonly resolvedCancelText = computed(
    () => this.cancelText ?? this.cfg.locale?.popconfirm?.cancelText ?? 'No',
  )

  onTriggerClick(): void {
    if (!this.disabled) this._open.update((v) => !v)
  }

  onConfirm(): void {
    this._open.set(false)
    this.confirm.emit()
  }

  onCancel(): void {
    this._open.set(false)
    this.cancel.emit()
  }

  @HostListener('document:mousedown', ['$event'])
  onDocumentClick(e: MouseEvent): void {
    if (!this._open()) return
    if (!this.el.nativeElement.contains(e.target as Node)) this._open.set(false)
  }
}
