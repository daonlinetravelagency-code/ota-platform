# FRONTEND FILES - Копируй в packages/frontend/

## 1. packages/frontend/package.json
```json
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
```

## 2. packages/frontend/tsconfig.json
```json
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
```

## 3. packages/frontend/next.config.js
```javascript
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
```

## 4. packages/frontend/tailwind.config.ts
```typescript
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
```

## 5. packages/frontend/postcss.config.js
```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

## 6. packages/frontend/.eslintrc.json
```json
{
  "extends": ["next/core-web-vitals"]
}
```

## 7. packages/frontend/app/layout.tsx
```typescript
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
```

## 8. packages/frontend/app/page.tsx
```typescript
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
```

## 9. packages/frontend/app/globals.css
```css
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
```
