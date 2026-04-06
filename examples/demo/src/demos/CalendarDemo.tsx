import { useState } from 'react'
import { Calendar } from '../../../../packages/react/src/components/complex/Calendar'

function isWeekend(d: Date) {
  const day = d.getDay()
  return day === 0 || day === 6
}

export function CalendarDemo() {
  const [picked, setPicked] = useState<Date | null>(null)
  const [panelLog, setPanelLog] = useState<string>('—')
  const [lastPick, setLastPick] = useState<string>('—')

  return (
    <section style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      <h2>Calendar</h2>

      <section>
        <h3>Fullscreen (default)</h3>
        <div style={{ maxWidth: 560 }}>
          <Calendar
            fullscreen
            onSelect={(d) => setPicked(d)}
            onPanelChange={(d, mode) => {
              setPanelLog(`${d.toDateString()} · ${mode}`)
            }}
            locale={{ today: 'Today' }}
          />
        </div>
        <p style={{ marginTop: 8, fontSize: 12, opacity: 0.75 }}>
          Panel change: {panelLog}
        </p>
        {picked && (
          <p style={{ marginTop: 8, fontSize: 12, opacity: 0.8 }}>
            Last selected: {picked.toDateString()}
          </p>
        )}
      </section>

      <section>
        <h3>Mini (compact)</h3>
        <div style={{ maxWidth: 400 }}>
          <Calendar fullscreen={false} defaultValue={new Date()} />
        </div>
      </section>

      <section>
        <h3>Custom cell render</h3>
        <div style={{ maxWidth: 520 }}>
          <Calendar
            fullscreen={false}
            cellRender={(date, info) => {
              if (info.type === 'date' && date.getDate() % 7 === 0) {
                return <span style={{ fontSize: 10, color: 'var(--sg-color-primary)' }}>●</span>
              }
              if (info.type === 'month' && date.getMonth() === 5) {
                return <span style={{ fontSize: 10 }}>peak</span>
              }
              return null
            }}
          />
        </div>
      </section>

      <section>
        <h3>Disabled weekends</h3>
        <div style={{ maxWidth: 520 }}>
          <Calendar fullscreen={false} disabledDate={isWeekend} defaultValue={new Date()} />
        </div>
      </section>

      <section>
        <h3>Custom weekday labels</h3>
        <div style={{ maxWidth: 480 }}>
          <Calendar
            fullscreen={false}
            locale={{
              dayNames: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
              monthNames: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
              today: 'Go to today',
            }}
          />
        </div>
      </section>

      <section>
        <h3>onChange vs onSelect</h3>
        <p style={{ fontSize: 12, opacity: 0.75, marginBottom: 8 }}>
          Both fire when a date cell is picked; use <code>onPanelChange</code> when navigating months.
        </p>
        <div style={{ maxWidth: 440 }}>
          <Calendar
            fullscreen={false}
            onChange={(d) => setLastPick(`onChange: ${d.toDateString()}`)}
            onSelect={(d) => setLastPick(`onSelect: ${d.toDateString()}`)}
          />
        </div>
        <p style={{ marginTop: 8, fontSize: 12, opacity: 0.75 }}>Last event: {lastPick}</p>
      </section>
    </section>
  )
}
