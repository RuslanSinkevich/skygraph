<script setup lang="ts">
/**
 * Landing — visual parity with `examples/demo/src/pages/Landing/Landing.tsx`.
 *
 * Sections, copy, class names, image placeholders all match the React
 * landing 1:1. Tone is impersonal (no "you"); install block lists the
 * Vue-flavoured packages (`@skygraph/vue`, not React).
 */
import { GITHUB_URL } from '@skygraph-examples/shared'
import { useRouter } from '../router'
import { useI18n } from '../i18n'
import ImagePlaceholder from '../components/ImagePlaceholder.vue'
import './landing.css'

const router = useRouter()
const { t } = useI18n()

const INSTALL_COMMAND = 'npm install @skygraph/core @skygraph/vue @skygraph/styles'

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
    | 'showcaseWorkflowTitle'
    | 'showcaseTableTitle'
  descKey:
    | 'showcaseCrmDesc'
    | 'showcaseDashboardDesc'
    | 'showcaseWorkflowDesc'
    | 'showcaseTableDesc'
  image: string
  imageDesc: string
}

const SHOWCASES: ShowcaseSpec[] = [
  {
    key: 'crm',
    titleKey: 'showcaseCrmTitle',
    descKey: 'showcaseCrmDesc',
    image: 'crm.png',
    imageDesc:
      'CRM showcase: contacts table on the left, deals pipeline board on the right, activity timeline at the bottom. Light theme.',
  },
  {
    key: 'dashboard',
    titleKey: 'showcaseDashboardTitle',
    descKey: 'showcaseDashboardDesc',
    image: 'dashboard.png',
    imageDesc:
      'Operations dashboard: 4 KPI cards on top, mixed line/bar chart in the middle, breakdown table at the bottom. Dark theme.',
  },
  {
    key: 'workflow-editor',
    titleKey: 'showcaseWorkflowTitle',
    descKey: 'showcaseWorkflowDesc',
    image: 'workflow.png',
    imageDesc:
      'Workflow editor: orthogonal flowchart with start/end blocks and a couple of decision diamonds, inspector panel on the right. Light theme.',
  },
  {
    key: 'table-kitchen-sink',
    titleKey: 'showcaseTableTitle',
    descKey: 'showcaseTableDesc',
    image: 'table.png',
    imageDesc:
      'Kitchen-sink table: filter chips above, virtual-scroll grid with grouped rows, totals row at the bottom. Light theme.',
  },
]

interface SpotSpec {
  titleKey: 'spotThemingTitle' | 'spotChartsTitle' | 'spotFormsTitle'
  descKey: 'spotThemingDesc' | 'spotChartsDesc' | 'spotFormsDesc'
  image: string
  imageDesc: string
  reverse: boolean
}

const SPOTS: SpotSpec[] = [
  {
    titleKey: 'spotThemingTitle',
    descKey: 'spotThemingDesc',
    image: 'spot-theming.png',
    imageDesc:
      'Side-by-side: same dashboard in light theme on the left and dark theme on the right; theme toggle highlighted between them.',
    reverse: false,
  },
  {
    titleKey: 'spotChartsTitle',
    descKey: 'spotChartsDesc',
    image: 'spot-charts.png',
    imageDesc:
      'Composite of two visuals: a responsive area chart with crosshair and tooltip + a small flowchart fragment with a hover toolbar.',
    reverse: true,
  },
  {
    titleKey: 'spotFormsTitle',
    descKey: 'spotFormsDesc',
    image: 'spot-forms.png',
    imageDesc:
      'Profile form: required-field hint shown next to an input, dependent country/city fields, validation error inline.',
    reverse: false,
  },
]

const HIGHLIGHTS = [
  ['highlight1Title', 'highlight1Desc'],
  ['highlight2Title', 'highlight2Desc'],
  ['highlight3Title', 'highlight3Desc'],
  ['highlight4Title', 'highlight4Desc'],
] as const

function browseComponents() {
  void router.push('/components/button')
}

function browseGettingStarted() {
  void router.push('/guide/getting-started')
}
</script>

<template>
  <div class="landing">
    <!-- Hero ──────────────────────────────────────────────────────────── -->
    <section class="landing-hero">
      <div class="landing-hero-text">
        <h1>{{ t.landing.heroTitle }}</h1>
        <p class="landing-hero-sub">{{ t.landing.heroSub }}</p>
        <div class="landing-cta">
          <a class="landing-cta-primary" :href="showcasesHref()"> {{ t.landing.ctaPrimary }} → </a>
          <button type="button" class="landing-cta-secondary" @click="browseComponents">
            {{ t.landing.ctaSecondary }}
          </button>
        </div>
      </div>
      <!-- PLACEHOLDER
           File: examples/demo-vue/public/landing/hero.png
           Size: 1280×960 (4:3), 2x retina recommended
           Content: hero shot — composite screenshot of the SkyGraph CRM
                    showcase in light theme: sidebar + contacts table +
                    filters on the right.
      -->
      <ImagePlaceholder variant="hero" name="hero.png" :description="t.landing.heroImageAlt" />
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
          <!-- PLACEHOLDER
               File: examples/demo-vue/public/landing/<image>
               Size: 1280×720 (16:9), 2x retina
               Content: see imageDesc above. Cropped tightly so the UI
                        fills the frame; no browser chrome.
          -->
          <ImagePlaceholder variant="showcase" :name="s.image" :description="s.imageDesc" />
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

    <!-- Spots ────────────────────────────────────────────────────────── -->
    <section>
      <h2 class="landing-section-title">{{ t.landing.spotsTitle }}</h2>
      <div class="landing-spots">
        <div
          v-for="(spot, idx) of SPOTS"
          :key="idx"
          :class="['landing-spot', spot.reverse ? 'landing-spot--reverse' : '']"
        >
          <div class="landing-spot-text">
            <h3 class="landing-spot-title">{{ t.landing[spot.titleKey] }}</h3>
            <p class="landing-spot-desc">{{ t.landing[spot.descKey] }}</p>
          </div>
          <!-- PLACEHOLDER
               File: examples/demo-vue/public/landing/<image>
               Size: 1280×960 (4:3), 2x retina
               Content: see imageDesc above. Plain background, no
                        browser chrome, focus on the relevant UI piece.
          -->
          <ImagePlaceholder variant="spot" :name="spot.image" :description="spot.imageDesc" />
        </div>
      </div>
    </section>

    <!-- Install ──────────────────────────────────────────────────────── -->
    <section class="landing-install">
      <h2 class="landing-install-title">{{ t.landing.installTitle }}</h2>
      <p class="landing-install-lead">{{ t.landing.installLead }}</p>
      <pre class="landing-install-code"><code>{{ INSTALL_COMMAND }}</code></pre>
      <a
        class="landing-install-link"
        href="#/guide/getting-started"
        @click.prevent="browseGettingStarted"
      >
        {{ t.landing.installLearnMore }}
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
