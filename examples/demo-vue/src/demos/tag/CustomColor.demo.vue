<script setup lang="ts">
/**
 * Any non-preset string is passed through as a raw CSS colour and
 * applied to both background and border — the text flips to white
 * for contrast. Hex, rgb, hsl, and CSS colour names all work.
 */
import { SgTag } from '@skygraph/vue'
</script>

<template>
  <div style="display: flex; gap: 8px; flex-wrap: wrap">
    <SgTag color="#f50">#f50</SgTag>
    <SgTag color="#2db7f5">#2db7f5</SgTag>
    <SgTag color="#87d068">#87d068</SgTag>
    <SgTag color="rgb(124, 58, 237)">rgb(124, 58, 237)</SgTag>
    <SgTag color="teal">teal</SgTag>
  </div>
</template>
