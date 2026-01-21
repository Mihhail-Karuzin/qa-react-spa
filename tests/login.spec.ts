import { test } from '@playwright/test';
import { loginAsStandardUser } from './utils/auth';

test('user can login and see products', async ({ page }) => {
  const productsPage = await loginAsStandardUser(page);

  await productsPage.expectProductCount(3);
  await productsPage.expectProductNames([
    'Backpack',
    'T-Shirt',
    'Jacket',
  ]);
});



