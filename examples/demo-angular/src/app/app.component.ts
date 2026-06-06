import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core'
import { NavigationEnd, Router, RouterOutlet } from '@angular/router'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { filter, startWith } from 'rxjs/operators'
import {
  AppShellComponent,
  FooterComponent,
  type FooterColumn,
  FrameworkSwitcherComponent,
  HeaderComponent,
  LanguageSwitcherComponent,
  type NavItem,
  SidebarComponent,
  type SidebarSection,
  ThemeSwitcherComponent,
} from './shared/layout'
import { I18nService, SUPPORTED_LOCALES, type Locale } from './i18n'
import {
  buildComponentsSidebar,
  buildGuideSidebar,
  keyToRoute,
  routeToKey,
  sectionForRoute,
} from './nav'

const GITHUB_URL = 'https://github.com/RuslanSinkevich/skygraph-public'
const APP_VERSION = 'v0.5.0'

@Component({
  selector: 'sg-root',
  standalone: true,
  imports: [
    RouterOutlet,
    AppShellComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    ThemeSwitcherComponent,
    LanguageSwitcherComponent,
    FrameworkSwitcherComponent,
  ],
  template: `
    <sg-app-shell [section]="section()" [hasSidebar]="!!sidebarSections()">
      <sg-header
        appShellHeader
        brand="SkyGraph"
        [items]="navItems()"
        [active]="headerActive()"
        [showSearch]="showSearch()"
        [searchValue]="search()"
        [searchPlaceholder]="i18n.t().search.placeholder"
        [searchAriaLabel]="i18n.t().search.ariaLabel"
        [burgerAriaLabel]="i18n.t().header.burgerAria"
        (brandClick)="navigate('')"
        (select)="onHeaderSelect($event)"
        (searchChange)="search.set($event)"
      >
        <sg-framework-switcher></sg-framework-switcher>
        <sg-language-switcher
          [options]="languageOptions()"
          [active]="i18n.locale()"
          [groupLabel]="i18n.t().language.switcherLabel"
          (change)="onLocaleChange($event)"
        ></sg-language-switcher>
        <sg-theme-switcher [ariaLabel]="i18n.t().header.themeAria"></sg-theme-switcher>
      </sg-header>

      <sg-sidebar
        appShellSidebar
        [sections]="filteredSidebar() ?? []"
        [active]="route()"
        [emptyLabel]="i18n.t().search.noMatches"
        (select)="navigate($event)"
      ></sg-sidebar>

      <router-outlet></router-outlet>

      <sg-footer
        appShellFooter
        [columns]="footerColumns()"
        [copyright]="i18n.t().footer.copyright"
        [version]="appVersion"
        (select)="onFooterSelect($event)"
      ></sg-footer>
    </sg-app-shell>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  protected readonly i18n = inject(I18nService)
  private readonly router = inject(Router)

  protected readonly appVersion = APP_VERSION
  protected readonly search = signal('')

  // Reactive route — driven by router events. We track a small signal
  // (`navTick`) so `route()` recomputes on every navigation; we read
  // the URL from `Router.url` (avoids `toSignal({ initialValue })`
  // typing fight with `Observable<NavigationEnd>`).
  private readonly navTick = signal(0)

  protected readonly route = computed(() => {
    this.navTick()
    return routeToKey(this.router.url)
  })

  constructor() {
    // `NavigationEnd` may fire before this subscription attaches (initial
    // navigation). Without a synchronous kick, `navTick` never bumps and
    // `route()` — which only depends on signals, not on `Router.url` —
    // stays stuck on the first (often wrong) URL → blank outlet / endless
    // "loading" shell. `startWith(null)` forces one sync refresh after the
    // router has settled its initial URL.
    this.router.events
      .pipe(
        startWith(null),
        filter((e): e is NavigationEnd | null => e === null || e instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe(() => this.navTick.update((v) => v + 1))
  }

  protected readonly section = computed(() => sectionForRoute('/' + this.route()))

  protected readonly navItems = computed<NavItem[]>(() => {
    const t = this.i18n.t()
    return [
      { key: 'components', label: t.header.navComponents, href: '#/components/button' },
      { key: 'guide', label: t.header.navGuide, href: '#/guide/getting-started' },
      { key: 'changelog', label: t.header.navRoadmap, href: '#/changelog' },
      { key: 'about', label: t.header.navAbout, href: '#/about' },
      { key: 'github', label: t.header.navGithub, href: GITHUB_URL, external: true },
    ]
  })

  protected readonly headerActive = computed(() => {
    const sec = this.section()
    if (sec === 'components' || sec === 'guide' || sec === 'changelog' || sec === 'about') {
      return sec
    }
    return null
  })

  private readonly componentsSidebar = computed<SidebarSection[]>(() =>
    buildComponentsSidebar(this.i18n.t()),
  )
  private readonly guideSidebar = computed<SidebarSection[]>(() => buildGuideSidebar(this.i18n.t()))

  protected readonly sidebarSections = computed<SidebarSection[] | null>(() => {
    const sec = this.section()
    if (sec === 'components') return this.componentsSidebar()
    if (sec === 'guide') return this.guideSidebar()
    return null
  })

  protected readonly filteredSidebar = computed<SidebarSection[] | null>(() => {
    const sections = this.sidebarSections()
    if (!sections) return null
    const q = this.search().trim().toLowerCase()
    if (!q) return sections
    return sections
      .map((s) => ({
        ...s,
        items: s.items.filter((i) => i.label.toLowerCase().includes(q)),
      }))
      .filter((s) => s.items.length > 0)
  })

  protected readonly showSearch = computed(() => {
    const sec = this.section()
    return sec === 'components' || sec === 'guide'
  })

  protected readonly languageOptions = computed(() => {
    const t = this.i18n.t()
    return SUPPORTED_LOCALES.map((code) => ({
      code,
      label: code.toUpperCase(),
      fullName: code === 'en' ? t.language.en : t.language.ru,
    }))
  })

  protected readonly footerColumns = computed<FooterColumn[]>(() => {
    const t = this.i18n.t()
    return [
      {
        title: t.footer.columnDocs,
        links: [
          { label: t.footer.linkGettingStarted, href: '#/guide/getting-started' },
          { label: t.footer.linkComponents, href: '#/components/button' },
          { label: t.footer.linkTheming, href: '#/guide/theming' },
          { label: t.footer.linkCoreApi, href: '#/guide/core-api' },
        ],
      },
      {
        title: t.footer.columnResources,
        links: [
          {
            label: t.footer.linkChangelog,
            href: `${GITHUB_URL}/blob/master/CHANGELOG.md`,
            external: true,
          },
          {
            label: t.footer.linkArchitecture,
            href: `${GITHUB_URL}/blob/master/ARCHITECTURE.md`,
            external: true,
          },
          {
            label: t.footer.linkContributing,
            href: `${GITHUB_URL}/blob/master/CONTRIBUTING.md`,
            external: true,
          },
        ],
      },
      {
        title: t.footer.columnCommunity,
        links: [
          { label: t.footer.linkGithub, href: GITHUB_URL, external: true },
          { label: t.footer.linkIssues, href: `${GITHUB_URL}/issues`, external: true },
        ],
      },
      {
        title: t.footer.columnProject,
        links: [
          { label: t.footer.linkAbout, href: '#/about' },
          { label: t.footer.linkRoadmap, href: '#/changelog' },
          {
            label: t.footer.linkLicense,
            href: `${GITHUB_URL}/blob/master/LICENSE`,
            external: true,
          },
        ],
      },
    ]
  })

  protected onHeaderSelect(key: string): void {
    const item = this.navItems().find((it) => it.key === key)
    if (!item || item.external) return
    if (item.href?.startsWith('#/')) this.navigate(item.href.slice(2))
  }

  protected onFooterSelect(href: string): void {
    if (href.startsWith('#/')) this.navigate(href.slice(2))
  }

  protected onLocaleChange(code: string): void {
    if ((SUPPORTED_LOCALES as string[]).includes(code)) {
      this.i18n.setLocale(code as Locale)
    }
  }

  protected navigate(key: string): void {
    void this.router.navigateByUrl(keyToRoute(key))
    this.search.set('')
    if (typeof window !== 'undefined') window.scrollTo({ top: 0 })
  }
}
