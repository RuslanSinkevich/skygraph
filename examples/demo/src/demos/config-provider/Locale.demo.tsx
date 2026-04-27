import { useState } from 'react'
import { ConfigProvider, Transfer } from '@skygraph/react'
import type { SgLocale } from '@skygraph/react'

const data = Array.from({ length: 8 }).map((_, i) => ({
  key: String(i + 1),
  title: `Item ${i + 1}`,
}))

const ruLocale: SgLocale = {
  transfer: {
    titles: ['Доступно', 'Выбрано'],
    searchPlaceholder: 'Поиск…',
    notFoundContent: 'Ничего не найдено',
  },
}

export function LocaleConfigProvider() {
  const [targetKeys, setTargetKeys] = useState<string[]>(['2', '4'])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <p style={{ margin: 0, fontSize: 13, color: 'var(--sg-color-text-secondary)' }}>
        Only <code>Transfer</code> reads strings from <code>ConfigProvider.locale</code>{' '}
        today. The root locale shape exists for every component — fill in the rest as
        the i18n pass rolls out.
      </p>
      <ConfigProvider locale={ruLocale}>
        <Transfer
          dataSource={data}
          targetKeys={targetKeys}
          onChange={(keys) => setTargetKeys(keys)}
          showSearch
          listStyle={{ width: 220, height: 220 }}
        />
      </ConfigProvider>
    </div>
  )
}
