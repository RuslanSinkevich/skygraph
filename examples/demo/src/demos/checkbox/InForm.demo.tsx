import { Form, Field, Checkbox, SubmitButton } from '@skygraph/react'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    news: 'Subscribe to monthly release notes',
    beta: 'Enable experimental (beta) components',
    terms: 'I accept the Terms of Service',
    termsRequired: 'You must accept to continue',
    submit: 'Save preferences',
  },
  ru: {
    news: 'Подписаться на ежемесячные релизы',
    beta: 'Включить экспериментальные (beta) компоненты',
    terms: 'Я принимаю условия использования',
    termsRequired: 'Нужно согласиться, чтобы продолжить',
    submit: 'Сохранить настройки',
  },
} as const

/**
 * Inside `<Form>`, use `<Field>` to wire the checkbox to a named path.
 * Validation works via the standard rules prop — here we require the
 * terms checkbox to be `true`.
 */
export function InFormCheckbox() {
  const t = useDemoStrings(STRINGS)
  return (
    <Form
      layout="vertical"
      defaultValues={{ news: true, beta: false, terms: false }}
      onSubmit={(values) => console.log(values)}
      style={{ maxWidth: 420 }}
    >
      <Field name="news" valuePropName="checked">
        <Checkbox>{t.news}</Checkbox>
      </Field>
      <Field name="beta" valuePropName="checked">
        <Checkbox>{t.beta}</Checkbox>
      </Field>
      <Field
        name="terms"
        valuePropName="checked"
        rules={[{
          validator: (v: unknown) => (v === true ? null : t.termsRequired),
        }]}
      >
        <Checkbox>{t.terms}</Checkbox>
      </Field>
      <div style={{ marginTop: 8 }}>
        <SubmitButton>{t.submit}</SubmitButton>
      </div>
    </Form>
  )
}
