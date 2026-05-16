<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  SgInput,
  SgTag,
  SgButton,
  SgBadge,
  SgEmpty,
  SgNotificationContainer,
  notification,
} from '@skygraph/vue'
import { threads as seedThreads, type EmailThread, type InboxFolder } from './data'
import { initials, useAppLocale } from '../_shared'

const l = useAppLocale('inbox')
const threads = ref<EmailThread[]>([...seedThreads])
const folder = ref<InboxFolder>('inbox')
const search = ref('')
const selectedId = ref<string | null>(null)

const counts = computed(() => {
  const out: Record<InboxFolder, number> = {
    inbox: 0,
    starred: 0,
    sent: 0,
    drafts: 0,
    archive: 0,
    spam: 0,
    trash: 0,
  }
  for (const t of threads.value) {
    if (t.starred) out.starred++
    out[t.folder]++
  }
  return out
})

const folders: InboxFolder[] = ['inbox', 'starred', 'sent', 'drafts', 'archive', 'spam', 'trash']

const filtered = computed(() => {
  const base = threads.value.filter((t) =>
    folder.value === 'starred' ? t.starred : t.folder === folder.value,
  )
  if (!search.value.trim()) return base
  const q = search.value.toLowerCase()
  return base.filter(
    (t) => t.subject.toLowerCase().includes(q) || t.preview.toLowerCase().includes(q),
  )
})

const selected = computed(() => threads.value.find((t) => t.id === selectedId.value) ?? null)

function openThread(id: string) {
  selectedId.value = id
  threads.value = threads.value.map((t) => (t.id === id ? { ...t, read: true } : t))
}

function toggleStar(id: string) {
  threads.value = threads.value.map((t) => (t.id === id ? { ...t, starred: !t.starred } : t))
}

function moveSelected(target: InboxFolder, label: string) {
  if (!selected.value) return
  threads.value = threads.value.map((t) =>
    t.id === selected.value!.id ? { ...t, folder: target } : t,
  )
  notification.info(l.movedToast(1, label))
  selectedId.value = null
}

function senderName(t: EmailThread): string {
  return t.participants[0]?.name ?? '—'
}
</script>

<template>
  <div class="inbox-shell">
    <SgNotificationContainer />
    <aside class="inbox-sidebar">
      <SgButton type="primary" block @click="notification.info(l.composeButton)">
        {{ l.composeButton }}
      </SgButton>
      <h4 class="inbox-folders-title">{{ l.labelsHeading }}</h4>
      <div class="inbox-folders">
        <button
          v-for="f of folders"
          :key="f"
          :class="['inbox-folder', folder === f ? 'inbox-folder--active' : '']"
          @click="folder = f"
        >
          <span>{{ l.folders[f] }}</span>
          <SgBadge v-if="counts[f]" :count="counts[f]" />
        </button>
      </div>
    </aside>

    <main class="inbox-main">
      <div class="inbox-toolbar">
        <SgInput
          :value="search"
          :placeholder="l.searchPlaceholder"
          size="small"
          style="flex: 1"
          @update:value="search = $event"
        />
        <span style="color: var(--sg-color-text-secondary); font-size: 12px">
          {{ l.countInFolder(filtered.length, l.folders[folder]) }}
        </span>
      </div>

      <div class="inbox-list">
        <SgEmpty v-if="filtered.length === 0" :description="l.noMessages" />
        <template v-else>
          <div
            v-for="t of filtered"
            :key="t.id"
            :class="[
              'inbox-row',
              selectedId === t.id ? 'inbox-row--active' : '',
              !t.read ? 'inbox-row--unread' : '',
            ]"
            @click="openThread(t.id)"
          >
            <button
              type="button"
              class="inbox-star"
              :title="t.starred ? l.unstar : l.star"
              @click.stop="toggleStar(t.id)"
            >
              {{ t.starred ? '★' : '☆' }}
            </button>
            <div class="inbox-avatar">{{ initials(senderName(t)) }}</div>
            <div style="flex: 1; min-width: 0">
              <div style="display: flex; justify-content: space-between; gap: 8px">
                <span style="font-weight: 500">{{ senderName(t) }}</span>
                <span style="font-size: 11px; color: var(--sg-color-text-secondary)">
                  {{ t.receivedAt.slice(0, 10) }}
                </span>
              </div>
              <div style="font-size: 13px; margin-top: 2px">
                <strong>{{ t.subject }}</strong>
                <span style="color: var(--sg-color-text-secondary)">— {{ t.preview }}</span>
              </div>
              <div style="display: flex; gap: 4px; margin-top: 4px">
                <SgTag v-if="t.important" color="error">{{ l.important }}</SgTag>
                <SgTag v-for="lab of t.labels" :key="lab" color="default">{{ lab }}</SgTag>
              </div>
            </div>
          </div>
        </template>
      </div>
    </main>

    <aside v-if="selected" class="inbox-preview">
      <div
        style="
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        "
      >
        <h3 style="margin: 0; font-size: 16px">{{ selected.subject }}</h3>
        <SgButton size="small" @click="selectedId = null">×</SgButton>
      </div>
      <div style="display: flex; gap: 6px; margin-bottom: 12px">
        <SgButton size="small" @click="moveSelected('archive', l.archive)">
          {{ l.archiveTooltip }}
        </SgButton>
        <SgButton size="small" @click="moveSelected('spam', l.spam)">
          {{ l.spamTooltip }}
        </SgButton>
        <SgButton size="small" @click="moveSelected('trash', l.delete)">
          {{ l.trashTooltip }}
        </SgButton>
      </div>
      <p>{{ selected.preview }}</p>
      <p style="font-size: 12px; color: var(--sg-color-text-secondary)">
        {{ l.messageTo(selected.participants.map((p) => p.email).join(', ')) }}
      </p>
    </aside>
  </div>
</template>

<style scoped>
.inbox-shell {
  flex: 1;
  display: grid;
  grid-template-columns: 220px 1fr 360px;
  gap: 16px;
  padding: 16px;
}
.inbox-sidebar {
  border-right: 1px solid var(--sg-color-border-secondary);
  padding-right: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.inbox-folders-title {
  font-size: 11px;
  text-transform: uppercase;
  color: var(--sg-color-text-secondary);
  margin: 12px 0 6px;
}
.inbox-folders {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.inbox-folder {
  all: unset;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 10px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
}
.inbox-folder:hover {
  background: var(--sg-color-bg-hover);
}
.inbox-folder--active {
  background: var(
    --sg-color-primary-bg,
    color-mix(in srgb, var(--sg-color-primary) 10%, transparent)
  );
  color: var(--sg-color-primary);
  font-weight: 500;
}
.inbox-main {
  display: flex;
  flex-direction: column;
  min-width: 0;
}
.inbox-toolbar {
  display: flex;
  align-items: center;
  gap: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--sg-color-border-secondary);
}
.inbox-list {
  flex: 1;
  overflow-y: auto;
  padding-top: 8px;
}
.inbox-row {
  display: flex;
  gap: 10px;
  align-items: center;
  padding: 10px 12px;
  border-bottom: 1px solid var(--sg-color-border-secondary);
  cursor: pointer;
}
.inbox-row:hover {
  background: var(--sg-color-bg-hover);
}
.inbox-row--active {
  background: var(
    --sg-color-primary-bg,
    color-mix(in srgb, var(--sg-color-primary) 10%, transparent)
  );
}
.inbox-row--unread {
  font-weight: 600;
}
.inbox-star {
  all: unset;
  cursor: pointer;
  font-size: 16px;
  color: var(--sg-color-warning, #faad14);
}
.inbox-avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--sg-color-bg-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
}
.inbox-preview {
  border-left: 1px solid var(--sg-color-border-secondary);
  padding-left: 16px;
}

@media (max-width: 1100px) {
  .inbox-shell {
    grid-template-columns: 200px 1fr;
  }
  .inbox-preview {
    grid-column: 1 / -1;
    border-left: none;
    border-top: 1px solid var(--sg-color-border-secondary);
    padding-left: 0;
    padding-top: 12px;
  }
}
</style>
