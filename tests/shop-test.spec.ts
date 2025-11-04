import { test } from "../fixture/shop-test.fixture";

test("A customer can successfully purchase featured products", async ({
  Given,
  When,
  Then,
}) => {
  await test.step("Given: A new customer", async () => {
    await Given.aNewCustomer();
    await Given.theShopHomepageIsDisplayed();
  });

  await test.step("When: The customer is checking out", async () => {
    await When.theCustomerAddsFeaturedProductsToTheCart([0, 1, 2]);
    await When.theCustomerNavigatesToCheckout();
    await When.theCustomerFillsShippingDetails();
    await When.theCustomerSelectsPremiumShipping();
    await When.theCustomerSelectsPayPal();
    await When.theCustomerFinalizesTheOrder();
  });

  await test.step("Then: The order confirmation is displayed", async () => {
    await Then.theOrderConfirmationIsDisplayed();
    await Then.theCustomerCanContinueShopping();
  });
});
