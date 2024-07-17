import { test, expect } from '@playwright/test';

test('Recruiter can create a job vacancy', async ({ page }) => {
    // Navigate to the job vacancy creation page
    await page.goto('https://your-website.com/create-job-vacancy');

    // Fill in the job details
    await page.fill('#jobTitleInput', 'Software Engineer');
    await page.fill('#jobDescriptionInput', 'We are looking for a skilled software engineer...');
    await page.fill('#jobRequirementsInput', 'Bachelor’s degree in Computer Science...');
    await page.fill('#jobLocationInput', 'New York, NY');
    await page.fill('#salaryRangeInput', '$80,000 - $100,000');
    await page.fill('#applicationDeadlineInput', '2022-12-31');

    // Submit the form
    await page.click('#createJobButton');

    // Verify that the vacancy is saved successfully
    const vacancyList = await page.$$('.vacancy-item');
    expect(vacancyList.length).toBeGreaterThan(0);

    // Verify that a confirmation message is displayed
    const confirmationMessage = await page.textContent('.confirmation-message');
    expect(confirmationMessage).toContain('Vacancy created successfully');
});

test('Validation for mandatory fields', async ({ page }) => {
    // Navigate to the job vacancy creation page
    await page.goto('https://your-website.com/create-job-vacancy');

    // Submit the form without filling in any details
    await page.click('#createJobButton');

    // Verify that error messages are displayed for incomplete fields
    const errorMessages = await page.$$eval('.error-message', (elements) =>
        elements.map((element) => element.textContent)
    );
    expect(errorMessages).toContain('Please enter a job title');
    expect(errorMessages).toContain('Please enter a job description');
    expect(errorMessages).toContain('Please enter job requirements');
    expect(errorMessages).toContain('Please enter a job location');
    expect(errorMessages).toContain('Please enter a salary range');
    expect(errorMessages).toContain('Please enter an application deadline');
});