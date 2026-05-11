import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { SgUploadComponent, type SgUploadFile } from '@skygraph/angular'
import { PAGE_STYLES } from '../_shared/page.styles'

let uidCounter = 0
function nextUid(): string {
  return 'u-' + ++uidCounter
}

@Component({
  selector: 'sg-upload-page',
  standalone: true,
  imports: [SgUploadComponent],
  template: `
    <h1>Upload</h1>
    <p class="lead">
      Hidden native file input wrapped in a clickable trigger. Manages a visible file list with
      status badges and remove buttons. No actual network upload — wire <code>(upload)</code> to
      your own service.
    </p>

    <section class="demo-section">
      <h3>Default</h3>
      <div
        sg-upload
        [fileList]="files()"
        multiple
        (upload)="onUpload($event)"
        (remove)="onRemove($event)"
      ></div>
    </section>

    <section class="demo-section">
      <h3>Single file, image only</h3>
      <div
        sg-upload
        accept="image/*"
        [fileList]="single()"
        (upload)="onSingleUpload($event)"
        (remove)="onSingleRemove($event)"
      ></div>
    </section>

    <section class="demo-section">
      <h3>Loading & disabled</h3>
      <div class="row">
        <div sg-upload loading></div>
        <div sg-upload disabled></div>
      </div>
    </section>
  `,
  styles: [PAGE_STYLES],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UploadPageComponent {
  readonly files = signal<SgUploadFile[]>([])
  readonly single = signal<SgUploadFile[]>([])

  onUpload(items: File[]): void {
    const next = [
      ...this.files(),
      ...items.map((f) => ({
        uid: nextUid(),
        name: f.name,
        size: f.size,
        status: 'done' as const,
      })),
    ]
    this.files.set(next)
  }

  onRemove(file: SgUploadFile): void {
    this.files.set(this.files().filter((f) => f.uid !== file.uid))
  }

  onSingleUpload(items: File[]): void {
    const f = items[0]
    if (!f) return
    this.single.set([{ uid: nextUid(), name: f.name, size: f.size, status: 'done' as const }])
  }

  onSingleRemove(file: SgUploadFile): void {
    this.single.set(this.single().filter((f) => f.uid !== file.uid))
  }
}
