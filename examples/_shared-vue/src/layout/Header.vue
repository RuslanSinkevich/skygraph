<script setup lang="ts">
import { useAppShell } from './useAppShell'

export interface NavItem {
  /** Stable key — also used to test `active` equality. */
  key: string
  /** Visible label. */
  label: string
  /**
   * Optional href. When set, the link opens in the current tab
   * (use `external` for `target="_blank"`). When omitted, the
   * `select` event fires instead.
   */
  href?: string
  /** Render as external link (target=_blank + ↗ marker). */
  external?: boolean
}

interface Props {
  /** Brand name shown next to the logo mark. */
  brand: string
  /** Top-level navigation items. */
  items: readonly NavItem[]
  /** Currently-active item key (for highlighting). */
  active?: string | null
  /** Optional search input value. */
  searchValue?: string
  /** Search placeholder ("Search components..."). */
  searchPlaceholder?: string
  /** Search aria-label. */
  searchAriaLabel?: string
  /** Aria-label for the mobile burger button. */
  burgerAriaLabel?: string
  /** When true, the search input is rendered (controlled by `searchValue` + `update:searchValue`). */
  showSearch?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  active: null,
  searchValue: '',
  searchPlaceholder: undefined,
  searchAriaLabel: undefined,
  burgerAriaLabel: 'Open navigation',
  showSearch: false,
})

const emit = defineEmits<{
  (e: 'select', key: string): void
  (e: 'brand-click'): void
  (e: 'update:searchValue', value: string): void
}>()

defineSlots<{
  /**
   * Right-aligned extras (theme switcher, GitHub link, ...). Rendered
   * inside `.xshell-header-extras`.
   */
  extras?(): unknown
}>()

const shell = useAppShell()

function navItemClass(item: NavItem): string {
  return [
    'xshell-nav-item',
    props.active === item.key ? 'xshell-nav-item--active' : '',
    item.external ? 'xshell-nav-item-external' : '',
  ]
    .filter(Boolean)
    .join(' ')
}

function onItemClick(item: NavItem, ev: MouseEvent) {
  if (item.external) return
  if (item.href) {
    ev.preventDefault()
  }
  emit('select', item.key)
}

function onSearchInput(ev: Event) {
  const target = ev.target as HTMLInputElement
  emit('update:searchValue', target.value)
}
</script>

<template>
  <header class="xshell-header" role="banner">
    <button
      type="button"
      class="xshell-header-burger"
      :aria-label="burgerAriaLabel"
      @click="shell?.openSidebar()"
    >
      <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
        <path
          d="M2 4h14M2 9h14M2 14h14"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
        />
      </svg>
    </button>

    <button type="button" class="xshell-logo" :aria-label="brand" @click="emit('brand-click')">
      <span class="xshell-logo-mark" aria-hidden="true" />
      {{ brand }}
    </button>

    <nav class="xshell-nav" aria-label="Primary">
      <template v-for="item in items" :key="item.key">
        <a
          v-if="item.href && item.external"
          :href="item.href"
          :class="navItemClass(item)"
          target="_blank"
          rel="noreferrer noopener"
          >{{ item.label }}</a
        >
        <a
          v-else-if="item.href"
          :href="item.href"
          :class="navItemClass(item)"
          @click="onItemClick(item, $event)"
          >{{ item.label }}</a
        >
        <button v-else type="button" :class="navItemClass(item)" @click="emit('select', item.key)">
          {{ item.label }}
        </button>
      </template>
    </nav>

    <div class="xshell-header-spacer" />

    <div v-if="showSearch" class="xshell-search">
      <svg class="xshell-search-icon" viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <circle cx="6" cy="6" r="4.25" stroke="currentColor" stroke-width="1.4" />
        <path d="M9 9l3 3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" />
      </svg>
      <input
        type="search"
        :value="searchValue"
        :placeholder="searchPlaceholder"
        :aria-label="searchAriaLabel ?? searchPlaceholder"
        @input="onSearchInput"
      />
    </div>

    <div v-if="$slots.extras" class="xshell-header-extras">
      <slot name="extras" />
    </div>
  </header>
</template>
