import { Page, expect } from "@playwright/test";

export class RegisterPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goToRegistrationForm() {
    await this.page.getByRole("button", { name: "Google" }).click();
    await this.page.getByRole("button", { name: "Inscription" }).click();
  }

  async fillForm(user: { firstName: string; lastName: string; email: string; password: string }) {
    await this.page.getByRole("textbox", { name: "Jean" }).fill(user.firstName);
    await this.page.getByRole("textbox", { name: "Dupont" }).fill(user.lastName);
    await this.page.getByRole("textbox", { name: "votre@email.com" }).fill(user.email);
    await this.page.getByRole("textbox", { name: "Au moins 6 caractères" }).fill(user.password);
    await this.page.getByRole("textbox", { name: "Confirmer votre mot de passe" }).fill(user.password);
  }

  async acceptTerms() {
    await this.page.getByRole("checkbox", { name: "J'accepte les conditions d'" }).check();
  }

  async submit() {
    await this.page.getByTestId("register-submit-btn").click();
  }

  async assertRegistrationSuccess(user: { firstName: string; lastName: string }) {
    const userButtonName = `${user.firstName.charAt(0)}${user.lastName.charAt(0)} ${user.lastName}`;
    await expect(this.page.getByRole("button", { name: userButtonName })).toBeVisible();
  }
}
