// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2026 Raffaele Tufano

import { createApp } from './app.ts';
import { loadConfig } from './config.ts';

const config = loadConfig();
const app = createApp();

const server = app.listen(config.port, config.host, (error) => {
  if (error) {
    throw error;
  }

  console.log(`payments-tracker listening on http://${config.host}:${String(config.port)}`);
});

function shutdown(signal: NodeJS.Signals): void {
  console.log(`Received ${signal}, shutting down...`);

  server.close((error) => {
    if (error) {
      console.error(error);
      process.exitCode = 1;
    }
  });
}

process.once('SIGINT', shutdown);
process.once('SIGTERM', shutdown);
