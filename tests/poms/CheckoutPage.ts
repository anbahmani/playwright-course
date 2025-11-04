import { Page, expect } from "@playwright/test";

export class CheckoutPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goToCheckoutFromCart() {
    await this.page.getByTestId("cart-checkout-btn").click();
  }

  async fillShippingDetails(user: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    zipCode: string;
  }) {
    await this.page.getByRole("textbox", { name: "Votre prénom" }).fill(user.firstName);
    await this.page.getByRole("textbox", { name: "Votre nom" }).fill(user.lastName);
    await this.page.getByRole("textbox", { name: "votre@email.com" }).fill(user.email);
    await this.page.getByRole("textbox", { name: "+33 1 23 45 67" }).fill(user.phone);
    await this.page.getByRole("textbox", { name: "Rue de la Technologie" }).fill(user.address);
    await this.page.getByRole("textbox", { name: "Paris" }).fill(user.city);
    await this.page.getByRole("textbox", { name: "75001" }).fill(user.zipCode);
    await this.page.getByRole("button", { name: "Continuer" }).click();
  }

  async selectPremiumShipping() {
    await this.page.getByText("Livraison PremiumLivraison le lendemain1 jour25€").click();
    await this.page.getByRole("button", { name: "Continuer" }).click();
  }

  async selectPayPal() {
    await this.page.getByRole("button", { name: "PayPal" }).click();
  }

  async finalizeOrder() {
    await this.page.getByRole("button", { name: "Finaliser la commande" }).click();
  }

  async assertOrderConfirmation() {
    await expect(this.page.getByRole("button", { name: "Suivre ma commande" })).toBeVisible();
    await this.page.getByRole("button", { name: "Suivre ma commande" }).click();
  }

  async continueShopping() {
    await expect(this.page.getByRole("button", { name: "Continuer mes achats" })).toBeVisible();
    await this.page.getByRole("button", { name: "Continuer mes achats" }).click();
  }
}
