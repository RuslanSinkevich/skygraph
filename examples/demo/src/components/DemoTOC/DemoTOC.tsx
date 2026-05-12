import { useCallback, useEffect } from 'react'

import { useActiveSection } from './intersection'
import { useDemoTOCContext } from './DemoTOCContext'
import type { DemoTOCItem } from './DemoTOCContext'
import { useDemoTOCStrings } from './strings'

/**
 * Top offset applied when scrolling to a section. The AppShell sticky
 * header is 56px tall; we add a little breathing room so the section
 * title isn't kissing the header edge after the scroll lands.
 */
const SCROLL_OFFSET_PX = 72

/**
 * Section sub-delimiter inside `window.location.hash`.
 *
 * The demo app uses hash-routing (`#/components/button`), which means
 * an extra `#section` cannot be appended — browsers parse only the
 * first `#`. We therefore encode the section as a `~` suffix:
 *
 *     #/components/button~shadow-loading
 *
 * `App.tsx`'s `getHashRoute()` strips this suffix when resolving the
 * route, so adding / removing it never triggers a route re-render.
 */
const SECTION_DELIMITER = '~'

/**
 * Pulls the section id out of `window.location.hash`. Returns an empty
 * string when no section is present (or when the hash is empty).
 */
function readSectionFromHash(): string {
  if (typeof window === 'undefined') return ''
  const raw = window.location.hash
  const idx = raw.indexOf(SECTION_DELIMITER)
  if (idx < 0) return ''
  try {
    return decodeURIComponent(raw.slice(idx + 1))
  } catch {
    return raw.slice(idx + 1)
  }
}

/**
 * Build a URL with the given section appended to the current route
 * hash. `null` removes the section while keeping the route intact.
 */
function buildSectionUrl(sectionId: string | null): string {
  if (typeof window === 'undefined') return ''
  const raw = window.location.hash
  const idx = raw.indexOf(SECTION_DELIMITER)
  const base = idx < 0 ? raw : raw.slice(0, idx)
  const tail = sectionId ? `${SECTION_DELIMITER}${encodeURIComponent(sectionId)}` : ''
  return `${window.location.pathname}${window.location.search}${base}${tail}`
}

/**
 * Same as {@link buildSectionUrl} but produces a fragment-only link
 * (`#/components/button~loading`) suitable for the `href` attribute of
 * a TOC anchor — that way right-click → "Copy link address" yields a
 * shareable URL.
 */
function buildSectionHref(sectionId: string): string {
  if (typeof window === 'undefined') return `${SECTION_DELIMITER}${sectionId}`
  const raw = window.location.hash
  const idx = raw.indexOf(SECTION_DELIMITER)
  const base = idx < 0 ? raw : raw.slice(0, idx)
  return `${base || '#'}${SECTION_DELIMITER}${encodeURIComponent(sectionId)}`
}

/**
 * Right-rail "On this page" panel. Mirrors antd / MUI / Vue Router
 * docs: sticky, ~200px wide, hidden on narrow viewports via CSS.
 *
 * Self-contained — pulls all state from {@link useDemoTOCContext}, so
 * dropping `<DemoTOC />` into any layout that already has a
 * `<DemoTOCProvider>` above just works.
 */
export function DemoTOC() {
  const ctx = useDemoTOCContext()
  const strings = useDemoTOCStrings()

  const items: DemoTOCItem[] = ctx?.items ?? []
  const activeId = ctx?.activeId ?? null
  const setActiveId = ctx?.setActiveId
  const isManualScrollRef = ctx?.isManualScrollRef ?? { current: false }
  const beginManualScroll = ctx?.beginManualScroll

  useActiveSection(items, activeId, setActiveId ?? noop, isManualScrollRef)

  const scrollToId = useCallback(
    (id: string) => {
      const target = document.getElementById(id)
      if (!target) return
      beginManualScroll?.()
      setActiveId?.(id)
      const top = target.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET_PX
      window.scrollTo({ top, behavior: 'smooth' })
    },
    [beginManualScroll, setActiveId],
  )

  // Sync the URL hash on initial mount (deep-link support) and after
  // every items change — the hash may target a section that only just
  // registered. Runs once per items snapshot.
  useEffect(() => {
    if (items.length === 0) return
    const section = readSectionFromHash()
    if (!section) return
    if (!items.some((it) => it.id === section)) return
    // Defer one frame so the freshly registered DOM nodes are
    // layout-flushed — `getBoundingClientRect` is otherwise stale on
    // the very first mount.
    const raf = window.requestAnimationFrame(() => scrollToId(section))
    return () => window.cancelAnimationFrame(raf)
  }, [items, scrollToId])

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      event.preventDefault()
      scrollToId(id)
      // Replace, don't push — keeps the back button useful for actual
      // route navigation rather than every TOC click.
      if (typeof window !== 'undefined' && window.history?.replaceState) {
        window.history.replaceState(null, '', buildSectionUrl(id))
      }
    },
    [scrollToId],
  )

  const handleBackToTop = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault()
      beginManualScroll?.()
      window.scrollTo({ top: 0, behavior: 'smooth' })
      if (items.length > 0) setActiveId?.(items[0].id)
      if (typeof window !== 'undefined' && window.history?.replaceState) {
        window.history.replaceState(null, '', buildSectionUrl(null))
      }
    },
    [beginManualScroll, items, setActiveId],
  )

  if (items.length === 0) return null

  return (
    <nav className="demo-toc" aria-label={strings.ariaLabel}>
      <a className="demo-toc-back-to-top" href="#" onClick={handleBackToTop}>
        <span aria-hidden>↑</span>
        <span>{strings.backToTop}</span>
      </a>
      <div className="demo-toc-heading">{strings.onThisPage}</div>
      <ul className="demo-toc-list">
        {items.map((item) => {
          const isActive = item.id === activeId
          return (
            <li key={item.id} className="demo-toc-row">
              <a
                href={buildSectionHref(item.id)}
                className={'demo-toc-item' + (isActive ? ' demo-toc-item-active' : '')}
                onClick={(e) => handleClick(e, item.id)}
                aria-current={isActive ? 'true' : undefined}
              >
                {item.title}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

function noop() {
  // Intentionally empty.
}
