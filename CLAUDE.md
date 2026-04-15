# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

A single-file static HTML dashboard for a camper road trip itinerary (Bergamo → Spain & Andorra, Summer 2025). No build system, no dependencies, no JavaScript.

## Development

Open `index.html` directly in a browser — no server required.

## Architecture

Everything lives in `index.html`: CSS custom properties (`:root` variables) define the color palette and radii, inline `<style>` handles all layout and theming, and the body contains pure semantic HTML sections.

**Design tokens (CSS variables):**
- `--drive` / `--drive-bg` — transfer/driving days (gold)
- `--rest` / `--rest-bg` — rest days (green)
- `--back` / `--back-bg` — return leg (terracotta)
- `--accent` — accent blue
- `--bg`, `--surface`, `--surface2` — background layers
- `--ink`, `--ink2`, `--ink3` — text hierarchy

**Card variants** are set via CSS classes: `.card` (default drive), `.card.rest`, `.card.return`. Badge style follows the same pattern: `.badge-drive`, `.badge-rest`, `.badge-back`.

**Fonts:** Syne (headings/labels, `font-family: 'Syne'`) and DM Sans (body). Both loaded from Google Fonts.

**Animation:** Cards fade up on load via `@keyframes fadeUp`; stagger delay is applied per `nth-child` selector (currently wired for 8 cards per grid).
