<script setup lang="ts">
/**
 * ImagePlaceholder — visual stand-in for landing page screenshots.
 *
 * Mirrors `examples/demo/src/pages/Landing/ImagePlaceholder.tsx`. The
 * landing page references PNG/JPG assets that live in
 * `examples/demo-vue/public/landing/`. Until those files are produced,
 * this component renders a hatched box with the file name and a short
 * description so it is clear what should appear there.
 *
 * To swap in a real image:
 *   1. Drop the file into `examples/demo-vue/public/landing/<name>`.
 *   2. Replace the <ImagePlaceholder/> tag with a plain
 *      <img :src="`/landing/${name}`" :alt="..." />.
 */

interface Props {
  /** Final file name (e.g. `crm.png`). Shown verbatim. */
  name: string
  /** Human description of what the image should depict. */
  description: string
  /** Aspect ratio + layout preset. */
  variant?: 'hero' | 'showcase' | 'spot'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'spot',
})
</script>

<template>
  <div
    :class="['landing-image-placeholder', `landing-image-placeholder--${props.variant}`]"
    role="img"
    :aria-label="`Placeholder for ${props.name}: ${props.description}`"
  >
    <div>
      <div class="landing-image-placeholder-icon" aria-hidden="true">📷</div>
      <div class="landing-image-placeholder-name">/landing/{{ props.name }}</div>
      <div class="landing-image-placeholder-desc">{{ props.description }}</div>
    </div>
  </div>
</template>
