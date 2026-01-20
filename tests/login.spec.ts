import { test, expect } from "@playwright/test";
import { loginAsStandardUser } from "./utils/auth";

test("user can login and see products", async ({ page }) => {
  await loginAsStandardUser(page);

  await expect(page.getByTestId("products-page")).toBeVisible();
  await expect(page.getByTestId("products-list")).toBeVisible();

  await expect(page.getByTestId("product-1")).toContainText("Backpack");
  await expect(page.getByTestId("product-2")).toContainText("T-Shirt");
  await expect(page.getByTestId("product-3")).toContainText("Jacket");
});

