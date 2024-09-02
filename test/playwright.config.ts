import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: false,  // Set to false to run tests sequentially
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    baseURL: "http://172.190.178.164:8080/vacancy/",
    trace: "on-first-retry",
    ignoreHTTPSErrors: true,
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    headless: true,
    browserName: 'chromium',
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],

  // Store custom data such as username and password in a separate object
  metadata: {
    username: 'john.doe@devon.nl',
    password: 'devon123',
  },
});
