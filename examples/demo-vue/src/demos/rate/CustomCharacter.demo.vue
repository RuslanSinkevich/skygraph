<script setup lang="ts">
/**
 * `character` accepts a string — emoji or any other glyph. Filled and
 * half styling use `color`; colour emoji ignore `color`, so the
 * inactive rows rely on `--sg-rate-symbol-empty-opacity`.
 *
 * Vue `SgRate` accepts a string only (no slot/VNode override yet), so
 * the React SVG row is dropped here.
 */
import { SgRate } from '@skygraph/vue'
</script>

<template>
  <div style="display: grid; gap: 16px">
    <SgRate character="♥" :default-value="4" />
    <SgRate character="🔥" :default-value="3" />
    <SgRate character="✦" :default-value="4" />
  </div>
</template>
