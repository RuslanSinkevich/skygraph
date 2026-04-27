import {
  Form,
  Field,
  SubmitButton,
  Select,
  useFormContext,
  useWatch,
} from '@skygraph/react'
import { roleOptions } from './shared'
import './styles.css'

/**
 * `useWatch(core, path)` subscribes a component to a single field path and
 * re-renders only when *that* value changes — zero re-renders for siblings.
 * Great for live previews, derived summaries, and conditional UI.
 */
function LiveState() {
  const { core } = useFormContext()
  const name = useWatch(core, 'name')
  const email = useWatch(core, 'email')
  const role = useWatch(core, 'role')

  const entries: Array<[string, unknown]> = [
    ['name', name],
    ['email', email],
    ['role', role],
  ]

  return (
    <div className="demo-live-state">
      <div className="demo-live-state-title">useWatch — live values</div>
      <div className="demo-live-state-row">
        {entries.map(([key, val]) => (
          <span key={key}>
            <span className="demo-live-state-key">{key}</span>
            {': '}
            <span className="demo-live-state-value">
              {val === '' ? '""' : JSON.stringify(val ?? null)}
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}

export function LiveWatchForm() {
  return (
    <Form
      layout="vertical"
      defaultValues={{ name: '', email: '', role: '' }}
      onSubmit={(v) => console.log(v)}
    >
      <LiveState />
      <Field name="name" label="Name" rules={[{ required: true }]} />
      <Field name="email" label="Email" type="email" />
      <Field name="role" label="Role">
        {(f) => (
          <Select
            value={f.value as string}
            onChange={(v) => f.onChange(v)}
            options={roleOptions}
            placeholder="Pick one"
          />
        )}
      </Field>
      <SubmitButton>Save</SubmitButton>
    </Form>
  )
}
