import { useState } from 'react'
import { Upload } from '@skygraph/react'
import type { UploadFile } from '@skygraph/react'

/**
 * Single-file trigger. `onUpload` hands you native `File` objects —
 * push them into a controlled list with the three states Upload knows:
 * `uploading`, `done`, `error`.
 */
export function BasicUpload() {
  const [files, setFiles] = useState<UploadFile[]>([])

  const handleUpload = (picked: File[]) => {
    console.log(
      '[Upload] picked',
      picked.map((f) => f.name),
    )
    const next = picked.map<UploadFile>((f) => ({
      uid: `${f.name}-${Date.now()}`,
      name: f.name,
      size: f.size,
      status: 'uploading',
    }))
    setFiles((prev) => [...prev, ...next])
    setTimeout(() => {
      setFiles((prev) =>
        prev.map((f) => (next.find((n) => n.uid === f.uid) ? { ...f, status: 'done' } : f)),
      )
    }, 900)
  }

  return (
    <Upload
      fileList={files}
      onUpload={handleUpload}
      onRemove={(file) => {
        console.log('[Upload] remove', file.name)
        setFiles((prev) => prev.filter((f) => f.uid !== file.uid))
      }}
    />
  )
}
