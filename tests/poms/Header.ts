import { Page } from "@playwright/test";

export class Header {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goToCart() {
    await this.page.locator("#header-cart-btn").click();
  }

  async goToLogin() {
    await this.page.getByRole("button", { name: "Connexion" }).click();
  }

  async logout(user: { firstName: string; lastName: string }) {
    const userButtonName = `${user.firstName.charAt(0)}${user.lastName.charAt(0)} ${user.lastName}`;
    await this.page.getByRole("button", { name: userButtonName }).click();
    await this.page.locator("div").filter({ hasText: /^Déconnexion$/ }).getByRole("button").nth(1).click();
  }

  async navigateTo(link: 'support' | 'home' | 'products' | 'categories') {
      await this.page.getByTestId(`nav-${link}`).click();
  }
}
