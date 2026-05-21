export { default as ComponentDoc } from './ComponentDoc.vue'
export { default as DemoBox } from './DemoBox.vue'
export { default as PropsTable } from './PropsTable.vue'
export { default as CssVarsTable } from './CssVarsTable.vue'

export type { PropDef } from './PropsTable.vue'
export type { CssVarDef } from './CssVarsTable.vue'

export { DemoTOC, DemoTOCProvider, useDemoTOC, slugify, DEMO_TOC_KEY } from './DemoTOC'
export type {
  DemoTOCContextValue,
  DemoTOCItem,
  RegistrationEntry,
  UseDemoTOCResult,
} from './DemoTOC'
