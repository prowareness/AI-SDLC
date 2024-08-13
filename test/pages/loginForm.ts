import { Page } from "@playwright/test";

class LoginFormPage {
  private page: Page;
  private usernameInput;
  private passwordInput;
  private submitButton;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator("#username");
    this.passwordInput = page.locator("#password");
    this.submitButton = page.locator(".submit-btn");
  }

  async fillUsername(username: string) {
    await this.usernameInput.fill(username);
  }

  async fillPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  async submitForm() {
    await this.submitButton.click();
  }
}

export { LoginFormPage };