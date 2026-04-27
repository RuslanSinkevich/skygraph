import { useState } from 'react'
import { Upload, Progress } from '@skygraph/react'
import type { UploadFile } from '@skygraph/react'

/**
 * Upload only renders `uploading | done | error` dots next to the file
 * name — for a full progress bar, keep per-file percent in parallel state
 * and render it next to Upload's list.
 */
export function WithProgressUpload() {
  const [files, setFiles] = useState<UploadFile[]>([])
  const [progress, setProgress] = useState<Record<string, number>>({})

  const simulate = (file: UploadFile) => {
    let value = 0
    const timer = setInterval(() => {
      value += 10 + Math.floor(Math.random() * 15)
      setProgress((p) => ({ ...p, [file.uid]: Math.min(100, value) }))
      if (value >= 100) {
        clearInterval(timer)
        setFiles((prev) => prev.map((f) => (f.uid === file.uid ? { ...f, status: 'done' } : f)))
      }
    }, 220)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 420 }}>
      <Upload
        multiple
        fileList={files}
        onUpload={(picked) => {
          const next = picked.map<UploadFile>((f) => ({
            uid: `${f.name}-${Date.now()}-${Math.random()}`,
            name: f.name,
            size: f.size,
            status: 'uploading',
          }))
          setFiles((prev) => [...prev, ...next])
          next.forEach(simulate)
        }}
        onRemove={(file) => setFiles((prev) => prev.filter((f) => f.uid !== file.uid))}
      />
      {files.filter((f) => f.status === 'uploading').length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {files
            .filter((f) => f.status === 'uploading')
            .map((f) => (
              <div key={f.uid} style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 8, alignItems: 'center' }}>
                <Progress percent={progress[f.uid] ?? 0} />
                <span style={{ fontSize: 12, color: 'var(--sg-color-text-secondary)' }}>{f.name}</span>
              </div>
            ))}
        </div>
      )}
    </div>
  )
}
