import { Popconfirm, Button } from '@skygraph/react'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    topTitle: 'Top placement',
    bottomTitle: 'Bottom placement',
    leftTitle: 'Left placement',
    rightTitle: 'Right placement',
    top: 'Top',
    bottom: 'Bottom',
    left: 'Left',
    right: 'Right',
  },
  ru: {
    topTitle: 'Размещение сверху',
    bottomTitle: 'Размещение снизу',
    leftTitle: 'Размещение слева',
    rightTitle: 'Размещение справа',
    top: 'Сверху',
    bottom: 'Снизу',
    left: 'Слева',
    right: 'Справа',
  },
} as const

/**
 * Four sides, anchored to the centre of the trigger. No auto-flip —
 * choose a placement that has room to open.
 */
export function PlacementPopconfirm() {
  const t = useDemoStrings(STRINGS)
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, auto)',
        gap: 12,
        padding: 60,
        justifyContent: 'start',
      }}
    >
      <Popconfirm title={t.topTitle} placement="top">
        <Button>{t.top}</Button>
      </Popconfirm>
      <Popconfirm title={t.bottomTitle} placement="bottom">
        <Button>{t.bottom}</Button>
      </Popconfirm>
      <Popconfirm title={t.leftTitle} placement="left">
        <Button>{t.left}</Button>
      </Popconfirm>
      <Popconfirm title={t.rightTitle} placement="right">
        <Button>{t.right}</Button>
      </Popconfirm>
    </div>
  )
}
