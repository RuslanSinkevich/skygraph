<script setup lang="ts">
/**
 * `disabled` on an item greys the header, blocks pointer/keyboard
 * toggling, and keeps the body closed. Useful for gated sections
 * behind a permission or a pending state.
 */
import { SgCollapse, type CollapseItem } from '@skygraph/vue'

const items: CollapseItem[] = [
  { key: '1', label: 'Open me', content: 'Regular panel.' },
  { key: '2', label: 'Locked — needs admin', content: 'Never visible.', disabled: true },
  { key: '3', label: 'Also open', content: 'Another regular panel.' },
]
</script>

<template>
  <SgCollapse :items="items" :default-active-key="['1']" />
</template>
