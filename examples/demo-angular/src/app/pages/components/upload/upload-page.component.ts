import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import {
  SgButtonComponent,
  SgProgressComponent,
  SgUploadComponent,
  type SgUploadFile,
} from '@skygraph/angular'
import {
  ComponentDocComponent,
  CssVarsTableComponent,
  type CssVarDef,
  DemoBoxComponent,
  PropsTableComponent,
  type PropDef,
} from '../../../shared/demo'

let uidCounter = 0
function nextUid(): string {
  return 'u-' + ++uidCounter
}

const BASIC_SOURCE = `<div
  sg-upload
  [fileList]="files()"
  (upload)="onUpload($event)"
  (remove)="onRemove($event)"
></div>`

const MULTIPLE_SOURCE = `<div
  sg-upload
  multiple
  [maxCount]="5"
  [fileList]="files()"
  (upload)="onUploadMany($event)"
  (remove)="onRemove($event)"
></div>`

const ACCEPT_SOURCE = `<div sg-upload accept="image/*"></div>
<div sg-upload accept=".pdf,.doc,.docx"></div>
<div sg-upload accept="video/mp4"></div>`

const PROGRESS_SOURCE = `<div
  sg-upload
  multiple
  [fileList]="files()"
  (upload)="onUploadWithProgress($event)"
  (remove)="onRemove($event)"
></div>

@for (f of files(); track f.uid) {
  @if (f.status === 'uploading') {
    <div style="display:grid;grid-template-columns:1fr auto;gap:8px;align-items:center">
      <div sg-progress [percent]="progress()[f.uid] ?? 0"></div>
      <span style="font-size:12px;color:var(--sg-color-text-secondary)">{{ f.name }}</span>
    </div>
  }
}`

const ERROR_SOURCE = `<div sg-upload multiple [fileList]="errorFiles()" (remove)="onErrorRemove($event)"></div>

// In component class:
errorFiles = signal<SgUploadFile[]>([
  { uid: 'a', name: 'spec.pdf', size: 24000, status: 'done' },
  { uid: 'b', name: 'broken.zip', size: 900000, status: 'error' },
  { uid: 'c', name: 'in-flight.mp4', size: 4500000, status: 'uploading' },
])`

const DISABLED_SOURCE = `<div sg-upload disabled [fileList]="lockedFiles"></div>
<div sg-upload loading></div>`

const CUSTOM_TRIGGER_SOURCE = `<div sg-upload>
  <button sg-button type="dashed">Pick files…</button>
</div>

<div sg-upload>
  <div style="
    width:160px;height:120px;
    border:1px dashed var(--sg-color-border);
    border-radius:8px;
    display:grid;place-items:center;
    color:var(--sg-color-text-secondary);
    cursor:pointer;
  ">
    <div style="text-align:center">
      <div style="font-size:24px">+</div>
      <div style="font-size:12px">Click to upload</div>
    </div>
  </div>
</div>`

const TOKENS_SOURCE = `<style>
  .cyan-scope {
    --sg-color-border-secondary: var(--sg-cyan-4);
    --sg-color-error: var(--sg-magenta-5);
    --sg-border-radius-sm: 999px;
    --sg-font-size-sm: 13px;
  }
</style>
<div class="cyan-scope" style="max-width:420px">
  <div sg-upload multiple [fileList]="tokenFiles"></div>
</div>`

const UNSTYLED_SOURCE = `<div
  sg-upload
  unstyled
  multiple
  [fileList]="unstyledFiles()"
  (upload)="onUnstyledUpload($event)"
  (remove)="onUnstyledRemove($event)"
></div>`

const PROPS: PropDef[] = [
  {
    name: 'fileList',
    description: 'Controlled list of files with status',
    type: 'SgUploadFile[]',
  },
  {
    name: 'accept',
    description: 'MIME / extension filter passed to <input accept>',
    type: 'string',
  },
  {
    name: 'multiple',
    description: 'Allow picking many files per dialog',
    type: 'boolean',
    default: 'false',
  },
  {
    name: 'maxCount',
    description: 'Cap on how many files are emitted from (upload)',
    type: 'number',
  },
  { name: 'disabled', description: 'Disable the trigger', type: 'boolean', default: 'false' },
  {
    name: 'loading',
    description: 'Show spinner instead of the default button',
    type: 'boolean',
    default: 'false',
  },
  {
    name: 'unstyled',
    description: 'Strip every sg-* class — keep mechanics only',
    type: 'boolean',
    default: 'false',
  },
  {
    name: '(upload)',
    description: 'Emitted with the picked native File[] array',
    type: 'EventEmitter<File[]>',
  },
  {
    name: '(remove)',
    description: 'Emitted when the user clicks × on a row',
    type: 'EventEmitter<SgUploadFile>',
  },
  {
    name: '<ng-content>',
    description: 'Custom trigger — replaces the default Upload button',
    type: 'slot',
  },
]

const CSS_VARS: CssVarDef[] = [
  {
    name: 'sg-color-border-secondary',
    default: 'var(--sg-gray-4)',
    description: 'List row divider',
  },
  { name: 'sg-color-bg-container', default: '#ffffff', description: 'Row background' },
  { name: 'sg-color-text', default: 'rgba(0, 0, 0, 0.88)', description: 'File name colour' },
  {
    name: 'sg-color-text-secondary',
    default: 'rgba(0, 0, 0, 0.65)',
    description: 'Hint / size colour',
  },
  { name: 'sg-color-error', default: 'var(--sg-red-5)', description: 'Error row + remove accent' },
  { name: 'sg-color-success', default: 'var(--sg-green-6)', description: 'Done row badge' },
  { name: 'sg-border-radius-sm', default: '4px', description: 'List row corner radius' },
  { name: 'sg-font-size-sm', default: '12px', description: 'File-name typography' },
]

@Component({
  selector: 'sg-upload-page',
  standalone: true,
  imports: [
    SgUploadComponent,
    SgButtonComponent,
    SgProgressComponent,
    ComponentDocComponent,
    DemoBoxComponent,
    PropsTableComponent,
    CssVarsTableComponent,
  ],
  template: `
    <sg-component-doc
      title="Upload"
      [crumbs]="['Data Entry', 'Upload']"
      description="Hidden native file input wrapped in a clickable trigger. Manages a visible file list with uploading / done / error status badges and a remove button."
      [whenToUse]="[
        'For form fields collecting files — wire (upload) to your service of choice.',
        'Single or multiple files, with an optional maxCount cap.',
        'Use unstyled for custom-styled UIs that just need the file-picker mechanics.',
      ]"
    >
      <sg-demo-box
        title="Basic"
        description="Single trigger. onUpload hands you native File objects — push them into a controlled list."
        [code]="basicSource"
      >
        <div
          sg-upload
          [fileList]="files()"
          (upload)="onUpload($event)"
          (remove)="onRemove($event)"
        ></div>
      </sg-demo-box>

      <sg-demo-box
        title="Multiple + maxCount"
        description="Native picker can select many files; maxCount caps how many make it into the list."
        [code]="multipleSource"
      >
        <div
          sg-upload
          multiple
          [maxCount]="5"
          [fileList]="multipleFiles()"
          (upload)="onUploadMany($event)"
          (remove)="onRemoveMulti($event)"
        ></div>
      </sg-demo-box>

      <sg-demo-box
        title="accept"
        description="Forwarded to the native <input accept> — mix MIME and extension groups."
        [code]="acceptSource"
      >
        <div style="display:flex;gap:12px;flex-wrap:wrap">
          <div sg-upload accept="image/*"></div>
          <div sg-upload accept=".pdf,.doc,.docx"></div>
          <div sg-upload accept="video/mp4"></div>
        </div>
      </sg-demo-box>

      <sg-demo-box
        title="With progress"
        description="Upload only renders status dots — keep per-file percent in parallel state and render it next to the list."
        [code]="progressSource"
      >
        <div style="display:flex;flex-direction:column;gap:12px;max-width:420px">
          <div
            sg-upload
            multiple
            [fileList]="progressFiles()"
            (upload)="onUploadWithProgress($event)"
            (remove)="onRemoveProgress($event)"
          ></div>
          @if (uploadingCount() > 0) {
            <div style="display:flex;flex-direction:column;gap:8px">
              @for (f of progressFiles(); track f.uid) {
                @if (f.status === 'uploading') {
                  <div
                    style="display:grid;grid-template-columns:1fr auto;gap:8px;align-items:center"
                  >
                    <div sg-progress [percent]="progress()[f.uid] ?? 0"></div>
                    <span style="font-size:12px;color:var(--sg-color-text-secondary)">{{
                      f.name
                    }}</span>
                  </div>
                }
              }
            </div>
          }
        </div>
      </sg-demo-box>

      <sg-demo-box
        title="Error state"
        description="Each row has a status variant — error applies the red theme + remove button."
        [code]="errorSource"
      >
        <div sg-upload multiple [fileList]="errorFiles()" (remove)="onErrorRemove($event)"></div>
      </sg-demo-box>

      <sg-demo-box
        title="Disabled / loading"
        description="disabled blocks the trigger; loading swaps the button for a spinner."
        [code]="disabledSource"
      >
        <div style="display:flex;gap:12px;flex-wrap:wrap">
          <div sg-upload disabled [fileList]="lockedFiles"></div>
          <div sg-upload loading></div>
        </div>
      </sg-demo-box>

      <sg-demo-box
        title="Custom trigger"
        description="Any projected content becomes the click target — branded buttons, icon tiles, drop-zone wrappers."
        [code]="customTriggerSource"
      >
        <div style="display:flex;gap:12px;align-items:center">
          <div sg-upload>
            <button sg-button type="dashed">Pick files…</button>
          </div>
          <div sg-upload>
            <div class="ng-upload-tile">
              <div style="text-align:center">
                <div style="font-size:24px">+</div>
                <div style="font-size:12px">Click to upload</div>
              </div>
            </div>
          </div>
        </div>
      </sg-demo-box>

      <sg-demo-box
        title="Token override"
        description="Upload has no component-scoped tokens — re-skin via global ones on a scoped wrapper."
        [code]="tokensSource"
      >
        <div class="ng-upload-cyan">
          <div sg-upload multiple [fileList]="tokenFiles"></div>
        </div>
      </sg-demo-box>

      <sg-demo-box
        title="Unstyled"
        description="unstyled drops every sg-* class but keeps the hidden input + file-list mechanics."
        [code]="unstyledSource"
      >
        <div
          sg-upload
          unstyled
          multiple
          [fileList]="unstyledFiles()"
          (upload)="onUnstyledUpload($event)"
          (remove)="onUnstyledRemove($event)"
        ></div>
      </sg-demo-box>

      <sg-props-table title="Upload API" [data]="props"></sg-props-table>
      <sg-css-vars-table
        [data]="cssVars"
        hint="Upload has no component-scoped tokens. Override the global ones on a scoped wrapper to re-skin a single instance."
      ></sg-css-vars-table>
    </sg-component-doc>
  `,
  styles: [
    `
      :host ::ng-deep .ng-upload-cyan {
        --sg-color-border-secondary: var(--sg-cyan-4, #87e8de);
        --sg-color-error: var(--sg-magenta-5, #f759ab);
        --sg-border-radius-sm: 999px;
        --sg-font-size-sm: 13px;
        max-width: 420px;
      }
      :host ::ng-deep .ng-upload-tile {
        width: 160px;
        height: 120px;
        border: 1px dashed var(--sg-color-border);
        border-radius: 8px;
        display: grid;
        place-items: center;
        color: var(--sg-color-text-secondary);
        cursor: pointer;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UploadPageComponent {
  protected readonly files = signal<SgUploadFile[]>([])
  protected readonly multipleFiles = signal<SgUploadFile[]>([])
  protected readonly progressFiles = signal<SgUploadFile[]>([])
  protected readonly progress = signal<Record<string, number>>({})
  protected readonly errorFiles = signal<SgUploadFile[]>([
    { uid: 'a', name: 'spec.pdf', size: 24_000, status: 'done' },
    { uid: 'b', name: 'broken.zip', size: 900_000, status: 'error' },
    { uid: 'c', name: 'in-flight.mp4', size: 4_500_000, status: 'uploading' },
  ])
  protected readonly lockedFiles: SgUploadFile[] = [
    { uid: 'x', name: 'locked.pdf', size: 90_000, status: 'done' },
    { uid: 'y', name: 'pending.dat', size: 1_500_000, status: 'uploading' },
  ]
  protected readonly tokenFiles: SgUploadFile[] = [
    { uid: '1', name: 'brief.docx', size: 48_000, status: 'done' },
    { uid: '2', name: 'upload-failure.log', size: 2_500, status: 'error' },
  ]
  protected readonly unstyledFiles = signal<SgUploadFile[]>([
    { uid: '1', name: 'spec.pdf', size: 12_000, status: 'done' },
  ])

  protected readonly basicSource = BASIC_SOURCE
  protected readonly multipleSource = MULTIPLE_SOURCE
  protected readonly acceptSource = ACCEPT_SOURCE
  protected readonly progressSource = PROGRESS_SOURCE
  protected readonly errorSource = ERROR_SOURCE
  protected readonly disabledSource = DISABLED_SOURCE
  protected readonly customTriggerSource = CUSTOM_TRIGGER_SOURCE
  protected readonly tokensSource = TOKENS_SOURCE
  protected readonly unstyledSource = UNSTYLED_SOURCE
  protected readonly props = PROPS
  protected readonly cssVars = CSS_VARS

  protected uploadingCount(): number {
    return this.progressFiles().filter((f) => f.status === 'uploading').length
  }

  protected onUpload(items: File[]): void {
    const next: SgUploadFile[] = items.map((f) => ({
      uid: nextUid(),
      name: f.name,
      size: f.size,
      status: 'uploading',
    }))
    this.files.set([...this.files(), ...next])
    setTimeout(() => {
      this.files.set(
        this.files().map((f) =>
          next.find((n) => n.uid === f.uid) ? { ...f, status: 'done' as const } : f,
        ),
      )
    }, 900)
  }

  protected onRemove(file: SgUploadFile): void {
    this.files.set(this.files().filter((f) => f.uid !== file.uid))
  }

  protected onUploadMany(items: File[]): void {
    const next: SgUploadFile[] = items.map((f) => ({
      uid: nextUid(),
      name: f.name,
      size: f.size,
      status: 'done',
    }))
    this.multipleFiles.set([...this.multipleFiles(), ...next])
  }

  protected onRemoveMulti(file: SgUploadFile): void {
    this.multipleFiles.set(this.multipleFiles().filter((f) => f.uid !== file.uid))
  }

  protected onUploadWithProgress(items: File[]): void {
    const next: SgUploadFile[] = items.map((f) => ({
      uid: nextUid(),
      name: f.name,
      size: f.size,
      status: 'uploading',
    }))
    this.progressFiles.set([...this.progressFiles(), ...next])
    for (const f of next) this.simulate(f)
  }

  protected onRemoveProgress(file: SgUploadFile): void {
    this.progressFiles.set(this.progressFiles().filter((f) => f.uid !== file.uid))
  }

  private simulate(file: SgUploadFile): void {
    let value = 0
    const timer = setInterval(() => {
      value += 10 + Math.floor(Math.random() * 15)
      const next = Math.min(100, value)
      this.progress.set({ ...this.progress(), [file.uid]: next })
      if (next >= 100) {
        clearInterval(timer)
        this.progressFiles.set(
          this.progressFiles().map((f) =>
            f.uid === file.uid ? { ...f, status: 'done' as const } : f,
          ),
        )
      }
    }, 220)
  }

  protected onErrorRemove(file: SgUploadFile): void {
    this.errorFiles.set(this.errorFiles().filter((f) => f.uid !== file.uid))
  }

  protected onUnstyledUpload(items: File[]): void {
    const next: SgUploadFile[] = items.map((f) => ({
      uid: nextUid(),
      name: f.name,
      size: f.size,
      status: 'done',
    }))
    this.unstyledFiles.set([...this.unstyledFiles(), ...next])
  }

  protected onUnstyledRemove(file: SgUploadFile): void {
    this.unstyledFiles.set(this.unstyledFiles().filter((f) => f.uid !== file.uid))
  }
}
