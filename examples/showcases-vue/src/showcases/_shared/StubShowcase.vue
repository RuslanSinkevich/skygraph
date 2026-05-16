<script setup lang="ts">
import { SgButton, SgEmpty, SgTag } from '@skygraph/vue'

/**
 * Stub showcase used for apps whose full Vue port is still in progress
 * (forms, ecommerce, hr-portal, file-manager, admin). The hub catalog
 * link, tags and description are preserved so the catalog grid is complete;
 * the body explains the gap and links to the React-equivalent demo.
 */
const props = defineProps<{
  title: string
  description: string
  reactKey: string
  tags?: readonly string[]
}>()

function openReact() {
  const url = `https://skygraph.ruslansinkevich.ru/react/#/showcases/${props.reactKey}`
  window.open(url, '_blank', 'noopener,noreferrer')
}
</script>

<template>
  <div class="stub">
    <SgEmpty :description="title">
      <template #description>
        <strong>{{ title }}</strong>
      </template>
    </SgEmpty>
    <p class="stub-lead">{{ description }}</p>
    <div v-if="tags?.length" class="stub-tags">
      <SgTag v-for="t of tags" :key="t" color="default">{{ t }}</SgTag>
    </div>
    <p class="stub-note">
      Vue port in progress. The full implementation is available in the React demo.
    </p>
    <SgButton type="primary" @click="openReact">Open in React demo →</SgButton>
  </div>
</template>

<style scoped>
.stub {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 64px 24px;
  gap: 16px;
  max-width: 640px;
  margin: 0 auto;
}
.stub-lead {
  color: var(--sg-color-text-secondary);
  font-size: 14px;
  line-height: 1.6;
  margin: 0;
}
.stub-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  justify-content: center;
}
.stub-note {
  margin: 8px 0 0;
  font-size: 13px;
  color: var(--sg-color-text-tertiary, var(--sg-color-text-secondary));
}
</style>
