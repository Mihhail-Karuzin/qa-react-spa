import { defineConfig } from '@playwright/test';

export default defineConfig({
  // 📁 Where tests live
  testDir: './tests',

  // ⏱ Global timeout per test
  timeout: 30_000,

  // 🎥 Shared settings for all projects
  use: {
    // 🌐 Dev server URL
    baseURL: 'http://localhost:5173',

    // 🧵 Trace on first retry only
    trace: 'on-first-retry',

    // 🧠 Required for init scripts
    contextOptions: {
      javaScriptEnabled: true,
    },
  },

  // 🧪 Browsers
  projects: [
    {
      name: 'Chromium',
      use: {
        browserName: 'chromium',
      },
    },
  ],

  // 🚀 Start Vite dev server automatically
  webServer: {
    command: 'npm run dev',
    cwd: 'frontend',
    port: 5173,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});




