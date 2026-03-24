import request from 'supertest';
import app from '../index.js';

describe('Express backend API', () => {
  it('should return backend hello text at root GET /', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
    expect(res.text).toContain('This is backend API');
  });
});

import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    coverage: {
      provider: 'v8', // or c8
      reporter: ['text', 'lcov', 'html'],
      reportsDirectory: 'coverage',
      all: true,
      include: ['**/*.js'],
      exclude: ['node_modules/**', 'tests/**'],
      lines: 100,
      functions: 100,
      branches: 100,
      statements: 100,
    },
  },
});