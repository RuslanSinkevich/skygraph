<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import {
  AppShell,
  Footer,
  Header,
  LanguageSwitcher,
  ThemeSwitcher,
  type AppShellSection,
  type NavItem,
} from '@skygraph-examples/shared-vue/layout'
import {
  DEMO_URL,
  GITHUB_URL,
  SHOWCASES_URL,
  showcasesLocaleEn,
  showcasesLocaleRu,
  type ShowcasesLocale,
} from '@skygraph-examples/shared'
import ShowcasesHubView from './ShowcasesHubView.vue'
import ShowcasesDetailView from './ShowcasesDetailView.vue'
import { parseShowcaseHashRoute, showcaseDetailHash, showcaseHubHash } from './showcaseRouting'

const LOCALE_STORAGE_KEY = 'skygraph-demo-locale'
const appVersion = `v${__SKYGRAPH_VUE_VERSION__}`

function readLocale(): 'en' | 'ru' {
  if (typeof window === 'undefined') return 'en'
  try {
    const s = window.localStorage.getItem(LOCALE_STORAGE_KEY)
    if (s === 'ru' || s === 'en') return s
  } catch {
    /* ignore */
  }
  return 'en'
}

function getRoute(): string {
  return window.location.hash.replace(/^#\/?/, '') || ''
}

const route = ref(getRoute())
const locale = ref<'en' | 'ru'>(readLocale())

function onHash() {
  route.value = getRoute()
}

function onStorage(e: StorageEvent) {
  if (e.key === LOCALE_STORAGE_KEY && (e.newValue === 'en' || e.newValue === 'ru')) {
    locale.value = e.newValue
  }
}

onMounted(() => {
  window.addEventListener('hashchange', onHash)
  window.addEventListener('storage', onStorage)
})

onUnmounted(() => {
  window.removeEventListener('hashchange', onHash)
  window.removeEventListener('storage', onStorage)
})

const strings = computed<ShowcasesLocale>(() =>
  locale.value === 'ru' ? showcasesLocaleRu : showcasesLocaleEn,
)
const parsed = computed(() => parseShowcaseHashRoute(route.value))

function navigate(key: string) {
  window.location.hash = key ? '#/' + key : '#'
  window.scrollTo({ top: 0 })
}

function setLocalePersist(next: 'en' | 'ru') {
  locale.value = next
  try {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, next)
  } catch {
    /* ignore */
  }
}

const navItems = computed<NavItem[]>(() => [
  { key: 'docs', label: '← Docs', href: DEMO_URL, external: true },
  { key: 'showcases', label: 'Showcases', href: '#' },
])

const section = computed<AppShellSection>(() => (parsed.value.kind === 'hub' ? 'showcases' : null))
const headerActive = computed<string | null>(() =>
  parsed.value.kind === 'hub' ? 'showcases' : null,
)
</script>

<template>
  <AppShell :section="section" :flush="parsed.kind === 'detail'">
    <template #header>
      <Header
        brand="SkyGraph"
        :items="navItems"
        :active="headerActive"
        @brand-click="navigate(showcaseHubHash('standalone'))"
        @select="
          (key) => {
            if (key === 'showcases') navigate(showcaseHubHash('standalone'))
          }
        "
      >
        <template #extras>
          <LanguageSwitcher
            :options="[
              { code: 'en', label: 'EN', fullName: 'English' },
              { code: 'ru', label: 'RU', fullName: 'Русский' },
            ]"
            :active="locale"
            :group-label="strings.languageSwitcher"
            @change="(code) => setLocalePersist(code as 'en' | 'ru')"
          />
          <ThemeSwitcher />
        </template>
      </Header>
    </template>

    <ShowcasesHubView
      v-if="parsed.kind === 'hub'"
      :strings="strings"
      @open="(key) => navigate(showcaseDetailHash(key, 'standalone'))"
    />
    <ShowcasesDetailView
      v-else
      :showcase-key="parsed.key"
      :strings="strings"
      @back="navigate(showcaseHubHash('standalone'))"
    />

    <template v-if="parsed.kind === 'hub'" #footer>
      <Footer
        copyright="© 2026 SkyGraph contributors"
        :version="appVersion"
        :columns="[
          {
            title: 'Showcases',
            links: [
              { label: 'All demos', href: '#' },
              { label: 'Source on GitHub', href: SHOWCASES_URL, external: true },
            ],
          },
          {
            title: 'Documentation',
            links: [
              { label: 'Demo site', href: DEMO_URL, external: true },
              { label: 'Components', href: `${DEMO_URL}#/components/button`, external: true },
              { label: 'Guide', href: `${DEMO_URL}#/guide/getting-started`, external: true },
            ],
          },
          {
            title: 'Community',
            links: [
              { label: 'GitHub', href: GITHUB_URL, external: true },
              { label: 'Issues', href: `${GITHUB_URL}/issues`, external: true },
            ],
          },
          {
            title: 'Project',
            links: [
              {
                label: 'Changelog',
                href: `${GITHUB_URL}/blob/master/CHANGELOG.md`,
                external: true,
              },
              { label: 'License', href: `${GITHUB_URL}/blob/master/LICENSE`, external: true },
            ],
          },
        ]"
      >
        <template #extras><ThemeSwitcher /></template>
      </Footer>
    </template>
  </AppShell>
</template>
