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

  // Mirror the primary nav of `examples/demo`. Items other than
  // `showcases` live in the demo app and are linked as external so
  // navigation crosses the SPA boundary (`/react/` <-> `/react/showcases/`).
  // Order and labels match `examples/demo/src/App.tsx` `navItems` so the
  // three React entry points (demo + showcases + future docs) feel like
  // one product chrome.
  const navItems = useMemo<NavItem[]>(
    () => [
      {
        key: 'components',
        label: strings.shell.navComponents,
        href: `${DEMO_URL}#/components/button`,
        external: true,
      },
      {
        key: 'guide',
        label: strings.shell.navGuide,
        href: `${DEMO_URL}#/guide/getting-started`,
        external: true,
      },
      { key: 'showcases', label: strings.shell.navShowcases, href: '#' },
      {
        key: 'benchmarks',
        label: strings.shell.navBenchmarks,
        href: `${DEMO_URL}#/benchmarks`,
        external: true,
      },
      {
        key: 'roadmap',
        label: strings.shell.navRoadmap,
        href: `${DEMO_URL}#/roadmap`,
        external: true,
      },
      {
        key: 'about',
        label: strings.shell.navAbout,
        href: `${DEMO_URL}#/about`,
        external: true,
      },
    ],
    [strings.shell],
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
      copyright={strings.shell.footerCopyright}
      version={`v${__SKYGRAPH_REACT_VERSION__}`}
      onSelect={(href) => {
        if (href === DEMO_URL) {
          window.location.href = DEMO_URL
        }
      }}
      columns={[
        {
          title: strings.shell.footerShowcases.title,
          links: [
            { label: strings.shell.footerShowcases.allDemos, href: '#' },
            {
              label: strings.shell.footerShowcases.sourceOnGithub,
              href: SHOWCASES_URL,
              external: true,
            },
          ],
        },
        {
          title: strings.shell.footerDocumentation.title,
          links: [
            { label: strings.shell.footerDocumentation.demoSite, href: DEMO_URL, external: true },
            {
              label: strings.shell.footerDocumentation.components,
              href: `${DEMO_URL}#/components/button`,
              external: true,
            },
            {
              label: strings.shell.footerDocumentation.guide,
              href: `${DEMO_URL}#/guide/getting-started`,
              external: true,
            },
          ],
        },
        {
          title: strings.shell.footerCommunity.title,
          links: [
            { label: strings.shell.footerCommunity.github, href: GITHUB_URL, external: true },
            {
              label: strings.shell.footerCommunity.issues,
              href: `${GITHUB_URL}/issues`,
              external: true,
            },
          ],
        },
        {
          title: strings.shell.footerProject.title,
          links: [
            {
              label: strings.shell.footerProject.changelog,
              href: `${GITHUB_URL}/blob/master/CHANGELOG.md`,
              external: true,
            },
            {
              label: strings.shell.footerProject.license,
              href: `${GITHUB_URL}/blob/master/LICENSE`,
              external: true,
            },
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
