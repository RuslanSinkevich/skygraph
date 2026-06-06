<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  AppShell,
  Footer,
  Header,
  LanguageSwitcher,
  Sidebar,
  ThemeSwitcher,
  type AppShellSection,
  type FooterColumn,
  type LanguageOption,
  type NavItem,
  type SidebarSection,
} from '@skygraph-examples/shared-vue/layout'
import { GITHUB_URL } from '@skygraph-examples/shared'
import { useRoute, useRouter } from './router'
import { useI18n } from './i18n'
import { SUPPORTED_LOCALES, type Locale } from './i18n/types'
import { buildComponentsSidebar, buildGuideSidebar, routeToKey } from './nav'
import FrameworkSwitcher from './components/FrameworkSwitcher.vue'

const route = useRoute()
const router = useRouter()
const { t, locale, setLocale } = useI18n()
const search = ref('')

function sectionForRoute(path: string): AppShellSection {
  if (path === '/' || path === '') return 'landing'
  if (path === '/changelog' || path === '/roadmap') return 'changelog'
  if (path === '/about') return 'about'
  if (path.startsWith('/showcases')) return 'showcases'
  if (path.startsWith('/components/')) return 'components'
  if (path.startsWith('/guide/')) return 'guide'
  return null
}

const section = computed(() => sectionForRoute(route.value.path))

const navItems = computed<NavItem[]>(() => [
  { key: 'components', label: t.value.header.navComponents, href: '#/components/button' },
  { key: 'guide', label: t.value.header.navGuide, href: '#/guide/getting-started' },
  { key: 'showcases', label: t.value.header.navShowcases, href: '#/showcases' },
  { key: 'changelog', label: t.value.header.navRoadmap, href: '#/changelog' },
  { key: 'about', label: t.value.header.navAbout, href: '#/about' },
])

const componentsSidebar = computed<SidebarSection[]>(() => buildComponentsSidebar(t.value))
const guideSidebar = computed<SidebarSection[]>(() => buildGuideSidebar(t.value))

const sidebarSections = computed<SidebarSection[] | null>(() => {
  if (section.value === 'components') return componentsSidebar.value
  if (section.value === 'guide') return guideSidebar.value
  return null
})

const filteredSidebar = computed<SidebarSection[]>(() => {
  const sections = sidebarSections.value
  if (!sections) return []
  const q = search.value.trim().toLowerCase()
  if (!q) return sections
  return sections
    .map((s) => ({
      ...s,
      items: s.items.filter((i) => i.label.toLowerCase().includes(q)),
    }))
    .filter((s) => s.items.length > 0)
})

const showSidebar = computed(() => section.value === 'components' || section.value === 'guide')

const headerActive = computed<string | null>(() => {
  if (section.value === 'components') return 'components'
  if (section.value === 'guide') return 'guide'
  if (section.value === 'changelog') return 'changelog'
  if (section.value === 'about') return 'about'
  if (section.value === 'showcases') return 'showcases'
  return null
})

const showSearch = computed(() => section.value === 'components' || section.value === 'guide')

const languageOptions = computed<LanguageOption[]>(() =>
  SUPPORTED_LOCALES.map((code) => ({
    code,
    label: code.toUpperCase(),
    fullName: code === 'en' ? t.value.language.en : t.value.language.ru,
  })),
)

const footerColumns = computed<FooterColumn[]>(() => [
  {
    title: t.value.footer.columnDocs,
    links: [
      { label: t.value.footer.linkGettingStarted, href: '#/guide/getting-started' },
      { label: t.value.footer.linkComponents, href: '#/components/button' },
      { label: t.value.footer.linkTheming, href: '#/guide/theming' },
      { label: t.value.footer.linkCoreApi, href: '#/guide/core-api' },
    ],
  },
  {
    title: t.value.footer.columnResources,
    links: [
      {
        label: t.value.footer.linkChangelog,
        href: `${GITHUB_URL}/blob/master/CHANGELOG.md`,
        external: true,
      },
      {
        label: t.value.footer.linkArchitecture,
        href: `${GITHUB_URL}/blob/master/ARCHITECTURE.md`,
        external: true,
      },
      {
        label: t.value.footer.linkContributing,
        href: `${GITHUB_URL}/blob/master/CONTRIBUTING.md`,
        external: true,
      },
    ],
  },
  {
    title: t.value.footer.columnCommunity,
    links: [
      { label: t.value.footer.linkGithub, href: GITHUB_URL, external: true },
      {
        label: t.value.footer.linkIssues,
        href: `${GITHUB_URL}/issues`,
        external: true,
      },
    ],
  },
  {
    title: t.value.footer.columnProject,
    links: [
      { label: t.value.footer.linkAbout, href: '#/about' },
      { label: t.value.footer.linkRoadmap, href: '#/changelog' },
      {
        label: t.value.footer.linkLicense,
        href: `${GITHUB_URL}/blob/master/LICENSE`,
        external: true,
      },
    ],
  },
])

function navigate(toKey: string) {
  void router.push('/' + toKey)
  search.value = ''
}

function onHeaderSelect(key: string) {
  const item = navItems.value.find((it) => it.key === key)
  if (!item || item.external) return
  if (item.href?.startsWith('#/')) {
    void router.push(item.href.slice(1))
    search.value = ''
  }
}

function onBrandClick() {
  void router.push('/')
  search.value = ''
}

function onFooterSelect(href: string) {
  if (href.startsWith('#/')) {
    void router.push(href.slice(1))
    search.value = ''
  }
}

function onSidebarSelect(key: string) {
  navigate(key)
}

function onLanguageChange(code: string) {
  setLocale(code as Locale)
}

const sidebarActive = computed<string | null>(() => routeToKey(route.value.path))
</script>

<template>
  <!--
    `:key` forces AppShell to remount whenever the section changes.
    `useSlots()` inside the shared AppShell isn't reactive to a `v-if`
    flipping on `#sidebar`, so without a key the aside would be missing on
    first navigation from landing → components. Keying by `section ?? 'none'`
    (not just by sidebar visibility) also covers the same-shape transitions
    components ↔ guide where the sidebar contents — not just presence — change.
  -->
  <AppShell :section="section" :key="section ?? 'none'">
    <template #header>
      <Header
        brand="SkyGraph"
        :items="navItems"
        :active="headerActive"
        :search-value="search"
        :show-search="showSearch"
        :search-placeholder="t.search.placeholder"
        :search-aria-label="t.search.ariaLabel"
        :burger-aria-label="t.header.burgerAria"
        @select="onHeaderSelect"
        @brand-click="onBrandClick"
        @update:search-value="search = $event"
      >
        <template #extras>
          <FrameworkSwitcher active="vue" />
          <LanguageSwitcher
            :options="languageOptions"
            :active="locale"
            :group-label="t.language.switcherLabel"
            @change="onLanguageChange"
          />
          <ThemeSwitcher :aria-label="t.header.themeAria" />
        </template>
      </Header>
    </template>

    <template v-if="showSidebar" #sidebar>
      <Sidebar
        :sections="filteredSidebar"
        :active="sidebarActive"
        :empty-label="t.search.noMatches"
        @select="onSidebarSelect"
      />
    </template>

    <RouterView />

    <template #footer>
      <Footer
        :columns="footerColumns"
        :copyright="t.footer.copyright"
        version="v0.5.0"
        @select="onFooterSelect"
      />
    </template>
  </AppShell>
</template>
