import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const idxPath = path.join(root, 'packages/react/src/index.ts')
const src = fs.readFileSync(idxPath, 'utf8')

const re = /export\s+(?:type\s*)?\{([^}]+)\}/g
const exports = []
let m
while ((m = re.exec(src))) {
  m[1].split(',').forEach(s => {
    s = s.trim()
    if (!s) return
    const parts = s.split(/\s+as\s+/)
    const name = (parts[1] || parts[0]).trim()
    if (name) exports.push(name)
  })
}

const consumerDirs = [
  'examples/demo/src',
  'examples/showcases/src',
  'examples/_shared-react/src',
  'examples/_shared/src',
  'packages/react/src/__tests__',
  'README.md',
  'docs',
]

const allFiles = []
function walk(p) {
  const stat = fs.statSync(p, { throwIfNoEntry: false })
  if (!stat) return
  if (stat.isFile()) {
    if (/\.(tsx?|jsx?|md|mdx|vue)$/.test(p)) {
      allFiles.push(p)
    }
    return
  }
  for (const e of fs.readdirSync(p)) walk(path.join(p, e))
}
for (const d of consumerDirs) walk(path.join(root, d))

const fileContents = new Map()
for (const f of allFiles) {
  fileContents.set(f, fs.readFileSync(f, 'utf8'))
}

const result = []
for (const name of exports) {
  // word boundary match for symbol
  const wb = new RegExp(`\\b${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`)
  let usedIn = []
  for (const [f, c] of fileContents) {
    if (wb.test(c)) usedIn.push(f)
  }
  result.push({ name, count: usedIn.length, sample: usedIn.slice(0, 3) })
}

const dead = result.filter(r => r.count === 0)
console.log(`Total exports: ${exports.length}`)
console.log(`Dead (zero references in consumers/tests/docs): ${dead.length}`)
console.log('---')
for (const d of dead) console.log(d.name)
