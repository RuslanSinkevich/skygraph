<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  SgTree,
  SgBreadcrumb,
  SgButton,
  SgInput,
  SgModal,
  SgPopconfirm,
  SgEmpty,
  SgSegmented,
  SgTable,
  SgUpload,
  SgTag,
  SgDrawer,
  SgTooltip,
  notification,
  SgNotificationContainer,
  type TableColumn,
  type BreadcrumbItem,
} from '@skygraph/vue'
import { folderTree, allFiles, fileIcons, formatFileSize, type FileItem } from './data'
import { useAppLocale } from '../_shared'

const l = useAppLocale('fileManager')

const currentPath = ref('root')
const view = ref<'grid' | 'list' | 'recent'>('grid')
const search = ref('')
const renameModal = ref<FileItem | null>(null)
const previewFile = ref<FileItem | null>(null)
const renameValue = ref('')
const shareOpen = ref<FileItem | null>(null)

const files = computed<FileItem[]>(() => {
  const f = allFiles[currentPath.value] ?? []
  if (search.value)
    return f.filter((file) => file.name.toLowerCase().includes(search.value.toLowerCase()))
  return f
})

const recentFiles = computed<FileItem[]>(() => {
  return Object.values(allFiles)
    .flat()
    .filter((f) => f.type !== 'folder')
    .sort((a, b) => b.modified.localeCompare(a.modified))
    .slice(0, 24)
})

const breadcrumbItems = computed<BreadcrumbItem[]>(() => {
  const parts =
    currentPath.value === 'root' ? [l.rootName] : [l.rootName, ...currentPath.value.split('/')]
  return parts.map((p) => ({
    title: p.charAt(0).toUpperCase() + p.slice(1),
  }))
})

function handleBreadcrumbClick(_item: BreadcrumbItem, idx: number) {
  const parts =
    currentPath.value === 'root' ? [l.rootName] : [l.rootName, ...currentPath.value.split('/')]
  if (idx >= parts.length - 1) return
  if (idx === 0) currentPath.value = 'root'
  else currentPath.value = parts.slice(1, idx + 1).join('/')
}

function handleOpen(f: FileItem) {
  if (f.type === 'folder') {
    const newPath =
      currentPath.value === 'root'
        ? f.name.toLowerCase()
        : `${currentPath.value}/${f.name.toLowerCase().replace(/\s/g, '-')}`
    if (allFiles[newPath]) {
      currentPath.value = newPath
    } else {
      notification.info(l.noContents(f.name))
    }
  } else {
    previewFile.value = f
  }
}

function handleContext(e: MouseEvent, f: FileItem) {
  e.preventDefault()
  previewFile.value = f
}

function handleTreeSelect(keys: (string | number)[]) {
  if (keys.length) currentPath.value = String(keys[0])
}

function previewExt(name: string): string {
  return name.split('.').pop()?.toLowerCase() ?? ''
}

const fileTableData = computed(() =>
  files.value.map((f) => ({
    id: f.id,
    data: {
      name: f.name,
      size: f.size,
      type: f.type,
      modified: f.modified,
      icon: fileIcons[f.type],
    } as Record<string, unknown>,
  })),
)

const fileTableColumns: TableColumn[] = [
  { key: 'name', title: l.table.name, width: 280, sortable: true },
  { key: 'size', title: l.table.size, width: 100, sortable: true },
  { key: 'type', title: l.table.type, width: 100, sortable: true },
  { key: 'modified', title: l.table.modified, width: 110, sortable: true },
  { key: 'actions', title: '', width: 220 },
]

function findFileById(id: string): FileItem | undefined {
  return files.value.find((f) => f.id === id)
}

function copyShareLink() {
  const url = `https://files.example.io/${shareOpen.value?.id ?? ''}`
  navigator.clipboard?.writeText(url)
  notification.success(l.share.copied)
}
</script>

<template>
  <div class="fm-shell">
    <SgNotificationContainer />
    <div class="fm-tree">
      <SgTree
        :tree-data="folderTree"
        default-expand-all
        :selected-keys="[currentPath]"
        @select="handleTreeSelect"
      />
      <div class="fm-storage">
        <div class="fm-storage-label">{{ l.storage }}</div>
        <div class="fm-storage-bar">
          <div class="fm-storage-fill" />
        </div>
      </div>
    </div>

    <div class="fm-main">
      <SgBreadcrumb :items="breadcrumbItems" @item-click="handleBreadcrumbClick" />
      <div class="sc-toolbar" style="margin-top: 12px">
        <SgInput
          :value="search"
          :placeholder="l.searchPlaceholder"
          :style="{ width: '220px' }"
          @update:model-value="(v: string) => (search = v)"
        />
        <div class="sc-toolbar-spacer" />
        <SgTooltip :title="l.shortcutHintTitle">
          <span class="fm-shortcut-hint">{{ l.shortcutHint }}</span>
        </SgTooltip>
        <SgSegmented
          :value="view"
          :options="[
            { label: l.views.grid, value: 'grid' },
            { label: l.views.list, value: 'list' },
            { label: l.views.recent, value: 'recent' },
          ]"
          @change="(v: string | number) => (view = String(v) as 'grid' | 'list' | 'recent')"
        />
        <SgUpload @change="() => notification.success(l.uploadDone)">
          <SgButton type="primary">{{ l.upload }}</SgButton>
        </SgUpload>
      </div>

      <div style="margin-top: 16px; flex: 1">
        <template v-if="view === 'grid'">
          <SgEmpty v-if="files.length === 0" :description="l.emptyFolder" />
          <div v-else class="fm-file-grid">
            <div
              v-for="f of files"
              :key="f.id"
              class="fm-file-card"
              @dblclick="handleOpen(f)"
              @contextmenu="(e: MouseEvent) => handleContext(e, f)"
            >
              <span class="fm-file-icon">{{ fileIcons[f.type] }}</span>
              <span class="fm-file-name">{{ f.name }}</span>
              <span class="fm-file-size">{{ formatFileSize(f.size) }}</span>
            </div>
          </div>
        </template>

        <template v-else-if="view === 'list'">
          <SgEmpty v-if="files.length === 0" :description="l.emptyFolder" />
          <SgTable
            v-else
            :columns="fileTableColumns"
            :data="fileTableData"
            :page-size="12"
            size="small"
          >
            <template #cell="{ column, row, id, value }">
              <span
                v-if="column.key === 'name'"
                style="cursor: pointer; display: flex; align-items: center; gap: 6px"
              >
                {{ row.icon }} {{ value }}
              </span>
              <template v-else-if="column.key === 'size'">{{
                formatFileSize(Number(value))
              }}</template>
              <div v-else-if="column.key === 'actions'" style="display: flex; gap: 4px">
                <SgButton
                  size="small"
                  @click="
                    () => {
                      const f = findFileById(String(id))
                      if (f) previewFile = f
                    }
                  "
                  >{{ l.table.preview }}</SgButton
                >
                <SgButton
                  size="small"
                  @click="
                    () => {
                      const f = findFileById(String(id))
                      if (f) handleOpen(f)
                    }
                  "
                  >{{ l.table.open }}</SgButton
                >
                <SgPopconfirm
                  :title="l.table.deleteConfirm(String(row.name))"
                  @confirm="() => notification.success(l.table.deleted(String(row.name)))"
                >
                  <SgButton size="small">{{ l.table.delete }}</SgButton>
                </SgPopconfirm>
              </div>
              <template v-else>{{ value }}</template>
            </template>
          </SgTable>
        </template>

        <template v-else-if="view === 'recent'">
          <div class="fm-recent-subtitle">{{ l.recentSubtitle(recentFiles.length) }}</div>
          <div class="fm-file-grid">
            <div v-for="f of recentFiles" :key="f.id" class="fm-file-card" @click="previewFile = f">
              <span class="fm-file-icon">{{ fileIcons[f.type] }}</span>
              <span class="fm-file-name">{{ f.name }}</span>
              <span class="fm-file-size">{{ f.modified }}</span>
            </div>
          </div>
        </template>
      </div>
    </div>

    <SgDrawer
      :open="!!previewFile"
      :title="previewFile?.name ?? ''"
      :width="460"
      @close="previewFile = null"
    >
      <template v-if="previewFile">
        <div style="display: flex; flex-direction: column; gap: 16px">
          <!-- preview body -->
          <template v-if="previewFile.type === 'image'">
            <div class="fm-preview-image">{{ fileIcons.image }}</div>
          </template>
          <template
            v-else-if="
              previewFile.type === 'document' &&
              (previewExt(previewFile.name) === 'md' || previewExt(previewFile.name) === 'txt')
            "
          >
            <div class="fm-preview-text">
              # {{ previewFile.name }} Sample content of {{ previewFile.name }}. Last modified:
              {{ previewFile.modified }}. Size: {{ formatFileSize(previewFile.size) }}.
            </div>
          </template>
          <template v-else-if="previewFile.type === 'code'">
            <div class="fm-preview-code">
              <span style="color: #a40">export function</span>
              {{ previewFile.name.split('.')[0] }}() {{ '{' }} ... return ( {{ '<' }}div{{ '>'
              }}{{ previewFile.name }}{{ '<' }}/div{{ '>' }} ) {{ '}' }}
            </div>
          </template>
          <template v-else>
            <div class="fm-preview-other">
              <div class="fm-preview-other-icon">{{ fileIcons[previewFile.type] }}</div>
              <div class="fm-preview-other-text">
                {{ l.preview.notAvailable(previewFile.type) }}
              </div>
            </div>
          </template>

          <div class="fm-preview-meta">
            <div>
              <strong>{{ l.preview.typeLabel }}</strong> {{ previewFile.type }}
            </div>
            <div>
              <strong>{{ l.preview.sizeLabel }}</strong> {{ formatFileSize(previewFile.size) }}
            </div>
            <div>
              <strong>{{ l.preview.modifiedLabel }}</strong> {{ previewFile.modified }}
            </div>
            <div>
              <strong>{{ l.preview.pathLabel }}</strong> /{{ previewFile.path.join('/') }}/{{
                previewFile.name
              }}
            </div>
          </div>

          <div style="display: flex; gap: 8px">
            <SgTag color="processing">{{ previewFile.type }}</SgTag>
            <SgTag v-if="previewFile.type === 'code'">{{ l.preview.readable }}</SgTag>
            <SgTag v-if="previewFile.size > 1000000" color="warning">{{ l.preview.large }}</SgTag>
          </div>

          <div style="display: flex; gap: 8px; flex-wrap: wrap">
            <SgButton @click="notification.success(l.preview.downloading(previewFile!.name))">
              {{ l.preview.download }}
            </SgButton>
            <SgButton
              @click="
                () => {
                  shareOpen = previewFile
                  previewFile = null
                }
              "
              >{{ l.preview.share }}</SgButton
            >
            <SgButton
              @click="
                () => {
                  renameModal = previewFile
                  renameValue = previewFile!.name
                  previewFile = null
                }
              "
              >{{ l.preview.rename }}</SgButton
            >
            <SgPopconfirm
              :title="l.preview.deleteConfirm(previewFile.name)"
              @confirm="
                () => {
                  notification.success(l.preview.deleteToast)
                  previewFile = null
                }
              "
            >
              <SgButton style="color: var(--sg-color-error, #d4380d)">{{
                l.table.delete
              }}</SgButton>
            </SgPopconfirm>
          </div>
        </div>
      </template>
    </SgDrawer>

    <SgModal :open="!!renameModal" :title="l.rename.title" @close="renameModal = null">
      <template #footer>
        <div style="display: flex; gap: 8px; justify-content: flex-end">
          <SgButton @click="renameModal = null">{{ l.rename.cancel }}</SgButton>
          <SgButton
            type="primary"
            @click="
              () => {
                notification.success(l.rename.toast(renameValue))
                renameModal = null
              }
            "
            >{{ l.rename.submit }}</SgButton
          >
        </div>
      </template>
      <SgInput :value="renameValue" @update:model-value="(v: string) => (renameValue = v)" />
    </SgModal>

    <SgModal
      :open="!!shareOpen"
      :title="l.share.title(shareOpen?.name ?? '')"
      @close="shareOpen = null"
    >
      <template #footer>
        <SgButton type="primary" @click="shareOpen = null">{{ l.share.done }}</SgButton>
      </template>
      <div style="display: flex; flex-direction: column; gap: 12px">
        <div class="fm-share-desc">{{ l.share.description }}</div>
        <div style="display: flex; gap: 8px">
          <SgInput
            :value="`https://files.example.io/${shareOpen?.id ?? ''}`"
            read-only
            :style="{ flex: '1' }"
          />
          <SgButton @click="copyShareLink">{{ l.share.copy }}</SgButton>
        </div>
        <div>
          <div class="fm-share-label">{{ l.share.permissionLabel }}</div>
          <SgSegmented
            default-value="view"
            :options="[
              { label: l.share.permView, value: 'view' },
              { label: l.share.permComment, value: 'comment' },
              { label: l.share.permEdit, value: 'edit' },
            ]"
          />
        </div>
      </div>
    </SgModal>
  </div>
</template>

<style scoped>
.fm-shell {
  display: flex;
  flex: 1;
}
.fm-tree {
  width: 240px;
  border-right: 1px solid var(--sg-color-border-secondary);
  padding: 16px;
  flex-shrink: 0;
}
.fm-storage {
  padding: 12px;
  margin-top: 12px;
  border-top: 1px solid var(--sg-color-border-secondary);
}
.fm-storage-label {
  font-size: 12px;
  color: var(--sg-color-text-secondary);
  margin-bottom: 6px;
}
.fm-storage-bar {
  height: 6px;
  background: var(--sg-color-border-secondary);
  border-radius: 3px;
  overflow: hidden;
}
.fm-storage-fill {
  width: 71%;
  height: 100%;
  background: var(--sg-color-warning, #faad14);
}
.fm-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 16px 24px;
  min-width: 0;
}
.fm-shortcut-hint {
  font-size: 11px;
  color: var(--sg-color-text-tertiary, var(--sg-color-text-secondary));
}
.fm-file-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 12px;
}
.fm-file-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 14px 8px;
  border: 1px solid var(--sg-color-border-secondary);
  border-radius: 8px;
  cursor: pointer;
  background: var(--sg-color-bg);
  transition: all 0.15s;
}
.fm-file-card:hover {
  border-color: var(--sg-color-primary);
  transform: translateY(-2px);
}
.fm-file-icon {
  font-size: 32px;
}
.fm-file-name {
  font-size: 12px;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
}
.fm-file-size {
  font-size: 11px;
  color: var(--sg-color-text-secondary);
}
.fm-recent-subtitle {
  font-size: 13px;
  color: var(--sg-color-text-secondary);
  margin-bottom: 12px;
}
.fm-preview-image {
  height: 240px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--sg-color-bg-secondary);
  border-radius: 6px;
  font-size: 80px;
}
.fm-preview-text,
.fm-preview-code {
  background: var(--sg-color-bg-secondary);
  border-radius: 6px;
  padding: 16px;
  font-family: monospace;
  font-size: 12px;
  line-height: 1.6;
  max-height: 240px;
  overflow: auto;
  white-space: pre-wrap;
}
.fm-preview-other {
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--sg-color-bg-secondary);
  border-radius: 6px;
  gap: 8px;
}
.fm-preview-other-icon {
  font-size: 80px;
}
.fm-preview-other-text {
  font-size: 12px;
  color: var(--sg-color-text-secondary);
}
.fm-preview-meta {
  font-size: 13px;
  color: var(--sg-color-text-secondary);
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.fm-share-desc {
  font-size: 13px;
  color: var(--sg-color-text-secondary);
}
.fm-share-label {
  font-size: 13px;
  margin-bottom: 8px;
}
</style>
