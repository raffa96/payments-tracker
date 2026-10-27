# 0005. Test with the Node.js test runner

- Status: Accepted
- Date: 2026-10-27

## Context

The project needs unit tests, HTTP tests and coverage, with as few dependencies
as possible. Vitest and Jest are popular, but they bring large dependency trees,
and Jest needs extra configuration for ES modules and TypeScript.

## Decision

- Tests use `node:test` and `node:assert/strict`, built into Node.js.
- HTTP tests start the real application on a random port and call it with the
  built-in `fetch`, instead of using supertest.
- Coverage uses the built-in coverage of the test runner, with minimum
  thresholds for lines, branches and functions enforced in CI.

## Consequences

- Zero test dependencies, and TypeScript test files run without configuration.
- The coverage feature of the test runner is still marked as experimental in
  Node.js; if it changes, only the `test:coverage` script is affected.
- The built-in runner has fewer conveniences (e.g. snapshot tooling) than
  dedicated frameworks.
