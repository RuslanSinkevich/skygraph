/**
 * ImagePlaceholder — visual stand-in for landing page screenshots.
 *
 * The landing page references a number of PNG/JPG assets that live in
 * `examples/demo/public/landing/`. Until those files are produced, this
 * component renders a hatched box with the file name and a short
 * description so it is clear what should appear there.
 *
 * To swap in a real image:
 *   1. Drop the file into `examples/demo/public/landing/<name>`.
 *   2. Replace the `<ImagePlaceholder ... />` call with a plain
 *      `<img src="/landing/<name>" alt="..." />`.
 */

import type { CSSProperties } from 'react'

export type PlaceholderVariant = 'hero' | 'showcase' | 'spot'

interface ImagePlaceholderProps {
  /** Final file name (e.g. `crm.png`). Shown verbatim. */
  name: string
  /** Human description of what the image should depict. */
  description: string
  /** Aspect ratio + layout preset. */
  variant?: PlaceholderVariant
  /** Extra style overrides (rare; usually unnecessary). */
  style?: CSSProperties
}

export function ImagePlaceholder({
  name,
  description,
  variant = 'spot',
  style,
}: ImagePlaceholderProps) {
  return (
    <div
      className={`landing-image-placeholder landing-image-placeholder--${variant}`}
      role="img"
      aria-label={`Placeholder for ${name}: ${description}`}
      style={style}
    >
      <div>
        <div className="landing-image-placeholder-icon" aria-hidden="true">
          📷
        </div>
        <div className="landing-image-placeholder-name">/landing/{name}</div>
        <div className="landing-image-placeholder-desc">{description}</div>
      </div>
    </div>
  )
}
