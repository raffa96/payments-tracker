# Architecture

This document describes how payments-tracker is built and the principles that
guide its design. The reasoning behind each choice is recorded in the
[architecture decision records](adr/README.md).

## Goals and constraints

- **Self-hosted and personal.** Each installation is a private instance run by a
  single manager, on a personal computer or on their own server. An admin may
  add other users, but there is no multi-tenancy.
- **Simple to run.** No external services: Node.js and a single database file
  are all an instance needs.
- **Lightweight.** Every dependency must earn its place; the Node.js standard
  library is preferred whenever it does the job.
- **Correct with money.** Amounts are stored and computed as integer cents, and
  subscription prices are kept as a history so that a price change never
  rewrites the past.

## Stack

| Concern              | Choice                                                          |
| -------------------- | --------------------------------------------------------------- |
| Runtime              | Node.js 24+, running TypeScript natively (type stripping)       |
| Web framework        | Express 5                                                       |
| User interface       | Server-rendered HTML pages (Eta templates), no client framework |
| Database             | SQLite through better-sqlite3, plain SQL, in-house migrations   |
| Validation           | zod, at every boundary (environment, forms)                     |
| Security headers     | helmet                                                          |
| Tests                | `node:test`, built-in `fetch`, built-in coverage                |
| Linting / formatting | ESLint with typescript-eslint (strict, type-aware), Prettier    |

Dependencies are added only when the feature that needs them is implemented: the
templates engine and the database driver are not installed yet.

## Project structure

```text
src/
  app.ts        Builds the Express application (does not start it).
  config.ts     Reads and validates the configuration from the environment.
  server.ts     Entry point: loads the configuration and starts the server.
test/
  helpers/      Shared test utilities.
  *.test.ts     Test suites, mirroring the structure of src/.
docs/           Project documentation.
```

### Application and server are separate

`createApp()` only _builds_ the application; `server.ts` is the only module with
side effects (reading the environment, opening a port, handling signals). This
keeps every other module importable and testable in isolation: tests start the
real application on a random port and talk to it over HTTP.

### Configuration

All configuration comes from environment variables, optionally loaded from a
`.env` file by Node.js itself (`--env-file-if-exists`). Variables are validated
when the application starts, so an invalid value stops it immediately with a
clear message instead of causing errors later.

### Graceful shutdown

On `SIGINT` and `SIGTERM` the server stops accepting new connections and lets
the pending requests complete before the process exits.
