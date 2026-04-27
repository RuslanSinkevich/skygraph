import { useState } from 'react'
import {
  Form,
  Field,
  SubmitButton,
  Button,
  Select,
  Switch,
  DatePicker,
  Upload,
} from '@skygraph/react'
import type { UploadFile } from '@skygraph/react'
import { countryOptions } from './shared'
import './styles.css'

/**
 * Multi-section profile editor — shows how to compose sections, a 2-column
 * grid, toggles, a date picker, and an upload inside one form. Styling is
 * fully contained in `./styles.css` (`.demo-profile-*`).
 */
export function ProfileSettingsForm() {
  const [files, setFiles] = useState<UploadFile[]>([])

  return (
    <Form
      layout="vertical"
      defaultValues={{
        firstName: 'Ada',
        lastName: 'Lovelace',
        email: 'ada@example.com',
        country: 'ru',
        birthDate: null,
        emailNotifications: true,
        pushNotifications: false,
        marketing: false,
      }}
      onSubmit={(values) =>
        console.log('profile', { ...values, avatar: files.map((f) => f.name) })
      }
    >
      <div className="demo-profile-section-title">Personal info</div>
      <div className="demo-profile-grid">
        <Field name="firstName" label="First name" rules={[{ required: true }]} />
        <Field name="lastName" label="Last name" rules={[{ required: true }]} />
        <Field
          name="email"
          label="Email"
          type="email"
          rules={[{ required: true }, { type: 'email' }]}
        />
        <Field name="country" label="Country">
          {(f) => (
            <Select
              value={f.value as string}
              onChange={(v) => f.onChange(v)}
              options={countryOptions}
            />
          )}
        </Field>
        <Field name="birthDate" label="Birth date">
          {(f) => (
            <DatePicker
              value={(f.value as Date | undefined) ?? undefined}
              onChange={(d) => f.onChange(d)}
            />
          )}
        </Field>
      </div>

      <div className="demo-profile-section-title">Notifications</div>
      <div className="demo-profile-grid">
        <Field name="emailNotifications" label="Email notifications">
          {(f) => (
            <Switch
              checked={f.value as boolean}
              onChange={(v) => f.onChange(v)}
            />
          )}
        </Field>
        <Field name="pushNotifications" label="Push notifications">
          {(f) => (
            <Switch
              checked={f.value as boolean}
              onChange={(v) => f.onChange(v)}
            />
          )}
        </Field>
        <Field name="marketing" label="Marketing emails" help="Product updates, tips, and offers">
          {(f) => (
            <Switch
              checked={f.value as boolean}
              onChange={(v) => f.onChange(v)}
            />
          )}
        </Field>
      </div>

      <div className="demo-profile-section-title">Avatar</div>
      <Upload
        accept="image/*"
        fileList={files}
        onUpload={(news) =>
          setFiles((prev) => [
            ...prev,
            ...news.map((f, i) => ({
              uid: `${Date.now()}-${i}`,
              name: f.name,
              size: f.size,
              status: 'done' as const,
            })),
          ])
        }
        onRemove={(f) => setFiles((prev) => prev.filter((x) => x.uid !== f.uid))}
      />

      <div style={{ display: 'flex', gap: 8, marginTop: 20 }}>
        <SubmitButton>Save changes</SubmitButton>
        <Button type="default">Cancel</Button>
      </div>
    </Form>
  )
}
