# City Airport Taxis — Public Website

Next.js customer-facing website for bookings, fleet showcase, and marketing pages.

## Production URLs

- Website: https://www.city-airport-taxis.be
- API: https://api.city-airport-taxis.be

## Local development

```bash
pnpm install
cp .env.example .env   # or use existing .env
pnpm dev
```

## VPS deployment

Manual sync + Docker build (from monorepo root):

```bash
bash deploy/vps-deploy-all.sh
```

Or website only:

```bash
VPS_HOST=82.29.177.100 rsync -az --delete \
  --exclude .env.production --exclude node_modules --exclude .next --exclude .git \
  website/ root@82.29.177.100:/opt/city-airport-taxis-website/
scp website/.env.production root@82.29.177.100:/opt/city-airport-taxis-website/.env.production
```

GitHub Actions deploys on push to `main` when VPS secrets are configured in the `production` environment.

## Environment variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_BACKEND_URL` | Backend API base URL |
| `NEXT_PUBLIC_SITE_URL` | Public site URL (SEO, sitemap) |
| `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | Google Maps Places API key |
