<script setup lang="ts">
/**
 * Real-world styling example: centred login card. All layout lives in a
 * plain `.demo-login-card` wrapper — the form itself stays semantic and
 * untouched, which keeps it fully reusable.
 * Mirrors React `examples/demo/src/demos/form/LoginCard.demo.tsx`.
 */
import { SgForm, SgField, SgInput, SgSubmitButton } from '@skygraph/vue'
import './styles.css'

function onFinish(values: Record<string, unknown>) {
  // eslint-disable-next-line no-console
  console.log('login', values)
}
</script>

<template>
  <div style="display: flex; justify-content: center; padding: 20px 0">
    <SgForm
      layout="vertical"
      class="demo-login-card"
      :default-values="{ email: '', password: '', remember: false }"
      @finish="onFinish"
    >
      <div>
        <h3 class="demo-login-card-title">Welcome back</h3>
        <p class="demo-login-card-sub">Sign in to your SkyGraph account</p>
      </div>

      <SgField
        name="email"
        label="Email"
        :rules="[
          { required: true, message: 'Required' },
          { type: 'email', message: 'Invalid email' },
        ]"
      >
        <template #default="{ value, onChange, onBlur }">
          <SgInput
            type="email"
            :model-value="(value as string) ?? ''"
            placeholder="you@example.com"
            @update:model-value="onChange"
            @blur="onBlur"
          />
        </template>
      </SgField>
      <SgField
        name="password"
        label="Password"
        :rules="[
          { required: true, message: 'Required' },
          { min: 6, message: 'At least 6 characters' },
        ]"
      >
        <template #default="{ value, onChange, onBlur }">
          <SgInput
            type="password"
            :model-value="(value as string) ?? ''"
            placeholder="••••••••"
            @update:model-value="onChange"
            @blur="onBlur"
          />
        </template>
      </SgField>

      <div class="demo-login-card-links">
        <span />
        <a href="#forgot" @click.prevent>Forgot password?</a>
      </div>

      <SgSubmitButton style="width: 100%">Sign in</SgSubmitButton>

      <div class="demo-login-card-links" style="justify-content: center">
        <span style="color: var(--sg-color-text-tertiary)">
          New here?&nbsp;
          <a href="#signup" @click.prevent>Create an account</a>
        </span>
      </div>
    </SgForm>
  </div>
</template>
