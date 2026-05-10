<script setup lang="ts">
/**
 * Drop all `sg-notification-*` classes from cards and the
 * container. The store + container logic stays — bring your own
 * layout / animation. A dedicated headless container is mounted
 * at `bottomLeft` below — fire a toast with that placement to
 * see it.
 */
import { SgButton, SgNotificationContainer, notification } from '@skygraph/vue'

function fire() {
  notification.open({
    type: 'info',
    placement: 'bottomLeft',
    message: 'Headless toast',
    description: 'No sg-* classes on card or container.',
    duration: 3000,
  })
}
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <p style="margin: 0; font-size: 13px; color: var(--sg-color-text-secondary)">
      Drop all <code>sg-notification-*</code> classes from cards and the
      container. Bring your own layout / animation. A dedicated headless
      container is mounted at <code>bottomLeft</code> below — fire a toast
      with that placement to see it.
    </p>
    <div
      style="
        position: relative;
        padding: 12px;
        border-radius: 8px;
        border: 1px dashed var(--sg-color-border);
        min-height: 120px;
      "
    >
      <SgNotificationContainer placement="bottomLeft" unstyled />
    </div>
    <div>
      <SgButton @click="fire">Fire headless toast</SgButton>
    </div>
  </div>
</template>
