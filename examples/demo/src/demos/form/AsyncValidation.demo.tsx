import { Form, Field, SubmitButton } from '@skygraph/react'

/**
 * Async validators return a Promise. The field shows a spinner while the
 * validator runs (and `validateStatus === 'validating'`), then the final
 * status. The fake API below rejects `admin` / `root` to mimic a
 * "username taken" check.
 */
const takenUsernames = new Set(['admin', 'root', 'skygraph'])

function checkUsername(name: string): Promise<string | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (!name) resolve('Username is required')
      else if (takenUsernames.has(name)) resolve(`"${name}" is already taken`)
      else resolve(null)
    }, 700)
  })
}

export function AsyncValidationForm() {
  return (
    <Form
      layout="vertical"
      defaultValues={{ username: '' }}
      validateTrigger="blur"
      onSubmit={(values) => console.log(values)}
      style={{ maxWidth: 420 }}
    >
      <Field
        name="username"
        label="Username"
        hasFeedback
        extra={'Try "admin" or "root" to see the error state.'}
        rules={[
          { required: true },
          { validator: (value) => checkUsername(String(value ?? '')) },
        ]}
        placeholder="Pick a unique handle"
      />
      <SubmitButton>Reserve name</SubmitButton>
    </Form>
  )
}
