<script setup lang="ts">
import { ref } from 'vue'
import {
  SgButton,
  SgInput,
  SgInputNumber,
  SgTextarea,
  SgSelect,
  SgCheckbox,
  SgSegmented,
  SgForm,
  SgField,
  SgInputPassword,
  SgInputGroup,
  notification,
} from '@skygraph/vue'
import { useAppLocale } from '../_shared'

const v = useAppLocale('forms').validation
const section = ref<'rules' | 'auth-forms'>('rules')
const mode = ref<'login' | 'register' | 'forgot'>('login')

function onRulesFinish(values: Record<string, unknown>) {
  notification.success(v.submittedToast, JSON.stringify(values, null, 2))
}

function onLogin(values: Record<string, unknown>) {
  notification.success(v.auth.loginToast, JSON.stringify(values))
}

function onRegister(values: Record<string, unknown>) {
  notification.success(v.auth.registerToast, JSON.stringify(values))
}

function onReset(values: Record<string, unknown>) {
  notification.success(v.auth.resetToast, JSON.stringify(values))
}
</script>

<template>
  <div class="forms-section">
    <SgSegmented
      :value="section"
      :options="[
        { label: v.sections.rules, value: 'rules' },
        { label: v.sections.authForms, value: 'auth-forms' },
      ]"
      :style="{ marginBottom: '16px' }"
      @change="(val: string | number) => (section = String(val) as 'rules' | 'auth-forms')"
    />

    <!-- Rules demo -->
    <div v-if="section === 'rules'" class="forms-section">
      <p style="color: var(--sg-color-text-secondary); margin-bottom: 16px">{{ v.rulesLead }}</p>
      <SgForm layout="vertical" required-mark scroll-to-first-error @finish="onRulesFinish">
        <div class="forms-grid">
          <div class="forms-cell">
            <SgField
              name="username"
              :label="v.fields.username"
              required
              :rules="[
                { required: true, message: v.fields.usernameRequired },
                { min: 3, message: v.fields.usernameMin },
                { max: 20, message: v.fields.usernameMax },
                { pattern: /^[a-zA-Z0-9_]+$/, message: v.fields.usernamePattern },
              ]"
            >
              <template #default="{ value, onChange, onBlur }">
                <SgInput
                  :value="(value as string) ?? ''"
                  :placeholder="v.fields.usernamePlaceholder"
                  @update:model-value="onChange"
                  @blur="onBlur"
                />
              </template>
            </SgField>
          </div>
          <div class="forms-cell">
            <SgField
              name="email"
              :label="v.fields.email"
              required
              :rules="[
                { required: true, message: v.fields.emailRequired },
                { type: 'email', message: v.fields.emailInvalid },
              ]"
            >
              <template #default="{ value, onChange, onBlur }">
                <SgInput
                  :value="(value as string) ?? ''"
                  :placeholder="v.fields.emailPlaceholder"
                  @update:model-value="onChange"
                  @blur="onBlur"
                />
              </template>
            </SgField>
          </div>
          <div class="forms-cell">
            <SgField
              name="password"
              :label="v.fields.password"
              required
              :rules="[
                { required: true, message: v.fields.passwordRequired },
                { min: 8, message: v.fields.passwordMin },
              ]"
            >
              <template #default="{ value, onChange, onBlur }">
                <SgInputPassword
                  :value="(value as string) ?? ''"
                  :placeholder="v.fields.passwordPlaceholder"
                  show-strength
                  @update:model-value="onChange"
                  @blur="onBlur"
                />
              </template>
            </SgField>
          </div>
          <div class="forms-cell">
            <SgField
              name="age"
              :label="v.fields.age"
              :rules="[{ type: 'number', min: 18, max: 120, message: v.fields.ageRange }]"
            >
              <template #default="{ value, onChange, onBlur }">
                <SgInputNumber
                  :value="value as number"
                  :min="0"
                  :max="200"
                  :placeholder="v.fields.agePlaceholder"
                  :style="{ width: '100%' }"
                  @update:model-value="onChange"
                  @blur="onBlur"
                />
              </template>
            </SgField>
          </div>
          <div class="forms-cell">
            <SgField
              name="website"
              :label="v.fields.website"
              :rules="[{ type: 'url', message: v.fields.websiteUrl }]"
              :help="v.fields.websiteHelp"
            >
              <template #default="{ value, onChange, onBlur }">
                <SgInputGroup before="https://">
                  <SgInput
                    :value="(value as string) ?? ''"
                    :placeholder="v.fields.websitePlaceholder"
                    @update:model-value="onChange"
                    @blur="onBlur"
                  />
                </SgInputGroup>
              </template>
            </SgField>
          </div>
          <div class="forms-cell">
            <SgField
              name="role"
              :label="v.fields.role"
              required
              :rules="[{ required: true, message: v.fields.rolePick }]"
            >
              <template #default="{ value, onChange, onBlur }">
                <SgSelect
                  :value="value as string"
                  :options="[
                    { label: v.roleOptions.developer, value: 'dev' },
                    { label: v.roleOptions.designer, value: 'design' },
                    { label: v.roleOptions.manager, value: 'manager' },
                    { label: v.roleOptions.qa, value: 'qa' },
                  ]"
                  :placeholder="v.fields.rolePlaceholder"
                  @update:model-value="onChange"
                  @blur="onBlur"
                />
              </template>
            </SgField>
          </div>
          <div class="forms-cell" style="grid-column: span 2">
            <SgField
              name="bio"
              :label="v.fields.bio"
              :rules="[{ max: 200, message: v.fields.bioMax }]"
              :warning-rules="[{ min: 20, message: v.fields.bioWarn }]"
              :extra="v.fields.bioExtra"
            >
              <template #default="{ value, onChange, onBlur }">
                <SgTextarea
                  :value="(value as string) ?? ''"
                  :placeholder="v.fields.bioPlaceholder"
                  @update:model-value="onChange"
                  @blur="onBlur"
                />
              </template>
            </SgField>
          </div>
          <div class="forms-cell">
            <SgField
              name="agree"
              required
              :rules="[{ validator: (val: unknown) => (val ? null : v.fields.agreeRequired) }]"
            >
              <template #default="{ value, onChange }">
                <SgCheckbox :model-value="value as boolean" @update:model-value="onChange">
                  {{ v.fields.agree }}
                </SgCheckbox>
              </template>
            </SgField>
          </div>
        </div>
        <div style="display: flex; gap: 8px; margin-top: 20px">
          <SgButton type="primary" html-type="submit">{{ v.submit }}</SgButton>
          <SgButton html-type="reset">{{ v.reset }}</SgButton>
        </div>
      </SgForm>
    </div>

    <!-- Mockups demo -->
    <div v-else class="forms-section">
      <div class="mockup-container">
        <div class="mockup-card">
          <div class="mockup-header">
            <div style="font-size: 24px; font-weight: 700">{{ v.auth.brand }}</div>
            <SgSegmented
              :value="mode"
              :options="[
                { label: v.auth.modes.login, value: 'login' },
                { label: v.auth.modes.register, value: 'register' },
                { label: v.auth.modes.forgot, value: 'forgot' },
              ]"
              size="small"
              @change="
                (val: string | number) => (mode = String(val) as 'login' | 'register' | 'forgot')
              "
            />
          </div>

          <SgForm v-if="mode === 'login'" layout="vertical" @finish="onLogin">
            <SgField
              name="email"
              :label="v.auth.loginEmail"
              required
              :rules="[{ required: true }, { type: 'email' }]"
            >
              <template #default="{ value, onChange, onBlur }">
                <SgInput
                  :value="(value as string) ?? ''"
                  :placeholder="v.auth.loginEmailPlaceholder"
                  @update:model-value="onChange"
                  @blur="onBlur"
                />
              </template>
            </SgField>
            <SgField
              name="password"
              :label="v.auth.loginPassword"
              required
              :rules="[{ required: true }]"
            >
              <template #default="{ value, onChange, onBlur }">
                <SgInputPassword
                  :value="(value as string) ?? ''"
                  :placeholder="v.auth.loginPasswordPlaceholder"
                  @update:model-value="onChange"
                  @blur="onBlur"
                />
              </template>
            </SgField>
            <div class="form-row-flex">
              <SgCheckbox>{{ v.auth.rememberMe }}</SgCheckbox>
              <a class="form-link" @click="mode = 'forgot'">{{ v.auth.forgotLink }}</a>
            </div>
            <SgButton
              type="primary"
              html-type="submit"
              :style="{ width: '100%', marginTop: '8px' }"
              >{{ v.auth.signIn }}</SgButton
            >
          </SgForm>

          <SgForm v-else-if="mode === 'register'" layout="vertical" @finish="onRegister">
            <div class="forms-grid" style="grid-template-columns: 1fr 1fr">
              <div class="forms-cell">
                <SgField
                  name="firstName"
                  :label="v.auth.firstName"
                  required
                  :rules="[{ required: true }]"
                >
                  <template #default="{ value, onChange, onBlur }">
                    <SgInput
                      :value="(value as string) ?? ''"
                      :placeholder="v.auth.firstNamePlaceholder"
                      @update:model-value="onChange"
                      @blur="onBlur"
                    />
                  </template>
                </SgField>
              </div>
              <div class="forms-cell">
                <SgField
                  name="lastName"
                  :label="v.auth.lastName"
                  required
                  :rules="[{ required: true }]"
                >
                  <template #default="{ value, onChange, onBlur }">
                    <SgInput
                      :value="(value as string) ?? ''"
                      :placeholder="v.auth.lastNamePlaceholder"
                      @update:model-value="onChange"
                      @blur="onBlur"
                    />
                  </template>
                </SgField>
              </div>
            </div>
            <SgField
              name="email"
              :label="v.auth.loginEmail"
              required
              :rules="[{ required: true }, { type: 'email' }]"
            >
              <template #default="{ value, onChange, onBlur }">
                <SgInput
                  :value="(value as string) ?? ''"
                  :placeholder="v.auth.regEmailPlaceholder"
                  @update:model-value="onChange"
                  @blur="onBlur"
                />
              </template>
            </SgField>
            <SgField
              name="password"
              :label="v.auth.loginPassword"
              required
              :rules="[{ required: true }, { min: 8 }]"
            >
              <template #default="{ value, onChange, onBlur }">
                <SgInputPassword
                  :value="(value as string) ?? ''"
                  :placeholder="v.auth.regPasswordPlaceholder"
                  show-strength
                  @update:model-value="onChange"
                  @blur="onBlur"
                />
              </template>
            </SgField>
            <SgField
              name="agree"
              required
              :rules="[{ validator: (val: unknown) => (val ? null : v.auth.agreeRequired) }]"
            >
              <template #default="{ value, onChange }">
                <SgCheckbox :model-value="value as boolean" @update:model-value="onChange">
                  {{ v.auth.agreeTerms }}
                </SgCheckbox>
              </template>
            </SgField>
            <SgButton
              type="primary"
              html-type="submit"
              :style="{ width: '100%', marginTop: '8px' }"
              >{{ v.auth.createAccount }}</SgButton
            >
          </SgForm>

          <SgForm v-else-if="mode === 'forgot'" layout="vertical" @finish="onReset">
            <p style="color: var(--sg-color-text-secondary); margin-bottom: 16px; font-size: 13px">
              {{ v.auth.forgotLead }}
            </p>
            <SgField
              name="email"
              :label="v.auth.loginEmail"
              required
              :rules="[{ required: true }, { type: 'email' }]"
            >
              <template #default="{ value, onChange, onBlur }">
                <SgInput
                  :value="(value as string) ?? ''"
                  :placeholder="v.auth.loginEmailPlaceholder"
                  @update:model-value="onChange"
                  @blur="onBlur"
                />
              </template>
            </SgField>
            <SgButton
              type="primary"
              html-type="submit"
              :style="{ width: '100%', marginTop: '8px' }"
              >{{ v.auth.sendReset }}</SgButton
            >
            <div style="text-align: center; margin-top: 12px">
              <a class="form-link" @click="mode = 'login'">{{ v.auth.backToLogin }}</a>
            </div>
          </SgForm>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.form-row-flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 8px 0;
}
.form-link {
  font-size: 13px;
  color: var(--sg-color-primary);
  cursor: pointer;
}
</style>
