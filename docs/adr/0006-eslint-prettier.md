# 0006. Lint with typescript-eslint, format with Prettier

- Status: Accepted
- Date: 2026-10-27

## Context

An open project needs consistent, clean code regardless of who writes it, and
code reviews should focus on behaviour rather than style.

Biome was considered as a single, lighter tool, but its type-aware rules are not
yet as complete as those of typescript-eslint.

## Decision

- **ESLint** with the `strictTypeChecked` and `stylisticTypeChecked` rule sets of
  **typescript-eslint**, which use type information to find bugs such as
  unhandled promises, unsafe `any` and always-true conditions.
- **Prettier** for formatting, with single quotes and a 100-character line width.
- No Git hooks for now: the CI runs every check on every pull request, and a
  failing pull request cannot be merged.

## Consequences

- Linting and formatting tools are development dependencies only; they are not
  installed in production (`npm ci --omit=dev`).
- typescript-eslint dictates the supported TypeScript version
  (see [ADR 0002](0002-typescript-native-type-stripping.md)).
- Contributors get feedback from the CI rather than at commit time; Git hooks
  can be added later if this proves inconvenient.
