import { Result, Button } from '@skygraph/react'

/**
 * Negative outcome — `status="error"` swaps to the red cross icon.
 * Pair with a clear recovery CTA ("Try again" / "Contact support")
 * and keep the subtitle actionable rather than scolding.
 */
export function ErrorResult() {
  return (
    <Result
      status="error"
      title="Submission Failed"
      subTitle="Please check and modify the following information before resubmitting."
      extra={
        <>
          <Button type="primary">Try Again</Button>
          <Button>Contact support</Button>
        </>
      }
    />
  )
}
