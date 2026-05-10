import { useState, useMemo } from 'react'
import {
  Tree,
  Breadcrumb,
  Button,
  Input,
  Modal,
  Popconfirm,
  Empty,
  Segmented,
  Table,
  Upload,
  Tag,
  Drawer,
  Tooltip,
  notification,
  NotificationContainer,
} from '@skygraph/react'
import type { TableColumn } from '@skygraph/react'
import { folderTree, allFiles, fileIcons, formatFileSize } from './data'
import type { FileItem } from './data'
import { useAppLocale } from '../_shared'
import type { ShowcasesLocale } from '@skygraph-examples/shared'

type FmLocale = ShowcasesLocale['apps']['fileManager']

function FileGrid({
  l,
  files,
  onOpen,
  onContext,
}: {
  l: FmLocale
  files: FileItem[]
  onOpen: (f: FileItem) => void
  onContext: (e: React.MouseEvent, f: FileItem) => void
}) {
  if (!files.length) return <Empty description={l.emptyFolder} />
  return (
    <div className="fm-file-grid">
      {files.map((f) => (
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

function FileTable({
  l,
  files,
  onOpen,
  onPreview,
}: {
  l: FmLocale
  files: FileItem[]
  onOpen: (f: FileItem) => void
  onPreview: (f: FileItem) => void
}) {
  if (!files.length) return <Empty description={l.emptyFolder} />

  const tableData = files.map((f) => ({
    id: f.id,
    data: {
      name: f.name,
      size: f.size,
      type: f.type,
      modified: f.modified,
      icon: fileIcons[f.type],
    } as Record<string, unknown>,
  }))

  const columns: TableColumn[] = [
    {
      key: 'name',
      title: l.table.name,
      width: 280,
      sortable: true,
      render: (val, row) => (
        <span style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
          {String(row.icon)} {String(val)}
        </span>
      ),
    },
    {
      key: 'size',
      title: l.table.size,
      width: 100,
      sortable: true,
      render: (val) => formatFileSize(Number(val)),
    },
    { key: 'type', title: l.table.type, width: 100, sortable: true },
    { key: 'modified', title: l.table.modified, width: 110, sortable: true },
    {
      key: 'actions',
      title: '',
      width: 180,
      render: (_, row) => {
        const f = files.find((x) => x.id === row.id)
        return (
          <div style={{ display: 'flex', gap: 4 }}>
            <Button size="small" onClick={() => f && onPreview(f)}>
              {l.table.preview}
            </Button>
            <Button size="small" onClick={() => f && onOpen(f)}>
              {l.table.open}
            </Button>
            <Popconfirm
              title={l.table.deleteConfirm(String(row.name))}
              onConfirm={() => notification.success(l.table.deleted(String(row.name)))}
            >
              <Button size="small">{l.table.delete}</Button>
            </Popconfirm>
          </div>
        )
      },
    },
  ]

  return <Table columns={columns} data={tableData} pageSize={12} size="small" />
}

function FilePreview({ l, file }: { l: FmLocale; file: FileItem }) {
  const ext = file.name.split('.').pop()?.toLowerCase() ?? ''
  if (file.type === 'image') {
    return (
      <div
        style={{
          height: 240,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'var(--sg-color-bg-secondary)',
          borderRadius: 6,
          fontSize: 80,
        }}
      >
        {fileIcons.image}
      </div>
    )
  }
  if (file.type === 'document' && (ext === 'md' || ext === 'txt')) {
    return (
      <div
        style={{
          background: 'var(--sg-color-bg-secondary)',
          borderRadius: 6,
          padding: 16,
          fontFamily: 'monospace',
          fontSize: 12,
          lineHeight: 1.6,
          maxHeight: 240,
          overflow: 'auto',
          whiteSpace: 'pre-wrap',
        }}
      >
        {`# ${file.name}\n\nSample content of ${file.name}.\n\nLast modified: ${file.modified}.\nSize: ${formatFileSize(file.size)}.\n\n## Section\n- Item 1\n- Item 2\n- Item 3\n`}
      </div>
    )
  }
  if (file.type === 'code') {
    return (
      <div
        style={{
          background: 'var(--sg-color-bg-secondary)',
          borderRadius: 6,
          padding: 16,
          fontFamily: 'monospace',
          fontSize: 12,
          lineHeight: 1.6,
          maxHeight: 240,
          overflow: 'auto',
        }}
      >
        <span style={{ color: '#a40' }}>export function</span> {file.name.split('.')[0]}() {'{\n'}
        {`  return (\n    <div>${file.name}</div>\n  )\n}`}
      </div>
    )
  }
  return (
    <div
      style={{
        height: 200,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--sg-color-bg-secondary)',
        borderRadius: 6,
        gap: 8,
      }}
    >
      <div style={{ fontSize: 80 }}>{fileIcons[file.type]}</div>
      <div style={{ fontSize: 12, color: 'var(--sg-color-text-secondary)' }}>
        {l.preview.notAvailable(file.type)}
      </div>
    </div>
  )
}

export function FileManagerApp() {
  const l = useAppLocale('fileManager')
  const [currentPath, setCurrentPath] = useState('root')
  const [view, setView] = useState<'grid' | 'list' | 'recent'>('grid')
  const [search, setSearch] = useState('')
  const [renameModal, setRenameModal] = useState<FileItem | null>(null)
  const [previewFile, setPreviewFile] = useState<FileItem | null>(null)
  const [renameValue, setRenameValue] = useState('')
  const [shareOpen, setShareOpen] = useState<FileItem | null>(null)

  const files = useMemo(() => {
    const f = allFiles[currentPath] ?? []
    if (search) return f.filter((file) => file.name.toLowerCase().includes(search.toLowerCase()))
    return f
  }, [currentPath, search])

  const recentFiles = useMemo(() => {
    return Object.values(allFiles)
      .flat()
      .filter((f) => f.type !== 'folder')
      .sort((a, b) => b.modified.localeCompare(a.modified))
      .slice(0, 24)
  }, [])

  const breadcrumbItems = useMemo(() => {
    const parts = currentPath === 'root' ? [l.rootName] : [l.rootName, ...currentPath.split('/')]
    return parts.map((p, i) => ({
      title: p.charAt(0).toUpperCase() + p.slice(1),
      onClick:
        i < parts.length - 1
          ? () => {
              if (i === 0) setCurrentPath('root')
              else setCurrentPath(parts.slice(1, i + 1).join('/'))
            }
          : undefined,
    }))
  }, [currentPath, l.rootName])

  const handleOpen = (f: FileItem) => {
    if (f.type === 'folder') {
      const newPath =
        currentPath === 'root'
          ? f.name.toLowerCase()
          : `${currentPath}/${f.name.toLowerCase().replace(/\s/g, '-')}`
      if (allFiles[newPath]) {
        setCurrentPath(newPath)
      } else {
        notification.info(l.noContents(f.name))
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
          onSelect={(keys) => {
            if (keys.length) setCurrentPath(keys[0] as string)
          }}
        />
        <div
          style={{
            padding: 12,
            marginTop: 12,
            borderTop: '1px solid var(--sg-color-border-secondary)',
          }}
        >
          <div style={{ fontSize: 12, color: 'var(--sg-color-text-secondary)', marginBottom: 6 }}>
            {l.storage}
          </div>
          <div
            style={{
              height: 6,
              background: 'var(--sg-color-border-secondary)',
              borderRadius: 3,
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: '71%',
                height: '100%',
                background: 'var(--sg-color-warning, #faad14)',
              }}
            />
          </div>
        </div>
      </div>

      <div className="fm-main">
        <Breadcrumb items={breadcrumbItems} />
        <div className="sc-toolbar" style={{ marginTop: 12 }}>
          <Input
            placeholder={l.searchPlaceholder}
            value={search}
            onChange={setSearch}
            style={{ width: 220 }}
          />
          <div className="sc-toolbar-spacer" />
          <Tooltip title={l.shortcutHintTitle}>
            <span
              style={{
                fontSize: 11,
                color: 'var(--sg-color-text-tertiary, var(--sg-color-text-secondary))',
              }}
            >
              {l.shortcutHint}
            </span>
          </Tooltip>
          <Segmented
            value={view}
            onChange={(v) => setView(v as typeof view)}
            options={[
              { label: l.views.grid, value: 'grid' },
              { label: l.views.list, value: 'list' },
              { label: l.views.recent, value: 'recent' },
            ]}
          />
          <Upload onUpload={() => notification.success(l.uploadDone)}>
            <Button type="primary">{l.upload}</Button>
          </Upload>
        </div>

        <div style={{ marginTop: 16, flex: 1 }}>
          {view === 'grid' && (
            <FileGrid l={l} files={files} onOpen={handleOpen} onContext={handleContext} />
          )}
          {view === 'list' && (
            <FileTable l={l} files={files} onOpen={handleOpen} onPreview={setPreviewFile} />
          )}
          {view === 'recent' && (
            <>
              <div
                style={{ fontSize: 13, color: 'var(--sg-color-text-secondary)', marginBottom: 12 }}
              >
                {l.recentSubtitle(recentFiles.length)}
              </div>
              <div className="fm-file-grid">
                {recentFiles.map((f) => (
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
            <FilePreview l={l} file={previewFile} />
            <div
              style={{
                fontSize: 13,
                color: 'var(--sg-color-text-secondary)',
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
              }}
            >
              <div>
                <strong>{l.preview.typeLabel}</strong> {previewFile.type}
              </div>
              <div>
                <strong>{l.preview.sizeLabel}</strong> {formatFileSize(previewFile.size)}
              </div>
              <div>
                <strong>{l.preview.modifiedLabel}</strong> {previewFile.modified}
              </div>
              <div>
                <strong>{l.preview.pathLabel}</strong> /{previewFile.path.join('/')}/
                {previewFile.name}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <Tag color="processing">{previewFile.type}</Tag>
              {previewFile.type === 'code' && <Tag>{l.preview.readable}</Tag>}
              {previewFile.size > 1000000 && <Tag color="warning">{l.preview.large}</Tag>}
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <Button onClick={() => notification.success(l.preview.downloading(previewFile.name))}>
                {l.preview.download}
              </Button>
              <Button
                onClick={() => {
                  setShareOpen(previewFile)
                  setPreviewFile(null)
                }}
              >
                {l.preview.share}
              </Button>
              <Button
                onClick={() => {
                  setRenameModal(previewFile)
                  setRenameValue(previewFile.name)
                  setPreviewFile(null)
                }}
              >
                {l.preview.rename}
              </Button>
              <Popconfirm
                title={l.preview.deleteConfirm(previewFile.name)}
                onConfirm={() => {
                  notification.success(l.preview.deleteToast)
                  setPreviewFile(null)
                }}
              >
                <Button style={{ color: 'var(--sg-color-error, #d4380d)' }}>
                  {l.table.delete}
                </Button>
              </Popconfirm>
            </div>
          </div>
        )}
      </Drawer>

      <Modal
        open={!!renameModal}
        onClose={() => setRenameModal(null)}
        title={l.rename.title}
        footer={
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <Button onClick={() => setRenameModal(null)}>{l.rename.cancel}</Button>
            <Button
              type="primary"
              onClick={() => {
                notification.success(l.rename.toast(renameValue))
                setRenameModal(null)
              }}
            >
              {l.rename.submit}
            </Button>
          </div>
        }
      >
        <Input value={renameValue} onChange={setRenameValue} />
      </Modal>

      <Modal
        open={!!shareOpen}
        onClose={() => setShareOpen(null)}
        title={l.share.title(shareOpen?.name ?? '')}
        footer={
          <Button type="primary" onClick={() => setShareOpen(null)}>
            {l.share.done}
          </Button>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ fontSize: 13, color: 'var(--sg-color-text-secondary)' }}>
            {l.share.description}
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <Input
              value={`https://files.example.io/${shareOpen?.id ?? ''}`}
              readOnly
              style={{ flex: 1 }}
            />
            <Button
              onClick={() => {
                navigator.clipboard?.writeText(`https://files.example.io/${shareOpen?.id ?? ''}`)
                notification.success(l.share.copied)
              }}
            >
              {l.share.copy}
            </Button>
          </div>
          <div>
            <div style={{ fontSize: 13, marginBottom: 8 }}>{l.share.permissionLabel}</div>
            <Segmented
              defaultValue="view"
              options={[
                { label: l.share.permView, value: 'view' },
                { label: l.share.permComment, value: 'comment' },
                { label: l.share.permEdit, value: 'edit' },
              ]}
            />
          </div>
        </div>
      </Modal>
    </div>
  )
}
