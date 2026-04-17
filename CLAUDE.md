# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

A static HTML dashboard for a camper road trip itinerary (Bergamo → Spain & Andorra, Summer 2026). No build system. Open `index.html` directly in a browser — no server required.

## File structure

- `index.html` — semantic HTML only; no inline styles or scripts
- `styles.css` — all layout, theming, dark mode, and animations
- `app.js` — Leaflet map initialization + dark mode toggle (persisted via `localStorage`)

## Dependencies (CDN)

Leaflet 1.9.4 loaded from `unpkg.com`. Fonts (Syne + DM Sans) from Google Fonts.

## Architecture

**Design tokens** (`styles.css` `:root`):
- `--drive` / `--drive-bg` — transfer days (gold)
- `--rest` / `--rest-bg` — rest days (green)
- `--back` / `--back-bg` — return leg (terracotta)
- `--accent` — accent blue
- `--bg`, `--surface`, `--surface2` — background layers
- `--ink`, `--ink2`, `--ink3` — text hierarchy

**Card variants**: `.card` (drive), `.card.rest`, `.card.return`. Badges: `.badge-drive`, `.badge-rest`, `.badge-back`.

**Dark mode**: toggled by setting `data-theme="dark"` on `<html>`. Token overrides live in the `[data-theme="dark"]` block in `styles.css`. The map tile layer is also swapped (OSM light ↔ CartoDB dark) in `app.js`.

**Animation**: Cards fade up via `@keyframes fadeUp`; stagger delays are hardcoded per `nth-child` (up to 8 cards per grid).

**Map** (`app.js`): `stops[]` array drives both the polyline and markers. Start/end markers use `--back` color; intermediate stops use `--accent`.
