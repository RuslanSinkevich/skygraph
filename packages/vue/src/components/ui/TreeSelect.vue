<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'

export interface TreeSelectNode {
  value: string | number
  label: string
  children?: TreeSelectNode[]
  disabled?: boolean
  selectable?: boolean
}

export interface TreeSelectProps {
  /** Tree of selectable nodes. */
  treeData: TreeSelectNode[]
  /** v-model binding (Vue idiom). */
  modelValue?: (string | number) | (string | number)[]
  /** Compat alias for `modelValue`. */
  value?: (string | number) | (string | number)[]
  /** Initial value when uncontrolled. */
  defaultValue?: (string | number) | (string | number)[]
  /** Placeholder text. */
  placeholder?: string
  /** Multi-select mode. */
  multiple?: boolean
  /** Render checkbox controls per node. */
  treeCheckable?: boolean
  /** Show clear control. */
  allowClear?: boolean
  /** Disables interaction. */
  disabled?: boolean
  /** Allow text-search filter. */
  showSearch?: boolean
  /** Initially expanded keys. */
  defaultExpandedKeys?: (string | number)[]
  /** Strips built-in styling. */
  unstyled?: boolean
  /** Size token. */
  size?: 'small' | 'middle' | 'large'
}

const props = withDefaults(defineProps<TreeSelectProps>(), {
  placeholder: 'Please select',
  multiple: false,
  treeCheckable: false,
  allowClear: true,
  disabled: false,
  showSearch: false,
  size: 'middle',
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: (string | number) | (string | number)[]): void
  (e: 'change', value: (string | number) | (string | number)[]): void
  (e: 'search', text: string): void
}>()

const empty: (string | number)[] = []
const initial = props.modelValue ?? props.value ?? props.defaultValue ?? (props.multiple ? empty : '')
const internal = ref<(string | number) | (string | number)[]>(initial)
watch(
  () => props.modelValue ?? props.value,
  (v) => {
    if (v !== undefined) internal.value = v
  },
)
const current = computed(() => props.modelValue ?? props.value ?? internal.value)

const isOpen = ref(false)
const wrapperRef = ref<HTMLDivElement | null>(null)
const searchText = ref('')
const expanded = ref<Set<string | number>>(new Set(props.defaultExpandedKeys ?? []))

function flatten(nodes: TreeSelectNode[]): TreeSelectNode[] {
  const out: TreeSelectNode[] = []
  const walk = (arr: TreeSelectNode[]) => {
    for (const n of arr) {
      out.push(n)
      if (n.children) walk(n.children)
    }
  }
  walk(nodes)
  return out
}

function findNode(value: string | number) {
  return flatten(props.treeData).find((n) => n.value === value)
}

const displayLabel = computed(() => {
  if (props.multiple || Array.isArray(current.value)) {
    const values = (Array.isArray(current.value) ? current.value : [current.value]) as (string | number)[]
    return values
      .map((v) => findNode(v)?.label ?? String(v))
      .join(', ')
  }
  if (current.value === '' || current.value === undefined || current.value === null) return ''
  return findNode(current.value as string | number)?.label ?? String(current.value)
})

function isSelected(value: string | number) {
  if (Array.isArray(current.value)) return current.value.includes(value)
  return current.value === value
}

function toggleExpand(value: string | number) {
  if (expanded.value.has(value)) expanded.value.delete(value)
  else expanded.value.add(value)
  expanded.value = new Set(expanded.value)
}

function handleSelect(node: TreeSelectNode) {
  if (node.disabled || node.selectable === false) return
  if (props.multiple) {
    const arr = Array.isArray(current.value) ? [...current.value] : []
    const idx = arr.indexOf(node.value)
    if (idx >= 0) arr.splice(idx, 1)
    else arr.push(node.value)
    internal.value = arr
    emit('update:modelValue', arr)
    emit('change', arr)
  } else {
    internal.value = node.value
    emit('update:modelValue', node.value)
    emit('change', node.value)
    isOpen.value = false
  }
}

function handleClear(e: MouseEvent) {
  e.stopPropagation()
  const empty = props.multiple ? [] : ''
  internal.value = empty
  emit('update:modelValue', empty)
  emit('change', empty)
}

function handleSearchInput(e: Event) {
  const v = (e.target as HTMLInputElement).value
  searchText.value = v
  emit('search', v)
}

function open() {
  if (props.disabled) return
  isOpen.value = true
}

function handleOutside(e: MouseEvent) {
  if (wrapperRef.value && !wrapperRef.value.contains(e.target as Node)) {
    isOpen.value = false
  }
}

onMounted(() => document.addEventListener('mousedown', handleOutside))
onBeforeUnmount(() => document.removeEventListener('mousedown', handleOutside))

interface RenderNode { node: TreeSelectNode; level: number }
const visibleNodes = computed<RenderNode[]>(() => {
  const out: RenderNode[] = []
  const walk = (arr: TreeSelectNode[], level: number) => {
    for (const n of arr) {
      const matches = !searchText.value || n.label.toLowerCase().includes(searchText.value.toLowerCase())
      if (matches) out.push({ node: n, level })
      if (n.children && (expanded.value.has(n.value) || searchText.value)) {
        walk(n.children, level + 1)
      }
    }
  }
  walk(props.treeData, 0)
  return out
})

const wrapperCls = computed(() =>
  props.unstyled
    ? ''
    : [
        'sg-treeselect',
        `sg-treeselect-${props.size}`,
        isOpen.value ? 'sg-treeselect-open' : '',
        props.disabled ? 'sg-treeselect-disabled' : '',
      ]
        .filter(Boolean)
        .join(' '),
)

function hasValue(): boolean {
  if (Array.isArray(current.value)) return current.value.length > 0
  return current.value !== '' && current.value !== undefined && current.value !== null
}
</script>

<template>
  <div ref="wrapperRef" :class="wrapperCls">
    <div
      class="sg-treeselect-input"
      role="combobox"
      :aria-expanded="isOpen"
      :aria-disabled="disabled"
      tabindex="0"
      @click="open"
    >
      <span :class="hasValue() ? '' : 'sg-treeselect-placeholder'">{{ hasValue() ? displayLabel : placeholder }}</span>
      <span class="sg-treeselect-suffix">
        <span v-if="allowClear && hasValue()" class="sg-treeselect-clear" @click="handleClear">×</span>
      </span>
    </div>
    <div v-if="isOpen" class="sg-treeselect-dropdown">
      <input
        v-if="showSearch"
        :value="searchText"
        class="sg-treeselect-search"
        placeholder="Search"
        @input="handleSearchInput"
      />
      <ul class="sg-treeselect-tree">
        <li
          v-for="rn in visibleNodes"
          :key="String(rn.node.value)"
          :class="[
            'sg-treeselect-node',
            rn.node.disabled ? 'sg-treeselect-node-disabled' : '',
            isSelected(rn.node.value) ? 'sg-treeselect-node-selected' : '',
          ]"
          :style="{ paddingLeft: `${rn.level * 16}px` }"
        >
          <span
            v-if="rn.node.children?.length"
            class="sg-treeselect-node-toggle"
            @click="toggleExpand(rn.node.value)"
          >{{ expanded.has(rn.node.value) ? '▼' : '▶' }}</span>
          <input
            v-if="treeCheckable"
            type="checkbox"
            :checked="isSelected(rn.node.value)"
            :disabled="rn.node.disabled"
            @change="handleSelect(rn.node)"
          />
          <span class="sg-treeselect-node-label" @click="handleSelect(rn.node)">{{ rn.node.label }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
