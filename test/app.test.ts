// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2026 Raffaele Tufano

import assert from 'node:assert/strict';
import { after, before, describe, it } from 'node:test';
import { createApp } from '../src/app.ts';
import { startTestServer, type TestServer } from './helpers/http.ts';

describe('app', () => {
  let server: TestServer;

  before(async () => {
    server = await startTestServer(createApp());
  });

  after(async () => {
    await server.close();
  });

  describe('GET /health', () => {
    it('responds with 200 and an ok status', async () => {
      const response = await fetch(`${server.baseUrl}/health`);

      assert.equal(response.status, 200);
      assert.deepEqual(await response.json(), { status: 'ok' });
    });
  });

  describe('security headers', () => {
    it('sets the headers provided by helmet', async () => {
      const response = await fetch(`${server.baseUrl}/health`);

      assert.equal(response.headers.get('x-content-type-options'), 'nosniff');
      assert.ok(response.headers.get('content-security-policy'));
    });

    it('does not disclose the framework in use', async () => {
      const response = await fetch(`${server.baseUrl}/health`);

      assert.equal(response.headers.get('x-powered-by'), null);
    });
  });
});
