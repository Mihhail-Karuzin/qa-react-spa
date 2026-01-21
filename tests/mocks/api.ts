import { Page } from '@playwright/test';

export async function mockApi(page: Page) {
  // 🔹 Health endpoint
  await page.route('**/api/health', async route => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ status: 'ok' }),
    });
  });

  // 🔹 Products endpoint
  await page.route('**/api/products', async route => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([
        { id: 1, name: 'Backpack', price: 29.99 },
        { id: 2, name: 'T-Shirt', price: 15.99 },
        { id: 3, name: 'Jacket', price: 49.99 },
      ]),
    });
  });
}
