import fs from 'node:fs'
import path from 'node:path'

const cands = ['sg-diagram-controls','sg-diagram-minimap','sg-diagram-toolbar','sg-dp-footer-link','sg-dp-time-cell','sg-dp-time-cell-active','sg-modal-body-loading','sg-no-print','sg-pagination-item-active','sg-tree-action-btn','sg-tree-action-danger','sg-tree-indent-branch','sg-tree-indent-branch-last','sg-tree-indent-line','sg-tree-indent-line-hidden','sg-tree-switcher-arrow','sg-tree-switcher-arrow-open','sg-tree-switcher-open','sg-tree-title','sg-tree-title-selectable']

const dirs = ['packages/react/src','packages/vue/src','packages/styles','examples/demo/src','examples/demo-vue/src','examples/showcases/src','examples/_shared-react/src','examples/_shared/src']
const files = []
function walk(p) {
  const stat = fs.statSync(p, { throwIfNoEntry: false })
  if (!stat) return
  if (stat.isFile()) {
    if (/\.(tsx?|jsx?|vue|css|md|html)$/.test(p)) files.push(p)
    return
  }
  for (const e of fs.readdirSync(p)) walk(path.join(p, e))
}
for (const d of dirs) walk(path.resolve(d))

const fileContents = files.map((f) => [f, fs.readFileSync(f, 'utf8')])

for (const cls of cands) {
  const escaped = cls.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const re = new RegExp(escaped, 'g')
  const hits = []
  for (const [f, c] of fileContents) {
    const m = c.match(re)
    if (m) hits.push([f, m.length])
  }
  console.log(`${cls} : ${hits.length} files`)
  for (const [f, n] of hits) console.log(`    ${path.relative(process.cwd(), f)} (${n}x)`)
}
