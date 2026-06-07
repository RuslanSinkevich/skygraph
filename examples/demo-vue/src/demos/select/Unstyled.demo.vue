<script setup lang="ts">
import { SgSelect } from '@skygraph/vue'
import { cityOptions } from './data'
</script>

<template>
  <SgSelect
    unstyled
    placeholder="Native select"
    :options="cityOptions"
    default-value="berlin"
    style="padding: 6px 10px; border-radius: 4px"
  />
</template>
