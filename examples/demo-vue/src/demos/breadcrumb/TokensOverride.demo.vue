<script setup lang="ts">
/**
 * Breadcrumb has no `--sg-breadcrumb-*` tokens — it leans on the
 * global text palette + `--sg-color-primary`. Scope those on a
 * wrapper to re-skin a single trail.
 */
import type { CSSProperties } from 'vue'
import { SgBreadcrumb, type BreadcrumbItem } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: { home: 'Home', shop: 'Shop', current: 'Wide-leg trousers' },
  ru: { home: 'Главная', shop: 'Магазин', current: 'Широкие брюки' },
} as const

const t = useDemoStrings(STRINGS)

const scoped = {
  '--sg-color-primary': 'var(--sg-volcano-6)',
  '--sg-color-text-secondary': 'var(--sg-volcano-7)',
  '--sg-color-text': 'var(--sg-volcano-9)',
} as CSSProperties
</script>

<template>
  <div :style="scoped">
    <SgBreadcrumb
      :items="[
        { title: t.home, href: '#' },
        { title: t.shop, href: '#shop' },
        { title: t.current },
      ] as BreadcrumbItem[]"
    />
  </div>
</template>
