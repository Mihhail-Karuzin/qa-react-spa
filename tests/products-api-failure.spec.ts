import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';

test('shows error when products API fails', async ({ page }) => {
  await page.route('**/api/products', async (route) => {
    await route.fulfill({
      status: 500,
      contentType: 'application/json',
      body: JSON.stringify({ message: 'Server error' }),
    });
  });

  const loginPage = new LoginPage(page);
  await loginPage.open();
  await loginPage.login('standard_user', 'secret_sauce');

  await expect(page.getByTestId('products-error')).toBeVisible();
  await expect(page.getByTestId('products-error')).toContainText('Failed to load products');
});
