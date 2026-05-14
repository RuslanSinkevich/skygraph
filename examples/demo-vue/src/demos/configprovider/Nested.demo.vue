<script setup lang="ts">
import { SgButton, SgConfigProvider, SgInput } from '@skygraph/vue'
</script>

<template>
  <SgConfigProvider size="large">
    <div class="demo-stack">
      <section>
        <h4 class="demo-section-label">Outer provider — size="large"</h4>
        <div class="demo-row">
          <SgButton type="primary">Outer</SgButton>
          <SgInput placeholder="Large input" :style="{ width: '200px' }" />
        </div>
      </section>

      <SgConfigProvider size="small">
        <section>
          <h4 class="demo-section-label">Inner provider — size="small" overrides</h4>
          <div class="demo-row">
            <SgButton type="primary">Inner</SgButton>
            <SgInput placeholder="Small input" :style="{ width: '200px' }" />
          </div>
        </section>
      </SgConfigProvider>

      <section>
        <h4 class="demo-section-label">Per-component prop always wins</h4>
        <div class="demo-row">
          <SgButton type="primary" size="small"> Explicit size="small" </SgButton>
          <SgInput size="middle" placeholder="Explicit middle" :style="{ width: '200px' }" />
        </div>
      </section>
    </div>
  </SgConfigProvider>
</template>

<style scoped>
.demo-stack {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.demo-row {
  display: flex;
  gap: 8px;
}
.demo-section-label {
  margin: 0 0 8px;
  font-size: 13px;
  color: var(--sg-color-text-tertiary);
}
</style>
