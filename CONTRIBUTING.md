# Contributing to SkyGraph

Thanks for your interest in contributing!

## Getting Started

```bash
# Clone the repo
git clone https://github.com/skygraph/skygraph.git
cd skygraph

# Install dependencies (requires pnpm)
pnpm install

# Build all packages
pnpm build

# Run tests
pnpm test

# Run linter
pnpm lint
```

## Project Structure

```
skygraph/
├── packages/
│   ├── core/          # @skygraph/core — reactive runtime + engines
│   └── react/         # @skygraph/react — hooks, components, styles
├── examples/
│   └── demo/          # Vite demo app
└── docs/              # Documentation
```

## Development Workflow

1. Create a branch from `main`
2. Make your changes
3. Ensure `pnpm lint`, `pnpm build`, and `pnpm test` all pass
4. Submit a pull request

## Conventions

### Code Style

- TypeScript strict mode
- ESLint + Prettier enforced (run `pnpm lint` and `pnpm format`)
- No default exports — use named exports
- CSS classes: `.sg-*` prefix
- CSS variables: `--sg-*` prefix

### Architecture Rules

These are non-negotiable (see `ARCHITECTURE.md`):

- `runtime/` never imports from `engines/`
- `engines/` uses `runtime/` via internal API
- `@skygraph/react` imports `@skygraph/core` via public API only
- `components/ui/` never imports from `runtime/` or `engines/`
- Styling composition via CSS Variables, not nested selectors

### Commit Messages

Use conventional format:

```
feat(core): add computed node garbage collection
fix(react): fix focus trap in Modal
docs: update theming guide
test(core): add TreeEngine unit tests
```

### Tests

- Core: Vitest, located in `packages/core/src/__tests__/`
- React: Vitest + @testing-library/react, in `packages/react/src/__tests__/`
- New features should include tests
- New engines require unit tests before merge

## Pull Request Process

1. Fill out the PR template
2. Ensure CI passes
3. Request review from a maintainer
4. Squash and merge

## Reporting Issues

- Use GitHub Issues
- Include reproduction steps
- Specify browser/Node.js version if relevant
