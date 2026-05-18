<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  SgTable,
  SgTag,
  SgButton,
  SgAvatar,
  SgModal,
  SgDrawer,
  SgDescriptions,
  SgPopconfirm,
  SgDropdown,
  notification,
  type TableColumn,
} from '@skygraph/vue'
import {
  systemUsers,
  userToRow,
  auditLog,
  roles,
  type SystemUser,
  type UserRole,
  type UserStatus,
} from './data'
import { Toolbar, useFilteredList, num, useAppLocale } from '../_shared'
import { roleColors, statusColors } from './common'
import UserForm from './UserForm.vue'

const lc = useAppLocale('admin')
const u = lc.users

const search = ref('')
const selected = ref<string[]>([])
const drawerUser = ref<SystemUser | null>(null)
const createOpen = ref(false)
const editUser = ref<SystemUser | null>(null)

const usersRef = ref<SystemUser[]>(systemUsers)
const filtered = useFilteredList(usersRef, search, ['name', 'email', 'department'])
const tableData = computed(() => (filtered.value as SystemUser[]).map(userToRow))

function roleLabel(s: string): string {
  return (lc.roleLabel as Record<string, string>)[s] ?? s
}

function statusLabel(s: string): string {
  return (lc.statusLabel as Record<string, string>)[s] ?? s
}

const columns: TableColumn[] = [
  { key: 'name', title: u.columns.user, width: 240, sortable: true, fixed: 'left' },
  {
    key: 'role',
    title: u.columns.role,
    width: 110,
    sortable: true,
    filters: (['admin', 'editor', 'viewer', 'moderator', 'support'] as UserRole[]).map((r) => ({
      text: roleLabel(r),
      value: r,
    })),
    onFilter: (value, row) => row.role === value,
  },
  {
    key: 'status',
    title: u.columns.status,
    width: 110,
    filters: (['active', 'suspended', 'pending', 'deactivated'] as UserStatus[]).map((s) => ({
      text: statusLabel(s),
      value: s,
    })),
    onFilter: (value, row) => row.status === value,
  },
  { key: 'department', title: u.columns.department, width: 120, sortable: true },
  { key: 'twoFactor', title: u.columns.twoFa, width: 60, align: 'center' },
  { key: 'lastLogin', title: u.columns.lastLogin, width: 150, sortable: true },
  { key: 'loginCount', title: u.columns.logins, width: 90, sortable: true, align: 'center' },
  { key: 'actions', title: '', width: 100 },
]

function findUser(id: string): SystemUser | undefined {
  return systemUsers.find((x) => x.id === id)
}

function handleRowMenu(key: string | number, rowId: string) {
  const usr = findUser(rowId)
  if (!usr) return
  const k = String(key)
  if (k === 'edit') {
    editUser.value = usr
  } else {
    notification.info(`${k}: ${usr.name}`)
  }
}

function rowMenuItems(status: string) {
  return [
    { key: 'edit', label: u.rowMenu.edit },
    { key: 'reset', label: u.rowMenu.reset },
    {
      key: 'suspend',
      label: status === 'suspended' ? u.rowMenu.activate : u.rowMenu.suspend,
      danger: status !== 'suspended',
    },
    { key: 'delete', label: u.rowMenu.delete, danger: true },
  ]
}

function onCreated(values: Partial<SystemUser>) {
  notification.success(u.createToast, JSON.stringify(values, null, 2))
  createOpen.value = false
}

function onEdited(values: Partial<SystemUser>) {
  notification.success(u.editToast, JSON.stringify(values, null, 2))
  editUser.value = null
}
</script>

<template>
  <Toolbar v-model:searchValue="search" :search-placeholder="u.searchPlaceholder">
    <template #actions>
      <template v-if="selected.length > 0">
        <SgTag>{{ u.selectedTag(selected.length) }}</SgTag>
        <SgPopconfirm
          :title="u.bulkSuspendConfirm(selected.length)"
          @confirm="
            () => {
              notification.success(u.bulkSuspendToast(selected.length))
              selected = []
            }
          "
        >
          <SgButton size="small">{{ u.bulkSuspend }}</SgButton>
        </SgPopconfirm>
      </template>
      <SgButton type="primary" @click="createOpen = true">{{ u.createBtn }}</SgButton>
    </template>
  </Toolbar>

  <SgTable
    :columns="columns"
    :data="tableData"
    :page-size="10"
    size="small"
    bordered
    sticky
    :row-selection="{
      selectedKeys: selected,
      onChange: (keys: (string | number)[]) => (selected = keys as string[]),
    }"
  >
    <template #cell="{ column, row, id, value }">
      <template v-if="column.key === 'name'">
        <div style="display: flex; align-items: center; gap: 8px">
          <SgAvatar size="small">{{ row.avatar }}</SgAvatar>
          <div>
            <div style="font-weight: 500">{{ row.name }}</div>
            <div style="font-size: 12px; color: var(--sg-color-text-secondary)">
              {{ row.email }}
            </div>
          </div>
        </div>
      </template>
      <SgTag v-else-if="column.key === 'role'" :color="roleColors[String(value) as UserRole]">
        {{ roleLabel(String(value)) }}
      </SgTag>
      <SgTag v-else-if="column.key === 'status'" :color="statusColors[String(value) as UserStatus]">
        {{ statusLabel(String(value)) }}
      </SgTag>
      <template v-else-if="column.key === 'twoFactor'">
        <span v-if="value" style="color: var(--sg-color-success)">✓</span>
        <span v-else style="color: var(--sg-color-text-secondary)">—</span>
      </template>
      <template v-else-if="column.key === 'loginCount'">{{ num(Number(value)) }}</template>
      <div v-else-if="column.key === 'actions'" style="display: flex; gap: 4px">
        <SgButton
          size="small"
          @click="
            () => {
              const usr = findUser(String(id))
              if (usr) drawerUser = usr
            }
          "
          >{{ u.viewBtn }}</SgButton
        >
        <SgDropdown
          :items="rowMenuItems(String(row.status))"
          @select="(k: string | number) => handleRowMenu(k, String(id))"
        >
          <SgButton size="small">⋯</SgButton>
        </SgDropdown>
      </div>
      <template v-else>{{ value }}</template>
    </template>
  </SgTable>

  <SgDrawer
    :open="!!drawerUser"
    :title="drawerUser?.name ?? ''"
    :width="500"
    @close="drawerUser = null"
  >
    <template v-if="drawerUser">
      <div style="display: flex; flex-direction: column; gap: 20px">
        <div style="display: flex; align-items: center; gap: 12px">
          <SgAvatar size="large">{{ drawerUser.avatar }}</SgAvatar>
          <div>
            <div style="font-weight: 600; font-size: 16px">{{ drawerUser.name }}</div>
            <div style="display: flex; gap: 6px; margin-top: 4px">
              <SgTag :color="roleColors[drawerUser.role]">{{ roleLabel(drawerUser.role) }}</SgTag>
              <SgTag :color="statusColors[drawerUser.status]">{{
                statusLabel(drawerUser.status)
              }}</SgTag>
            </div>
          </div>
        </div>
        <SgDescriptions
          :items="[
            { label: u.drawer.email, value: drawerUser.email },
            { label: u.drawer.department, value: drawerUser.department },
            { label: u.drawer.lastLogin, value: drawerUser.lastLogin },
            { label: u.drawer.created, value: drawerUser.createdAt },
            { label: u.drawer.loginCount, value: String(drawerUser.loginCount) },
            {
              label: u.drawer.twoFaEnabled,
              value: drawerUser.twoFactor ? u.drawer.yes : u.drawer.no,
            },
          ]"
          :column="1"
          size="small"
        />
        <h4>
          {{
            u.drawer.permissionsHeading(
              roles.find((r) => r.key === drawerUser!.role)?.permissions.length ?? 0,
            )
          }}
        </h4>
        <div style="display: flex; flex-wrap: wrap; gap: 4px">
          <SgTag
            v-for="p of roles.find((r) => r.key === drawerUser!.role)?.permissions ?? []"
            :key="p"
            color="default"
            :style="{ fontSize: '11px' }"
            >{{ p }}</SgTag
          >
        </div>
        <h4>{{ u.drawer.activityHeading }}</h4>
        <div
          v-for="lg of auditLog.filter((l) => l.userId === drawerUser!.id).slice(0, 5)"
          :key="lg.id"
          class="adm-act-row"
        >
          <span>{{ lg.action }}</span>
          <span style="color: var(--sg-color-text-secondary)">{{ lg.timestamp }}</span>
        </div>
        <div style="display: flex; gap: 8px; margin-top: 8px">
          <SgButton
            type="primary"
            @click="
              () => {
                editUser = drawerUser
                drawerUser = null
              }
            "
            >{{ u.drawer.edit }}</SgButton
          >
          <SgButton @click="notification.info(u.drawer.resetSentToast)">
            {{ u.drawer.resetPassword }}
          </SgButton>
          <SgPopconfirm
            :title="u.drawer.suspendConfirm"
            @confirm="
              () => {
                notification.warning(u.drawer.suspendedToast(drawerUser!.name))
                drawerUser = null
              }
            "
          >
            <SgButton>{{ u.drawer.suspend }}</SgButton>
          </SgPopconfirm>
        </div>
      </div>
    </template>
  </SgDrawer>

  <SgModal
    :open="createOpen"
    :title="u.createTitle"
    footer="none"
    :width="520"
    @close="createOpen = false"
  >
    <UserForm :submit-label="u.submitCreate" @submit="onCreated" @cancel="createOpen = false" />
  </SgModal>

  <SgModal
    :open="!!editUser"
    :title="u.editTitle(editUser?.name ?? '')"
    footer="none"
    :width="520"
    @close="editUser = null"
  >
    <UserForm
      v-if="editUser"
      :initial-values="editUser"
      show-status
      :submit-label="u.submitSave"
      @submit="onEdited"
      @cancel="editUser = null"
    />
  </SgModal>
</template>

<style scoped>
.adm-act-row {
  display: flex;
  justify-content: space-between;
  padding: 4px 0;
  border-bottom: 1px solid var(--sg-color-border-secondary);
  font-size: 13px;
}
</style>
