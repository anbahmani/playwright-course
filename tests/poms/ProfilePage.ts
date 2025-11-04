import { Page } from "@playwright/test";

export class ProfilePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goTo(section: "Adresses" | "Commandes" | "Préférences") {
    await this.page.getByRole("button", { name: section }).click();
  }
}
