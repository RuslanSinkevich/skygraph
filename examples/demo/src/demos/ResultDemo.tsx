import { Result } from '../../../../packages/react/src/components/ui/Result'
import { Button } from '../../../../packages/react/src/components/ui/Button'

export function ResultDemo() {
  return (
    <section style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <h2>Result</h2>

      <section>
        <h3>Success, error, info, warning</h3>
        <div style={{ display: 'grid', gap: 24 }}>
          <Result
            status="success"
            title="Submitted"
            subTitle="Your request was processed successfully."
            extra={<Button type="primary">View details</Button>}
          />
          <Result
            status="error"
            title="Payment failed"
            subTitle="The card was declined. Try another method."
            extra={<Button>Retry</Button>}
          />
          <Result status="info" title="Heads up" subTitle="Maintenance window starts at 02:00 UTC." />
          <Result status="warning" title="Unsaved changes" subTitle="Leave without saving?" />
        </div>
      </section>

      <section>
        <h3>Custom icon override</h3>
        <Result
          status="info"
          title="Custom artwork"
          subTitle="The status palette still applies; icon is fully replaced."
          icon={
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: '50%',
                background: 'linear-gradient(145deg, #667eea, #764ba2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontSize: 28,
              }}
            >
              ✦
            </div>
          }
          extra={<Button>OK</Button>}
        />
      </section>

      <section>
        <h3>HTTP-style: 404, 403, 500</h3>
        <div style={{ display: 'grid', gap: 24 }}>
          <Result
            status="404"
            title="404"
            subTitle="The page you visited does not exist."
            extra={<Button type="primary">Back home</Button>}
          />
          <Result
            status="403"
            title="403"
            subTitle="You do not have permission to access this resource."
          />
          <Result
            status="500"
            title="500"
            subTitle="Something went wrong on our side. Try again later."
            extra={
              <Button type="primary" onClick={() => window.location.reload()}>
                Reload
              </Button>
            }
          />
        </div>
      </section>
    </section>
  )
}
