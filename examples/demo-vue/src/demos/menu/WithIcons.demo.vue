<script setup lang="ts">
/**
 * Every MenuItem accepts an `icon` VNode — produce it with `h()` to
 * use your icon pack, a colored dot, or an SVG. Icons align
 * automatically with the label.
 */
import { SgMenu } from '@skygraph/vue'
import { iconItems } from './data'
</script>

<template>
  <div style="max-width: 256px">
    <SgMenu
      mode="inline"
      :items="iconItems"
      :default-open-keys="['labels']"
      :default-selected-keys="['inbox']"
    />
  </div>
</template>
