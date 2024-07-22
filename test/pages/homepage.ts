import { Page } from "@playwright/test";

class Homepage {
  private page: Page;
  private createButton;

  constructor(page: Page) {
    this.page = page;
    this.createButton = page.locator("button", { hasText: "Create" });
  }

  async navigate(url: string) {
    await this.page.goto(url);
  }

  async clickCreateButton() {
    await this.createButton.click();
  }
}

export default Homepage;
