import { Page } from "@playwright/test";

class UserFormPage {
  private page: Page;
  private jobTitleInput;
  private descriptionInput;
  private requirementsInput;
  private locationInput;
  private salaryRangeInput;
  private applicationDeadlineInput;
  private saveButton;
  private confirmationDialog;

  constructor(page: Page) {
    this.page = page;
    this.jobTitleInput = page.locator("#job-title");
    this.descriptionInput = page.locator("#description");
    this.requirementsInput = page.locator("#requirements");
    this.locationInput = page.locator("#locations");
    this.salaryRangeInput = page.locator("#max-salary");
    this.applicationDeadlineInput = page.locator("#last-date");
    this.saveButton = page.locator("button", { hasText: "Submit" });
    this.confirmationDialog = page.locator("text=Vacancy created successfully"); // Adjust locator if needed
  }

  async fillJobTitle(title: string) {
    await this.jobTitleInput.fill(title);
  }

  async fillDescription(description: string) {
    await this.descriptionInput.fill(description);
  }

  async fillRequirements(requirements: string) {
    await this.requirementsInput.fill(requirements);
  }

  async selectLocation(location: string) {
    await this.locationInput.click();
    await this.page.locator("#menu-location li", { hasText: location }).click();
  }

  async fillMaxSalary(salaryRange: string) {
    await this.salaryRangeInput.fill(salaryRange);
  }

  async fillLastDate(date: string) {
    await this.applicationDeadlineInput.fill(date);
  }

  async submitForm() {
    await this.saveButton.click();
  }

  async getDialogTitle() {
    return this.confirmationDialog.textContent();
  }

  async closeDialog() {
    const closeButton = this.page.locator("text=Close"); // Adjust locator if needed
    await closeButton.click();
  }
}

export { UserFormPage };
