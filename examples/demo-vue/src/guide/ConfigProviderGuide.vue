<script setup lang="ts">
/**
 * Guide → ConfigProvider — Wave 3.4 stub.
 *
 * React-side, this route reuses the component-level demo
 * (`ConfigProviderDemo.tsx`). The Vue equivalent already lives at
 * `/components/configprovider`, so the guide page just defers to it.
 */
import { useI18n } from '../i18n'

const { t } = useI18n()
</script>

<template>
  <section class="doc-page">
    <h1>{{ t.guideStub.configProviderTitle }}</h1>
    <p class="doc-lead">{{ t.guideStub.configProviderLead }}</p>

    <p>
      <a class="doc-link" href="#/components/configprovider">
        {{ t.menuItems.configProvider }} →
      </a>
    </p>
  </section>
</template>
