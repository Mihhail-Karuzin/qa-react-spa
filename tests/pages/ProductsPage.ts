import { Page, Locator, expect } from '@playwright/test';

export class ProductsPage {
  readonly page: Page;
  readonly title: Locator;
  readonly products: Locator;
  readonly loading: Locator;
  readonly logoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.getByTestId('products-title');
    this.products = page.locator('[data-testid^="product-"]');
    this.loading = page.getByTestId('products-loading');
    this.logoutButton = page.getByTestId('logout-button');
  }

  async expectLoaded() {
    await expect(this.title).toBeVisible();

    // loading may appear briefly → wait until gone
    if (await this.loading.isVisible()) {
      await expect(this.loading).toBeHidden({ timeout: 5000 });
    }
  }

  async expectProductCount(count: number) {
    await expect(this.products).toHaveCount(count);
  }

  async logout() {
    await this.logoutButton.click();
  }
}


