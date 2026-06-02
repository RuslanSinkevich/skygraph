import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core'
import { DomSanitizer, type SafeHtml } from '@angular/platform-browser'
import { I18nService } from '../../i18n'
import { ROADMAP_STYLES } from './roadmap.styles'
import {
  parseChangelog,
  type ChangelogEntry,
  type ChangelogRound,
  type ChangelogSubsection,
} from './changelog-parser'
import changelogMd from '../../../../../../CHANGELOG.md'

const CHANGELOG_GITHUB_URL =
  'https://github.com/RuslanSinkevich/skygraph-public/blob/master/CHANGELOG.md'

/**
 * Changelog page — Angular port of the React/Vue Changelog page.
 * Renders `CHANGELOG.md` as a plain release list.
 */
@Component({
  selector: 'sg-roadmap-page',
  standalone: true,
  template: `
    <div class="roadmap">
      <header class="roadmap-header">
        <h1 class="roadmap-title">{{ i18n.t().roadmap.title }}</h1>
        <p class="roadmap-lead">{{ i18n.t().roadmap.lead }}</p>
        <div class="roadmap-links">
          <a [href]="changelogUrl" target="_blank" rel="noreferrer noopener">
            {{ i18n.t().roadmap.viewOnGithub }}
          </a>
        </div>
      </header>

      @if (entries().length === 0) {
        <div class="roadmap-empty">{{ i18n.t().roadmap.emptyLabel }}</div>
      } @else {
        <ol class="roadmap-list">
          @for (entry of entries(); track entry.title; let idx = $index) {
            <li class="roadmap-entry">
              <article class="roadmap-release">
                <header class="roadmap-release-head">
                  <h2 class="roadmap-release-version">
                    {{ entry.version ?? entry.title }}
                  </h2>
                  @if (entry.date) {
                    <span class="roadmap-release-date">{{ entry.date }}</span>
                  }
                </header>

                @if (entry.body.length > 0) {
                  <p class="roadmap-release-summary">
                    {{ joinParagraph(entry.body) }}
                  </p>
                }

                @for (section of entry.rounds; track section.title) {
                  <section class="roadmap-section">
                    @if (section.title) {
                      <h3 class="roadmap-section-title">{{ section.title }}</h3>
                    }
                    @if (collectBullets(section.body).length > 0) {
                      <ul class="roadmap-bullets">
                        @for (line of collectBullets(section.body); track line) {
                          <li [innerHTML]="renderInline(line)"></li>
                        }
                      </ul>
                    }
                    @for (sub of section.subsections; track sub.title) {
                      <div class="roadmap-subsection">
                        @if (sub.title) {
                          <h4 class="roadmap-subsection-title">{{ sub.title }}</h4>
                        }
                        @if (collectBullets(sub.body).length > 0) {
                          <ul class="roadmap-bullets">
                            @for (line of collectBullets(sub.body); track line) {
                              <li [innerHTML]="renderInline(line)"></li>
                            }
                          </ul>
                        }
                      </div>
                    }
                  </section>
                }
              </article>
            </li>
          }
        </ol>
      }
    </div>
  `,
  styles: [ROADMAP_STYLES],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoadmapPageComponent {
  protected readonly i18n = inject(I18nService)
  private readonly sanitizer = inject(DomSanitizer)

  protected readonly changelogUrl = CHANGELOG_GITHUB_URL

  protected readonly entries = computed<ChangelogEntry[]>(() => parseChangelog(changelogMd))

  protected joinParagraph(lines: string[]): string {
    return lines
      .map((l) => l.trim())
      .filter((l) => l.length > 0 && !/^[-*]\s/.test(l))
      .join(' ')
  }

  protected collectBullets(lines: string[]): string[] {
    const out: string[] = []
    let current: string | null = null
    for (const raw of lines) {
      if (/^\s*[-*]\s+/.test(raw)) {
        if (current !== null) out.push(current.trim())
        current = raw.replace(/^\s*[-*]\s+/, '').trim()
      } else if (current !== null && raw.trim() !== '') {
        current += ' ' + raw.trim()
      } else if (current !== null && raw.trim() === '') {
        out.push(current.trim())
        current = null
      }
    }
    if (current !== null) out.push(current.trim())
    return out
  }

  protected renderInline(text: string): SafeHtml {
    const html = escapeHtml(text)
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(
        /\[([^\]]+)\]\(([^)]+)\)/g,
        '<a href="$2" target="_blank" rel="noreferrer noopener">$1</a>',
      )
    return this.sanitizer.bypassSecurityTrustHtml(html)
  }
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

export type { ChangelogEntry, ChangelogRound, ChangelogSubsection }
