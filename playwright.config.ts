import { defineConfig } from '@playwright/test';

export default defineConfig({
  // Where Playwright looks for tests
  testDir: './tests',

  // Global test timeout
  timeout: 30_000,

  // Retry only in CI (good practice)
  retries: process.env.CI ? 2 : 0,

  // Shared settings for all tests
  use: {
    baseURL: 'http://localhost:5173',
    headless: true,

    // Artifacts for debugging (senior-level setup)
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  // Run only Chromium (realistic CI choice)
  projects: [
    {
      name: 'Chromium',
      use: { browserName: 'chromium' },
    },
  ],

  // 🔑 THIS IS THE IMPORTANT PART FOR CI
  webServer: {
    // Go to frontend, install deps, start Vite
    command: 'cd frontend && npm install && npm run dev -- --host',

    // Playwright waits for this URL to be ready
    url: 'http://localhost:5173',

    // Reuse local dev server, but NOT in CI
    reuseExistingServer: !process.env.CI,

    // Give Vite enough time to start in CI
    timeout: 120 * 1000,
  },

  // HTML report
  reporter: [['html', { open: 'never' }]],
});

