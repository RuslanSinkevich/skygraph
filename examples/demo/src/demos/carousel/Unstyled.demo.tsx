import { Carousel } from '@skygraph/react'
import { slideBase, paletteColors } from './data'

/**
 * `unstyled` drops the container chrome and renders the active
 * slide as-is, plus numeric `<button>` controls. Autoplay still
 * works; build your own transition in CSS.
 */
export function UnstyledCarousel() {
  return (
    <div>
      <style>{`
        .demo-raw-carousel { display: flex; flex-direction: column; gap: 8px; }
        .demo-raw-carousel > :not(:last-child) { border-radius: 12px; overflow: hidden; }
        .demo-raw-carousel > div:last-child { display: flex; gap: 8px; }
        .demo-raw-carousel button { width: 28px; height: 28px; border-radius: 999px; border: 1px solid #e5e7eb; background: white; cursor: pointer; }
        .demo-raw-carousel button[aria-current="true"] { background: #111; color: white; border-color: #111; }
      `}</style>
      <Carousel unstyled className="demo-raw-carousel">
        {paletteColors.map((bg, i) => (
          <div key={i} style={{ ...slideBase, background: bg }}>Raw {i + 1}</div>
        ))}
      </Carousel>
    </div>
  )
}
