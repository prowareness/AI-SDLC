import { test, expect } from "@playwright/test";
import { LoginFormPage } from "../pages/loginForm";
import { DashboardPage } from "../pages/dashboard";

test.describe("Dashboard Validation", () => {
  test("Verify Login Functionality", async ({ page }) => {
    const loginFormPage = new LoginFormPage(page);

    // Navigate to the login page
    await page.goto("/login");

    // Fill in the login form
    await loginFormPage.fillUsername("validUsername");
    await loginFormPage.fillPassword("validPassword");

    // Submit the form
    await loginFormPage.submitForm();

    // Verify successful login
    await expect(page).toHaveURL("/dashboard");
  });

  test("Verify 'Job' Tab/Section Navigation", async ({ page }) => {
    const loginFormPage = new LoginFormPage(page);
    const dashboardPage = new DashboardPage(page);

    // Log in
    await page.goto("/login");
    await loginFormPage.fillUsername("validUsername");
    await loginFormPage.fillPassword("validPassword");
    await loginFormPage.submitForm();

    // Navigate to the "Job" section
    await dashboardPage.navigateToCreateJob();

    // Verify redirection to the "Job" section
    await expect(page).toHaveURL("/jobs");
  });

  test("Verify Search Functionality in the 'Job' Section", async ({ page }) => {
    const loginFormPage = new LoginFormPage(page);
    const dashboardPage = new DashboardPage(page);

    // Log in and navigate to the "Job" section
    await page.goto("/login");
    await loginFormPage.fillUsername("validUsername");
    await loginFormPage.fillPassword("validPassword");
    await loginFormPage.submitForm();
    await dashboardPage.navigateToCreateJob();

    // Perform a search
    const searchBar = page.locator(".job-search-bar");
    await searchBar.fill("specificJob");
    await searchBar.press("Enter");

    // Verify search results
    const searchResults = page.locator(".job-listing");
    await expect(searchResults).toContainText("specificJob");
  });

  test("Verify Access to Job Profile", async ({ page }) => {
    const loginFormPage = new LoginFormPage(page);
    const dashboardPage = new DashboardPage(page);

    // Log in and navigate to the "Job" section
    await page.goto("/login");
    await loginFormPage.fillUsername("validUsername");
    await loginFormPage.fillPassword("validPassword");
    await loginFormPage.submitForm();
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

  test("Verify Job Details Display", async ({ page }) => {
    const loginFormPage = new LoginFormPage(page);
    const dashboardPage = new DashboardPage(page);

    // Log in and navigate to a job profile
    await page.goto("/login");
    await loginFormPage.fillUsername("validUsername");
    await loginFormPage.fillPassword("validPassword");
    await loginFormPage.submitForm();
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

  test("Verify Navigation Back to Job List", async ({ page }) => {
    const loginFormPage = new LoginFormPage(page);
    const dashboardPage = new DashboardPage(page);

    // Log in and navigate to a job profile
    await page.goto("/login");
    await loginFormPage.fillUsername("validUsername");
    await loginFormPage.fillPassword("validPassword");
    await loginFormPage.submitForm();
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
});