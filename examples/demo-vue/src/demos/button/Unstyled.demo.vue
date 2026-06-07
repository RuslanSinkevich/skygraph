<script setup lang="ts">
import { SgButton } from '@skygraph/vue'
</script>

<template>
  <div style="display: flex; gap: 10px; flex-wrap: wrap">
    <SgButton unstyled class="demo-pill-btn">Custom pill</SgButton>
    <SgButton unstyled class="demo-pill-btn" disabled>Disabled pill</SgButton>
    <SgButton unstyled class="demo-pill-btn" loading>Loading pill</SgButton>
  </div>
</template>

<style>
.demo-pill-btn {
  background: linear-gradient(90deg, #6366f1, #8b5cf6);
  color: white;
  border: none;
  border-radius: 999px;
  padding: 10px 24px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
}
.demo-pill-btn:hover {
  filter: brightness(1.1);
}
.demo-pill-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
