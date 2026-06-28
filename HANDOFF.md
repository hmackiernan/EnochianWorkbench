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
- Owns all state: `selected` (Set<string>), `handleCellClick`, `commitSelectionAsName`, `clearSelection` live here
- Generates a 12×13 mock letter grid (A–Z cycling via charCode arithmetic)
- Passes `letters`, `selected`, and `handleCellClick` (as `onCellClick`) down to `<TabletGrid />`
- Passes `selected`, `commitSelectionAsName` (as `onCommitSelectionAsName`), `clearSelection` (as `onClearSelection`) down to `<ControlPanel />`
- `clearSelection` — calls `setSelected(new Set())` to reset working selection
- `commitSelectionAsName` — stub for now; will save label+selection to `savedNames` state (next step)
- Next: add `savedNames` state (`Map<string, Set<string>>`) and implement `commitSelectionAsName`

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

### `src/ControlPanel.tsx` (new)
- Sibling to TabletGrid, both children of App
- Props: `selected: Set<string>`, `onCommitSelectionAsName: (label: string) => void`, `onClearSelection: () => void`
- Owns one piece of local state: `selectionName` (string) — the text field value
- Renders: text input (controlled), "Save Selection w/ Name" button, "Clear Selection" button
- Commit button: `onClick={() => onCommitSelectionAsName(selectionName)}` — passes local state up via callback
- Clear button: `onClick={onClearSelection}` — passed directly, no wrapper needed (signature already matches)
- `selected` is passed in but not currently used — future use when commit needs to snapshot it

### Key things learned getting here
- JSX uses camelCase event handlers (`onClick` not `onclick`)
- Controlled components: `value={state}` + `onChange` handler
- Why you can't mutate a Set in place and call setState — React does a reference check, so you must create a new Set
- `Array.from({ length: N }, (_, i) => ...)` pattern for generating arrays
- CSS is global regardless of which TSX file imports it — no true component scoping without CSS Modules
- Inline styles in JSX (`style={{ ... }}`) can be conditional; CSS classes can't read state, so conditionality is handled by toggling class names instead
- Lifting state: move useState up to a common ancestor so siblings can share it; pass value and handler back down as props
- Props are one destructured object, not multiple arguments: `function Foo({ a, b, c }: { a: string, b: number, c: () => void })`
- The inline type annotation (`{ a: string, ... }`) is TypeScript only — plain JS doesn't have types
- State flows down via props; events flow back up via callback props (e.g. `onCellClick`)
- Prop names and internal names can differ: `<TabletGrid onCellClick={handleCellClick} />` — `handleCellClick` is the implementation in App, `onCellClick` is the prop name TabletGrid expects. Convention: `on` prefix for callback props.
- If TabletGrid were used in multiple places, each caller would pass a different function but would always use the name `onCellClick` because that's what TabletGrid's signature declares
- Vite's hot reload is unreliable — sometimes needs a manual browser refresh or full server restart
- `import './App.css'` must be in App.tsx or the styles won't load (learned by forgetting it)

## What's NOT done yet (near-term)
- Implement `commitSelectionAsName` in App — needs `savedNames: Map<string, Set<string>>` state and display of saved names
- Proper Enochian letter data (real tablet contents, not mock A–Z)
- Variant switching UI
- Notes attached to saved names
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
