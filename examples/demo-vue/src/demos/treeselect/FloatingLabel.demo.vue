<script setup lang="ts">
/**
 * Floating label over the TreeSelect control. The label floats on
 * `:focus-within` (open) and a JS-driven `fl-filled` class once a node
 * is selected — no core changes.
 */
import { ref, computed } from 'vue'
import { SgTreeSelect } from '@skygraph/vue'
import { orgTree } from './data'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: { team: 'Team', owner: 'Owner unit' },
  ru: { team: 'Команда', owner: 'Подразделение' },
} as const

const t = useDemoStrings(STRINGS)

const team = ref<string | number | undefined>(undefined)
const owner = ref<string | number | undefined>('eng-web-frontend')

const teamFilled = computed(() => team.value != null && team.value !== '')
const ownerFilled = computed(() => owner.value != null && owner.value !== '')
</script>

<template>
  <div class="fl-row">
    <div class="fl-field" :class="{ 'fl-filled': teamFilled }">
      <SgTreeSelect
        v-model="team"
        :tree-data="orgTree"
        tree-default-expand-all
        placeholder=" "
        allow-clear
      />
      <label class="fl-label">{{ t.team }}</label>
    </div>
    <div class="fl-field" :class="{ 'fl-filled': ownerFilled }">
      <SgTreeSelect
        v-model="owner"
        :tree-data="orgTree"
        tree-default-expand-all
        placeholder=" "
        allow-clear
      />
      <label class="fl-label">{{ t.owner }}</label>
    </div>
  </div>
</template>

<style scoped>
.fl-row {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  max-width: 560px;
}
.fl-field {
  position: relative;
  flex: 1 1 240px;
}
.fl-label {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 14px;
  color: var(--sg-color-text-secondary, rgba(0, 0, 0, 0.65));
  background: var(--sg-color-bg-container, #fff);
  padding: 0 4px;
  pointer-events: none;
  white-space: nowrap;
  z-index: 1;
  transition:
    top 0.18s cubic-bezier(0.4, 0, 0.2, 1),
    transform 0.18s cubic-bezier(0.4, 0, 0.2, 1),
    color 0.18s ease;
}
.fl-field:focus-within .fl-label,
.fl-field.fl-filled .fl-label {
  top: 0;
  transform: translateY(-50%) scale(0.85);
  transform-origin: left center;
  color: var(--sg-color-primary);
}
</style>
