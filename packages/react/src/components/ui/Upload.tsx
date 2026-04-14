import React, { useRef } from 'react'
import { Button } from './Button'
import { Spin } from './Spin'
import { useConfig } from '../ConfigProvider'
import type { BaseComponentProps, InteractiveProps } from '../../types'

export interface UploadFile {
  uid: string
  name: string
  size: number
  status: 'uploading' | 'done' | 'error'
}

export interface UploadProps extends BaseComponentProps, InteractiveProps {
  accept?: string
  multiple?: boolean
  fileList?: UploadFile[]
  maxCount?: number
  onUpload?: (files: File[]) => void
  onRemove?: (file: UploadFile) => void
  children?: React.ReactNode
}

export function Upload({
  accept,
  multiple,
  disabled: disabledProp,
  loading,
  fileList = [],
  maxCount,
  onUpload,
  onRemove,
  children,
  className,
  style,
  unstyled,
}: UploadProps) {
  const config = useConfig()
  const disabled = disabledProp ?? config.disabled
  const inputRef = useRef<HTMLInputElement>(null)

  const handleClick = () => {
    if (disabled || loading) return
    inputRef.current?.click()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? [])
    if (maxCount) {
      const remaining = maxCount - fileList.length
      onUpload?.(files.slice(0, Math.max(0, remaining)))
    } else {
      onUpload?.(files)
    }
    if (inputRef.current) inputRef.current.value = ''
  }

  const wrapperClass = unstyled
    ? className ?? ''
    : ['sg-upload', loading ? 'sg-upload-loading' : '', className]
        .filter(Boolean)
        .join(' ')

  return (
    <div className={wrapperClass} style={style}>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        style={{ display: 'none' }}
        aria-label="Upload file"
        onChange={handleChange}
      />
      <div onClick={handleClick}>
        {children ?? (
          <Button disabled={disabled} loading={loading}>
            Upload
          </Button>
        )}
      </div>
      {fileList.length > 0 && (
        <div className={unstyled ? '' : 'sg-upload-list'}>
          {fileList.map((file) => (
            <div
              key={file.uid}
              className={
                unstyled
                  ? ''
                  : ['sg-upload-item', `sg-upload-item-${file.status}`]
                      .filter(Boolean)
                      .join(' ')
              }
            >
              <span className={unstyled ? '' : 'sg-upload-item-name'}>
                {file.status === 'uploading' && <Spin size="small" unstyled={unstyled} />}
                {file.name}
              </span>
              {file.status !== 'uploading' && (
                <span
                  className={unstyled ? '' : 'sg-upload-item-remove'}
                  onClick={() => onRemove?.(file)}
                >
                  ×
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
