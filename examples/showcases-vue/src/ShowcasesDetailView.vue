<script setup lang="ts">
import { computed, defineAsyncComponent, h } from 'vue'
import { SgButton, SgSpin } from '@skygraph/vue'
import type { ShowcasesLocale } from '@skygraph-examples/shared'
import { SHOWCASE_METAS } from './showcaseMeta'
import { showcaseLoaders } from './showcaseLoaders'
import { provideShowcaseLocale } from './showcases/_shared'

/**
 * Detail view: loads the requested showcase lazily and wraps it in the
 * topbar chrome. Mirrors the React `ShowcasesDetailView`.
 */
const props = defineProps<{
  showcaseKey: string
  strings: ShowcasesLocale
}>()

const emit = defineEmits<{ back: [] }>()

const meta = computed(() => SHOWCASE_METAS.find((m) => m.key === props.showcaseKey))

const title = computed(() => props.strings.cards[props.showcaseKey]?.title ?? props.showcaseKey)

// Provide locale BEFORE the lazy component mounts. The loader factory itself
// is captured into an AsyncComponent so re-keying on `showcaseKey` correctly
// swaps the underlying module.
provideShowcaseLocale(props.strings)

const LazyApp = computed(() => {
  const loader = showcaseLoaders[props.showcaseKey]
  if (!loader) return null
  return defineAsyncComponent({
    loader,
    loadingComponent: {
      render: () =>
        h('div', { style: { padding: '48px', display: 'flex', justifyContent: 'center' } }, [
          h(SgSpin, { size: 'large' }),
        ]),
    },
  })
})
</script>

<template>
  <div class="showcase-shell">
    <div class="showcase-topbar">
      <SgButton type="link" size="small" class="showcase-back" @click="emit('back')">
        {{ props.strings.back }}
      </SgButton>
      <span class="showcase-topbar-title">
        <template v-if="meta?.icon">{{ meta.icon }} </template>{{ title }}
      </span>
    </div>
    <div class="showcase-body">
      <template v-if="LazyApp">
        <component :is="LazyApp" :key="props.showcaseKey" />
      </template>
      <div v-else style="padding: 24px">Unknown showcase: {{ props.showcaseKey }}</div>
    </div>
  </div>
</template>
