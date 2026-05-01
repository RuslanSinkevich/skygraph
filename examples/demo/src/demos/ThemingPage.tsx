import { useI18n } from '../i18n'

export function ThemingPage() {
  const { t } = useI18n()
  const th = t.theming

  return (
    <section className="doc-page">
      <h1>{th.title}</h1>
      <p className="doc-lead">{th.lead}</p>

      <h2 id="three-layers">{th.threeLayersHeading}</h2>
      <table className="doc-table">
        <thead>
          <tr>
            <th>{th.colLayer}</th>
            <th>{th.colPrefix}</th>
            <th>{th.colPurpose}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>{th.layerPalette}</strong></td>
            <td><code>--sg-palette-*</code></td>
            <td>{th.layerPalettePurpose}</td>
          </tr>
          <tr>
            <td><strong>{th.layerSemantic}</strong></td>
            <td><code>--sg-color-*</code></td>
            <td>{th.layerSemanticPurpose}</td>
          </tr>
          <tr>
            <td><strong>{th.layerComponent}</strong></td>
            <td><code>--sg-btn-*, --sg-input-*</code></td>
            <td>{th.layerComponentPurpose}</td>
          </tr>
        </tbody>
      </table>
      <p>{th.layersFooter}</p>

      <h2 id="dark-mode">{th.darkModeHeading}</h2>
      <p>{th.darkModeLead}</p>
      <pre className="doc-code"><code>{`document.documentElement.setAttribute('data-sg-theme', 'dark')`}</code></pre>
      <p>{th.darkModeNote}</p>
      <pre className="doc-code"><code>{`<!-- Static HTML approach -->
<html data-sg-theme="dark">
  ...
</html>

<!-- React toggle -->
function ThemeSwitch() {
  const [dark, setDark] = useState(false)
  const toggle = () => {
    const next = !dark
    setDark(next)
    document.documentElement.setAttribute(
      'data-sg-theme', next ? 'dark' : 'light'
    )
  }
  return <Switch checked={dark} onChange={toggle} />
}`}</code></pre>

      <h2 id="custom-theme">{th.customThemeHeading}</h2>
      <p>{th.customThemeLead}</p>
      <pre className="doc-code"><code>{`:root {
  --sg-color-primary: #7c3aed;
  --sg-color-primary-hover: #6d28d9;
  --sg-color-primary-active: #5b21b6;
  --sg-color-primary-bg: rgba(124, 58, 237, 0.08);
}`}</code></pre>
      <p>{th.customThemeFooter}</p>

      <h2 id="component-tokens">{th.perComponentHeading}</h2>
      <p>{th.perComponentLead}</p>
      <pre className="doc-code"><code>{`/* Make buttons taller with rounded corners */
:root {
  --sg-btn-height: 40px;
  --sg-btn-border-radius: 20px;
  --sg-btn-font-size: 15px;
}

/* Larger inputs */
:root {
  --sg-input-height: 42px;
  --sg-input-border-radius: 8px;
}`}</code></pre>

      <h2 id="slots">{th.slotsHeading}</h2>
      <p>{th.slotsLead}</p>
      <pre className="doc-code"><code>{`<Table
  classNames={{
    root: 'orders-table',
    toolbar: 'orders-table__toolbar',
    headerCell: 'orders-table__th',
    bodyCell: 'orders-table__td',
    row: 'orders-table__row',
  }}
  styles={{
    headerCell: { fontSize: 16 },
  }}
  ...
/>`}</code></pre>

      <h2 id="headless">{th.headlessHeading}</h2>
      <p>{th.headlessLead}</p>
      <pre className="doc-code"><code>{`<Button unstyled className="my-btn">
  Custom styled
</Button>

<Select unstyled className="my-select" options={opts} />`}</code></pre>
      <p>{th.headlessFooter}</p>
    </section>
  )
}
