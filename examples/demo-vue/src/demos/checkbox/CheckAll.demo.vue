<script setup lang="ts">
/**
 * Classic "check all" pattern — a parent checkbox with indeterminate
 * state when only some children are selected. Uses a single array of
 * checked keys for the state.
 */
import { computed, ref } from 'vue'
import { SgCheckbox } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    apple: 'Apple',
    pear: 'Pear',
    orange: 'Orange',
    banana: 'Banana',
    mango: 'Mango',
    checkAll: 'Check all',
  },
  ru: {
    apple: 'Яблоко',
    pear: 'Груша',
    orange: 'Апельсин',
    banana: 'Банан',
    mango: 'Манго',
    checkAll: 'Выбрать все',
  },
} as const

const KEYS = ['apple', 'pear', 'orange', 'banana', 'mango'] as const
type FruitKey = (typeof KEYS)[number]

const t = useDemoStrings(STRINGS)
const checked = ref<FruitKey[]>(['apple'])

const allChecked = computed(() => checked.value.length === KEYS.length)
const indeterminate = computed(
  () => checked.value.length > 0 && checked.value.length < KEYS.length,
)

function toggleAll(c: boolean) {
  checked.value = c ? [...KEYS] : []
}

function toggle(key: FruitKey, c: boolean) {
  if (c) {
    if (!checked.value.includes(key)) checked.value = [...checked.value, key]
  } else {
    checked.value = checked.value.filter((x) => x !== key)
  }
}
</script>

<template>
  <div style="display: grid; gap: 8px">
    <SgCheckbox
      :checked="allChecked"
      :indeterminate="indeterminate"
      @change="toggleAll"
    >
      <strong>{{ t.checkAll }} ({{ checked.length }}/{{ KEYS.length }})</strong>
    </SgCheckbox>
    <div style="display: flex; flex-direction: column; gap: 4px; padding-left: 20px">
      <SgCheckbox
        v-for="key in KEYS"
        :key="key"
        :checked="checked.includes(key)"
        @change="(c) => toggle(key, c)"
      >
        {{ t[key] }}
      </SgCheckbox>
    </div>
  </div>
</template>
