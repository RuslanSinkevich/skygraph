export interface FileItem {
  id: string
  name: string
  type: 'folder' | 'image' | 'document' | 'spreadsheet' | 'code' | 'archive' | 'video' | 'audio' | 'other'
  size: number
  modified: string
  path: string[]
}

export interface FolderNode {
  key: string
  title: string
  children?: FolderNode[]
  [field: string]: unknown
}

const fileIcons: Record<FileItem['type'], string> = {
  folder: '📁',
  image: '🖼️',
  document: '📄',
  spreadsheet: '📊',
  code: '💻',
  archive: '📦',
  video: '🎬',
  audio: '🎵',
  other: '📎',
}

export { fileIcons }

const docNames = [
  'README.md', 'architecture.md', 'meeting-notes.docx', 'proposal-v2.pdf', 'requirements.md',
  'design-spec.md', 'changelog.md', 'user-guide.pdf',
]
const imageNames = [
  'hero-banner.png', 'logo.svg', 'screenshot-1.png', 'mockup-v3.fig', 'icon-set.zip',
  'team-photo.jpg', 'product-shot.png', 'diagram.svg',
]
const codeNames = [
  'index.ts', 'App.tsx', 'utils.ts', 'config.json', 'package.json',
  'styles.css', 'api.ts', 'types.d.ts', 'server.ts', 'middleware.ts',
]
const spreadsheetNames = ['budget-2025.xlsx', 'sales-report.csv', 'inventory.xlsx', 'analytics-q4.xlsx']
const archiveNames = ['release-v2.3.zip', 'backup-jan.tar.gz', 'assets.zip', 'node_modules.tar.gz']

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

const folders = ['Documents', 'Images', 'Source', 'Reports', 'Archives', 'Downloads', 'Shared']
const subFolders: Record<string, string[]> = {
  Documents: ['Contracts', 'Proposals', 'Meeting Notes'],
  Images: ['Screenshots', 'Logos', 'Mockups'],
  Source: ['frontend', 'backend', 'shared'],
  Reports: ['Q1', 'Q2', 'Q3', 'Q4'],
  Archives: ['2024', '2025'],
  Downloads: [],
  Shared: ['Team A', 'Team B'],
}

export const folderTree: FolderNode[] = [
  {
    key: 'root',
    title: 'My Files',
    children: folders.map(f => ({
      key: f.toLowerCase(),
      title: f,
      children: subFolders[f].map(sf => ({
        key: `${f.toLowerCase()}/${sf.toLowerCase().replace(/\s/g, '-')}`,
        title: sf,
      })),
    })),
  },
]

function genFilesForFolder(folder: string, sub?: string): FileItem[] {
  const path = sub ? [folder, sub] : [folder]
  const prefix = path.join('/')
  let names: { name: string; type: FileItem['type'] }[] = []

  if (folder === 'Documents' || folder === 'Shared') {
    names = docNames.map(n => ({ name: n, type: 'document' as const }))
  } else if (folder === 'Images') {
    names = imageNames.map(n => ({ name: n, type: 'image' as const }))
  } else if (folder === 'Source') {
    names = codeNames.map(n => ({ name: n, type: 'code' as const }))
  } else if (folder === 'Reports') {
    names = spreadsheetNames.map(n => ({ name: n, type: 'spreadsheet' as const }))
  } else if (folder === 'Archives') {
    names = archiveNames.map(n => ({ name: n, type: 'archive' as const }))
  } else {
    names = [...docNames.slice(0, 3), ...imageNames.slice(0, 2), ...codeNames.slice(0, 2)].map(n => ({
      name: n,
      type: pick(['document', 'image', 'code', 'other'] as FileItem['type'][]),
    }))
  }

  return names.map((n, i) => ({
    id: `${prefix}/${n.name}`,
    name: n.name,
    type: n.type,
    size: Math.floor(Math.random() * 5000000) + 1000,
    modified: new Date(Date.now() - Math.random() * 90 * 86400000).toISOString().slice(0, 10),
    path,
  }))
}

export const allFiles: Record<string, FileItem[]> = {}
folders.forEach(f => {
  allFiles[f.toLowerCase()] = genFilesForFolder(f)
  subFolders[f].forEach(sf => {
    const key = `${f.toLowerCase()}/${sf.toLowerCase().replace(/\s/g, '-')}`
    allFiles[key] = genFilesForFolder(f, sf)
  })
})
allFiles['root'] = folders.map((f, i) => ({
  id: `folder-${f}`,
  name: f,
  type: 'folder' as const,
  size: 0,
  modified: new Date(Date.now() - i * 5 * 86400000).toISOString().slice(0, 10),
  path: [],
}))

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '—'
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
}
