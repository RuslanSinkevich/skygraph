import { Breadcrumb } from '@skygraph/react'
import { useDemoStrings } from '../../i18n'

const STRINGS = {
  en: {
    home: 'Home',
    appCenter: 'Application Center',
    current: 'Current application',
  },
  ru: {
    home: 'Главная',
    appCenter: 'Центр приложений',
    current: 'Текущее приложение',
  },
} as const

/**
 * Ordered trail from root (left) to current page (right). The last
 * segment is automatically rendered as non-interactive current page
 * text and gets a bolder weight.
 */
export function BasicBreadcrumb() {
  const t = useDemoStrings(STRINGS)
  return (
    <Breadcrumb
      items={[
        { title: t.home, href: '#' },
        { title: t.appCenter, href: '#' },
        { title: t.current },
      ]}
    />
  )
}
