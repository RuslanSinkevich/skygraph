import { ShowcasesDetailView, ShowcasesHubView } from '../../../../showcases/src/ShowcasesViews'
import {
  parseShowcaseHashRoute,
  showcaseDetailHash,
  showcaseHubHash,
} from '../../../../showcases/src/showcaseRouting'
import '../../../../showcases/src/hub-fragment.css'
import { useI18n } from '../../i18n'

export function ShowcasesPage({
  route,
  onNavigate,
}: {
  route: string
  onNavigate: (key: string) => void
}) {
  const { t } = useI18n()
  const parsed = parseShowcaseHashRoute(route)

  if (parsed.kind === 'hub') {
    return (
      <ShowcasesHubView
        strings={t.showcases}
        onOpen={(key) => onNavigate(showcaseDetailHash(key, 'demo'))}
      />
    )
  }

  return (
    <ShowcasesDetailView
      showcaseKey={parsed.key}
      strings={t.showcases}
      onBack={() => onNavigate(showcaseHubHash('demo'))}
    />
  )
}
