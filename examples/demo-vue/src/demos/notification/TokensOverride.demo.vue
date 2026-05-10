<script setup lang="ts">
/**
 * Toasts read global tokens at mount time. Override them on
 * `:root` or a high-level wrapper that also contains a
 * `<SgNotificationContainer/>`. The buttons below preview the
 * current cascade — there is no per-call token override.
 */
import { SgButton, notification } from '@skygraph/vue'
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <p style="margin: 0; font-size: 13px; color: var(--sg-color-text-secondary)">
      Toasts read global tokens at mount time. Override them on
      <code>:root</code> or a high-level wrapper that also contains
      <code>&lt;SgNotificationContainer/&gt;</code>. The Theming page has
      live toggles — use the buttons below to preview the current cascade.
    </p>
    <pre
      style="
        margin: 0;
        padding: 12px;
        background: var(--sg-color-bg-secondary);
        border-radius: var(--sg-border-radius);
        font-size: 12px;
        overflow: auto;
      "
    >{{ `:root {
  --sg-color-success: #16a34a;
  --sg-color-success-bg: rgba(22, 163, 74, 0.12);
  --sg-color-bg-elevated: #ffffff;
  --sg-shadow-lg: 0 8px 24px rgba(15, 23, 42, 0.12);
  --sg-z-notification: 1010;
}` }}</pre>
    <div style="display: flex; gap: 8px; flex-wrap: wrap">
      <SgButton
        @click="notification.success('Cascade check', 'Success tint reflects the current theme.')"
      >
        Fire success
      </SgButton>
      <SgButton
        @click="notification.error('Cascade check', 'Error tint reflects the current theme.')"
      >
        Fire error
      </SgButton>
    </div>
  </div>
</template>
