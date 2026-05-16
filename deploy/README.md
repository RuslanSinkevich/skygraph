# SkyGraph deploy

Multi-framework subdirectory deploy:

- `/` — landing page (static, `landing/`)
- `/react/` — React demo (`examples/demo`)
- `/react/showcases/` — React showcases (`examples/showcases`)
- `/vue/` — Vue demo (`examples/demo-vue`)
- `/angular/` — Angular demo (currently stub: Coming Soon)

Production target: <https://skygraph.ruslansinkevich.ru> (Caddy on host,
static files served from the deploy output).

## Local build (test)

From `skygraph/` root:

```bash
node deploy/build-all.mjs
```

Output: `deploy/output/` — ready static files.

The script:

1. Builds all workspace packages (`packages/*`).
2. Type-checks the React demo (`tsc -b`).
3. Builds the React demo with `vite build --base=/` (overrides the
   legacy `/skygraph/` base in `vite.config.ts` without modifying source).
4. Copies `examples/demo/dist` into `deploy/output/`.
5. Copies stubs into `deploy/output/vue/` and `deploy/output/angular/`.

> Production deploy on the VPS uses `infra/scripts/deploy-skygraph.ps1`
> (workspace root). It builds React + showcases + Vue and the static
> landing, then rsyncs the layout above to the server.

## Docker build

From `skygraph/` root:

```bash
docker build -f deploy/Dockerfile -t skygraph-site .
docker run -p 8080:80 skygraph-site
```

Open http://localhost:8080.

> Note: when running locally, Caddy will still serve at the configured
> domain `skygraph.ruslansinkevich.ru`. To test locally either edit your
> `hosts` file or temporarily replace the host block in
> `deploy/Caddyfile` with `:80`.

## Production deploy

1. Server: any Linux VPS with Docker installed.
2. Domain: `skygraph.ruslansinkevich.ru` → A record to VPS IP.
3. On the server:

```bash
git clone https://github.com/RuslanSinkevich/skygraph.git
cd skygraph
docker build -f deploy/Dockerfile -t skygraph-site .
docker run -d --name skygraph \
  -p 80:80 -p 443:443 \
  -v caddy_data:/data \
  -v caddy_config:/config \
  skygraph-site
```

4. Caddy auto-issues a Let's Encrypt SSL cert on first request.

## Layout

```
deploy/output/
├── index.html               (React)
├── assets/
├── vue/index.html           (stub — production uses real Vue build via deploy-skygraph.ps1)
└── angular/index.html       (stub)
```

`build-all.mjs` still drops a Vue stub into `vue/` for local sanity
checks. Real Vue demo is built and copied by the production deploy
script (`infra/scripts/deploy-skygraph.ps1`). When the Angular demo is
ready, update `deploy/build-all.mjs` to build it and copy `dist/`
instead of the stub (template line is already present as a comment in
the script).
