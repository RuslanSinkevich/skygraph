<script setup lang="ts">
/**
 * Floating-label inputs built on plain CSS — no core changes.
 *
 * Trick: pass `placeholder=" "` (a single space) so `:placeholder-shown`
 * fires only while the field is empty, then float the label up via
 * `:has(input:focus)` and `:has(input:not(:placeholder-shown))`.
 *
 * Mirrors React `input/FloatingLabel.demo.tsx`.
 */
import { ref } from 'vue'
import { SgInput } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    outlined: 'Outlined',
    filled: 'Filled',
    email: 'Email',
    password: 'Password',
    fullName: 'Full name',
    company: 'Company',
  },
  ru: {
    outlined: 'Контурный',
    filled: 'С заливкой',
    email: 'Email',
    password: 'Пароль',
    fullName: 'ФИО',
    company: 'Компания',
  },
} as const

const t = useDemoStrings(STRINGS)
const outName = ref('')
const outCompany = ref('Acme Inc.')
const filEmail = ref('')
const filPwd = ref('')
</script>

<template>
  <div
    style="
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: 24px;
      max-width: 640px;
    "
  >
    <div style="display: flex; flex-direction: column; gap: 14px">
      <span class="demo-float-strip-label">{{ t.outlined }}</span>
      <div class="demo-float demo-float-outlined">
        <SgInput v-model="outName" placeholder=" " />
        <label class="demo-float-label">{{ t.fullName }}</label>
      </div>
      <div class="demo-float demo-float-outlined">
        <SgInput v-model="outCompany" placeholder=" " />
        <label class="demo-float-label">{{ t.company }}</label>
      </div>
    </div>

    <div style="display: flex; flex-direction: column; gap: 14px">
      <span class="demo-float-strip-label">{{ t.filled }}</span>
      <div class="demo-float demo-float-filled">
        <SgInput v-model="filEmail" type="email" placeholder=" " />
        <label class="demo-float-label">{{ t.email }}</label>
      </div>
      <div class="demo-float demo-float-filled">
        <SgInput v-model="filPwd" type="password" placeholder=" " />
        <label class="demo-float-label">{{ t.password }}</label>
      </div>
    </div>
  </div>
</template>

<style>
.demo-float-strip-label {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--sg-color-text-tertiary);
}

.demo-float {
  position: relative;
  width: 100%;
}
.demo-float-label {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 14px;
  color: var(--sg-color-text-secondary);
  pointer-events: none;
  transition:
    top 180ms cubic-bezier(0.4, 0, 0.2, 1),
    transform 180ms cubic-bezier(0.4, 0, 0.2, 1),
    font-size 180ms cubic-bezier(0.4, 0, 0.2, 1),
    color 180ms ease;
  white-space: nowrap;
}

.demo-float-outlined .sg-input {
  --sg-input-height: 48px;
  --sg-input-padding: 18px 14px 6px;
}
.demo-float-outlined .demo-float-label {
  background: var(--sg-color-bg-container);
  padding: 0 4px;
}
.demo-float-outlined:has(.sg-input:focus) .demo-float-label,
.demo-float-outlined:has(.sg-input:not(:placeholder-shown)) .demo-float-label {
  top: 0;
  transform: translateY(-50%) scale(0.85);
  transform-origin: left center;
  color: var(--sg-color-primary);
}

.demo-float-filled .sg-input {
  --sg-input-height: 48px;
  --sg-input-padding: 18px 14px 6px;
  --sg-input-bg: #f1f5f9;
  --sg-input-border: transparent;
  border-bottom: 2px solid var(--sg-color-border) !important;
  border-radius: var(--sg-border-radius) var(--sg-border-radius) 0 0;
}
.demo-float-filled .sg-input:hover {
  --sg-input-bg: #e2e8f0;
}
.demo-float-filled .sg-input:focus {
  --sg-input-bg: #eef2ff;
  border-bottom-color: var(--sg-color-primary) !important;
  box-shadow: none;
}
.demo-float-filled:has(.sg-input:focus) .demo-float-label,
.demo-float-filled:has(.sg-input:not(:placeholder-shown)) .demo-float-label {
  top: 10px;
  transform: translateY(-50%) scale(0.78);
  transform-origin: left center;
  color: var(--sg-color-primary);
}
</style>
