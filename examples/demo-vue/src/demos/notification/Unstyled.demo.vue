<script setup lang="ts">
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
