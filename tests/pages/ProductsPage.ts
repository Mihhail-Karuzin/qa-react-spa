import { Page, Locator, expect } from '@playwright/test';

export class ProductsPage {
  readonly page: Page;
  readonly title: Locator;
  readonly productsList: Locator;
  readonly loadingIndicator: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.getByTestId('products-title');
    this.productsList = page.getByTestId('products-list');
    this.loadingIndicator = page.getByTestId('products-loading');
  }

  async expectLoaded() {
    await expect(this.loadingIndicator).toBeHidden({ timeout: 5000 });
    await expect(this.title).toBeVisible();
  }

  async expectProductCount(count: number) {
    await expect(this.productsList.locator('li')).toHaveCount(count);
  }
}

