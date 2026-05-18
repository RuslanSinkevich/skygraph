<script setup lang="ts">
import { ref } from 'vue'
import {
  SgButton,
  SgInput,
  SgSelect,
  SgSegmented,
  SgForm,
  SgField,
  SgFormList,
  SgInputPassword,
  SgSearchInput,
  SgPinInput,
  notification,
} from '@skygraph/vue'
import { useAppLocale } from '../_shared'

const d = useAppLocale('forms').dynamic
const section = ref<'lists' | 'playground'>('lists')

function onTeamFinish(values: Record<string, unknown>) {
  notification.success(d.teamSavedToast, JSON.stringify(values, null, 2))
}

// Playground
const pinValue = ref('')
const verified = ref(false)
const searchResults = ref<string[]>([])
const searchLoading = ref(false)

const allItems = [
  'React Components',
  'TypeScript Generics',
  'CSS Grid Layout',
  'Form Validation',
  'State Management',
  'API Integration',
  'Unit Testing',
  'Performance Optimization',
  'Responsive Design',
  'Accessibility',
  'Dark Mode',
  'Animation Library',
]

function handleSearch(q: string) {
  if (!q.trim()) {
    searchResults.value = []
    return
  }
  searchLoading.value = true
  setTimeout(() => {
    searchResults.value = allItems.filter((i) => i.toLowerCase().includes(q.toLowerCase()))
    searchLoading.value = false
  }, 500)
}

function onPinComplete() {
  verified.value = true
  notification.success(d.playground.otpVerified)
}

function tryAgain() {
  verified.value = false
  pinValue.value = ''
}
</script>

<template>
  <div class="forms-section">
    <SgSegmented
      :value="section"
      :options="[
        { label: d.sections.lists, value: 'lists' },
        { label: d.sections.playground, value: 'playground' },
      ]"
      :style="{ marginBottom: '16px' }"
      @change="(v: string | number) => (section = String(v) as 'lists' | 'playground')"
    />

    <div v-if="section === 'lists'" class="forms-section">
      <p style="color: var(--sg-color-text-secondary); margin-bottom: 16px">{{ d.teamLead }}</p>
      <SgForm
        layout="vertical"
        :initial-values="{
          teamName: 'Dream Team',
          members: [{ name: '', role: 'dev', email: '' }],
        }"
        @finish="onTeamFinish"
      >
        <SgField name="teamName" :label="d.teamName" required :rules="[{ required: true }]">
          <template #default="{ value, onChange, onBlur }">
            <SgInput
              :value="(value as string) ?? ''"
              :placeholder="d.teamNamePlaceholder"
              @update:model-value="onChange"
              @blur="onBlur"
            />
          </template>
        </SgField>

        <SgFormList name="members">
          <template #default="{ fields, operation }">
            <div style="display: flex; flex-direction: column; gap: 12px">
              <div style="display: flex; justify-content: space-between; align-items: center">
                <h4 style="margin: 0">{{ d.membersHeading(fields.length) }}</h4>
                <SgButton
                  size="small"
                  @click="operation.add({ name: '', role: 'dev', email: '' })"
                  >{{ d.addMember }}</SgButton
                >
              </div>
              <div v-for="(f, idx) of fields" :key="f.key" class="dynamic-member-row">
                <span class="dynamic-member-num">{{ idx + 1 }}</span>
                <SgField
                  :name="`members.${f.index}.name`"
                  :rules="[{ required: true, message: d.nameRequired }]"
                >
                  <template #default="{ value, onChange, onBlur }">
                    <SgInput
                      :value="(value as string) ?? ''"
                      :placeholder="d.namePlaceholder"
                      @update:model-value="onChange"
                      @blur="onBlur"
                    />
                  </template>
                </SgField>
                <SgField
                  :name="`members.${f.index}.email`"
                  :rules="[{ type: 'email', message: d.emailInvalid }]"
                >
                  <template #default="{ value, onChange, onBlur }">
                    <SgInput
                      :value="(value as string) ?? ''"
                      :placeholder="d.emailPlaceholder"
                      @update:model-value="onChange"
                      @blur="onBlur"
                    />
                  </template>
                </SgField>
                <SgField :name="`members.${f.index}.role`">
                  <template #default="{ value, onChange }">
                    <SgSelect
                      :value="(value as string) ?? 'dev'"
                      :options="[
                        { label: d.roles.developer, value: 'dev' },
                        { label: d.roles.designer, value: 'design' },
                        { label: d.roles.pm, value: 'pm' },
                        { label: d.roles.qa, value: 'qa' },
                      ]"
                      :style="{ width: '140px' }"
                      @update:model-value="onChange"
                    />
                  </template>
                </SgField>
                <SgButton
                  size="small"
                  :disabled="fields.length <= 1"
                  :style="{ flexShrink: '0' }"
                  @click="operation.remove(idx)"
                  >×</SgButton
                >
              </div>
            </div>
          </template>
        </SgFormList>

        <div style="display: flex; gap: 8px; margin-top: 20px">
          <SgButton type="primary" html-type="submit">{{ d.saveTeam }}</SgButton>
          <SgButton html-type="reset">{{ d.reset }}</SgButton>
        </div>
      </SgForm>
    </div>

    <div v-else class="forms-section">
      <div class="playground-grid">
        <div class="playground-card">
          <h4>{{ d.playground.otpHeading }}</h4>
          <p>{{ d.playground.otpLead }}</p>
          <template v-if="!verified">
            <div style="display: flex; justify-content: center; margin: 20px 0">
              <SgPinInput
                :value="pinValue"
                :length="6"
                size="large"
                auto-focus
                @update:model-value="(v: string) => (pinValue = v)"
                @complete="onPinComplete"
              />
            </div>
            <div style="text-align: center; color: var(--sg-color-text-tertiary)">
              {{ d.playground.otpProgress(pinValue.replace(/ /g, '').length, 6) }}
            </div>
          </template>
          <template v-else>
            <div style="text-align: center; padding: 20px">
              <div style="font-size: 32px; color: var(--sg-color-success)">✓</div>
              <p>{{ d.playground.otpSuccess }}</p>
              <SgButton size="small" @click="tryAgain">{{ d.playground.tryAgain }}</SgButton>
            </div>
          </template>
        </div>

        <div class="playground-card">
          <h4>{{ d.playground.searchHeading }}</h4>
          <p>{{ d.playground.searchLead }}</p>
          <SgSearchInput
            :placeholder="d.playground.searchPlaceholder"
            :loading="searchLoading"
            :enter-button="d.playground.searchButton"
            @search="handleSearch"
            @update:model-value="
              (v: string) => {
                if (!v) searchResults = []
              }
            "
          />
          <div class="search-results">
            <template v-if="searchResults.length > 0">
              <div v-for="r of searchResults" :key="r" class="search-result-item">{{ r }}</div>
            </template>
            <div
              v-else
              style="color: var(--sg-color-text-quaternary); text-align: center; padding: 16px"
            >
              {{ d.playground.searchEmpty }}
            </div>
          </div>
        </div>

        <div class="playground-card" style="grid-column: span 2">
          <h4>{{ d.playground.passwordHeading }}</h4>
          <p>{{ d.playground.passwordLead }}</p>
          <div class="forms-grid" style="margin-top: 12px">
            <div class="forms-cell">
              <label class="forms-label">{{ d.playground.weakLabel }}</label>
              <SgInputPassword
                show-strength
                default-value="abc"
                :placeholder="d.playground.weakPlaceholder"
              />
            </div>
            <div class="forms-cell">
              <label class="forms-label">{{ d.playground.mediumLabel }}</label>
              <SgInputPassword
                show-strength
                default-value="Hello123"
                :placeholder="d.playground.mediumPlaceholder"
              />
            </div>
            <div class="forms-cell">
              <label class="forms-label">{{ d.playground.strongLabel }}</label>
              <SgInputPassword
                show-strength
                default-value="MyP@ss2024!"
                :placeholder="d.playground.strongPlaceholder"
              />
            </div>
            <div class="forms-cell">
              <label class="forms-label">{{ d.playground.tryYourOwnLabel }}</label>
              <SgInputPassword show-strength :placeholder="d.playground.tryYourOwnPlaceholder" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
