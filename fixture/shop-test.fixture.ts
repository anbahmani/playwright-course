import { test as base } from "@playwright/test";
import testData from "../dataset/test-data.json";

type TestFixtures = {
  user: typeof testData.user;
};

export const test = base.extend<TestFixtures>({
  user: async ({}, use) => {
    await use(testData.user);
  },
});

export { expect } from "@playwright/test";
