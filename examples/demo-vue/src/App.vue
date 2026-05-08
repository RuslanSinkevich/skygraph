<script setup lang="ts">
import { ref } from 'vue'
import { SgButton, SgInput, SgForm, SgField } from '@skygraph/vue'
import type { UseFormReturn } from '@skygraph/vue'

const text = ref('')
const lastSubmit = ref<{ values: Record<string, unknown>; valid: boolean } | null>(null)
const valuesPreview = ref<Record<string, unknown>>({})

function onSubmit(payload: { values: Record<string, unknown>; valid: boolean }) {
  lastSubmit.value = payload
}

function onValuesChange(values: Record<string, unknown>) {
  valuesPreview.value = values
}

function onCustomFormSubmit(form: UseFormReturn) {
  void form.submit()
}
</script>

<template>
  <div class="demo-container">
    <h1>SkyGraph Vue Adapter — MVP</h1>
    <p>
      Proof of concept: 5 composables (<code>useForm</code>, <code>useField</code>,
      <code>useTable</code>, <code>useTree</code>, <code>useGraph</code>) and 4
      base components built on <code>@skygraph/core</code> + <code>@skygraph/styles</code>.
    </p>

    <section class="demo-section">
      <h2>Buttons</h2>
      <div class="demo-row">
        <SgButton type="primary">Primary</SgButton>
        <SgButton type="default">Default</SgButton>
        <SgButton type="dashed">Dashed</SgButton>
        <SgButton type="text">Text</SgButton>
        <SgButton type="link">Link</SgButton>
      </div>
      <div class="demo-row">
        <SgButton type="primary" danger>Danger primary</SgButton>
        <SgButton danger>Danger default</SgButton>
        <SgButton type="primary" :loading="true">Loading</SgButton>
        <SgButton :disabled="true">Disabled</SgButton>
      </div>
      <div class="demo-row">
        <SgButton size="small">Small</SgButton>
        <SgButton size="middle">Middle</SgButton>
        <SgButton size="large">Large</SgButton>
      </div>
    </section>

    <section class="demo-section">
      <h2>Input (v-model)</h2>
      <div class="demo-row">
        <SgInput v-model="text" placeholder="Type something…" />
        <SgInput v-model="text" placeholder="Mirrored" allow-clear />
      </div>
      <p class="demo-meta">
        Live value: <strong>{{ text || '(empty)' }}</strong>
      </p>
    </section>

    <section class="demo-section">
      <h2>Form + Field + validation</h2>
      <SgForm
        v-slot="{ form }"
        :default-values="{ username: '', email: '' }"
        @submit="onSubmit"
        @values-change="onValuesChange"
      >
        <SgField
          name="username"
          label="Username"
          :rules="[{ required: true, message: 'username required' }]"
          v-slot="{ value, onChange, errors }"
        >
          <SgInput
            :model-value="String(value ?? '')"
            placeholder="username"
            :status="errors.length > 0 ? 'error' : undefined"
            @update:model-value="onChange"
          />
        </SgField>

        <SgField
          name="email"
          label="Email"
          :rules="[{ required: true }, { type: 'email', message: 'must be a valid email' }]"
          v-slot="{ value, onChange, errors }"
        >
          <SgInput
            :model-value="String(value ?? '')"
            placeholder="you@example.com"
            :status="errors.length > 0 ? 'error' : undefined"
            @update:model-value="onChange"
          />
        </SgField>

        <div class="demo-row">
          <SgButton type="primary" html-type="submit">Submit</SgButton>
          <SgButton @click="onCustomFormSubmit(form)">Submit (programmatic)</SgButton>
          <SgButton @click="form.reset()">Reset</SgButton>
        </div>

        <p class="demo-meta">
          Live values:
          <code>{{ JSON.stringify(form.values.value) }}</code>
        </p>
        <p class="demo-meta">
          State: dirty={{ form.isDirty.value }} • valid={{ form.isValid.value }} •
          submitting={{ form.isSubmitting.value }}
        </p>
      </SgForm>

      <p v-if="lastSubmit" class="demo-meta">
        Last <code>@submit</code> payload:
        <code>{{ JSON.stringify(lastSubmit) }}</code>
      </p>
      <p v-if="Object.keys(valuesPreview).length" class="demo-meta">
        Last <code>@values-change</code>:
        <code>{{ JSON.stringify(valuesPreview) }}</code>
      </p>
    </section>
  </div>
</template>
