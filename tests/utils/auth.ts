import { Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';

export async function loginAsStandardUser(page: Page) {
  // 🔹 Mock products API response
  await page.route('**/api/products', async (route) => {
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

  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);

  await loginPage.open();
  await loginPage.login('standard_user', 'secret_sauce');
  await productsPage.expectLoaded();

  return productsPage;
}

