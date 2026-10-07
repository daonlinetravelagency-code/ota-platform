# OTA Platform MVP

Online Travel Agency Platform - Proof of Concept

## Quick Start

### Prerequisites
- Node.js 20+
- npm 10+
- PostgreSQL (for development)

### Installation

```bash
# Install dependencies
npm install

# Setup environment
cp .env.example .env

# Run database migrations (if needed)
# npm run db:migrate

# Development
npm run dev

# Build
npm run build

# Start production
npm start
```

## Project Structure

```
ota-platform/
├── packages/
│   ├── frontend/          # Next.js 14 + React 18
│   │   ├── app/          # App directory
│   │   ├── public/       # Static assets
│   │   └── package.json
│   │
│   └── backend/          # Fastify + TypeScript
│       ├── src/
│       │   ├── index.ts       # Main entry
│       │   ├── types/         # Type declarations
│       │   ├── db/           # Database
│       │   └── routes/       # API routes
│       └── package.json
│
├── .github/
│   └── workflows/        # CI/CD pipelines
│
└── package.json          # Root workspace config
```

## Branches

- `develop` - Development branch, auto-deploys to Cloudflare Pages (frontend) and Cloudflare Workers (backend)
- `main` - Production branch (future)

## Deployment

### Frontend (Cloudflare Pages)
- Automatically deployed on push to `develop` branch
- Static export using Next.js
- Project: `ota-platform-dev`

### Backend (Cloudflare Workers)
- Automatically deployed on push to `develop` branch
- Running on Cloudflare Workers edge network
- API endpoints available

## Available Scripts

```bash
# Development
npm run dev              # Run both frontend and backend

# Building
npm run build            # Build both packages
npm run build:frontend   # Build frontend only
npm run build:backend    # Build backend only

# Quality
npm run lint             # Lint frontend code
npm run type-check       # Type check backend

# Start
npm start                # Run production backend server
```

## Environment Variables

```env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=password
DB_NAME=ota_dev

# Server
PORT=3001
NODE_ENV=development
JWT_SECRET=your-secret-key

# Cloudflare
CLOUDFLARE_API_TOKEN=your-token
CLOUDFLARE_ACCOUNT_ID=your-account-id
```

## API Endpoints

- `GET /health` - Basic health check
- `GET /api/health` - Database connectivity check
- `POST /api/flights` - Search flights (coming soon)
- `POST /api/hotels` - Search hotels (coming soon)
- `POST /api/tours` - Search tours (coming soon)

## Tech Stack

### Frontend
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- ESLint

### Backend
- Fastify
- Node.js 20
- TypeScript
- PostgreSQL
- JWT Authentication

## CI/CD Pipeline

GitHub Actions automatically:
1. Installs dependencies with `npm ci`
2. Type checks backend code
3. Builds frontend (static export)
4. Builds backend
5. Deploys to Cloudflare (frontend and backend)

Triggered on push to `develop` and `main` branches.

## Notes

- MVP focuses on core infrastructure and deployment pipeline
- Database setup requires PostgreSQL running locally or in Docker
- Redis is not included in MVP (can be added later)
- Cloudflare deployment requires valid API token and account ID in GitHub secrets
