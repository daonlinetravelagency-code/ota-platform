# OTA Platform MVP Setup Script
# Run from project root directory

Write-Host "`n🚀 OTA Platform MVP - Automated Setup" -ForegroundColor Cyan
Write-Host "=" * 50 -ForegroundColor Cyan

# Step 1: Clean old structure
Write-Host "`n[1/4] Cleaning old code..." -ForegroundColor Yellow

git rm -r backend 2>$null
git rm -r frontend 2>$null
git rm -r .github 2>$null
git rm package.json 2>$null
git rm package-lock.json 2>$null
git rm README.md 2>$null
git rm DEPLOYMENT.md 2>$null
git rm docker-compose.yml 2>$null
git rm wrangler.toml 2>$null
git rm -r docs 2>$null

git add -A 2>$null
git commit -m "chore: clean old MVP for rewrite" 2>$null

Write-Host "✓ Old code cleaned" -ForegroundColor Green

# Step 2: Create directory structure
Write-Host "`n[2/4] Creating directory structure..." -ForegroundColor Yellow

@(
    "packages/frontend/app",
    "packages/frontend/public",
    "packages/backend/src/db",
    "packages/backend/src/routes",
    "packages/backend/src/types",
    ".github/workflows"
) | ForEach-Object {
    mkdir -Force $_ | Out-Null
}

# Create .gitkeep
New-Item -ItemType File -Path "packages/frontend/public/.gitkeep" -Force | Out-Null

Write-Host "✓ Directory structure created" -ForegroundColor Green

# Step 3: Create all files
Write-Host "`n[3/4] Creating project files..." -ForegroundColor Yellow

# ROOT: package.json
@'
{
  "name": "ota-platform",
  "version": "0.1.0",
  "description": "Online Travel Agency Platform MVP",
  "private": true,
  "type": "module",
  "workspaces": [
    "packages/frontend",
    "packages/backend"
  ],
  "scripts": {
    "dev": "npm run dev --workspace=packages/frontend & npm run dev --workspace=packages/backend",
    "build": "npm run build --workspace=packages/frontend && npm run build --workspace=packages/backend",
    "build:frontend": "npm run build --workspace=packages/frontend",
    "build:backend": "npm run build --workspace=packages/backend",
    "start": "npm start --workspace=packages/backend",
    "lint": "npm run lint --workspace=packages/frontend",
    "type-check": "npm run type-check --workspace=packages/backend"
  },
  "engines": {
    "node": ">=20.0.0",
    "npm": ">=10.0.0"
  }
}
'@ | Set-Content -Path "package.json" -Encoding UTF8

# ROOT: README.md
@'
# OTA Platform MVP

Online Travel Agency Platform - Proof of Concept

## Quick Start

### Prerequisites
- Node.js 20+
- npm 10+
- PostgreSQL (for development)

### Installation

```bash
npm install
cp .env.example .env
npm run build
npm run dev
```

## Project Structure

```
ota-platform/
├── packages/
│   ├── frontend/          # Next.js 14 + React 18
│   └── backend/           # Fastify + TypeScript
├── .github/workflows/     # CI/CD pipelines
└── package.json
```

## Deployment

- **Develop branch** → Auto-deploys to Cloudflare (Pages + Workers)
- **Main branch** → Production (future)

## Available Scripts

```bash
npm run dev              # Development
npm run build            # Build both
npm run build:frontend   # Frontend only
npm run build:backend    # Backend only
npm run type-check       # TypeScript check
npm run lint             # Linting
npm start                # Production
```

## Tech Stack

- **Frontend:** Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend:** Fastify, Node.js 20, TypeScript, PostgreSQL, JWT
- **DevOps:** GitHub Actions, Cloudflare (Pages + Workers)

## Environment

See `.env.example` for configuration.
'@ | Set-Content -Path "README.md" -Encoding UTF8

# ROOT: .gitignore
@'
node_modules/
*.pnp
.pnp.js
package-lock.json
yarn.lock
dist/
.next/
out/
*.tsbuildinfo
build/
.env
.env.local
.env.*.local
.vscode/
.idea/
*.swp
*.swo
*~
.DS_Store
logs/
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.cache/
.turbo/
tmp/
temp/
Thumbs.db
'@ | Set-Content -Path ".gitignore" -Encoding UTF8

# ROOT: .env.example
@'
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=password
DB_NAME=ota_dev
PORT=3001
HOST=0.0.0.0
NODE_ENV=development
JWT_SECRET=your-secret-key-change-in-production
CLOUDFLARE_API_TOKEN=your-cloudflare-api-token
CLOUDFLARE_ACCOUNT_ID=your-cloudflare-account-id
'@ | Set-Content -Path ".env.example" -Encoding UTF8

# FRONTEND: package.json
@'
{
  "name": "ota-frontend",
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint . --ext .ts,.tsx"
  },
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "tailwindcss": "^3.4.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "typescript": "^5.3.0",
    "eslint": "^8.50.0",
    "eslint-config-next": "^14.0.0",
    "postcss": "^8.4.0",
    "autoprefixer": "^10.4.0"
  }
}
'@ | Set-Content -Path "packages/frontend/package.json" -Encoding UTF8

# FRONTEND: tsconfig.json
@'
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "resolveJsonModule": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    },
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
'@ | Set-Content -Path "packages/frontend/tsconfig.json" -Encoding UTF8

# FRONTEND: next.config.js
@'
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;
'@ | Set-Content -Path "packages/frontend/next.config.js" -Encoding UTF8

# FRONTEND: tailwind.config.ts
@'
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
'@ | Set-Content -Path "packages/frontend/tailwind.config.ts" -Encoding UTF8

# FRONTEND: postcss.config.js
@'
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
'@ | Set-Content -Path "packages/frontend/postcss.config.js" -Encoding UTF8

# FRONTEND: .eslintrc.json
@'
{
  "extends": ["next/core-web-vitals"]
}
'@ | Set-Content -Path "packages/frontend/.eslintrc.json" -Encoding UTF8

# FRONTEND: app/layout.tsx
@'
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'OTA Platform - Book Your Next Adventure',
  description: 'Online Travel Agency MVP',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
'@ | Set-Content -Path "packages/frontend/app/layout.tsx" -Encoding UTF8

# FRONTEND: app/page.tsx
@'
export default function Home() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="text-center text-white">
        <h1 className="text-5xl font-bold mb-4">OTA Platform MVP</h1>
        <p className="text-xl mb-8">Online Travel Agency - Proof of Concept</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12 max-w-4xl">
          <div className="bg-white bg-opacity-20 p-6 rounded-lg backdrop-blur">
            <h2 className="text-2xl font-semibold mb-2">✈️ Flights</h2>
            <p>Search and book flights worldwide</p>
          </div>
          <div className="bg-white bg-opacity-20 p-6 rounded-lg backdrop-blur">
            <h2 className="text-2xl font-semibold mb-2">🏨 Hotels</h2>
            <p>Find the perfect accommodation</p>
          </div>
          <div className="bg-white bg-opacity-20 p-6 rounded-lg backdrop-blur">
            <h2 className="text-2xl font-semibold mb-2">🎫 Tours</h2>
            <p>Discover amazing tour packages</p>
          </div>
        </div>
      </div>
    </main>
  );
}
'@ | Set-Content -Path "packages/frontend/app/page.tsx" -Encoding UTF8

# FRONTEND: app/globals.css
@'
@tailwind base;
@tailwind components;
@tailwind utilities;

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  background-color: #f5f5f5;
  color: #333;
}
'@ | Set-Content -Path "packages/frontend/app/globals.css" -Encoding UTF8

# BACKEND: package.json
@'
{
  "name": "ota-backend",
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "node --loader tsx --watch src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "fastify": "^4.25.0",
    "@fastify/cors": "^8.4.0",
    "@fastify/jwt": "^7.1.0",
    "pg": "^8.11.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/pg": "^8.10.0",
    "typescript": "^5.3.0",
    "tsx": "^4.7.0"
  }
}
'@ | Set-Content -Path "packages/backend/package.json" -Encoding UTF8

# BACKEND: tsconfig.json
@'
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["ES2020"],
    "moduleResolution": "bundler",
    "rootDir": "src",
    "outDir": "dist",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
'@ | Set-Content -Path "packages/backend/tsconfig.json" -Encoding UTF8

# BACKEND: wrangler.toml
@'
name = "ota-platform-api-dev"
type = "service"
account_id = "YOUR_ACCOUNT_ID"
workers_dev = true
main = "dist/index.js"
compatibility_date = "2024-01-01"

[env.development]
name = "ota-platform-api-dev"
routes = [
    { pattern = "api.dev-example.com/*", zone_name = "example.com" }
]

[env.production]
name = "ota-platform-api-prod"
routes = [
    { pattern = "api.example.com/*", zone_name = "example.com" }
]
'@ | Set-Content -Path "packages/backend/wrangler.toml" -Encoding UTF8

# BACKEND: src/index.ts
@'
import './types/fastify.js';
import Fastify from 'fastify';
import fastifyJwt from '@fastify/jwt';
import fastifyCors from '@fastify/cors';
import { initDb } from './db/pool.js';
import { registerHealthRoutes } from './routes/health.js';

const PORT = parseInt(process.env.PORT || '3001');
const HOST = '0.0.0.0';

const start = async () => {
  try {
    const db = await initDb();
    const fastify = Fastify({
      logger: {
        level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
      },
    });

    await fastify.register(fastifyCors, { origin: true });
    await fastify.register(fastifyJwt, {
      secret: process.env.JWT_SECRET || 'your-secret-key-change-in-production',
    });

    fastify.decorate('pgPool', db);
    await registerHealthRoutes(fastify);

    await fastify.listen({ port: PORT, host: HOST });
    console.log(`✓ Server running at http://${HOST}:${PORT}`);
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
};

start();
'@ | Set-Content -Path "packages/backend/src/index.ts" -Encoding UTF8

# BACKEND: src/db/pool.ts
@'
import { Pool } from 'pg';

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'ota_dev',
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
});

export const initDb = async () => {
  try {
    const client = await pool.connect();
    console.log('✓ Database connected');
    client.release();
    return pool;
  } catch (err) {
    console.error('Failed to connect to database:', err);
    throw err;
  }
};

export { pool };
'@ | Set-Content -Path "packages/backend/src/db/pool.ts" -Encoding UTF8

# BACKEND: src/routes/health.ts
@'
import { FastifyInstance } from 'fastify';

export const registerHealthRoutes = async (fastify: FastifyInstance) => {
  fastify.get('/health', async (request, reply) => {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    };
  });

  fastify.get('/api/health', async (request, reply) => {
    try {
      const result = await fastify.pgPool.query('SELECT NOW()');
      return {
        status: 'ok',
        database: 'connected',
        timestamp: new Date().toISOString(),
      };
    } catch (err) {
      reply.code(503);
      return {
        status: 'error',
        database: 'disconnected',
        error: (err as Error).message,
      };
    }
  });
};
'@ | Set-Content -Path "packages/backend/src/routes/health.ts" -Encoding UTF8

# BACKEND: src/types/fastify.ts
@'
import { FastifyInstance } from 'fastify';
import { Pool } from 'pg';

declare module 'fastify' {
  interface FastifyInstance {
    pgPool: Pool;
  }
}
'@ | Set-Content -Path "packages/backend/src/types/fastify.ts" -Encoding UTF8

# CI/CD: .github/workflows/deploy-develop.yml
@'
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
'@ | Set-Content -Path ".github/workflows/deploy-develop.yml" -Encoding UTF8

Write-Host "✓ All files created" -ForegroundColor Green

# Step 4: Install and verify
Write-Host "`n[4/4] Installing dependencies..." -ForegroundColor Yellow

npm install
$buildStatus = $?

if ($buildStatus) {
    Write-Host "`n✅ MVP Setup Complete!" -ForegroundColor Green
    Write-Host "`nNext steps:" -ForegroundColor Cyan
    Write-Host "1. npm run type-check     # Verify TypeScript"
    Write-Host "2. npm run build          # Build everything"
    Write-Host "3. git add -A && git commit -m 'feat: OTA Platform MVP'"
    Write-Host "4. git push origin develop"
    Write-Host "`n" -ForegroundColor Cyan
} else {
    Write-Host "`n❌ npm install failed" -ForegroundColor Red
}
