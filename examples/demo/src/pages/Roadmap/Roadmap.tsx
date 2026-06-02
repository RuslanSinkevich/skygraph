/**
 * Changelog page (`#/roadmap`).
 *
 * Renders the project `CHANGELOG.md` as a plain list of releases.
 * No filters, no metrics, no parsing of internal artefacts — just
 * what changed, version by version.
 */
import { useMemo } from 'react'
import { parseChangelog, GITHUB_URL } from '@skygraph-examples/shared'
import type { ChangelogEntry } from '@skygraph-examples/shared'
import changelogMd from '../../../../../CHANGELOG.md?raw'
import { useI18n } from '../../i18n'
import './roadmap.css'

const CHANGELOG_GITHUB_URL =
  'https://github.com/RuslanSinkevich/skygraph-public/blob/master/CHANGELOG.md'

interface RoadmapProps {
  onNavigate?: (key: string) => void
}

export function Roadmap(_props: RoadmapProps) {
  const { t } = useI18n()
  const entries = useMemo(() => parseChangelog(changelogMd), [])

  return (
    <div className="roadmap">
      <header className="roadmap-header">
        <h1 className="roadmap-title">{t.roadmap.title}</h1>
        <p className="roadmap-lead">{t.roadmap.lead}</p>
        <div className="roadmap-links">
          <a href={CHANGELOG_GITHUB_URL} target="_blank" rel="noreferrer noopener">
            {t.roadmap.viewOnGithub}
          </a>
          <span aria-hidden="true">·</span>
          <a href={GITHUB_URL} target="_blank" rel="noreferrer noopener">
            GitHub →
          </a>
        </div>
      </header>

      {entries.length === 0 ? (
        <div className="roadmap-empty">{t.roadmap.emptyLabel}</div>
      ) : (
        <ol className="roadmap-list">
          {entries.map((entry, idx) => (
            <li key={entry.title || idx} className="roadmap-entry">
              <Release entry={entry} />
            </li>
          ))}
        </ol>
      )}
    </div>
  )
}

function Release({ entry }: { entry: ChangelogEntry }) {
  return (
    <article className="roadmap-release">
      <header className="roadmap-release-head">
        <h2 className="roadmap-release-version">{entry.version ?? entry.title}</h2>
        {entry.date && <span className="roadmap-release-date">{entry.date}</span>}
      </header>

      {entry.body.length > 0 && (
        <p className="roadmap-release-summary">{joinParagraph(entry.body)}</p>
      )}

      {entry.rounds.map((section, idx) => (
        <section key={section.title || idx} className="roadmap-section">
          {section.title && <h3 className="roadmap-section-title">{section.title}</h3>}
          {renderBullets(section.body)}
          {section.subsections.map((sub, subIdx) => (
            <div key={sub.title || subIdx} className="roadmap-subsection">
              {sub.title && <h4 className="roadmap-subsection-title">{sub.title}</h4>}
              {renderBullets(sub.body)}
            </div>
          ))}
        </section>
      ))}
    </article>
  )
}

function renderBullets(lines: string[]) {
  const bullets = collectBullets(lines)
  if (bullets.length === 0) return null
  return (
    <ul className="roadmap-bullets">
      {bullets.map((line, i) => (
        <li key={i} dangerouslySetInnerHTML={{ __html: renderInline(line) }} />
      ))}
    </ul>
  )
}

function collectBullets(lines: string[]): string[] {
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

function joinParagraph(lines: string[]): string {
  return lines
    .map((l) => l.trim())
    .filter((l) => l.length > 0 && !/^[-*]\s/.test(l))
    .join(' ')
}

function renderInline(text: string): string {
  return escapeHtml(text)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" target="_blank" rel="noreferrer noopener">$1</a>',
    )
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}
