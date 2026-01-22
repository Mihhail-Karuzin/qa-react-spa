import { test as base } from '@playwright/test';

export const test = base.extend({
  page: async ({ page }, use) => {
    await page.addInitScript(() => {
      (window as any).__PLAYWRIGHT__ = true;
    });
    await use(page);
  },
});

export const expect = test.expect;
