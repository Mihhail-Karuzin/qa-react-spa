import { expect, Page } from "@playwright/test";

export class ProductsPage {
  constructor(private readonly page: Page) {}

  pageRoot = () => this.page.getByTestId("products-page");
  loading = () => this.page.getByTestId("products-loading");
  productsList = () => this.page.getByTestId("products-list");
  productById = (id: number) => this.page.getByTestId(`product-${id}`);

  async expectLoaded() {
    await expect(this.pageRoot()).toBeVisible();

    // SPA-safe loading handling
    if (await this.loading().isVisible().catch(() => false)) {
      await expect(this.loading()).toBeHidden({ timeout: 5000 });
    }

    await expect(this.productsList()).toBeVisible();
  }
}
