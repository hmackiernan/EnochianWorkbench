# Enochian Workbench — Session Handoff
_Updated 2026-06-28_

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
- Selected cells get class `tablet-cell tablet-cell-selected`; unselected just `tablet-cell`
- className is a conditional expression: `selected.has(`${r}-${c}`) ? "tablet-cell tablet-cell-selected" : "tablet-cell"`

### `src/App.css`
- Styles live here (imported in App.tsx)
- `.tablet-row` — `display: flex` (makes cells go horizontal)
- `.tablet-cell` — `width: 2rem; height: 2rem; border: 1px solid white`
- `.tablet-cell-selected` — `background-color: yellow`

### Key things learned getting here
- JSX uses camelCase event handlers (`onClick` not `onclick`)
- Controlled components: `value={state}` + `onChange` handler
- Why you can't mutate a Set in place and call setState — React does a reference check, so you must create a new Set
- `Array.from({ length: N }, (_, i) => ...)` pattern for generating arrays
- CSS is global regardless of which TSX file imports it — no true component scoping without CSS Modules
- Inline styles in JSX (`style={{ ... }}`) can be conditional; CSS classes can't read state, so conditionality is handled by toggling class names instead
- Vite's hot reload is unreliable — sometimes needs a manual browser refresh or full server restart
- `import './App.css'` must be in App.tsx or the styles won't load (learned by forgetting it)

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
