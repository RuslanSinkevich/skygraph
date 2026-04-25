import { Breadcrumb } from '@skygraph/react'
import { ComponentDoc, DemoBox, PropsTable } from '../components'
import type { PropDef } from '../components'

const breadcrumbProps: PropDef[] = [
  { name: 'items', description: 'Array of breadcrumb items', type: 'BreadcrumbItem[]' },
  { name: 'separator', description: 'Custom separator', type: 'ReactNode', default: "'/' " },
]

const itemProps: PropDef[] = [
  { name: 'title', description: 'Display title', type: 'ReactNode' },
  { name: 'href', description: 'Link of the item', type: 'string' },
  { name: 'onClick', description: 'Click handler', type: '() => void' },
]

export function BreadcrumbDemo() {
  return (
    <ComponentDoc
      title="Breadcrumb"
      description="A breadcrumb displays the current location within a hierarchy."
      whenToUse={[
        'When the system has more than two layers in a hierarchy.',
        'When you need to inform the user of where they are.',
      ]}
    >
      <DemoBox
        title="Basic"
        description="The simplest use."
        code={`import { Breadcrumb } from '@skygraph/react'

<Breadcrumb items={[
  { title: 'Home', href: '#' },
  { title: 'Application Center', href: '#' },
  { title: 'An Application' },
]} />`}
      >
        <Breadcrumb items={[
          { title: 'Home', href: '#' },
          { title: 'Application Center', href: '#' },
          { title: 'An Application' },
        ]} />
      </DemoBox>

      <DemoBox
        title="Custom Separator"
        description="The separator can be customized."
        code={`<Breadcrumb
  separator=">"
  items={[
    { title: 'Home' },
    { title: 'Projects' },
    { title: 'Current' },
  ]}
/>`}
      >
        <Breadcrumb
          separator=">"
          items={[
            { title: 'Home' },
            { title: 'Projects' },
            { title: 'Current' },
          ]}
        />
      </DemoBox>

      <DemoBox
        title="With onClick"
        description="Breadcrumb items can have click handlers."
        code={`<Breadcrumb items={[
  { title: 'Home', onClick: () => alert('Home') },
  { title: 'Category', onClick: () => alert('Category') },
  { title: 'Detail' },
]} />`}
      >
        <Breadcrumb items={[
          { title: 'Home', onClick: () => alert('Home clicked') },
          { title: 'Category', onClick: () => alert('Category clicked') },
          { title: 'Detail' },
        ]} />
      </DemoBox>

      <DemoBox
        title="Emoji separator"
        description="Any ReactNode works as a separator."
        code={`<Breadcrumb
  separator={<span>›</span>}
  items={[{ title: 'Root' }, { title: 'Branch' }, { title: 'Leaf' }]}
/>`}
      >
        <Breadcrumb
          separator={<span>›</span>}
          items={[{ title: 'Root' }, { title: 'Branch' }, { title: 'Leaf' }]}
        />
      </DemoBox>

      <DemoBox
        title="With icons"
        description="Use ReactNode in title to render icons or flags."
        code={`<Breadcrumb items={[
  { title: <span>🏠 Home</span>, href: '#' },
  { title: <span>📦 Projects</span> },
  { title: 'Current' },
]} />`}
      >
        <Breadcrumb
          items={[
            { title: <span>🏠 Home</span>, href: '#' },
            { title: <span>📦 Projects</span> },
            { title: 'Current' },
          ]}
        />
      </DemoBox>

      <PropsTable data={breadcrumbProps} />
      <PropsTable title="BreadcrumbItem" data={itemProps} />
    </ComponentDoc>
  )
}
