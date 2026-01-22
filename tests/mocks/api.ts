import { Page } from '@playwright/test';

// ✅ Default happy-path mock
export async function mockApi(page: Page) {
  await page.route('**/api/products', route =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([
        { id: 1, name: 'Backpack', price: 29.99 },
        { id: 2, name: 'T-Shirt', price: 15.99 },
        { id: 3, name: 'Jacket', price: 49.99 },
      ]),
    })
  );
}

// 🔴 Failure mock (used only in one test)
export async function mockProductsFailure(page: Page) {
  await page.route('**/api/products', route =>
    route.fulfill({
      status: 500,
      contentType: 'application/json',
      body: JSON.stringify({ message: 'Internal Server Error' }),
    })
  );
}
