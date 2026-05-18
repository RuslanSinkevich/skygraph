<script setup lang="ts">
import { computed, ref } from 'vue'
import { SgCollapse, SgSwitch, SgInput, SgInputNumber, SgSelect, notification } from '@skygraph/vue'
import { systemSettings, type SystemSetting } from './data'
import { useAppLocale } from '../_shared'

const lt = useAppLocale('admin').settings
const settings = ref<SystemSetting[]>(systemSettings)

const categories = computed(() => [...new Set(settings.value.map((s) => s.category))])

const items = computed(() =>
  categories.value.map((cat) => ({
    key: cat,
    label: cat,
    content: '',
  })),
)

function update(key: string, value: string | boolean | number) {
  settings.value = settings.value.map((s) => (s.key === key ? { ...s, value } : s))
  notification.success(lt.updateToast(key))
}

function settingsFor(cat: string): SystemSetting[] {
  return settings.value.filter((s) => s.category === cat)
}
</script>

<template>
  <SgCollapse :items="items" :default-active-key="categories.length ? [categories[0]] : []">
    <template #panel="{ item }">
      <div style="display: flex; flex-direction: column; gap: 16px">
        <div v-for="s of settingsFor(item.key)" :key="s.key" class="adm-setting-row">
          <div style="flex: 1">
            <div style="font-weight: 500; font-size: 13px">{{ s.label }}</div>
            <div style="font-size: 12px; color: var(--sg-color-text-secondary)">
              {{ s.description }}
            </div>
          </div>
          <div style="width: 220px; flex-shrink: 0">
            <SgSwitch
              v-if="s.type === 'toggle'"
              :model-value="s.value as boolean"
              @update:model-value="(v: boolean) => update(s.key, v)"
            />
            <SgInput
              v-else-if="s.type === 'text'"
              :value="s.value as string"
              size="small"
              @update:model-value="(v: string) => update(s.key, v)"
            />
            <SgInputNumber
              v-else-if="s.type === 'number'"
              :value="s.value as number"
              size="small"
              :style="{ width: '100%' }"
              @update:model-value="(v: number | null) => update(s.key, v ?? 0)"
            />
            <SgSelect
              v-else-if="s.type === 'select'"
              :value="s.value as string"
              :options="(s.options ?? []).map((o) => ({ label: o, value: o }))"
              size="small"
              :style="{ width: '100%' }"
              @update:model-value="(v) => update(s.key, String(v))"
            />
          </div>
        </div>
      </div>
    </template>
    <template #default>
      <span style="font-weight: 600; text-transform: capitalize"></span>
    </template>
  </SgCollapse>
</template>

<style scoped>
.adm-setting-row {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 8px 0;
  border-bottom: 1px solid var(--sg-color-border-secondary);
}
</style>
