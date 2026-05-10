<script setup lang="ts">
/**
 * `rows` sets the visible row count. Users can still drag the corner
 * to resize because the textarea uses native `resize: vertical`.
 */
import { ref } from 'vue'
import { SgTextarea } from '@skygraph/vue'

const value = ref('Bigger one')
</script>

<template>
  <SgTextarea v-model="value" :rows="6" style="max-width: 420px" />
</template>
