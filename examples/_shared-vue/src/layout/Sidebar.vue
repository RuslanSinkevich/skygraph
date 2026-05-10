<script setup lang="ts">
export interface SidebarItem {
  key: string
  label: string
  disabled?: boolean
}

export interface SidebarSection {
  title: string
  items: readonly SidebarItem[]
}

interface Props {
  /**
   * Grouped sidebar items. Each section renders a tiny upper-case
   * heading followed by the items list. Pass an empty array (or omit
   * the sidebar slot in `<AppShell>`) when there's nothing to show.
   */
  sections?: readonly SidebarSection[]
  /** Currently-active item key (for highlighting). */
  active?: string | null
  /** Empty-state message — shown when `sections` filters down to zero. */
  emptyLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
  sections: () => [] as readonly SidebarSection[],
  active: null,
  emptyLabel: 'Nothing to show',
})

const emit = defineEmits<{
  (e: 'select', key: string): void
}>()

defineSlots<{
  /**
   * Free-form content. When provided, replaces the auto-generated
   * sections list — useful for custom sidebar widgets.
   */
  default?(): unknown
}>()

function itemClass(item: SidebarItem): string {
  return ['xshell-sidebar-item', props.active === item.key ? 'xshell-sidebar-item--active' : '']
    .filter(Boolean)
    .join(' ')
}

function onItemClick(item: SidebarItem, ev: MouseEvent) {
  if (item.disabled) {
    ev.preventDefault()
    return
  }
  ev.preventDefault()
  emit('select', item.key)
}
</script>

<template>
  <slot v-if="$slots.default" />
  <div v-else-if="!sections || sections.length === 0" class="xshell-sidebar-empty">
    {{ emptyLabel }}
  </div>
  <template v-else>
    <div v-for="section in sections" :key="section.title" class="xshell-sidebar-section">
      <div class="xshell-sidebar-section-title">{{ section.title }}</div>
      <a
        v-for="item in section.items"
        :key="item.key"
        :class="itemClass(item)"
        :href="`#/${item.key}`"
        :aria-disabled="item.disabled || undefined"
        @click="onItemClick(item, $event)"
        >{{ item.label }}</a
      >
    </div>
  </template>
</template>
