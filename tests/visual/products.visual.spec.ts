import { test, expect } from '../fixtures';
import { loginAsStandardUser } from '../utils/auth';

test('products page visual snapshot', async ({ page }) => {
  // 1️⃣ Mock products API with stable data
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

  // 2️⃣ Login
  await loginAsStandardUser(page);

  // 3️⃣ Ensure UI is stable
  await expect(page.getByTestId('products-title')).toBeVisible();
  await expect(page.locator('[data-testid^="product-"]')).toHaveCount(3);

  // 4️⃣ Take snapshot
  await expect(page).toHaveScreenshot('products-page.png', {
    fullPage: false,
  });
});
