<script setup lang="ts">
/**
 * `useWatch(core, path)` subscribes a component to a single field path and
 * re-renders only when that value changes — zero re-renders for siblings.
 * Great for live previews, derived summaries, and conditional UI.
 * Mirrors React `examples/demo/src/demos/form/LiveWatch.demo.tsx`.
 */
import { defineComponent, h, inject, computed } from 'vue'
import {
  SgForm,
  SgField,
  SgInput,
  SgSelect,
  SgSubmitButton,
  useWatch,
  formContextKey,
  type FormContextValue,
} from '@skygraph/vue'
import { roleOptions } from './shared'
import './styles.css'

const LiveState = defineComponent({
  setup() {
    const ctx = inject(formContextKey) as FormContextValue
    const name = useWatch(ctx.core, 'name')
    const email = useWatch(ctx.core, 'email')
    const role = useWatch(ctx.core, 'role')

    const entries = computed<Array<[string, unknown]>>(() => [
      ['name', name.value],
      ['email', email.value],
      ['role', role.value],
    ])

    return () =>
      h('div', { class: 'demo-live-state' }, [
        h('div', { class: 'demo-live-state-title' }, 'useWatch — live values'),
        h(
          'div',
          { class: 'demo-live-state-row' },
          entries.value.map(([key, val]) =>
            h('span', { key }, [
              h('span', { class: 'demo-live-state-key' }, key),
              ': ',
              h(
                'span',
                { class: 'demo-live-state-value' },
                val === '' ? '""' : JSON.stringify(val ?? null),
              ),
            ]),
          ),
        ),
      ])
  },
})

function onFinish(values: Record<string, unknown>) {
  // eslint-disable-next-line no-console
  console.log(values)
}
</script>

<template>
  <SgForm layout="vertical" :default-values="{ name: '', email: '', role: '' }" @finish="onFinish">
    <LiveState />
    <SgField name="name" label="Name" :rules="[{ required: true, message: 'Required' }]">
      <template #default="{ value, onChange, onBlur }">
        <SgInput
          :model-value="(value as string) ?? ''"
          @update:model-value="onChange"
          @blur="onBlur"
        />
      </template>
    </SgField>
    <SgField name="email" label="Email">
      <template #default="{ value, onChange, onBlur }">
        <SgInput
          type="email"
          :model-value="(value as string) ?? ''"
          @update:model-value="onChange"
          @blur="onBlur"
        />
      </template>
    </SgField>
    <SgField name="role" label="Role">
      <template #default="{ value, onChange }">
        <SgSelect
          :value="value as string"
          :options="roleOptions"
          placeholder="Pick one"
          @update:model-value="onChange"
        />
      </template>
    </SgField>
    <SgSubmitButton>Save</SgSubmitButton>
  </SgForm>
</template>
