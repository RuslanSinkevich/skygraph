import { Result, Button } from '@skygraph/react'

/**
 * Canonical confirmation after a long operation. `status="success"`
 * picks the checkmark icon and the `--sg-color-success` tint. Put
 * the primary CTA in `extra` so it sits under the subtitle.
 */
export function SuccessResult() {
  return (
    <Result
      status="success"
      title="Successfully Purchased!"
      subTitle="Order number: 2017182818828182881."
      extra={<Button type="primary">Back Home</Button>}
    />
  )
}
