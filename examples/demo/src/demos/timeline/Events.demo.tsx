import { EventTimeline } from '@skygraph/react'
import type { TimelineEvent } from '@skygraph/react'
import { useDemoStrings, useI18n } from '../../i18n'

type DemoTimelineEvent = TimelineEvent & { meta: string }

const EVENTS = {
  en: [
    {
      id: 'created',
      date: Date.UTC(2026, 0, 12, 9),
      title: 'Order created',
      description: 'Customer submitted checkout from the web storefront.',
      color: '#1677ff',
      meta: '09:00',
    },
    {
      id: 'paid',
      date: Date.UTC(2026, 0, 12, 9, 7),
      title: 'Payment captured',
      description: 'Stripe authorization settled successfully.',
      color: '#52c41a',
      meta: '09:07',
    },
    {
      id: 'packed',
      date: Date.UTC(2026, 0, 13, 12),
      title: 'Packed at warehouse',
      description: 'Two items scanned and moved to outbound.',
      color: '#722ed1',
      meta: '12:00',
    },
    {
      id: 'shipped',
      date: Date.UTC(2026, 0, 14, 16, 30),
      title: 'Carrier pickup',
      description: 'Tracking number generated and sent to the customer.',
      color: '#faad14',
      meta: '16:30',
    },
  ],
  ru: [
    {
      id: 'created',
      date: Date.UTC(2026, 0, 12, 9),
      title: 'Заказ создан',
      description: 'Покупатель оформил заказ в web-витрине.',
      color: '#1677ff',
      meta: '09:00',
    },
    {
      id: 'paid',
      date: Date.UTC(2026, 0, 12, 9, 7),
      title: 'Оплата получена',
      description: 'Авторизация Stripe успешно подтверждена.',
      color: '#52c41a',
      meta: '09:07',
    },
    {
      id: 'packed',
      date: Date.UTC(2026, 0, 13, 12),
      title: 'Собран на складе',
      description: 'Две позиции отсканированы и переданы на отправку.',
      color: '#722ed1',
      meta: '12:00',
    },
    {
      id: 'shipped',
      date: Date.UTC(2026, 0, 14, 16, 30),
      title: 'Передан перевозчику',
      description: 'Трек-номер создан и отправлен покупателю.',
      color: '#faad14',
      meta: '16:30',
    },
  ],
} as const satisfies Record<string, readonly DemoTimelineEvent[]>

const STRINGS = {
  en: { time: 'Time' },
  ru: { time: 'Время' },
} as const

/**
 * Vertical event stream grouped by day. Each event reads like an audit log:
 * short status, useful detail and an explicit time badge.
 */
export function EventsTimeline() {
  const { locale } = useI18n()
  const t = useDemoStrings(STRINGS)
  const events = EVENTS[locale] ?? EVENTS.en
  return (
    <EventTimeline
      events={events}
      groupBy="day"
      renderEvent={(ev) => {
        const event = ev as DemoTimelineEvent
        return (
          <div
            style={{
              display: 'grid',
              gap: 4,
              padding: '10px 12px',
              border: '1px solid var(--sg-color-border-secondary)',
              borderRadius: 'var(--sg-border-radius)',
              background: 'var(--sg-color-bg-container)',
            }}
          >
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
              <strong style={{ color: 'var(--sg-color-text)' }}>{event.title}</strong>
              <span
                style={{
                  fontSize: 12,
                  color: 'var(--sg-color-text-secondary)',
                  background: 'var(--sg-color-bg-secondary)',
                  borderRadius: 999,
                  padding: '2px 8px',
                }}
              >
                {t.time}: {event.meta}
              </span>
            </div>
            {event.description && (
              <div style={{ color: 'var(--sg-color-text-secondary)', fontSize: 13 }}>
                {event.description}
              </div>
            )}
          </div>
        )
      }}
    />
  )
}
