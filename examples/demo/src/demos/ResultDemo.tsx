import { Result, Button } from '@skygraph/react'
import { ComponentDoc, DemoBox, PropsTable } from '../components'
import type { PropDef } from '../components'

const resultProps: PropDef[] = [
  { name: 'status', description: 'Result status, decides icon and color', type: "'success' | 'error' | 'info' | 'warning' | '404' | '403' | '500'" },
  { name: 'title', description: 'The title', type: 'ReactNode' },
  { name: 'subTitle', description: 'The subtitle', type: 'ReactNode' },
  { name: 'icon', description: 'Custom icon', type: 'ReactNode' },
  { name: 'extra', description: 'Operating area, typically action buttons', type: 'ReactNode' },
  { name: 'children', description: 'Additional content below', type: 'ReactNode' },
]

export function ResultDemo() {
  return (
    <ComponentDoc
      title="Result"
      description="Used to feed back the results of a series of operational tasks."
      whenToUse={[
        'When important operations need to inform the user to process the results and the feedback is more complicated.',
        'To show error pages like 404, 403, 500.',
      ]}
    >
      <DemoBox
        title="Success"
        description="Show success result."
        code={`import { Result, Button } from '@skygraph/react'

<Result
  status="success"
  title="Successfully Purchased!"
  subTitle="Order number: 2017182818828182881."
  extra={<Button type="primary">Back Home</Button>}
/>`}
      >
        <Result
          status="success"
          title="Successfully Purchased!"
          subTitle="Order number: 2017182818828182881."
          extra={<Button type="primary">Back Home</Button>}
        />
      </DemoBox>

      <DemoBox
        title="Error"
        description="Show error result."
        code={`<Result
  status="error"
  title="Submission Failed"
  subTitle="Please check and modify the following information before resubmitting."
  extra={<Button type="primary">Try Again</Button>}
/>`}
      >
        <Result
          status="error"
          title="Submission Failed"
          subTitle="Please check and modify the following information before resubmitting."
          extra={<Button type="primary">Try Again</Button>}
        />
      </DemoBox>

      <DemoBox
        title="Info & Warning"
        description="Info and warning results."
        code={`<Result status="info" title="Your operation has been executed" />
<Result status="warning" title="There are some problems with your operation" />`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <Result status="info" title="Your operation has been executed" />
          <Result status="warning" title="There are some problems with your operation" />
        </div>
      </DemoBox>

      <DemoBox
        title="404"
        description="HTTP error pages."
        code={`<Result
  status="404"
  title="404"
  subTitle="Sorry, the page you visited does not exist."
  extra={<Button type="primary">Back Home</Button>}
/>`}
      >
        <Result
          status="404"
          title="404"
          subTitle="Sorry, the page you visited does not exist."
          extra={<Button type="primary">Back Home</Button>}
        />
      </DemoBox>

      <PropsTable data={resultProps} />
    </ComponentDoc>
  )
}
