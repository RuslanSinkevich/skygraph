<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  SgTable,
  SgTag,
  SgButton,
  SgModal,
  SgDropdown,
  SgSegmented,
  SgProgress,
  notification,
  type TableColumn,
} from '@skygraph/vue'
import { contacts as initialContacts, activities, deals } from './data'
import type { Contact, ContactStatus } from './data'
import { Toolbar, UserCell, money, statusColor, shortDate, useAppLocale } from '../_shared'

type LeadFilter = 'all' | 'lead' | 'prospect'

const lc = useAppLocale('crm')
const ld = lc.leads
const search = ref('')
const filter = ref<LeadFilter>('all')
const drawerContact = ref<Contact | null>(null)
const editContact = ref<Contact | null>(null)
const convertContact = ref<Contact | null>(null)

const leads = computed(() =>
  initialContacts.filter((c) => c.status === 'lead' || c.status === 'prospect'),
)
const visible = computed(() =>
  leads.value.filter((c) => filter.value === 'all' || c.status === (filter.value as ContactStatus)),
)
const filtered = computed(() => {
  if (!search.value.trim()) return visible.value
  const q = search.value.toLowerCase()
  return visible.value.filter(
    (c) =>
      c.name.toLowerCase().includes(q) ||
      c.company.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q),
  )
})

const tableData = computed(() =>
  filtered.value.map((c) => ({ id: c.id, data: c as unknown as Record<string, unknown> })),
)

const columns: TableColumn[] = [
  { key: 'name', title: ld.columns.lead, width: 240, sortable: true },
  { key: 'company', title: ld.columns.company, width: 140, sortable: true },
  { key: 'status', title: ld.columns.stage, width: 110 },
  { key: 'revenue', title: ld.columns.potential, width: 120, sortable: true, align: 'right' },
  { key: 'lastContact', title: ld.columns.lastContact, width: 120, sortable: true },
  { key: 'actions', title: '', width: 150 },
]

const conversionRate = computed(() => {
  const total = leads.value.length
  if (!total) return 0
  return Math.round((leads.value.filter((c) => c.status === 'prospect').length / total) * 100)
})

const newLeadCount = computed(() => leads.value.filter((c) => c.status === 'lead').length)
const qualifiedCount = computed(() => leads.value.filter((c) => c.status === 'prospect').length)

const segmentedOptions = computed(() => [
  { label: ld.filterAll(leads.value.length), value: 'all' },
  { label: ld.filterLeads, value: 'lead' },
  { label: ld.filterProspects, value: 'prospect' },
])

function openDrawer(rowId: string) {
  const c = initialContacts.find((x) => x.id === rowId)
  if (c) drawerContact.value = c
}

function handleRowAction(key: string | number, rowId: string) {
  const c = initialContacts.find((x) => x.id === rowId)
  if (!c) return
  const k = String(key)
  if (k === 'edit') editContact.value = c
  else if (k === 'convert') convertContact.value = c
  else notification.info(`${k}: ${c.name}`)
}

function openAddLead() {
  editContact.value = {
    id: `new-${Date.now()}`,
    name: '',
    email: '',
    company: '',
    phone: '',
    status: 'lead',
    revenue: 0,
    lastContact: shortDate(new Date()),
    avatar: '?',
  }
}

function saveContact() {
  if (!editContact.value) return
  notification.success(ld.savedToast, editContact.value.name)
  editContact.value = null
}

function confirmConvert() {
  if (!convertContact.value) return
  notification.success(ld.convertedToast(convertContact.value.name))
  convertContact.value = null
}

const drawerActivities = computed(() =>
  drawerContact.value ? activities.filter((a) => a.contactId === drawerContact.value!.id) : [],
)
const drawerDeals = computed(() =>
  drawerContact.value ? deals.filter((d) => d.contactId === drawerContact.value!.id) : [],
)
</script>

<template>
  <div class="lead-stats">
    <div class="lead-card">
      <div class="lead-card-label">{{ ld.cards.total }}</div>
      <div class="lead-card-value">{{ leads.length }}</div>
    </div>
    <div class="lead-card">
      <div class="lead-card-label">{{ ld.cards.newLeads }}</div>
      <div class="lead-card-value">{{ newLeadCount }}</div>
    </div>
    <div class="lead-card">
      <div class="lead-card-label">{{ ld.cards.qualified }}</div>
      <div class="lead-card-value">{{ qualifiedCount }}</div>
    </div>
    <div class="lead-card">
      <div class="lead-card-label">{{ ld.cards.conversion }}</div>
      <SgProgress :percent="conversionRate" size="small" />
    </div>
  </div>

  <Toolbar v-model:searchValue="search" :search-placeholder="ld.searchPlaceholder">
    <template #filters>
      <SgSegmented
        :value="filter"
        :options="segmentedOptions"
        @change="(v: string | number) => (filter = String(v) as LeadFilter)"
      />
    </template>
    <template #actions>
      <SgButton type="primary" @click="openAddLead">{{ ld.addLead }}</SgButton>
    </template>
  </Toolbar>

  <SgTable :columns="columns" :data="tableData" :page-size="10" size="small" striped>
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
      <template v-else-if="column.key === 'revenue'">{{ money(Number(value)) }}</template>
      <template v-else-if="column.key === 'lastContact'">{{ shortDate(String(value)) }}</template>
      <div v-else-if="column.key === 'actions'" style="display: flex; gap: 4px">
        <SgButton size="small" @click="openDrawer(String(id))">{{ ld.viewBtn }}</SgButton>
        <SgDropdown
          :items="[
            { key: 'edit', label: ld.rowActions.edit },
            { key: 'convert', label: ld.rowActions.convert },
            { key: 'email', label: ld.rowActions.sendEmail },
          ]"
          @select="(k: string | number) => handleRowAction(k, String(id))"
        >
          <SgButton size="small">⋯</SgButton>
        </SgDropdown>
      </div>
      <template v-else>{{ value }}</template>
    </template>
  </SgTable>

  <!-- View drawer (simplified — uses Modal as a quick details viewer). -->
  <SgModal
    :open="!!drawerContact"
    :title="drawerContact?.name ?? ''"
    footer="none"
    :width="520"
    @close="drawerContact = null"
  >
    <template v-if="drawerContact">
      <p>{{ drawerContact.email }} · {{ drawerContact.company }}</p>
      <p style="color: var(--sg-color-text-secondary); font-size: 12px">
        {{ ld.viewBtn }} · {{ drawerActivities.length }} activities · {{ drawerDeals.length }} deals
      </p>
    </template>
  </SgModal>

  <SgModal
    :open="!!editContact"
    :title="editContact?.name ? ld.editTitle(editContact.name) : ld.addLeadTitle"
    :ok-text="ld.savedToast"
    :width="520"
    @close="editContact = null"
    @ok="saveContact"
  >
    <template v-if="editContact">
      <div style="display: flex; flex-direction: column; gap: 12px">
        <label>
          {{ ld.columns.lead }}
          <input v-model="editContact.name" class="lead-input" type="text" />
        </label>
        <label>
          {{ ld.columns.company }}
          <input v-model="editContact.company" class="lead-input" type="text" />
        </label>
      </div>
    </template>
  </SgModal>

  <SgModal
    :open="!!convertContact"
    :title="ld.convertTitle(convertContact?.name ?? '')"
    :ok-text="ld.convertOk"
    :width="420"
    @close="convertContact = null"
    @ok="confirmConvert"
  >
    <p>{{ ld.convertText }}</p>
  </SgModal>
</template>

<style scoped>
.lead-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 12px;
  margin-bottom: 16px;
}
.lead-card {
  border: 1px solid var(--sg-color-border-secondary);
  border-radius: var(--sg-border-radius);
  padding: 12px 14px;
  background: var(--sg-color-bg-container);
}
.lead-card-label {
  font-size: 12px;
  color: var(--sg-color-text-secondary);
  margin-bottom: 4px;
}
.lead-card-value {
  font-size: 22px;
  font-weight: 600;
}
.lead-input {
  display: block;
  width: 100%;
  padding: 6px 10px;
  border-radius: 6px;
  border: 1px solid var(--sg-color-border);
  background: var(--sg-color-bg);
  color: var(--sg-color-text);
}
</style>
