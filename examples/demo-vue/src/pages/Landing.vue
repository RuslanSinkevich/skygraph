<script setup lang="ts">
/**
 * Landing — Vue-flavoured entry page with live SkyGraph components.
 */
import { GITHUB_URL } from '@skygraph-examples/shared'
import {
  SgButton,
  SgInput,
  SgProgress,
  SgSwitch,
  SgTable,
  SgTag,
  type TableColumn,
} from '@skygraph/vue'
import { computed, ref } from 'vue'
import { useRouter } from '../router'
import { useI18n } from '../i18n'
import './landing.css'

const router = useRouter()
const { t } = useI18n()
const previewDark = ref(false)

const INSTALL_COMMAND = 'npm install skygraph-vue'

/**
 * Vue Showcases are now embedded inside the Vue demo itself
 * (`/vue/#/showcases/<key>` in prod, `/#/showcases/<key>` in single-server
 * dev). The href stays hash-only, so it works in both modes.
 */
function showcasesHref(key?: string): string {
  return key ? `#/showcases/${key}` : '#/showcases'
}

interface ShowcaseSpec {
  key: string
  titleKey:
    | 'showcaseCrmTitle'
    | 'showcaseDashboardTitle'
    | 'showcaseProjectTrackerTitle'
    | 'showcaseTableTitle'
  descKey:
    | 'showcaseCrmDesc'
    | 'showcaseDashboardDesc'
    | 'showcaseProjectTrackerDesc'
    | 'showcaseTableDesc'
}

const SHOWCASES: ShowcaseSpec[] = [
  {
    key: 'crm',
    titleKey: 'showcaseCrmTitle',
    descKey: 'showcaseCrmDesc',
  },
  {
    key: 'dashboard',
    titleKey: 'showcaseDashboardTitle',
    descKey: 'showcaseDashboardDesc',
  },
  {
    key: 'project-tracker',
    titleKey: 'showcaseProjectTrackerTitle',
    descKey: 'showcaseProjectTrackerDesc',
  },
  {
    key: 'table-kitchen-sink',
    titleKey: 'showcaseTableTitle',
    descKey: 'showcaseTableDesc',
  },
]

const COMPONENT_LINKS = [
  'Button',
  'Input',
  'Select',
  'Table',
  'Form',
  'Charts',
  'Dashboard',
  'Gantt',
  'Calendar',
  'Tree',
  'Modal',
  'Upload',
] as const

const HIGHLIGHTS = [
  ['highlight1Title', 'highlight1Desc'],
  ['highlight2Title', 'highlight2Desc'],
  ['highlight3Title', 'highlight3Desc'],
  ['highlight4Title', 'highlight4Desc'],
] as const

const previewColumns = computed<TableColumn[]>(() => [
  { key: 'name', title: t.value.landing.previewColumnComponent, sortable: true },
  { key: 'status', title: t.value.landing.previewColumnStatus },
  { key: 'coverage', title: t.value.landing.previewColumnCoverage },
])

const previewRows = computed(() => [
  {
    id: 'table',
    data: {
      name: t.value.landing.previewRowTable,
      status: t.value.landing.previewStatusStable,
      coverage: 96,
    },
  },
  {
    id: 'form',
    data: {
      name: t.value.landing.previewRowForm,
      status: t.value.landing.previewStatusStable,
      coverage: 88,
    },
  },
  {
    id: 'charts',
    data: {
      name: t.value.landing.previewRowCharts,
      status: t.value.landing.previewStatusBeta,
      coverage: 72,
    },
  },
])

function browseComponents() {
  void router.push('/components/button')
}

function browseGettingStarted() {
  void router.push('/guide/getting-started')
}

function browseComponent(name: string) {
  void router.push(`/components/${name.toLowerCase()}`)
}
</script>

<template>
  <div class="landing">
    <!-- Hero ──────────────────────────────────────────────────────────── -->
    <section class="landing-hero">
      <div class="landing-hero-text">
        <span class="landing-eyebrow">{{ t.landing.heroEyebrow }}</span>
        <h1>{{ t.landing.heroTitle }}</h1>
        <p class="landing-hero-sub">{{ t.landing.heroSub }}</p>
        <pre class="landing-hero-install"><code>{{ INSTALL_COMMAND }}</code></pre>
        <div class="landing-cta">
          <SgButton type="primary" size="large" @click="browseComponents">
            {{ t.landing.heroComponentsCta }}
          </SgButton>
          <SgButton size="large" @click="browseGettingStarted">
            {{ t.landing.heroGettingStartedCta }}
          </SgButton>
        </div>
      </div>

      <div
        class="landing-preview"
        :aria-label="t.landing.previewLabel"
        :data-sg-theme="previewDark ? 'dark' : 'light'"
      >
        <div class="landing-preview-topbar">
          <span>{{ t.landing.previewLabel }}</span>
          <SgTag color="processing">Vue</SgTag>
        </div>
        <div class="landing-preview-metrics">
          <div>
            <span>{{ t.landing.previewMetricComponents }}</span>
            <strong>{{ t.landing.previewMetricComponentsValue }}</strong>
          </div>
          <div>
            <span>{{ t.landing.previewMetricTheme }}</span>
            <strong>{{
              previewDark ? t.landing.previewThemeDark : t.landing.previewThemeLight
            }}</strong>
          </div>
          <div>
            <span>{{ t.landing.previewMetricData }}</span>
            <strong>{{ t.landing.previewMetricDataValue }}</strong>
          </div>
        </div>
        <div class="landing-preview-controls">
          <SgInput model-value="SkyGraph admin" :placeholder="t.landing.previewInputPlaceholder" />
          <label class="landing-preview-theme-toggle">
            <SgSwitch
              :model-value="previewDark"
              size="small"
              @update:model-value="previewDark = $event"
            />
            <span>{{
              previewDark ? t.landing.previewThemeDark : t.landing.previewThemeLight
            }}</span>
          </label>
        </div>
        <SgTable
          :columns="previewColumns"
          :data="previewRows"
          :show-pagination="false"
          size="small"
        >
          <template #cell="{ column, value }">
            <SgTag
              v-if="column.key === 'status'"
              :color="value === t.landing.previewStatusStable ? 'success' : 'processing'"
            >
              {{ String(value) }}
            </SgTag>
            <SgProgress
              v-else-if="column.key === 'coverage'"
              :percent="Number(value)"
              size="small"
            />
            <template v-else>{{ value }}</template>
          </template>
        </SgTable>
        <div class="landing-preview-code">
          <span>{{ t.landing.previewCodeLabel }}</span>
          <code>{{ "import { SgButton, SgTable } from 'skygraph-vue'" }}</code>
        </div>
      </div>
    </section>

    <!-- Component index ──────────────────────────────────────────────── -->
    <section class="landing-components">
      <div>
        <h2 class="landing-section-title">{{ t.landing.componentIndexTitle }}</h2>
        <p class="landing-section-sub">{{ t.landing.componentIndexSub }}</p>
      </div>
      <div class="landing-component-grid">
        <button
          v-for="name of COMPONENT_LINKS"
          :key="name"
          type="button"
          class="landing-component-pill"
          @click="browseComponent(name)"
        >
          {{ name }}
        </button>
      </div>
    </section>

    <!-- Highlights ───────────────────────────────────────────────────── -->
    <section>
      <h2 class="landing-section-title">{{ t.landing.highlightsTitle }}</h2>
      <div class="landing-highlights">
        <article
          v-for="[titleKey, descKey] of HIGHLIGHTS"
          :key="titleKey"
          class="landing-highlight"
        >
          <span class="landing-highlight-title">{{ t.landing[titleKey] }}</span>
          <span class="landing-highlight-desc">{{ t.landing[descKey] }}</span>
        </article>
      </div>
    </section>

    <!-- Showcases ────────────────────────────────────────────────────── -->
    <section>
      <h2 class="landing-section-title">{{ t.landing.showcasesTitle }}</h2>
      <p class="landing-section-sub">{{ t.landing.showcasesSub }}</p>
      <div class="landing-showcases">
        <a
          v-for="s of SHOWCASES"
          :key="s.key"
          class="landing-showcase"
          :href="showcasesHref(s.key)"
        >
          <div class="landing-showcase-body">
            <span class="landing-showcase-title">{{ t.landing[s.titleKey] }}</span>
            <span class="landing-showcase-desc">{{ t.landing[s.descKey] }}</span>
          </div>
        </a>
      </div>
      <a class="landing-link" :href="showcasesHref()">
        {{ t.landing.showcasesLink }}
      </a>
    </section>

    <!-- Footer CTA ───────────────────────────────────────────────────── -->
    <section class="landing-footer-cta">
      <h2 class="landing-footer-cta-title">{{ t.landing.footerCtaTitle }}</h2>
      <p class="landing-footer-cta-body">{{ t.landing.footerCtaBody }}</p>
      <a class="landing-footer-cta-button" :href="showcasesHref()">
        {{ t.landing.footerCtaButton }} →
      </a>
      <p class="landing-footer-cta-hint">
        {{ t.landing.footerDevHint }}
        ·
        <a :href="GITHUB_URL" target="_blank" rel="noreferrer noopener">GitHub</a>
      </p>
    </section>
  </div>
</template>
