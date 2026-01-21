import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,

  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
  },

  webServer: {
    command: 'npm run dev',
    cwd: 'frontend',
    port: 5173,
    reuseExistingServer: process.env.CI !== 'true',
    timeout: 120_000,
  },
});



