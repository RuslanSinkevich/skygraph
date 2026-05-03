import { Breadcrumb } from '@skygraph/react'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    home: 'Home',
    settings: 'Settings',
    profile: 'Profile',
  },
  ru: {
    home: 'Главная',
    settings: 'Настройки',
    profile: 'Профиль',
  },
} as const

/**
 * `unstyled` drops the sg-breadcrumb classes but keeps the semantic
 * `<nav aria-label="Breadcrumb">` wrapper so assistive tech still
 * recognises it as navigation.
 */
export function UnstyledBreadcrumb() {
  const t = useDemoStrings(STRINGS)
  return (
    <Breadcrumb
      unstyled
      separator={<span style={{ padding: '0 8px', opacity: 0.6 }}>/</span>}
      items={[
        { title: <a href="#" style={{ color: '#4f46e5', textDecoration: 'underline' }}>{t.home}</a> },
        { title: <a href="#" style={{ color: '#4f46e5', textDecoration: 'underline' }}>{t.settings}</a> },
        { title: <span style={{ fontWeight: 600 }}>{t.profile}</span> },
      ]}
    />
  )
}
