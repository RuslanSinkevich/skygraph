<script setup lang="ts">
/**
 * Three completely different button looks. Each scope only changes
 * paint / shape tokens (`--sg-btn-*`) plus a few extra rules via a
 * scoped <style> block — the underlying component, hover / focus
 * ring and disabled behaviour stay intact.
 * Mirrors React `button/TokensOverride.demo.tsx`.
 */
import type { CSSProperties } from 'vue'
import { SgButton } from '@skygraph/vue'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    glassLabel: 'Glass',
    neoLabel: 'Neumorphic',
    pillLabel: 'Gradient pill',
    brutalLabel: 'Brutalist',
    primary: 'Get started',
    secondary: 'Learn more',
  },
  ru: {
    glassLabel: 'Стекло',
    neoLabel: 'Нео-морфный',
    pillLabel: 'Градиент-пилюля',
    brutalLabel: 'Брутализм',
    primary: 'Начать',
    secondary: 'Подробнее',
  },
} as const

const t = useDemoStrings(STRINGS)

const stripStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '10px',
  padding: '4px 0',
} as CSSProperties

const labelStyle = {
  fontSize: '11px',
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  color: 'var(--sg-color-text-tertiary)',
} as CSSProperties

const rowStyle = { display: 'flex', gap: '10px', flexWrap: 'wrap' } as CSSProperties

const glassFrame = {
  background: 'linear-gradient(135deg, #c7d2fe 0%, #ddd6fe 50%, #fbcfe8 100%)',
  padding: '16px 18px',
  borderRadius: '16px',
} as CSSProperties
</script>

<template>
  <div style="display: flex; gap: 18px; flex-wrap: wrap">
    <div :style="{ ...stripStyle, ...glassFrame }">
      <span :style="{ ...labelStyle, color: '#3730a3' }">{{ t.glassLabel }}</span>
      <div :style="rowStyle">
        <SgButton type="primary" class="demo-btn-glass">{{ t.primary }}</SgButton>
        <SgButton class="demo-btn-glass">{{ t.secondary }}</SgButton>
      </div>
    </div>

    <div :style="stripStyle">
      <span :style="labelStyle">{{ t.neoLabel }}</span>
      <div :style="rowStyle">
        <SgButton type="primary" class="demo-btn-neo">{{ t.primary }}</SgButton>
        <SgButton class="demo-btn-neo">{{ t.secondary }}</SgButton>
      </div>
    </div>

    <div :style="stripStyle">
      <span :style="labelStyle">{{ t.pillLabel }}</span>
      <div :style="rowStyle">
        <SgButton class="demo-btn-pill">{{ t.primary }}</SgButton>
        <SgButton class="demo-btn-pill demo-btn-pill-ghost">{{ t.secondary }}</SgButton>
      </div>
    </div>

    <div :style="stripStyle">
      <span :style="labelStyle">{{ t.brutalLabel }}</span>
      <div :style="rowStyle">
        <SgButton class="demo-btn-brutal">{{ t.primary }}</SgButton>
        <SgButton class="demo-btn-brutal demo-btn-brutal-ink">{{ t.secondary }}</SgButton>
      </div>
    </div>
  </div>
</template>

<style>
.demo-btn-glass {
  --sg-btn-radius: 14px;
  --sg-btn-height: 44px;
  --sg-btn-padding: 0 22px;
  --sg-btn-bg: rgba(255, 255, 255, 0.55);
  --sg-btn-color: #0f172a;
  --sg-btn-border: rgba(148, 163, 184, 0.45);
  backdrop-filter: blur(14px) saturate(140%);
  -webkit-backdrop-filter: blur(14px) saturate(140%);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.85),
    0 6px 18px -4px rgba(15, 23, 42, 0.18);
}
.demo-btn-glass:hover {
  --sg-btn-bg: rgba(255, 255, 255, 0.78);
  --sg-btn-color: #0f172a;
  --sg-btn-border: rgba(99, 102, 241, 0.55);
}
.demo-btn-glass.sg-button-primary {
  --sg-btn-bg: linear-gradient(180deg, rgba(99, 102, 241, 0.95), rgba(79, 70, 229, 0.95));
  --sg-btn-color: #ffffff;
  --sg-btn-border: rgba(79, 70, 229, 0.6);
}
.demo-btn-glass.sg-button-primary:hover {
  --sg-btn-bg: linear-gradient(180deg, rgba(124, 58, 237, 1), rgba(99, 102, 241, 1));
  --sg-btn-border: rgba(124, 58, 237, 0.7);
}

.demo-btn-neo {
  --sg-btn-radius: 16px;
  --sg-btn-height: 48px;
  --sg-btn-padding: 0 24px;
  --sg-btn-font-size: 14px;
  --sg-btn-bg: #e8edf4;
  --sg-btn-color: #475569;
  --sg-btn-border: transparent;
  font-weight: 600;
  box-shadow:
    -6px -6px 12px rgba(255, 255, 255, 0.95),
    6px 6px 14px rgba(148, 163, 184, 0.45);
  transition:
    box-shadow 220ms ease,
    color 180ms ease,
    background 180ms ease;
}
.demo-btn-neo:hover {
  --sg-btn-color: #1e293b;
  --sg-btn-border: transparent;
  box-shadow:
    -3px -3px 8px rgba(255, 255, 255, 0.95),
    3px 3px 8px rgba(148, 163, 184, 0.45);
}
.demo-btn-neo:active {
  box-shadow:
    inset -3px -3px 7px rgba(255, 255, 255, 0.85),
    inset 4px 4px 9px rgba(148, 163, 184, 0.5);
}
.demo-btn-neo.sg-button-primary {
  --sg-btn-bg: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  --sg-btn-color: #ffffff;
  box-shadow:
    -6px -6px 12px rgba(255, 255, 255, 0.95),
    6px 6px 14px rgba(99, 102, 241, 0.45);
}

.demo-btn-pill {
  --sg-btn-radius: 999px;
  --sg-btn-height: 46px;
  --sg-btn-padding: 0 28px;
  --sg-btn-font-size: 14px;
  --sg-btn-bg: linear-gradient(110deg, #f43f5e 0%, #ec4899 50%, #8b5cf6 100%);
  --sg-btn-color: #ffffff;
  --sg-btn-border: transparent;
  font-weight: 700;
  box-shadow:
    0 10px 24px -8px rgba(244, 63, 94, 0.55),
    0 4px 12px -2px rgba(139, 92, 246, 0.35);
  transition:
    transform 180ms cubic-bezier(0.34, 1.56, 0.64, 1),
    box-shadow 220ms ease;
}
.demo-btn-pill:hover {
  --sg-btn-color: #ffffff;
  --sg-btn-border: transparent;
  transform: translateY(-2px);
  box-shadow:
    0 16px 32px -10px rgba(244, 63, 94, 0.65),
    0 8px 20px -4px rgba(139, 92, 246, 0.5);
}
.demo-btn-pill:active {
  transform: translateY(0);
}
.demo-btn-pill.demo-btn-pill-ghost {
  --sg-btn-bg: transparent;
  --sg-btn-color: #be185d;
  --sg-btn-border: transparent;
  box-shadow: inset 0 0 0 2px #ec4899;
}
.demo-btn-pill.demo-btn-pill-ghost:hover {
  --sg-btn-bg: rgba(236, 72, 153, 0.08);
  --sg-btn-color: #be185d;
  box-shadow: inset 0 0 0 2px #db2777;
  transform: translateY(-2px);
}

.demo-btn-brutal {
  --sg-btn-radius: 4px;
  --sg-btn-height: 46px;
  --sg-btn-padding: 0 22px;
  --sg-btn-font-size: 14px;
  --sg-btn-bg: #fde047;
  --sg-btn-color: #18181b;
  --sg-btn-border: #18181b;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  border-width: 2px !important;
  box-shadow: 4px 4px 0 0 #18181b;
  transition:
    transform 120ms ease,
    box-shadow 120ms ease;
}
.demo-btn-brutal:hover {
  --sg-btn-bg: #fde047;
  --sg-btn-color: #18181b;
  --sg-btn-border: #18181b;
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0 0 #18181b;
}
.demo-btn-brutal:active {
  transform: translate(2px, 2px);
  box-shadow: 0 0 0 0 #18181b;
}
.demo-btn-brutal.demo-btn-brutal-ink {
  --sg-btn-bg: #18181b;
  --sg-btn-color: #fde047;
  --sg-btn-border: #18181b;
}
</style>
