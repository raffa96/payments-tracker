// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2026 Raffaele Tufano

import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { loadConfig } from '../src/config.ts';

describe('loadConfig', () => {
  it('applies safe defaults when no variable is set', () => {
    assert.deepEqual(loadConfig({}), {
      env: 'development',
      host: '127.0.0.1',
      port: 3000,
    });
  });

  it('reads the values from the environment', () => {
    assert.deepEqual(loadConfig({ NODE_ENV: 'production', HOST: '0.0.0.0', PORT: '8080' }), {
      env: 'production',
      host: '0.0.0.0',
      port: 8080,
    });
  });

  it('rejects a port that is not a number', () => {
    assert.throws(() => loadConfig({ PORT: 'abc' }), /Invalid configuration/);
  });

  it('rejects a port out of range', () => {
    assert.throws(() => loadConfig({ PORT: '70000' }), /Invalid configuration/);
  });

  it('rejects an unknown environment', () => {
    assert.throws(() => loadConfig({ NODE_ENV: 'staging' }), /Invalid configuration/);
  });

  it('rejects an empty host', () => {
    assert.throws(() => loadConfig({ HOST: '  ' }), /Invalid configuration/);
  });
});
