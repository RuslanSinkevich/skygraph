import { Tabs } from '@skygraph/react'

export function TabsDemo() {
  return (
    <section>
      <h2>Tabs</h2>
      <Tabs
        items={[
          { key: '1', label: 'Tab 1', children: <p>Content of Tab 1</p> },
          { key: '2', label: 'Tab 2', children: <p>Content of Tab 2</p>, loading: true },
          { key: '3', label: 'Tab 3', children: <p>Content of Tab 3</p> },
          { key: '4', label: 'Disabled', children: <p>Nope</p>, disabled: true },
        ]}
      />
    </section>
  )
}
