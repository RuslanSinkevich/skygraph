<script setup lang="ts">
import { ref } from 'vue'
import { SgTag, SgButton, SgModal, SgProgress, SgTransfer, notification } from '@skygraph/vue'
import { roles, allPermissions, type RoleDefinition, type UserRole } from './data'
import { Toolbar, useAppLocale } from '../_shared'
import { roleColors } from './common'

const r = useAppLocale('admin').roles
const editRole = ref<RoleDefinition | null>(null)
const targetPerms = ref<string[]>([])

const transferSource = allPermissions.map((p) => ({
  key: p,
  title: p.replace(/_/g, ' '),
  description: p,
}))

function open(role: RoleDefinition) {
  editRole.value = role
  targetPerms.value = role.permissions
}
</script>

<template>
  <Toolbar hide-search>
    <template #actions>
      <SgButton type="primary" @click="notification.info(r.newRoleToast)">{{ r.newRole }}</SgButton>
    </template>
  </Toolbar>

  <div class="sc-card-grid" style="grid-template-columns: repeat(auto-fill, minmax(280px, 1fr))">
    <div v-for="role of roles" :key="role.key" class="sc-card">
      <div style="display: flex; justify-content: space-between; align-items: center">
        <span style="font-weight: 600; font-size: 16px">{{ role.name }}</span>
        <SgTag :color="roleColors[role.key as UserRole]">{{ role.key }}</SgTag>
      </div>
      <div style="font-size: 13px; color: var(--sg-color-text-secondary)">
        {{ role.description }}
      </div>
      <div class="adm-role-counts">
        <span>{{ r.permissionsLabel(role.permissions.length) }}</span>
        <span>{{ r.usersLabel(role.userCount) }}</span>
      </div>
      <SgProgress
        :percent="Math.round((role.permissions.length / allPermissions.length) * 100)"
        :show-info="false"
      />
      <div style="display: flex; flex-wrap: wrap; gap: 3px">
        <SgTag
          v-for="p of role.permissions.slice(0, 4)"
          :key="p"
          color="default"
          :style="{ fontSize: '10px' }"
          >{{ p.replace(/_/g, ' ') }}</SgTag
        >
        <SgTag v-if="role.permissions.length > 4" color="default" :style="{ fontSize: '10px' }"
          >+{{ role.permissions.length - 4 }}</SgTag
        >
      </div>
      <SgButton size="small" @click="open(role)">{{ r.editPermissions }}</SgButton>
    </div>
  </div>

  <SgModal
    :open="!!editRole"
    :title="r.editPermissionsTitle(editRole?.name ?? '')"
    :width="700"
    @close="editRole = null"
  >
    <template #footer>
      <div style="display: flex; justify-content: flex-end; gap: 8px">
        <SgButton @click="editRole = null">{{ r.cancel }}</SgButton>
        <SgButton
          type="primary"
          @click="
            () => {
              notification.success(r.saveToast(editRole?.name ?? '', targetPerms.length))
              editRole = null
            }
          "
          >{{ r.save }}</SgButton
        >
      </div>
    </template>
    <SgTransfer
      v-if="editRole"
      :data-source="transferSource"
      :target-keys="targetPerms"
      :titles="[r.available, r.granted]"
      show-search
      @change="(keys: string[]) => (targetPerms = keys)"
    />
  </SgModal>
</template>

<style scoped>
.adm-role-counts {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: var(--sg-color-text-secondary);
}
</style>
