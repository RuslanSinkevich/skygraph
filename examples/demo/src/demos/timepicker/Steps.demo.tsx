import { TimePicker } from '@skygraph/react'

/**
 * `hourStep` / `minuteStep` / `secondStep` thin out each column — use
 * them for appointment slots ("every 15 minutes") or to hide seconds
 * from unneeded places.
 */
export function StepsTimePicker() {
  return (
    <div style={{ display: 'grid', gap: 8, maxWidth: 320 }}>
      <TimePicker
        defaultValue="09:00"
        format="HH:mm"
        minuteStep={15}
        showSecond={false}
        placeholder="15-minute slots"
      />
      <TimePicker
        defaultValue="00:00"
        format="HH:mm"
        hourStep={2}
        showSecond={false}
        placeholder="Every 2 hours"
      />
    </div>
  )
}
