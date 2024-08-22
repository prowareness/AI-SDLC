import { test, expect } from "@playwright/test";
import Homepage from "../pages/homepage";
import { UserFormPage } from "../pages/userform";
import { LoginFormPage } from "../pages/loginForm";
import moment from "moment";

const today = moment();

async function login(page: any) {
  const loginFormPage = new LoginFormPage(page);
  
  // Access the username, password, and baseURL from test context
  const config = test.info().config;
  const baseURL = config.projects[0].use.baseURL;  // Adjust according to your project setup
  const username = config.metadata.username;
  const password = config.metadata.password;
  
  // Navigate to the baseURL
  await page.goto(baseURL || '/');  // Fallback to '/' if baseURL isn't defined
  
  // Fill in the login form
  await loginFormPage.fillUsername(username);
  await loginFormPage.fillPassword(password);
  await loginFormPage.submitForm();
  
  // Validate that the current URL contains the word "dashboard"
  await expect(page).toHaveURL(/dashboard/);
}

test.describe("Job Vacancy Creation", () => {
  test("Recruiter can create a job vacancy with all details", async ({ page }) => {
    await login(page);

    const homepage = new Homepage(page);
    const userFormPage = new UserFormPage(page);

    await homepage.clickCreateButton();

    await userFormPage.fillJobTitle("Software Engineer");
    await userFormPage.fillDescription("We are looking for a skilled software engineer...");
    await userFormPage.fillRequirements("Bachelor’s degree in Computer Science...");
    await userFormPage.selectLocation("Bangalore");
    await userFormPage.fillMaxSalary("1000000");

    const futureDate = today.add(10, "days").format("YYYY-MM-DD");
    await userFormPage.fillLastDate(futureDate);

    await userFormPage.submitForm();

    // Verify that a confirmation message is displayed in a dialog box
    const confirmationMessage = await userFormPage.getDialogTitle();
    expect(confirmationMessage).toContain("created successfully");
    await userFormPage.closeDialog();
  });

  test("Validation for mandatory fields", async ({ page }) => {
    await login(page);

    const homepage = new Homepage(page);
    await homepage.clickCreateButton();

    const userFormPage = new UserFormPage(page);
    // Submit the form without filling in any details
    await userFormPage.submitForm();

    // Verify that error messages are displayed for incomplete fields
    const errorHandles = await page
      .locator("p.MuiFormHelperText-root")
      .elementHandles();
    const errorMessages = await Promise.all(
      errorHandles.map(async (element) => {
        return await element.textContent();
      })
    );

    expect(errorMessages).toContain("Job Title cannot be empty");
    expect(errorMessages).toContain("Description cannot be empty");
    // Add checks for other fields similarly
  });
});
