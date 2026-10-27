// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2026 Raffaele Tufano

import { once } from 'node:events';
import type { AddressInfo } from 'node:net';
import type { Express } from 'express';

export interface TestServer {
  /** Base URL of the running server, e.g. `http://127.0.0.1:54321`. */
  readonly baseUrl: string;
  close(): Promise<void>;
}

/**
 * Starts the given app on a random free port of the loopback interface, so
 * tests can exercise it over real HTTP with the built-in `fetch`.
 */
export async function startTestServer(app: Express): Promise<TestServer> {
  const server = app.listen(0, '127.0.0.1');
  await once(server, 'listening');

  const { port } = server.address() as AddressInfo;

  return {
    baseUrl: `http://127.0.0.1:${String(port)}`,
    close: () =>
      new Promise((resolve, reject) => {
        server.close((error) => {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        });
      }),
  };
}
