<script setup lang="ts">
import { StubShowcase, useShowcaseLocale } from '../_shared'

const locale = useShowcaseLocale()
const card = locale.cards['forms']
</script>

<template>
  <StubShowcase
    :title="card?.title ?? 'Forms Playground'"
    :description="card?.description ?? ''"
    react-key="forms"
    :tags="['Form', 'Field', 'Wizard', 'TagInput', 'PinInput', 'InlineEdit', 'Validation']"
  />
</template>
