import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core'
import { I18nService } from '../../i18n'
import { ROADMAP_STYLES } from './roadmap.styles'
import {
  compareIds,
  parseTodo,
  stripInlineMarkdown,
  summarizeBody,
  type TodoItem,
  type TodoSection,
} from './todo-parser'
import todoMd from '../../../../../../TODO.md'

interface DecoratedItem {
  item: TodoItem
  section: TodoSection
  sortKey: string
}

/**
 * Roadmap — Angular port of `examples/demo/src/pages/Roadmap/Roadmap.tsx`.
 *
 * Loads `TODO.md` at build time via the `loader: { '.md': 'text' }`
 * tweak in `angular.json` — same effect as Vite's `?raw` query.
 *
 * Renders a flat list with markers + status badges. The React/Vue
 * versions use `<EventTimeline>` from the framework adapter, but the
 * Angular adapter doesn't ship `EventTimeline` (Wave 4.2 didn't add
 * the `complex/Timeline` namesake — see Step-3 finding `event-timeline-missing`).
 * The flat-list rendering is a Step-1 stand-in; visual structure is
 * close enough that the React→Angular smoke parity test will accept
 * it.
 */
@Component({
  selector: 'sg-roadmap-page',
  standalone: true,
  template: `
    <div class="roadmap">
      <header class="roadmap-header">
        <h1 class="roadmap-title">{{ i18n.t().roadmap.title }}</h1>
        <p class="roadmap-lead">{{ i18n.t().roadmap.lead }}</p>
      </header>

      <div class="roadmap-stats" role="list" aria-label="Roadmap stats">
        <span class="roadmap-stat roadmap-stat--closed" role="listitem">
          <span class="roadmap-stat-dot" aria-hidden="true"></span>
          {{ stats().closed }} {{ i18n.t().roadmap.statClosed }}
        </span>
        <span class="roadmap-stat roadmap-stat--open" role="listitem">
          <span class="roadmap-stat-dot" aria-hidden="true"></span>
          {{ stats().open }} {{ i18n.t().roadmap.statOpen }}
        </span>
        <span class="roadmap-stat roadmap-stat--total" role="listitem">
          <span class="roadmap-stat-dot" aria-hidden="true"></span>
          {{ stats().total }} {{ i18n.t().roadmap.statTotal }}
        </span>
      </div>

      <div class="roadmap-source">{{ i18n.t().roadmap.sourceLabel }}</div>

      @if (events().length === 0) {
        <div class="roadmap-empty">{{ i18n.t().roadmap.emptyLabel }}</div>
      } @else {
        <ul class="roadmap-list">
          @for (ev of events(); track ev.sortKey) {
            <li class="roadmap-event">
              <span
                [class]="
                  ev.item.status === 'closed'
                    ? 'roadmap-marker roadmap-marker--closed'
                    : 'roadmap-marker roadmap-marker--open'
                "
                aria-hidden="true"
              ></span>
              <div class="roadmap-event-body-wrap">
                <div class="roadmap-event-title">
                  @if (ev.item.id) {
                    <span class="roadmap-event-id">§ {{ ev.item.id }}</span>
                  }
                  <span>{{ stripInline(ev.item.title) }}</span>
                  <span
                    [class]="
                      ev.item.status === 'closed'
                        ? 'roadmap-event-status roadmap-event-status--closed'
                        : 'roadmap-event-status roadmap-event-status--open'
                    "
                  >
                    {{
                      ev.item.status === 'closed'
                        ? i18n.t().roadmap.statClosed
                        : i18n.t().roadmap.statOpen
                    }}
                  </span>
                </div>
                @if (ev.section.title) {
                  <div class="roadmap-event-section">
                    @if (ev.section.id) {
                      <span>§{{ ev.section.id }} · </span>
                    }
                    <span>{{ ev.section.title }}</span>
                  </div>
                }
                @if (summary(ev.item)) {
                  <div class="roadmap-event-body">{{ summary(ev.item) }}</div>
                }
              </div>
            </li>
          }
        </ul>
      }
    </div>
  `,
  styles: [ROADMAP_STYLES],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoadmapPageComponent {
  protected readonly i18n = inject(I18nService)

  protected readonly sections = parseTodo(todoMd)

  protected readonly events = computed<DecoratedItem[]>(() => {
    const out: DecoratedItem[] = []
    for (const section of this.sections) {
      for (const item of section.items) {
        out.push({ item, section, sortKey: `${section.id}-${item.id}-${item.title}` })
      }
    }
    return out.sort((a, b) => {
      if (a.item.status !== b.item.status) return a.item.status === 'closed' ? -1 : 1
      return compareIds(a.item.id, b.item.id)
    })
  })

  protected readonly stats = computed(() => {
    let closed = 0
    let open = 0
    for (const { item } of this.events()) {
      if (item.status === 'closed') closed++
      else open++
    }
    return { closed, open, total: this.events().length }
  })

  protected stripInline(text: string): string {
    return stripInlineMarkdown(text)
  }

  protected summary(item: TodoItem): string {
    return summarizeBody(item)
  }
}
