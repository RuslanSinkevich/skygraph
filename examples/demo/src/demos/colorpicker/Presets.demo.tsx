import { ColorPicker } from '@skygraph/react'

/**
 * `presets` renders grouped swatch rows under the main panel. Use
 * them for brand-approved palettes so designers aren't depending on
 * users eye-balling the wheel.
 */
export function PresetsColorPicker() {
  return (
    <ColorPicker
      defaultValue="#1677ff"
      showText
      presets={[
        {
          label: 'Brand',
          colors: ['#1677ff', '#722ed1', '#eb2f96', '#f5222d', '#fa8c16', '#52c41a'],
        },
        {
          label: 'Neutrals',
          colors: ['#000000', '#434343', '#8c8c8c', '#bfbfbf', '#f0f0f0', '#ffffff'],
        },
      ]}
    />
  )
}
