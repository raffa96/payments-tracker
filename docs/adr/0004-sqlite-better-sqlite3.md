# 0004. SQLite with better-sqlite3 and plain SQL

- Status: Accepted
- Date: 2026-10-27

## Context

Each installation is a personal instance with a single manager and a small
amount of data. It should be trivial to install and back up, without running a
separate database server.

Two SQLite drivers were considered: `better-sqlite3`, mature and among the
fastest available, and the built-in `node:sqlite`, which has no dependencies but
whose API is still under active development.

## Decision

- Data is stored in **SQLite**, accessed through **better-sqlite3**.
- Queries are written in **plain SQL** inside typed repository modules; no ORM
  or query builder.
- Schema changes are applied by a small in-house migration runner: numbered
  `.sql` files, each applied once inside a transaction and recorded in a
  `schema_migrations` table.
- Integrity and safety rules:
  - only prepared statements with bound parameters, never string concatenation;
  - `STRICT` tables, `CHECK` constraints and foreign keys
    (`PRAGMA foreign_keys = ON`);
  - amounts stored as integer cents;
  - `PRAGMA journal_mode = WAL`;
  - the database file lives in `data/`, excluded from Git and never served.

The driver will be installed together with the first migration.

## Consequences

- An instance needs no database server, and a backup is a copy of one file.
- better-sqlite3 ships a native module: on unusual platforms without prebuilt
  binaries, installing it requires a C++ toolchain.
- All database access is isolated in one module, so switching to `node:sqlite`
  once it is stable would be a small, local change.
