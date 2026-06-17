import { Upload } from '@skygraph/react'
import type { UploadFile } from '@skygraph/react'
import type { CSSProperties } from 'react'

const dark = {
  background: '#0f172a',
  padding: 24,
  borderRadius: 12,
  '--sg-color-bg-container': '#111827',
  '--sg-color-bg-hover': '#273449',
  '--sg-color-border': '#475569',
  '--sg-color-text': '#f8fafc',
  '--sg-color-primary': '#60a5fa',
  '--sg-color-error': '#f87171',
} as CSSProperties

const files: UploadFile[] = [
  { uid: '1', name: 'brief.docx', size: 48_000, status: 'done' },
  { uid: '2', name: 'photo.png', size: 120_000, status: 'done' },
]

export function TokensOverrideUpload() {
  return (
    <div style={dark}>
      <Upload multiple fileList={files} />
    </div>
  )
}
