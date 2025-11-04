import { test } from "../fixture/shop-test.fixture";

test("test to command 2 products", async ({ page, user }) => {
  await page.goto("/");
  await page
    .locator("#featured-products-grid")
    .getByTestId("product-add-to-cart-btn-1")
    .click();
  await page
    .locator("#featured-products-grid")
    .getByTestId("product-add-to-cart-btn-2")
    .click();
  await page.locator("#header-cart-btn").click();
  await page.getByTestId("cart-checkout-btn").click();
  await page
    .getByRole("textbox", { name: "Votre prénom" })
    .fill(user.firstName);
  await page.getByRole("textbox", { name: "Votre nom" }).fill(user.lastName);
  await page.getByRole("textbox", { name: "votre@email.com" }).fill(user.email);
  await page.getByRole("textbox", { name: "+33 1 23 45 67" }).fill(user.phone);
  await page.getByRole("textbox", { name: "Rue de la Technologie" }).click();
  await page
    .getByRole("textbox", { name: "Rue de la Technologie" })
    .fill(user.address);
  await page.getByRole("textbox", { name: "Paris" }).fill(user.city);
  await page.getByRole("textbox", { name: "75001" }).fill(user.zipCode);
  await page.getByRole("button", { name: "Continuer" }).click();
  await page
    .getByText("Livraison PremiumLivraison le lendemain1 jour25€")
    .click();
  await page.getByRole("button", { name: "Continuer" }).click();
  await page.getByRole("button", { name: "PayPal" }).click();
  await page.getByRole("button", { name: "Finaliser la commande" }).click();
  await page.getByRole("button", { name: "Suivre ma commande" }).click();
  await page.getByRole("button", { name: "Continuer mes achats" }).click();
});
