# AGENTS.md — screenlink-web

## Project

`screenlink-web` is the responsive web dashboard for ScreenLink.

It is used from phone, tablet, or desktop to pair Google TV devices, manage screens, send commands, and control what appears on `screenlink-tv`.

Related repositories:

- `screenlink-api`: NestJS backend.
- `screenlink-tv`: Android/Google TV receiver.
- `screenlink-web`: Next.js dashboard.

## Core Stack

- Next.js App Router
- TypeScript
- React
- Tailwind CSS
- shadcn/ui where useful
- Clerk for authentication
- TanStack Query
- React Hook Form
- Zod
- Typed fetch wrapper or Axios
- Motion / Framer Motion for tasteful animations
- Lucide React for icons
- ESLint
- Prettier
- Jest or Vitest

## Product Direction

This is a modern app-like dashboard, not a generic admin panel.

The UI should feel:

- premium
- modern
- mobile-first
- polished on desktop
- simple but visually strong
- suitable to later become a mobile app

Prefer:

- dark-first interface
- subtle gradients
- polished cards
- soft borders
- smooth shadows
- status badges
- skeleton loaders
- animated success/error states
- large touch targets
- bottom navigation on mobile
- sidebar or elegant app shell on desktop
- tasteful micro-interactions

Avoid:

- generic admin templates
- boring tables as the main UI
- plain unstyled forms
- excessive animation
- cluttered layouts
- desktop-only assumptions

Respect reduced-motion preferences where practical.

## General Engineering Principles

- Follow SOLID and Clean Code practices.
- Prefer clarity over cleverness.
- Keep changes focused and minimal.
- Do not refactor unrelated code while implementing a ticket.
- Avoid duplicated logic.
- Extract shared logic into reusable utilities, services, hooks, or components.
- Prefer small, readable files over large multipurpose files.
- Keep functions short and focused.
- Use meaningful names.
- Avoid hidden side effects.
- Validate inputs at the boundary.
- Preserve existing behavior unless the ticket explicitly changes it.
- Return clear, user-safe errors.

## TypeScript Standards

- Use strict TypeScript.
- Avoid `any` unless there is no reasonable alternative and the reason is documented.
- Prefer explicit interfaces/types for API contracts.
- Do not define reusable interfaces/types inside pages, components, hooks, or services.
- Frontend types should live in a `types` folder or a `*.types.ts` file.
- Do not leave large inline object types in method signatures.
- API request and response contracts must be explicit.

## Next.js Standards

- Use App Router only.
- Follow current Next.js best practices.
- Prefer Server Components where appropriate.
- Use Client Components for interactivity, browser APIs, forms, and client-side hooks.
- Keep pages thin.
- Pages should compose components and delegate logic.
- Do not put business logic directly in pages.
- Extract reusable UI into components.
- Extract reusable data/formatting logic into hooks, services, or utilities.
- Do not access browser-only APIs in Server Components.
- Keep API calls centralized.
- Use loading, empty, error, and success states consistently.
- Build responsive UI by default.

## Required Folder Style

Use this structure:

```txt
src/
  app/
    (auth)/
      sign-in/
      sign-up/
    (dashboard)/
      dashboard/
      screens/
      media/
      playlists/
      settings/
      pair/
  components/
    ui/
    layout/
    forms/
    feedback/
    status/
  features/
    auth/
      components/
      hooks/
      services/
      types/
    pairing/
      components/
      hooks/
      services/
      schemas/
      types/
    screens/
      components/
      hooks/
      services/
      schemas/
      types/
      utils/
    commands/
      components/
      hooks/
      services/
      schemas/
      types/
    media/
      components/
      hooks/
      services/
      schemas/
      types/
    playlists/
      components/
      hooks/
      services/
      schemas/
      types/
  lib/
    api/
    auth/
    config/
    query/
    utils/
  styles/
```

Prefer folders even when there is only one file today.

## Auth Rules

Use Clerk for human authentication.

- Use Clerk's current recommended Next.js App Router integration.
- Protect dashboard routes with middleware.
- Public routes:
  - `/sign-in`
  - `/sign-up`
- Protected routes:
  - `/dashboard`
  - `/screens`
  - `/screens/[screenId]`
  - `/pair`
  - `/media`
  - `/playlists`
  - `/settings`
- Do not implement password auth manually.
- Do not store Clerk tokens manually in localStorage.
- Do not expose sensitive auth data in logs.

The backend expects:

```txt
Authorization: Bearer <Clerk JWT>
```

Keep Clerk-specific logic isolated under:

- `features/auth`
- `lib/auth`

## API Client Rules

Create one reusable typed API client.

It must:

- Read API base URL from `NEXT_PUBLIC_API_BASE_URL`.
- Attach Clerk bearer token for authenticated requests.
- Normalize API errors.
- Avoid duplicating fetch/axios logic.
- Use explicit request/response types.
- Be used by feature services/hooks.

Use:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
```

Do not expose server-only secrets as `NEXT_PUBLIC_*`.

## Security Rules

- Always use latest stable packages and current secure patterns.
- Never hardcode secrets.
- Do not expose server-only env vars to the browser.
- Validate all forms with Zod.
- Sanitize and validate user-provided URLs before sending commands.
- Only allow valid `http` or `https` URLs for media command inputs.
- Avoid `dangerouslySetInnerHTML`.
- Do not log bearer tokens.
- Do not log full sensitive API responses.
- Do not leak internal errors to users.
- Add basic security headers where appropriate.
- Avoid packages with known security concerns when reasonable alternatives exist.

## Styling and UI Standards

- Use Tailwind and reusable UI primitives.
- Use shadcn/ui where it speeds up consistency.
- Avoid layout overflow on small screens.
- Ensure text, buttons, and cards wrap, stack, or truncate elegantly.
- Use accessible button/link semantics.
- Make clickable items visually clear.
- Avoid nested interactive elements.
- Use visible focus states.
- Do not rely only on color for status.
- Keep contrast readable.

## Backend Contract

### Pairing

```txt
POST /pairing/confirm
Body:
{
  "code": "123456"
}

Response:
{
  "screenId": "..."
}
```

### Screens

```txt
GET /screens
POST /screens/:screenId/commands
```

### Commands

Supported command types:

- DISPLAY_IMAGE
- DISPLAY_VIDEO
- PLAY_PLAYLIST
- CLEAR_SCREEN
- SYNC_CONTENT
- PING

Example:

```json
{
  "type": "DISPLAY_IMAGE",
  "payload": {
    "url": "https://example.com/image.jpg"
  }
}
```

## Feature Requirements

### Pairing

- Page: `/pair`
- Six-digit code form.
- Prefer polished OTP-style input.
- Validate with Zod.
- Show success animation/state.
- Show clear invalid/expired code error.
- Link to screen detail or screens list after success.

### Screens

- Page: `/screens`
- Screen detail: `/screens/[screenId]`
- Show screens as modern cards.
- Display:
  - name
  - deviceName
  - deviceModel
  - platform
  - status
  - lastSeenAt
- Use status badges:
  - online
  - offline
  - idle
  - playing
  - syncing
  - error

### Commands

On screen detail page, support:

- PING
- CLEAR_SCREEN
- DISPLAY_IMAGE by URL
- DISPLAY_VIDEO by URL

Use Zod validation for URL commands.

### Dashboard

- Page: `/dashboard`
- Summary cards:
  - Total screens
  - Online screens
  - Offline screens
- Recent screens section.
- Quick “Pair a TV” call-to-action.

### Media and Playlists

MVP can use polished placeholder pages.
Do not implement real uploads yet unless explicitly requested.

## Quality Rules

- Strict TypeScript.
- Avoid `any`.
- Use typed API responses.
- Use Zod for forms.
- Use TanStack Query for server state.
- Keep pages thin.
- Put feature logic in hooks/services.
- Keep components small and reusable.
- Add tests for:
  - pairing code validation
  - URL validation
  - API error normalization
  - command payload builders
- Run lint, tests, and build before reporting done.

## Documentation and Communication

After implementation:

- Summarize changed files.
- Explain behavior changes.
- Mention assumptions, limitations, and follow-up tasks.
- Document required env vars and validation commands.

For infrastructure work, document:

- services created/updated
- branch triggers
- required env vars/secrets
- deployment commands
- validation commands
- rollback strategy

When asked for Jira tickets, write them in English.

## Forbidden / Avoid

- Do not use lodash for new code unless explicitly justified.
- Do not use Moment.js. Use native Date APIs or Luxon only if already used.
- Do not add business logic to frontend pages.
- Do not create broad refactors for narrow tickets.
- Do not silently change authentication, authorization, payment, or deployment behavior.
- Do not expose secrets in logs or documentation.
- Do not create duplicate components/pages/services for nearly identical concepts.

## First MVP

The first MVP is complete when:

1. User can sign in with Clerk.
2. User can access protected dashboard.
3. User can enter the TV pairing code.
4. Web calls `POST /pairing/confirm`.
5. TV receives the device token through polling.
6. Web shows the paired screen.
7. User can send PING.
8. User can send CLEAR_SCREEN.
9. User can send DISPLAY_IMAGE with a URL.
10. User can send DISPLAY_VIDEO with a URL.
11. Errors are shown clearly.
12. App works beautifully on mobile width.
13. App looks polished on desktop.
14. UI does not look like a generic admin template.
15. Lint, tests, and build pass.
