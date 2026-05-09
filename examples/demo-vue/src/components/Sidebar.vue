<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from '../router'
import { useI18n } from '../i18n'

interface SidebarItem {
  label: string
  to: string
}

interface SidebarSection {
  title: string
  items: SidebarItem[]
}

interface Props {
  sections: SidebarSection[]
  search: string
}

const props = defineProps<Props>()
const { t } = useI18n()
const route = useRoute()
const router = useRouter()

const filtered = computed<SidebarSection[]>(() => {
  const q = props.search.trim().toLowerCase()
  if (!q) return props.sections
  return props.sections
    .map((section) => ({
      ...section,
      items: section.items.filter((item) => item.label.toLowerCase().includes(q)),
    }))
    .filter((section) => section.items.length > 0)
})

function isActive(to: string): boolean {
  return route.value.path === to
}

function go(to: string, evt: MouseEvent) {
  evt.preventDefault()
  void router.push(to)
}
</script>

<template>
  <nav class="dv-sidebar" :aria-label="t.header.navComponents">
    <template v-if="filtered.length === 0">
      <p class="dv-sidebar-empty">{{ t.search.noMatches }}</p>
    </template>
    <template v-else>
      <div v-for="section in filtered" :key="section.title" class="dv-sidebar-section">
        <div class="dv-sidebar-section-title">{{ section.title }}</div>
        <ul class="dv-sidebar-list">
          <li v-for="item in section.items" :key="item.to">
            <a
              :href="`#${item.to}`"
              class="dv-sidebar-link"
              :class="{ 'dv-sidebar-link-active': isActive(item.to) }"
              :aria-current="isActive(item.to) ? 'page' : undefined"
              @click="go(item.to, $event)"
            >
              {{ item.label }}
            </a>
          </li>
        </ul>
      </div>
    </template>
  </nav>
</template>
