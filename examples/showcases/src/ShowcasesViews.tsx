import { lazy, Suspense, useMemo, useState } from 'react'
import { Spin } from '@skygraph/react'
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

  return (
    <div className="hub">
      <h1>{strings.hubTitle}</h1>
      <p className="hub-sub">{strings.hubLead}</p>

      <div className="hub-controls">
        <input
          className="hub-search"
          placeholder={strings.searchPlaceholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="hub-cats">
          {SHOWCASE_CATEGORY_ITEMS.map((c) => (
            <button
              key={c.key}
              type="button"
              className={`hub-cat${category === c.key ? ' hub-cat--active' : ''}`}
              onClick={() => setCategory(c.key)}
            >
              {c.labelFrom(strings)}
              <span className="hub-cat-count">
                {c.key === 'all'
                  ? SHOWCASE_METAS.length
                  : SHOWCASE_METAS.filter((s) => s.category === c.key).length}
              </span>
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="hub-empty">{strings.noMatches}</div>
      ) : (
        <div className="hub-grid">
          {filtered.map((s) => {
            const card = strings.cards[s.key]
            return (
              <button key={s.key} className="hub-card" onClick={() => onOpen(s.key)} type="button">
                <div className="hub-card-icon">{s.icon}</div>
                <h3>{card?.title ?? s.key}</h3>
                <p>{card?.description ?? ''}</p>
                <div className="hub-card-tags">
                  {s.tags.map((t) => (
                    <span key={t} className="hub-card-tag">
                      {t}
                    </span>
                  ))}
                </div>
              </button>
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
          <button type="button" className="showcase-back" onClick={onBack}>
            {strings.back}
          </button>
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
        <button type="button" className="showcase-back" onClick={onBack}>
          {strings.back}
        </button>
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
