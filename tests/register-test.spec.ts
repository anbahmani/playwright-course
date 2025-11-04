import { test } from "../fixture/register.fixture";

test("User registration, profile navigation, and site exploration", async ({
  Given,
  When,
  Then,
}) => {
  await test.step("Given: The user is on the right starting page", async () => {
    await Given.theUserIsOnTheRegistrationPage();
  });

  await test.step("When: The user completes the registration process", async () => {
    await When.theUserFillsTheRegistrationForm();
    await When.theUserAcceptsTheTerms();
    await When.theUserSubmitsTheForm();
  });

  await test.step("Then: The user is successfully logged in", async () => {
    await Then.theUserIsSuccessfullyLoggedIn();
  });

  // When: The user navigates their profile and logs out
  // await When.theUserNavigatesTheirProfile();
  // await When.theUserLogsOut();

  // Then: The user is successfully logged out
  // await Then.theUserIsSuccessfullyLoggedOut();

  // When: The user explores the public parts of the site
  // await When.theUserNavigatesThePublicSite();
});
