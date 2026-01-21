import { Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { mockApi } from '../mocks/api';

export async function loginAsStandardUser(page: Page) {
  await mockApi(page); // 🔑 inject mocks BEFORE navigation

  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);

  await loginPage.open();
  await loginPage.login('standard_user', 'secret_sauce');
  await productsPage.expectLoaded();

  return productsPage;
}

