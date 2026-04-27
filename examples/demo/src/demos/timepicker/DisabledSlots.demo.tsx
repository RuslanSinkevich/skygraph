import { TimePicker } from '@skygraph/react'

/**
 * `disabledHours` / `disabledMinutes` grey out specific slots — ideal
 * for business hours. The callbacks get the currently-picked hour so
 * you can vary the minute restrictions per hour if you need to.
 */
export function DisabledSlotsTimePicker() {
  const disabledHours = () => [...Array(8).keys(), 18, 19, 20, 21, 22, 23]
  const disabledMinutes = () => [5, 10, 15, 20, 25, 35, 40, 45, 50, 55]

  return (
    <TimePicker
      defaultValue="09:30"
      format="HH:mm"
      showSecond={false}
      disabledHours={disabledHours}
      disabledMinutes={disabledMinutes}
      placeholder="Business hours only"
    />
  )
}
