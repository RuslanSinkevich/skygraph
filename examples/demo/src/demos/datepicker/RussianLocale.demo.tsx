import { useState } from 'react'
import { ConfigProvider, DatePicker, ru_RU } from '@skygraph/react'

/**
 * `ConfigProvider` с пресетом `ru_RU`: названия месяцев и дней недели,
 * подписи «Сегодня», «Сейчас» и кнопка OK из локали модалки.
 */
export function RussianLocaleDatePicker() {
  const [value, setValue] = useState<Date | null>(null)

  return (
    <ConfigProvider locale={ru_RU}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'flex-start' }}>
        <DatePicker
          value={value}
          onChange={(d) => setValue(d)}
          placeholder="Выберите дату"
          allowClear
        />
        <DatePicker
          showTime
          showNow
          format="YYYY-MM-DD HH:mm"
          placeholder="Дата и время"
          allowClear
        />
      </div>
    </ConfigProvider>
  )
}
