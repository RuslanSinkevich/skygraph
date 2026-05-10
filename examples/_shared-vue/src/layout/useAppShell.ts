import { inject, type InjectionKey } from 'vue'

export interface AppShellContextValue {
  openSidebar: () => void
}

export const APP_SHELL_KEY: InjectionKey<AppShellContextValue> = Symbol('shared-vue/app-shell')

/**
 * Hook used by `<Header>` to open the mobile sidebar drawer when the
 * burger button is tapped. Returns `null` when used outside the shell —
 * callers should silently no-op (Header guards with `?.()`).
 */
export function useAppShell(): AppShellContextValue | null {
  return inject(APP_SHELL_KEY, null)
}

export type AppShellSection =
  | 'components'
  | 'showcases'
  | 'guide'
  | 'tokens'
  | 'roadmap'
  | 'about'
  | 'landing'
  | null
