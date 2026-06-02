<script setup lang="ts">
/**
 * Changelog page (`/roadmap`) — Vue port of the React Changelog page.
 * Renders `CHANGELOG.md` as a plain release list.
 */
import { computed } from 'vue'
import { GITHUB_URL, parseChangelog, type ChangelogEntry } from '@skygraph-examples/shared'
import changelogMd from '../../../../CHANGELOG.md?raw'
import { useI18n } from '../i18n'
import './roadmap.css'

const { t } = useI18n()

const CHANGELOG_GITHUB_URL =
  'https://github.com/RuslanSinkevich/skygraph-public/blob/master/CHANGELOG.md'

const entries = computed<ChangelogEntry[]>(() => parseChangelog(changelogMd))

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
</script>

<template>
  <div class="roadmap">
    <header class="roadmap-header">
      <h1 class="roadmap-title">{{ t.roadmap.title }}</h1>
      <p class="roadmap-lead">{{ t.roadmap.lead }}</p>
      <div class="roadmap-links">
        <a :href="CHANGELOG_GITHUB_URL" target="_blank" rel="noreferrer noopener">
          {{ t.roadmap.viewOnGithub }}
        </a>
        <span aria-hidden="true">·</span>
        <a :href="GITHUB_URL" target="_blank" rel="noreferrer noopener">GitHub →</a>
      </div>
    </header>

    <div v-if="entries.length === 0" class="roadmap-empty">
      {{ t.roadmap.emptyLabel }}
    </div>
    <ol v-else class="roadmap-list">
      <li v-for="(entry, idx) in entries" :key="entry.title || idx" class="roadmap-entry">
        <article class="roadmap-release">
          <header class="roadmap-release-head">
            <h2 class="roadmap-release-version">
              {{ entry.version ?? entry.title }}
            </h2>
            <span v-if="entry.date" class="roadmap-release-date">{{ entry.date }}</span>
          </header>

          <p v-if="entry.body.length > 0" class="roadmap-release-summary">
            {{ joinParagraph(entry.body) }}
          </p>

          <section
            v-for="(section, sIdx) in entry.rounds"
            :key="section.title || sIdx"
            class="roadmap-section"
          >
            <h3 v-if="section.title" class="roadmap-section-title">
              {{ section.title }}
            </h3>
            <ul v-if="collectBullets(section.body).length > 0" class="roadmap-bullets">
              <li
                v-for="(line, i) in collectBullets(section.body)"
                :key="i"
                v-html="renderInline(line)"
              />
            </ul>
            <div
              v-for="(sub, subIdx) in section.subsections"
              :key="sub.title || subIdx"
              class="roadmap-subsection"
            >
              <h4 v-if="sub.title" class="roadmap-subsection-title">{{ sub.title }}</h4>
              <ul v-if="collectBullets(sub.body).length > 0" class="roadmap-bullets">
                <li
                  v-for="(line, i) in collectBullets(sub.body)"
                  :key="i"
                  v-html="renderInline(line)"
                />
              </ul>
            </div>
          </section>
        </article>
      </li>
    </ol>
  </div>
</template>
