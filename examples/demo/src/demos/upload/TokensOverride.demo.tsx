import { Upload } from '@skygraph/react'
import type { UploadFile } from '@skygraph/react'
import { TokenScopeCards } from '../_shared/TokenScopeCards'

/**
 * Upload has no component tokens — the file list, remove and error accents are
 * fully driven by global tokens. Three scoped recipes — branded green, dark
 * field, glass pick — reskin the rows.
 */
const files: UploadFile[] = [
  { uid: '1', name: 'brief.docx', size: 48_000, status: 'done' },
  { uid: '2', name: 'photo.png', size: 120_000, status: 'done' },
]

export function TokensOverrideUpload() {
  return <TokenScopeCards render={() => <Upload multiple fileList={files} />} />
}
