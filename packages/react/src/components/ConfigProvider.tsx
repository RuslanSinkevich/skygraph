import React, { createContext, useContext, useMemo } from 'react'
import type { SizeType, SgLocale } from '../types'

export interface SgConfig {
  size?: SizeType
  disabled?: boolean
  bordered?: boolean
  locale?: SgLocale
  prefixCls?: string
}

const SgConfigContext = createContext<SgConfig>({})

export interface ConfigProviderProps extends SgConfig {
  children: React.ReactNode
}

export function ConfigProvider({ children, ...config }: ConfigProviderProps) {
  const parent = useContext(SgConfigContext)

  const merged = useMemo<SgConfig>(
    () => ({
      size: config.size ?? parent.size,
      disabled: config.disabled ?? parent.disabled,
      bordered: config.bordered ?? parent.bordered,
      locale: config.locale
        ? parent.locale
          ? { ...parent.locale, ...config.locale }
          : config.locale
        : parent.locale,
      prefixCls: config.prefixCls ?? parent.prefixCls,
    }),
    [config.size, config.disabled, config.bordered, config.locale, config.prefixCls, parent],
  )

  return <SgConfigContext.Provider value={merged}>{children}</SgConfigContext.Provider>
}

export function useConfig(): SgConfig {
  return useContext(SgConfigContext)
}

export function useConfigWithDefaults<T extends Record<string, unknown>>(
  props: T,
  defaults: { size?: SizeType; disabled?: boolean; bordered?: boolean },
): T & { resolvedSize: SizeType; resolvedDisabled: boolean } {
  const config = useContext(SgConfigContext)

  return useMemo(() => {
    const resolvedSize =
      (props as Record<string, unknown>).size as SizeType | undefined ??
      config.size ??
      defaults.size ??
      'middle'
    const resolvedDisabled =
      ((props as Record<string, unknown>).disabled as boolean | undefined) ??
      config.disabled ??
      defaults.disabled ??
      false

    return { ...props, resolvedSize, resolvedDisabled }
  }, [props, config.size, config.disabled, defaults.size, defaults.disabled])
}
