<script setup lang="ts">
import { SgButton, SgConfigProvider, SgInput } from '@skygraph/vue'
</script>

<template>
  <SgConfigProvider size="large">
    <div style="display: flex; flex-direction: column; gap: 16px">
      <section>
        <h4
          style="
            margin: 0 0 8px;
            font-size: 13px;
            color: var(--sg-color-text-tertiary);
          "
        >
          Outer provider — size="large"
        </h4>
        <div style="display: flex; gap: 8px">
          <SgButton type="primary">Outer</SgButton>
          <SgInput placeholder="Large input" :style="{ width: '200px' }" />
        </div>
      </section>

      <SgConfigProvider size="small">
        <section>
          <h4
            style="
              margin: 0 0 8px;
              font-size: 13px;
              color: var(--sg-color-text-tertiary);
            "
          >
            Inner provider — size="small" overrides
          </h4>
          <div style="display: flex; gap: 8px">
            <SgButton type="primary">Inner</SgButton>
            <SgInput placeholder="Small input" :style="{ width: '200px' }" />
          </div>
        </section>
      </SgConfigProvider>

      <section>
        <h4
          style="
            margin: 0 0 8px;
            font-size: 13px;
            color: var(--sg-color-text-tertiary);
          "
        >
          Per-component prop always wins
        </h4>
        <div style="display: flex; gap: 8px">
          <SgButton type="primary" size="small">
            Explicit size="small"
          </SgButton>
          <SgInput
            size="middle"
            placeholder="Explicit middle"
            :style="{ width: '200px' }"
          />
        </div>
      </section>
    </div>
  </SgConfigProvider>
</template>
