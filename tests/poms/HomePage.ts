import { Page } from "@playwright/test";

export class HomePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto("/");
  }

  async addFeaturedProductToCart(productId: number) {
    await this.page
      .locator("#featured-products-grid")
      .getByTestId("add-to-cart-btn")
      .nth(productId)
      .click();
  }
}
