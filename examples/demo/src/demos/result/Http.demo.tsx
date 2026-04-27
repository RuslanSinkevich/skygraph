import { Result, Button } from '@skygraph/react'

/**
 * Built-in HTTP error artwork for `404`, `403`, and `500`. The icon
 * is an outlined number — Result doesn't force a dedicated
 * illustration so you can swap it via `icon` if you like.
 */
export function HttpResult() {
  return (
    <div style={{ display: 'grid', gap: 32, gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={<Button type="primary">Back Home</Button>}
      />
      <Result
        status="403"
        title="403"
        subTitle="You don't have permission to view this page."
        extra={<Button type="primary">Sign in</Button>}
      />
      <Result
        status="500"
        title="500"
        subTitle="Sorry, something went wrong on our end."
        extra={<Button type="primary">Retry</Button>}
      />
    </div>
  )
}
