<script setup lang="ts">
import { computed, ref } from 'vue'
import { SgSelect, SgTag, SgTimeline, type TimelineItem } from '@skygraph/vue'
import { activities, contacts } from './data'
import type { Activity } from './data'
import { Toolbar, useAppLocale } from '../_shared'

const av = useAppLocale('crm').activity
const type = ref<string>('all')

const typeIcons: Record<Activity['type'], string> = {
  call: '📞',
  email: '📧',
  meeting: '🤝',
  note: '📝',
}

const colors: Record<Activity['type'], string> = {
  call: 'blue',
  email: 'green',
  meeting: 'orange',
  note: 'gray',
}

const filtered = computed(() =>
  type.value === 'all' ? activities : activities.filter((a) => a.type === type.value),
)

const timelineItems = computed<TimelineItem[]>(() =>
  filtered.value.slice(0, 30).map((a) => {
    const contact = contacts.find((c) => c.id === a.contactId)
    return {
      content: `${typeIcons[a.type]} ${a.description} — ${contact?.name ?? '—'} (${a.date})`,
      color: colors[a.type],
    }
  }),
)

const selectOptions = computed(() => [
  { label: av.typeFilterAll, value: 'all' },
  { label: `📞 ${av.typeFilters.call}`, value: 'call' },
  { label: `📧 ${av.typeFilters.email}`, value: 'email' },
  { label: `🤝 ${av.typeFilters.meeting}`, value: 'meeting' },
  { label: `📝 ${av.typeFilters.note}`, value: 'note' },
])
</script>

<template>
  <Toolbar hide-search>
    <template #filters>
      <SgSelect
        :value="type"
        :options="selectOptions"
        :style="{ width: '160px' }"
        @change="(v) => (type = String(v))"
      />
    </template>
    <template #actions>
      <SgTag>{{ av.countLabel(filtered.length) }}</SgTag>
    </template>
  </Toolbar>
  <SgTimeline :items="timelineItems" />
</template>
