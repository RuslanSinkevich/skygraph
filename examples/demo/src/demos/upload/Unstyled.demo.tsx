import { useState } from 'react'
import { Upload } from '@skygraph/react'
import type { UploadFile } from '@skygraph/react'

/**
 * `unstyled` keeps the mechanics (hidden input, click trigger, file list)
 * but drops every SkyGraph class — perfect for embedding inside Tailwind,
 * shadcn, or a custom design system.
 */
export function UnstyledUpload() {
  const [files, setFiles] = useState<UploadFile[]>([
    { uid: '1', name: 'spec.pdf', size: 12_000, status: 'done' },
  ])

  return (
    <Upload
      unstyled
      multiple
      fileList={files}
      onUpload={(picked) =>
        setFiles((prev) => [
          ...prev,
          ...picked.map<UploadFile>((f) => ({ uid: `${f.name}-${Date.now()}`, name: f.name, size: f.size, status: 'done' })),
        ])
      }
      onRemove={(file) => setFiles((prev) => prev.filter((f) => f.uid !== file.uid))}
    />
  )
}
