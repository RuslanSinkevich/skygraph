<script setup lang="ts">
import { computed, ref } from 'vue'
import { SgTable, SgTag, SgButton, SgDropdown, notification, type TableColumn } from '@skygraph/vue'
import { contacts as allContacts } from './data'
import type { Contact } from './data'
import { Toolbar, UserCell, money, statusColor, useAppLocale } from '../_shared'

const lc = useAppLocale('crm')
const c = lc.contacts
const search = ref('')
const drawerContact = ref<Contact | null>(null)

const filtered = computed(() => {
  if (!search.value.trim()) return allContacts
  const q = search.value.toLowerCase()
  return allContacts.filter(
    (ct) =>
      ct.name.toLowerCase().includes(q) ||
      ct.company.toLowerCase().includes(q) ||
      ct.email.toLowerCase().includes(q),
  )
})

const tableData = computed(() =>
  filtered.value.map((ct) => ({ id: ct.id, data: ct as unknown as Record<string, unknown> })),
)

const columns: TableColumn[] = [
  { key: 'name', title: c.columns.contact, width: 240, sortable: true, fixed: 'left' },
  { key: 'company', title: c.columns.company, width: 130, sortable: true },
  { key: 'phone', title: c.columns.phone, width: 150 },
  {
    key: 'status',
    title: c.columns.status,
    width: 110,
    filters: ['lead', 'customer', 'churned', 'prospect'].map((v) => ({
      text: lc.statusLabel[v] ?? v,
      value: v,
    })),
    onFilter: (value, row) => row.status === value,
  },
  { key: 'revenue', title: c.columns.revenue, width: 130, sortable: true, align: 'right' },
  { key: 'lastContact', title: c.columns.lastContact, width: 120, sortable: true },
  { key: 'actions', title: '', width: 120 },
]

function openDetails(rowId: string) {
  const ct = allContacts.find((x) => x.id === rowId)
  if (ct) drawerContact.value = ct
}

function handleRowAction(key: string | number, rowId: string) {
  const k = String(key)
  if (k === 'edit') {
    const ct = allContacts.find((x) => x.id === rowId)
    if (ct) drawerContact.value = ct
  } else {
    notification.info(`${k}: ${rowId}`)
  }
}
</script>

<template>
  <Toolbar v-model:searchValue="search" :search-placeholder="c.searchPlaceholder">
    <template #actions>
      <SgButton type="primary" @click="notification.info(c.addContact)">
        {{ c.addContact }}
      </SgButton>
    </template>
  </Toolbar>

  <SgTable :columns="columns" :data="tableData" :page-size="10" size="small" bordered sticky>
    <template #cell="{ column, row, id, value }">
      <template v-if="column.key === 'name'">
        <UserCell
          :name="String(row.name)"
          :email="String(row.email)"
          :avatar="String(row.avatar)"
        />
      </template>
      <SgTag v-else-if="column.key === 'status'" :color="statusColor(String(value))">{{
        lc.statusLabel[String(value)] ?? String(value)
      }}</SgTag>
      <span
        v-else-if="column.key === 'revenue'"
        :style="{ fontWeight: Number(value) > 100000 ? 600 : 400 }"
        >{{ money(Number(value)) }}</span
      >
      <div v-else-if="column.key === 'actions'" style="display: flex; gap: 4px">
        <SgButton size="small" @click="openDetails(String(id))">{{ lc.leads.viewBtn }}</SgButton>
        <SgDropdown
          :items="[
            { key: 'edit', label: c.rowActions.edit },
            { key: 'email', label: c.rowActions.sendEmail },
            { key: 'deal', label: c.rowActions.createDeal },
            { key: 'delete', label: c.rowActions.delete, danger: true },
          ]"
          @select="(k: string | number) => handleRowAction(k, String(id))"
        >
          <SgButton size="small">⋯</SgButton>
        </SgDropdown>
      </div>
      <template v-else>{{ value }}</template>
    </template>
  </SgTable>
</template>
