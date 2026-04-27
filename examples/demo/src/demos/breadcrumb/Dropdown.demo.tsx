import { Breadcrumb, Dropdown } from '@skygraph/react'

/**
 * Put a Dropdown inside a `title` to open a sibling list — the
 * classic "jump to another project" pattern on deep paths.
 */
export function DropdownBreadcrumb() {
  const projects = [
    { key: 'alpha', label: 'Project Alpha' },
    { key: 'beta', label: 'Project Beta' },
    { key: 'gamma', label: 'Project Gamma' },
  ]

  return (
    <Breadcrumb
      items={[
        { title: 'Home', href: '#' },
        {
          title: (
            <Dropdown items={projects} trigger="click">
              <span style={{ cursor: 'pointer' }}>Projects ▾</span>
            </Dropdown>
          ),
        },
        { title: 'Alpha' },
      ]}
    />
  )
}
