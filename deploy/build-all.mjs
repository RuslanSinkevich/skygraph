#!/usr/bin/env node
import { execSync } from 'node:child_process'
import { mkdirSync, cpSync, rmSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const repoRoot = join(__dirname, '..')
const output = join(__dirname, 'output')

function run(cmd, cwd = repoRoot) {
  console.log(`> ${cmd}`)
  execSync(cmd, { stdio: 'inherit', cwd, shell: true })
}

function copyDir(src, dst) {
  if (!existsSync(src)) {
    throw new Error(`Source not found: ${src}`)
  }
  mkdirSync(dst, { recursive: true })
  cpSync(src, dst, { recursive: true })
}

console.log('=== SkyGraph multi-framework build ===')

if (existsSync(output)) {
  rmSync(output, { recursive: true, force: true })
}
mkdirSync(output, { recursive: true })

console.log('\n[1/5] Building workspace packages...')
run('pnpm -r --filter "./packages/*" build')

console.log('\n[2/5] Type-checking React demo...')
run('pnpm --filter demo exec tsc -b')

// vite.config.ts in demo uses base: '/skygraph/' (legacy GitHub Pages
// path). For root-domain deploy we override via CLI flag without
// touching the demo source.
console.log('\n[3/5] Building React demo (vite, base=/)...')
run('pnpm --filter demo exec vite build --base=/')

console.log('\n[4/5] Copying React demo to output root...')
copyDir(join(repoRoot, 'examples/demo/dist'), output)

console.log('\n[5/5] Copying Vue / Angular stubs...')
copyDir(join(__dirname, 'stubs/vue'), join(output, 'vue'))
copyDir(join(__dirname, 'stubs/angular'), join(output, 'angular'))

// When @skygraph/vue demo is ready, replace stubs with real build:
//   run('pnpm --filter demo-vue exec vite build --base=/vue/')
//   copyDir(join(repoRoot, 'examples/demo-vue/dist'), join(output, 'vue'))

console.log('\n=== Build done ===')
console.log(`Output: ${output}`)
