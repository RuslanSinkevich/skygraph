<script setup lang="ts">
export interface FooterLink {
  label: string
  href: string
  external?: boolean
}

export interface FooterColumn {
  title: string
  links: readonly FooterLink[]
}

interface Props {
  /** Four-column area at the top (Documentation / Resources / Community / Project). */
  columns: readonly FooterColumn[]
  /** Bottom-strip copyright line ("© 2026 SkyGraph"). */
  copyright: string
  /** Bottom-strip version badge ("v0.5.0"). */
  version?: string
}

defineProps<Props>()

const emit = defineEmits<{
  (e: 'select', href: string): void
}>()

defineSlots<{
  /** Bottom-strip extras (optional secondary controls). */
  extras?(): unknown
}>()

function onLinkClick(link: FooterLink, ev: MouseEvent) {
  if (link.external) return
  ev.preventDefault()
  emit('select', link.href)
}
</script>

<template>
  <footer class="xshell-footer" role="contentinfo">
    <div class="xshell-footer-inner">
      <div v-for="col in columns" :key="col.title" class="xshell-footer-col">
        <div class="xshell-footer-col-title">{{ col.title }}</div>
        <ul>
          <li v-for="link in col.links" :key="link.href">
            <a v-if="link.external" :href="link.href" target="_blank" rel="noreferrer noopener">{{
              link.label
            }}</a>
            <a v-else :href="link.href" @click="onLinkClick(link, $event)">{{ link.label }}</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="xshell-footer-bottom">
      <span>{{ copyright }}</span>
      <span v-if="version" class="xshell-footer-version">{{ version }}</span>
      <div class="xshell-footer-spacer" />
      <slot name="extras" />
    </div>
  </footer>
</template>
