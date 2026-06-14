import { useState } from 'react'
import { Form, Field, Slider, SubmitButton } from '@skygraph/react'

/**
 * Slider can live inside `<Field>` just like Input. Because its value
 * is always defined (never `null`), you can skip the required rule.
 */
export function InFormSlider() {
  const [saved, setSaved] = useState<{ volume: number; brightness: number } | null>(null)
  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 360, maxWidth: '100%' }}
    >
      <Form
        layout="vertical"
        defaultValues={{ volume: 50, brightness: 80 }}
        onSubmit={(values) =>
          setSaved({ volume: Number(values.volume), brightness: Number(values.brightness) })
        }
      >
        <Field name="volume" label="Volume">
          <Slider min={0} max={100} />
        </Field>
        <Field name="brightness" label="Brightness">
          <Slider min={0} max={100} step={5} />
        </Field>
        <SubmitButton>Save</SubmitButton>
      </Form>
      {saved && (
        <p style={{ margin: 0, fontSize: 14 }}>
          Saved: Volume — {saved.volume}, Brightness — {saved.brightness}
        </p>
      )}
    </div>
  )
}
