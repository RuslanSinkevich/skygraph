<script setup lang="ts">
/**
 * Distributed composition — three nested components sharing one form
 * context. Root holds `<SgForm>`, middle wraps a section card, leaf
 * renders the actual `<SgField>` nodes. No prop-drilling of values.
 */
import { defineComponent, h } from 'vue'
import { SgForm, SgField, SgInput, SgButton } from '@skygraph/vue'

const Leaf = defineComponent({
  props: { name: { type: String, required: true }, label: { type: String, required: true } },
  setup(props) {
    return () =>
      h(SgField as never, { name: props.name, label: props.label }, {
        default: ({ value, onChange }: { value: unknown; onChange: (v: unknown) => void }) =>
          h(SgInput as never, {
            value: (value as string) ?? '',
            'onUpdate:modelValue': onChange,
          }),
      })
  },
})

const Section = defineComponent({
  props: { title: { type: String, required: true } },
  setup(props, { slots }) {
    return () =>
      h(
        'div',
        {
          style: 'border:1px solid var(--sg-color-border); border-radius:8px; padding:12px; margin-bottom:12px',
        },
        [
          h('div', { style: 'font-weight:600; margin-bottom:8px' }, props.title),
          slots.default?.(),
        ],
      )
  },
})
</script>

<template>
  <SgForm :default-values="{ first: '', last: '', email: '' }">
    <Section title="Personal info">
      <Leaf name="first" label="First name" />
      <Leaf name="last" label="Last name" />
    </Section>
    <Section title="Contacts">
      <Leaf name="email" label="Email" />
    </Section>
    <SgButton type="primary" htmlType="submit">Save</SgButton>
  </SgForm>
</template>
