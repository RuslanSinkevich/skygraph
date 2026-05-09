<script setup lang="ts">
import { useRoute, useRouter } from '../router'
import { useI18n } from '../i18n'
import ThemeToggle from './ThemeToggle.vue'
import LanguageToggle from './LanguageToggle.vue'

interface Props {
  searchValue: string
  showSearch: boolean
}

defineProps<Props>()
defineEmits<{
  (e: 'update:searchValue', v: string): void
}>()

const { t } = useI18n()
const route = useRoute()
const router = useRouter()

function isActive(prefix: string): boolean {
  return route.value.path.startsWith(prefix)
}

function go(to: string, evt: MouseEvent) {
  evt.preventDefault()
  void router.push(to)
}
</script>

<template>
  <header class="dv-header">
    <div class="dv-header-inner">
      <a
        href="#/"
        class="dv-header-brand"
        @click="go('/', $event)"
      >SkyGraph <span class="dv-header-brand-tag">Vue</span></a>

      <nav class="dv-header-nav" aria-label="Main">
        <a
          href="#/"
          class="dv-header-nav-item"
          :class="{ 'dv-header-nav-item-active': route.path === '/' }"
          @click="go('/', $event)"
        >{{ t.header.navHome }}</a>
        <a
          href="#/components/button"
          class="dv-header-nav-item"
          :class="{ 'dv-header-nav-item-active': isActive('/components') }"
          @click="go('/components/button', $event)"
        >{{ t.header.navComponents }}</a>
      </nav>

      <div class="dv-header-extras">
        <input
          v-if="showSearch"
          class="dv-header-search"
          type="search"
          :value="searchValue"
          :placeholder="t.search.placeholder"
          :aria-label="t.search.ariaLabel"
          @input="$emit('update:searchValue', ($event.target as HTMLInputElement).value)"
        />
        <LanguageToggle />
        <ThemeToggle />
      </div>
    </div>
  </header>
</template>
