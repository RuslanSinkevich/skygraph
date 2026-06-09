import { useCallback, useEffect, useMemo, useRef } from 'react'

import { useActiveSection } from './intersection'
import { useDemoTOCContext } from './DemoTOCContext'
import type { DemoTOCItem } from './DemoTOCContext'
import { useDemoTOCStrings } from './strings'

/**
 * Stable empty list reused when the provider is missing — sharing one
 * object reference keeps useEffect / useCallback deps in `DemoTOC`
 * from changing on every render.
 */
const EMPTY_ITEMS: readonly DemoTOCItem[] = Object.freeze([])
const NOOP_MANUAL_REF: { readonly current: boolean } = { current: false }

/**
 * Top offset applied when scrolling to a section. The AppShell sticky
 * header is 56px tall; we add a little breathing room so the section
 * title isn't kissing the header edge after the scroll lands.
 */
const SCROLL_OFFSET_PX = 72

/**
 * Honour the user's "reduced motion" preference — falls back to
 * instant jumps when the OS asks for less animation. Re-read on every
 * call so toggling the setting takes effect immediately without
 * forcing a re-render.
 */
function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return false
  }
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function scrollBehavior(): ScrollBehavior {
  return prefersReducedMotion() ? 'auto' : 'smooth'
}

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

  // Pull a stable items reference: `ctx?.items ?? []` would mint a
  // fresh `[]` on every render and re-trigger every downstream
  // effect/callback. The frozen shared array fixes that.
  const items: readonly DemoTOCItem[] = useMemo(() => ctx?.items ?? EMPTY_ITEMS, [ctx?.items])
  const activeId = ctx?.activeId ?? null
  const setActiveId = ctx?.setActiveId
  const isManualScrollRef = ctx?.isManualScrollRef ?? NOOP_MANUAL_REF
  const beginManualScroll = ctx?.beginManualScroll

  useActiveSection(items, activeId, setActiveId ?? noop, isManualScrollRef)

  // Keep the active row visible inside the rail's own scroll area. On long
  // pages (e.g. Table has 30+ demos) the rail scrolls independently, so the
  // highlighted item would otherwise drift out of view as the page scrolls,
  // making the list look out of sync with the content.
  const navRef = useRef<HTMLElement | null>(null)
  const activeRef = useRef<HTMLAnchorElement | null>(null)
  useEffect(() => {
    const nav = navRef.current
    const link = activeRef.current
    if (!nav || !link) return
    const navRect = nav.getBoundingClientRect()
    const linkRect = link.getBoundingClientRect()
    if (linkRect.top < navRect.top) {
      nav.scrollTop -= navRect.top - linkRect.top + 12
    } else if (linkRect.bottom > navRect.bottom) {
      nav.scrollTop += linkRect.bottom - navRect.bottom + 12
    }
  }, [activeId])

  const scrollToId = useCallback(
    (id: string) => {
      const target = document.getElementById(id)
      if (!target) return
      beginManualScroll?.()
      setActiveId?.(id)
      const top = target.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET_PX
      window.scrollTo({ top, behavior: scrollBehavior() })
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
      window.scrollTo({ top: 0, behavior: scrollBehavior() })
      if (items.length > 0) setActiveId?.(items[0].id)
      if (typeof window !== 'undefined' && window.history?.replaceState) {
        window.history.replaceState(null, '', buildSectionUrl(null))
      }
    },
    [beginManualScroll, items, setActiveId],
  )

  if (items.length === 0) return null

  return (
    <nav className="demo-toc" aria-label={strings.ariaLabel} ref={navRef}>
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
                ref={isActive ? activeRef : undefined}
                href={buildSectionHref(item.id)}
                className={'demo-toc-item' + (isActive ? ' demo-toc-item-active' : '')}
                onClick={(e) => handleClick(e, item.id)}
                aria-current={isActive ? 'location' : undefined}
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
