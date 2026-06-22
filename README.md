# ScreenLink Web

Responsive Next.js control dashboard for ScreenLink, a Google TV digital signage system. This repository authenticates human operators, pairs TVs, displays fleet status, and sends commands to `screenlink-api`. Playback remains the responsibility of `screenlink-tv`.

## Requirements

- Node.js 20.9 or newer (Node.js 22 LTS recommended)
- A Clerk application
- `screenlink-api` running locally or at a reachable URL

## Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3001`. Configure the following values in `.env.local`:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

`CLERK_SECRET_KEY` is server-only. Never prefix it with `NEXT_PUBLIC_` or commit `.env.local`.

## Clerk Setup

1. Create or select a Clerk application.
2. Copy the publishable and secret keys into `.env.local`.
3. Add `http://localhost:3000` as an allowed development origin if your Clerk instance requires it.
4. Configure the desired sign-in methods in Clerk.

The Next.js 16 `src/proxy.ts` file protects `/dashboard`, `/screens`, `/pair`, `/media`, `/playlists`, and `/settings`. `/sign-in` and `/sign-up` remain public. Client API requests obtain the current Clerk session token at request time and send it to `screenlink-api` as `Authorization: Bearer <token>`. Tokens are never stored in local storage or logged.

## API Connection

`NEXT_PUBLIC_API_BASE_URL` must point to `screenlink-api`. The backend must allow the dashboard origin through CORS and validate Clerk session JWTs. The MVP uses:

- `POST /pairing/confirm`
- `GET /screens`
- `GET /screens/:screenId`
- `POST /screens/:screenId/commands`

The screen detail endpoint is assumed to return the same screen shape used by `GET /screens`. If the backend only supports the list endpoint, add `GET /screens/:screenId` to `screenlink-api` or adapt `screens.service.ts` to select from the list response.

## MVP Flow

1. Sign in through Clerk.
2. Pair a Google TV using its six-digit code.
3. Open the paired screen control center.
4. Send `PING`, `CLEAR_SCREEN`, `DISPLAY_IMAGE`, or `DISPLAY_VIDEO`.
5. For media commands, only valid `http` and `https` URLs are accepted.

Media uploads and playlists are polished placeholders and intentionally do not implement cloud storage yet. TV token polling and playback occur in `screenlink-api` and `screenlink-tv`, not this dashboard.

## Quality Commands

```bash
npm run lint
npm test
npm run format:check
npm run build
```

The focused test suite covers pairing validation, URL security validation, API error normalization, and command payload builders.
