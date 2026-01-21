import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // Where Playwright looks for tests
  testDir: './tests',

  // Global timeout per test
  timeout: 30_000,

  // Expect timeout (assertions)
  expect: {
    timeout: 5_000,
  },

  // Retry strategy (only in CI)
  retries: process.env.CI ? 2 : 0,

  // Test result output
  outputDir: 'test-results',

  // Shared settings for all tests
  use: {
    // Base URL for page.goto('/')
    baseURL: 'http://localhost:5173',

    // Headless in CI & local (realistic E2E)
    headless: true,

    // Artifacts (debugging = senior signal)
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',

    // Stable viewport (avoid layout flakiness)
    viewport: { width: 1280, height: 800 },

    // Faster & more deterministic tests
    actionTimeout: 10_000,
    navigationTimeout: 15_000,
  },

  // Run only Chromium (industry-standard CI choice)
  projects: [
    {
      name: 'Chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
  ],

  // 🔑 Web server config (Vite + CI safe)
  webServer: {
    // Install frontend deps and start Vite
    command: 'cd frontend && npm install && npm run dev -- --host',

    // URL Playwright waits for
    url: 'http://localhost:5173',

    // Reuse dev server locally, never in CI
    reuseExistingServer: !process.env.CI,

    // Give Vite time to boot in CI
    timeout: 120 * 1000,
  },

  // HTML report (CI-friendly)
  reporter: [['html', { open: 'never' }]],
});


