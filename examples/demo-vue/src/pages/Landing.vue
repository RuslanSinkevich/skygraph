<script setup lang="ts">
/**
 * Landing — Wave 3.1 rewrite.
 *
 * Tries to follow `examples/demo/src/pages/Landing/Landing.tsx` as
 * closely as possible while staying within Vue idioms and the
 * Wave-3 scope. Sections:
 *   1. Hero      — title + tagline + sub + 2 CTA.
 *   2. StatsRow  — 4 counters: Components / Composables / Engines / Tests.
 *   3. FeatureGrid — 4 feature cards (Reactive / Zero-runtime CSS / a11y / Same DOM).
 *   4. QuickInstall — install snippet + minimal example skeleton.
 *
 * Out of scope for Wave 3 (see `docs/_streams/wave-3/CHARTER.md` §2):
 *   - WhatsNew (CHANGELOG parser) — React-only.
 *   - ShowcasesPreview            — no Vue showcases.
 */
import { ref } from 'vue'
import { COMPONENT_COUNT, TEST_COUNT, ENGINE_COUNT, GITHUB_URL } from '@skygraph-examples/shared'
import { useRouter } from '../router'
import { useI18n } from '../i18n'
import './landing.css'

const router = useRouter()
const { t } = useI18n()

function browse() {
  void router.push('/components/button')
}

/**
 * Composable count is a hard literal until `examples/_shared` exports
 * a `COMPOSABLE_COUNT` constant. See
 * `docs/_streams/findings/T-Vue-Demo-Foundation.md` →
 * `composables-count-hardcode`.
 */
const COMPOSABLE_COUNT = 14

const INSTALL_SNIPPET = `pnpm add @skygraph/vue @skygraph/styles
# or
npm install @skygraph/vue @skygraph/styles`

// All literal `<` are written as `\x3c` so the Vue SFC parser keeps
// the surrounding `<script setup>` block intact and TypeScript still
// sees the rest of the setup function.
const MINIMAL_EXAMPLE =
  '\x3cscript setup lang="ts">\n' +
  "import { SgButton, SgInput } from '@skygraph/vue'\n" +
  "import '@skygraph/styles'\n" +
  '\n' +
  "const email = ref('')\n" +
  '\x3c/script>\n' +
  '\n' +
  '\x3ctemplate>\n' +
  '  \x3cSgInput v-model="email" placeholder="email@example.com" />\n' +
  '  \x3cSgButton type="primary">Sign in\x3c/SgButton>\n' +
  '\x3c/template>'

const installCopied = ref(false)
async function copyInstall() {
  try {
    await navigator.clipboard.writeText(INSTALL_SNIPPET)
    installCopied.value = true
    setTimeout(() => {
      installCopied.value = false
    }, 1600)
  } catch {
    // ignore
  }
}
</script>

<template>
  <div class="dv-landing">
    <!-- Hero ──────────────────────────────────────────────────────── -->
    <section class="dv-landing-hero">
      <h1>{{ t.landing.title }}</h1>
      <p class="dv-landing-tagline">{{ t.app.tagline }}</p>
      <p class="dv-landing-sub">{{ t.app.heroSub }}</p>
      <div class="dv-landing-cta">
        <button type="button" class="dv-landing-cta-primary" @click="browse">
          {{ t.landing.ctaPrimary }} →
        </button>
        <a
          class="dv-landing-cta-secondary"
          :href="GITHUB_URL"
          target="_blank"
          rel="noreferrer noopener"
          >{{ t.landing.ctaSecondary }}</a
        >
      </div>
    </section>

    <!-- StatsRow ──────────────────────────────────────────────────── -->
    <section class="dv-landing-stats" role="list" aria-label="Project stats">
      <div class="dv-landing-stat" role="listitem">
        <span class="dv-landing-stat-num">{{ COMPONENT_COUNT }}+</span>
        <span class="dv-landing-stat-label">{{ t.landing.statComponents }}</span>
      </div>
      <div class="dv-landing-stat" role="listitem">
        <span class="dv-landing-stat-num">{{ COMPOSABLE_COUNT }}</span>
        <span class="dv-landing-stat-label">{{ t.landing.statComposables }}</span>
      </div>
      <div class="dv-landing-stat" role="listitem">
        <span class="dv-landing-stat-num">{{ ENGINE_COUNT }}</span>
        <span class="dv-landing-stat-label">{{ t.landing.statEngines }}</span>
      </div>
      <div class="dv-landing-stat" role="listitem">
        <span class="dv-landing-stat-num">{{ TEST_COUNT }}+</span>
        <span class="dv-landing-stat-label">{{ t.landing.statTests }}</span>
      </div>
    </section>

    <!-- FeatureGrid ───────────────────────────────────────────────── -->
    <section class="dv-landing-features">
      <article class="dv-landing-feature">
        <h3>{{ t.landing.featureReactiveTitle }}</h3>
        <p>{{ t.landing.featureReactiveDesc }}</p>
      </article>
      <article class="dv-landing-feature">
        <h3>{{ t.landing.featureZeroRuntimeTitle }}</h3>
        <p>{{ t.landing.featureZeroRuntimeDesc }}</p>
      </article>
      <article class="dv-landing-feature">
        <h3>{{ t.landing.featureA11yTitle }}</h3>
        <p>{{ t.landing.featureA11yDesc }}</p>
      </article>
      <article class="dv-landing-feature">
        <h3>{{ t.landing.featureMultiTitle }}</h3>
        <p>{{ t.landing.featureMultiDesc }}</p>
      </article>
    </section>

    <!-- QuickInstall ──────────────────────────────────────────────── -->
    <section class="dv-landing-install">
      <h2 class="dv-landing-section-title">{{ t.landing.quickInstallTitle }}</h2>
      <p class="dv-landing-section-sub">{{ t.landing.quickInstallDesc }}</p>
      <div class="dv-landing-install-grid">
        <div class="dv-landing-install-card">
          <div class="dv-landing-install-card-head">
            <h3 class="dv-landing-install-card-title">pnpm</h3>
            <button type="button" class="dv-landing-install-copy" @click="copyInstall">
              <span aria-hidden>{{ installCopied ? '✓' : '⎘' }}</span>
              <span>
                {{ installCopied ? t.landing.quickInstallCopied : t.landing.quickInstallCopy }}
              </span>
            </button>
          </div>
          <pre class="dv-landing-install-code"><code>{{ INSTALL_SNIPPET }}</code></pre>
        </div>
        <div class="dv-landing-install-card">
          <div class="dv-landing-install-card-head">
            <h3 class="dv-landing-install-card-title">Login.vue</h3>
          </div>
          <pre class="dv-landing-install-code"><code>{{ MINIMAL_EXAMPLE }}</code></pre>
        </div>
      </div>
    </section>
  </div>
</template>
