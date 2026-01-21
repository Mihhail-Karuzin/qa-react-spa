import { test, expect } from '@playwright/test';

test('shows error when products API fails', async ({ page }) => {
  // 1️⃣ Intercept BEFORE navigation
  await page.route('**/api/products', async (route) => {
    await route.fulfill({
      status: 500,
      contentType: 'application/json',
      body: JSON.stringify({ message: 'Internal Server Error' }),
    });
  });

  // 2️⃣ Open app
  await page.goto('/');

  // 3️⃣ Login
  await page.getByTestId('username-input').fill('standard_user');
  await page.getByTestId('password-input').fill('secret_sauce');
  await page.getByTestId('login-button').click();

  // 4️⃣ Assert UI error
  const error = page.getByTestId('products-error');
  await expect(error).toBeVisible();
  await expect(error).toHaveText('Failed to load products');
});


