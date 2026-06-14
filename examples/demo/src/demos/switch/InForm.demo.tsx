import { useState } from 'react'
import { Form, Field, Switch, SubmitButton } from '@skygraph/react'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    emailNotifications: 'Email notifications',
    marketing: 'Marketing updates',
    save: 'Save',
    saved: 'Saved',
    on: 'on',
    off: 'off',
  },
  ru: {
    emailNotifications: 'Почтовые уведомления',
    marketing: 'Маркетинговые рассылки',
    save: 'Сохранить',
    saved: 'Сохранено',
    on: 'вкл',
    off: 'выкл',
  },
} as const

/**
 * Bind a Switch to a form field. Use `valuePropName="checked"` so the
 * form knows to read/write the boolean via `checked` rather than
 * `value`.
 */
export function InFormSwitch() {
  const t = useDemoStrings(STRINGS)
  const [saved, setSaved] = useState<{ notifications: boolean; marketing: boolean } | null>(null)
  return (
    <Form
      layout="vertical"
      defaultValues={{ notifications: true, marketing: false }}
      onSubmit={(values) =>
        setSaved({
          notifications: Boolean(values.notifications),
          marketing: Boolean(values.marketing),
        })
      }
      style={{ maxWidth: 380 }}
    >
      <Field name="notifications" label={t.emailNotifications} valuePropName="checked">
        <Switch />
      </Field>
      <Field name="marketing" label={t.marketing} valuePropName="checked">
        <Switch />
      </Field>
      <SubmitButton>{t.save}</SubmitButton>
      {saved && (
        <p style={{ marginTop: 12, fontSize: 14 }}>
          {t.saved}: {t.emailNotifications} — {saved.notifications ? t.on : t.off}, {t.marketing} —{' '}
          {saved.marketing ? t.on : t.off}
        </p>
      )}
    </Form>
  )
}
