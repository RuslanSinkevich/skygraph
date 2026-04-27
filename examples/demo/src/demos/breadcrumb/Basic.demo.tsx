import { Breadcrumb } from '@skygraph/react'

/**
 * Ordered trail from root (left) to current page (right). The last
 * segment is automatically rendered as non-interactive current page
 * text and gets a bolder weight.
 */
export function BasicBreadcrumb() {
  return (
    <Breadcrumb
      items={[
        { title: 'Home', href: '#' },
        { title: 'Application Center', href: '#' },
        { title: 'Current application' },
      ]}
    />
  )
}
