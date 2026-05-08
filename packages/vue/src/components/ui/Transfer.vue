<script setup lang="ts">
import { computed, ref, watch } from 'vue'

export interface TransferItem {
  key: string
  title: string
  description?: string
  disabled?: boolean
}

export interface TransferProps {
  /** Source data set. */
  dataSource: TransferItem[]
  /** v-model: keys present in the right-hand pane. */
  modelValue?: string[]
  /** Compat alias for `modelValue`. */
  targetKeys?: string[]
  /** Initial target keys when uncontrolled. */
  defaultTargetKeys?: string[]
  /** Show search input on each pane. */
  showSearch?: boolean
  /** Pane titles, [left, right]. */
  titles?: [string, string]
  /** Disables interaction. */
  disabled?: boolean
  /** One-way mode (only left → right). */
  oneWay?: boolean
  /** Strips built-in styling. */
  unstyled?: boolean
}

const props = withDefaults(defineProps<TransferProps>(), {
  showSearch: false,
  titles: () => ['Source', 'Target'],
  disabled: false,
  oneWay: false,
})

const emit = defineEmits<{
  (e: 'update:modelValue', keys: string[]): void
  (e: 'change', keys: string[], direction: 'left' | 'right', moveKeys: string[]): void
  (e: 'selectChange', leftKeys: string[], rightKeys: string[]): void
}>()

const internal = ref<string[]>(props.modelValue ?? props.targetKeys ?? props.defaultTargetKeys ?? [])
watch(
  () => props.modelValue ?? props.targetKeys,
  (v) => {
    if (v !== undefined) internal.value = v
  },
)
const targets = computed(() => props.modelValue ?? props.targetKeys ?? internal.value)

const leftSelected = ref<Set<string>>(new Set())
const rightSelected = ref<Set<string>>(new Set())
const leftSearch = ref('')
const rightSearch = ref('')

const leftItems = computed(() =>
  props.dataSource.filter(
    (i) => !targets.value.includes(i.key) && (!leftSearch.value || i.title.toLowerCase().includes(leftSearch.value.toLowerCase())),
  ),
)
const rightItems = computed(() =>
  props.dataSource.filter(
    (i) => targets.value.includes(i.key) && (!rightSearch.value || i.title.toLowerCase().includes(rightSearch.value.toLowerCase())),
  ),
)

function toggleLeft(item: TransferItem) {
  if (item.disabled) return
  const next = new Set(leftSelected.value)
  if (next.has(item.key)) next.delete(item.key)
  else next.add(item.key)
  leftSelected.value = next
  emit('selectChange', Array.from(next), Array.from(rightSelected.value))
}

function toggleRight(item: TransferItem) {
  if (item.disabled) return
  const next = new Set(rightSelected.value)
  if (next.has(item.key)) next.delete(item.key)
  else next.add(item.key)
  rightSelected.value = next
  emit('selectChange', Array.from(leftSelected.value), Array.from(next))
}

function moveRight() {
  const moveKeys = Array.from(leftSelected.value)
  if (moveKeys.length === 0) return
  const next = [...targets.value, ...moveKeys]
  internal.value = next
  emit('update:modelValue', next)
  emit('change', next, 'right', moveKeys)
  leftSelected.value = new Set()
}

function moveLeft() {
  if (props.oneWay) return
  const moveKeys = Array.from(rightSelected.value)
  if (moveKeys.length === 0) return
  const next = targets.value.filter((k) => !rightSelected.value.has(k))
  internal.value = next
  emit('update:modelValue', next)
  emit('change', next, 'left', moveKeys)
  rightSelected.value = new Set()
}

const wrapperCls = computed(() =>
  props.unstyled ? '' : ['sg-transfer', props.disabled ? 'sg-transfer-disabled' : ''].filter(Boolean).join(' '),
)
</script>

<template>
  <div :class="wrapperCls">
    <div class="sg-transfer-list">
      <div class="sg-transfer-list-header">
        <span class="sg-transfer-list-header-title">{{ titles[0] }}</span>
        <span class="sg-transfer-list-header-count">{{ leftItems.length }}</span>
      </div>
      <input
        v-if="showSearch"
        v-model="leftSearch"
        class="sg-transfer-list-search"
        placeholder="Search"
      />
      <ul class="sg-transfer-list-content">
        <li
          v-for="item in leftItems"
          :key="item.key"
          :class="[
            'sg-transfer-list-content-item',
            item.disabled ? 'sg-transfer-list-content-item-disabled' : '',
            leftSelected.has(item.key) ? 'sg-transfer-list-content-item-checked' : '',
          ]"
          @click="toggleLeft(item)"
        >
          <input
            type="checkbox"
            :checked="leftSelected.has(item.key)"
            :disabled="item.disabled"
            @click.stop="toggleLeft(item)"
          />
          <span class="sg-transfer-list-content-item-text">{{ item.title }}</span>
        </li>
      </ul>
    </div>
    <div class="sg-transfer-operation">
      <button
        type="button"
        class="sg-transfer-operation-btn"
        :disabled="disabled || leftSelected.size === 0"
        @click="moveRight"
      >›</button>
      <button
        v-if="!oneWay"
        type="button"
        class="sg-transfer-operation-btn"
        :disabled="disabled || rightSelected.size === 0"
        @click="moveLeft"
      >‹</button>
    </div>
    <div class="sg-transfer-list">
      <div class="sg-transfer-list-header">
        <span class="sg-transfer-list-header-title">{{ titles[1] }}</span>
        <span class="sg-transfer-list-header-count">{{ rightItems.length }}</span>
      </div>
      <input
        v-if="showSearch"
        v-model="rightSearch"
        class="sg-transfer-list-search"
        placeholder="Search"
      />
      <ul class="sg-transfer-list-content">
        <li
          v-for="item in rightItems"
          :key="item.key"
          :class="[
            'sg-transfer-list-content-item',
            item.disabled ? 'sg-transfer-list-content-item-disabled' : '',
            rightSelected.has(item.key) ? 'sg-transfer-list-content-item-checked' : '',
          ]"
          @click="toggleRight(item)"
        >
          <input
            type="checkbox"
            :checked="rightSelected.has(item.key)"
            :disabled="item.disabled"
            @click.stop="toggleRight(item)"
          />
          <span class="sg-transfer-list-content-item-text">{{ item.title }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
