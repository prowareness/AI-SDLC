import { test, expect } from '@playwright/test';
import Homepage from '../pages/homepage';
import { UserFormPage } from '../pages/userform';

test.describe('Job Vacancy Creation', () => {
  test('Recruiter can create a job vacancy with all details', async ({ page }) => {
    const homepage = new Homepage(page);
    const userFormPage = new UserFormPage(page);

    // Navigate to the job vacancy creation page
    await homepage.navigate('https://your-website.com');
    await homepage.clickCreateButton();

    // Fill in the job details
    await userFormPage.fillJobTitle('Software Engineer');
    await userFormPage.fillDescription('We are looking for a skilled software engineer...');
    await userFormPage.fillRequirements('Bachelor’s degree in Computer Science...');
    await userFormPage.selectLocation('New York, NY');
    await userFormPage.fillMaxSalary('$80,000 - $100,000');
    await userFormPage.fillLastDate('2022-12-31');

    // Submit the form
    await userFormPage.submitForm();

    // Verify that the vacancy is saved successfully and is visible in the list of vacancies
    const vacancyList = await page.$$('.vacancy-item');
    expect(vacancyList.length).toBeGreaterThan(0);

    // Verify that a confirmation message is displayed
    const confirmationMessage = await userFormPage.getDialogTitle();
    expect(confirmationMessage).toContain('Vacancy created successfully');
    await userFormPage.closeDialog();
  });

  test('Validation for mandatory fields', async ({ page }) => {
    const homepage = new Homepage(page);
    await homepage.navigate('https://your-website.com');
    await homepage.clickCreateButton();

    const userFormPage = new UserFormPage(page);
    // Submit the form without filling in any details
    await userFormPage.submitForm();

    // Verify that error messages are displayed for incomplete fields
    const errorMessages = await page.$$eval('.error-message', elements => elements.map(element => element.textContent));
    expect(errorMessages).toContain('Please enter a job title');
    expect(errorMessages).toContain('Please enter a job description');
    // Add checks for other fields similarly
  });
});
