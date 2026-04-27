import { Form, Field, Slider, SubmitButton } from '@skygraph/react'

/**
 * Slider can live inside `<Field>` just like Input. Because its value
 * is always defined (never `null`), you can skip the required rule.
 */
export function InFormSlider() {
  return (
    <Form
      layout="vertical"
      defaultValues={{ volume: 50, brightness: 80 }}
      onSubmit={(values) => console.log(values)}
      style={{ maxWidth: 420 }}
    >
      <Field name="volume" label="Volume">
        <Slider min={0} max={100} />
      </Field>
      <Field name="brightness" label="Brightness">
        <Slider min={0} max={100} step={5} />
      </Field>
      <SubmitButton>Save</SubmitButton>
    </Form>
  )
}
