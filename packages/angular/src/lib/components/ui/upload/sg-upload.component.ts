import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  booleanAttribute,
  computed,
  signal,
} from '@angular/core'
import { injectSgConfig } from '../../../config/inject-sg-config'
import { SgButtonComponent } from '../button'

export interface SgUploadFile {
  uid: string
  name: string
  size: number
  status: 'uploading' | 'done' | 'error'
}

/**
 * Attribute-selector upload, DOM-equivalent of
 * `packages/react/src/components/ui/Upload.tsx`.
 *
 * Use as `<div sg-upload [fileList]="…" (upload)="…" (remove)="…"></div>`.
 *
 * Custom triggers can be projected with `<ng-content>` and override the
 * default Upload button.
 */
@Component({
  selector: 'div[sg-upload]',
  standalone: true,
  imports: [SgButtonComponent],
  template: `
    <input
      #fileInput
      type="file"
      [accept]="accept ?? ''"
      [multiple]="multiple"
      style="display:none"
      [attr.aria-label]="uploadAriaLabel()"
      (change)="onFileChange($event)"
    />
    <div (click)="trigger()">
      @if (hasContent) {
        <ng-content></ng-content>
      } @else {
        <button sg-button type="primary" [disabled]="resolvedDisabled()" [loading]="loading">
          {{ uploadText() }}
        </button>
      }
    </div>
    @if (fileList && fileList.length > 0) {
      <div [class]="listClass()">
        @for (file of fileList; track file.uid) {
          <div [class]="itemClass(file.status)">
            <span [class]="itemNameClass()">
              @if (file.status === 'uploading') {
                <span
                  class="sg-spin sg-spin-small"
                  role="status"
                  aria-live="polite"
                  aria-label="Loading"
                ></span>
              }
              {{ file.name }}
            </span>
            @if (file.status !== 'uploading') {
              <button
                type="button"
                [class]="itemRemoveClass()"
                [attr.aria-label]="removeLabel() + ': ' + file.name"
                (click)="onRemoveClick(file)"
              >
                ×
              </button>
            }
          </div>
        }
      </div>
    }
  `,
  host: {
    '[class]': 'classes()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SgUploadComponent {
  private readonly cfg = injectSgConfig()
  private readonly _disabled = signal<boolean | undefined>(undefined)

  readonly hasContent = false

  @ViewChild('fileInput', { static: true })
  protected fileInput!: ElementRef<HTMLInputElement>

  @Input() accept?: string
  @Input({ transform: booleanAttribute }) multiple = false
  @Input() fileList: SgUploadFile[] = []
  @Input() maxCount?: number
  @Input({ transform: booleanAttribute }) loading = false

  protected readonly _unstyled = signal<boolean>(false)

  @Input({ transform: booleanAttribute })
  get disabled(): boolean {
    return this.resolvedDisabled()
  }
  set disabled(v: boolean | undefined) {
    this._disabled.set(v)
  }

  @Input({ transform: booleanAttribute })
  get unstyled(): boolean {
    return this._unstyled()
  }
  set unstyled(v: boolean) {
    this._unstyled.set(v)
  }

  @Output() readonly upload = new EventEmitter<File[]>()
  @Output() readonly remove = new EventEmitter<SgUploadFile>()

  readonly resolvedDisabled = computed(() => this._disabled() ?? this.cfg.disabled ?? false)

  readonly classes = computed(() => {
    if (this._unstyled()) return ''
    return ['sg-upload', this.loading ? 'sg-upload-loading' : ''].filter(Boolean).join(' ')
  })

  readonly listClass = computed(() => (this._unstyled() ? '' : 'sg-upload-list'))
  readonly itemClass = (status: string): string =>
    this._unstyled() ? '' : `sg-upload-item sg-upload-item-${status}`
  readonly itemNameClass = computed(() => (this._unstyled() ? '' : 'sg-upload-item-name'))
  readonly itemRemoveClass = computed(() => (this._unstyled() ? '' : 'sg-upload-item-remove'))

  readonly uploadText = computed(() => this.cfg.locale?.upload?.uploadText ?? 'Upload')
  readonly removeLabel = computed(() => this.cfg.locale?.upload?.removeFile ?? 'Remove file')
  readonly uploadAriaLabel = computed(
    () => this.cfg.locale?.upload?.uploadAriaLabel ?? 'Upload file',
  )

  trigger(): void {
    if (this.resolvedDisabled() || this.loading) return
    this.fileInput.nativeElement.click()
  }

  onFileChange(e: Event): void {
    const inp = e.target as HTMLInputElement
    const files = Array.from(inp.files ?? [])
    if (this.maxCount) {
      const remaining = this.maxCount - this.fileList.length
      this.upload.emit(files.slice(0, Math.max(0, remaining)))
    } else {
      this.upload.emit(files)
    }
    inp.value = ''
  }

  onRemoveClick(f: SgUploadFile): void {
    this.remove.emit(f)
  }
}
