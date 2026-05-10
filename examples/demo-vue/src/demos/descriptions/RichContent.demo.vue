<script setup lang="ts">
/**
 * `DescriptionsItem.value` is `string` only in `@skygraph/vue` —
 * no slot for VNode content. The React analogue puts `Tag`,
 * `Badge` and `<strong>` into `children`. We mimic visually by
 * passing pre-formatted strings ("Pro annual", "Active",
 * "12 / 25"). See `findings` →
 * `descriptions-rich-content-no-vue` for the follow-up.
 */
import { SgDescriptions, type DescriptionsItem } from '@skygraph/vue'

const items: DescriptionsItem[] = [
  { label: 'Plan', value: 'Pro annual' },
  { label: 'Status', value: '● Active' },
  { label: 'Seats', value: '12 / 25' },
  { label: 'Renewal', value: '2027-04-01', span: 2 },
]
</script>

<template>
  <SgDescriptions bordered :column="2" title="Subscription" :items="items" />
</template>
