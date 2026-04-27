import { Slider } from '@skygraph/react'

/**
 * `unstyled` drops SkyGraph classes. The DOM structure (track, fill,
 * handle) stays so you can target it yourself, and `role="slider"`
 * remains on the thumb.
 */
export function UnstyledSlider() {
  return (
    <div
      style={{
        maxWidth: 360,
        padding: 12,
        border: '1px dashed var(--sg-color-border)',
        borderRadius: 8,
      }}
    >
      <Slider unstyled defaultValue={35} />
    </div>
  )
}
