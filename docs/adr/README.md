# Architecture decision records

An architecture decision record (ADR) captures an important decision, its
context and its consequences. ADRs are never rewritten: when a decision changes,
a new ADR supersedes the old one, so the history of the project's reasoning is
preserved.

| ADR                                              | Title                                             | Status   |
| ------------------------------------------------ | ------------------------------------------------- | -------- |
| [0001](0001-license-agpl.md)                     | License the project under AGPL-3.0-or-later       | Accepted |
| [0002](0002-typescript-native-type-stripping.md) | Write TypeScript run natively by Node.js          | Accepted |
| [0003](0003-server-rendered-ui.md)               | Server-rendered user interface with Eta           | Accepted |
| [0004](0004-sqlite-better-sqlite3.md)            | SQLite with better-sqlite3 and plain SQL          | Accepted |
| [0005](0005-node-test-runner.md)                 | Test with the Node.js test runner                 | Accepted |
| [0006](0006-eslint-prettier.md)                  | Lint with typescript-eslint, format with Prettier | Accepted |
| [0007](0007-git-flow.md)                         | Git flow with protected branches                  | Accepted |

## Writing a new ADR

Copy the template below into `NNNN-short-title.md`, using the next free number,
and add it to the table above.

```markdown
# NNNN. Title

- Status: Proposed | Accepted | Superseded by [NNNN](NNNN-title.md)
- Date: YYYY-MM-DD

## Context

What problem are we facing, and which forces are at play?

## Decision

What did we decide?

## Consequences

What becomes easier or harder because of this decision?
```
