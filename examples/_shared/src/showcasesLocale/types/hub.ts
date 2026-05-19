export type ShowcaseCategoryKey = 'data' | 'comms' | 'productivity' | 'design'

/**
 * Strings outside the per-app `apps` sub-tree: hub chrome, header/footer,
 * category labels and showcase card copy. Kept as an internal type so that
 * each locale can be assembled from `hub/<lang>.ts` + `apps/*\/<lang>.ts`.
 */
export interface HubLocale {
  hubTitle: string
  hubLead: string
  searchPlaceholder: string
  noMatches: string
  back: string
  languageSwitcher: string
  /**
   * Strings for the chrome (header + footer) of the standalone showcases
   * app. The embedded variant inside the demo uses its own DemoDict
   * footer/header so these are scoped to `examples/showcases` and any
   * other host that wants to render the full showcase shell.
   */
  shell: {
    navDocs: string
    navShowcases: string
    /**
     * Primary nav set, mirrors `examples/demo` so the standalone
     * showcases header surfaces the same product entry-points
     * (Components / Guide / Benchmarks / Roadmap / About).
     */
    navComponents: string
    navGuide: string
    navBenchmarks: string
    navRoadmap: string
    navAbout: string
    footerCopyright: string
    footerShowcases: {
      title: string
      allDemos: string
      sourceOnGithub: string
    }
    footerDocumentation: {
      title: string
      demoSite: string
      components: string
      guide: string
    }
    footerCommunity: {
      title: string
      github: string
      issues: string
    }
    footerProject: {
      title: string
      changelog: string
      license: string
    }
  }
  categories: {
    all: string
    data: string
    comms: string
    productivity: string
    design: string
  }
  cards: Record<
    string,
    {
      title: string
      description: string
    }
  >
}
