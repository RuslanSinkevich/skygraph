import { Form, Field, Switch, SubmitButton } from '@skygraph/react'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    emailNotifications: 'Email notifications',
    marketing: 'Marketing updates',
    save: 'Save',
  },
  ru: {
    emailNotifications: 'Почтовые уведомления',
    marketing: 'Маркетинговые рассылки',
    save: 'Сохранить',
  },
} as const

/**
 * Bind a Switch to a form field. Use `valuePropName="checked"` so the
 * form knows to read/write the boolean via `checked` rather than
 * `value`.
 */
export function InFormSwitch() {
  const t = useDemoStrings(STRINGS)
  return (
    <Form
      layout="vertical"
      defaultValues={{ notifications: true, marketing: false }}
      onSubmit={(values) => console.log(values)}
      style={{ maxWidth: 380 }}
    >
      <Field name="notifications" label={t.emailNotifications} valuePropName="checked">
        <Switch />
      </Field>
      <Field name="marketing" label={t.marketing} valuePropName="checked">
        <Switch />
      </Field>
      <SubmitButton>{t.save}</SubmitButton>
    </Form>
  )
}
