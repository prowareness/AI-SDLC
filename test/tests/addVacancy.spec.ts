import { test, expect } from "@playwright/test";
import Homepage from "../pages/homepage";
import { UserFormPage } from "../pages/userform";
import moment from "moment";

const today = moment();

test.describe("Job Vacancy Creation", () => {
  test("Recruiter can create a job vacancy with all details", async ({
    page,
  }) => {
    const homepage = new Homepage(page);
    const userFormPage = new UserFormPage(page);

    // Navigate to the job vacancy creation page
    await homepage.navigate("/frontend");
    await homepage.clickCreateButton();

    // Fill in the job details
    await userFormPage.fillJobTitle("Software Engineer");
    await userFormPage.fillDescription(
      "We are looking for a skilled software engineer..."
    );
    await userFormPage.fillRequirements(
      "Bachelor’s degree in Computer Science..."
    );
    await userFormPage.selectLocation("Bangalore");
    await userFormPage.fillMaxSalary("1000000");
    // ...

    const futureDate = today.add(10, "days").format("YYYY-MM-DD");
    await userFormPage.fillLastDate(futureDate);

    // Submit the form
    await userFormPage.submitForm();

    // Verify that the vacancy is saved successfully and is visible in the list of vacancies
    const vacancyList = await page.$$(".vacancy-item");
    expect(vacancyList.length).toBeGreaterThan(0);

    // Verify that a confirmation message is displayed
    const confirmationMessage = await userFormPage.getDialogTitle();
    expect(confirmationMessage).toContain("Vacancy created successfully");
    await userFormPage.closeDialog();
  });

  test.only("Validation for mandatory fields", async ({ page }) => {
    const homepage = new Homepage(page);
    await homepage.navigate("/frontend");
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
