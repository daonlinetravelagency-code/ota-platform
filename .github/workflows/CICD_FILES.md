# CI/CD FILES - Копируй в .github/workflows/

## .github/workflows/deploy-develop.yml
```yaml
name: Deploy Develop to Cloudflare

on:
  push:
    branches:
      - develop

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Type check backend
        run: npm run type-check --workspace=packages/backend

      - name: Build frontend
        run: npm run build --workspace=packages/frontend

      - name: Build backend
        run: npm run build --workspace=packages/backend

      - name: Deploy frontend to Cloudflare Pages
        uses: cloudflare/wrangler-action@v3
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          command: pages deploy packages/frontend/out --project-name=ota-platform-dev
        env:
          CLOUDFLARE_API_TOKEN: ${{ secrets.CLOUDFLARE_API_TOKEN }}

      - name: Build and deploy backend to Cloudflare Workers
        run: |
          npm install -g wrangler
          cd packages/backend
          wrangler deploy
        env:
          CLOUDFLARE_API_TOKEN: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          CLOUDFLARE_ACCOUNT_ID: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
```

**Копируй это ровно в файл `.github/workflows/deploy-develop.yml`**
