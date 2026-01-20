import { test, expect } from "@playwright/test";

test("user can login and see products", async ({ page }) => {
  await page.goto("/");

  await page.getByTestId("username-input").fill("standard_user");
  await page.getByTestId("password-input").fill("secret_sauce");
  await page.getByTestId("login-button").click();

  await expect(page.getByTestId("products-page")).toBeVisible();
  await expect(page.getByTestId("products-list")).toBeVisible();

  await expect(page.getByTestId("product-1")).toContainText("Backpack");
  await expect(page.getByTestId("product-2")).toContainText("T-Shirt");
  await expect(page.getByTestId("product-3")).toContainText("Jacket");
});
