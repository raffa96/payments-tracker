# 0002. Write TypeScript run natively by Node.js

- Status: Accepted
- Date: 2026-10-27

## Context

TypeScript catches a whole class of mistakes before they reach users, which
matters for an application that handles money. It usually requires a build step
(`tsc`, esbuild) or a runtime loader (`tsx`, `ts-node`), adding tools and
configuration.

Node.js 24 can run `.ts` files directly by stripping their type annotations,
provided that only erasable syntax is used.

## Decision

- Source code and tests are written in TypeScript and run directly by Node.js,
  in development and in production. There is no build step.
- The TypeScript compiler is used only as a type checker (`tsc --noEmit`), with
  strict options and `erasableSyntaxOnly` and `verbatimModuleSyntax` enabled.
- TypeScript is pinned to the 6.0 line, because typescript-eslint
  ([ADR 0006](0006-eslint-prettier.md)) does not support TypeScript 7 yet.

## Consequences

- No `dist/` folder, no source maps, no loader: the code that runs is the code
  that was written.
- `enum`, `namespace` and constructor parameter properties are not allowed;
  `as const` objects and string literal unions replace them.
- Relative imports must include the `.ts` extension.
- The ESLint configuration stays a JavaScript file, because a TypeScript one
  would require an extra loader dependency.
- Moving to TypeScript 7 will be a dedicated change once the tooling supports it.
