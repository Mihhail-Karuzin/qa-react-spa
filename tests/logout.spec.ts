import { test, expect } from "@playwright/test";
import { loginAsStandardUser } from "./utils/auth";

test("user can logout and return to login page", async ({ page }) => {
  // Login first (reuse existing helper)
  await loginAsStandardUser(page);

  // Click logout
  await page.getByTestId("logout-button").click();

  // Verify login page is shown again
  await expect(page.getByTestId("login-page")).toBeVisible();

  // Verify inputs are reset
  await expect(page.getByTestId("username-input")).toHaveValue("");
  await expect(page.getByTestId("password-input")).toHaveValue("");
});
