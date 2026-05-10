<script setup lang="ts">
import { computed, defineComponent, h } from 'vue'
import { SgConfigProvider, useConfig } from '@skygraph/vue'

/**
 * Inline helper component — reads the merged config via `useConfig()` and
 * renders it as JSON. Kept in this file so the `?raw` source preview shows
 * the whole demo end-to-end.
 */
const CurrentConfig = defineComponent({
  name: 'CurrentConfigSnapshot',
  setup() {
    const config = useConfig()
    const snapshot = computed(() =>
      JSON.stringify(
        {
          size: config.value.size,
          disabled: config.value.disabled,
          bordered: config.value.bordered,
          locale: config.value.locale,
        },
        null,
        2,
      ),
    )
    return () =>
      h(
        'pre',
        {
          style: {
            margin: 0,
            padding: '12px',
            background: 'var(--sg-color-bg-secondary)',
            borderRadius: 'var(--sg-border-radius)',
            fontSize: '12px',
            overflow: 'auto',
          },
        },
        snapshot.value,
      )
  },
})
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <div>
      <h4
        style="
          margin: 0 0 6px;
          font-size: 13px;
          color: var(--sg-color-text-tertiary);
        "
      >
        No provider
      </h4>
      <CurrentConfig />
    </div>
    <SgConfigProvider size="large" :disabled="true" :bordered="true">
      <div>
        <h4
          style="
            margin: 0 0 6px;
            font-size: 13px;
            color: var(--sg-color-text-tertiary);
          "
        >
          Inside &lt;SgConfigProvider size="large" disabled bordered&gt;
        </h4>
        <CurrentConfig />
      </div>
    </SgConfigProvider>
  </div>
</template>
