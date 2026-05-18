<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  SgButton,
  SgInput,
  SgCheckbox,
  SgRadio,
  SgSwitch,
  SgSegmented,
  SgTagInput,
  SgInputGroup,
  SgSteps,
  SgTag,
  notification,
} from '@skygraph/vue'
import { useAppLocale } from '../_shared'

interface WizardData {
  fullName: string
  email: string
  phone: string
  company: string
  position: string
  skills: string[]
  experience: string
  plan: string
  notifications: boolean
  newsletter: boolean
}

const defaultWizard: WizardData = {
  fullName: '',
  email: '',
  phone: '',
  company: '',
  position: '',
  skills: [],
  experience: 'junior',
  plan: 'free',
  notifications: true,
  newsletter: false,
}

const s = useAppLocale('forms').schema
const f = s.fields
const step = ref(0)
const data = ref<WizardData>({ ...defaultWizard })
const completed = ref(false)

function patch(partial: Partial<WizardData>) {
  data.value = { ...data.value, ...partial }
}

function canNext(): boolean {
  if (step.value === 0) return data.value.fullName.length >= 2 && data.value.email.includes('@')
  if (step.value === 1) return data.value.company.length >= 1
  return true
}

function handleFinish() {
  completed.value = true
  notification.success(s.completedToast, JSON.stringify(data.value, null, 2))
}

function planLabel(plan: string): string {
  if (plan === 'free') return f.planOptions.free
  if (plan === 'pro') return f.planOptions.pro
  if (plan === 'enterprise') return f.planOptions.enterprise
  return plan
}
function expLabel(exp: string): string {
  if (exp === 'junior') return f.experienceLevels.junior
  if (exp === 'middle') return f.experienceLevels.middle
  if (exp === 'senior') return f.experienceLevels.senior
  if (exp === 'lead') return f.experienceLevels.lead
  return exp
}

function restart() {
  step.value = 0
  data.value = { ...defaultWizard }
  completed.value = false
}

const planTagColor = computed(() =>
  data.value.plan === 'enterprise'
    ? 'warning'
    : data.value.plan === 'pro'
      ? 'processing'
      : 'default',
)
</script>

<template>
  <div v-if="completed" class="forms-section" style="text-align: center; padding: 40px">
    <div style="font-size: 48px; margin-bottom: 16px">✓</div>
    <h3>{{ s.completedHeading }}</h3>
    <p style="color: var(--sg-color-text-secondary); margin-bottom: 20px">
      {{ s.completedLead(data.fullName, planLabel(data.plan)) }}
    </p>
    <div style="display: flex; gap: 8px; justify-content: center">
      <SgButton type="primary" @click="restart">{{ s.startOver }}</SgButton>
    </div>
  </div>

  <div v-else class="forms-section">
    <p style="color: var(--sg-color-text-secondary); margin-bottom: 16px; font-size: 13px">
      {{ s.intro }}
    </p>
    <SgSteps
      :current="step"
      :items="[
        { title: s.steps.personal },
        { title: s.steps.professional },
        { title: s.steps.preferences },
        { title: s.steps.review },
      ]"
    />
    <div class="wizard-content">
      <div v-if="step === 0" class="forms-grid" style="margin-top: 24px">
        <div class="forms-cell">
          <label class="forms-label">{{ f.fullName }}</label>
          <SgInput
            :value="data.fullName"
            :placeholder="f.fullNamePh"
            @update:model-value="(v: string) => patch({ fullName: v })"
          />
        </div>
        <div class="forms-cell">
          <label class="forms-label">{{ f.email }}</label>
          <SgInput
            :value="data.email"
            :placeholder="f.emailPh"
            @update:model-value="(v: string) => patch({ email: v })"
          />
        </div>
        <div class="forms-cell">
          <label class="forms-label">{{ f.phone }}</label>
          <SgInputGroup before="+1">
            <SgInput
              :value="data.phone"
              :placeholder="f.phonePh"
              @update:model-value="(v: string) => patch({ phone: v })"
            />
          </SgInputGroup>
        </div>
      </div>
      <div v-if="step === 1" class="forms-grid" style="margin-top: 24px">
        <div class="forms-cell">
          <label class="forms-label">{{ f.company }}</label>
          <SgInput
            :value="data.company"
            :placeholder="f.companyPh"
            @update:model-value="(v: string) => patch({ company: v })"
          />
        </div>
        <div class="forms-cell">
          <label class="forms-label">{{ f.position }}</label>
          <SgInput
            :value="data.position"
            :placeholder="f.positionPh"
            @update:model-value="(v: string) => patch({ position: v })"
          />
        </div>
        <div class="forms-cell" style="grid-column: span 2">
          <label class="forms-label">{{ f.skills }}</label>
          <SgTagInput
            :value="data.skills"
            :placeholder="f.skillsPh"
            :max-tags="10"
            @update:model-value="(v: string[]) => patch({ skills: v })"
          />
        </div>
        <div class="forms-cell">
          <label class="forms-label">{{ f.experience }}</label>
          <SgSegmented
            :value="data.experience"
            :options="[
              { label: f.experienceLevels.junior, value: 'junior' },
              { label: f.experienceLevels.middle, value: 'middle' },
              { label: f.experienceLevels.senior, value: 'senior' },
              { label: f.experienceLevels.lead, value: 'lead' },
            ]"
            @change="(v: string | number) => patch({ experience: String(v) })"
          />
        </div>
      </div>
      <div v-if="step === 2" class="forms-grid" style="margin-top: 24px">
        <div class="forms-cell" style="grid-column: span 2">
          <label class="forms-label">{{ f.plan }}</label>
          <SgRadio
            :value="data.plan"
            :options="[
              { label: f.planOptions.free, value: 'free' },
              { label: f.planOptions.pro, value: 'pro' },
              { label: f.planOptions.enterprise, value: 'enterprise' },
            ]"
            @update:model-value="(v) => patch({ plan: String(v) })"
          />
        </div>
        <div class="forms-cell">
          <label class="forms-label">{{ f.notifications }}</label>
          <div style="display: flex; flex-direction: column; gap: 12px">
            <SgSwitch
              :model-value="data.notifications"
              @update:model-value="(v: boolean) => patch({ notifications: v })"
            >
              <template #checkedChildren>ON</template>
              <template #unCheckedChildren>OFF</template>
            </SgSwitch>
            <span style="color: var(--sg-color-text-secondary); font-size: 13px">
              {{ f.notificationsHelp }}
            </span>
          </div>
        </div>
        <div class="forms-cell">
          <label class="forms-label">{{ f.newsletter }}</label>
          <SgCheckbox
            :model-value="data.newsletter"
            @update:model-value="(v: boolean) => patch({ newsletter: v })"
          >
            {{ f.newsletterLabel }}
          </SgCheckbox>
        </div>
      </div>
      <div v-if="step === 3" style="margin-top: 24px">
        <div class="wizard-review">
          <div class="wizard-review-section">
            <h4>{{ s.review.personal }}</h4>
            <div class="wizard-review-row">
              <span>{{ s.review.name }}</span>
              <span>{{ data.fullName }}</span>
            </div>
            <div class="wizard-review-row">
              <span>{{ s.review.email }}</span>
              <span>{{ data.email }}</span>
            </div>
            <div class="wizard-review-row">
              <span>{{ s.review.phone }}</span>
              <span>{{ data.phone || '—' }}</span>
            </div>
          </div>
          <div class="wizard-review-section">
            <h4>{{ s.review.professional }}</h4>
            <div class="wizard-review-row">
              <span>{{ s.review.company }}</span>
              <span>{{ data.company }}</span>
            </div>
            <div class="wizard-review-row">
              <span>{{ s.review.position }}</span>
              <span>{{ data.position || '—' }}</span>
            </div>
            <div class="wizard-review-row">
              <span>{{ s.review.skills }}</span>
              <span v-if="data.skills.length > 0">
                <SgTag
                  v-for="skill of data.skills"
                  :key="skill"
                  color="processing"
                  :style="{ margin: '0 2px' }"
                  >{{ skill }}</SgTag
                >
              </span>
              <span v-else>—</span>
            </div>
            <div class="wizard-review-row">
              <span>{{ s.review.experience }}</span>
              <span>{{ expLabel(data.experience) }}</span>
            </div>
          </div>
          <div class="wizard-review-section">
            <h4>{{ s.review.preferences }}</h4>
            <div class="wizard-review-row">
              <span>{{ s.review.plan }}</span>
              <SgTag :color="planTagColor">{{ planLabel(data.plan) }}</SgTag>
            </div>
            <div class="wizard-review-row">
              <span>{{ s.review.notifications }}</span>
              <span>
                {{ data.notifications ? `✓ ${s.review.enabled}` : `✕ ${s.review.disabled}` }}
              </span>
            </div>
            <div class="wizard-review-row">
              <span>{{ s.review.newsletter }}</span>
              <span>{{ data.newsletter ? `✓ ${s.review.subscribed}` : `✕ ${s.review.no}` }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="wizard-actions">
      <SgButton v-if="step > 0" @click="step -= 1">{{ s.back }}</SgButton>
      <div style="flex: 1" />
      <SgButton v-if="step < 3" type="primary" :disabled="!canNext()" @click="step += 1">{{
        s.next
      }}</SgButton>
      <SgButton v-else type="primary" @click="handleFinish">{{ s.completeBtn }}</SgButton>
    </div>
  </div>
</template>
