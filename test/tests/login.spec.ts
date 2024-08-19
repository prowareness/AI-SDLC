import { test, expect } from "@playwright/test";
import { LoginFormPage } from "../pages/loginForm";

test.describe("Login Form", () => {
    test("Successful login", async ({ page, baseURL }) => {
        const loginFormPage = new LoginFormPage(page);
        
        // Access the username and password from the config's metadata object
        const username = test.info().config.metadata.username;
        const password = test.info().config.metadata.password;
        
        // Navigate to the baseURL or a fallback path
        await page.goto(baseURL || '/');  // Fallback to /vacancy/ if baseURL isn't defined
        
        // Fill in the login form
        await loginFormPage.fillUsername(username);
        await loginFormPage.fillPassword(password);
        await loginFormPage.submitForm();
        
        // Validate that the current URL contains the word "dashboard"
        await expect(page).toHaveURL(/dashboard/);
    });

    test("Login with incorrect credentials", async ({ page, baseURL }) => {
        const loginFormPage = new LoginFormPage(page);

        // Navigate to the baseURL or a fallback path
        await page.goto(baseURL || '/');  // Fallback to /vacancy/ if baseURL isn't defined

        // Fill in the login form with incorrect credentials
        await loginFormPage.fillUsername("invalidUsername");
        await loginFormPage.fillPassword("invalidPassword");

        // Submit the form
        await loginFormPage.submitForm();

        // Verify error message
        const errorMessage = await page.textContent(".error-message");
        expect(errorMessage).toContain("Please enter a valid email address");
    });

    test("Login with empty fields", async ({ page, baseURL }) => {
        const loginFormPage = new LoginFormPage(page);

        // Navigate to the baseURL or a fallback path
        await page.goto(baseURL || '/');  // Fallback to /vacancy/ if baseURL isn't defined

        // Submit the form without filling in any details
        await loginFormPage.submitForm();

        // Verify error messages for empty fields
        const errorMessage = await page.textContent(".error-message");
        expect(errorMessage).toContain("Username is required");
    });
});