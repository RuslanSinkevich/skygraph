import { Breadcrumb } from '@skygraph/react'

export function BreadcrumbDemo() {
  return (
    <section>
      <h2>Breadcrumb</h2>
      <p style={{ color: 'var(--sg-color-text-secondary)', marginBottom: 16 }}>
        Navigation breadcrumbs with links and custom separators.
      </p>

      <h4 style={{ marginBottom: 8 }}>Basic</h4>
      <div style={{ marginBottom: 16 }}>
        <Breadcrumb items={[
          { title: 'Home', href: '#' },
          { title: 'Components', href: '#' },
          { title: 'Breadcrumb' },
        ]} />
      </div>

      <h4 style={{ marginBottom: 8 }}>Custom Separator</h4>
      <div style={{ marginBottom: 16 }}>
        <Breadcrumb
          separator=">"
          items={[
            { title: 'App' },
            { title: 'Settings', onClick: () => alert('Settings clicked') },
            { title: 'Profile' },
          ]}
        />
      </div>

      <h4 style={{ marginBottom: 8 }}>Long Path</h4>
      <Breadcrumb items={[
        { title: 'Home', href: '#' },
        { title: 'Category', href: '#' },
        { title: 'Subcategory', href: '#' },
        { title: 'Product', href: '#' },
        { title: 'Details' },
      ]} />
    </section>
  )
}
