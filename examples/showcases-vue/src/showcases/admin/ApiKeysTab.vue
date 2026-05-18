<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  SgTable,
  SgTag,
  SgButton,
  SgModal,
  SgForm,
  SgField,
  SgInput,
  SgSelect,
  SgInputNumber,
  SgPopconfirm,
  notification,
  type TableColumn,
} from '@skygraph/vue'
import { apiKeys as initialKeys, type ApiKey } from './apiKeysData'
import { Toolbar, useFilteredList, statusColor, num, useAppLocale } from '../_shared'

const SCOPE_OPTIONS = [
  'read:users',
  'write:users',
  'read:orders',
  'write:orders',
  'read:analytics',
  'admin:settings',
  'webhooks:write',
  'billing:read',
]

const lc = useAppLocale('admin')
const k = lc.apiKeys

const keys = ref<ApiKey[]>(initialKeys)
const search = ref('')
const createOpen = ref(false)
const createdKey = ref<string | null>(null)

const filtered = useFilteredList(keys, search, ['name', 'ownerName', 'prefix'])
const tableData = computed(() =>
  (filtered.value as ApiKey[]).map((key) => ({
    id: key.id,
    data: key as unknown as Record<string, unknown>,
  })),
)

function statusLabel(s: string): string {
  return (lc.apiKeyStatusLabel as Record<string, string>)[s] ?? s
}

const columns: TableColumn[] = [
  { key: 'name', title: k.columns.name, width: 200, sortable: true },
  { key: 'prefix', title: k.columns.token, width: 140 },
  { key: 'ownerName', title: k.columns.owner, width: 140, sortable: true },
  { key: 'scopes', title: k.columns.scopes, width: 220 },
  { key: 'rateLimit', title: k.columns.rateTitle, width: 100, sortable: true, align: 'right' },
  { key: 'lastUsed', title: k.columns.lastUsed, width: 150 },
  { key: 'expiresAt', title: k.columns.expires, width: 110 },
  { key: 'status', title: k.columns.status, width: 100 },
  { key: 'actions', title: '', width: 130 },
]

function handleCreate(values: Record<string, unknown>) {
  const prefix = `sk_${Math.random().toString(36).slice(2, 6).toUpperCase()}`
  const fullKey = `${prefix}_${Math.random().toString(36).slice(2, 30)}`
  const newKey: ApiKey = {
    id: `key_${Date.now()}`,
    name: String(values.name),
    prefix,
    scopes: (values.scopes as string[]) ?? [],
    ownerId: 'u1',
    ownerName: 'You',
    createdAt: new Date().toISOString().slice(0, 10),
    lastUsed: null,
    expiresAt: new Date(Date.now() + 365 * 86400000).toISOString().slice(0, 10),
    rateLimit: Number(values.rateLimit) || 100,
    status: 'active',
  }
  keys.value = [newKey, ...keys.value]
  createdKey.value = fullKey
  createOpen.value = false
}

function revokeKey(id: string, name: string) {
  keys.value = keys.value.map((key) =>
    key.id === id ? { ...key, status: 'revoked', lastUsed: null } : key,
  )
  notification.error(k.revokedToast(name))
}

function copyKey() {
  if (createdKey.value) {
    navigator.clipboard?.writeText(createdKey.value)
    notification.success(k.copiedToast)
  }
}
</script>

<template>
  <Toolbar v-model:searchValue="search" :search-placeholder="k.searchPlaceholder">
    <template #actions>
      <SgButton type="primary" @click="createOpen = true">{{ k.createBtn }}</SgButton>
    </template>
  </Toolbar>

  <SgTable :columns="columns" :data="tableData" :page-size="10" size="small">
    <template #cell="{ column, row, value }">
      <span v-if="column.key === 'name'" style="font-weight: 500">{{ value }}</span>
      <code v-else-if="column.key === 'prefix'" class="adm-token">{{ value }}…</code>
      <div v-else-if="column.key === 'scopes'" style="display: flex; flex-wrap: wrap; gap: 3px">
        <SgTag v-for="scope of value as string[]" :key="scope" :style="{ fontSize: '10px' }">{{
          scope
        }}</SgTag>
      </div>
      <template v-else-if="column.key === 'rateLimit'">{{
        k.columns.rate(num(Number(value)))
      }}</template>
      <template v-else-if="column.key === 'lastUsed'">{{ value ?? '—' }}</template>
      <SgTag v-else-if="column.key === 'status'" :color="statusColor(String(value))">{{
        statusLabel(String(value))
      }}</SgTag>
      <div v-else-if="column.key === 'actions'" style="display: flex; gap: 4px">
        <SgButton size="small" @click="notification.info(k.rotateToast(String(row.name)))">{{
          k.rotate
        }}</SgButton>
        <SgPopconfirm
          :title="k.revokeConfirm"
          @confirm="revokeKey(String(row.id), String(row.name))"
        >
          <SgButton size="small" danger>{{ k.revoke }}</SgButton>
        </SgPopconfirm>
      </div>
      <template v-else>{{ value }}</template>
    </template>
  </SgTable>

  <SgModal
    :open="createOpen"
    :title="k.createTitle"
    footer="none"
    :width="520"
    @close="createOpen = false"
  >
    <SgForm @finish="handleCreate">
      <SgField name="name" :label="k.keyName" :rules="[{ required: true }]">
        <template #default="{ value, onChange }">
          <SgInput
            :value="(value as string) ?? ''"
            :placeholder="k.keyNamePh"
            @update:model-value="onChange"
          />
        </template>
      </SgField>
      <SgField name="scopes" :label="k.scopesLabel" :rules="[{ required: true }]">
        <template #default="{ value, onChange }">
          <SgSelect
            multiple
            :value="(value as (string | number)[]) ?? []"
            :options="SCOPE_OPTIONS.map((s) => ({ label: s, value: s }))"
            :placeholder="k.scopesPh"
            @update:model-value="onChange"
          />
        </template>
      </SgField>
      <SgField name="rateLimit" :label="k.rateLabel">
        <template #default="{ value, onChange }">
          <SgInputNumber
            :value="value as number"
            :min="1"
            :max="10000"
            :placeholder="k.ratePh"
            :style="{ width: '100%' }"
            @update:model-value="onChange"
          />
        </template>
      </SgField>
      <div style="display: flex; justify-content: flex-end; gap: 8px; margin-top: 12px">
        <SgButton @click="createOpen = false">{{ k.cancel }}</SgButton>
        <SgButton type="primary" html-type="submit">{{ k.generate }}</SgButton>
      </div>
    </SgForm>
  </SgModal>

  <SgModal :open="!!createdKey" :title="k.createdTitle" :width="560" @close="createdKey = null">
    <template #footer>
      <SgButton type="primary" @click="createdKey = null">{{ k.confirmedBtn }}</SgButton>
    </template>
    <p style="color: var(--sg-color-warning); font-size: 13px">⚠️ {{ k.createdWarning }}</p>
    <code class="adm-created-key">{{ createdKey }}</code>
    <SgButton @click="copyKey">{{ k.copy }}</SgButton>
  </SgModal>
</template>

<style scoped>
.adm-token {
  font-size: 12px;
  background: var(--sg-color-bg-secondary);
  padding: 2px 6px;
  border-radius: 3px;
}
.adm-created-key {
  display: block;
  padding: 12px;
  background: var(--sg-color-bg-secondary);
  border-radius: 6px;
  font-family: monospace;
  font-size: 13px;
  word-break: break-all;
  margin: 12px 0;
}
</style>
