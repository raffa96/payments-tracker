# 0001. License the project under AGPL-3.0-or-later

- Status: Accepted
- Date: 2026-10-27

## Context

The project is public: anyone should be able to use it, study it and contribute
to it, and its author wants to be credited. At the same time, nobody should be
able to take the code, close it and offer it as their own product or service.

On GitHub a public repository can always be forked, so forks cannot be
prevented; what a license can control is what may be done with the code.

## Decision

The project is licensed under the **GNU Affero General Public License, version 3
or (at your option) any later version** (`AGPL-3.0-or-later`).

- `LICENSE` contains the full license text.
- Every source file starts with an SPDX header and the copyright notice:
  `SPDX-License-Identifier: AGPL-3.0-or-later` and
  `Copyright (C) 2026 Raffaele Tufano`.
- Contributions are accepted under the same license (inbound = outbound), with
  no contributor license agreement.

## Consequences

- The project is free and open source software, compatible with the Open Source
  Definition.
- Anyone distributing a modified version, or **offering it to users over a
  network**, must release its source code under the same license and keep the
  copyright notices: the code cannot be turned into a closed product.
- Without a CLA, relicensing the project in the future would require the
  consent of every contributor.
