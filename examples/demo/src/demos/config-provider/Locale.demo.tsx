import { useState } from 'react'
import {
  ConfigProvider,
  Empty,
  Pagination,
  Popconfirm,
  Button,
  Upload,
  SchemaForm,
  Segmented,
  Modal,
  Calendar,
  en_US,
  ru_RU,
} from '@skygraph/react'

const schema = {
  properties: {
    name: { type: 'string', title: 'Name', minLength: 2 },
    email: { type: 'string', format: 'email', title: 'Email' },
  },
  required: ['name', 'email'],
}

export function LocaleConfigProvider() {
  const [lang, setLang] = useState<'en' | 'ru'>('en')
  const [page, setPage] = useState(1)
  const [modalOpen, setModalOpen] = useState(false)
  const locale = lang === 'en' ? en_US : ru_RU

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontSize: 13, color: 'var(--sg-color-text-secondary)' }}>
          Locale preset:
        </span>
        <Segmented
          value={lang}
          onChange={(v) => setLang(v as 'en' | 'ru')}
          options={[
            { label: 'en_US', value: 'en' },
            { label: 'ru_RU', value: 'ru' },
          ]}
        />
      </div>

      <ConfigProvider locale={locale}>
        <div style={{ display: 'grid', gap: 24, gridTemplateColumns: '1fr 1fr' }}>
          <section>
            <h4 style={{ margin: '0 0 8px' }}>Empty</h4>
            <Empty />
          </section>

          <section>
            <h4 style={{ margin: '0 0 8px' }}>Pagination</h4>
            <Pagination
              current={page}
              total={245}
              onChange={setPage}
              showTotal
              showSizeChanger
              showQuickJumper
            />
          </section>

          <section>
            <h4 style={{ margin: '0 0 8px' }}>Popconfirm</h4>
            <Popconfirm title="Delete item?" onConfirm={() => {}}>
              <Button type="primary">Delete</Button>
            </Popconfirm>
          </section>

          <section>
            <h4 style={{ margin: '0 0 8px' }}>Upload</h4>
            <Upload />
          </section>

          <section>
            <h4 style={{ margin: '0 0 8px' }}>Modal (default footer)</h4>
            <Button onClick={() => setModalOpen(true)}>Open modal</Button>
            <Modal
              open={modalOpen}
              onClose={() => setModalOpen(false)}
              onOk={() => setModalOpen(false)}
              title="Example"
            >
              Body text. OK / Cancel labels follow the provider locale.
            </Modal>
          </section>

          <section style={{ gridColumn: '1 / -1' }}>
            <h4 style={{ margin: '0 0 8px' }}>Calendar</h4>
            <Calendar fullscreen={false} />
          </section>

          <section style={{ gridColumn: '1 / -1' }}>
            <h4 style={{ margin: '0 0 8px' }}>SchemaForm + Field markers</h4>
            <SchemaForm schema={schema} layout="horizontal" onSubmit={() => {}} />
          </section>
        </div>
      </ConfigProvider>
    </div>
  )
}
