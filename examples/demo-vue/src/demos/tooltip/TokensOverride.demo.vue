<script setup lang="ts">
/**
 * Three distinct tooltip skins. The Tooltip component itself is
 * unchanged — each look is achieved by adding a class to the wrapper
 * and styling `.sg-tooltip-content` / `.sg-tooltip-arrow` underneath.
 * Mirrors React `tooltip/TokensOverride.demo.tsx`.
 */
import { SgTooltip, SgButton } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    glassTitle: 'Frosted glass — ⌘K to search.',
    glassBtn: 'Glass tip',
    gradientTitle: 'New AI suggestions are ready 🎉',
    gradientBtn: 'Gradient tip',
    cardTitle: 'Cmd + S to save · auto-save every 30s',
    cardBtn: 'Soft card',
  },
  ru: {
    glassTitle: 'Мутное стекло — ⌘K для поиска.',
    glassBtn: 'Стеклянная',
    gradientTitle: 'Готовы новые подсказки ИИ 🎉',
    gradientBtn: 'Градиент',
    cardTitle: 'Cmd + S — сохранить · автосейв каждые 30с',
    cardBtn: 'Мягкая карточка',
  },
} as const

const t = useDemoStrings(STRINGS)
</script>

<template>
  <div style="display: flex; gap: 14px; flex-wrap: wrap">
    <SgTooltip class="demo-tip-glass" :title="t.glassTitle" placement="top">
      <SgButton>{{ t.glassBtn }}</SgButton>
    </SgTooltip>
    <SgTooltip class="demo-tip-gradient" :title="t.gradientTitle" placement="top">
      <SgButton>{{ t.gradientBtn }}</SgButton>
    </SgTooltip>
    <SgTooltip class="demo-tip-card demo-tip-card-dark" :title="t.cardTitle" placement="bottom">
      <SgButton>{{ t.cardBtn }}</SgButton>
    </SgTooltip>
  </div>
</template>

<style>
.demo-tip-glass .sg-tooltip-content {
  background: rgba(15, 23, 42, 0.55);
  color: #f8fafc;
  backdrop-filter: blur(14px) saturate(160%);
  -webkit-backdrop-filter: blur(14px) saturate(160%);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 10px;
  padding: 8px 14px;
  font-size: 13px;
  box-shadow:
    0 12px 28px -8px rgba(15, 23, 42, 0.45),
    inset 0 1px 0 rgba(255, 255, 255, 0.18);
}
.demo-tip-glass .sg-tooltip-arrow {
  background: rgba(15, 23, 42, 0.55);
  border-right: 1px solid rgba(255, 255, 255, 0.18);
  border-bottom: 1px solid rgba(255, 255, 255, 0.18);
}

.demo-tip-gradient .sg-tooltip-content {
  background: linear-gradient(110deg, #6366f1 0%, #ec4899 60%, #f59e0b 100%);
  color: #ffffff;
  border-radius: 10px;
  padding: 10px 16px;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.01em;
  box-shadow:
    0 14px 32px -8px rgba(236, 72, 153, 0.55),
    0 6px 12px -2px rgba(99, 102, 241, 0.45);
}
.demo-tip-gradient .sg-tooltip-arrow {
  background: linear-gradient(135deg, #ec4899 0%, #f59e0b 100%);
}

.demo-tip-card .sg-tooltip-content {
  background: #ffffff;
  color: #0f172a;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 10px 14px;
  font-size: 13px;
  box-shadow:
    0 14px 30px -10px rgba(15, 23, 42, 0.18),
    0 4px 10px -2px rgba(15, 23, 42, 0.08);
}
.demo-tip-card .sg-tooltip-arrow {
  background: #ffffff;
  border-right: 1px solid #e2e8f0;
  border-bottom: 1px solid #e2e8f0;
}
.demo-tip-card.demo-tip-card-dark .sg-tooltip-content {
  background: #0f172a;
  color: #f1f5f9;
  border-color: #1e293b;
}
.demo-tip-card.demo-tip-card-dark .sg-tooltip-arrow {
  background: #0f172a;
  border-color: #1e293b;
}
</style>
