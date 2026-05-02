import { useState, useMemo } from 'react'
import {
  Tree, Breadcrumb, Button, Input, Modal, Popconfirm, Empty,
  Segmented, Table, Upload, Tag, Drawer, Tooltip,
  notification, NotificationContainer,
} from '@skygraph/react'
import type { TableColumn } from '@skygraph/react'
import { folderTree, allFiles, fileIcons, formatFileSize } from './data'
import type { FileItem } from './data'

function FileGrid({ files, onOpen, onContext }: {
  files: FileItem[]
  onOpen: (f: FileItem) => void
  onContext: (e: React.MouseEvent, f: FileItem) => void
}) {
  if (!files.length) return <Empty description="This folder is empty" />
  return (
    <div className="fm-file-grid">
      {files.map(f => (
        <div
          key={f.id}
          className="fm-file-card"
          onDoubleClick={() => onOpen(f)}
          onContextMenu={(e) => onContext(e, f)}
        >
          <span className="fm-file-icon">{fileIcons[f.type]}</span>
          <span className="fm-file-name">{f.name}</span>
          <span className="fm-file-size">{formatFileSize(f.size)}</span>
        </div>
      ))}
    </div>
  )
}

function FileTable({ files, onOpen, onPreview }: {
  files: FileItem[]
  onOpen: (f: FileItem) => void
  onPreview: (f: FileItem) => void
}) {
  if (!files.length) return <Empty description="This folder is empty" />

  const tableData = files.map(f => ({
    id: f.id,
    data: { name: f.name, size: f.size, type: f.type, modified: f.modified, icon: fileIcons[f.type] } as Record<string, unknown>,
  }))

  const columns: TableColumn[] = [
    {
      key: 'name', title: 'Name', width: 280, sortable: true,
      render: (val, row) => (
        <span style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
          {String(row.icon)} {String(val)}
        </span>
      ),
    },
    { key: 'size', title: 'Size', width: 100, sortable: true, render: (val) => formatFileSize(Number(val)) },
    { key: 'type', title: 'Type', width: 100, sortable: true },
    { key: 'modified', title: 'Modified', width: 110, sortable: true },
    {
      key: 'actions', title: '', width: 180,
      render: (_, row) => {
        const f = files.find(x => x.id === row.id)
        return (
          <div style={{ display: 'flex', gap: 4 }}>
            <Button size="small" onClick={() => f && onPreview(f)}>Preview</Button>
            <Button size="small" onClick={() => f && onOpen(f)}>Open</Button>
            <Popconfirm title={`Delete "${row.name}"?`} onConfirm={() => notification.success(`Deleted ${row.name} (mock)`)}>
              <Button size="small">Delete</Button>
            </Popconfirm>
          </div>
        )
      },
    },
  ]

  return <Table columns={columns} data={tableData} pageSize={12} size="small" />
}

function FilePreview({ file }: { file: FileItem }) {
  const ext = file.name.split('.').pop()?.toLowerCase() ?? ''
  if (file.type === 'image') {
    return (
      <div style={{
        height: 240, display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'var(--sg-color-bg-secondary)', borderRadius: 6, fontSize: 80,
      }}>{fileIcons.image}</div>
    )
  }
  if (file.type === 'document' && (ext === 'md' || ext === 'txt')) {
    return (
      <div style={{
        background: 'var(--sg-color-bg-secondary)', borderRadius: 6, padding: 16,
        fontFamily: 'monospace', fontSize: 12, lineHeight: 1.6,
        maxHeight: 240, overflow: 'auto', whiteSpace: 'pre-wrap',
      }}>
        {`# ${file.name}\n\nSample content of ${file.name}.\n\nLast modified: ${file.modified}.\nSize: ${formatFileSize(file.size)}.\n\n## Section\n- Item 1\n- Item 2\n- Item 3\n`}
      </div>
    )
  }
  if (file.type === 'code') {
    return (
      <div style={{
        background: 'var(--sg-color-bg-secondary)', borderRadius: 6, padding: 16,
        fontFamily: 'monospace', fontSize: 12, lineHeight: 1.6,
        maxHeight: 240, overflow: 'auto',
      }}>
        <span style={{ color: '#a40' }}>export function</span> {file.name.split('.')[0]}() {'{\n'}
        {`  return (\n    <div>${file.name}</div>\n  )\n}`}
      </div>
    )
  }
  return (
    <div style={{
      height: 200, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      background: 'var(--sg-color-bg-secondary)', borderRadius: 6, gap: 8,
    }}>
      <div style={{ fontSize: 80 }}>{fileIcons[file.type]}</div>
      <div style={{ fontSize: 12, color: 'var(--sg-color-text-secondary)' }}>
        Preview not available for {file.type}
      </div>
    </div>
  )
}

export function FileManagerApp() {
  const [currentPath, setCurrentPath] = useState('root')
  const [view, setView] = useState<'grid' | 'list' | 'recent'>('grid')
  const [search, setSearch] = useState('')
  const [renameModal, setRenameModal] = useState<FileItem | null>(null)
  const [previewFile, setPreviewFile] = useState<FileItem | null>(null)
  const [renameValue, setRenameValue] = useState('')
  const [shareOpen, setShareOpen] = useState<FileItem | null>(null)

  const files = useMemo(() => {
    const f = allFiles[currentPath] ?? []
    if (search) return f.filter(file => file.name.toLowerCase().includes(search.toLowerCase()))
    return f
  }, [currentPath, search])

  const recentFiles = useMemo(() => {
    return Object.values(allFiles)
      .flat()
      .filter(f => f.type !== 'folder')
      .sort((a, b) => b.modified.localeCompare(a.modified))
      .slice(0, 24)
  }, [])

  const breadcrumbItems = useMemo(() => {
    const parts = currentPath === 'root' ? ['My Files'] : ['My Files', ...currentPath.split('/')]
    return parts.map((p, i) => ({
      title: p.charAt(0).toUpperCase() + p.slice(1),
      onClick: i < parts.length - 1 ? () => {
        if (i === 0) setCurrentPath('root')
        else setCurrentPath(parts.slice(1, i + 1).join('/'))
      } : undefined,
    }))
  }, [currentPath])

  const handleOpen = (f: FileItem) => {
    if (f.type === 'folder') {
      const newPath = currentPath === 'root'
        ? f.name.toLowerCase()
        : `${currentPath}/${f.name.toLowerCase().replace(/\s/g, '-')}`
      if (allFiles[newPath]) {
        setCurrentPath(newPath)
      } else {
        notification.info(`No contents for ${f.name}`)
      }
    } else {
      setPreviewFile(f)
    }
  }

  const handleContext = (e: React.MouseEvent, f: FileItem) => {
    e.preventDefault()
    setPreviewFile(f)
  }

  return (
    <div style={{ display: 'flex', flex: 1 }}>
      <NotificationContainer />
      <div className="fm-tree">
        <Tree
          treeData={folderTree}
          defaultExpandAll
          selectedKeys={[currentPath]}
          onSelect={(keys) => { if (keys.length) setCurrentPath(keys[0] as string) }}
        />
        <div style={{ padding: 12, marginTop: 12, borderTop: '1px solid var(--sg-color-border-secondary)' }}>
          <div style={{ fontSize: 12, color: 'var(--sg-color-text-secondary)', marginBottom: 6 }}>
            Storage: 142 GB / 200 GB
          </div>
          <div style={{ height: 6, background: 'var(--sg-color-border-secondary)', borderRadius: 3, overflow: 'hidden' }}>
            <div style={{ width: '71%', height: '100%', background: 'var(--sg-color-warning, #faad14)' }} />
          </div>
        </div>
      </div>

      <div className="fm-main">
        <Breadcrumb items={breadcrumbItems} />
        <div className="sc-toolbar" style={{ marginTop: 12 }}>
          <Input placeholder="Search files…" value={search} onChange={setSearch} style={{ width: 220 }} />
          <div className="sc-toolbar-spacer" />
          <Tooltip title="Use ↑↓ to navigate, Enter to open">
            <span style={{ fontSize: 11, color: 'var(--sg-color-text-tertiary, var(--sg-color-text-secondary))' }}>⌘+F search · Del delete</span>
          </Tooltip>
          <Segmented
            value={view}
            onChange={(v) => setView(v as typeof view)}
            options={[
              { label: 'Grid', value: 'grid' },
              { label: 'List', value: 'list' },
              { label: 'Recent', value: 'recent' },
            ]}
          />
          <Upload onUpload={() => notification.success('File uploaded (mock)')}>
            <Button type="primary">Upload</Button>
          </Upload>
        </div>

        <div style={{ marginTop: 16, flex: 1 }}>
          {view === 'grid' && <FileGrid files={files} onOpen={handleOpen} onContext={handleContext} />}
          {view === 'list' && <FileTable files={files} onOpen={handleOpen} onPreview={setPreviewFile} />}
          {view === 'recent' && (
            <>
              <div style={{ fontSize: 13, color: 'var(--sg-color-text-secondary)', marginBottom: 12 }}>
                {recentFiles.length} recently modified files
              </div>
              <div className="fm-file-grid">
                {recentFiles.map(f => (
                  <div key={f.id} className="fm-file-card" onClick={() => setPreviewFile(f)}>
                    <span className="fm-file-icon">{fileIcons[f.type]}</span>
                    <span className="fm-file-name">{f.name}</span>
                    <span className="fm-file-size">{f.modified}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <Drawer
        open={!!previewFile}
        onClose={() => setPreviewFile(null)}
        title={previewFile?.name ?? ''}
        width={460}
      >
        {previewFile && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <FilePreview file={previewFile} />
            <div style={{ fontSize: 13, color: 'var(--sg-color-text-secondary)', display: 'flex', flexDirection: 'column', gap: 4 }}>
              <div><strong>Type:</strong> {previewFile.type}</div>
              <div><strong>Size:</strong> {formatFileSize(previewFile.size)}</div>
              <div><strong>Modified:</strong> {previewFile.modified}</div>
              <div><strong>Path:</strong> /{previewFile.path.join('/')}/{previewFile.name}</div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <Tag color="processing">{previewFile.type}</Tag>
              {previewFile.type === 'code' && <Tag>readable</Tag>}
              {previewFile.size > 1000000 && <Tag color="warning">large</Tag>}
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <Button onClick={() => notification.success(`Downloading ${previewFile.name}`)}>Download</Button>
              <Button onClick={() => { setShareOpen(previewFile); setPreviewFile(null) }}>Share</Button>
              <Button onClick={() => { setRenameModal(previewFile); setRenameValue(previewFile.name); setPreviewFile(null) }}>Rename</Button>
              <Popconfirm title={`Delete "${previewFile.name}"?`} onConfirm={() => {
                notification.success('Deleted (mock)')
                setPreviewFile(null)
              }}>
                <Button style={{ color: 'var(--sg-color-error, #d4380d)' }}>Delete</Button>
              </Popconfirm>
            </div>
          </div>
        )}
      </Drawer>

      <Modal
        open={!!renameModal}
        onClose={() => setRenameModal(null)}
        title="Rename file"
        footer={
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <Button onClick={() => setRenameModal(null)}>Cancel</Button>
            <Button type="primary" onClick={() => {
              notification.success(`Renamed to ${renameValue} (mock)`)
              setRenameModal(null)
            }}>Rename</Button>
          </div>
        }
      >
        <Input value={renameValue} onChange={setRenameValue} />
      </Modal>

      <Modal
        open={!!shareOpen}
        onClose={() => setShareOpen(null)}
        title={`Share — ${shareOpen?.name ?? ''}`}
        footer={
          <Button type="primary" onClick={() => setShareOpen(null)}>Done</Button>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ fontSize: 13, color: 'var(--sg-color-text-secondary)' }}>
            Anyone with the link can view this file.
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <Input
              value={`https://files.example.io/${shareOpen?.id ?? ''}`}
              readOnly
              style={{ flex: 1 }}
            />
            <Button onClick={() => {
              navigator.clipboard?.writeText(`https://files.example.io/${shareOpen?.id ?? ''}`)
              notification.success('Link copied')
            }}>Copy</Button>
          </div>
          <div>
            <div style={{ fontSize: 13, marginBottom: 8 }}>Permission:</div>
            <Segmented
              defaultValue="view"
              options={[
                { label: 'View only', value: 'view' },
                { label: 'Comment', value: 'comment' },
                { label: 'Edit', value: 'edit' },
              ]}
            />
          </div>
        </div>
      </Modal>
    </div>
  )
}
