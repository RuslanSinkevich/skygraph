<script setup lang="ts">
/**
 * About page (`/about`) — Wave 3.4 port of
 * `examples/demo/src/pages/About/About.tsx`.
 *
 * Pure i18n + stylesheet copy. No interactive elements; all hrefs are
 * external GitHub links so vue-router is not involved.
 */
import { GITHUB_URL } from '@skygraph-examples/shared'
import { useI18n } from '../i18n'
import './about.css'

const { t } = useI18n()

const ARCHITECTURE_URL = `${GITHUB_URL}/blob/master/ARCHITECTURE.md`
const LICENSE_URL = `${GITHUB_URL}/blob/master/LICENSE`
const VERSION_LABEL = `v${__SKYGRAPH_VUE_VERSION__}`
</script>

<template>
  <div class="about">
    <header class="about-header">
      <h1 class="about-title">{{ t.about.title }}</h1>
      <div class="about-meta-row">
        <span class="about-meta">
          <span class="about-meta-label">{{ t.about.versionLabel }}:</span>
          <span class="about-meta-value">{{ VERSION_LABEL }}</span>
        </span>
        <span class="about-meta">
          <span class="about-meta-label">{{ t.about.licenseLabel }}:</span>
          <a :href="LICENSE_URL" target="_blank" rel="noreferrer noopener" class="about-meta-link">
            {{ t.about.licenseValue }}
          </a>
        </span>
        <a
          class="about-meta-link"
          :href="ARCHITECTURE_URL"
          target="_blank"
          rel="noreferrer noopener"
        >
          {{ t.about.architectureLink }}
        </a>
      </div>
    </header>

    <section class="about-lead">
      <p>{{ t.about.lead1 }}</p>
      <p>{{ t.about.lead2 }}</p>
      <p>{{ t.about.lead3 }}</p>
    </section>

    <section>
      <h2 class="about-section-title">{{ t.about.skyPlatformTitle }}</h2>
      <p class="about-section-sub">{{ t.about.skyPlatformLead }}</p>
      <div class="about-platform">
        <article class="about-platform-card">
          <div class="about-platform-card-title">
            <span class="about-platform-card-mark" aria-hidden="true" />
            <a
              href="https://gitbor.ru/"
              target="_blank"
              rel="noopener noreferrer"
              class="about-platform-card-link"
            >
              {{ t.about.gitborTitle }}
            </a>
          </div>
          <div class="about-platform-card-desc">{{ t.about.gitborDesc }}</div>
          <div class="about-platform-card-tag">{{ t.about.gitborTag }}</div>
        </article>
        <article class="about-platform-card about-platform-card--current">
          <div class="about-platform-card-title">
            <span class="about-platform-card-mark" aria-hidden="true" />
            {{ t.about.skygraphTitle }}
          </div>
          <div class="about-platform-card-desc">{{ t.about.skygraphDesc }}</div>
          <div class="about-platform-card-tag">{{ t.about.skygraphTag }}</div>
        </article>
        <article class="about-platform-card">
          <div class="about-platform-card-title">
            <span class="about-platform-card-mark" aria-hidden="true" />
            <a
              href="https://skycode-ai.ru/"
              target="_blank"
              rel="noopener noreferrer"
              class="about-platform-card-link"
            >
              {{ t.about.skycodeTitle }}
            </a>
          </div>
          <div class="about-platform-card-desc">{{ t.about.skycodeDesc }}</div>
          <div class="about-platform-card-tag">{{ t.about.skycodeTag }}</div>
        </article>
      </div>
    </section>

    <section class="about-mf">
      <h2 class="about-section-title">{{ t.about.multiFrameworkTitle }}</h2>
      <p class="about-section-sub">{{ t.about.multiFrameworkLead }}</p>
      <ul>
        <li>{{ t.about.multiFrameworkReact }}</li>
        <li>{{ t.about.multiFrameworkVue }}</li>
      </ul>
    </section>
  </div>
</template>
