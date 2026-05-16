<script setup lang="ts">
/**
 * Vue lacks the React `List.Item` / `List.Item.Meta` compound API —
 * the same row layout (avatar + title + description + actions + extra)
 * is composed inline via the default slot.
 */
import { SgList, SgAvatar, SgButton, SgTag } from '@skygraph/vue'
import { users } from './data'
</script>

<template>
  <SgList bordered :data-source="users">
    <template #default="{ item }">
      <div style="display: flex; align-items: center; gap: 12px; width: 100%">
        <SgAvatar>{{ item.name[0] }}</SgAvatar>
        <div style="flex: 1">
          <div style="font-weight: 600">{{ item.name }}</div>
          <div style="font-size: 12px; color: var(--sg-color-text-secondary)">
            {{ item.role }}
          </div>
        </div>
        <div style="display: flex; gap: 8px; align-items: center">
          <SgButton type="link" size="small">Edit</SgButton>
          <SgButton type="link" size="small">Delete</SgButton>
          <SgTag :color="item.status">{{ item.status }}</SgTag>
        </div>
      </div>
    </template>
  </SgList>
</template>
