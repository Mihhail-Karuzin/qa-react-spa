import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';

test('shows error when products API fails', async ({ page }) => {
  // 🔹 Mock API failure
  await page.route('**/api/products', async (route) => {
    await route.fulfill({
      status: 500,
      contentType: 'application/json',
      body: JSON.stringify({ message: 'Internal Server Error' }),
    });
  });

  const loginPage = new LoginPage(page);

  await loginPage.open();
  await loginPage.login('standard_user', 'secret_sauce');

  // 🔹 Assert UI error handling
  const error = page.getByTestId('products-error');
  await expect(error).toBeVisible();
  await expect(error).toHaveText('Failed to load products');
});

