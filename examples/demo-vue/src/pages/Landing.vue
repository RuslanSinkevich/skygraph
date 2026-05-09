<script setup lang="ts">
import { useRouter } from '../router'
import { useI18n } from '../i18n'

const router = useRouter()
const { t } = useI18n()

function browse() {
  void router.push('/components/button')
}
</script>

<template>
  <div class="dv-landing">
    <section class="dv-landing-hero">
      <h1>{{ t.landing.title }}</h1>
      <p class="dv-landing-tagline">{{ t.app.tagline }}</p>
      <p class="dv-landing-sub">{{ t.landing.lead }}</p>
      <div class="dv-landing-cta">
        <button type="button" class="dv-landing-cta-primary" @click="browse">
          {{ t.landing.ctaPrimary }} →
        </button>
        <a
          class="dv-landing-cta-secondary"
          href="https://github.com/skygraph/skygraph"
          target="_blank"
          rel="noreferrer noopener"
        >{{ t.landing.ctaSecondary }}</a>
      </div>
    </section>

    <section class="dv-landing-stats">
      <div class="dv-landing-stat">
        <span class="dv-landing-stat-num">27</span>
        <span class="dv-landing-stat-label">{{ t.landing.statComponents }}</span>
      </div>
      <div class="dv-landing-stat">
        <span class="dv-landing-stat-num">14</span>
        <span class="dv-landing-stat-label">composables</span>
      </div>
      <div class="dv-landing-stat">
        <span class="dv-landing-stat-num">300+</span>
        <span class="dv-landing-stat-label">{{ t.landing.statTests }}</span>
      </div>
    </section>

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
  </div>
</template>
