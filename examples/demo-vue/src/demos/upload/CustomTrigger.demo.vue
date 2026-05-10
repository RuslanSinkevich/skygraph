<script setup lang="ts">
/**
 * The default slot replaces the built-in trigger button. The hidden
 * `<input>` is opened via the wrapper, so any clickable child works
 * (button, card-like div, icon tile).
 */
import { SgUpload, SgButton } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    pick: 'Pick files…',
    plus: '+',
    upload: 'Click to upload',
  },
  ru: {
    pick: 'Выбрать файлы…',
    plus: '+',
    upload: 'Кликните для загрузки',
  },
} as const

const t = useDemoStrings(STRINGS)
</script>

<template>
  <div style="display: flex; gap: 12px; align-items: center">
    <SgUpload>
      <SgButton type="dashed">{{ t.pick }}</SgButton>
    </SgUpload>

    <SgUpload>
      <div
        style="
          width: 160px;
          height: 120px;
          border: 1px dashed var(--sg-color-border);
          border-radius: 8px;
          display: grid;
          place-items: center;
          color: var(--sg-color-text-secondary);
          cursor: pointer;
        "
      >
        <div style="text-align: center">
          <div style="font-size: 24px">{{ t.plus }}</div>
          <div style="font-size: 12px">{{ t.upload }}</div>
        </div>
      </div>
    </SgUpload>
  </div>
</template>
