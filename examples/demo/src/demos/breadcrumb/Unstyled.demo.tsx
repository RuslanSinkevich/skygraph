import { Breadcrumb } from '@skygraph/react'

/**
 * `unstyled` drops the sg-breadcrumb classes but keeps the semantic
 * `<nav aria-label="Breadcrumb">` wrapper so assistive tech still
 * recognises it as navigation.
 */
export function UnstyledBreadcrumb() {
  return (
    <Breadcrumb
      unstyled
      separator={<span style={{ padding: '0 8px', opacity: 0.6 }}>/</span>}
      items={[
        { title: <a href="#" style={{ color: '#4f46e5', textDecoration: 'underline' }}>Home</a> },
        { title: <a href="#" style={{ color: '#4f46e5', textDecoration: 'underline' }}>Settings</a> },
        { title: <span style={{ fontWeight: 600 }}>Profile</span> },
      ]}
    />
  )
}
