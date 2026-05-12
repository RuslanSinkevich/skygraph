<script setup lang="ts">
/**
 * Async validators return a Promise. The field shows the spinner while the
 * validator runs and then the final status. The fake API below rejects
 * `admin` / `root` / `skygraph` to mimic a "username taken" check.
 * Mirrors React `examples/demo/src/demos/form/AsyncValidation.demo.tsx`.
 */
import { SgForm, SgField, SgInput, SgSubmitButton } from '@skygraph/vue'

const takenUsernames = new Set(['admin', 'root', 'skygraph'])

function checkUsername(name: string): Promise<string | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (!name) resolve('Username is required')
      else if (takenUsernames.has(name)) resolve(`"${name}" is already taken`)
      else resolve(null)
    }, 700)
  })
}

function onFinish(values: Record<string, unknown>) {
  // eslint-disable-next-line no-console
  console.log(values)
}
</script>

<template>
  <SgForm
    layout="vertical"
    :default-values="{ username: '' }"
    validate-trigger="blur"
    style="max-width: 420px"
    @finish="onFinish"
  >
    <SgField
      name="username"
      label="Username"
      extra='Try "admin" or "root" to see the error state.'
      :rules="[
        { required: true, message: 'Username is required' },
        { validator: (value: unknown) => checkUsername(String(value ?? '')) },
      ]"
    >
      <template #default="{ value, onChange, onBlur }">
        <SgInput
          :model-value="(value as string) ?? ''"
          placeholder="Pick a unique handle"
          @update:model-value="onChange"
          @blur="onBlur"
        />
      </template>
    </SgField>
    <SgSubmitButton>Reserve name</SgSubmitButton>
  </SgForm>
</template>
