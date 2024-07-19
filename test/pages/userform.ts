import { Page } from '@playwright/test';

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
    this.jobTitleInput = page.locator('input[placeholder="Enter job title"]');
    this.descriptionInput = page.locator('textarea[placeholder="Enter job description"]');
    this.requirementsInput = page.locator('textarea[placeholder="Enter job requirements"]');
    this.locationInput = page.locator('input[placeholder="Enter job location"]');
    this.salaryRangeInput = page.locator('input[placeholder="Enter expected salary range"]');
    this.applicationDeadlineInput = page.locator('input[placeholder="Select application deadline"]');
    this.saveButton = page.locator('text=Save');
    this.confirmationDialog = page.locator('text=Vacancy created successfully'); // Adjust locator if needed
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
    await this.locationInput.fill(location);
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
    const closeButton = this.page.locator('text=Close'); // Adjust locator if needed
    await closeButton.click();
  }
}

export { UserFormPage };
