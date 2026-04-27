import { useState } from 'react'
import { Upload } from '@skygraph/react'
import type { UploadFile } from '@skygraph/react'

/**
 * Every row has a status variant — `error` applies the red theme + remove
 * button. Typical use: surface server validation failures ("file too
 * large", "wrong mime", "signature rejected").
 */
export function ErrorStateUpload() {
  const [files, setFiles] = useState<UploadFile[]>([
    { uid: 'a', name: 'spec.pdf', size: 24_000, status: 'done' },
    { uid: 'b', name: 'broken.zip', size: 900_000, status: 'error' },
    { uid: 'c', name: 'in-flight.mp4', size: 4_500_000, status: 'uploading' },
  ])

  return (
    <Upload
      multiple
      fileList={files}
      onRemove={(file) => setFiles((prev) => prev.filter((f) => f.uid !== file.uid))}
    />
  )
}
