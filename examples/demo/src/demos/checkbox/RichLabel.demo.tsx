import { Checkbox } from '@skygraph/react'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    twoFa: 'Enable two-factor authentication',
    twoFaHint: 'Adds a second step after password — recommended for admins.',
    acceptPrefix: 'I accept the',
    terms: 'Terms of Service',
    and: 'and',
    privacy: 'Privacy Policy',
  },
  ru: {
    twoFa: 'Включить двухфакторную аутентификацию',
    twoFaHint: 'Добавляет второй шаг после пароля — рекомендуется для админов.',
    acceptPrefix: 'Я принимаю',
    terms: 'Условия использования',
    and: 'и',
    privacy: 'Политику конфиденциальности',
  },
} as const

/**
 * `children` is a ReactNode — embed rich labels with descriptions, links,
 * or badges. Keep the touch target tight by wrapping extra text inside
 * the same element.
 */
export function RichLabelCheckbox() {
  const t = useDemoStrings(STRINGS)
  return (
    <div style={{ display: 'grid', gap: 12 }}>
      <Checkbox defaultChecked>
        <div>
          <div>{t.twoFa}</div>
          <div style={{ fontSize: 12, color: 'var(--sg-color-text-tertiary)' }}>
            {t.twoFaHint}
          </div>
        </div>
      </Checkbox>

      <Checkbox>
        <span>
          {t.acceptPrefix}{' '}
          <a href="#terms" onClick={(e) => e.preventDefault()}>{t.terms}</a>{' '}
          {t.and}{' '}
          <a href="#privacy" onClick={(e) => e.preventDefault()}>{t.privacy}</a>
        </span>
      </Checkbox>
    </div>
  )
}
