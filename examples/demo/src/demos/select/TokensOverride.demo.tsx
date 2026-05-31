import { useMemo, type CSSProperties } from 'react'
import { Select } from '@skygraph/react'
import { fruitOptions } from './data'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    tallRounded: 'Tall & rounded',
    tallRoundedHint: '--sg-input-height / --sg-input-radius',
    brandedGreen: 'Branded green',
    brandedGreenHint: 'Primary colour & dropdown',
    darkInput: 'Dark input',
    darkInputHint: '--sg-input-bg / -border / -color',
    glassPick: 'Glass pick',
    glassPickHint: 'Custom surface + soft shadow',
    citrusPick: 'Citrus pick',
    citrusPickHint: 'Brand gradient on hover',
    apple: 'Apple',
    pear: 'Pear',
    mango: 'Mango',
    kiwi: 'Kiwi',
  },
  ru: {
    tallRounded: 'Выше и со скруглением',
    tallRoundedHint: '--sg-input-height / --sg-input-radius',
    brandedGreen: 'Зелёный бренд',
    brandedGreenHint: 'Primary-цвет и dropdown',
    darkInput: 'Тёмное поле',
    darkInputHint: '--sg-input-bg / -border / -color',
    glassPick: 'Glass pick',
    glassPickHint: 'Свой surface + мягкая тень',
    citrusPick: 'Citrus pick',
    citrusPickHint: 'Брендовый градиент на hover',
    apple: 'Яблоко',
    pear: 'Груша',
    mango: 'Манго',
    kiwi: 'Киви',
  },
} as const

/**
 * Select shares input tokens (`--sg-input-*`) with `Input` and listens to
 * the global `--sg-color-primary*`, `--sg-color-bg-*`, `--sg-shadow-*` and
 * `--sg-border-radius` families. Every variant below scopes a different
 * subset on a wrapper — the inner `Select` is the same component.
 *
 * Five recipes worth copy-pasting:
 *   1. Tall rounded             — input height / radius
 *   2. Branded green            — primary colour + dropdown hover
 *   3. Dark input               — full input palette flipped
 *   4. Glass pick (frosted)     — custom surface + elevated dropdown
 *   5. Citrus pick              — brand gradient hover via `--sg-color-bg-hover`
 */
type Card = {
  label: string
  hint: string
  style: CSSProperties
}

export function TokensOverrideSelect() {
  const t = useDemoStrings(STRINGS)

  const options = useMemo(
    () =>
      fruitOptions.map((o) => ({
        ...o,
        label: t[o.value as 'apple' | 'pear' | 'mango' | 'kiwi'],
      })),
    [t],
  )

  const cards: Card[] = [
    {
      label: t.tallRounded,
      hint: t.tallRoundedHint,
      style: {
        ['--sg-input-height' as never]: '44px',
        ['--sg-input-radius' as never]: '14px',
        ['--sg-border-radius' as never]: '14px',
      },
    },
    {
      label: t.brandedGreen,
      hint: t.brandedGreenHint,
      style: {
        ['--sg-color-primary' as never]: '#059669',
        ['--sg-color-primary-bg' as never]: '#d1fae5',
        ['--sg-color-primary-hover' as never]: '#047857',
        ['--sg-color-bg-hover' as never]: 'rgba(5, 150, 105, 0.08)',
      },
    },
    {
      label: t.darkInput,
      hint: t.darkInputHint,
      style: {
        ['--sg-input-bg' as never]: '#0f172a',
        ['--sg-input-color' as never]: '#e2e8f0',
        ['--sg-input-border' as never]: '#1e293b',
        ['--sg-color-text-placeholder' as never]: '#64748b',
        ['--sg-color-bg-elevated' as never]: '#0f172a',
        ['--sg-color-text' as never]: '#e2e8f0',
        ['--sg-color-bg-hover' as never]: '#1e293b',
        ['--sg-color-primary' as never]: '#60a5fa',
        ['--sg-color-primary-bg' as never]: 'rgba(96, 165, 250, 0.18)',
      },
    },
    {
      label: t.glassPick,
      hint: t.glassPickHint,
      style: {
        ['--sg-input-bg' as never]: 'rgba(255, 255, 255, 0.55)',
        ['--sg-input-border' as never]: 'rgba(15, 23, 42, 0.08)',
        ['--sg-input-radius' as never]: '12px',
        ['--sg-border-radius' as never]: '12px',
        ['--sg-color-bg-elevated' as never]: 'rgba(255, 255, 255, 0.92)',
        ['--sg-shadow-lg' as never]: '0 18px 38px -16px rgba(15, 23, 42, 0.4)',
        ['--sg-color-primary' as never]: '#6366f1',
        ['--sg-color-primary-bg' as never]: 'rgba(99, 102, 241, 0.16)',
        ['--sg-color-bg-hover' as never]: 'rgba(99, 102, 241, 0.08)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
      },
    },
    {
      label: t.citrusPick,
      hint: t.citrusPickHint,
      style: {
        ['--sg-color-primary' as never]: '#ea580c',
        ['--sg-color-primary-bg' as never]: '#ffedd5',
        ['--sg-color-primary-hover' as never]: '#c2410c',
        ['--sg-color-bg-hover' as never]:
          'linear-gradient(90deg, rgba(234, 88, 12, 0.08), rgba(245, 158, 11, 0.16))',
        ['--sg-input-radius' as never]: '10px',
        ['--sg-border-radius' as never]: '10px',
      },
    },
  ]

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: 16,
        width: '100%',
        padding: 'var(--sg-padding-md, 12px) 0',
      }}
    >
      {cards.map((card) => (
        <div
          key={card.label}
          style={{
            ...card.style,
            display: 'flex',
            flexDirection: 'column',
            gap: 6,
            padding: 14,
            borderRadius: 14,
            background:
              card.label === t.darkInput
                ? '#020617'
                : card.label === t.glassPick
                  ? 'linear-gradient(135deg,#a5b4fc,#fbcfe8)'
                  : 'var(--sg-color-bg, #ffffff)',
            border:
              card.label === t.darkInput || card.label === t.glassPick
                ? '1px solid rgba(255,255,255,0.18)'
                : '1px solid var(--sg-color-border-secondary)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: 8,
              color:
                card.label === t.darkInput
                  ? '#e2e8f0'
                  : card.label === t.glassPick
                    ? '#1e1b4b'
                    : 'var(--sg-color-text)',
            }}
          >
            <span style={{ fontSize: 13, fontWeight: 600 }}>{card.label}</span>
          </div>
          <div
            style={{
              fontSize: 11,
              fontFamily: 'var(--sg-font-mono, monospace)',
              color:
                card.label === t.darkInput
                  ? 'rgba(226,232,240,0.6)'
                  : card.label === t.glassPick
                    ? 'rgba(30,27,75,0.7)'
                    : 'var(--sg-color-text-tertiary, var(--sg-color-text-secondary))',
              marginBottom: 4,
            }}
          >
            {card.hint}
          </div>
          <Select placeholder={card.label} options={options} aria-label={card.label} />
        </div>
      ))}
    </div>
  )
}
