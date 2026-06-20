import { Upload } from '@skygraph/react'
import type { UploadFile } from '@skygraph/react'
import type { CSSProperties } from 'react'

const dark = {
  background: '#0f172a',
  '--sg-color-primary-bg': 'rgba(96, 165, 250, 0.16)',
  '--sg-color-border-secondary': '#334155',
  '--sg-color-bg-disabled': '#1e293b',
  '--sg-color-text-tertiary': '#94a3b8',
  '--sg-color-text-secondary': '#cbd5e1',
  padding: 24,
  borderRadius: 12,
  '--sg-color-bg-container': '#1e293b',
  '--sg-color-bg-hover': '#334155',
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
