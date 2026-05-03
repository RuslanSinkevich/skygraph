import { Form, Field, Rate, SubmitButton } from '@skygraph/react'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    label: 'How was it?',
    required: 'Please leave a rating',
    submit: 'Submit',
  },
  ru: {
    label: 'Как вам?',
    required: 'Поставьте оценку',
    submit: 'Отправить',
  },
} as const

/**
 * Rate plugs into `<Field>` like any controlled control. Add a
 * validator for "not zero" if a rating is required.
 */
export function InFormRate() {
  const t = useDemoStrings(STRINGS)
  return (
    <Form
      layout="vertical"
      defaultValues={{ rating: 0 }}
      onSubmit={(values) => console.log(values)}
      style={{ maxWidth: 380 }}
    >
      <Field
        name="rating"
        label={t.label}
        rules={[
          {
            validator: (v) =>
              typeof v === 'number' && v > 0 ? null : t.required,
          },
        ]}
      >
        <Rate allowHalf />
      </Field>
      <SubmitButton>{t.submit}</SubmitButton>
    </Form>
  )
}
