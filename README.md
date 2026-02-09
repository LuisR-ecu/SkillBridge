# SkillBridge AI Application

Next.js application for internal talent mobility analysis.  
The app evaluates an employee profile and generates:
- role recommendations
- skill gaps
- phased upskilling plans
- governance notes

## Tech Stack
- Next.js 16 (App Router)
- React 19
- TypeScript
- AI SDK (`ai`) + OpenAI provider (`@ai-sdk/openai`)

## Prerequisites
- Node.js 22+
- npm 10+
- Docker Desktop (optional, for containerized run)

## Environment Variables
Create `.env.local` in the project root:

```env
OPENAI_API_KEY=your_openai_api_key
```

## Run Locally
```bash
npm install --legacy-peer-deps
npm run dev
```

Open `http://localhost:3000`.

## Run with Docker
This project includes:
- `Dockerfile` (multi-stage production build)
- `docker-compose.yml`
- `.dockerignore`

### Option A: export key from `.env.local`
```bash
set -a
source .env.local
set +a
docker compose up --build
```

### Option B: pass key inline
```bash
OPENAI_API_KEY=your_openai_api_key docker compose up --build
```

Open `http://localhost:3000`.

Stop containers:
```bash
docker compose down
```

## Useful Scripts
```bash
npm run dev      # start local dev server
npm run build    # production build
npm run start    # run production server
```

## Troubleshooting

### `npm install` fails with `ERESOLVE`
Use:
```bash
npm install --legacy-peer-deps
```

### `No object generated: response did not match schema`
This project already adds schema normalization/coercion in `app/actions/analyze.ts` to reduce model output mismatch errors.  
If this still appears, restart the app and retry:
```bash
npm run dev
```

### Docker build fails fetching Google Fonts
Unused `next/font/google` imports were removed from `app/layout.tsx`, so builds should no longer require font fetches.

## Security Notes
- Never commit `.env.local` or API keys.
- Rotate keys immediately if they were exposed.
- `.gitignore` is configured to ignore env files and common secret/cert file types.
