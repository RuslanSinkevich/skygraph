import { Calendar } from '@skygraph/react'

/**
 * `locale` overrides the default English strings. Combine with
 * `weekStartDay={1}` for Monday-first calendars typical in the EU.
 */
export function LocaleCalendar() {
  return (
    <Calendar
      fullscreen={false}
      weekStartDay={1}
      locale={{
        monthNames: [
          'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
          'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь',
        ],
        dayNames: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
        today: 'Сегодня',
        week: 'Нед.',
      }}
      showWeekNumber
    />
  )
}
