import { test, expect } from "@playwright/test";
import { login } from "../utils/utils";
import { JobDetailsPage } from "../pages/jobDetails";

// Add an export statement for the 'login' function
export { login };
import { DashboardPage } from "../pages/dashboard";

test.describe("Dashboard Validation", () => {
  test("Verify Login Functionality", async ({ page }) => {
    await login(page);

    // Verify successful login
    await expect(page).toHaveURL("/dashboard");
  });

  test("Verify 'Job' Tab/Section Navigation", async ({ page }) => {
    await login(page);
    const dashboardPage = new DashboardPage(page);

    // Navigate to the "Job" section
    await dashboardPage.navigateToCreateJob();

    // Verify redirection to the "Job" section
    await expect(page).toHaveURL("/create-job");
  });

  test("Verify All Elements on Dashboard Page", async ({ page }) => {
    await login(page);
    const dashboardPage = new DashboardPage(page);

    // Verify Create Job button is visible
    await expect(dashboardPage.createJobButton).toBeVisible();

    // Verify Vacancy Table is visible
    await expect(dashboardPage.vacancyTable).toBeVisible();

    // Verify Total Vacancies element is visible
    await expect(dashboardPage.totalVacancies).toBeVisible();
  });

  test.skip("Verify Search Functionality in the 'Job' Section", async ({ page }) => {
    await login(page);
    const dashboardPage = new DashboardPage(page);

    // Navigate to the "Job" section
    await dashboardPage.navigateToCreateJob();

    // Perform a search
    const searchBar = page.locator(".job-search-bar");
    await searchBar.fill("specificJob");
    await searchBar.press("Enter");

    // Verify search results
    const searchResults = page.locator(".job-listing");
    await expect(searchResults).toContainText("specificJob");
  });

  test.skip("Verify Access to Job Profile", async ({ page }) => {
    await login(page);
    const dashboardPage = new DashboardPage(page);

    // Navigate to the "Job" section
    await dashboardPage.navigateToCreateJob();

    // Perform a search and access a job profile
    const searchBar = page.locator(".job-search-bar");
    await searchBar.fill("specificJob");
    await searchBar.press("Enter");
    const jobLink = page.locator(".job-listing a").first();
    await jobLink.click();

    // Verify redirection to the job profile page
    await expect(page).toHaveURL(/\/jobs\/\d+/);
  });

  test.skip("Verify Job Details Display", async ({ page }) => {
    await login(page);
    const dashboardPage = new DashboardPage(page);

    // Navigate to a job profile
    await dashboardPage.navigateToCreateJob();
    const searchBar = page.locator(".job-search-bar");
    await searchBar.fill("specificJob");
    await searchBar.press("Enter");
    const jobLink = page.locator(".job-listing a").first();
    await jobLink.click();

    // Verify job details
    const jobTitle = page.locator(".job-title");
    const jobDescription = page.locator(".job-description");
    await expect(jobTitle).toBeVisible();
    await expect(jobDescription).toBeVisible();
  });

  test.skip("Verify Navigation Back to Job List", async ({ page }) => {
    await login(page);
    const dashboardPage = new DashboardPage(page);

    // Navigate to a job profile
    await dashboardPage.navigateToCreateJob();
    const searchBar = page.locator(".job-search-bar");
    await searchBar.fill("specificJob");
    await searchBar.press("Enter");
    const jobLink = page.locator(".job-listing a").first();
    await jobLink.click();

    // Navigate back to the job list
    const backButton = page.locator(".back-to-job-list");
    await backButton.click();

    // Verify redirection back to the job list
    await expect(page).toHaveURL("/jobs");
  });



  test('should edit job details', async ({ page }) => {
    await login(page);
    const dashboardPage = new DashboardPage(page);
  
    // Navigate to the dashboard
    // await dashboardPage.goto();
  
    // Click on the first job in the vacancy table
    await dashboardPage.clickFirstJob();
  
    const jobDetailsPage = new JobDetailsPage(page);
  
    // Verify initial state
    // await jobDetailsPage.expectEditable(false);
  
    // Click edit button
    await jobDetailsPage.clickEdit();
  
    // Verify fields are editable
    // await jobDetailsPage.expectEditable(true);
  
    // Fill in new details
    await jobDetailsPage.fillJobDescription('New Job Description');
    await jobDetailsPage.fillJobRequirements('New Job Requirements');
    await jobDetailsPage.selectLocation('Netherlands');
    await jobDetailsPage.fillLastDateToApply('2023-12-31');
  
    // Save changes
    await jobDetailsPage.clickSave();
  
    // Verify fields are not editable
    // await jobDetailsPage.expectEditable(false);
  
    // Verify updated values
    expect(await jobDetailsPage.getJobDescription()).toBe('New Job Description');
    expect(await jobDetailsPage.getJobRequirements()).toBe('New Job Requirements');
    expect(await jobDetailsPage.getLocation()).toBe('Netherlands');
    expect(await jobDetailsPage.getLastDateToApply()).toBe('2023-12-31');
  });
});