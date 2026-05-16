<script setup lang="ts">
import { computed } from 'vue'
import { SgTag } from '@skygraph/vue'
import { statusColor } from './statusColors'

/** Reusable semantic-status tag used inside table cell scoped slots. */
const props = defineProps<{ value: unknown }>()

const color = computed(() => statusColor(String(props.value ?? '')))
const label = computed(() => String(props.value ?? ''))
</script>

<template>
  <SgTag v-if="label" :color="color">{{ label }}</SgTag>
</template>
