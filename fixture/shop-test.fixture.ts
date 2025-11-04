import { test as base } from "@playwright/test";
import * as testData from "../dataset/test-data.json";
import { HomePage } from "../tests/poms/HomePage";
import { Header } from "../tests/poms/Header";
import { CheckoutPage } from "../tests/poms/CheckoutPage";

type User = typeof testData.user;

type ShopFixtures = {
  user: User;
  Given: {
    aNewCustomer: () => Promise<void>;
    theShopHomepageIsDisplayed: () => Promise<void>;
  };
  When: {
    theCustomerAddsFeaturedProductsToTheCart: (
      productIds: number[]
    ) => Promise<void>;
    theCustomerNavigatesToCheckout: () => Promise<void>;
    theCustomerFillsShippingDetails: () => Promise<void>;
    theCustomerSelectsPremiumShipping: () => Promise<void>;
    theCustomerSelectsPayPal: () => Promise<void>;
    theCustomerFinalizesTheOrder: () => Promise<void>;
  };
  Then: {
    theOrderConfirmationIsDisplayed: () => Promise<void>;
    theCustomerCanContinueShopping: () => Promise<void>;
  };
};

export const test = base.extend<ShopFixtures>({
  user: async ({}, use) => {
    await use(testData.user);
  },

  Given: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use({
      aNewCustomer: async () => Promise.resolve(),
      theShopHomepageIsDisplayed: async () => {
        await homePage.goto();
      },
    });
  },

  When: async ({ page, user }, use) => {
    const homePage = new HomePage(page);
    const header = new Header(page);
    const checkoutPage = new CheckoutPage(page);

    await use({
      theCustomerAddsFeaturedProductsToTheCart: async (
        productIds: number[]
      ) => {
        for (const id of productIds) {
          await homePage.addFeaturedProductToCart(id);
        }
      },
      theCustomerNavigatesToCheckout: async () => {
        await header.goToCart();
        await checkoutPage.goToCheckoutFromCart();
      },
      theCustomerFillsShippingDetails: async () => {
        await checkoutPage.fillShippingDetails(user);
      },
      theCustomerSelectsPremiumShipping: async () => {
        await checkoutPage.selectPremiumShipping();
      },
      theCustomerSelectsPayPal: async () => {
        await checkoutPage.selectPayPal();
      },
      theCustomerFinalizesTheOrder: async () => {
        await checkoutPage.finalizeOrder();
      },
    });
  },

  Then: async ({ page }, use) => {
    const checkoutPage = new CheckoutPage(page);
    await use({
      theOrderConfirmationIsDisplayed: async () => {
        await checkoutPage.assertOrderConfirmation();
      },
      theCustomerCanContinueShopping: async () => {
        await checkoutPage.continueShopping();
      },
    });
  },
});

export { expect } from "@playwright/test";
