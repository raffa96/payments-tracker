# Contributing to payments-tracker

Thank you for taking the time to contribute! This guide explains how the project
is organized and what we expect from a contribution, so that your work can be
reviewed and merged smoothly.

By participating you agree to abide by the [code of conduct](CODE_OF_CONDUCT.md).

## Before you start

- **Bugs and ideas**: open an [issue](https://github.com/raffa96/payments-tracker/issues)
  using the matching template. For non-trivial changes, please discuss them in an
  issue before writing code.
- **Security issues**: never report them publicly; follow the
  [security policy](SECURITY.md).

## Development setup

Requirements: Node.js 24 or later.

```sh
npm ci
npm run dev
```

See the [development guide](docs/development.md) for the full local workflow.

## Branching model (git flow)

| Branch           | Purpose                                  | Branches off | Merges into          |
| ---------------- | ---------------------------------------- | ------------ | -------------------- |
| `master`         | Released, production-ready code.         | —            | —                    |
| `develop`        | Integration branch for the next release. | —            | —                    |
| `feature/<name>` | A new feature.                           | `develop`    | `develop`            |
| `fix/<name>`     | A non-urgent bug fix.                    | `develop`    | `develop`            |
| `release/x.y.z`  | Preparation of a release.                | `develop`    | `master` + `develop` |
| `hotfix/<name>`  | An urgent fix to released code.          | `master`     | `master` + `develop` |

- `develop` is the default branch: open your pull requests against it.
- `master` and `develop` are protected: they can only change through pull
  requests whose checks pass.
- Use short, lowercase, hyphenated names, e.g. `feature/price-changes`.
- Releases follow [Semantic Versioning](https://semver.org/) and are tagged on
  `master` as `vX.Y.Z`.

## Commit messages

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```text
<type>(<optional scope>): <description>

[optional body]
```

Common types: `feat`, `fix`, `docs`, `test`, `refactor`, `perf`, `build`, `ci`,
`chore`. Write the description in the imperative mood ("add", not "added") and
keep each commit focused on a single change.

## Coding standards

- **TypeScript, run natively by Node.js.** Node strips the type annotations at
  runtime, so only [erasable syntax](https://nodejs.org/api/typescript.html) is
  allowed. The compiler enforces this, but in practice:
  - no `enum`, `namespace` or constructor parameter properties: use
    `as const` objects or string literal unions instead;
  - relative imports include the `.ts` extension: `import { x } from './x.ts'`;
  - type-only imports use `import type`.
- **Formatting** is handled by Prettier; do not format by hand.
- **Linting** uses the strict, type-aware rule sets of typescript-eslint. Do not
  disable a rule without a comment explaining why.
- **Comments** explain _why_, not _what_. Public functions get a short JSDoc.
- **Money** is always stored and computed as integer cents, never as floats.
- **Every source file** starts with the license header:

  ```ts
  // SPDX-License-Identifier: AGPL-3.0-or-later
  // Copyright (C) 2026 Raffaele Tufano
  ```

## Tests

- Every change in behaviour comes with tests; every bug fix with a test that
  reproduces the bug.
- Tests live in `test/`, mirror the structure of `src/` and are named
  `*.test.ts`.
- The CI fails if coverage drops below the thresholds set in `package.json`.

## Pull requests

1. Create your branch from `develop`.
2. Make your change, with tests and documentation.
3. Run `npm run check` and make sure it passes.
4. Update the `Unreleased` section of the [changelog](CHANGELOG.md).
5. Open a pull request against `develop` and fill in the template.

## Licensing of contributions

This project is licensed under the [GNU AGPL v3.0 or later](LICENSE). By
submitting a contribution, you agree that it is licensed under the same terms
and that you have the right to submit it.
