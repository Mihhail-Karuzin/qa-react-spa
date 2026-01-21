import { expect, Locator, Page } from "@playwright/test";

export class ProductsPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  productsTitle(): Locator {
    return this.page.getByTestId("products-title");
  }

  productsList(): Locator {
    return this.page.getByTestId("products-list");
  }

  productItems(): Locator {
    return this.page.locator('[data-testid^="product-"]');
  }

  loading(): Locator {
    return this.page.getByTestId("products-loading");
  }

  logoutButton(): Locator {
    return this.page.getByTestId("logout-button");
  }

  async expectLoaded() {
    if (await this.loading().isVisible()) {
      await expect(this.loading()).toBeHidden({ timeout: 5000 });
    }
    await expect(this.productsTitle()).toBeVisible();
  }

  async expectProductCount(expected: number) {
    await expect(this.productItems()).toHaveCount(expected);
  }

  async logout() {
    await this.logoutButton().click();
  }
}


