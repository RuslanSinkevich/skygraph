/**
 * Module declarations for non-TS imports the @angular/build esbuild
 * pipeline understands. `loader: { '.md': 'text' }` in `angular.json`
 * lets us `import md from '../path.md'` and receive a `string`.
 */
declare module '*.md' {
  const content: string
  export default content
}
