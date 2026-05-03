import { Tooltip, Button } from '@skygraph/react'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    tipDisabled: 'Button is disabled — hover still works',
    disabled: 'Disabled',
    tipLocked: 'Icon explains the disabled state',
    locked: '🔒 Locked',
  },
  ru: {
    tipDisabled: 'Кнопка отключена — наведение всё равно работает',
    disabled: 'Отключено',
    tipLocked: 'Иконка объясняет отключённое состояние',
    locked: '🔒 Заблокировано',
  },
} as const

/**
 * Tooltip attaches its hover listeners to its own wrapper, not the
 * child — so a disabled Button underneath still reveals the tip
 * when the pointer enters the wrapper area.
 */
export function OnDisabledTooltip() {
  const t = useDemoStrings(STRINGS)
  return (
    <div style={{ display: 'flex', gap: 12 }}>
      <Tooltip title={t.tipDisabled}>
        <Button disabled>{t.disabled}</Button>
      </Tooltip>
      <Tooltip title={t.tipLocked}>
        <Button disabled>{t.locked}</Button>
      </Tooltip>
    </div>
  )
}
