# SkyGraph deploy

Multi-framework subdirectory deploy:

- `/` — React demo (main)
- `/vue/` — Vue demo (currently stub: Coming Soon)
- `/angular/` — Angular demo (currently stub: Coming Soon)

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
├── vue/index.html           (stub)
└── angular/index.html       (stub)
```

When Vue/Angular demos are ready, update `deploy/build-all.mjs` to build
them and copy `dist/` instead of stubs (template lines are already
present as comments in the script).
