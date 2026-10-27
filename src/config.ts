// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2026 Raffaele Tufano

import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  // Bind to the loopback interface by default so a fresh install is never
  // exposed to the network by accident.
  HOST: z.string().trim().min(1).default('127.0.0.1'),
  PORT: z.coerce.number().int().min(1).max(65535).default(3000),
});

export interface Config {
  readonly env: 'development' | 'production' | 'test';
  readonly host: string;
  readonly port: number;
}

/**
 * Reads and validates the application configuration from environment variables.
 *
 * @throws {Error} when a variable is set to an invalid value.
 */
export function loadConfig(env: NodeJS.ProcessEnv = process.env): Config {
  const result = envSchema.safeParse(env);

  if (!result.success) {
    throw new Error(`Invalid configuration:\n${z.prettifyError(result.error)}`);
  }

  return {
    env: result.data.NODE_ENV,
    host: result.data.HOST,
    port: result.data.PORT,
  };
}
