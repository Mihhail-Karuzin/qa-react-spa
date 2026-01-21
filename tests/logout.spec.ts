import { test, expect } from "@playwright/test";
import { loginAsStandardUser } from "./utils/auth";
import { LoginPage } from "./pages/LoginPage";

test("user can logout and return to login page", async ({ page }) => {
  const productsPage = await loginAsStandardUser(page);

  await productsPage.logout();

  const loginPage = new LoginPage(page);
  await loginPage.expectLoaded();
});

