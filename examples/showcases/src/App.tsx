import { useEffect, useMemo, useState } from 'react'
import {
  AppShell,
  Footer,
  Header,
  ThemeSwitcher,
  LanguageSwitcher,
} from '@skygraph-examples/shared-react/layout'
import type { NavItem } from '@skygraph-examples/shared-react/layout'
import {
  DEMO_URL,
  GITHUB_URL,
  SHOWCASES_URL,
  showcasesLocaleEn,
  showcasesLocaleRu,
} from '@skygraph-examples/shared'
import type { ShowcasesLocale } from '@skygraph-examples/shared'
import { ShowcasesDetailView, ShowcasesHubView } from './ShowcasesViews'
import { parseShowcaseHashRoute, showcaseDetailHash, showcaseHubHash } from './showcaseRouting'

const LOCALE_STORAGE_KEY = 'skygraph-demo-locale'

function readLocale(): 'en' | 'ru' {
  if (typeof window === 'undefined') return 'en'
  try {
    const s = window.localStorage.getItem(LOCALE_STORAGE_KEY)
    if (s === 'ru' || s === 'en') return s
  } catch {
    /* ignore */
  }
  return 'en'
}

function getRoute(): string {
  return window.location.hash.replace(/^#\/?/, '') || ''
}

export default function App() {
  const [route, setRoute] = useState(getRoute)
  const [locale, setLocale] = useState<'en' | 'ru'>(readLocale)

  useEffect(() => {
    const onHash = () => setRoute(getRoute())
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === LOCALE_STORAGE_KEY && (e.newValue === 'en' || e.newValue === 'ru')) {
        setLocale(e.newValue)
      }
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const strings: ShowcasesLocale = locale === 'ru' ? showcasesLocaleRu : showcasesLocaleEn

  const parsed = useMemo(() => parseShowcaseHashRoute(route), [route])

  const navigate = (key: string) => {
    window.location.hash = key ? '#/' + key : '#'
    window.scrollTo({ top: 0 })
  }

  const setLocalePersist = (next: 'en' | 'ru') => {
    setLocale(next)
    try {
      window.localStorage.setItem(LOCALE_STORAGE_KEY, next)
    } catch {
      /* ignore */
    }
  }

  const navItems = useMemo<NavItem[]>(
    () => [
      { key: 'docs', label: '← Docs', href: DEMO_URL, external: true },
      { key: 'showcases', label: 'Showcases', href: '#' },
      { key: 'github', label: 'GitHub', href: GITHUB_URL, external: true },
    ],
    [],
  )

  const header = (
    <Header
      brand="SkyGraph"
      items={navItems}
      active={parsed.kind === 'detail' ? null : 'showcases'}
      onBrandClick={() => navigate(showcaseHubHash('standalone'))}
      onSelect={(key) => {
        if (key === 'showcases') navigate(showcaseHubHash('standalone'))
      }}
      extras={
        <>
          <LanguageSwitcher
            options={[
              { code: 'en', label: 'EN', fullName: 'English' },
              { code: 'ru', label: 'RU', fullName: 'Русский' },
            ]}
            active={locale}
            onChange={(code) => setLocalePersist(code as 'en' | 'ru')}
            groupLabel={strings.languageSwitcher}
          />
          <ThemeSwitcher />
        </>
      }
    />
  )

  const footer = (
    <Footer
      copyright="© 2026 SkyGraph contributors"
      version="v0.5.0"
      onSelect={(href) => {
        if (href === DEMO_URL) {
          window.location.href = DEMO_URL
        }
      }}
      columns={[
        {
          title: 'Showcases',
          links: [
            { label: 'All demos', href: '#' },
            { label: 'Source on GitHub', href: SHOWCASES_URL, external: true },
          ],
        },
        {
          title: 'Documentation',
          links: [
            { label: 'Demo site', href: DEMO_URL, external: true },
            { label: 'Components', href: `${DEMO_URL}#/components/button`, external: true },
            { label: 'Guide', href: `${DEMO_URL}#/guide/getting-started`, external: true },
          ],
        },
        {
          title: 'Community',
          links: [
            { label: 'GitHub', href: GITHUB_URL, external: true },
            { label: 'Issues', href: `${GITHUB_URL}/issues`, external: true },
          ],
        },
        {
          title: 'Project',
          links: [
            { label: 'Changelog', href: `${GITHUB_URL}/blob/master/CHANGELOG.md`, external: true },
            { label: 'License', href: `${GITHUB_URL}/blob/master/LICENSE`, external: true },
          ],
        },
      ]}
      extras={<ThemeSwitcher />}
    />
  )

  if (parsed.kind === 'hub') {
    return (
      <AppShell section="showcases" header={header} footer={footer}>
        <ShowcasesHubView
          strings={strings}
          onOpen={(key) => navigate(showcaseDetailHash(key, 'standalone'))}
        />
      </AppShell>
    )
  }

  return (
    <AppShell section={null} header={header} footer={null} flush>
      <ShowcasesDetailView
        showcaseKey={parsed.key}
        strings={strings}
        onBack={() => navigate(showcaseHubHash('standalone'))}
      />
    </AppShell>
  )
}
