<script setup lang="ts">
/**
 * `onClose` fires when the toast is actually removed — manually
 * via the × or by the auto-dismiss timer. Use it to release
 * resources, advance state, or chain follow-up notifications.
 */
import { ref } from 'vue'
import { SgButton, notification } from '@skygraph/vue'

const log = ref<string[]>([])

function fire() {
  notification.open({
    message: 'Close me',
    description: 'The parent receives a callback when this toast disappears.',
    duration: 2500,
    onClose: () => {
      log.value = [
        `closed at ${new Date().toLocaleTimeString()}`,
        ...log.value,
      ].slice(0, 5)
    },
  })
}
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <SgButton @click="fire">Fire + watch close</SgButton>
    <pre
      style="
        margin: 0;
        padding: 12px;
        background: var(--sg-color-bg-secondary);
        border-radius: var(--sg-border-radius);
        font-size: 12px;
        min-height: 60px;
      "
    >{{ log.length === 0 ? '// waiting for onClose…' : log.join('\n') }}</pre>
  </div>
</template>
