import { expect } from '@playwright/test';

export class JobDetailsPage {
  page: any;
  jobIdInput: any;
  jobDescriptionTextarea: any;
  jobRequirementsInput: any;
  locationSelect: any;
  lastDateToApplyInput: any;
  editButton: any;
  saveButton: any;

  constructor(page: any) {
    this.page = page;
    this.jobIdInput = page.locator('input[name="jobId"]');
    this.jobDescriptionTextarea = page.locator('textarea[name="jobDescription"]');
    this.jobRequirementsInput = page.locator('input[name="jobRequirements"]');
    this.locationSelect = page.locator('select[name="location"]');
    this.lastDateToApplyInput = page.locator('input[name="lastDateToApply"]');
    this.editButton = page.locator('button.btn-cancel');
    this.saveButton = page.locator('button.btn-save');
  }

  async goto() {
    await this.page.goto('/job-details'); // Adjust the URL as needed
  }

  async getJobId() {
    return await this.jobIdInput.inputValue();
  }

  async getJobDescription() {
    return await this.jobDescriptionTextarea.inputValue();
  }

  async getJobRequirements() {
    return await this.jobRequirementsInput.inputValue();
  }

  async getLocation() {
    return await this.locationSelect.inputValue();
  }

  async getLastDateToApply() {
    return await this.lastDateToApplyInput.inputValue();
  }

  async clickEdit() {
    await this.editButton.click();
  }

  async clickSave() {
    await this.saveButton.click();
  }

  async fillJobDescription(description: string) {
    await this.jobDescriptionTextarea.fill(description);
  }

  async fillJobRequirements(requirements: string) {
    await this.jobRequirementsInput.fill(requirements);
  }

  async selectLocation(location: string) {
    await this.locationSelect.selectOption(location);
  }

  async fillLastDateToApply(date: string) {
    await this.lastDateToApplyInput.fill(date);
  }

  async expectEditable(isEditable: boolean) {
    const readOnly = !isEditable;
    await expect(this.jobDescriptionTextarea).toHaveAttribute('readonly', readOnly.toString());
    await expect(this.jobRequirementsInput).toHaveAttribute('readonly', readOnly.toString());
    await expect(this.locationSelect).toBeDisabled({ timeout: 5000 });
    await expect(this.lastDateToApplyInput).toHaveAttribute('readonly', readOnly.toString());
  }
}

