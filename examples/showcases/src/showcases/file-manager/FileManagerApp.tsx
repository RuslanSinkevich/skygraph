import { useState, useMemo } from 'react'
import {
  Tree, Breadcrumb, Button, Input, Modal, Popconfirm, Empty,
  Segmented, Table, Upload, notification, NotificationContainer,
} from '@skygraph/react'
import type { TableColumn } from '@skygraph/react'
import { folderTree, allFiles, fileIcons, formatFileSize } from './data'
import type { FileItem } from './data'

function FileGrid({ files, onOpen }: { files: FileItem[]; onOpen: (f: FileItem) => void }) {
  if (!files.length) return <Empty description="This folder is empty" />
  return (
    <div className="fm-file-grid">
      {files.map(f => (
        <div key={f.id} className="fm-file-card" onDoubleClick={() => onOpen(f)}>
          <span className="fm-file-icon">{fileIcons[f.type]}</span>
          <span className="fm-file-name">{f.name}</span>
          <span className="fm-file-size">{formatFileSize(f.size)}</span>
        </div>
      ))}
    </div>
  )
}

function FileTable({ files, onOpen }: { files: FileItem[]; onOpen: (f: FileItem) => void }) {
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
    {
      key: 'size', title: 'Size', width: 100, sortable: true,
      render: (val) => formatFileSize(Number(val)),
    },
    { key: 'type', title: 'Type', width: 100, sortable: true },
    { key: 'modified', title: 'Modified', width: 110, sortable: true },
    {
      key: 'actions', title: '', width: 80,
      render: (_, row) => (
        <Popconfirm title={`Delete "${row.name}"?`} onConfirm={() => notification.success(`Deleted ${row.name} (mock)`)}>
          <Button size="small">Delete</Button>
        </Popconfirm>
      ),
    },
  ]

  return <Table columns={columns} data={tableData} pageSize={12} size="small" />
}

export function FileManagerApp() {
  const [currentPath, setCurrentPath] = useState('root')
  const [view, setView] = useState<string>('grid')
  const [search, setSearch] = useState('')
  const [fileDetail, setFileDetail] = useState<FileItem | null>(null)
  const [renameValue, setRenameValue] = useState('')

  const files = useMemo(() => {
    const f = allFiles[currentPath] ?? []
    if (search) return f.filter(file => file.name.toLowerCase().includes(search.toLowerCase()))
    return f
  }, [currentPath, search])

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
      const newPath = currentPath === 'root' ? f.name.toLowerCase() : `${currentPath}/${f.name.toLowerCase().replace(/\s/g, '-')}`
      if (allFiles[newPath]) {
        setCurrentPath(newPath)
      } else {
        notification.info(`No contents for ${f.name}`)
      }
    } else {
      setFileDetail(f)
      setRenameValue(f.name)
    }
  }

  const handleTreeSelect = (keys: (string | number)[]) => {
    if (keys.length) setCurrentPath(keys[0] as string)
  }

  return (
    <div style={{ display: 'flex', flex: 1 }}>
      <NotificationContainer />
      <div className="fm-tree">
        <Tree
          treeData={folderTree}
          defaultExpandAll
          selectedKeys={[currentPath]}
          onSelect={handleTreeSelect}
        />
      </div>
      <div className="fm-main">
        <Breadcrumb items={breadcrumbItems} />
        <div className="sc-toolbar" style={{ marginTop: 12 }}>
          <Input placeholder="Search files..." value={search} onChange={setSearch} style={{ width: 220 }} />
          <div className="sc-toolbar-spacer" />
          <Segmented
            value={view}
            onChange={setView}
            options={[
              { label: 'Grid', value: 'grid' },
              { label: 'List', value: 'list' },
            ]}
          />
          <Upload onUpload={() => notification.success('File uploaded (mock)')}>
            <Button type="primary">Upload</Button>
          </Upload>
        </div>
        <div style={{ marginTop: 16 }}>
          {view === 'grid' ? (
            <FileGrid files={files} onOpen={handleOpen} />
          ) : (
            <FileTable files={files} onOpen={handleOpen} />
          )}
        </div>
      </div>

      <Modal
        open={!!fileDetail}
        onClose={() => setFileDetail(null)}
        title="File Details"
        footer={(
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <Button onClick={() => setFileDetail(null)}>Close</Button>
            <Button type="primary" onClick={() => {
              notification.success(`Renamed to ${renameValue} (mock)`)
              setFileDetail(null)
            }}>
              Rename
            </Button>
          </div>
        )}
      >
        {fileDetail && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ textAlign: 'center', fontSize: 48 }}>{fileIcons[fileDetail.type]}</div>
            <Input value={renameValue} onChange={setRenameValue} />
            <div style={{ fontSize: 13, color: 'var(--sg-color-text-secondary)' }}>
              <div>Type: {fileDetail.type}</div>
              <div>Size: {formatFileSize(fileDetail.size)}</div>
              <div>Modified: {fileDetail.modified}</div>
              <div>Path: /{fileDetail.path.join('/')}/{fileDetail.name}</div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
