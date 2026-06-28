# Enochian Workbench — Session Handoff
_Generated 2026-06-23_

## Project Overview

A reference/annotation tool for the Enochian magical system of John Dee and Edward Kelley. Built with React 19 + TypeScript + Vite (scaffolded via `npm create vite@latest -- --template react-ts`). No backend, no database yet — deliberate. H is doing a bottom-up learning sequence: React fundamentals first, then Express, then SQLite → PostgreSQL.

## Intended Feature Set (eventual)

- Display the four Watchtower tablets (12×13 letter grids) and the Tablet of Union (4×5) as interactive clickable tables
- Support multiple historical variants: Dee original, Tabula Recensa, Casaubon's "Corrected"
- Allow non-contiguous cell selection to compose angelic names, with user-attached notes
- Cross-reference known entities against reference sources

## Current Code State

### `src/App.tsx`
- Generates a 12×13 mock letter grid (A–Z cycling via charCode arithmetic)
- Passes it to `<TabletGrid />` as the `letters` prop
- Previous toy examples (counter, text input) are gone — stripped as we moved on

### `src/TabletGrid.tsx`
- Accepts `{ letters: string[][] }` as props
- Renders rows as flexbox `<div>` rows, cells as individual `<div>`s
- Tracks selected cells in `useState<Set<string>>` — keys are `"row-col"` strings (e.g. `"0-3"`)
- Click handler toggles membership in the Set using the functional updater pattern (`setSelected(prev => ...)`) — important because Set mutations need a new reference to trigger a re-render
- Selected cells render with `backgroundColor: 'yellow'`; unselected are transparent
- Border: `1px solid white` on each cell

### Key things learned getting here
- JSX uses camelCase event handlers (`onClick` not `onclick`)
- Controlled components: `value={state}` + `onChange` handler
- Why you can't mutate a Set in place and call setState — React does a reference check, so you must create a new Set
- `Array.from({ length: N }, (_, i) => ...)` pattern for generating arrays

## What's NOT done yet (near-term)
- Proper Enochian letter data (real tablet contents, not mock A–Z)
- Variant switching UI
- Name/selection recording with notes
- Any backend (Express + SQLite planned)
- Testing (Jest + Playwright — expected to be H's strongest area once tooling syntax is learned)
- Auth (Auth0, later)
- Deployment (Render or Railway, later)

## About H
- 19-year SDET at Perforce, strong in Perl and test automation
- Learning the PERN stack from scratch — React/JS/TS are all new
- Prefers direct corrections over diplomatic softening
- Learns by doing manual steps before abstractions are introduced
- No Git/Perforce analogies needed (knows git fine)
- Frequently trips over plain JavaScript fundamentals (not React-specific) — when something looks confusing, check if it's a JS basics issue first
- Working through The Odin Project out of band, slowly and intermittently, to build JS foundations in parallel
