import { useI18n } from '../i18n'

export interface PropDef {
  name: string
  description: string
  type: string
  default?: string
  /** Mark prop as required — renders an asterisk next to the name. */
  required?: boolean
}

export interface PropsTableProps {
  title?: string
  data: PropDef[]
}

export function PropsTable({ title, data }: PropsTableProps) {
  const { t } = useI18n()
  const heading = title ?? t.propsTable.titleApi

  return (
    <div className="demo-props-section">
      <h3 className="demo-props-title">{heading}</h3>
      <table className="doc-table">
        <thead>
          <tr>
            <th>{t.propsTable.colProperty}</th>
            <th>{t.propsTable.colDescription}</th>
            <th>{t.propsTable.colType}</th>
            <th>{t.propsTable.colDefault}</th>
          </tr>
        </thead>
        <tbody>
          {data.map((prop) => (
            <tr key={prop.name}>
              <td>
                <code>{prop.name}</code>
                {prop.required ? (
                  <span aria-label={t.propsTable.requiredLabel} style={{ color: 'var(--sg-color-error)' }}>
                    {' *'}
                  </span>
                ) : null}
              </td>
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
