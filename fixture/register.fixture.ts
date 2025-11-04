import { test as base, expect } from "@playwright/test";
import * as testData from "../dataset/test-data.json";
import { Header } from "../tests/poms/Header";
import { HomePage } from "../tests/poms/HomePage";
import { RegisterPage } from "../tests/poms/RegisterPage";
import { ProfilePage } from "../tests/poms/ProfilePage";

type RegisterUser = typeof testData.registerUser & { email: string };

type RegisterFixtures = {
  registerUser: RegisterUser;
  Given: { theUserIsOnTheRegistrationPage: () => Promise<void> };
  When: {
    theUserFillsTheRegistrationForm: () => Promise<void>;
    theUserAcceptsTheTerms: () => Promise<void>;
    theUserSubmitsTheForm: () => Promise<void>;
    theUserNavigatesTheirProfile: () => Promise<void>;
    theUserLogsOut: () => Promise<void>;
    theUserNavigatesThePublicSite: () => Promise<void>;
  };
  Then: {
    theUserIsSuccessfullyLoggedIn: () => Promise<void>;
    theUserIsSuccessfullyLoggedOut: () => Promise<void>;
  };
};

export const test = base.extend<RegisterFixtures>({
  registerUser: async ({}, use) => {
    const uniqueEmail = `test-${Date.now()}@test.com`;
    await use({ ...testData.registerUser, email: uniqueEmail });
  },

  Given: async ({ page }, use) => {
    const homePage = new HomePage(page);
    const header = new Header(page);
    const registerPage = new RegisterPage(page);
    await use({
      theUserIsOnTheRegistrationPage: async () => {
        await homePage.goto();
        await header.goToLogin();
        await registerPage.goToRegistrationForm();
      },
    });
  },

  When: async ({ page, registerUser }, use) => {
    const registerPage = new RegisterPage(page);
    const profilePage = new ProfilePage(page);
    const header = new Header(page);
    await use({
      theUserFillsTheRegistrationForm: async () => {
        await registerPage.fillForm(registerUser);
      },
      theUserAcceptsTheTerms: async () => {
        await registerPage.acceptTerms();
      },
      theUserSubmitsTheForm: async () => {
        await registerPage.submit();
      },
      theUserNavigatesTheirProfile: async () => {
        // After registration, the user menu needs to be clicked first.
        const userButtonName = `${registerUser.firstName.charAt(
          0
        )}${registerUser.lastName.charAt(0)} ${registerUser.lastName}`;
        await page.getByRole("button", { name: userButtonName }).click();

        await profilePage.goTo("Adresses");
        await profilePage.goTo("Commandes");
        await profilePage.goTo("Préférences");
      },
      theUserLogsOut: async () => {
        await header.logout(registerUser);
      },
      theUserNavigatesThePublicSite: async () => {
        await header.navigateTo("support");
        await header.navigateTo("home");
        await header.navigateTo("products");
        await header.navigateTo("categories");
      },
    });
  },

  Then: async ({ page, registerUser }, use) => {
    const registerPage = new RegisterPage(page);
    await use({
      theUserIsSuccessfullyLoggedIn: async () => {
        await registerPage.assertRegistrationSuccess(registerUser);
      },
      theUserIsSuccessfullyLoggedOut: async () => {
        await expect(
          page.getByRole("button", { name: "Connexion" })
        ).toBeVisible();
      },
    });
  },
});

export { expect } from "@playwright/test";
