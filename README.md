# OTA Platform - Online Travel Agency

Israeli tourists → Georgia & beyond

## Quick Start

### Prerequisites
- Docker & Docker Compose
- Node.js 20+ (for local development)
- Git

### Run POC

```bash
# Start everything
npm run dev

# Backend: http://localhost:3001
# Frontend: http://localhost:3000
```

### Stop

```bash
npm run down
```

### Reset Database

```bash
npm run down-volumes
npm run dev
```

## Logs

```bash
npm run logs              # All logs
npm run logs:backend      # Backend only
npm run logs:frontend     # Frontend only
```

## Tech Stack

- **Backend**: Node.js 20 + TypeScript + Fastify
- **Frontend**: Next.js 14 + React 18
- **Database**: PostgreSQL 15
- **Cache**: Redis 7
- **Containerization**: Docker Compose

## Project Structure

```
ota-platform/
├── backend/
│   ├── src/
│   │   ├── index.ts
│   │   ├── routes/
│   │   ├── services/
│   │   ├── db/
│   │   └── types/
│   ├── package.json
│   ├── tsconfig.json
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   └── app/
│   ├── package.json
│   ├── tsconfig.json
│   └── Dockerfile
├── docker-compose.yml
├── package.json
├── .gitignore
└── README.md
```

## API Endpoints (POC)

- `GET /health` - Server health
- `GET /api/test` - Test endpoint
- `POST /api/auth/register` - Register user (coming soon)
- `POST /api/search/flights` - Search flights (coming soon)

## Environment Variables

Backend uses environment variables from `docker-compose.yml`:
- `DATABASE_URL` - PostgreSQL connection
- `REDIS_URL` - Redis connection
- `JWT_SECRET` - JWT signing key
- `DUFFEL_API_KEY` - Duffel API key
- `STRIPE_SECRET_KEY` - Stripe secret key

## Team

- **Backend**: Dmitriy (Architecture + Integrations)
- **Frontend**: TBD (UI + Forms)

## Next Steps

1. ✅ POC running locally
2. ⏳ User authentication
3. ⏳ Flight search integration
4. ⏳ Booking flow
5. ⏳ Payment integration
6. ⏳ Production deployment

## Notes

This is a POC (Proof of Concept) phase. AWS deployment will be implemented during MVP phase.

## CI/CD Pipeline
Automated deployment to Cloudflare Pages & Workers configured.
