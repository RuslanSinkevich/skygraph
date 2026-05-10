<script setup lang="ts">
/**
 * Default OK / Cancel footer driven by `okHandler`, `okText`,
 * `cancelText` and `confirmLoading`. Pair it with
 * `<SgConfigProvider :locale="ruRU">` to translate the buttons
 * without touching props.
 */
import { ref } from 'vue'
import { SgButton, SgModal } from '@skygraph/vue'

const open = ref(false)
const loading = ref(false)

function show() {
  open.value = true
}

async function handleOk() {
  loading.value = true
  await new Promise((r) => setTimeout(r, 700))
  loading.value = false
  open.value = false
}
</script>

<template>
  <SgButton type="primary" @click="show">Open modal</SgButton>
  <SgModal
    :open="open"
    title="Save changes?"
    :ok-handler="handleOk"
    :confirm-loading="loading"
    @close="open = false"
  >
    <p>
      Footer buttons are rendered automatically because <code>okHandler</code>
      is set. Override labels with <code>okText</code> / <code>cancelText</code>
      or globally via <code>SgConfigProvider.locale.modal</code>.
    </p>
  </SgModal>
</template>
