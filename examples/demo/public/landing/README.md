# Landing page screenshots

Drop the files listed below into this folder, then remove the
corresponding `<ImagePlaceholder>` instance in
`src/pages/Landing/Landing.tsx` and replace it with a plain `<img>`
referencing the file (e.g. `<img src="/landing/hero.png" alt="…" />`).

All screenshots should be exported at **2× resolution** for retina
displays. Plain background, no browser chrome — the box on the page
already provides framing.

| File | Aspect | Final size (px) | Content |
|------|--------|-----------------|---------|
| `hero.png` | 4:3 | 1280×960 (2× = 2560×1920) | Hero shot — composite screenshot of the SkyGraph CRM showcase in light theme: sidebar + contacts table + filters on the right. |
| `crm.png` | 16:9 | 1280×720 (2× = 2560×1440) | CRM showcase — contacts table on the left, deals pipeline board on the right, activity timeline at the bottom. Light theme. |
| `dashboard.png` | 16:9 | 1280×720 | Operations dashboard — 4 KPI cards on top, mixed line/bar chart in the middle, breakdown table at the bottom. Dark theme. |
| `workflow.png` | 16:9 | 1280×720 | Workflow editor — orthogonal flowchart with start/end blocks and a couple of decision diamonds, inspector panel on the right. Light theme. |
| `table.png` | 16:9 | 1280×720 | Kitchen-sink table — filter chips above, virtual-scroll grid with grouped rows, totals row at the bottom. Light theme. |
| `spot-theming.png` | 4:3 | 1280×960 | Side-by-side: same dashboard in light theme on the left and dark theme on the right; theme toggle highlighted between them. |
| `spot-charts.png` | 4:3 | 1280×960 | Composite of two visuals — a responsive area chart with crosshair and tooltip + a small flowchart fragment with a hover toolbar. |
| `spot-forms.png` | 4:3 | 1280×960 | Profile form — required-field hint shown next to an input, dependent country/city fields, validation error inline. |

Once a file is dropped here, the corresponding `<ImagePlaceholder>` can
be replaced with:

```tsx
<img
  src="/landing/<file>"
  alt={t.landing.<altKey>}
  className="landing-showcase-image"  // for showcase images
  loading="lazy"
/>
```
