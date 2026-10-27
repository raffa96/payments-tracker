// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2026 Raffaele Tufano

import express, { type Express } from 'express';
import helmet from 'helmet';

/**
 * Builds the Express application without starting it, so that tests can mount
 * it on an ephemeral port and the entry point stays a thin wrapper.
 */
export function createApp(): Express {
  const app = express();

  app.use(helmet());

  app.get('/health', (_req, res) => {
    res.json({ status: 'ok' });
  });

  return app;
}
