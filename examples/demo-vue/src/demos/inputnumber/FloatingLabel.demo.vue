<script setup lang="ts">
/**
 * Floating label over the InputNumber field. The label floats on
 * `:focus-within` and a JS-driven `fl-filled` class once the field
 * holds a number — no core changes.
 */
import { ref, computed } from 'vue'
import { SgInputNumber } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: { qty: 'Quantity', price: 'Unit price' },
  ru: { qty: 'Количество', price: 'Цена за единицу' },
} as const

const t = useDemoStrings(STRINGS)

const qty = ref<number | null>(null)
const price = ref<number | null>(19.99)

const qtyFilled = computed(() => qty.value != null)
const priceFilled = computed(() => price.value != null)
</script>

<template>
  <div class="fl-row">
    <div class="fl-field" :class="{ 'fl-filled': qtyFilled }">
      <SgInputNumber v-model="qty" :min="0" placeholder=" " />
      <label class="fl-label">{{ t.qty }}</label>
    </div>
    <div class="fl-field" :class="{ 'fl-filled': priceFilled }">
      <SgInputNumber v-model="price" :min="0" :step="0.01" :precision="2" placeholder=" " />
      <label class="fl-label">{{ t.price }}</label>
    </div>
  </div>
</template>

<style scoped>
.fl-row {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  max-width: 560px;
}
.fl-field {
  position: relative;
  flex: 1 1 220px;
  min-width: 0;
  padding-top: 8px;
}
.fl-field :deep(.sg-input-number) {
  width: 100%;
}
.fl-label {
  position: absolute;
  left: 12px;
  top: calc(50% + 4px);
  transform: translateY(-50%);
  font-size: 14px;
  color: var(--sg-color-text-secondary, rgba(0, 0, 0, 0.65));
  background: var(--sg-color-bg-container, #fff);
  padding: 0 4px;
  pointer-events: none;
  white-space: nowrap;
  z-index: 1;
  transition:
    top 0.18s cubic-bezier(0.4, 0, 0.2, 1),
    transform 0.18s cubic-bezier(0.4, 0, 0.2, 1),
    color 0.18s ease;
}
.fl-field:focus-within .fl-label,
.fl-field.fl-filled .fl-label {
  top: 8px;
  transform: translateY(-50%) scale(0.85);
  transform-origin: left center;
  color: var(--sg-color-primary);
}
</style>
