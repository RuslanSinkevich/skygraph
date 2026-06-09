<script setup lang="ts">
/**
 * Floating label on the ColorPicker trigger. ColorPicker always carries a
 * colour, so the label stays floated as a caption above the swatch and lifts
 * its colour on focus.
 *
 * Mirrors React `examples/demo/src/demos/colorpicker/FloatingLabel.demo.tsx`.
 */
import { ref } from 'vue'
import { SgColorPicker } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'
import FloatingField from '../_shared/FloatingField.vue'

const STRINGS = {
  en: { brand: 'Brand colour', accent: 'Accent colour' },
  ru: { brand: 'Цвет бренда', accent: 'Акцентный цвет' },
} as const

const t = useDemoStrings(STRINGS)

const brand = ref('#2563eb')
const accent = ref('#f59e0b')
</script>

<template>
  <div style="display: flex; gap: 24px; flex-wrap: wrap">
    <div style="width: 220px; padding-top: 6px">
      <FloatingField :label="t.brand" filled>
        <SgColorPicker v-model="brand" show-text />
      </FloatingField>
    </div>
    <div style="width: 220px; padding-top: 6px">
      <FloatingField :label="t.accent" filled>
        <SgColorPicker v-model="accent" show-text />
      </FloatingField>
    </div>
  </div>
</template>
