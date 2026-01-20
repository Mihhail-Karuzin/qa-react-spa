import { Page } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { ProductsPage } from "../pages/ProductsPage";

export async function loginAsStandardUser(page: Page) {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);

  await loginPage.goto();
  await loginPage.login("standard_user", "secret_sauce");
  await productsPage.expectLoaded();
}
