# Deployment Guide - OTA Platform

## Overview

- **Frontend**: Cloudflare Pages (static export)
- **Backend**: Cloudflare Workers (serverless)
- **CI/CD**: GitHub Actions (auto-deploy on push to main)

## Prerequisites

### Cloudflare Setup
1. Cloudflare account (https://dash.cloudflare.com/)
2. API Token with Pages and Workers permissions
3. Account ID from dashboard

### GitHub Setup
1. Repository secrets configured:
   - \CLOUDFLARE_API_TOKEN\ - Your Cloudflare API token
   - \CLOUDFLARE_ACCOUNT_ID\ - Your Cloudflare Account ID

## Adding GitHub Secrets

1. Go to: https://github.com/daonlinetravelagency-code/ota-platform/settings/secrets/actions
2. Add new repository secrets:
   - Name: \CLOUDFLARE_API_TOKEN\
     Value: Your Cloudflare API token (get from https://dash.cloudflare.com/profile/api-tokens)
   - Name: \CLOUDFLARE_ACCOUNT_ID\
     Value: Your Account ID (visible in dashboard URL or profile)

## Frontend Deployment (Cloudflare Pages)

### Manual Deploy
\\\ash
npm install -g wrangler
cd frontend
npm run build
wrangler pages deploy out --project-name=ota-platform
\\\

### Auto Deploy
Push to \main\ branch triggers GitHub Actions:
\\\ash
git push origin main
\\\

## Environment Variables

### Frontend (Cloudflare Pages)
Set in Pages project settings:
- \NEXT_PUBLIC_API_URL\ - Backend API URL (e.g., https://api.ota-platform.com)

### Backend (Cloudflare Workers)
Set in \wrangler.toml\ or via dashboard:
- \DATABASE_URL\ - PostgreSQL connection string
- \REDIS_URL\ - Redis connection string
- \JWT_SECRET\ - JWT signing secret
