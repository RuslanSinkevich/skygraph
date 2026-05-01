import { useI18n } from '../i18n'

/**
 * Documents CSS custom properties exposed by a component. Keep one entry
 * per overridable token — if the token is set by the component itself but
 * not meant to be tweaked, don't list it.
 */
export interface CssVarDef {
  /** Variable name without the leading `--`. */
  name: string
  /** Default value (literal or `var(--other)`). */
  default: string
  /** One-line explanation of what this variable controls. */
  description: string
}

export interface CssVarsTableProps {
  title?: string
  /** Optional usage note rendered under the title. */
  hint?: string
  data: CssVarDef[]
}

export function CssVarsTable({ title, hint, data }: CssVarsTableProps) {
  const { t } = useI18n()
  if (data.length === 0) return null

  const heading = title ?? t.cssVarsTable.title

  return (
    <div className="demo-props-section">
      <h3 className="demo-props-title">{heading}</h3>
      {hint && (
        <p
          style={{
            margin: '-4px 0 12px',
            fontSize: 13,
            color: 'var(--sg-color-text-secondary)',
          }}
        >
          {hint}
        </p>
      )}
      <table className="doc-table">
        <thead>
          <tr>
            <th style={{ width: '30%' }}>{t.cssVarsTable.colVariable}</th>
            <th style={{ width: '28%' }}>{t.cssVarsTable.colDefault}</th>
            <th>{t.cssVarsTable.colDescription}</th>
          </tr>
        </thead>
        <tbody>
          {data.map((v) => (
            <tr key={v.name}>
              <td>
                <code>--{v.name}</code>
              </td>
              <td>
                <code>{v.default}</code>
              </td>
              <td>{v.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
