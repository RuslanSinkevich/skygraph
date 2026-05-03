import { Tooltip, Button } from '@skygraph/react'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    top: 'Top',
    bottom: 'Bottom',
    left: 'Left',
    right: 'Right',
  },
  ru: {
    top: 'Сверху',
    bottom: 'Снизу',
    left: 'Слева',
    right: 'Справа',
  },
} as const

/**
 * Four sides are supported; the arrow anchors to the centre of the
 * trigger. There's no auto-flip — pick a side that fits your layout.
 */
export function PlacementTooltip() {
  const t = useDemoStrings(STRINGS)
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, auto)',
        gap: 12,
        padding: 40,
        justifyContent: 'start',
      }}
    >
      <Tooltip title={t.top} placement="top">
        <Button>{t.top}</Button>
      </Tooltip>
      <Tooltip title={t.bottom} placement="bottom">
        <Button>{t.bottom}</Button>
      </Tooltip>
      <Tooltip title={t.left} placement="left">
        <Button>{t.left}</Button>
      </Tooltip>
      <Tooltip title={t.right} placement="right">
        <Button>{t.right}</Button>
      </Tooltip>
    </div>
  )
}
