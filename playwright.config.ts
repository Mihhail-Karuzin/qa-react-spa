import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  retries: process.env.CI ? 2 : 0,

  use: {
    baseURL: 'http://localhost:5173',
    headless: true,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'Chromium',
      use: { browserName: 'chromium' },
    },
  ],

  // 🔑 IMPORTANT PART
  webServer: {
    // 👇 We inject env variable here
    command:
      'cd frontend && VITE_DISABLE_MSW=true npm run dev -- --host',

    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },

  reporter: [['html', { open: 'never' }]],
});


