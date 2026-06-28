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
- Owns all state: `selected` (Set<string>) and `handleCellClick` live here
- Generates a 12×13 mock letter grid (A–Z cycling via charCode arithmetic)
- Passes `letters`, `selected`, and `handleCellClick` (as `onCellClick`) down to `<TabletGrid />`
- State was deliberately lifted here from TabletGrid so App can eventually use the selection (e.g. display selected letters)

### `src/TabletGrid.tsx`
- Accepts `{ letters, selected, onCellClick }` as props — it owns NO state of its own
- Props: `letters: string[][]`, `selected: Set<string>`, `onCellClick: (r: number, c: number) => void`
- Renders rows as flexbox `<div>` rows, cells as individual `<div>`s
- Selected cells get class `tablet-cell tablet-cell-selected`; unselected just `tablet-cell`
- className is a conditional expression: `selected.has(`${r}-${c}`) ? "tablet-cell tablet-cell-selected" : "tablet-cell"`
- onClick calls `onCellClick(r, c)` — the handler lives in App, not here

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
- Lifting state: move useState up to a common ancestor so siblings can share it; pass value and handler back down as props
- Props are one destructured object, not multiple arguments: `function Foo({ a, b, c }: { a: string, b: number, c: () => void })`
- State flows down via props; events flow back up via callback props (e.g. `onCellClick`)
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
