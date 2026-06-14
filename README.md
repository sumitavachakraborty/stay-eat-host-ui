# se-host-frontend

stay and eat **host** web app — the dashboard and listing management experience for stay and eat homestay hosts.

Built with Vite + React 18. Runs on port **3002**.

---

## Stack

| Layer | Choice |
|---|---|
| Bundler | Vite 5 |
| UI | React 18 (functional + hooks) |
| Routing | react-router-dom v6 |
| Styling | Plain CSS via `src/styles/tokens.css` (design-system tokens) |
| Icons | Custom thin-line SVG (`src/components/Icon.jsx`) |
| Data | REST API with static fallback (`src/lib/api.js` + `src/lib/fallbackData.js`) |

---

## Getting started

```bash
npm install
npm run dev        # → http://localhost:3002
npm run build      # production build into dist/
npm run preview    # preview production build on :3002
```

---

## Environment variables

Copy `.env.example` to `.env` and adjust:

```env
VITE_API_URL=http://localhost:3001/api/v1
VITE_TRAVELLER_APP_URL=http://localhost:3000
```

| Variable | Default | Purpose |
|---|---|---|
| `VITE_API_URL` | `http://localhost:3001/api/v1` | Backend REST API base URL |
| `VITE_TRAVELLER_APP_URL` | `http://localhost:3000` | URL of the traveller web app for the mode toggle |

---

## Routes

| Path | Component | Description |
|---|---|---|
| `/` | `HostDashboard` | "Today" view — greeting, stat cards, quality-check queue, listings grid, rewards rail |
| `/quality-check/:id?` | `QualityCheck` | Room-by-room photo submission checklist before guest check-in |
| `/new-listing` | `NewListing` | "Host a place" multi-field form — publishes to `POST /host/listings` |
| `*` | — | Redirects to `/` |

---

## Host / Traveller toggle

The header contains a pill segmented toggle with **Traveller** and **Host** labels. **Host** is always active in this app.

Clicking **Traveller** redirects the browser to `VITE_TRAVELLER_APP_URL` (default `http://localhost:3000`). This links the two sibling SPAs together without requiring an iframe or shared bundle.

---

## Dashboard analytics

The dashboard (`/`) shows four stat cards pulled from `GET /host/analytics`:

- **Confirmed bookings** — total upcoming confirmed stays + weekly delta
- **Quality Checks pending** — count of open QC submissions + next due time
- **Avg approval time** — median approval time + regional rank
- **March payout** — current payout total + pay date

If the API is unavailable or the user has no token, all four cards fall back to bundled static values from `src/lib/fallbackData.js` — the UI always renders.

The **Rewards rail** (right column) shows stay and eat points earned, tier progression (Verified / Verified+ / Sustainer / stay and eat Circle), and the most recent guest review. Same resilience pattern.

---

## Quality Check flow

Route: `/quality-check/:id`

The host uploads fresh room photos before each guest check-in. The page shows:

1. A submission progress band (near-black, coral progress bar, "Submit to {guest}" button)
2. A room-by-room checklist — each card has a photo thumbnail, status chip (Verified / Pending / To do), coral/green progress bar, and Upload / Add more button
3. A sticky side panel with the guest preview thumbnail grid, a deep-green Verified+ reward card, and photo guidance tips

Rooms data is fetched from `GET /host/quality-checks/:id`; falls back to `FALLBACK_ROOMS`.

---

## New listing flow

Route: `/new-listing`

Fields:
- Listing name, location, short description
- Property type chips (from `CATEGORIES`)
- Price per night
- Bedrooms / Beds / Bathrooms counters
- Photo URL inputs (add / remove rows)

On submit: `POST /host/listings` with `Authorization: Bearer <token>` from `localStorage.getItem('se_token')`.

On success → navigate to `/`. If the API is unreachable (no backend during dev), the form still navigates home so the demo flow works.

---

## Design tokens

All design decisions are in `src/styles/tokens.css` — ported verbatim from the stay and eat design system:

- Colors: `--c-coral`, `--c-near-black`, `--c-deep-green`, `--c-pale-green`, etc.
- Typography: Space Grotesk (display), DM Sans (body), JetBrains Mono (mono labels)
- Radius: `--r-xs` through `--r-pill`
- Utility classes: `.btn-primary`, `.btn-primary.invert`, `.btn-primary.coral`, `.pill-outline`, `.chip-coral`, `.status.live/pending/draft`, `.mono`, `.display`, `.fade-up`, `.fade-in`

---

## Docker

```bash
# Build
docker build \
  --build-arg VITE_API_URL=https://api.yourdomain.com/api/v1 \
  --build-arg VITE_TRAVELLER_APP_URL=https://yourdomain.com \
  -t se-host-frontend .

# Run
docker run -p 8080:80 se-host-frontend
```

The Dockerfile is multi-stage: Node 20 Alpine builds the Vite bundle, then Nginx Alpine serves it with SPA fallback routing and aggressive asset caching.
