# Development guide

This guide covers the day-to-day workflow for working on payments-tracker. For
the contribution process (branches, commits, pull requests) see
[CONTRIBUTING.md](../CONTRIBUTING.md).

## Prerequisites

- Node.js 24 or later. If you use a version manager, `nvm use` picks the right
  version from [`.nvmrc`](../.nvmrc).
- An editor with [EditorConfig](https://editorconfig.org/), ESLint and Prettier
  support is recommended.

## Running the application

```sh
npm ci        # install the exact dependency versions from package-lock.json
npm run dev   # start the server and restart it on every change
```

`npm run dev` uses the watch mode built into Node.js: no extra tool is needed.

## How TypeScript is used

Node.js runs the `.ts` files directly by stripping their type annotations, so
there is **no build step** and no `dist/` folder: the code you write is the code
that runs, in development and in production alike.

The TypeScript compiler is therefore used only as a type checker
(`npm run typecheck`). Its configuration ([`tsconfig.json`](../tsconfig.json))
enables strict checks and forbids the syntax that Node.js cannot strip
(`enum`, `namespace`, constructor parameter properties).

> TypeScript is pinned to the 6.0 line because typescript-eslint does not
> support TypeScript 7 yet. Dependabot is configured not to propose the major
> upgrade until then.

## Quality checks

| Command                 | What it checks                                      |
| ----------------------- | --------------------------------------------------- |
| `npm run format:check`  | Formatting (Prettier).                              |
| `npm run lint`          | Code quality and common bugs (ESLint, type-aware).  |
| `npm run typecheck`     | Types (TypeScript compiler).                        |
| `npm run test:coverage` | Tests, and coverage of `src/` above the thresholds. |
| `npm run check`         | All of the above, in this order, like the CI.       |

Run `npm run format` and `npm run lint:fix` to fix most issues automatically.

## Writing tests

Tests use the test runner and assertion library built into Node.js:

```ts
import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
```

HTTP tests start the real application on a random port with
`startTestServer()` from [`test/helpers/http.ts`](../test/helpers/http.ts) and
call it with the built-in `fetch`, exactly as a browser would:

```ts
const server = await startTestServer(createApp());
const response = await fetch(`${server.baseUrl}/health`);
await server.close();
```

Coverage is measured on `src/`, except for the `server.ts` entry point, which
only wires the modules together. The minimum thresholds (lines, branches and
functions) are set in the `test:coverage` script in `package.json`.

## Continuous integration

Every push to `master` or `develop` and every pull request runs
`.github/workflows/ci.yml`, which installs the dependencies with `npm ci` and
runs the same checks as `npm run check`. A pull request cannot be merged until
the workflow passes.

Dependabot opens weekly pull requests against `develop` to update the npm
dependencies and the GitHub Actions.
