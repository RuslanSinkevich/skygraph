<script setup lang="ts">
import { computed } from 'vue'
import {
  showcasesLocaleEn,
  showcasesLocaleRu,
  type ShowcasesLocale,
} from '@skygraph-examples/shared'
import ShowcasesHubView from 'showcases-vue/ShowcasesHubView.vue'
import ShowcasesDetailView from 'showcases-vue/ShowcasesDetailView.vue'
import {
  parseShowcaseHashRoute,
  showcaseDetailHash,
  showcaseHubHash,
} from 'showcases-vue/showcaseRouting'
import 'showcases-vue/hub-fragment.css'
import 'showcases-vue/app.css'
import { useRoute, useRouter } from '../router'
import { useI18n } from '../i18n'

/**
 * Vue Showcases page — mirrors the React `ShowcasesPage` in
 * `examples/demo/src/pages/Showcases/ShowcasesPage.tsx`. Embeds the
 * standalone `showcases-vue` package via shared hub/detail views, with
 * deep-links of the form `#/showcases/<key>` for parity with the React demo.
 */
const route = useRoute()
const router = useRouter()
const { locale } = useI18n()

const strings = computed<ShowcasesLocale>(() =>
  locale.value === 'ru' ? showcasesLocaleRu : showcasesLocaleEn,
)

const parsed = computed(() => parseShowcaseHashRoute(route.value.path))

function navigate(key: string) {
  void router.push('/' + key)
}
</script>

<template>
  <ShowcasesHubView
    v-if="parsed.kind === 'hub'"
    :strings="strings"
    @open="(key) => navigate(showcaseDetailHash(key, 'demo'))"
  />
  <ShowcasesDetailView
    v-else
    :showcase-key="parsed.key"
    :strings="strings"
    @back="navigate(showcaseHubHash('demo'))"
  />
</template>
