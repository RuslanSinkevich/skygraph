import { lazy, Suspense, useMemo, useState } from 'react'
import { Button, Empty, SearchInput, Segmented, Spin, Tag } from '@skygraph/react'
import type { ShowcasesLocale } from '@skygraph-examples/shared'
import { SHOWCASE_CATEGORY_ITEMS, SHOWCASE_METAS } from './showcaseMeta'
import { showcaseLoaders } from './showcaseLoaders'
import { ShowcaseLocaleProvider } from './showcases/_shared'

export function ShowcasesHubView({
  strings,
  onOpen,
}: {
  strings: ShowcasesLocale
  onOpen: (showcaseKey: string) => void
}) {
  const [category, setCategory] = useState<(typeof SHOWCASE_CATEGORY_ITEMS)[number]['key']>('all')
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    return SHOWCASE_METAS.filter((s) => {
      if (category !== 'all' && s.category !== category) return false
      if (!query.trim()) return true
      const q = query.toLowerCase()
      const card = strings.cards[s.key]
      const title = card?.title ?? s.key
      const desc = card?.description ?? ''
      return (
        title.toLowerCase().includes(q) ||
        desc.toLowerCase().includes(q) ||
        s.tags.some((t) => t.toLowerCase().includes(q))
      )
    })
  }, [category, query, strings.cards])

  const categoryOptions = useMemo(
    () =>
      SHOWCASE_CATEGORY_ITEMS.map((c) => {
        const count =
          c.key === 'all'
            ? SHOWCASE_METAS.length
            : SHOWCASE_METAS.filter((s) => s.category === c.key).length
        return { value: c.key, label: `${c.labelFrom(strings)} ${count}` }
      }),
    [strings],
  )

  return (
    <div className="hub">
      <h1>{strings.hubTitle}</h1>
      <p className="hub-sub">{strings.hubLead}</p>

      <div className="hub-controls">
        <SearchInput
          className="hub-search"
          placeholder={strings.searchPlaceholder}
          value={query}
          onChange={setQuery}
        />
        <Segmented
          className="hub-cats"
          value={category}
          options={categoryOptions}
          onChange={(value) =>
            setCategory(value as (typeof SHOWCASE_CATEGORY_ITEMS)[number]['key'])
          }
        />
      </div>

      {filtered.length === 0 ? (
        <Empty className="hub-empty" description={strings.noMatches} />
      ) : (
        <div className="hub-grid">
          {filtered.map((s) => {
            const card = strings.cards[s.key]
            return (
              <Button key={s.key} className="hub-card" onClick={() => onOpen(s.key)}>
                <div className="hub-card-icon">{s.icon}</div>
                <h3>{card?.title ?? s.key}</h3>
                <p>{card?.description ?? ''}</p>
                <div className="hub-card-tags">
                  {s.tags.map((t) => (
                    <Tag key={t} className="hub-card-tag">
                      {t}
                    </Tag>
                  ))}
                </div>
              </Button>
            )
          })}
        </div>
      )}
    </div>
  )
}

export function ShowcasesDetailView({
  showcaseKey,
  strings,
  onBack,
}: {
  showcaseKey: string
  strings: ShowcasesLocale
  onBack: () => void
}) {
  const load = showcaseLoaders[showcaseKey]
  const LazyComp = useMemo(() => (load ? lazy(load) : null), [load])
  const meta = SHOWCASE_METAS.find((m) => m.key === showcaseKey)
  const title = strings.cards[showcaseKey]?.title ?? showcaseKey

  if (!LazyComp) {
    return (
      <div className="showcase-shell">
        <div className="showcase-topbar">
          <Button type="link" size="small" className="showcase-back" onClick={onBack}>
            {strings.back}
          </Button>
        </div>
        <div className="showcase-body" style={{ padding: 24 }}>
          Unknown showcase: {showcaseKey}
        </div>
      </div>
    )
  }

  return (
    <div className="showcase-shell">
      <div className="showcase-topbar">
        <Button type="link" size="small" className="showcase-back" onClick={onBack}>
          {strings.back}
        </Button>
        <span className="showcase-topbar-title">
          {meta?.icon ? `${meta.icon} ` : ''}
          {title}
        </span>
      </div>
      <div className="showcase-body">
        <Suspense
          fallback={
            <div style={{ padding: 48, display: 'flex', justifyContent: 'center' }}>
              <Spin size="large" />
            </div>
          }
        >
          <ShowcaseLocaleProvider value={strings}>
            <LazyComp />
          </ShowcaseLocaleProvider>
        </Suspense>
      </div>
    </div>
  )
}
