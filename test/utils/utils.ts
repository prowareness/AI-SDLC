// utils.ts
import { LoginFormPage } from "../pages/loginForm";
import { test, expect } from "@playwright/test";

export async function login(page: any) {
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