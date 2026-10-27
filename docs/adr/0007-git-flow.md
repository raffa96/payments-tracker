# 0007. Git flow with protected branches

- Status: Accepted
- Date: 2026-10-27

## Context

The project will receive contributions from people other than its author.
Released code must stay stable, and every change must be reviewed and verified
before reaching it.

## Decision

- The project follows **git flow**: `master` holds released code, `develop` is
  the integration branch and the default branch of the repository.
- Work happens on `feature/*` and `fix/*` branches from `develop`, releases on
  `release/*` and urgent fixes on `hotfix/*` branches from `master`.
- `master` and `develop` are protected: changes only through pull requests, the
  CI must pass, force pushes and deletions are not allowed, and the rules apply
  to administrators too.
- No approving review is required for now, because GitHub does not allow
  authors to approve their own pull requests and the project has a single
  maintainer. This will change when more maintainers join.
- Commits follow Conventional Commits; versions follow Semantic Versioning.
- Merge methods: squash or merge commit for `feature/*` and `fix/*` into
  `develop`; merge commit only for `release/*` and `hotfix/*` into `master` and
  for the back-merge of `master` into `develop`. Rebase merging is disabled.
- Head branches are deleted automatically after their pull request is merged.

## Consequences

- Every change, including the maintainer's, goes through a pull request and the
  CI.
- `master` and `develop` always share the same commits, so back-merges do not
  produce conflicts.
- Because release and hotfix branches are deleted on merge, their changes reach
  `develop` through a pull request from `master`.
- The full process is documented in [CONTRIBUTING.md](../../CONTRIBUTING.md).
