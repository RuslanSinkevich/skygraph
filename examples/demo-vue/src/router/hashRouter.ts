import {
  computed,
  defineComponent,
  h,
  inject,
  onBeforeUnmount,
  onMounted,
  provide,
  ref,
  type App,
  type Component,
  type ComputedRef,
  type InjectionKey,
  type Ref,
} from 'vue'

/**
 * Tiny hash-mode router with the same surface shape as `vue-router`'s
 * `useRoute` / `useRouter` / `<RouterView>`. Pure local implementation —
 * keeps the demo dependency-free, but lets pages stay router-agnostic.
 */

export interface RouteRecord {
  path: string
  component?: Component | (() => Promise<Component | { default: Component }>)
  redirect?: string
}

export interface Route {
  path: string
}

export interface Router {
  install: (app: App) => void
  push: (to: string) => Promise<void>
  currentRoute: Ref<Route>
  records: RouteRecord[]
}

const ROUTER_KEY: InjectionKey<Router> = Symbol('skygraph-demo-vue-router')
const ROUTE_KEY: InjectionKey<ComputedRef<Route>> = Symbol('skygraph-demo-vue-route')

function readHashPath(): string {
  if (typeof window === 'undefined') return '/'
  const raw = window.location.hash.replace(/^#/, '')
  return raw === '' ? '/' : raw
}

function matchRecord(records: RouteRecord[], path: string): RouteRecord | null {
  const direct = records.find((r) => r.path === path && !r.path.includes(':'))
  if (direct) return direct
  // Wildcard fallback (path: '/:pathMatch(.*)*' or any path starting with ':')
  const wildcard = records.find((r) => r.path.startsWith('/:') || r.path === '*')
  return wildcard ?? null
}

function resolvePath(records: RouteRecord[], path: string): string {
  const rec = matchRecord(records, path)
  if (rec?.redirect) return rec.redirect
  return path
}

export function createHashRouter(records: RouteRecord[]): Router {
  const currentRoute = ref<Route>({ path: '/' })

  const update = () => {
    const path = readHashPath()
    const resolved = resolvePath(records, path)
    if (resolved !== path && typeof window !== 'undefined') {
      window.location.hash = resolved
      return
    }
    currentRoute.value = { path: resolved }
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0 })
    }
  }

  const router: Router = {
    install(app) {
      app.provide(ROUTER_KEY, router)
      app.provide(
        ROUTE_KEY,
        computed(() => currentRoute.value),
      )
      app.component('RouterView', RouterView)
    },
    async push(to: string) {
      if (typeof window === 'undefined') return
      const resolved = resolvePath(records, to)
      if (window.location.hash === '#' + resolved) {
        update()
        return
      }
      window.location.hash = resolved
    },
    currentRoute,
    records,
  }

  if (typeof window !== 'undefined') {
    window.addEventListener('hashchange', update)
    update()
  }

  return router
}

export function useRouter(): Router {
  const r = inject(ROUTER_KEY)
  if (!r) throw new Error('useRouter must be called inside a router-provided app')
  return r
}

export function useRoute(): ComputedRef<Route> {
  const r = inject(ROUTE_KEY)
  if (!r) throw new Error('useRoute must be called inside a router-provided app')
  return r
}

const lazyCache = new Map<RouteRecord, Component>()

function isLazy(
  c: RouteRecord['component'],
): c is () => Promise<Component | { default: Component }> {
  if (typeof c !== 'function') return false
  // Vue functional components are functions too, but they are usually not
  // returned through dynamic import wrappers. We treat any function with
  // zero-arg signature as a lazy import — same heuristic vue-router uses.
  return c.length === 0
}

export const RouterView = defineComponent({
  name: 'RouterView',
  setup() {
    const router = useRouter()
    const route = useRoute()
    const resolved = ref<Component | null>(null)
    const loadingPath = ref<string | null>(null)

    async function loadFor(path: string) {
      const rec = matchRecord(router.records, path)
      if (!rec || !rec.component) {
        resolved.value = null
        return
      }
      const cached = lazyCache.get(rec)
      if (cached) {
        resolved.value = cached
        return
      }
      if (!isLazy(rec.component)) {
        const comp = rec.component as Component
        lazyCache.set(rec, comp)
        resolved.value = comp
        return
      }
      loadingPath.value = path
      const mod = await rec.component()
      const comp = (mod as { default?: Component }).default ?? (mod as Component)
      lazyCache.set(rec, comp)
      if (loadingPath.value === path) {
        resolved.value = comp
      }
    }

    onMounted(() => {
      void loadFor(route.value.path)
    })

    const stopWatch = computed(() => route.value.path)
    let lastPath = ''
    onBeforeUnmount(() => {
      lastPath = ''
    })

    return () => {
      const path = stopWatch.value
      if (path !== lastPath) {
        lastPath = path
        void loadFor(path)
      }
      return resolved.value ? h(resolved.value) : h('div')
    }
  },
})

export function provideRouterContext(router: Router) {
  provide(ROUTER_KEY, router)
  provide(
    ROUTE_KEY,
    computed(() => router.currentRoute.value),
  )
}
