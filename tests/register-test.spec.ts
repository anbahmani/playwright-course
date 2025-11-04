import { test, expect } from "@playwright/test";

test("register", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Connexion" }).click();
  await page.getByRole("button", { name: "Google" }).click();
  await page.getByRole("button", { name: "Inscription" }).click();
  await page
    .getByRole("checkbox", { name: "J'accepte les conditions d'" })
    .check();
  await page.getByRole("textbox", { name: "Jean" }).fill("Test");
  await page.getByRole("textbox", { name: "Dupont" }).fill("Test");
  await page
    .getByRole("textbox", { name: "votre@email.com" })
    .fill("test@test.com");
  await page
    .getByRole("textbox", { name: "Au moins 6 caractères" })
    .fill("123456abcd");
  await page
    .getByRole("textbox", { name: "Confirmer votre mot de passe" })
    .fill("123456abcd");
  await page.getByTestId("register-submit-btn").click();
  await page.getByRole("button", { name: "TT Test" }).click();
  await page.getByRole("button", { name: "Adresses" }).click();
  await page.getByRole("button", { name: "Commandes" }).click();
  await page.getByRole("button", { name: "Préférences" }).click();
  await page
    .locator("div")
    .filter({ hasText: /^Déconnexion$/ })
    .getByRole("button")
    .nth(1)
    .click();
  await page.getByTestId("nav-support").click();
  await page.getByTestId("nav-home").click();
  await page.getByTestId("nav-products").click();
  await page.getByTestId("nav-categories").click();
  await page
    .locator("#featured-products-grid div")
    .filter({ hasText: "-8%ApplesmartphonesiPhone 15" })
    .getByTestId("add-to-cart-btn")
    .click();
});
