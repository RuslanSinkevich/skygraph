import { Button } from '@skygraph/react'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    customPill: 'Custom pill',
    disabledPill: 'Disabled pill',
    loadingPill: 'Loading pill',
  },
  ru: {
    customPill: 'Своя pill-кнопка',
    disabledPill: 'Отключённая pill',
    loadingPill: 'Pill в загрузке',
  },
} as const

/**
 * `unstyled` keeps the `<button>` element semantics — htmlType,
 * disabled state, aria-busy for loading — but removes every
 * `sg-button-*` class. Pair it with your own stylesheet or a
 * Tailwind className.
 */
export function UnstyledButton() {
  const t = useDemoStrings(STRINGS)
  return (
    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
      <style>{`
        .demo-pill-btn {
          background: linear-gradient(90deg, #6366f1, #8b5cf6);
          color: white;
          border: none;
          border-radius: 999px;
          padding: 10px 24px;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
        }
        .demo-pill-btn:hover { filter: brightness(1.1); }
        .demo-pill-btn:disabled { opacity: 0.5; cursor: not-allowed; }
      `}</style>
      <Button unstyled className="demo-pill-btn">{t.customPill}</Button>
      <Button unstyled className="demo-pill-btn" disabled>{t.disabledPill}</Button>
      <Button unstyled className="demo-pill-btn" loading>{t.loadingPill}</Button>
    </div>
  )
}
