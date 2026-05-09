<script setup lang="ts">
import { useI18n } from '../i18n'

interface Props {
  title: string
  description: string
  badge?: string
  crumbs?: string[]
  whenToUse?: string[]
}

defineProps<Props>()
const { t } = useI18n()
</script>

<template>
  <section class="dv-doc">
    <div v-if="crumbs && crumbs.length > 0" class="dv-doc-crumbs">
      <span v-for="(c, i) in crumbs" :key="i" class="dv-doc-crumb">
        {{ c }}
        <span v-if="i < crumbs.length - 1" class="dv-doc-crumb-sep">/</span>
      </span>
    </div>

    <header class="dv-doc-header">
      <h1 class="dv-doc-title">
        {{ title }}
        <span v-if="badge" class="dv-doc-badge">{{ badge }}</span>
      </h1>
      <p class="dv-doc-lead">{{ description }}</p>
    </header>

    <div v-if="whenToUse && whenToUse.length > 0" class="dv-doc-when">
      <h2>{{ t.componentDoc.whenToUse }}</h2>
      <ul>
        <li v-for="(item, i) in whenToUse" :key="i">{{ item }}</li>
      </ul>
    </div>

    <h2 class="dv-doc-section-title">{{ t.componentDoc.examples }}</h2>
    <div class="dv-doc-demos">
      <slot />
    </div>

    <slot name="api" />
  </section>
</template>
