<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'

export interface CascaderOption {
  value: string | number
  label: string
  children?: CascaderOption[]
  disabled?: boolean
}

export interface CascaderProps {
  /** Cascader option tree. */
  options: CascaderOption[]
  /** v-model binding (Vue idiom) — array of values from root to leaf. */
  modelValue?: (string | number)[]
  /** Compat alias for `modelValue`. */
  value?: (string | number)[]
  /** Initial value when uncontrolled. */
  defaultValue?: (string | number)[]
  /** Placeholder text. */
  placeholder?: string
  /** Disables interaction. */
  disabled?: boolean
  /** Show clear control. */
  allowClear?: boolean
  /** Allow search box at top of dropdown. */
  showSearch?: boolean
  /** Trigger that expands a sub-menu. */
  expandTrigger?: 'click' | 'hover'
  /** Allow selecting any non-leaf option. */
  changeOnSelect?: boolean
  /** Custom display formatter. */
  displayRender?: (labels: string[]) => string
  /** Strips built-in styling. */
  unstyled?: boolean
  /** Size token. */
  size?: 'small' | 'middle' | 'large'
}

const props = withDefaults(defineProps<CascaderProps>(), {
  placeholder: 'Please select',
  disabled: false,
  allowClear: true,
  showSearch: false,
  expandTrigger: 'click',
  changeOnSelect: false,
  size: 'middle',
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: (string | number)[]): void
  (e: 'change', value: (string | number)[], selectedOptions: CascaderOption[]): void
}>()

const internal = ref<(string | number)[]>(
  props.modelValue ?? props.value ?? props.defaultValue ?? [],
)
watch(
  () => props.modelValue ?? props.value,
  (v) => {
    if (v !== undefined) internal.value = v
  },
)
const current = computed(() => props.modelValue ?? props.value ?? internal.value)

const isOpen = ref(false)
const activePath = ref<(string | number)[]>([...current.value])
const wrapperRef = ref<HTMLDivElement | null>(null)
const searchText = ref('')

watch(current, (v) => {
  activePath.value = [...v]
})

function findOption(opts: CascaderOption[], value: string | number): CascaderOption | undefined {
  return opts.find((o) => o.value === value)
}

const columns = computed<CascaderOption[][]>(() => {
  const cols: CascaderOption[][] = [props.options]
  let opts: CascaderOption[] | undefined = props.options
  for (const v of activePath.value) {
    const found: CascaderOption | undefined = opts ? findOption(opts, v) : undefined
    if (found?.children?.length) {
      cols.push(found.children)
      opts = found.children
    } else {
      break
    }
  }
  return cols
})

function getLabels(values: (string | number)[]) {
  const labels: string[] = []
  let opts: CascaderOption[] | undefined = props.options
  for (const v of values) {
    const found: CascaderOption | undefined = opts ? findOption(opts, v) : undefined
    if (!found) break
    labels.push(found.label)
    opts = found.children
  }
  return labels
}

const displayLabel = computed(() => {
  const labels = getLabels(current.value)
  if (props.displayRender) return props.displayRender(labels)
  return labels.join(' / ')
})

function handleSelect(level: number, opt: CascaderOption) {
  if (opt.disabled) return
  const newPath = [...activePath.value.slice(0, level), opt.value]
  activePath.value = newPath
  if (!opt.children?.length) {
    internal.value = newPath
    emit('update:modelValue', newPath)
    const selectedOptions: CascaderOption[] = []
    let opts: CascaderOption[] | undefined = props.options
    for (const v of newPath) {
      const found: CascaderOption | undefined = opts ? findOption(opts, v) : undefined
      if (!found) break
      selectedOptions.push(found)
      opts = found.children
    }
    emit('change', newPath, selectedOptions)
    isOpen.value = false
  } else if (props.changeOnSelect) {
    internal.value = newPath
    emit('update:modelValue', newPath)
  }
}

function handleClear(e: MouseEvent) {
  e.stopPropagation()
  internal.value = []
  activePath.value = []
  emit('update:modelValue', [])
  emit('change', [], [])
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

const wrapperCls = computed(() =>
  props.unstyled
    ? ''
    : [
        'sg-cascader',
        `sg-cascader-${props.size}`,
        isOpen.value ? 'sg-cascader-open' : '',
        props.disabled ? 'sg-cascader-disabled' : '',
      ]
        .filter(Boolean)
        .join(' '),
)
</script>

<template>
  <div ref="wrapperRef" :class="wrapperCls">
    <div
      class="sg-cascader-input"
      role="combobox"
      :aria-expanded="isOpen"
      :aria-disabled="disabled"
      tabindex="0"
      @click="open"
    >
      <span :class="current.length ? '' : 'sg-cascader-placeholder'">{{ current.length ? displayLabel : placeholder }}</span>
      <span class="sg-cascader-suffix">
        <span v-if="allowClear && current.length" class="sg-cascader-clear" @click="handleClear">×</span>
      </span>
    </div>
    <div v-if="isOpen" class="sg-cascader-dropdown">
      <input
        v-if="showSearch"
        v-model="searchText"
        class="sg-cascader-search"
        placeholder="Search"
      />
      <div class="sg-cascader-menus">
        <ul
          v-for="(col, ci) in columns"
          :key="ci"
          class="sg-cascader-menu"
        >
          <li
            v-for="opt in col"
            :key="String(opt.value)"
            :class="[
              'sg-cascader-menu-item',
              opt.disabled ? 'sg-cascader-menu-item-disabled' : '',
              activePath[ci] === opt.value ? 'sg-cascader-menu-item-active' : '',
            ]"
            @click="handleSelect(ci, opt)"
            @mouseenter="expandTrigger === 'hover' && opt.children?.length ? handleSelect(ci, opt) : null"
          >
            <span>{{ opt.label }}</span>
            <span v-if="opt.children?.length" class="sg-cascader-menu-item-expand">›</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
