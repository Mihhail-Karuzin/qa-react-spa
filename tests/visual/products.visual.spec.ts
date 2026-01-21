import { test, expect } from '@playwright/test';
import { loginAsStandardUser } from '../utils/auth';

test('products page visual snapshot', async ({ page }) => {
  const productsPage = await loginAsStandardUser(page);

  // Ensure page fully loaded
  await productsPage.expectLoaded();

  // Take visual snapshot
  await expect(page).toHaveScreenshot('products-page.png', {
    fullPage: false,
  });
});
