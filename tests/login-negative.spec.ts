import { test } from "@playwright/test";
import { LoginPage } from "./pages/LoginPage";

test("invalid credentials show error message", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.open();
  await loginPage.login("wrong_user", "wrong_password");

  await loginPage.expectLoginError();
});
