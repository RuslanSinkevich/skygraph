export interface PropDef {
  name: string
  description: string
  type: string
  default?: string
}

export interface PropsTableProps {
  title?: string
  data: PropDef[]
}

export function PropsTable({ title = 'API', data }: PropsTableProps) {
  return (
    <div className="demo-props-section">
      <h3 className="demo-props-title">{title}</h3>
      <table className="doc-table">
        <thead>
          <tr>
            <th>Property</th>
            <th>Description</th>
            <th>Type</th>
            <th>Default</th>
          </tr>
        </thead>
        <tbody>
          {data.map((prop) => (
            <tr key={prop.name}>
              <td><code>{prop.name}</code></td>
              <td>{prop.description}</td>
              <td><code>{prop.type}</code></td>
              <td>{prop.default ? <code>{prop.default}</code> : '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
