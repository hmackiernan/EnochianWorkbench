# Enochian Workbench

A reference/annotation tool for the Enochian magical system of John Dee and Edward Kelley.

## Stack

React 19 + TypeScript + Vite (scaffolded via `npm create vite@latest -- --template react-ts`). No backend yet — deliberate.

## About H

19-year SDET at Perforce, expert in Perl and test automation. Learning the PERN stack from scratch — React, JS, and TypeScript are all new.

- Give direct corrections, no diplomatic softening
- Introduce manual/concrete steps before abstractions — don't suggest a helper or generalized pattern until H has done it by hand and understands why
- No need for Git/Perforce analogies

## Learning sequence

React fundamentals → Express → SQLite → PostgreSQL. Don't skip ahead or introduce backend concepts until we're there.

## Intended features (eventual)

- Four Watchtower tablets (12×13) and Tablet of Union (4×5) as interactive clickable grids
- Multiple historical variants: Dee original, Tabula Recensa, Casaubon's "Corrected"
- Non-contiguous cell selection to compose angelic names, with user-attached notes
- Cross-reference known entities against reference sources

## Not yet done

- Real Enochian letter data (currently mock A–Z)
- Variant switching UI
- Name/selection recording with notes
- Backend (Express + SQLite planned)
- Auth (Auth0, later)
- Deployment (Render or Railway, later)
- Testing (Jest + Playwright — later, expected to be H's strongest area)
