<script setup lang="ts">
/**
 * Menu leans on the global palette — the selected item follows
 * `--sg-color-primary` / `--sg-color-primary-bg`, hover follows
 * `--sg-color-bg-hover`. Three scoped recipes — branded green, dark field,
 * glass pick — reskin one menu.
 *
 * Mirrors React `examples/demo/src/demos/menu/TokensOverride.demo.tsx`.
 */
import { SgMenu } from '@skygraph/vue'
import { sidebarItems } from './data'
import TokenScopeCards from '../_shared/TokenScopeCards.vue'
</script>

<template>
  <TokenScopeCards>
    <template #default>
      <SgMenu
        mode="inline"
        :items="sidebarItems"
        :default-open-keys="['team']"
        :default-selected-keys="['members']"
      />
    </template>
  </TokenScopeCards>
</template>
