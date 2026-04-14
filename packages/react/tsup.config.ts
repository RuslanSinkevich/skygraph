import { defineConfig } from 'tsup'

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    form: 'src/form.ts',
    table: 'src/table.ts',
    tree: 'src/tree.ts',
    datagrid: 'src/datagrid.ts',
    virtual: 'src/virtual.ts',
    devtools: 'src/devtools.ts',
  },
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  sourcemap: true,
  external: ['react', 'react-dom', '@skygraph/core'],
})
