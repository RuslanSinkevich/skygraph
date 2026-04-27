import type { CSSProperties } from 'react'
import { Upload } from '@skygraph/react'
import type { UploadFile } from '@skygraph/react'

const files: UploadFile[] = [
  { uid: '1', name: 'brief.docx', size: 48_000, status: 'done' },
  { uid: '2', name: 'upload-failure.log', size: 2_500, status: 'error' },
]

/**
 * Upload has no component tokens — it is fully driven by global tokens.
 * Override them on a scoped wrapper to re-skin the file list rows and the
 * remove/error accents.
 */
const scoped: CSSProperties = {
  ['--sg-color-border-secondary' as never]: 'var(--sg-cyan-4)',
  ['--sg-color-error' as never]: 'var(--sg-magenta-5)',
  ['--sg-border-radius-sm' as never]: '999px',
  ['--sg-font-size-sm' as never]: '13px',
}

export function TokensOverrideUpload() {
  return (
    <div style={{ ...scoped, maxWidth: 420 }}>
      <Upload multiple fileList={files} />
    </div>
  )
}
