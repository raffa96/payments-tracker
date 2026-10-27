# 0003. Server-rendered user interface with Eta

- Status: Accepted
- Date: 2026-10-27

## Context

The application is made of forms and tables: setting up subscriptions,
recording payments, reading the yearly payment table. A single-page application
would add a client framework, a build pipeline and an API layer without a real
benefit for this kind of interface.

## Decision

Pages are rendered on the server with the [Eta](https://eta.js.org/) template
engine and enhanced with small amounts of plain JavaScript only where needed.

Eta was chosen because it is written in TypeScript, has no dependencies, uses a
familiar EJS-like syntax and escapes HTML output by default. It will be
installed together with the first page.

## Consequences

- No client-side framework and no frontend build step.
- Output escaping by default protects against cross-site scripting.
- Forms submit with plain HTTP requests, so they need CSRF protection, which
  will be implemented with `node:crypto`.
