<script setup lang="ts">
import { computed, ref } from 'vue'
import type { ShowcasesLocale } from '@skygraph-examples/shared'
import { SHOWCASE_CATEGORY_ITEMS, SHOWCASE_METAS } from './showcaseMeta'

/**
 * Hub view (catalog of showcases). 1:1 port of
 * `examples/showcases/src/ShowcasesViews.tsx#ShowcasesHubView`.
 */
const props = defineProps<{ strings: ShowcasesLocale }>()
const emit = defineEmits<{ open: [key: string] }>()

const category = ref<(typeof SHOWCASE_CATEGORY_ITEMS)[number]['key']>('all')
const query = ref('')

const filtered = computed(() => {
  return SHOWCASE_METAS.filter((s) => {
    if (category.value !== 'all' && s.category !== category.value) return false
    if (!query.value.trim()) return true
    const q = query.value.toLowerCase()
    const card = props.strings.cards[s.key]
    const title = card?.title ?? s.key
    const desc = card?.description ?? ''
    return (
      title.toLowerCase().includes(q) ||
      desc.toLowerCase().includes(q) ||
      s.tags.some((t) => t.toLowerCase().includes(q))
    )
  })
})

function categoryCount(key: string): number {
  if (key === 'all') return SHOWCASE_METAS.length
  return SHOWCASE_METAS.filter((s) => s.category === key).length
}
</script>

<template>
  <div class="hub">
    <h1>{{ props.strings.hubTitle }}</h1>
    <p class="hub-sub">{{ props.strings.hubLead }}</p>

    <div class="hub-controls">
      <input v-model="query" class="hub-search" :placeholder="props.strings.searchPlaceholder" />
      <div class="hub-cats">
        <button
          v-for="c of SHOWCASE_CATEGORY_ITEMS"
          :key="c.key"
          type="button"
          :class="['hub-cat', category === c.key ? 'hub-cat--active' : '']"
          @click="category = c.key"
        >
          {{ c.labelFrom(props.strings) }}
          <span class="hub-cat-count">{{ categoryCount(c.key) }}</span>
        </button>
      </div>
    </div>

    <div v-if="filtered.length === 0" class="hub-empty">
      {{ props.strings.noMatches }}
    </div>
    <div v-else class="hub-grid">
      <button
        v-for="s of filtered"
        :key="s.key"
        type="button"
        class="hub-card"
        @click="emit('open', s.key)"
      >
        <div class="hub-card-icon">{{ s.icon }}</div>
        <h3>{{ props.strings.cards[s.key]?.title ?? s.key }}</h3>
        <p>{{ props.strings.cards[s.key]?.description ?? '' }}</p>
        <div class="hub-card-tags">
          <span v-for="t of s.tags" :key="t" class="hub-card-tag">{{ t }}</span>
        </div>
      </button>
    </div>
  </div>
</template>
