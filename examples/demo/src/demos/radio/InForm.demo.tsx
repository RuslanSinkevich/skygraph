import { Form, Field, RadioGroup, SubmitButton } from '@skygraph/react'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    label: 'Choose a plan',
    required: 'Pick a plan to continue',
    hobby: 'Hobby — free, 1 user',
    pro: 'Pro — $12/mo per user',
    team: 'Team — $30/mo per user',
    enterprise: 'Enterprise — contact us',
    submit: 'Continue',
  },
  ru: {
    label: 'Выберите план',
    required: 'Выберите план, чтобы продолжить',
    hobby: 'Hobby — бесплатно, 1 пользователь',
    pro: 'Pro — $12/мес за пользователя',
    team: 'Team — $30/мес за пользователя',
    enterprise: 'Enterprise — свяжитесь с нами',
    submit: 'Продолжить',
  },
} as const

/**
 * Use `<Field>` to bind a `RadioGroup` to a named path. Required
 * validation makes the group an explicit choice (no silent default).
 */
export function InFormRadio() {
  const t = useDemoStrings(STRINGS)
  return (
    <Form
      layout="vertical"
      defaultValues={{ plan: '' }}
      onSubmit={(values) => console.log(values)}
      style={{ maxWidth: 420 }}
    >
      <Field
        name="plan"
        label={t.label}
        rules={[{ required: true, message: t.required }]}
      >
        <RadioGroup
          direction="vertical"
          options={[
            { label: t.hobby, value: 'hobby' },
            { label: t.pro, value: 'pro' },
            { label: t.team, value: 'team' },
            { label: t.enterprise, value: 'enterprise' },
          ]}
        />
      </Field>
      <SubmitButton>{t.submit}</SubmitButton>
    </Form>
  )
}
