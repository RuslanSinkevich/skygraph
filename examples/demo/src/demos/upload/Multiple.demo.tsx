import { useState } from 'react'
import { Upload } from '@skygraph/react'
import type { UploadFile } from '@skygraph/react'

/**
 * `multiple` lets the native picker select several files per dialog.
 * `maxCount` caps how many make it into `onUpload` — the rest is ignored
 * based on the current list length.
 */
export function MultipleUpload() {
  const [files, setFiles] = useState<UploadFile[]>([])

  return (
    <Upload
      multiple
      maxCount={5}
      fileList={files}
      onUpload={(picked) => {
        setFiles((prev) => [
          ...prev,
          ...picked.map<UploadFile>((f) => ({
            uid: `${f.name}-${Date.now()}-${Math.random()}`,
            name: f.name,
            size: f.size,
            status: 'done',
          })),
        ])
      }}
      onRemove={(file) => setFiles((prev) => prev.filter((f) => f.uid !== file.uid))}
    />
  )
}
