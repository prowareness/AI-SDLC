import { test, expect } from "@playwright/test";
import { LoginFormPage } from "../pages/loginForm";

test.describe("Login Form", () => {
  test("Successful login", async ({ page }) => {
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
    const welcomeMessage = await page.textContent(".welcome-message");
    expect(welcomeMessage).toContain("Welcome, validUsername");
  });

  test("Login with incorrect credentials", async ({ page }) => {
    const loginFormPage = new LoginFormPage(page);

    // Navigate to the login page
    await page.goto("/login");

    // Fill in the login form with incorrect credentials
    await loginFormPage.fillUsername("invalidUsername");
    await loginFormPage.fillPassword("invalidPassword");

    // Submit the form
    await loginFormPage.submitForm();

    // Verify error message
    const errorMessage = await page.textContent(".error-message");
    expect(errorMessage).toContain("Invalid username or password");
  });

  test("Login with empty fields", async ({ page }) => {
    const loginFormPage = new LoginFormPage(page);

    // Navigate to the login page
    await page.goto("/login");

    // Submit the form without filling in any details
    await loginFormPage.submitForm();

    // Verify error messages for empty fields
    const usernameError = await page.textContent("#username-error");
    const passwordError = await page.textContent("#password-error");
    expect(usernameError).toContain("Username cannot be empty");
    expect(passwordError).toContain("Password cannot be empty");
  });
});