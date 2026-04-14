export function ThemingPage() {
  return (
    <section className="doc-page">
      <h1>Theming</h1>
      <p className="doc-lead">
        SkyGraph uses a 3-layer CSS variable system. Override any layer to create
        your own theme — no build step, no JS runtime cost.
      </p>

      <h2 id="three-layers">Three Layers</h2>
      <table className="doc-table">
        <thead>
          <tr>
            <th>Layer</th>
            <th>Prefix</th>
            <th>Purpose</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Palette</strong></td>
            <td><code>--sg-palette-*</code></td>
            <td>Raw colors: blue-500, gray-100, etc.</td>
          </tr>
          <tr>
            <td><strong>Semantic</strong></td>
            <td><code>--sg-color-*</code></td>
            <td>Intent-based: primary, success, error, bg, text</td>
          </tr>
          <tr>
            <td><strong>Component</strong></td>
            <td><code>--sg-btn-*, --sg-input-*</code></td>
            <td>Per-component tokens for fine-grained control</td>
          </tr>
        </tbody>
      </table>
      <p>
        Palette feeds into semantic tokens, which feed into component tokens.
        Override at any layer — downstream tokens inherit automatically.
      </p>

      <h2 id="dark-mode">Dark Mode</h2>
      <p>
        Toggle dark mode by setting a single attribute on the root element:
      </p>
      <pre className="doc-code"><code>{`document.documentElement.setAttribute('data-sg-theme', 'dark')`}</code></pre>
      <p>
        SkyGraph ships light and dark palettes. The semantic layer references
        palette variables, so dark mode swaps the entire look with zero JS
        overhead.
      </p>
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

      <h2 id="custom-theme">Custom Theme</h2>
      <p>
        Override the primary color by setting semantic variables in your CSS:
      </p>
      <pre className="doc-code"><code>{`:root {
  --sg-color-primary: #7c3aed;
  --sg-color-primary-hover: #6d28d9;
  --sg-color-primary-active: #5b21b6;
  --sg-color-primary-bg: rgba(124, 58, 237, 0.08);
}`}</code></pre>
      <p>
        All components that reference <code>--sg-color-primary</code> will pick up
        the new color — buttons, links, active states, focus rings, etc.
      </p>

      <h2 id="component-tokens">Per-Component Customization</h2>
      <p>
        Each component exposes its own CSS variables for surgical overrides:
      </p>
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

      <h2 id="headless">Headless Mode</h2>
      <p>
        Need full control over styling? Pass <code>unstyled</code> to any
        component to strip all SkyGraph CSS. You keep the reactive behavior
        and accessibility — bring your own classes:
      </p>
      <pre className="doc-code"><code>{`<Button unstyled className="my-btn">
  Custom styled
</Button>

<Select unstyled className="my-select" options={opts} />`}</code></pre>
      <p>
        Headless mode is per-component — mix styled and unstyled freely in the
        same app.
      </p>
    </section>
  )
}
