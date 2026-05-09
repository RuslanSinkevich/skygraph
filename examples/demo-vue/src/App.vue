<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from './router'
import Header from './components/Header.vue'
import Sidebar from './components/Sidebar.vue'
import { useI18n } from './i18n'
import { buildComponentsSidebar } from './nav'

const route = useRoute()
const { t } = useI18n()
const search = ref('')

const isComponentRoute = computed(() => route.value.path.startsWith('/components/'))
const sections = computed(() => buildComponentsSidebar(t.value))
</script>

<template>
  <div class="dv-app">
    <Header
      :search-value="search"
      :show-search="isComponentRoute"
      @update:search-value="search = $event"
    />

    <div class="dv-shell" :data-section="isComponentRoute ? 'components' : 'home'">
      <aside v-if="isComponentRoute" class="dv-shell-aside">
        <Sidebar :sections="sections" :search="search" />
      </aside>

      <main class="dv-shell-main" :class="{ 'dv-shell-main-full': !isComponentRoute }">
        <RouterView />
      </main>
    </div>

    <footer class="dv-footer">
      <span>SkyGraph Vue · v0.5.0</span>
      <span class="dv-footer-sep">·</span>
      <a href="https://github.com/skygraph/skygraph" target="_blank" rel="noreferrer noopener">GitHub</a>
    </footer>
  </div>
</template>
