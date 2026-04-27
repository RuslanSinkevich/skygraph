import {
  Form,
  Field,
  SubmitButton,
  Select,
  Checkbox,
  RadioGroup,
  Switch,
  InputNumber,
  DatePicker,
  TimePicker,
  AutoComplete,
  Slider,
  Rate,
} from '@skygraph/react'
import { roleOptions, skillOptions, genderOptions } from './shared'
import './styles.css'

/**
 * Gallery of every supported control wired through `Field`. Use the render
 * prop (`children={(field) => ...}`) to plug any controlled component into
 * the form store — `field.value` and `field.onChange` are the full API.
 */
export function FormControlsShowcase() {
  return (
    <Form
      layout="vertical"
      defaultValues={{
        role: '',
        skill: '',
        gender: 'other',
        age: 25,
        experience: 50,
        rating: 3,
        newsletter: false,
        darkMode: true,
        birthDate: null,
        startTime: '',
      }}
      onSubmit={(values) => console.log(values)}
    >
      <div className="demo-form-grid-2">
        <Field name="role" label="Role (Select)" rules={[{ required: true }]}>
          {(f) => (
            <Select
              value={f.value as string}
              onChange={(v) => f.onChange(v)}
              options={roleOptions}
              placeholder="Pick one"
            />
          )}
        </Field>

        <Field name="skill" label="Primary skill (AutoComplete)">
          {(f) => (
            <AutoComplete
              value={f.value as string}
              onChange={(v) => f.onChange(v)}
              options={skillOptions}
              placeholder="Start typing…"
            />
          )}
        </Field>

        <Field name="age" label="Age (InputNumber)">
          {(f) => (
            <InputNumber
              value={f.value as number}
              onChange={(v) => f.onChange(v)}
              min={18}
              max={99}
            />
          )}
        </Field>

        <Field name="gender" label="Gender (RadioGroup)">
          {(f) => (
            <RadioGroup
              value={f.value as string}
              onChange={(v) => f.onChange(v)}
              options={genderOptions}
            />
          )}
        </Field>

        <Field name="birthDate" label="Birth date (DatePicker)">
          {(f) => (
            <DatePicker
              value={(f.value as Date | undefined) ?? undefined}
              onChange={(d) => f.onChange(d)}
            />
          )}
        </Field>

        <Field name="startTime" label="Start time (TimePicker)">
          {(f) => (
            <TimePicker
              value={f.value as string}
              onChange={(v) => f.onChange(v)}
            />
          )}
        </Field>

        <Field name="experience" label="Experience (Slider)">
          {(f) => (
            <Slider value={f.value as number} onChange={(v) => f.onChange(v)} />
          )}
        </Field>

        <Field name="rating" label="Rating (Rate)">
          {(f) => (
            <Rate value={f.value as number} onChange={(v) => f.onChange(v)} />
          )}
        </Field>
      </div>

      <div style={{ display: 'flex', gap: 20, marginTop: 4, marginBottom: 16 }}>
        <Field name="newsletter">
          {(f) => (
            <Checkbox
              checked={f.value as boolean}
              onChange={(v) => f.onChange(v)}
            >
              Subscribe to newsletter
            </Checkbox>
          )}
        </Field>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Field name="darkMode">
            {(f) => (
              <Switch
                checked={f.value as boolean}
                onChange={(v) => f.onChange(v)}
              />
            )}
          </Field>
          <span>Dark mode</span>
        </div>
      </div>

      <SubmitButton>Save preferences</SubmitButton>
    </Form>
  )
}
