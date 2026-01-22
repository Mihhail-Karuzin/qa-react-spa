import { test, expect } from './fixtures';
import { mockProductsFailure } from './mocks/api';

test('shows error when products API fails', async ({ page }) => {
  // 🔴 override API BEFORE navigation
  await mockProductsFailure(page);

  await page.goto('/');

  await page.getByTestId('username-input').fill('standard_user');
  await page.getByTestId('password-input').fill('secret_sauce');
  await page.getByTestId('login-button').click();

  const error = page.getByTestId('products-error');
  await expect(error).toBeVisible();
  await expect(error).toHaveText('Failed to load products');
});


